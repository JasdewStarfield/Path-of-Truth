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
    //元素核心催化宝石系列
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
    //月长，日长玉石
    event.shapeless(Item.of('blue_skies:moonstone_crystal'),
        [
            'blue_skies:moonstone',
            'blue_skies:moonstone',
            'blue_skies:moonstone'
        ]
    )
    event.shapeless(Item.of('blue_skies:moonstone_shard', 2),
        [
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
    //榴石，透辉石，水蓝石，绛紫晶
    event.shapeless(Item.of('blue_skies:everdawn_pyrope_ore', 4),
        [
            'blue_skies:pyrope_gem',
            'kubejs:earth_elemental_core'
        ]
    )
    event.shapeless(Item.of('blue_skies:everdawn_diopside_ore', 4),
        [
            'blue_skies:diopside_gem',
            'kubejs:earth_elemental_core'
        ]
    )
    event.shapeless(Item.of('blue_skies:everdawn_aquite_ore', 4),
        [
            'blue_skies:raw_aquite',
            'kubejs:earth_elemental_core'
        ]
    )
    event.shapeless(Item.of('blue_skies:everdawn_charoite_ore', 4),
        [
            'blue_skies:raw_charoite',
            'kubejs:earth_elemental_core'
        ]
    )
    //钻石，绿宝石
    event.shapeless(Item.of('minecraft:deepslate_diamond_ore', 16),
        [
            'botania:mana_diamond_block',
            'kubejs:earth_elemental_core'
        ]
    )
    event.shapeless(Item.of('minecraft:deepslate_emerald_ore', 16),
        [
            'goety:awakened_emerald_block',
            'kubejs:earth_elemental_core'
        ]
    )
    //镰鼬铁
    event.shapeless(Item.of('blue_skies:raw_ventium_block'),
        [
            'kubejs:earth_elemental_core',
            'blue_skies:raw_ventium',
            'irons_spellbooks:arcane_ingot',
            'botania:mana_powder'
        ]
    )

    //幽匿催发体合成
    event.shaped(
        Item.of('4x minecraft:sculk_catalyst'),
        [
            'FAF',
            'BCD',
            'FEF'
        ],
        {
            A: 'kubejs:earth_elemental_core',
            B: 'kubejs:water_elemental_core',
            E: 'minecraft:sculk_catalyst',
            C: 'botania:terrasteel_ingot',
            D: 'kubejs:fire_elemental_core',
            F: 'minecraft:amethyst_shard'
        }
    )

    //水元素核心合成
    event.shaped(
        Item.of('kubejs:water_elemental_core'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            C: 'goety:frost_breath_focus',
            D: 'goety:shadow_essence',
            A: 'blue_skies:falsite_block',
            B: 'botania:mana_pylon'
        }
    )
    //缪铁催化
    event.shaped(
        Item.of('blue_skies:falsite_block', 8),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:iron_block',
            B: 'kubejs:water_elemental_core'
        }
    )
    event.shaped(
        Item.of('blue_skies:raw_falsite_block', 8),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            B: 'kubejs:water_elemental_core',
            A: 'minecraft:raw_iron_block'
        }
    )
    //稀有墨水催化
    event.shaped(
        Item.of('irons_spellbooks:rare_ink', 8),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'irons_spellbooks:lightning_bottle',
            B: 'kubejs:water_elemental_core'
        }
    )
    //火元素核心合成
    event.shaped(
        Item.of('kubejs:fire_elemental_core'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            C: 'goety:fire_breath_focus',
            D: 'goety:shadow_essence',
            A: 'blue_skies:horizonite_block',
            B: 'botania:mana_pylon'
        }
    )
    //炙铁催化
    event.shaped(
        Item.of('blue_skies:horizonite_block', 8),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:iron_block',
            B: 'kubejs:fire_elemental_core'
        }
    )
    event.shaped(
        Item.of('blue_skies:raw_horizonite_block', 8),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            B: 'kubejs:fire_elemental_core',
            A: 'minecraft:raw_iron_block'
        }
    )
    //灰烬源质催化
    event.shaped(
        Item.of('irons_spellbooks:cinder_essence', 8),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'irons_spellbooks:magic_cloth',
            B: 'kubejs:fire_elemental_core'
        }
    )
    event.recipes.create.mixing(
        Item.of('irons_spellbooks:cinder_essence'),
        [
            'irons_spellbooks:magic_cloth',
            Fluid.of('immersiveengineering:biodiesel', 200)
        ]
    ).superheated()
    //水火合并产出岩浆
    event.shaped(
        Item.of('minecraft:magma_block', 64),
        [
            ' A ',
            'BCD',
            ' A '
        ],
        {
            A: 'botania:black_lotus',
            B: 'kubejs:water_elemental_core',
            C: 'botania:livingrock',
            D: 'kubejs:fire_elemental_core'
        }
    )
    //风元素核心合成
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",//仪式主类型（制作）
        "activation_item": {
            "item": 'goety:thunderbolt_focus'//中心物品
        },
        "craftType": "storm",//仪式副类型（风暴）
        "soulCost": 50,//每秒消耗
        "duration": 30,//时长
        "ingredients": [
            {
                "item": 'goety:dark_ingot'
            },
            {
                "item": 'kubejs:leyden_jar'
            },
            {
                "item": 'aquamirae:ship_graveyard_echo'
            },
            {
                "item": 'botania:rune_air'
            },
            {
                "item": 'botania:ender_air_bottle'
            },
            {
                "item": 'alexsmobs:lava_bottle'
            }
        ],
        "result": {
            "item": 'kubejs:wind_elemental_core'//实际产出
        }
    })

})