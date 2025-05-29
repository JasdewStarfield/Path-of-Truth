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
        fCaveModeAllowed.set(settings, whiteList)
    })
}
