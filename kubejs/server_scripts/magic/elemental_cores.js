ServerEvents.recipes(event => {

    //地元素核心合成
    event.shaped(
        Item.of('kubejs:earth_elemental_core'),
        [
            ' A ',
            'BCD',
            ' E '
        ],
        {
            D: 'minecraft:clay',
            B: 'botania:polished_livingrock',
            A: 'botania:livingwood_twig',
            C: 'kubejs:bronze_dust',
            E: 'botania:grass_seeds'
        }
    )
    //元素核心催化玉石系列
    //goety玉石
    event.shaped(
        Item.of('goety:jade_block'),
        [
            ' A ',
            'ABA',
            ' A '
        ],
        {
            B: 'kubejs:earth_elemental_core',
            A: 'goety:jade'
        }
    )
    //月长玉石
    event.shapeless(Item.of('blue_skies:moonstone_crystal'),
        [
            'blue_skies:moonstone',
            'blue_skies:moonstone'
        ]
    )
    event.shaped(
        Item.of('blue_skies:moonstone_block'),
        [
            '   ',
            'ABA',
            '   '
        ],
        {
            B: 'kubejs:earth_elemental_core',
            A: 'blue_skies:moonstone_crystal'
        }
    )
    //日长玉石
    event.shaped(
        Item.of('blue_skies:sunstone_block'),
        [
            '   ',
            'ABA',
            '   '
        ],
        {
            B: 'kubejs:earth_elemental_core',
            A: 'blue_skies:sunstone_crystal'
        }
    )

})