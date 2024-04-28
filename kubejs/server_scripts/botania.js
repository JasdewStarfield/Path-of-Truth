//此文件提供植物魔法系列修改
//魔力满值：100000

ServerEvents.recipes(event => {
    //修改白雏菊合成配方
    event.remove({ output: 'botania:pure_daisy' })
    event.recipes.botania.petal_apothecary('botania:pure_daisy', 
        [
            '#botania:petals/white',
            'irons_spellbooks:arcane_essence',
            '#forge:ingots/tin'
        ]
    )

    //复制血腥法杖
    event.recipes.botania.petal_apothecary('irons_spellbooks:blood_staff', 
        [
            'botania:fire_rod',
            'irons_spellbooks:blood_upgrade_orb',
            'createchromaticreturn:chromatic_compound',
            'bloodmagic:strong_tau',
            'bloodmagic:weakbloodshard',
            'minecraft:dragon_breath'
        ]
    )

    //修改魔力池配方
    event.remove({ output: 'botania:mana_pool' })
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

    //魔钢-奥术源质兑换
    event.recipes.botania.mana_infusion('4x irons_spellbooks:arcane_essence', 'botania:manasteel_ingot', 1000, 'botania:alchemy_catalyst')
    //刷怪蛋复制：遗忆守卫，瞻远者，宝箱怪，潜影贝
    event.recipes.botania.mana_infusion('2x undergarden:forgotten_guardian_spawn_egg', 'undergarden:forgotten_guardian_spawn_egg', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_farseer', 'alexsmobs:spawn_egg_farseer', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x artifacts:mimic_spawn_egg', 'artifacts:mimic_spawn_egg', 25000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:shulker_spawn_egg', 'minecraft:shulker_spawn_egg', 50000,'botania:conjuration_catalyst')
    //遗忆锭转化钻石1:2
    event.recipes.botania.mana_infusion('2x minecraft:diamond', 'undergarden:forgotten_ingot', 1000,'botania:alchemy_catalyst')

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
            G:'botania:rune_mana',
            H:'botania:rune_air'
        }
    )

    //火花配方替换
    event.replaceInput({mod:'botania',output:'botania:spark'},
    'minecraft:gold_nugget', 'botania:elementium_nugget' )

    //自然水晶配方替换
    event.replaceInput({mod:'botania',output:'botania:natura_pylon'},
    'minecraft:ender_eye', 'minecraft:ender_pearl' )
    event.replaceInput({mod:'botania',output:'botania:natura_pylon'},
    'botania:terrasteel_nugget', 'create:brass_nugget' )

    //生命聚合器配方替换
    event.replaceInput({mod:'botania',output:'botania:spawner_mover'},
    'botania:dragonstone', 'irons_spellbooks:blood_staff' )
    event.replaceInput({mod:'botania',output:'botania:spawner_mover'},
    'botania:elementium_ingot', 'botania:terrasteel_ingot' )
    event.replaceInput({mod:'botania',output:'botania:spawner_mover'},
    'botania:ender_air_bottle', 'irons_spellbooks:upgrade_orb' )

    //精灵门核心配方替换
    event.replaceInput({mod:'botania',output:'botania:alfheim_portal'},
    'botania:terrasteel_nugget', 'create:brass_nugget' )

    //魔力枪配方替换
    event.replaceInput({mod:'botania',output:'botania:mana_gun'},
    'minecraft:tnt', 'botania:terrasteel_ingot' )
    event.replaceInput({mod:'botania',output:'botania:mana_gun'},
    'botania:redstone_spreader', 'bloodmagic:magicianbloodorb' )
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
            D:'bloodmagic:magicianbloodorb'
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

    //精灵门交换奥术源质-魔力粉
    event.recipes.botania.elven_trade(
        [
            'botania:mana_powder'
        ], 
        [
            'irons_spellbooks:arcane_essence'
        ]
    )

    //精灵门产出冰封骨头
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
            'createchromaticreturn:antiplite_ingot'
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
            'alexsmobs:farseer_arm',
            'botania:corporea_spark',
            'createchromaticreturn:multiplite_ingot'
        ]
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
            'botania:manasteel_ingot', 
            'botania:mana_pearl',
            'botania:mana_diamond',
            '#forge:ingots/brass',
            'irons_spellbooks:arcane_ingot'
        ], 
        50000
    )
    //创造魔力石板合成
    event.recipes.botania.terra_plate(Item.of('botania:mana_tablet', '{creative:1b,mana:500000}'), 
        [
            'botania:mana_tablet', 
            'botania:terrasteel_block',
            'immersiveengineering:storage_steel',
            'botania:dandelifeon',
            'createchromaticreturn:chromatic_compound',
            'minecraft:conduit',
            'irons_spellbooks:mana_upgrade_orb',
            'blue_skies:charoite_block'
        ], 
        100000
    )
    //个人头像合成（终末产物）
    event.recipes.botania.terra_plate('kubejs:midnight', 
        [
            'minecraft:dragon_egg', 
            'irons_spellbooks:eldritch_manuscript',
            'botania:creative_pool',
            'bloodmagic:archmagebloodorb',
            'minecraft:budding_amethyst',
            'createchromaticreturn:multiplite_ingot',
            'alexsmobs:transmutation_table',
            'bosses_of_mass_destruction:mob_ward'
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
            'tfmg:aluminum_ingot',
            'botania:terrasteel_ingot',
            'botania:rune_water',
            'botania:rune_fire',
            'botania:rune_air',
            'botania:rune_earth'
        ]
    )

})