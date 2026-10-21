const axios = require("axios")

const baseUrl = "https://api.siputzx.my.id/api/canvas/welcomev4"
const backgroundV = "https://i.ibb.co/4YBNyvP/images-76.jpg"

const xmsg = {
    welcome: (subject) => `Selamat datang di ${subject}`,
    leave:   (subject) => `Telah keluar dari ${subject}`,
}

const msg = {
    promote: "Telah menjadi admin",
    demote: "Telah di berhentikan menjadi admin",
}

/**
 * Memotong teks jika melebihi panjang maksimal.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
function truncate(text, max) {
    return text.length > max ? `${text.substring(0, max - 5)}..` : text
}

/**
 * Membuat banner welcome/leave menggunakan API siputzx.
 * @param {string} avatar  - URL avatar pengguna
 * @param {string} name  - Nama pengguna
 * @param {string} subject  - Nama grup/subjek
 * @param {"welcome"|"leave"} type
 * @returns {Promise<Buffer|null>}
 */
async function welcomeBanner(avatar, name, subject, type = "welcome") {
    try {
        const buildMessage = xmsg[type] ?? xmsg.welcome
        const description = truncate(buildMessage(subject), 70)

        const { data } = await axios.get(baseUrl, {
            params: {
                avatar,
                background: backgroundV,
                description,
            },
            responseType: "arraybuffer",
        })

        return Buffer.from(data)
    } catch (err) {
        console.error("Error:", err.message)
        return null
    }
}

/**
 * Membuat banner promote/demote admin.
 * @param {string} avatar
 * @param {string} name
 * @param {"promote"|"demote"} type
 * @returns {Promise<Buffer|null>}
 */
async function promoteBanner(avatar, name, type) {
    const subject = msg[type] ?? msg.promote
    return welcomeBanner(avatar, name, subject, "welcome")
}

module.exports = { welcomeBanner, promoteBanner }