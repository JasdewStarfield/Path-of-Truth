{
    // currentWorldData.syncedRules
    // world map settings
    let WorldMapClientWorldDataHelper = Java.loadClass('xaero.map.mcworld.WorldMapClientWorldDataHelper')
    let ClientboundRulesPacket = Java.loadClass('xaero.map.message.basic.ClientboundRulesPacket')

    // minimap settings
    let MinimapClientWorldDataHelper = Java.loadClass('xaero.common.minimap.mcworld.MinimapClientWorldDataHelper')
    let ClientboundRulesPacketMinimap = Java.loadClass('xaero.common.message.basic.ClientboundRulesPacket')

    PlayerEvents.tick(e => {
        if (e.player.age % 30) return

        // cave mode
        let dimKey = String(e.level.dimensionKey.location())
        let showCave = /* player.creative || */ dimKey == 'minecraft:the_nether' || dimKey.startsWith('undergarden')
        if (!showCave && e.player.inventory.find('kubejs:sonic_mechanism') >= 0) showCave = true

        // radar mode
        let hasRadar = e.player.inventory.find('kubejs:echoing_heart') >= 0

        WorldMapClientWorldDataHelper.currentWorldData.syncedRules = new ClientboundRulesPacket(showCave, showCave)
        MinimapClientWorldDataHelper.currentWorldData.syncedRules = new ClientboundRulesPacketMinimap(
            showCave,
            showCave,
            hasRadar,
        )
    })
}
