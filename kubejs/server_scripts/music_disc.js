ServerEvents.recipes(event => {
    //工业唱片序列组装
    event.recipes.create.sequenced_assembly([
        Item.of('kubejs:music_disc_pluto_nocturnus').withChance(60.0),
        Item.of('create:sturdy_sheet').withChance(40.0)
        ], '#forge:plates/obsidian', [
        event.recipes.createDeploying('kubejs:incomplete_music_disc_pluto_nocturnus', ['kubejs:incomplete_music_disc_pluto_nocturnus', '#forge:nuggets/steel']),
        event.recipes.createDeploying('kubejs:incomplete_music_disc_pluto_nocturnus', ['kubejs:incomplete_music_disc_pluto_nocturnus', '#forge:nuggets/steel']),
        event.recipes.createFilling('kubejs:incomplete_music_disc_pluto_nocturnus', ['kubejs:incomplete_music_disc_pluto_nocturnus', Fluid.of('immersiveengineering:redstone_acid',500)]),
        event.recipes.createPressing('kubejs:incomplete_music_disc_pluto_nocturnus', 'kubejs:incomplete_music_disc_pluto_nocturnus')
    ]).transitionalItem('kubejs:incomplete_music_disc_pluto_nocturnus').loops(4)

    //魔法唱片合成
    //"item": 'kubejs:music_disc_quam_admirabile_mundi'

    //探险唱片碎片合成
    event.shaped("kubejs:music_disc_yggdrasil_original_mix", [ 
        'AAA', 
        'AAA',
        'AAA'
        ], {
        A: 'kubejs:disc_fragment_yggdrasil'
    })

    //两张作者特供唱片的合成
    event.recipes.create.haunting('kubejs:music_disc_flame_over_the_ice', 'kubejs:midnight')
    event.recipes.create.mechanical_crafting('kubejs:music_disc_the_crimson_sky', [
        '  A  ',
        '  A  ',
        'AABAA',
        ' AAA ',
        'A   A'
    ], {
        A: 'red_dye',
        B: 'kubejs:buran'
    })
})