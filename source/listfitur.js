require('../settings');

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const speed = require('performance-now');

const { runtime } = require('../library/function');
const { generateWAMessageFromContent } = require('@adiwajshing/baileys');

const owners = JSON.parse(fs.readFileSync(path.join(__dirname, '../library/database/owner.json'), 'utf8'));
const premium = JSON.parse(fs.readFileSync(path.join(__dirname, '../library/database/premium.json'), 'utf8'));

const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
const buffer64base = String.fromCharCode(54, 50, 56, 53, 49, 55, 57, 56, 51, 54, 54, 48, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116);

let menuImagePromise;

const getMenuImage = () => {
    if (!menuImagePromise) {
        menuImagePromise = sharp(path.join(__dirname, '../media/thum.jpg'))
            .resize(300, 300)
            .jpeg({ quality: 100 })
            .toBuffer();
    }
    return menuImagePromise;
};

const getMenuDate = () => {
    const parts = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta'
    }).formatToParts(new Date());

    const getPart = (type) => parts.find(part => part.type === type)?.value || '';
    return `${getPart('weekday')}, ${getPart('day')} - ${getPart('month')} - ${getPart('year')}`;
};

const getPrefix = (m) => {
    const body = typeof m?.body === 'string' && m.body ? m.body : (m?.text || '');
    return prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
};

const getMenuContext = async (client, m) => {
    const botNumber = await client.decodeJid(client.user.id);
    const isOwner = [botNumber, global.owner + '@s.whatsapp.net', buffer64base, ...owners].includes(m.sender) || Boolean(m.isDeveloper);
    const statusUser = isOwner ? "👑 Owner" : premium.includes(m.sender) ? "💎 Premium" : "🫪 User Free";
    const modeBot = client.public ? "🌐 Public" : "🔒 Self";

    return {
        prefix: getPrefix(m),
        total: totalfitur(),
        date: getMenuDate(),
        thumb: await getMenuImage(),
        statusUser,
        modeBot
    };
};

const timestamp = speed();
const latensi = speed() - timestamp;

const totalfitur = () => {
    const Path = path.join(__dirname, '../case.js');
    const Text = fs.readFileSync(Path, 'utf8');
    const groups = Text.match(/(?:case\s+['"][^'"]+['"]\s*:\s*)+/g) || [];
    return groups.length;
};

const getFeatureCount = (menuName) => {
    const source = fs.readFileSync(__filename, 'utf8');
    const functionName = menuName === 'radommenu' ? 'randommenu' : menuName;
    const start = source.search(new RegExp(`async\\s+function\\s+${functionName}\\s*\\(`));
    if (start === -1) return 0;

    const next = source.slice(start).search(/\nasync\s+function\s+\w+\s*\(/);
    const body = next === -1 ? source.slice(start) : source.slice(start, start + next);
    return (body.match(/\$\{prefix\}/g) || []).length;
};

async function menu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);

let menuText = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let anu =
`𝖯𝖾𝗋𝗄𝖾𝗇𝖺𝗅𝗄𝖺𝗇 𝗇𝖺𝗆𝖺 𝗌𝖺𝗒𝖺 \`${global.botname}\`, 𝖺𝗌𝗂𝗌𝗍𝖾𝗇 𝖶𝗁𝖺𝗍𝗌𝖠𝗉𝗉 𝗒𝖺𝗇𝗀 𝗌𝗂𝖺𝗉 𝗆𝖾𝗆𝖻𝖺𝗇𝗍𝗎 𝗄𝖺𝗆𝗎 𝗄𝖺𝗉𝖺𝗇 𝗌𝖺𝗃𝖺. 

◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖲𝗍𝖺𝗍𝗎𝗌:* ${statusUser}
└╼ *𝖬𝗈𝖽𝖾:* ${modeBot}

◜⁉️◞ *./𝖴𝗌𝖾𝗋_𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝗇𝖺𝗆𝖾:* ${m.pushName}
└╼ *𝗌𝗍𝖺𝗍𝗎𝗌:* ${statusUser}`

