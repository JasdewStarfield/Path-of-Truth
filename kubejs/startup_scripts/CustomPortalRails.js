// requires: create

if (!global.registerCreateTrackPortal) {
    let AllPortalTracks = Java.loadClass('com.simibubi.create.content.trains.track.AllPortalTracks')
    let Registries = Java.loadClass('net.minecraft.core.registries.Registries')
    let ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
    let dimResourceKey = res => ResourceKey.create(Registries.DIMENSION, res)
    let usedKey = {}
    let isOldAPI = false
    let registerIntegration, PortalTrackProvider
    try {
        registerIntegration = AllPortalTracks.tryRegisterIntegration
        PortalTrackProvider = Java.loadClass('com.simibubi.create.api.contraption.train.PortalTrackProvider')
    } catch (e) {
        registerIntegration =
            AllPortalTracks[
                'registerIntegration(net.minecraft.resources.ResourceLocation,com.simibubi.create.content.trains.track.AllPortalTracks$PortalTrackProvider)'
            ]
        isOldAPI = true
    }
    global.registerCreateTrackPortal = (block, dim1, dim2, portalForcer) => {
        if (usedKey[block]) return
        usedKey[block] = 1
        dim1 = dimResourceKey(dim1)
        dim2 = dimResourceKey(dim2)
        registerIntegration(block, (level, face) => {
            try {
                // this 'level' is pair<level, face>
                if (isOldAPI) return AllPortalTracks.standardPortalProvider(level, dim1, dim2, portalForcer)
                return PortalTrackProvider.fromTeleporter(level, face, dim1, dim2, portalForcer)
            } catch (e) {
                if (Client.player) Client.player.tell(e)
                return null
            }
        })
    }
}

// 等待所有方块注册完毕
StartupEvents.postInit(() => {
    if (Platform.isLoaded('blue_skies')) {
        let SkiesBlocks = Java.loadClass('com.legacy.blue_skies.registries.SkiesBlocks')
        for (let type_tmp of ['bright', 'dawn']) {
            let type = type_tmp
            global.registerCreateTrackPortal(`blue_skies:ever${type}_portal`, 'overworld', `blue_skies:ever${type}`, l =>
                SkiesBlocks[`ever${type}_portal`].getTeleporter(l),
            )
        }
    }
    if (Platform.isLoaded('undergarden')) {
        let UGTeleporter = Java.loadClass('quek.undergarden.world.UGTeleporter')
        global.registerCreateTrackPortal('undergarden:undergarden_portal', 'overworld', 'undergarden:undergarden', l => UGTeleporter(l))
    }
})
