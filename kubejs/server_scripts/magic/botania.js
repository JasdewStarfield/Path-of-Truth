//此文件提供植物魔法系列修改
//魔力满值：100000

ServerEvents.recipes(event => {
    //移除诱惑酿造配方
    event.remove({id:'botania:brew/allure'})
    
    //添加魔动工业相关
    event.remove({id:'mechanicalbotania:floating_spinerette'})
    event.remove({id:'mechanicalbotania:manamotor'})
    event.recipes.botania.petal_apothecary('mechanicalbotania:spinerette', 
        [
            '#botania:petals/yellow',
            '#botania:petals/cyan',
            'minecraft:echo_shard',
            'botania:terrasteel_ingot',
            'botania:rune_fire',
            'botania:rune_mana'
        ]
    )
    event.shaped(
        Item.of('mechanicalbotania:mana_motor'),
        [
            'ABA',
            'CDC',
            'ABA'
        ],
        {
            B: 'irons_spellbooks:arcane_salvage',
            D: 'createaddition:electric_motor',
            C: 'goety:cursed_ingot',
            A: 'botania:manasteel_ingot'
        }
    )


    //修改白雏菊合成配方
    event.remove({ output: 'botania:pure_daisy' })
    event.recipes.botania.petal_apothecary('botania:pure_daisy', 
        [
            '#botania:petals/white',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/tin'
        ]
    )

    //支持机械动力的活木、活石配方
    event.recipes.create.mixing(['botania:livingwood_log', Item.of('botania:pure_daisy').withChance(0.99)], ['#minecraft:logs','botania:pure_daisy']).heated()
    event.recipes.create.mixing(['botania:livingrock', Item.of('botania:pure_daisy').withChance(0.99)], ['minecraft:stone','botania:pure_daisy']).heated()

    //遗忆守卫炼制配方
    event.recipes.botania.petal_apothecary('undergarden:forgotten_guardian_spawn_egg', 
        [
            '#forge:eggs',
            'create_connected:sequenced_pulse_generator',
            'goety:philosophers_stone',
            'kubejs:forgotten_mechanism'
        ]
    )

    //黑莲花修改
    event.shaped(
        Item.of('botania:black_lotus'),
        [
            'ABA',
            'BCB',
            'ABA'
        ],
        {
            A: 'botania:ender_air_bottle',
            B: 'botania:black_petal',
            C: 'create:powdered_obsidian'
        }
    )
    //暗黑莲花修改
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",//仪式主类型（制作）
        "activation_item": {
            "item": 'goety:night_beacon'//中心物品
        },
        "craftType": "sabbath",//仪式副类型（安息）
        "soulCost": 100,//每秒消耗
        "duration": 60,//时长
        "ingredients": [
            {
                "item": 'botania:black_lotus'
            },
            {
                "item": 'botania:black_lotus'
            },
            {
                "item": 'botania:black_lotus'
            },
            {
                "item": 'botania:black_lotus'
            }
        ],
        "result": {
            "item": 'botania:blacker_lotus'//实际产出
        }
    })

    //修改魔力池配方以及移除神话魔力池配方
    event.remove({ output: 'botania:mana_pool' })
    event.remove({id: 'botania:fabulous_pool' })
    event.shaped(Item.of('botania:mana_pool',1),
        ['A A',
        'A A',
        'BCB'],
        {
            A:'botania:livingrock',
            B:'#forge:ingots/copper',
            C:'botania:livingwood'
        }
    )

    //修改恶魔南瓜配方
    event.remove({output:'botania:fel_pumpkin'})
    event.shaped(Item.of('botania:fel_pumpkin',1),
        ['ABA',
        'CDE',
        'AFA'],
        {
            A:'create:brass_nugget',
            B:'minecraft:string',
            C:'minecraft:rotten_flesh',
            D:'minecraft:pumpkin',
            E:'minecraft:gunpowder',
            F:'minecraft:bone'
        }
    )
    //盖亚之魂复制
    event.shaped(
        Item.of('botania:life_essence', 4),
        [
            ' A ',
            'BCD',
            ' E '
        ],
        {
            A: 'botania:life_essence',
            E: 'botania:pixie_dust',
            B: 'minecraft:echo_shard',
            D: 'minecraft:ghast_tear',
            C: 'goety:philosophers_stone'
        }
    )
    //生命聚合器复制
    event.shaped(
        Item.of('botania:spawner_mover', 4),
        [
            ' A ',
            ' B ',
            'CDE'
        ],
        {
            B: 'botania:spawner_mover',
            E: 'goety:unholy_blood',
            C: 'irons_spellbooks:blood_vial',
            A: 'botania:spawner_claw',
            D: 'goety:philosophers_stone'
        }
    )

    //符文祭坛配方
    //炼制铁魔法空白符文
    event.recipes.botania.runic_altar('irons_spellbooks:blank_rune', 
        [
            'botania:rune_mana', 
            'botania:mana_powder'
        ], 
        10000
    )
    //锻造血腥法杖
    event.recipes.botania.runic_altar('irons_spellbooks:blood_staff', 
        [
            'goety:philosophers_stone',
            'irons_spellbooks:blood_upgrade_orb',
            'vintageimprovements:steel_spring',
            'createaddition:electrum_rod',
            'minecraft:dragon_breath',
            'goety:unholy_blood'
        ],
        50000
    )
    //炼制凋零骷髅刷怪蛋
    event.recipes.botania.runic_altar('minecraft:wither_skeleton_spawn_egg', 
        [
            '#forge:eggs', 
            'minecraft:wither_skeleton_skull',
            'scguns:nether_star_fragment',
            'botania:spark'
        ], 
        50000
    )

    //魔力充能配方修正
    //种子转化
    //event.recipes.botania.mana_infusion("产出物", "原材料", 消耗法力, "下方催化方块")
    event.recipes.botania.mana_infusion('minecraft:pumpkin_seeds', 'minecraft:wheat_seeds', 100)
    event.recipes.botania.mana_infusion('minecraft:melon_seeds', 'minecraft:pumpkin_seeds', 100)
    event.recipes.botania.mana_infusion('minecraft:beetroot_seeds', 'minecraft:melon_seeds', 100)
    event.recipes.botania.mana_infusion('farmersdelight:cabbage_seeds', 'minecraft:beetroot_seeds', 100)
    event.recipes.botania.mana_infusion('farmersdelight:tomato_seeds', 'farmersdelight:cabbage_seeds', 100)
    event.recipes.botania.mana_infusion('immersiveengineering:seed', 'farmersdelight:tomato_seeds', 100)
    event.recipes.botania.mana_infusion('minecraft:wheat_seeds', 'immersiveengineering:seed', 100)

    //海带转化
    event.recipes.botania.mana_infusion('minecraft:kelp', '#minecraft:leaves', 500)
    event.recipes.botania.mana_infusion('undergarden:glitterkelp', 'minecraft:kelp', 100,'botania:alchemy_catalyst')
    event.recipes.botania.mana_infusion('minecraft:kelp', 'undergarden:glitterkelp', 100,'botania:alchemy_catalyst')

    //竹子转化
    event.recipes.botania.mana_infusion('minecraft:bamboo', 'botania:livingwood_twig', 500)

    //鸡蛋的生产和复制
    event.recipes.botania.petal_apothecary('minecraft:egg', 
        [
            'minecraft:clay_ball',
            'minecraft:feather',
            'minecraft:string'
        ]
    )
    event.recipes.botania.mana_infusion('2x minecraft:egg', 'minecraft:egg', 500)
    
    //魔钢-奥术源质兑换
    event.recipes.botania.mana_infusion('4x irons_spellbooks:arcane_essence', 'botania:manasteel_ingot', 1000, 'botania:alchemy_catalyst')
    //烈焰粉转化硫磺
    event.recipes.botania.mana_infusion('scguns:sulfur_dust', 'minecraft:blaze_powder', 100, 'botania:alchemy_catalyst')
    //移除原有火药配方
    event.remove({id:'botania:mana_infusion/flint_to_gunpowder'})
    //禁书碎片转化远古知识碎片
    event.recipes.botania.mana_infusion('goety:forbidden_piece', 'irons_spellbooks:ancient_knowledge_fragment', 10000, 'botania:alchemy_catalyst')
    //刷怪蛋复制：遗忆守卫，瞻远者，宝箱怪，潜影贝，凋零骷髅，远古骑士
    event.recipes.botania.mana_infusion('2x undergarden:forgotten_guardian_spawn_egg', 'undergarden:forgotten_guardian_spawn_egg', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_farseer', 'alexsmobs:spawn_egg_farseer', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x artifacts:mimic_spawn_egg', 'artifacts:mimic_spawn_egg', 25000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:shulker_spawn_egg', 'minecraft:shulker_spawn_egg', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:wither_skeleton_spawn_egg', 'minecraft:wither_skeleton_spawn_egg', 25000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x irons_spellbooks:armor_pile', 'irons_spellbooks:armor_pile', 50000,'botania:conjuration_catalyst')
    //遗忆锭转化钻石1:2
    event.recipes.botania.mana_infusion('2x minecraft:diamond', 'undergarden:forgotten_ingot', 1000,'botania:alchemy_catalyst')
    //龙皮，海洋之心，疣猪兽皮，奥术残骸，龙息复制
    event.recipes.botania.mana_infusion('2x irons_spellbooks:dragonskin', 'irons_spellbooks:dragonskin', 5000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:heart_of_the_sea', 'minecraft:heart_of_the_sea', 50000,'botania:mana_bomb')
    event.recipes.botania.mana_infusion('2x irons_spellbooks:hogskin', 'irons_spellbooks:hogskin', 1000,'botania:mana_bomb')
    event.recipes.botania.mana_infusion('2x irons_spellbooks:arcane_salvage', 'irons_spellbooks:arcane_salvage', 10000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:dragon_breath', 'minecraft:dragon_breath', 500,'botania:conjuration_catalyst')
    //瞻远者蛋转化瞻远者之臂
    event.recipes.botania.mana_infusion('alexsmobs:farseer_arm', 'alexsmobs:spawn_egg_farseer', 50000,'botania:mana_bomb')
    //生命聚合器配方替换
    event.remove({id:'botania:spawner_mover'})
    event.recipes.botania.mana_infusion('botania:spawner_mover', 'irons_spellbooks:blood_staff', 100000,'botania:mana_bomb')

    //铁矿转化天闪石矿和镰鼬铁矿
    event.recipes.botania.mana_infusion('create_blue_skies_compat:crushed_aquite_ore', 'create:crushed_raw_iron', 100, 'blue_skies:moonstone_lantern')
    event.recipes.botania.mana_infusion('create_blue_skies_compat:crushed_ventium_ore', 'create:crushed_raw_iron', 100, 'blue_skies:brumble_lantern')
    //以及为此追加的月长石灯合成方法
    event.shaped(Item.of('blue_skies:moonstone_lantern',1),
        [' A ',
        'ABA',
        ' A '],
        {
            A:'blue_skies:turquoise_stonebrick',
            B:'blue_skies:moonstone_block'
        }
    )

    //天翼族之冠配方修改
    event.remove({id:'botania:flighttiara_0'})
    event.shaped(
        Item.of('botania:flight_tiara'),
        [
            'ABA',
            'CDC',
            'AEA'
        ],
        {
            B: 'botania:elementium_ingot',
            A: 'botania:life_essence',
            D: 'kubejs:wind_elemental_core',
            E: 'botania:dandelifeon',
            C: 'irons_spellbooks:cinder_essence'
        }
    )

    //末地空气转化扼塞锭和铁锭
    event.shapeless(Item.of('minecraft:iron_ingot',1),
        [
            'undergarden:cloggrum_ingot',
            'botania:ender_air_bottle'
        ]
    )
    event.shapeless(Item.of('undergarden:cloggrum_ingot',1),
        [
            'minecraft:iron_ingot',
            'botania:ender_air_bottle'
        ]
    )

    //泰拉凝聚板配方修改
    event.remove({ output: 'botania:terra_plate' })
    event.shaped(Item.of('botania:terra_plate',1),
        ['ABA',
        'CDE',
        'FGH'],
        {
            A:'botania:manasteel_block',
            B:'irons_spellbooks:arcane_rune',
            C:'botania:rune_earth',
            D:'botania:elementium_block',
            E:'botania:rune_water',
            F:'botania:rune_fire',
            G:'goety:cursed_cage',
            H:'botania:rune_air'
        }
    )

    //火花配方替换
    event.replaceInput({mod:'botania',output:'botania:spark'},
    'minecraft:gold_nugget', 'botania:elementium_nugget' )

    //污血吊坠配方替换
    event.replaceInput({mod:'botania',output:'botania:blood_pendant'},
    'minecraft:prismarine_crystals', 'goety:cursed_ingot' )

    //炼金催化器配方修改
    event.replaceInput({mod:'botania',output:'botania:alchemy_catalyst'},
    'minecraft:gold_ingot', 'create:brass_ingot' )

    //手镜配方替换
    event.replaceInput({mod:'botania',output:'botania:mana_mirror'},
    'botania:livingrock', 'irons_spellbooks:arcane_anvil' )
    event.replaceInput({mod:'botania',output:'botania:mana_mirror'},
    'botania:mana_pearl', 'immersiveengineering:rs_engineering' )
    event.replaceInput({mod:'botania',output:'botania:mana_mirror'},
    'botania:terrasteel_ingot', 'botania:life_essence' )

    //拉普达碎片I配方替换
    event.replaceInput({mod:'botania',output:'botania:laputa_shard'},
    'botania:dragonstone', 'botania:corporea_spark_master' )
    
    //自然水晶配方替换
    event.replaceInput({mod:'botania',output:'botania:natura_pylon'},
    'minecraft:ender_eye', 'minecraft:ender_pearl' )
    event.replaceInput({mod:'botania',output:'botania:natura_pylon'},
    'botania:terrasteel_nugget', 'create:brass_nugget' )

    //精灵门核心配方替换
    event.replaceInput({mod:'botania',output:'botania:alfheim_portal'},
    'botania:terrasteel_nugget', 'create:brass_nugget' )

    //魔力水晶配方替换
    event.replaceInput({mod:'botania',output:'botania:mana_pylon'},
        'minecraft:gold_ingot', 'irons_spellbooks:arcane_ingot' )

    //魔力枪配方替换
    event.replaceInput({mod:'botania',output:'botania:mana_gun'},
    'minecraft:tnt', 'botania:terrasteel_ingot' )
    event.replaceInput({mod:'botania',output:'botania:mana_gun'},
    'botania:redstone_spreader', 'kubejs:fire_elemental_core' )
    event.replaceInput({mod:'botania',output:'botania:mana_gun'},
    'botania:mana_diamond', 'create:precision_mechanism' )

    //深园催化石配方替换
    event.replaceInput({mod:'undergarden',output:'undergarden:catalyst'},
    'minecraft:diamond', 'botania:terrasteel_ingot' )
    event.replaceInput({mod:'undergarden',output:'undergarden:catalyst'},
    'minecraft:iron_ingot', 'irons_spellbooks:arcane_ingot' )
    event.replaceInput({mod:'undergarden',output:'undergarden:catalyst'},
    'minecraft:gold_ingot', 'create:brass_ingot' )

    //风暴透镜配方
    event.shaped(Item.of('botania:lens_storm',1),
        ['ABA',
        'CDC',
        'ABA'],
        {
            A:'botania:terrasteel_ingot',
            B:'botania:ender_air_bottle',
            C:'botania:dragonstone',
            D:'kubejs:water_elemental_core'
        }
    )

    //末影之眼配方重写
    event.remove({output:'minecraft:ender_eye'})
    event.shaped(Item.of('minecraft:ender_eye',3),
        ['ABA',
        'BCB',
        'ABA'],
        {
            A:'create:brass_nugget',
            B:'botania:terrasteel_nugget',
            C:'botania:mana_pearl'
        }
    )

    //精灵门交换系列
    //奥术源质-魔力粉
    event.recipes.botania.elven_trade(
        [
            'botania:mana_powder'
        ], 
        [
            'irons_spellbooks:arcane_essence'
        ]
    )
    //诅咒金属-魔力钢
    event.recipes.botania.elven_trade(
        [
            'botania:manasteel_ingot'
        ], 
        [
            'goety:cursed_ingot'
        ]
    )
    //奥术锭-诅咒金属
    event.recipes.botania.elven_trade(
        [
            'goety:cursed_ingot'
        ], 
        [
            'irons_spellbooks:arcane_ingot'
        ]
    )
    //阴影石头-活石
    event.recipes.botania.elven_trade(
        [
            'botania:livingrock'
        ], 
        [
            'goety:shade_stone'
        ]
    )
    //缠魂木-活木
    event.recipes.botania.elven_trade(
        [
            'botania:livingwood_log'
        ], 
        [
            '#goety:haunted_logs'
        ]
    )
    //骨头-冰封骨头
    event.recipes.botania.elven_trade(
        [
            'irons_spellbooks:frozen_bone'
        ], 
        [
            'minecraft:bone',
            'minecraft:snow_block'
        ]
    )

    //精灵门复制虚空蠕虫
    event.recipes.botania.elven_trade(
        [
            'alexsmobs:mysterious_worm',
            'alexsmobs:void_worm_effigy'
        ], 
        [
            'alexsmobs:void_worm_effigy',
            'minecraft:end_crystal',
            'botania:corporea_index',
        ]
    )

    //精灵门复制龙蛋
    event.recipes.botania.elven_trade(
        [
            'minecraft:dragon_egg',
            'minecraft:dragon_egg'
        ], 
        [
            'minecraft:dragon_egg',
            'minecraft:end_crystal',
            '#forge:eggs',
            'botania:corporea_spark',
            'goety:philosophers_stone'
        ]
    )

    //魔力转换器配方修改
    event.remove({output:'botania:mana_fluxfield'})
    event.recipes.botania.runic_altar('botania:mana_fluxfield', 
        [
            'kubejs:electronic_engineering', 
            'botania:redstone_root',
            'goety:philosophers_stone',
            'mechanicalbotania:mana_motor'
        ], 
        5000
    )

    //星盘配方增加
    event.shaped(Item.of('blue_skies:astrolabe',1),
        ['ABA',
        'BCB',
        'ABA'],
        {
            A:'botania:dragonstone',
            B:'blue_skies:falsite_ingot',
            C:'blue_skies:star_flare'
        }
    )

    //泰拉钢系列配方修改
    event.remove({output:'botania:terrasteel_ingot'})
    event.recipes.botania.terra_plate('botania:terrasteel_ingot', 
        [
            'botania:elementium_ingot', 
            'botania:mana_pearl',
            'botania:mana_diamond',
            '#forge:ingots/brass',
            'irons_spellbooks:arcane_ingot',
            'goety:cursed_ingot'
        ], 
        50000
    )
    event.shaped(Item.of('botania:terrasteel_ingot',1),
        ['AAA',
        'AAA',
        'AAA'],
        {
            A:'botania:terrasteel_nugget'
        }
    )
    event.shapeless(Item.of('botania:terrasteel_ingot',9),
        [
            'botania:terrasteel_block'
        ]
    )

    //泰拉盔甲系列配方替换
    //泰拉头盔替换
    event.remove({id:'botania:terrasteel_helmet'})
    event.custom({
        "type": "botania:armor_upgrade",
        "category": "equipment",
        "key": {
            "A": {
            "item": "botania:manasteel_helmet"
            },
            "R": {
            "item": "botania:rune_spring"
            },
            "S": {
            "tag": "botania:terrasteel_ingots"
            },
            "T": {
            "item": "minecraft:echo_shard"
            }
        },
        "pattern": [
            "TRT",
            "SAS",
            " S "
        ],
        "result": {
            "item": "botania:terrasteel_helmet"
        },
        "show_notification": true
    })
    //泰拉胸甲替换
    event.remove({id:'botania:terrasteel_chestplate'})
    event.custom({
        "type": "botania:armor_upgrade",
        "category": "equipment",
        "key": {
            "A": {
            "item": "botania:manasteel_chestplate"
            },
            "R": {
            "item": "botania:rune_summer"
            },
            "S": {
            "tag": "botania:terrasteel_ingots"
            },
            "T": {
            "item": "minecraft:echo_shard"
            }
        },
        "pattern": [
            "TRT",
            "SAS",
            " S "
        ],
        "result": {
            "item": "botania:terrasteel_chestplate"
        },
        "show_notification": true
    })
    //泰拉护腿替换
    event.remove({id:'botania:terrasteel_leggings'})
    event.custom({
        "type": "botania:armor_upgrade",
        "category": "equipment",
        "key": {
            "A": {
            "item": "botania:manasteel_leggings"
            },
            "R": {
            "item": "botania:rune_autumn"
            },
            "S": {
            "tag": "botania:terrasteel_ingots"
            },
            "T": {
            "item": "minecraft:echo_shard"
            }
        },
        "pattern": [
            "TRT",
            "SAS",
            " S "
        ],
        "result": {
            "item": "botania:terrasteel_leggings"
        },
        "show_notification": true
    })
    //泰拉靴子替换
    event.remove({id:'botania:terrasteel_boots'})
    event.custom({
        "type": "botania:armor_upgrade",
        "category": "equipment",
        "key": {
            "A": {
            "item": "botania:manasteel_boots"
            },
            "R": {
            "item": "botania:rune_winter"
            },
            "S": {
            "tag": "botania:terrasteel_ingots"
            },
            "T": {
            "item": "minecraft:echo_shard"
            }
        },
        "pattern": [
            "TRT",
            "SAS",
            " S "
        ],
        "result": {
            "item": "botania:terrasteel_boots"
        },
        "show_notification": true
    })
    
    //泰拉合成系列修改
    //创造魔力石板合成
    event.recipes.botania.terra_plate(Item.of('botania:mana_tablet', '{creative:1b,mana:500000}'), 
        [
            'botania:mana_tablet', 
            'botania:terrasteel_block',
            'minecraft:nether_star',
            'minecraft:netherite_ingot',
            'irons_spellbooks:mana_upgrade_orb',
            'goety:philosophers_stone'
        ], 
        100000
    )
    //魔力风暴合成
    event.remove({id:'botania:mana_bomb'})
    event.recipes.botania.terra_plate('botania:mana_bomb',
        [
            'goety:philosophers_stone',
            'botania:gaia_ingot',
            'goety:soul_emerald',
            'minecraft:conduit',
            'botania:dragonstone_block',
            'botania:corporea_spark'
        ],
        50000
    )
    //音爆聚晶合成
    event.remove({id:'goety:focus/sonic_boom_focus'})
    event.recipes.botania.terra_plate('goety:sonic_boom_focus',
        [
            'irons_spellbooks:eldritch_manuscript',
            'goety:ghost_fire_focus',
            'botania:gaia_ingot',
            'irons_spellbooks:upgrade_orb',
            'goety:resonance_crystal',
            'alexsmobs:farseer_arm'
        ],
        200000
    )
    //个人头像合成（终末产物）
    event.recipes.botania.terra_plate('kubejs:midnight', 
        [
            'goety:sonic_boom_focus', 
            'irons_spellbooks:mana_upgrade_orb',
            'goety:killing_focus',
            'irons_spellbooks:cooldown_upgrade_orb',
            'botania:blacker_lotus',
            'irons_spellbooks:protection_upgrade_orb'
        ], 
        500000
    )


    //产能花系列配方修改
    //火红莲
    event.remove({ output: 'botania:endoflame' })
    event.recipes.botania.petal_apothecary('botania:endoflame', 
        [
            '#botania:petals/brown',
            '#botania:petals/red',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/bronze'
        ]
    )
    //炽玫瑰
    event.remove({ output: 'botania:thermalily' })
    event.recipes.botania.petal_apothecary('botania:thermalily', 
        [
            '#botania:petals/red',
            '#botania:petals/orange',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/iron',
            'botania:rune_fire',
            'botania:rune_earth'
        ]
    )
    //阿卡纳蔷薇（吃经验）
    event.remove({ output: 'botania:rosa_arcana' })
    event.recipes.botania.petal_apothecary('botania:rosa_arcana', 
        [
            '#botania:petals/pink',
            '#botania:petals/purple',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/constantan',
            'botania:rune_mana'
        ]
    )
    //咀叶花
    event.remove({ output: 'botania:munchdew' })
    event.recipes.botania.petal_apothecary('botania:munchdew', 
        [
            '#botania:petals/lime',
            '#botania:petals/red',
            '#botania:petals/green',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/constantan',
            'botania:rune_gluttony'
        ]
    )
    //热爆花
    event.remove({ output: 'botania:entropinnyum' })
    event.recipes.botania.petal_apothecary('botania:entropinnyum', 
        [
            '#botania:petals/gray',
            '#botania:petals/red',
            '#botania:petals/white',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/constantan',
            'botania:rune_wrath',
            'botania:rune_fire'
        ]
    )
    //彼方兰（吃食物）
    event.remove({ output: 'botania:gourmaryllis' })
    event.recipes.botania.petal_apothecary('botania:gourmaryllis', 
        [
            '#botania:petals/gray',
            '#botania:petals/red',
            '#botania:petals/yellow',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/constantan',
            'botania:rune_summer',
            'botania:rune_fire'
        ]
    )
    //贪食花（吃蛋糕）
    event.remove({ output: 'botania:kekimurus' })
    event.recipes.botania.petal_apothecary('botania:kekimurus', 
        [
            '#botania:petals/white',
            '#botania:petals/orange',
            '#botania:petals/brown',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/constantan',
            'botania:rune_gluttony',
            'botania:pixie_dust'
        ]
    )
    //粘球草（吃自然生成的史莱姆）
    event.remove({ output: 'botania:narslimmus' })
    event.recipes.botania.petal_apothecary('botania:narslimmus', 
        [
            '#botania:petals/lime',
            '#botania:petals/green',
            '#botania:petals/black',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/constantan',
            'botania:rune_water',
            'botania:rune_summer'
        ]
    )
    //斑斓花
    event.remove({ output: 'botania:spectrolus' })
    event.recipes.botania.petal_apothecary('botania:spectrolus', 
        [
            '#botania:petals/red',
            '#botania:petals/green',
            '#botania:petals/blue',
            '#botania:petals/white',
            'irons_spellbooks:arcane_ingot',
            '#forge:ingots/steel',
            'botania:rune_air',
            'botania:rune_winter'
        ]
    )
    //勿落草
    event.remove({ output: 'botania:shulk_me_not' })
    event.recipes.botania.petal_apothecary('botania:shulk_me_not', 
        [
            '#botania:petals/purple',
            '#botania:petals/magenta',
            '#botania:petals/gray',
            'irons_spellbooks:arcane_ingot',
            '#forge:ingots/steel',
            'botania:rune_wrath',
            'botania:rune_envy'
        ]
    )
    //噬草花
    event.remove({ output: 'botania:rafflowsia' })
    event.recipes.botania.petal_apothecary('botania:rafflowsia', 
        [
            '#botania:petals/purple',
            '#botania:petals/green',
            '#botania:petals/black',
            'irons_spellbooks:arcane_ingot',
            '#forge:ingots/steel',
            'botania:rune_pride',
            'botania:rune_earth'
        ]
    )
    //启命英！
    event.remove({ output: 'botania:dandelifeon' })
    event.recipes.botania.petal_apothecary('botania:dandelifeon', 
        [
            '#botania:petals/purple',
            '#botania:petals/lime',
            'botania:corporea_spark',
            'irons_spellbooks:arcane_salvage',
            '#forge:ingots/aluminum',
            'goety:dark_ingot',
            'botania:rune_water',
            'botania:rune_fire',
            'botania:rune_air',
            'botania:rune_earth'
        ]
    )

    //花瓣适配种植罩
    let petalsCloche = (material) => {
        event.custom({
            "type":"immersiveengineering:cloche",
            "input":{"item":"botania:"+material+"_petal"},
            "render":{"type":"generic","block":"botania:"+material+"_double_flower"},
            "results":[{"item":"botania:"+material+"_double_flower"}],
            "soil":{"item":"farmersdelight:rich_soil"},
            "time":960
        })
    }

    const Colours = [
        "white",
        "orange",
        "magenta",
        "light_blue",
        "yellow",
        "lime",
        "pink",
        "gray",
        "light_gray",
        "cyan",
        "purple",
        "blue",
        "brown",
        "green",
        "red",
        "black"
    ]

    Colours.forEach((colour) => petalsCloche(colour))
})