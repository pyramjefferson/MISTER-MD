/// ───────── [ 𝖨𝗆𝗉𝗈𝗋𝗍𝗌 ] ─────────── \\\
const fs   = require("fs");
const fsp  = fs.promises;
const path = require("path");
const pino = require("pino");

const {
  default: WAConnection,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  generateWAMessageFromContent,
  proto,
  makeInMemoryStore,
} = require("@adiwajshing/baileys");

const { MessagesUpsert, Solving } = require("./message");

/// ───────── [ 𝖢𝗈𝗇𝗌𝗍𝖺𝗇𝗍𝗌 ] ─────────── \\\
const SESSION_ROOT         = path.join(process.cwd(), "session", "jadibot");
const MAX_JADIBOT          = global.maxJadibot;
const RECONNECT_MAX_DELAY  = 30000;
const PAIRING_TIMEOUT      = 120000;
const SOCKET_READY_TIMEOUT = 20000;

/// ───────── [ 𝖧𝖾𝗅𝗉𝖾𝗋𝗌 ] ─────────── \\\
/** Strip `@s.whatsapp.net`, `:device`, dan semua non-digit */
function normalizeNumber(value = "") {
  return String(value)
    .replace(/@s\.whatsapp\.net$/i, "")
    .replace(/:\d+(?=@|$)/, "")
    .replace(/\D/g, "");
}

/** Konversi nomor ke JID WhatsApp */
function toJid(number) {
  const clean = normalizeNumber(number);
  return clean ? `${clean}@s.whatsapp.net` : "";
}

/** Ambil status code disconnect dari berbagai bentuk error */
function safeStatusCode(error) {
  return error?.output?.statusCode ?? error?.statusCode ?? error?.data?.statusCode;
}

/// ───────── [ 𝖩𝖺𝖽𝗂𝖻𝗈𝗍 𝖬𝖺𝗇𝖺𝗀𝖾𝗋 ] ─────────── \\\
class JadibotManager {
  constructor() {
    this.entries        = new Map();
    this.mainSock       = null;
    this.commandHandler = null;
    this.restorePromise = null;
    this.restored       = false;
    this.version        = null;
    this.versionPromise = null;
  }

  /// ───────── [ 𝖦𝖾𝗍𝗍𝖾𝗋𝗌 ] ─────────── \\\
  get max() {
    return Number(global.maxJadibot || MAX_JADIBOT);
  }

  get activeCount() {
    return this.entries.size;
  }

  get list() {
    return [...this.entries.values()];
  }

  getMainNumber(mainSock = this.mainSock) {
    return normalizeNumber(mainSock?.user?.id || mainSock?.user?.jid || "");
  }

  sessionDir(ownerJid) {
    return path.join(SESSION_ROOT, normalizeNumber(ownerJid));
  }

  /// ───────── [ 𝖱𝗎𝗇𝗍𝗂𝗆𝖾 𝖲𝖾𝗍𝗎𝗉 ] ─────────── \\\
  /** Set mainSock & handler ke semua entry yang aktif */
  setRuntime(mainSock, commandHandler) {
    if (mainSock !== undefined) {
      this.mainSock = mainSock || null;
      for (const entry of this.entries.values()) {
        entry.mainSock = this.mainSock;
      }
    }
    if (commandHandler) this.commandHandler = commandHandler;
  }

  /** Pastikan folder root session ada */
  async ensureRoot() {
    await fsp.mkdir(SESSION_ROOT, { recursive: true });
  }

