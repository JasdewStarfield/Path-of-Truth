{
    let settings = null
    let fCaveModeAllowed = null
    let settingsMinimap = null
    let minimapOptions = Java.loadClass('xaero.common.settings.ModOptions')

    PlayerEvents.tick(e => {
        if (e.player.age % 30) return
        if (!fCaveModeAllowed) {
            settings = Java.loadClass('xaero.map.WorldMap').settings
            fCaveModeAllowed = settings.class.getDeclaredField('caveMapsAllowed')
            fCaveModeAllowed.setAccessible(true)
        }
        if (!settingsMinimap) {
            settingsMinimap = Java.loadClass('xaero.minimap.XaeroMinimap').instance.settings
            optionRadar = Java.loadClass('xaero.common.settings.ModOptions').RADAR_DISPLAYED
        }

        // cave mode
        let dimKey = String(e.level.dimensionKey.location())
        let whiteList = /* player.creative || */ dimKey == 'minecraft:the_nether' || dimKey.startsWith('undergarden')
        if (!whiteList && e.player.inventory.find('kubejs:sonic_mechanism') >= 0) whiteList = true
        e.player.enderChestInventory
        fCaveModeAllowed.set(settings, whiteList)

        // radar mode
        let hasRadar = e.player.inventory.find('kubejs:echoing_heart') >= 0
        settingsMinimap.setOptionValue(minimapOptions.RADAR_DISPLAYED, hasRadar)
    })
}
