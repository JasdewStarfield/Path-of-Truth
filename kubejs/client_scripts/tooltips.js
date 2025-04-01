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

    // e.add(["scguns:gun_bench"], [Text.yellow({translate:'item.scguns.gun_bench.desc'})])
    e.add(["kubejs:potion_of_void"], [Text.blue({translate:'item.kubejs.potion_of_void.desc'})])
    e.add(["kubejs:potion_of_talent"], [Text.blue({translate:'item.kubejs.potion_of_talent.desc'})])
    e.add(["kubejs:potion_of_balance"], [Text.blue({translate:'item.kubejs.potion_of_balance.desc'})])

    e.add(["kubejs:code_destruction"], [Text.red({translate:'item.kubejs.code_destruction.desc'})])
    e.add(["kubejs:code_formation"], [Text.red({translate:'item.kubejs.code_formation.desc'})])
    e.add(["kubejs:code_perfection"], [Text.red({translate:'item.kubejs.code_perfection.desc'})])

    e.add(["kubejs:broken_snowcap_oven"], [Text.yellow({translate:'item.kubejs.broken_snowcap_oven.desc'})])

    e.add(["minecraft:amethyst_shard"], [Text.aqua({translate:'item.kubejs.amethyst_shard.desc'})])
    e.add(["minecraft:echo_shard"], [Text.aqua({translate:'item.kubejs.echo_shard.desc'})])

    e.add(["kubejs:sword_o_justice"], [Text.yellow({translate:'item.kubejs.sword_o_justice.desc1'}),Text.red({translate:'item.kubejs.sword_o_justice.desc2'}),Text.gray({translate:'item.kubejs.sword_o_justice.desc3'})])
})