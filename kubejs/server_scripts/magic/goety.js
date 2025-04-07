ServerEvents.recipes(event => {
    //根之图腾移除与合成
    //根之图腾移除
    event.remove({output:'goety:totem_of_roots'})
    //根之图腾合成
    event.shaped(
        Item.of('goety:totem_of_roots'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            B: '#botania:livingwood_logs',
            A: 'irons_spellbooks:arcane_essence',
            C: 'irons_spellbooks:copper_spell_book',
            D: 'botania:livingrock'
        }
    )
    
    //磁石替换核心（灵魂方舟要用）
    event.replaceInput({mod:'minecraft',output:'minecraft:lodestone'},
        'minecraft:netherite_ingot' , '#forge:ingots/steel')
    
    //启命英制作花纹卷轴
    event.shaped(
        Item.of('goety:floral_scroll'),
        [
            '   ',
            'ABA',
            '   '
        ],
        {
            B: 'goety:dark_scroll',
            A: 'botania:dandelifeon'
        }
    )

    //海潮蛤转换风暴符文
    event.shaped(
        Item.of('aquamirae:rune_of_the_storm'),
        [
            ' A ',
            ' B ',
            ' C '
        ],
        {
            A: 'kubejs:wind_elemental_core',
            B: 'collectorsreap:clam',
            C: 'kubejs:water_elemental_core'
        }
    )

    //灵质-灵质桶互相转化
    event.shaped(
        Item.of('netherexp:ectoplasm_bucket'),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            B: 'minecraft:bucket',
            A: 'goety:ectoplasm'
        }
    )
    event.shapeless(Item.of('goety:ectoplasm', 8),
        [
            'netherexp:ectoplasm_bucket'
        ]
    )

    //灵魂图腾移除与新激活
    event.remove({output:'goety:totem_of_souls'})
    //耗尽的灵魂图腾合成
    event.shaped(
        Item.of('goety:spent_totem'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            A: 'irons_spellbooks:arcane_ingot',
            C: 'goety:magic_emerald',
            D: 'goety:totem_of_roots',
            B: 'botania:livingrock'
        }
    )
    //灵魂图腾合成
    event.shaped(
        Item.of('goety:totem_of_souls'),
        [
            'A A',
            ' B ',
            '   '
        ],
        {
            B: 'goety:spent_totem',
            A: 'goety:magic_emerald'
        }
    )

    //诅咒之笼移除
    event.remove({output:'goety:cursed_cage'})
    //诅咒之笼合成
    event.shaped(
        Item.of('goety:cursed_cage'),
        [
            'ABA',
            'BCB',
            'ABA'
        ],
        {
            C: 'goety:empty_focus',
            B: 'irons_spellbooks:arcane_essence',
            A: 'goety:cursed_bars'
        }
    )
    
    //祭坛底座移除
    event.remove({output:'goety:pedestal'})
    //祭坛底座合成
    event.shaped(
        Item.of('8x goety:pedestal'),
        [
            'AAA',
            ' B ',
            'CDC'
        ],
        {
            D: 'botania:life_essence',
            B: 'irons_spellbooks:arcane_anvil',
            C: 'goety:haunted_planks',
            A: 'goety:shade_stone'
        }
    )

    //祭坛移除
    event.remove({output:'goety:dark_altar'})
    //祭坛合成
    event.shaped(
        Item.of('4x goety:dark_altar'),
        [
            'ABA',
            ' C ',
            'DED'
        ],
        {
            D: 'irons_spellbooks:arcane_salvage',
            C: 'goety:pedestal',
            E: 'goety:cursed_ingot',
            B: 'botania:mana_gun',
            A: 'goety:shade_stone_bricks'
        }
    )

    //简易泰拉钢制作（第五章开放）
    event.shaped(
        Item.of('botania:terrasteel_ingot'),
        [
            ' A ',
            'BCD',
            ' E '
        ],
        {
            A: 'botania:mana_pearl',
            D: 'create:brass_ingot',
            E: 'irons_spellbooks:arcane_essence',
            B: 'goety:cursed_ingot',
            C: 'goety:philosophers_stone'
        }
    )

    //幽匿收集器配方修改
    event.replaceInput({mod:'goety',output:'goety:sculk_devourer'},
        'goety:magic_emerald' , 'goety:pedestal')

    //雷霆聚晶配方修改
    event.replaceInput({mod:'goety',output:'goety:thunderbolt_focus'},
        'minecraft:redstone_block' , 'irons_spellbooks:lightning_bottle')

    //诅咒注入器配方替换
    event.replaceInput({mod:'goety',output:'goety:cursed_infuser'},
        'minecraft:cauldron' , 'botania:terrasteel_ingot')
    event.replaceInput({mod:'goety',output:'goety:cursed_infuser'},
        'minecraft:lapis_lazuli' , 'goety:cursed_ingot')

    //复刻凝胶复制
    event.shaped(
        Item.of('alexsmobs:mimicream', 16),
        [
            'ABA',
            'BCB',
            'ABA'
        ],
        {
            A: 'botania:overgrowth_seed',
            B: 'alexsmobs:mimicream',
            C: 'goety:philosophers_stone'
        }
    )
    event.shapeless(Item.of('alexsmobs:mimicream', 16),
        [
            'minecraft:spawner',
            'botania:corporea_spark',
            'alexsmobs:mimicream',
            'alexsmobs:mimicream',
            'alexsmobs:mimicream',
            'alexsmobs:mimicream',
            'goety:philosophers_stone'
        ]
    )
    //不洁之血复制
    event.shaped(
        Item.of('goety:unholy_blood', 4),
        [
            ' A ',
            'ABA',
            ' C '
        ],
        {
            B: 'goety:unholy_blood',
            C: 'botania:blood_pendant',
            A: 'irons_spellbooks:blood_upgrade_orb'
        }
    )
    //下界之星复制
    event.shaped(
        Item.of('minecraft:nether_star', 4),
        [
            'ABC',
            'BDB',
            'CBA'
        ],
        {
            C: 'aquamirae:ship_graveyard_echo',
            A: 'minecraft:ender_eye',
            D: 'goety:philosophers_stone',
            B: 'scguns:nether_star_fragment'
        }
    )

    //诅咒注入系列配方
    //灵质转化
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'botania:mana_powder'
        },
        "result": 'goety:ectoplasm',
        "cookingTime": 40
    })
    //暗影精粹
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'goety:cursed_metal_block'
        },
        "result": 'goety:shadow_essence',
        "cookingTime": 1200
    })
    //末影珍珠（末影人遍地都是所以这个也不值钱）
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'minecraft:slime_ball'
        },
        "result": 'minecraft:ender_pearl',
        "cookingTime": 600
    })
    //硫磺转化火药
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "tag": 'forge:dusts/sulfur'
        },
        "result": 'minecraft:gunpowder',
        "cookingTime": 60
    })
    //远古知识碎片转化禁书碎片
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'irons_spellbooks:ancient_knowledge_fragment'
        },
        "result": 'goety:forbidden_piece',
        "cookingTime": 1200
    })
    //下界合金转换遗忆
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'minecraft:netherite_ingot'
        },
        "result": 'undergarden:forgotten_ingot',
        "cookingTime": 1200
    })
    //霜火复合板转换恶魂之泪
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'kubejs:frostfire_double_plate'
        },
        "result": 'minecraft:ghast_tear',
        "cookingTime": 100
    })
    //星盘注入获得唱片
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'blue_skies:astrolabe'
        },  
        "result": 'kubejs:music_disc_quam_admirabile_mundi',
        "cookingTime": 1200
    })

    //仪式配方修改系列
    //撕裂聚晶合成
    event.remove({id:'goety:focus/rupture_focus'})
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",
        "activation_item": {
            "item": "goety:tunnel_focus"
        },
        "craftType": "magic",
        "soulCost": 500,
        "duration": 60,
        "ingredients": [
            {
            "item": 'kubejs:earth_elemental_core'
            },
            {
            "tag": "forge:ender_pearls"
            },
            {
            "item": 'kubejs:water_elemental_core'
            },
            {
            "tag": "forge:ender_pearls"
            },
            {
            "item": 'kubejs:fire_elemental_core'
            },
            {
            "item": "minecraft:dragon_head"
            },
            {
            "item": 'kubejs:wind_elemental_core'
            },
            {
            "item": "minecraft:dragon_breath"
            }
        ],
        "result": {
            "item": "goety:rupture_focus"
        }
    })
    //刷怪笼激活
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",//仪式主类型（制作）
        "activation_item": {
            "item": "goety:cursed_cage"//中心物品
        },
        "craftType": "forge",//仪式副类型（锻造）
        "soulCost": 1000,//每秒消耗
        "duration": 60,//时长
        "ingredients": [
            {
                "item": 'botania:overgrowth_seed'
            },
            {
                "item": 'botania:corporea_spark'
            },
            {
                "item": 'goety:rupture_focus'
            },
            {
                "item": 'irons_spellbooks:energized_core'
            }
        ],
        "result": {
            "item": 'minecraft:spawner'//实际产出
        }
    })
    //瞻远者刷怪蛋合成
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",//仪式主类型（制作）
        "activation_item": {
            "item": "goety:cursed_cage"//中心物品
        },
        "craftType": "animation",//仪式副类型（活力）
        "soulCost": 500,//每秒消耗
        "duration": 60,//时长
        "ingredients": [
            {
                "item": 'goety:philosophers_stone'
            },
            {
                "tag": 'forge:eggs'
            },
            {
                "item": 'goety:soul_emerald'
            },
            {
                "item": 'botania:light_relay'
            },
            {
                "item": 'alexsmobs:void_worm_eye'
            },
            {
                "item": 'kubejs:charoite_dust'
            }
        ],
        "result": {
            "item": 'alexsmobs:spawn_egg_farseer'//实际产出
        }
    })
    

    //死灵火盆系列配方
    //启命英粉碎
    event.custom({
        "type": "goety:brazier",
        "soulCost": 2000,
        "ingredients": [
            {
                "item": "botania:dandelifeon"
            },
            {
                "item": "immersiveengineering:dust_steel"
            },
            {
                "item": "irons_spellbooks:cinder_essence"
            }
        ],
        "result": {
            "item": "botania:overgrowth_seed"
        }
    })
    //贤者之石合成
    event.remove({id:'goety:philosophers_stone'})
    event.custom({
        "type": "goety:brazier",
        "soulCost": 50000,
        "ingredients": [
            {
                "item": 'botania:gaia_ingot'
            },
            {
                "item": "minecraft:spawner"
            },
            {
                "item": "minecraft:netherite_scrap"
            },
            {
                "item": "irons_spellbooks:arcane_salvage"
            },
            {
                "item": "goety:empty_focus"
            }
        ],
        "result": {
            "item": "goety:philosophers_stone"
        }
    })
    //下界合金盔甲催化
    event.custom({
        "type": "goety:brazier",
        "soulCost": 10000,
        "ingredients": [
            {
                "item": 'minecraft:netherite_chestplate'
            },
            {
                "item": 'botania:life_essence'
            },
            {
                "item": 'goety:ectoplasm'
            },
            {
                "item": 'minecraft:soul_lantern'
            }
        ],
        "result": {
            "item": 'irons_spellbooks:armor_pile'
        }
    })
    //暗夜信标制作
    event.custom({
        "type": "goety:brazier",
        "soulCost": 25000,
        "ingredients": [
            {
                "item": 'minecraft:beacon'
            },
            {
                "item": 'goety:dark_anvil'
            },
            {
                "item": 'botania:black_hole_talisman'
            },
            {
                "item": 'minecraft:dragon_egg'
            },
            {
                "item": 'irons_spellbooks:ender_upgrade_orb'
            }
        ],
        "result": {
            "item": 'goety:night_beacon'
        }
    })
    //索命聚晶修改
    event.remove({id:'goety:focus/killing_focus'})
    event.custom({
        "type": "goety:brazier",
        "soulCost": 50000,
        "ingredients": [
            {
                "item": 'goety:osseous_focus'
            },
            {
                "item": 'botania:spawner_mover'
            },
            {
                "item": 'goety:unholy_blood'
            }
        ],
        "result": {
            "item": 'goety:killing_focus'
        }
    })

})