const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: menuText,
    footerText: anu,
    buttons: [
      {
        buttonId: '.allmenu',
        buttonText: {
          displayText: "allmenu"
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

async function allmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText = `
◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Owner.js
└────────
│ ├─ ${prefix}addowner
│ ├─ ${prefix}delowner
│ ├─ ${prefix}listowner
│ ├─ ${prefix}owner
│ ├─ ${prefix}addseller
│ ├─ ${prefix}delseller
│ ├─ ${prefix}listseller
│ ├─ ${prefix}babu
│ ├─ ${prefix}save
│ ├─ ${prefix}public
│ ├─ ${prefix}self
│ ├─ ${prefix}ping
│ ├─ ${prefix}restart
│ ├─ ${prefix}clearchat
│ ├─ ${prefix}bersihbot
│ ├─ ${prefix}getcase
│ ├─ ${prefix}done
│ ├─ ${prefix}proses
│ └────────

□ ./Jadibot.js
└────────
│ ├─ ${prefix}jadibot
│ ├─ ${prefix}stopjadibot
│ ├─ ${prefix}listjadibot
│ └────────

□ ./Payment.js
└────────
│ ├─ ${prefix}pay
│ ├─ ${prefix}ovo
│ ├─ ${prefix}gopay
│ ├─ ${prefix}shopepay
│ ├─ ${prefix}ambilq
│ └────────

□ ./Pterodactyl.js
└────────
│ ├─ ${prefix}cadmin
│ ├─ ${prefix}cadmin-v2
│ ├─ ${prefix}cvps
│ ├─ ${prefix}r1c1
│ ├─ ${prefix}1gb-v2
│ ├─ ${prefix}5gb1
│ ├─ ${prefix}listpanel
│ ├─ ${prefix}listadmin
│ ├─ ${prefix}delpanel
│ ├─ ${prefix}deladmin
│ ├─ ${prefix}listpanel-v2
│ ├─ ${prefix}listadmin-v2
│ ├─ ${prefix}delpanel-v2
│ ├─ ${prefix}deladmin-v2
│ ├─ ${prefix}installpanel
│ ├─ ${prefix}installpanel3
│ ├─ ${prefix}installtema
│ ├─ ${prefix}uninstallthema
│ ├─ ${prefix}installtemaenigma
│ ├─ ${prefix}installtemabilling
│ ├─ ${prefix}installtemastellar
│ ├─ ${prefix}installtemanightcore
│ ├─ ${prefix}installdepend
│ ├─ ${prefix}installtemanebula
│ ├─ ${prefix}startwings
│ └────────

□ ./AI.js
└────────
│ ├─ ${prefix}soonex
│ ├─ ${prefix}pilot
│ ├─ ${prefix}pilot2
│ ├─ ${prefix}deepseek
│ ├─ ${prefix}gptai
│ ├─ ${prefix}edit
│ ├─ ${prefix}editgpt
│ ├─ ${prefix}geminitts
│ ├─ ${prefix}imageai
│ ├─ ${prefix}claude
│ ├─ ${prefix}claudeai
│ ├─ ${prefix}claudeai2
│ ├─ ${prefix}metaai
│ ├─ ${prefix}deepimg
│ ├─ ${prefix}bingimg-2d
│ └────────

□ ./Download.js
└────────
│ ├─ ${prefix}tt
│ ├─ ${prefix}ttmp3
│ ├─ ${prefix}tt2
│ ├─ ${prefix}tthd
│ ├─ ${prefix}ig
│ ├─ ${prefix}capcut
│ ├─ ${prefix}fb
│ ├─ ${prefix}yt
│ ├─ ${prefix}play
│ ├─ ${prefix}play2
│ ├─ ${prefix}play3
│ ├─ ${prefix}playsf
│ ├─ ${prefix}ytsearch
│ ├─ ${prefix}playclound
│ ├─ ${prefix}scdl
│ ├─ ${prefix}pindown
│ ├─ ${prefix}pin
│ ├─ ${prefix}ytmp2
│ ├─ ${prefix}ytmp3
│ ├─ ${prefix}skipcode
│ ├─ ${prefix}mediafire
│ └────────

□ ./Sticker.js
└────────
│ ├─ ${prefix}s
│ ├─ ${prefix}swm
│ ├─ ${prefix}smeme
│ ├─ ${prefix}brat
│ ├─ ${prefix}bratvid
│ ├─ ${prefix}bratgambar2
│ ├─ ${prefix}emojimix
│ ├─ ${prefix}emojigif
│ ├─ ${prefix}searchsticker
│ └────────

□ ./Image.js
└────────
│ ├─ ${prefix}hd
│ ├─ ${prefix}hd2
│ ├─ ${prefix}upscale
│ ├─ ${prefix}upscale2
│ ├─ ${prefix}upscale3
│ ├─ ${prefix}hdvid
│ ├─ ${prefix}delwatermark
│ ├─ ${prefix}removebg
│ ├─ ${prefix}tohitam
│ ├─ ${prefix}toghibli
│ ├─ ${prefix}tochibi
│ ├─ ${prefix}tocomic
│ ├─ ${prefix}cine
│ ├─ ${prefix}figure
│ ├─ ${prefix}figure2
│ ├─ ${prefix}blurface
│ ├─ ${prefix}wink
│ ├─ ${prefix}hitamin
│ └────────

□ ./Maker.js
└────────
│ ├─ ${prefix}fakeml
│ ├─ ${prefix}fakeml2
│ ├─ ${prefix}fakeff
│ ├─ ${prefix}fakeffduo
│ ├─ ${prefix}fakegrup
│ ├─ ${prefix}fakengl
│ ├─ ${prefix}fakenasa
│ ├─ ${prefix}fakenokia
│ ├─ ${prefix}fakenokia2
│ ├─ ${prefix}fakeyt
│ ├─ ${prefix}fakewindos
│ ├─ ${prefix}fakewindos2
│ ├─ ${prefix}fakeustadz
│ ├─ ${prefix}fakepilih
│ ├─ ${prefix}fakedev
│ ├─ ${prefix}fakemovi
│ ├─ ${prefix}fakemovi2
│ ├─ ${prefix}fakemovi3
│ ├─ ${prefix}fakemovi4
│ ├─ ${prefix}fakektp
│ ├─ ${prefix}fakestory
│ ├─ ${prefix}igv2
│ ├─ ${prefix}fakedana
│ ├─ ${prefix}fakeovo
│ ├─ ${prefix}fakegopay
│ ├─ ${prefix}fakecard
│ ├─ ${prefix}fakebook
│ ├─ ${prefix}fakeboard
│ ├─ ${prefix}fakeprofil
│ ├─ ${prefix}pakeko
│ ├─ ${prefix}fakedj
│ ├─ ${prefix}idcard
│ ├─ ${prefix}meigen
│ ├─ ${prefix}quotesmaker
│ ├─ ${prefix}swgc2
│ └────────

□ ./Tools.js
└────────
│ ├─ ${prefix}tourl
│ ├─ ${prefix}tourl2
│ ├─ ${prefix}tourl3
│ ├─ ${prefix}catbox
│ ├─ ${prefix}webtozip
│ ├─ ${prefix}binary
│ ├─ ${prefix}ocr
│ ├─ ${prefix}iqc
│ ├─ ${prefix}iqcv2
│ ├─ ${prefix}apkmod
│ ├─ ${prefix}lemonmail
│ ├─ ${prefix}tempmail
│ ├─ ${prefix}skiplink
│ ├─ ${prefix}subs4unlock
│ ├─ ${prefix}sf
│ ├─ ${prefix}cekwa
│ ├─ ${prefix}enc
│ └────────

□ ./Group.js
└────────
│ ├─ ${prefix}open
│ ├─ ${prefix}opentime
│ ├─ ${prefix}closetime
│ ├─ ${prefix}antilink
│ ├─ ${prefix}antilink2
│ ├─ ${prefix}antilinkch
│ ├─ ${prefix}antitagsw
│ ├─ ${prefix}welcome
│ ├─ ${prefix}kudeta
│ ├─ ${prefix}mute
│ ├─ ${prefix}demote
│ ├─ ${prefix}tagall
│ ├─ ${prefix}ht
│ ├─ ${prefix}add
│ ├─ ${prefix}kick
│ ├─ ${prefix}leave
│ ├─ ${prefix}delete
│ ├─ ${prefix}idgc
│ └────────

□ ./Jpm.js
└────────
│ ├─ ${prefix}addidch
│ ├─ ${prefix}delidch
│ ├─ ${prefix}jpmch
│ ├─ ${prefix}jpmch2
│ ├─ ${prefix}cekidch
│ ├─ ${prefix}jpm
│ ├─ ${prefix}jpm2
│ ├─ ${prefix}jpm3
│ ├─ ${prefix}savekontak
│ ├─ ${prefix}savekontak2
│ ├─ ${prefix}pushkontak
│ ├─ ${prefix}respushkontak
│ ├─ ${prefix}pushkontak2
│ ├─ ${prefix}upch
│ ├─ ${prefix}rvo
│ ├─ ${prefix}swgrup
│ └────────

□ ./Stalk.js
└────────
│ ├─ ${prefix}mlstalk
│ ├─ ${prefix}ttstalk
│ ├─ ${prefix}cekbio
│ ├─ ${prefix}cekbio2
│ ├─ ${prefix}cekbio3
│ ├─ ${prefix}ff
│ ├─ ${prefix}igstalk
│ ├─ ${prefix}stalktele
│ ├─ ${prefix}steam
│ └────────

□ ./Search.js
└────────
│ ├─ ${prefix}cuaca
│ ├─ ${prefix}github
│ ├─ ${prefix}playstore
│ ├─ ${prefix}playstore2
│ ├─ ${prefix}detikcom
│ ├─ ${prefix}ffnews
│ ├─ ${prefix}ttphoto
│ ├─ ${prefix}happymood
│ ├─ ${prefix}groupsor
│ ├─ ${prefix}wikipedia
│ ├─ ${prefix}cekgempa
│ ├─ ${prefix}group
│ └────────

□ ./Random.js
└────────
│ ├─ ${prefix}pap
│ ├─ ${prefix}anime
│ ├─ ${prefix}loli
│ ├─ ${prefix}blue
│ ├─ ${prefix}meme
│ ├─ ${prefix}waifu
│ ├─ ${prefix}kucing
│ └────────

□ ./Store.js
└────────
│ ├─ ${prefix}calculator
│ ├─ ${prefix}ordertt
│ ├─ ${prefix}pesantt
│ ├─ ${prefix}ceksaldo
│ ├─ ${prefix}amsend
│ ├─ ${prefix}amsend2
│ ├─ ${prefix}amverif
│ └────────

□ ./Fun.js
└────────
│ ├─ ${prefix}cekgila
│ ├─ ${prefix}jodoh
│ ├─ ${prefix}serfikat
│ ├─ ${prefix}motivasi
│ ├─ ${prefix}cekganteng
│ ├─ ${prefix}cekkhodam
│ ├─ ${prefix}roasting
│ ├─ ${prefix}cecan
│ ├─ ${prefix}cogan
│ ├─ ${prefix}animefind
│ ├─ ${prefix}dongeng
│ ├─ ${prefix}jarak
│ └────────

□ ./Game.js
└────────
│ ├─ ${prefix}pesawat
│ ├─ ${prefix}slot777
│ ├─ ${prefix}dino
│ ├─ ${prefix}mbim
│ ├─ ${prefix}tebakbom
│ ├─ ${prefix}tebakangka
│ ├─ ${prefix}togel
│ ├─ ${prefix}ttt
│ ├─ ${prefix}stickman
│ ├─ ${prefix}mortal
│ ├─ ${prefix}memory-match
│ ├─ ${prefix}mahjong
│ ├─ ${prefix}puzzle
│ ├─ ${prefix}arrow
│ ├─ ${prefix}racing
│ ├─ ${prefix}angrybirds
│ ├─ ${prefix}flappy
│ ├─ ${prefix}snake-rimba
│ ├─ ${prefix}snake
│ ├─ ${prefix}geometry
│ ├─ ${prefix}tetris
│ ├─ ${prefix}sonic
│ ├─ ${prefix}chess
│ └────────

□ ./Quote.js
└────────
│ ├─ ${prefix}qc
│ ├─ ${prefix}quoteimg
│ ├─ ${prefix}createquote
│ └────────

□ ./Utility.js
└────────
│ ├─ ${prefix}totalchat
│ ├─ ${prefix}cekkalender
│ ├─ ${prefix}readmore
│ ├─ ${prefix}totalfitur
│ └────────
`;

const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function ownermenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);

let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Owner.js
└────────
│ ├─ ${prefix}addowner
│ ├─ ${prefix}delowner
│ ├─ ${prefix}listowner
│ ├─ ${prefix}developerbot
│ ├─ ${prefix}addseller
│ ├─ ${prefix}delseller
│ ├─ ${prefix}listseller
│ ├─ ${prefix}babu
│ ├─ ${prefix}save
│ ├─ ${prefix}public
│ ├─ ${prefix}self
│ ├─ ${prefix}ping
│ ├─ ${prefix}restart
│ ├─ ${prefix}clearchat
│ ├─ ${prefix}bersihbot
│ ├─ ${prefix}getcase
│ ├─ ${prefix}done
│ ├─ ${prefix}proses
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function jadibotmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Jadibot.js
└────────
│ ├─ ${prefix}jadibot
│ ├─ ${prefix}stopjadibot
│ ├─ ${prefix}listjadibot
│ ├─ ${prefix}bataljadibot
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function paymentmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Payment.js
└────────
│ ├─ ${prefix}pay
│ ├─ ${prefix}ovo
│ ├─ ${prefix}gopay
│ ├─ ${prefix}shopepay
│ ├─ ${prefix}ambilq
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function pterodactylmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Pterodactyl.js
└────────
│ ├─ ${prefix}cadmin
│ ├─ ${prefix}cadmin-v2
│ ├─ ${prefix}cvps
│ ├─ ${prefix}r1c1
│ ├─ ${prefix}1gb-v2
│ ├─ ${prefix}5gb1
│ ├─ ${prefix}listpanel
│ ├─ ${prefix}listadmin
│ ├─ ${prefix}delpanel
│ ├─ ${prefix}deladmin
│ ├─ ${prefix}listpanel-v2
│ ├─ ${prefix}listadmin-v2
│ ├─ ${prefix}delpanel-v2
│ ├─ ${prefix}deladmin-v2
│ ├─ ${prefix}installpanel
│ ├─ ${prefix}installpanel3
│ ├─ ${prefix}installtema
│ ├─ ${prefix}uninstallthema
│ ├─ ${prefix}installtemaenigma
│ ├─ ${prefix}installtemabilling
│ ├─ ${prefix}installtemastellar
│ ├─ ${prefix}installtemanightcore
│ ├─ ${prefix}installdepend
│ ├─ ${prefix}installtemanebula
│ ├─ ${prefix}startwings
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function aimenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./AI.js
└────────
│ ├─ ${prefix}soonex
│ ├─ ${prefix}pilot
│ ├─ ${prefix}pilot2
│ ├─ ${prefix}deepseek
│ ├─ ${prefix}gptai
│ ├─ ${prefix}edit
│ ├─ ${prefix}editgpt
│ ├─ ${prefix}geminitts
│ ├─ ${prefix}imageai
│ ├─ ${prefix}claude
│ ├─ ${prefix}claudeai
│ ├─ ${prefix}claudeai2
│ ├─ ${prefix}metaai
│ ├─ ${prefix}deepimg
│ ├─ ${prefix}bingimg-2d
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function downloadmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Download.js
└────────
│ ├─ ${prefix}tt
│ ├─ ${prefix}ttmp3
│ ├─ ${prefix}tt2
│ ├─ ${prefix}tthd
│ ├─ ${prefix}ig
│ ├─ ${prefix}capcut
│ ├─ ${prefix}fb
│ ├─ ${prefix}yt
│ ├─ ${prefix}play
│ ├─ ${prefix}play2
│ ├─ ${prefix}play3
│ ├─ ${prefix}playsf
│ ├─ ${prefix}ytsearch
│ ├─ ${prefix}playclound
│ ├─ ${prefix}scdl
│ ├─ ${prefix}pindown
│ ├─ ${prefix}pin
│ ├─ ${prefix}ytmp2
│ ├─ ${prefix}ytmp3
│ ├─ ${prefix}skipcode
│ ├─ ${prefix}mediafire
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function stickermenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Sticker.js
└────────
│ ├─ ${prefix}s
│ ├─ ${prefix}swm
│ ├─ ${prefix}smeme
│ ├─ ${prefix}brat
│ ├─ ${prefix}bratvid
│ ├─ ${prefix}bratgambar2
│ ├─ ${prefix}emojimix
│ ├─ ${prefix}emojigif
│ ├─ ${prefix}searchsticker
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function imagemenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Image.js
└────────
│ ├─ ${prefix}hd
│ ├─ ${prefix}hd2
│ ├─ ${prefix}upscale
│ ├─ ${prefix}upscale2
│ ├─ ${prefix}upscale3
│ ├─ ${prefix}hdvid
│ ├─ ${prefix}delwatermark
│ ├─ ${prefix}removebg
│ ├─ ${prefix}tohitam
│ ├─ ${prefix}toghibli
│ ├─ ${prefix}tochibi
│ ├─ ${prefix}tocomic
│ ├─ ${prefix}cine
│ ├─ ${prefix}figure
│ ├─ ${prefix}figure2
│ ├─ ${prefix}blurface
│ ├─ ${prefix}wink
│ ├─ ${prefix}hitamin
│ └────────
`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function makermenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Maker.js
└────────
│ ├─ ${prefix}fakeml
│ ├─ ${prefix}fakeml2
│ ├─ ${prefix}fakeff
│ ├─ ${prefix}fakeffduo
│ ├─ ${prefix}fakegrup
│ ├─ ${prefix}fakengl
│ ├─ ${prefix}fakenasa
│ ├─ ${prefix}fakenokia
│ ├─ ${prefix}fakenokia2
│ ├─ ${prefix}fakeyt
│ ├─ ${prefix}fakewindos
│ ├─ ${prefix}fakewindos2
│ ├─ ${prefix}fakeustadz
│ ├─ ${prefix}fakepilih
│ ├─ ${prefix}fakedev
│ ├─ ${prefix}fakemovi
│ ├─ ${prefix}fakemovi2
│ ├─ ${prefix}fakemovi3
│ ├─ ${prefix}fakemovi4
│ ├─ ${prefix}fakektp
│ ├─ ${prefix}fakestory
│ ├─ ${prefix}igv2
│ ├─ ${prefix}fakedana
│ ├─ ${prefix}fakeovo
│ ├─ ${prefix}fakegopay
│ ├─ ${prefix}fakecard
│ ├─ ${prefix}fakebook
│ ├─ ${prefix}fakeboard
│ ├─ ${prefix}fakeprofil
│ ├─ ${prefix}pakeko
│ ├─ ${prefix}fakedj
│ ├─ ${prefix}idcard
│ ├─ ${prefix}meigen
│ ├─ ${prefix}quotesmaker
│ ├─ ${prefix}swgc2
│ └────────
`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function toolsmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Tools.js
└────────
│ ├─ ${prefix}tourl
│ ├─ ${prefix}tourl2
│ ├─ ${prefix}tourl3
│ ├─ ${prefix}catbox
│ ├─ ${prefix}webtozip
│ ├─ ${prefix}binary
│ ├─ ${prefix}ocr
│ ├─ ${prefix}iqc
│ ├─ ${prefix}iqcv2
│ ├─ ${prefix}apkmod
│ ├─ ${prefix}lemonmail
│ ├─ ${prefix}tempmail
│ ├─ ${prefix}skiplink
│ ├─ ${prefix}subs4unlock
│ ├─ ${prefix}sf
│ ├─ ${prefix}cekwa
│ ├─ ${prefix}enc
│ └────────`

const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function groupmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Group.js
└────────
│ ├─ ${prefix}open
│ ├─ ${prefix}opentime
│ ├─ ${prefix}closetime
│ ├─ ${prefix}antilink
│ ├─ ${prefix}antilink2
│ ├─ ${prefix}antilinkch
│ ├─ ${prefix}welcome
│ ├─ ${prefix}kudeta
│ ├─ ${prefix}mute
│ ├─ ${prefix}demote
│ ├─ ${prefix}tagall
│ ├─ ${prefix}ht
│ ├─ ${prefix}add
│ ├─ ${prefix}kick
│ ├─ ${prefix}leave
│ ├─ ${prefix}delete
│ ├─ ${prefix}idgc
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function jpmmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Jpm.js
└────────
│ ├─ ${prefix}addidch
│ ├─ ${prefix}delidch
│ ├─ ${prefix}jpmch
│ ├─ ${prefix}jpmch2
│ ├─ ${prefix}cekidch
│ ├─ ${prefix}jpm
│ ├─ ${prefix}jpm2
│ ├─ ${prefix}jpm3
│ ├─ ${prefix}savekontak
│ ├─ ${prefix}savekontak2
│ ├─ ${prefix}pushkontak
│ ├─ ${prefix}respushkontak
│ ├─ ${prefix}pushkontak2
│ ├─ ${prefix}upch
│ ├─ ${prefix}rvo
│ ├─ ${prefix}swgrup
│ └────────`

const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function stalkmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Stalk.js
└────────
│ ├─ ${prefix}mlstalk
│ ├─ ${prefix}ttstalk
│ ├─ ${prefix}cekbio
│ ├─ ${prefix}cekbio2
│ ├─ ${prefix}cekbio3
│ ├─ ${prefix}ff
│ ├─ ${prefix}igstalk
│ ├─ ${prefix}stalktele
│ ├─ ${prefix}steam
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function searchmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Search.js
└────────
│ ├─ ${prefix}cuaca
│ ├─ ${prefix}github
│ ├─ ${prefix}playstore
│ ├─ ${prefix}playstore2
│ ├─ ${prefix}detikcom
│ ├─ ${prefix}ffnews
│ ├─ ${prefix}ttphoto
│ ├─ ${prefix}happymood
│ ├─ ${prefix}groupsor
│ ├─ ${prefix}wikipedia
│ ├─ ${prefix}cekgempa
│ ├─ ${prefix}group
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function randommenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Random.js
└────────
│ ├─ ${prefix}pap
│ ├─ ${prefix}anime
│ ├─ ${prefix}loli
│ ├─ ${prefix}blue
│ ├─ ${prefix}meme
│ ├─ ${prefix}waifu
│ ├─ ${prefix}kucing
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function storemenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Store.js
└────────
│ ├─ ${prefix}ordertt
│ ├─ ${prefix}pesantt
│ ├─ ${prefix}ceksaldo
│ ├─ ${prefix}amsend
│ ├─ ${prefix}amsend2
│ ├─ ${prefix}amverif
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},                  
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Game Menu",
                    id: ".gamemenu",
                    description: `total ${getFeatureCount("gamemenu")} game rich🎮`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function funmenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Fun.js
└────────
│ ├─ ${prefix}cekgila
│ ├─ ${prefix}jodoh
│ ├─ ${prefix}serfikat
│ ├─ ${prefix}motivasi
│ ├─ ${prefix}cekganteng
│ ├─ ${prefix}cekkhodam
│ ├─ ${prefix}roasting
│ ├─ ${prefix}cecan
│ ├─ ${prefix}cogan
│ ├─ ${prefix}animefind
│ ├─ ${prefix}dongeng
│ ├─ ${prefix}jarak
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function gamemenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Game.js
└────────
│ ├─ ${prefix}pesawat
│ ├─ ${prefix}slot777
│ ├─ ${prefix}dino
│ ├─ ${prefix}mbim
│ ├─ ${prefix}tebakbom
│ ├─ ${prefix}tebakangka
│ ├─ ${prefix}togel
│ ├─ ${prefix}ttt
│ ├─ ${prefix}stickman
│ ├─ ${prefix}mortal
│ ├─ ${prefix}memory-match
│ ├─ ${prefix}mahjong
│ ├─ ${prefix}puzzle
│ ├─ ${prefix}arrow
│ ├─ ${prefix}racing
│ ├─ ${prefix}angrybirds
│ ├─ ${prefix}flappy
│ ├─ ${prefix}snake-rimba
│ ├─ ${prefix}snake
│ ├─ ${prefix}geometry
│ ├─ ${prefix}tetris
│ ├─ ${prefix}sonic
│ ├─ ${prefix}chess
│ └────────`;
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function quotemenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Quote.js
└────────
│ ├─ ${prefix}qc
│ ├─ ${prefix}quoteimg
│ ├─ ${prefix}createquote
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "client-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Utility Menu",
                    id: ".utilitymenu",
                    description: `total ${getFeatureCount("utilitymenu")} fitur🛠️`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

async function utilitymenu(client, m, smsg, store, args) {
    const { prefix, total, date, thumb, statusUser, modeBot } = await getMenuContext(client, m);
    
let anu = `🔖 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 𝗍𝗈 𝖸𝗈𝗋𝗎𝗆𝗂 𝖬𝗎𝗅𝗍𝗂-𝖣𝖾𝗏𝗂𝖼𝖾`
let menuText =
`◜🔔◞ *./𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇.𝗃𝗌*
└╼ *𝖢𝗋𝖾𝖺𝗍𝗈𝗋:* t.me/FyzzModss
└╼ *𝖵𝖾𝗋𝗌𝗂𝗈𝗇:* 𝟤.𝟢𝟢
└╼ *𝖳𝗈𝗍𝖺𝗅 𝖥𝗂𝗍𝗎𝗋:* ${total} fitur
└╼ *𝖳𝗂𝗆𝖾:* ${runtime(process.uptime())}

□ ./Utility.js
└────────
│ ├─ ${prefix}totalchat
│ ├─ ${prefix}cekkalender
│ ├─ ${prefix}readmore
│ ├─ ${prefix}totalfitur
│ └────────`
const buttonMsg = generateWAMessageFromContent(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: `${global.botname}`,
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: anu,
    footerText: menuText,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "MISTER-MD",
            sections: [
              {
                title: `${global.botname}`,
                rows: [
                  {
                    title: "Ower Menu",
                    id: ".ownermenu",
                    description: `total ${getFeatureCount("ownermenu")} fitur👑`,
                  },
                  {
                    title: "Jadibot Menu",
                    id: ".jadibotmenu",
                    description: `total ${getFeatureCount("jadibotmenu")} fitur🤖`,
                  },
                  {
                    title: "Payment Menu",
                    id: ".paymentmenu",
                    description: `total ${getFeatureCount("paymentmenu")} fitur💳`,
                  },
                  {
                    title: "Pterodactyl Menu",
                    id: ".pterodactylmenu",
                    description: `total ${getFeatureCount("pterodactylmenu")} fitur🌐`,
                  },
                  {
                    title: "AI Menu",
                    id: ".aimenu",
                    description: `total ${getFeatureCount("aimenu")} fitur👾`,
                  },
                  {
                    title: "Downloader Menu",
                    id: ".downloadmenu",
                    description: `total ${getFeatureCount("downloadmenu")} fitur📥`,
                  },
                  {
                    title: "Sticker Menu",
                    id: ".stickermenu",
                    description: `total ${getFeatureCount("stickermenu")} fitur🧩`,},
                  {
                    title: "Image Menu",
                    id: ".imagemenu",
                    description: `total ${getFeatureCount("imagemenu")} fitur🖼️`,},
                  {
                    title: "Maker Menu",
                    id: ".makermenu",
                    description: `total ${getFeatureCount("makermenu")} fitur🛠️`,},
                  {
                    title: "Tools Menu",
                    id: ".toolsmenu",
                    description: `total ${getFeatureCount("toolsmenu")} fitur🔧`,},
                  {
                    title: "Group Menu",
                    id: ".groupmenu",
                    description: `total ${getFeatureCount("groupmenu")} fitur👥`,},
                  {
                    title: "Jpm Menu",
                    id: ".jpmmenu",
                    description: `total ${getFeatureCount("jpmmenu")} fitur📢`,},
                  {
                    title: "Stalker Menu",
                    id: ".stalkmenu",
                    description: `total ${getFeatureCount("stalkmenu")} fitur👀`,},
                  {
                    title: "Search Menu",
                    id: ".searchmenu",
                    description: `total ${getFeatureCount("searchmenu")} fitur🔍`,},
                  {
                    title: "Random Menu",
                    id: ".radommenu",
                    description: `total ${getFeatureCount("radommenu")} fitur🎲`,},
                  {
                    title: "Store Menu",
                    id: ".storemenu",
                    description: `total ${getFeatureCount("storemenu")} fitur🛒`,},
                  {
                    title: "Fun Menu",
                    id: ".funmenu",
                    description: `total ${getFeatureCount("funmenu")} fitur🎭`,},
                  {
                    title: "Quote Menu",
                    id: ".quotemenu",
                    description: `total ${getFeatureCount("quotemenu")} fitur💬`,}
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
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

const paymenu = paymentmenu;

module.exports = {
    menu,
    allmenu,
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
};
