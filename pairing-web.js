'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const ROOT = __dirname;
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
  res.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 4096) { reject(new Error('Request twò gwo.')); req.destroy(); }
    });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch { reject(new Error('JSON pa valid.')); }
    });
    req.on('error', reject);
  });
}
function rateLimited(ip) {
  const now = Date.now();
  const item = hits.get(ip);
  if (!item || now - item.start > WINDOW_MS) { hits.set(ip, { start: now, count: 1 }); return false; }
  item.count += 1;
  return item.count > MAX_PER_WINDOW;
}
function normalizeNumber(v) { return String(v || '').replace(/\D/g, ''); }

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    try { return send(res, 200, fs.readFileSync(path.join(ROOT, 'public', 'index.html'), 'utf8'), 'text/html; charset=utf-8'); }
    catch { return send(res, 500, { error: 'Paj la pa disponib.' }); }
  }
  if (req.method === 'POST' && url.pathname === '/api/pair') {
    const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
    if (rateLimited(ip)) return send(res, 429, { error: 'Twòp demann. Tann yon minit epi eseye ankò.' });
    let body;
    try { body = await readJson(req); } catch (e) { return send(res, 400, { error: e.message }); }
    const number = normalizeNumber(body.number);
    if (!/^\d{8,15}$/.test(number)) return send(res, 400, { error: 'Antre nimewo a ak kòd peyi a, sèlman chif. Egzanp: 509XXXXXXXX.' });
    const manager = require('./source/jadibot');
    const handler = require('./case');
    const liveSock = manager.mainSock;
    if (!liveSock || !liveSock.user) return send(res, 503, { error: 'Bot prensipal la poko pare. Kòmanse bot la epi voye yon mesaj ba li, apre sa eseye ankò.' });
    const result = await manager.start(liveSock, number, handler, null);
    if (!result.ok && !result.pending) return send(res, 409, { error: result.message || 'Pa t kapab kòmanse pairing la.' });
    return send(res, 202, { ok: true, number, message: 'N ap kreye kòd la. Paj la ap tann li.' });
  }
  const match = req.method === 'GET' && url.pathname.match(/^\/api\/pair\/([0-9]{8,15})$/);
  if (match) {
    const number = match[1];
    const manager = require('./source/jadibot');
    const entry = manager.entries.get(`${number}@s.whatsapp.net`);
    if (!entry) return send(res, 404, { status: 'not_found', error: 'Pa gen pairing aktif pou nimewo sa a.' });
    if (entry.pairingCode) return send(res, 200, { status: 'ready', code: entry.pairingCode, number });
    if (entry.opened || entry.status === 'online') return send(res, 200, { status: 'connected', number, message: 'WhatsApp deja konekte.' });
    if (entry.stopping || entry.status === 'logged_out') return send(res, 410, { status: 'expired', error: 'Pairing sa a fini. Eseye ankò.' });
    return send(res, 200, { status: 'waiting', message: 'N ap tann kòd la...' });
  }
  return send(res, 404, { error: 'Pa jwenn paj sa a.' });
});
server.listen(PORT, HOST, () => console.log(`[MISTER-MD PAIR WEB] Listening on ${HOST}:${PORT}`));
