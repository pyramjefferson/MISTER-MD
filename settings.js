const fs = require('fs');
const chalk = require('chalk');
const sharp = require('sharp');
const { version } = require("./package.json")

// Settings Bot
global.owner = '50940217685'
global.versi = version
global.namaOwner = "MISTER DEV"
global.tele = "wa.me/50940217685"
global.packname = 'Sticker by - MISTER-MD'
global.botname = 'MISTER-MD'
global.botname2 = 'MISTER-MD'
global.maxJadibot = 20
global.pair = 'MISTER-MD'

// Settings Link
global.linkOwner = 'https://wa.me/50940217685'
global.linkGrup = 'https://chat.whatsapp.com/EMEjJYmPY9t82FY23qJ9Zw'
global.source = 'https://whatsapp.com/channel/0029Vb8oizBBKfi9ZF3urZ29'

// Settings Jeda
global.delayJpm = 3500
global.delayPushkontak = 6000

// Settings Saluran
global.linkSaluran = 'https://whatsapp.com/channel/0029Vb8oizBBKfi9ZF3urZ29'
global.idSaluran = "120363428260954472@newsletter"
global.namaSaluran = "𝖲𝖺𝗅𝗎𝗋𝖺𝗇 𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇"

// Settings Orkut
global.merchantIdOrderKuota = "-"
global.apiOrderKuota = "-"
global.qrisOrderKuota = "-"

// Settings Apikey
global.apiDigitalOcean = "-"
global.apiSimpleBot = "simplebotz85"

// Settings Payment
global.pay = sharp('./media//payment/payment.jpg')
.resize(300, 300)
.jpeg({ quality: 100 })
.toBuffer();
        
global.dana = "08xxx"
global.ovo = "08xxx"
global.gopay = "08xxx"
global.shoopepay = "08xxx"
global.qris = "./media/payment/qris.jpg"

global.andana = "nama akun dana"
global.anovo = "nama akun ovo"
global.angopay = "nama akun gopay"
global.anshoope = "nama akun shoopepay"

// Settings Image
global.image = {
menu: "https://files.catbox.moe/fswkuu.jpg", 
reply: "https://files.catbox.moe/x8nxvv.jpg", 
logo: "https://files.catbox.moe/fswkuu.jpg", 
qris: "https://files.catbox.moe/9jw95v.jpg"
}

global.thumb = sharp('./media/thum.jpg')
        .resize(300, 300)
        .jpeg({ quality: 100 })
        .toBuffer();

// Settings Api Panel 
global.domain = "https://"
global.apikey = "" 
global.capikey = ""
global.egg = "15" 
global.nestid = "5"
global.loc = "1" 

// Settings Api Panel 2
global.domainV2 = "https://xxx"
global.apikeyV2 = "ptla_xxx" 
global.capikeyV2 = "ptlc_xxx"
global.eggV2 = "15" 
global.nestidV2 = "5"
global.locV2 = "1"

// Settings Teks Promosi
global.tekspromosi = `
bebas isi teks apa aja
`

// Settings Message 
global.mess = {
	owner: "*[ Akses Ditolak ]*\nFitur ini hanya untuk Owner!",
	admin: "*[ Akses Ditolak ]*\nFitur ini hanya untuk admin grup!",
	botAdmin: "*[ Akses Ditolak ]*\nFitur ini hanya untuk ketika bot menjadi admin!",
	group: "*[ Akses Ditolak ]*\nFitur ini hanya untuk dalam grup!",
	private: "*[ Akses Ditolak ]*\nFitur ini hanya untuk dalam private chat!",
	prem: "*[ Akses Ditolak ]*\nFitur ini khusus user premium",
	wait: 'Loading...',
	error: 'Error!',
	done: 'Done'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})