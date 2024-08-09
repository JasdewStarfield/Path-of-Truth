ItemEvents.tooltip(e => {
    e.add(["kubejs:obelisk_base"], [Text.aqua({translate:'item.kubejs.obelisk_base.desc1'}),Text.red({translate:'item.kubejs.obelisk_base.desc2'})])
    e.add(["kubejs:disc_fragment_yggdrasil"], [Text.aqua({translate:'item.kubejs.disc_fragment_yggdrasil.desc1'}),Text.red({translate:'item.kubejs.disc_fragment_yggdrasil.desc2'})])
    e.add(["kubejs:incomplete_music_disc_pluto_nocturnus"], [Text.gray({translate:'item.kubejs.incomplete_music_disc_pluto_nocturnus.desc1'}),Text.gray({translate:'item.kubejs.incomplete_music_disc_pluto_nocturnus.desc2'})])

    const diamondGears = [
        'minecraft:diamond_helmet',
        'minecraft:diamond_chestplate',
        'minecraft:diamond_leggings',
        'minecraft:diamond_boots',
        'minecraft:diamond_sword',
        'minecraft:diamond_pickaxe',
        'minecraft:diamond_axe',
        'minecraft:diamond_shovel',
        'minecraft:diamond_hoe',
        'farmersdelight:diamond_knife',
        'nethersdelight:diamond_machete'
    ]
    diamondGears.forEach((id) =>
        e.add([id], [Text.red({translate:'item.kubejs.diamond_gears.desc'})])
    )

    e.add(["kubejs:filled_casting_mold_small"], [Text.yellow({translate:'item.kubejs.filled_casting_mold_small.desc'})])
    e.add(["kubejs:filled_casting_mold_large"], [Text.yellow({translate:'item.kubejs.filled_casting_mold_large.desc'})])
})