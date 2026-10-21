require('../settings')

async function LoadDataBase(client, m) {
    try {
        global.db ??= {}
        global.db.settings ??= {}
        global.db.users ??= {}
        global.db.groups ??= {}

        const settings = global.db.settings
        if (!('anticall' in settings)) settings.anticall = false
        if (!('autobio' in settings)) settings.autobio = false
        if (!('autoread' in settings)) settings.autoread = false
        if (!('autopromosi' in settings)) settings.autopromosi = false
        if (!('autotyping' in settings)) settings.autotyping = false
        if (!('readsw' in settings)) settings.readsw = false
        if (!('owneroffmode' in settings)) settings.owneroffmode = false

        const user = global.db.users[m.sender] ??= {}
        if (!('status_deposit' in user)) user.status_deposit = false
        if (!('saldo' in user)) user.saldo = 0

        if (m.isGroup) {
            const group = global.db.groups[m.chat] ??= {}
            if (!('antilink' in group)) group.antilink = false
            if (!('antilink2' in group)) group.antilink2 = false
            if (!('welcome' in group)) group.welcome = false
            if (!('mute' in group)) group.mute = false
            if (!('simi' in group)) group.simi = false
            if (!('blacklistjpm' in group)) group.blacklistjpm = false
        }

        return global.db
    } catch (error) {
        console.error('[LoadDataBase]', error)
        throw error
    }
}

module.exports = { LoadDataBase }
