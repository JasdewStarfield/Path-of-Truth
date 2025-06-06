{
    let settings = null
    let fCaveModeAllowed = null

    PlayerEvents.tick(e => {
        if (e.player.age % 30) return
        if (!fCaveModeAllowed) {
            settings = Java.loadClass('xaero.map.WorldMap').settings
            fCaveModeAllowed = settings.class.getDeclaredField('caveMapsAllowed')
            fCaveModeAllowed.setAccessible(true)
        }
        let dimKey = String(e.level.dimensionKey.location())
        let whiteList = /* player.creative || */ dimKey == 'minecraft:the_nether' || dimKey.startsWith('undergarden')
        if (!whiteList && e.player.inventory.find('kubejs:sonic_mechanism') >= 0) whiteList = true
        e.player.enderChestInventory
        fCaveModeAllowed.set(settings, whiteList)
    })
}
