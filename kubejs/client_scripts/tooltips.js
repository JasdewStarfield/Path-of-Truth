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

    e.add(["kubejs:broken_snowcap_oven"], [Text.yellow({translate:'item.kubejs.broken_snowcap_oven.desc'})])

    e.add(["tfmg:asphalt"], [Text.yellow({translate:'item.kubejs.asphalt.desc'})])
    e.add(["tfmg:liquid_asphalt_bucket"], [Text.yellow({translate:'item.kubejs.asphalt.desc'})])

    e.add(["minecraft:amethyst_shard"], [Text.aqua({translate:'item.kubejs.amethyst_shard.desc'})])
    e.add(["minecraft:echo_shard"], [Text.aqua({translate:'item.kubejs.echo_shard.desc'})])

    e.add(["kubejs:sword_o_justice"], [Text.yellow({translate:'item.kubejs.sword_o_justice.desc1'}),Text.red({translate:'item.kubejs.sword_o_justice.desc2'}),Text.gray({translate:'item.kubejs.sword_o_justice.desc3'})])
})