  /** Tunggu socket Baileys benar-benar open sebelum minta pairing code */
  async waitForSocketReady(client, timeout = SOCKET_READY_TIMEOUT) {
    const started = Date.now();
    while (client?.ws?.isOpen !== true) {
      if (Date.now() - started >= timeout) {
        throw new Error("Transport WhatsApp belum siap untuk pairing.");
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }

  /** Cache versi Baileys — pakai versi host dulu, fallback fetch dari GitHub */
  async getVersion(mainSock) {
    if (this.version) return this.version;
    if (this.versionPromise) return this.versionPromise;

    this.versionPromise = (async () => {
      try {
        const candidate = mainSock?.__clientWaVersion;
        if (Array.isArray(candidate) && candidate.length) {
          this.version = candidate;
          return candidate;
        }

        const res = await fetch(
          "https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json",
          { signal: AbortSignal.timeout(15000) }
        );
        const data = await res.json();
        if (Array.isArray(data?.version)) this.version = data.version;
      } catch { }
      finally {
        this.versionPromise = null;
      }
      return this.version;
    })();

    return this.versionPromise;
  }

  /// ───────── [ 𝖲𝗍𝖺𝗋𝗍 ] ─────────── \\\
  /**
   * Start jadibot session untuk owner tertentu
   * @param {object} hostSock
   * @param {string} ownerJid
   * @param {Function} commandHandler
   * @param {object|null} replyContext - { chat, sender, participant }
   */
  async start(hostSock, ownerJid, commandHandler, replyContext = null) {
    const hostIsClone = Boolean(hostSock?.isJadibot);
    if (!hostIsClone) this.setRuntime(hostSock, commandHandler);

    const jid    = toJid(ownerJid);
    const number = normalizeNumber(ownerJid);

    if (!jid || !number) {
      return { ok: false, message: "❌ Nomor WhatsApp tidak valid." };
    }

    /* Guard: nomor bot utama tidak boleh jadi jadibot */
    const mainNumber = this.getMainNumber(this.mainSock);
    if (mainNumber && number === mainNumber) {
      return {
        ok: false,
        message: "❌ Nomor ini adalah nomor bot utama. Gunakan nomor WhatsApp lain untuk Jadibot.",
      };
    }

    /* Guard: nomor host sendiri tidak boleh jadi jadibot */
    const hostNumber = normalizeNumber(
      hostSock?.user?.id || hostSock?.user?.jid || hostSock?.jadibotOwnerJid || ""
    );
    if (hostNumber && number === hostNumber) {
      return {
        ok: false,
        message: "❌ Nomor ini sedang menjadi bot yang aktif. Gunakan nomor WhatsApp lain untuk membuat clone baru.",
      };
    }

    /* Guard: sudah pernah start */
    if (this.entries.has(jid)) {
      const entry = this.entries.get(jid);
      return {
        ok: false,
        already: true,
        message: entry.status === "online"
          ? "❌ Kamu sudah menjadi *Jadibot* dan sedang online."
          : "⏳ Sesi Jadibot kamu masih dalam proses koneksi.",
      };
    }

    /* Guard: limit */
    if (this.activeCount >= this.max) {
      return {
        ok: false,
        limit: true,
        message: `❌ Limit Jadibot penuh.\n\nMaksimal hanya *${this.max} orang* yang dapat aktif sebagai Jadibot.`,
      };
    }

    await this.ensureRoot();

    /* Bersihkan session lama yang tidak ter-register */
    const sessionDir = this.sessionDir(jid);
    const credsPath  = path.join(sessionDir, "creds.json");

    if (fs.existsSync(sessionDir) && fs.existsSync(credsPath)) {
      try {
        const creds = JSON.parse(await fsp.readFile(credsPath, "utf8"));
        if (!creds?.registered) {
          await fsp.rm(sessionDir, { recursive: true, force: true });
        }
      } catch {
        await fsp.rm(sessionDir, { recursive: true, force: true });
      }
    }

    const entry = {
      jid,
      number,
      pairingJid:   replyContext?.chat || jid,
      requesterJid: normalizeNumber(replyContext?.sender || replyContext?.participant || ""),
      sessionDir,
      mainSock:     hostSock,
      parentJid:    hostIsClone ? (hostSock.jadibotOwnerJid || hostSock.user?.id || "") : null,
      commandHandler,
      status:       "starting",
      client:         null,
      store:        makeInMemoryStore({ logger: pino({ level: "silent" }) }),
      saveCreds:    null,
      creds:        null,
      listeners:    null,
      reconnectTimer:       null,
      pairingTimer:         null,
      pairingTimeoutTimer:  null,
      reconnectAttempt:     0,
      stopping:     false,
      opened:       false,
      pairingSent:  false,
      pairingCode:  null,
      createdAt:    Date.now(),
    };

    this.entries.set(jid, entry);

    try {
      await this.connect(entry, replyContext);
      return { ok: true, pending: true, message: "" };
    } catch (error) {
      await this.cleanupEntry(entry, { removeSession: true });
      return {
        ok: false,
        message: `❌ Gagal memulai Jadibot: ${error?.message || error}`,
      };
    }
  }

  /// ───────── [ 𝖢𝗈𝗇𝗇𝖾𝖼𝗍 & 𝖱𝖾𝖼𝗈𝗇𝗇𝖾𝖼𝗍 ] ─────────── \\\
  /** Buat koneksi baru atau reconnect — event handler dipasang di sini */
  async connect(entry, replyContext = null) {
    if (entry.stopping) return;
    entry.status = entry.opened ? "reconnecting" : "connecting";

    const { state, saveCreds } = await useMultiFileAuthState(entry.sessionDir);
    entry.saveCreds = saveCreds;
    entry.creds     = state.creds;

    const version = await this.getVersion(entry.mainSock);

    const socketOptions = {
      logger: pino({ level: "silent" }),
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(
          state.keys,
          pino().child({ level: "silent", stream: "jadibot-store" })
        ),
      },
      syncFullHistory: false,
      markOnlineOnConnect: true,
      emitOwnEvents: false,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 10000,
      generateHighQualityLinkPreview: false,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
    };
    if (version) socketOptions.version = version;

    const cloneSock = WAConnection(socketOptions);
    entry.client = cloneSock;
    cloneSock.isJadibot        = true;
    cloneSock.jadibotOwnerJid  = entry.jid;

    /* Rebind child jadibot ke socket baru ini */
    for (const child of this.entries.values()) {
      if (child.parentJid === entry.jid && child !== entry && !child.stopping) {
        child.mainSock = cloneSock;
      }
    }

    await entry.store.bind(cloneSock.ev);
    await Solving(cloneSock, entry.store);

    const onCredsUpdate = async (update) => {
      try {
        await entry.saveCreds(update);
      } catch (error) {
        console.error(`[JADIBOT ${entry.number}] creds.save:`, error);
      }
    };

    const onMessagesUpsert = async (update) => {
      if (entry.stopping || entry.client !== cloneSock) return;
      if (!update?.messages?.length) return;

      try {
        const handler = entry.commandHandler || this.commandHandler;
        if (typeof handler !== "function") {
          console.error(`[JADIBOT ${entry.number}] command handler tidak tersedia.`);
          return;
        }
        await MessagesUpsert(cloneSock, update, entry.store, handler);
      } catch (error) {
        console.error(`[JADIBOT ${entry.number}] message:`, error);
      }
    };

    const onConnectionUpdate = async (update) => {
      if (entry.client !== cloneSock || entry.stopping) return;

      const { connection, lastDisconnect } = update || {};

      /* ─── Open ─── */
      if (connection === "open") {
        entry.status           = "online";
        entry.opened           = true;
        entry.reconnectAttempt = 0;
        entry.pairingSent      = false;

        for (const child of this.entries.values()) {
          if (child.parentJid === entry.jid && !child.stopping) {
            child.mainSock = cloneSock;
          }
        }

        await this.clearEntryTimers(entry, { keepReconnect: true });

        await this.notify(
          entry,
          `✅ *Jadibot berhasil terhubung!*\n\n` +
          `Nomor: *${entry.number}*\nStatus: *Online*\n\n` +
          `Bot clone sekarang siap digunakan.`
        );
        return;
      }

      if (connection !== "close") return;

      /* ─── Close ─── */
      const statusCode = safeStatusCode(lastDisconnect?.error);

      await this.clearEntryTimers(entry, { keepReconnect: true });
      await this.detachListeners(entry);

      entry.client = null;

      /* Sesi logout — hapus session & cleanup */
      if (statusCode === DisconnectReason.loggedOut) {
        entry.status = "logged_out";
        await this.notify(entry, "⚠️ Sesi Jadibot logout. Session lama telah dihapus.");
        await this.cleanupEntry(entry, { removeSession: true });
        return;
      }

      if (entry.stopping) return;

      /* Jadwalkan reconnect */
      entry.status = "reconnecting";
      entry.reconnectAttempt += 1;
      this.scheduleReconnect(entry);
    };

    entry.listeners = { onCredsUpdate, onMessagesUpsert, onConnectionUpdate };

    cloneSock.ev.on("creds.update",      onCredsUpdate);
    cloneSock.ev.on("messages.upsert",   onMessagesUpsert);
    cloneSock.ev.on("connection.update", onConnectionUpdate);

    /* Kalau belum register — kirim pairing code & set timeout */
    if (!state.creds.registered) {
      entry.pairingTimer = setTimeout(() => {
        entry.pairingTimer = null;
        this.sendPairingCode(entry).catch((error) => {
          console.error(`[JADIBOT ${entry.number}] pairing:`, error);
        });
      }, 1000);
      entry.pairingTimer.unref?.();

      entry.pairingTimeoutTimer = setTimeout(() => {
        if (entry.stopping || entry.opened || entry.creds?.registered) return;
        this.cleanupEntry(entry, { removeSession: true }).catch((error) => {
          console.error(`[JADIBOT ${entry.number}] pairing timeout cleanup:`, error);
        });
      }, PAIRING_TIMEOUT);
      entry.pairingTimeoutTimer.unref?.();
    }
  }

  /** Exponential backoff reconnect — max 30s */
  scheduleReconnect(entry) {
    if (entry.stopping || entry.reconnectTimer) return;

    const delay = Math.min(
      RECONNECT_MAX_DELAY,
      2000 * Math.pow(2, Math.min(Math.max(entry.reconnectAttempt - 1, 0), 4))
    );

    entry.reconnectTimer = setTimeout(async () => {
      entry.reconnectTimer = null;
      if (entry.stopping || this.entries.get(entry.jid) !== entry) return;

      try {
        await this.connect(entry);
      } catch (error) {
        console.error(`[JADIBOT ${entry.number}] reconnect:`, error);
        entry.reconnectAttempt += 1;
        this.scheduleReconnect(entry);
      }
    }, delay);

    entry.reconnectTimer.unref?.();
  }

  /// ───────── [ 𝖯𝖺𝗂𝗋𝗂𝗇𝗀 ] ─────────── \\\
  /** Minta pairing code & kirim ke user via button message */
  async sendPairingCode(entry) {
    if (entry.stopping || entry.opened || entry.pairingSent) return;
    if (!entry.client || !entry.creds) return;

    try {
      if (entry.creds.registered) return;

      await this.waitForSocketReady(entry.client);
      if (entry.stopping || entry.client == null || entry.creds.registered) return;

      const rawCode = await entry.client.requestPairingCode(entry.number);
      if (!rawCode || entry.stopping) return;

      entry.pairingCode = String(rawCode).replace(/-/g, "");
      entry.pairingSent = true;

      const displayCode = String(rawCode).replace(/-/g, "").match(/.{1,4}/g)?.join("-") || rawCode;
      const pairingJid  = entry.pairingJid || entry.jid;
      const mainSock    = entry.mainSock || this.mainSock;

      if (!mainSock || !pairingJid) {
        entry.pairingSent = false;
        return;
      }

      const pairingMessage = generateWAMessageFromContent(
        pairingJid,
        {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                  text:
                    `*[ MISTER-MD PAIRING ]*\n\n` +
                    `Kode Pairing Kamu:\n*${displayCode}*\n\n` +
                    `Buka WhatsApp > Perangkat Tertaut > Tautkan dengan nomor telepon.\n\n`,
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [
                    {
                      name: "cta_copy",
                      buttonParamsJson: JSON.stringify({
                        display_text: "Copy Code",
                        id: "copy_pairing_code",
                        copy_code: String(rawCode).replace(/-/g, ""),
                      }),
                    },
                    {
                      name: "quick_reply",
                      buttonParamsJson: JSON.stringify({
                        display_text: "❌ Batal Jadibot",
                        id: ".bataljadibot",
                      }),
                    },
                  ],
                }),
              }),
            },
          },
        },
        { userJid: pairingJid }
      );

      await mainSock.relayMessage(pairingMessage.key.remoteJid, pairingMessage.message, {
        messageId: pairingMessage.key.id,
      });
    } catch (error) {
      entry.pairingSent = false;
      await this.notify(
        entry,
        `❌ Gagal meminta kode pairing: ${error?.message || error}`,
        entry.pairingJid || entry.jid
      );
    }
  }

  /// ───────── [ 𝖭𝗈𝗍𝗂𝖿𝗒 ] ─────────── \\\
  /** Kirim notifikasi ke user via mainSock */
  async notify(entry, text, targetJid = null) {
    const client = this.mainSock || entry.mainSock;
    const jid  = targetJid || entry.jid;
    if (!client || !jid) return;

    try {
      if (client.ws?.isOpen === false) return;
      await client.sendMessage(jid, { text });
    } catch (error) {
      console.error(`[JADIBOT ${entry.number}] notify:`, error?.message || error);
    }
  }

  /// ───────── [ 𝖢𝖺𝗇𝖼𝖾𝗅 & 𝖲𝗍𝗈𝗉 ] ─────────── \\\
  /** Batalkan proses pairing berdasarkan JID requester */
  async cancelByRequester(requesterJid = "") {
    const requesterNumber = normalizeNumber(requesterJid);
    if (!requesterNumber) {
      return { ok: false, message: "❌ Pengirim proses Jadibot tidak ditemukan." };
    }

    let candidate = null;
    for (const entry of this.entries.values()) {
      if (entry.requesterJid === requesterNumber && !entry.stopping) {
        if (!candidate || entry.createdAt > candidate.createdAt) candidate = entry;
      }
    }

    if (!candidate) {
      return { ok: false, message: "❌ Tidak ada proses Jadibot yang sedang menunggu pairing." };
    }

    await this.cleanupEntry(candidate, { removeSession: true });
    return { ok: true, removedSession: true, number: candidate.number };
  }

  /** Batalkan proses jadibot berdasarkan nomor target */
  async cancelByTarget(targetNumber, requesterJid = "") {
    const targetJid       = toJid(targetNumber);
    const requesterNumber = normalizeNumber(requesterJid);
    const entry           = this.entries.get(targetJid);

    if (entry) {
      if (entry.requesterJid && requesterNumber && entry.requesterJid !== requesterNumber) {
        return {
          ok: false,
          unauthorized: true,
          message: "❌ Kamu bukan pemilik proses Jadibot ini.",
        };
      }

      await this.cleanupEntry(entry, { removeSession: true });
      return { ok: true, removedSession: true };
    }

    const sessionDir = this.sessionDir(targetJid);
    if (fs.existsSync(sessionDir)) {
      await fsp.rm(sessionDir, { recursive: true, force: true });
      return { ok: true, removedSession: true };
    }

    return { ok: false, message: "❌ Proses Jadibot tidak ditemukan." };
  }

  /** Stop jadibot aktif milik owner */
  async stop(ownerJid, removeSession = true) {
    const jid        = toJid(ownerJid);
    const entry      = this.entries.get(jid);
    const sessionDir = this.sessionDir(jid);

    if (!entry) {
      if (removeSession && fs.existsSync(sessionDir)) {
        await fsp.rm(sessionDir, { recursive: true, force: true });
        return { ok: true, removedSession: true };
      }
      return { ok: false, message: "❌ Kamu tidak memiliki Jadibot yang aktif." };
    }

    entry.stopping = true;
    entry.status   = "stopping";

    await this.clearEntryTimers(entry);
    await this.detachListeners(entry);

    try { await entry.client?.end?.(); } catch { }

    entry.client = null;
    this.entries.delete(jid);

    if (removeSession) {
      await fsp.rm(sessionDir, { recursive: true, force: true }).catch(() => { });
    }

    return { ok: true };
  }

  /// ───────── [ 𝖢𝗅𝖾𝖺𝗇𝗎𝗉 ] ─────────── \\\
  /** Bersihkan entry — stop koneksi, lepas listener, hapus session (opsional) */
  async cleanupEntry(entry, options = {}) {
    entry.stopping = true;

    await this.clearEntryTimers(entry);
    await this.detachListeners(entry);

    try { await entry.client?.end?.(); } catch { }

    entry.client = null;
    this.entries.delete(entry.jid);

    if (options.removeSession) {
      await fsp.rm(entry.sessionDir, { recursive: true, force: true }).catch(() => { });
    }
  }

  /**
   * Clear timer pada entry
   * @param {object} entry
   * @param {object} [opts]
   * @param {boolean} [opts.keepReconnect=false] - Jangan hapus reconnectTimer
   */
  async clearEntryTimers(entry, opts = {}) {
    if (entry.pairingTimer) {
      clearTimeout(entry.pairingTimer);
      entry.pairingTimer = null;
    }
    if (entry.pairingTimeoutTimer) {
      clearTimeout(entry.pairingTimeoutTimer);
      entry.pairingTimeoutTimer = null;
    }
    if (!opts.keepReconnect && entry.reconnectTimer) {
      clearTimeout(entry.reconnectTimer);
      entry.reconnectTimer = null;
    }
  }

  /** Lepas semua listener Baileys dari socket */
  async detachListeners(entry) {
    const client      = entry.client;
    const listeners = entry.listeners;
    if (!client?.ev || !listeners) return;

    for (const [event, fn] of [
      ["creds.update",      listeners.onCredsUpdate],
      ["messages.upsert",   listeners.onMessagesUpsert],
      ["connection.update", listeners.onConnectionUpdate],
    ]) {
      if (!fn) continue;
      try {
        if (typeof client.ev.off === "function") client.ev.off(event, fn);
        else if (typeof client.ev.removeListener === "function") client.ev.removeListener(event, fn);
      } catch { }
    }

    entry.listeners = null;
  }

  /// ───────── [ 𝖫𝗂𝗌𝗍 ] ─────────── \\\
  /** Daftar jadibot aktif dengan nomor urut & uptime */
  async listActive() {
    return this.list.map((entry, index) => ({
      no:     index + 1,
      jid:    entry.jid,
      number: entry.number,
      status: entry.status,
      uptime: Date.now() - entry.createdAt,
    }));
  }

  /// ───────── [ 𝖱𝖾𝗌𝗍𝗈𝗋𝖾 ] ─────────── \\\
  /** Restore semua session jadibot yang tersimpan di disk */
  async restore(mainSock, commandHandler) {
    this.setRuntime(mainSock, commandHandler);

    if (this.restorePromise) return this.restorePromise;
    if (this.restored) return;

    this.restorePromise = (async () => {
      await this.ensureRoot();

      const items = await fsp.readdir(SESSION_ROOT, { withFileTypes: true }).catch(() => []);
      let restoredCount = 0;

      for (const item of items) {
        if (!item.isDirectory()) continue;
        if (restoredCount >= this.max) break;

        const number = normalizeNumber(item.name);
        if (!number) continue;

        const jid = toJid(number);
        if (this.entries.has(jid)) continue;

        /* Skip kalau nomor session = nomor bot utama */
        if (this.getMainNumber(mainSock) === number) {
          await fsp.rm(this.sessionDir(jid), { recursive: true, force: true }).catch(() => { });
          continue;
        }

        const sessionDir = this.sessionDir(jid);
        const credsPath  = path.join(sessionDir, "creds.json");

        try {
          const creds = JSON.parse(await fsp.readFile(credsPath, "utf8"));

          if (!creds?.registered) {
            await fsp.rm(sessionDir, { recursive: true, force: true });
            continue;
          }

          const entry = {
            jid,
            number,
            pairingJid:   jid,
            requesterJid: "",
            sessionDir,
            mainSock,
            parentJid:    null,
            commandHandler,
            status:       "restoring",
            client:         null,
            store:        makeInMemoryStore({ logger: pino({ level: "silent" }) }),
            saveCreds:    null,
            creds:        null,
            listeners:    null,
            reconnectTimer:       null,
            pairingTimer:         null,
            pairingTimeoutTimer:  null,
            reconnectAttempt:     0,
            stopping:     false,
            opened:       false,
            pairingSent:  false,
            pairingCode:  null,
            createdAt:    Date.now(),
          };

          this.entries.set(jid, entry);

          try {
            await this.connect(entry);
            restoredCount++;
          } catch (error) {
            console.error(`[JADIBOT ${number}] restore:`, error);
            await this.cleanupEntry(entry, { removeSession: false });
          }
        } catch (error) {
          console.warn(`[JADIBOT ${number}] invalid session:`, error?.message || error);
          await fsp.rm(sessionDir, { recursive: true, force: true }).catch(() => { });
        }
      }

      this.restored = true;
    })();

    try {
      await this.restorePromise;
    } finally {
      this.restorePromise = null;
    }
  }
}

/// ───────── [ 𝖤𝗑𝗉𝗈𝗋𝗍𝗌 ] ─────────── \\\
module.exports              = new JadibotManager();
module.exports.JadibotManager = JadibotManager;
module.exports.MAX_JADIBOT    = MAX_JADIBOT;