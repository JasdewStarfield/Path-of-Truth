{
    let settings = Java.loadClass('xaero.map.WorldMap').settings
    let fCaveModeAllowed = settings.class.getDeclaredField('caveMapsAllowed')
    fCaveModeAllowed.setAccessible(true)

    PlayerEvents.tick(e => {
        if (e.player.age % 30) return
        let dimKey = String(e.level.dimensionKey.location())
        let whiteList = /* player.creative || */ dimKey == 'minecraft:the_nether' || dimKey.startsWith('undergarden')
        fCaveModeAllowed.set(settings, whiteList)
    })
}
