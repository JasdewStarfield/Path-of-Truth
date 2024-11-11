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
    event.shaped(Item.of('mechanicalbotania:mana_motor',1),
    ['ABA',
    'CDC',
    'ABA'],
    {
        A:'botania:manasteel_ingot',
        B:'irons_spellbooks:arcane_salvage',
        C:'irons_spellbooks:mana_ring',
        D:'create_new_age:basic_motor'
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
            'immersiveengineering:component_electronic_adv',
            'botania:aura_ring_greater',
            'kubejs:forgotten_mechanism'
        ]
    )

    //合成破晓仪式石
    event.recipes.botania.petal_apothecary('bloodmagic:lightritualstone', 
        [
            'bloodmagic:masterritualstone',
            'kubejs:electronic_engineering',
            'immersiveengineering:component_electronic_adv'
        ]
    )
    //锻造血腥法杖
    event.recipes.botania.petal_apothecary('irons_spellbooks:blood_staff', 
        [
            'botania:fire_rod',
            'irons_spellbooks:blood_upgrade_orb',
            'immersiveengineering:steel_post',
            'bloodmagic:strong_tau',
            'bloodmagic:weakbloodshard',
            'minecraft:dragon_breath'
        ]
    )
    //黑莲花修改
    event.recipes.botania.petal_apothecary('botania:black_lotus', 
        [
            'minecraft:lily_pad',
            'botania:black_mystical_flower',
            'botania:pixie_dust'
        ]
    )
    //暗黑莲花修改
    event.recipes.botania.petal_apothecary('botania:blacker_lotus', 
        [
            'botania:black_lotus',
            'irons_spellbooks:ender_upgrade_orb',
            'tfmg:asphalt'
        ]
    )
    //合成注能丝触书籍
    /*
    
    event.recipes.botania.petal_apothecary('createchromaticreturn:silkstrum_book', 
        [
            'createchromaticreturn:silkstrum',
            'createchromaticreturn:refined_radiance',
            'bosses_of_mass_destruction:levitation_block',
            'irons_spellbooks:ruined_book'
        ]
    )
    */

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

    //符文祭坛配方
    //炼制铁魔法空白符文
    event.recipes.botania.runic_altar('irons_spellbooks:blank_rune', 
        [
            'botania:rune_mana', 
            'bloodmagic:blankrune',
            'botania:mana_powder'
        ], 
        10000
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

    //魔钢-奥术源质兑换
    event.recipes.botania.mana_infusion('4x irons_spellbooks:arcane_essence', 'botania:manasteel_ingot', 1000, 'botania:alchemy_catalyst')
    //变色龙蛋生产
    event.recipes.botania.mana_infusion('cold_sweat:chameleon_spawn_egg', 'botania:mutated_seeds', 100000, 'botania:mana_bomb')
    //刷怪蛋复制：遗忆守卫，瞻远者，宝箱怪，潜影贝，凋零骷髅，变色龙，远古骑士
    event.recipes.botania.mana_infusion('2x undergarden:forgotten_guardian_spawn_egg', 'undergarden:forgotten_guardian_spawn_egg', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_farseer', 'alexsmobs:spawn_egg_farseer', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x artifacts:mimic_spawn_egg', 'artifacts:mimic_spawn_egg', 25000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:shulker_spawn_egg', 'minecraft:shulker_spawn_egg', 50000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x minecraft:wither_skeleton_spawn_egg', 'minecraft:wither_skeleton_spawn_egg', 25000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x cold_sweat:chameleon_spawn_egg', 'cold_sweat:chameleon_spawn_egg', 25000,'botania:conjuration_catalyst')
    event.recipes.botania.mana_infusion('2x irons_spellbooks:armor_pile', 'irons_spellbooks:armor_pile', 50000,'botania:conjuration_catalyst')
    //遗忆锭转化钻石1:2
    event.recipes.botania.mana_infusion('2x minecraft:diamond', 'undergarden:forgotten_ingot', 1000,'botania:alchemy_catalyst')
    //龙皮复制
    event.recipes.botania.mana_infusion('2x irons_spellbooks:dragonskin', 'irons_spellbooks:dragonskin', 5000,'botania:conjuration_catalyst')
    //海洋之心复制
    event.recipes.botania.mana_infusion('2x minecraft:heart_of_the_sea', 'minecraft:heart_of_the_sea', 50000,'botania:mana_bomb')

    //瞻远者蛋转化瞻远者之臂
    event.recipes.botania.mana_infusion('alexsmobs:farseer_arm', 'alexsmobs:spawn_egg_farseer', 50000,'botania:mana_bomb')

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
            'botania:blacker_lotus'
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
            'bloodmagic:lightritualstone'
        ]
    )

    //魔力转换器配方修改
    event.remove({output:'botania:mana_fluxfield'})
    event.recipes.botania.runic_altar('botania:mana_fluxfield', 
        [
            'kubejs:electronic_engineering', 
            'botania:redstone_root',
            'immersiveengineering:generator',
            'bloodmagic:strengthenedcatalyst'
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
            'botania:manasteel_ingot', 
            'botania:mana_pearl',
            'botania:mana_diamond',
            '#forge:ingots/brass',
            'irons_spellbooks:arcane_ingot'
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
    //创造魔力石板合成
    event.recipes.botania.terra_plate(Item.of('botania:mana_tablet', '{creative:1b,mana:500000}'), 
        [
            'botania:mana_tablet', 
            'botania:terrasteel_block',
            '#forge:storage_blocks/steel',
            'botania:spawner_mover',
            'immersiveengineering:storage_electrum',
            'minecraft:netherite_ingot',
            'irons_spellbooks:mana_upgrade_orb',
            'blue_skies:charoite_block'
        ], 
        100000
    )
    //魔力风暴合成
    event.remove({id:'botania:mana_bomb'})
    event.recipes.botania.terra_plate('botania:mana_bomb',
        [
            'minecraft:tnt_minecart',
            'botania:gaia_ingot',
            'kubejs:frostfire_double_plate',
            'minecraft:conduit',
            'botania:dragonstone_block',
            'botania:corporea_spark'
        ],
        50000
    )
    //个人头像合成（终末产物）
    event.recipes.botania.terra_plate('kubejs:midnight', 
        [
            'minecraft:dragon_egg', 
            'irons_spellbooks:mana_upgrade_orb',
            'botania:mana_bomb',
            'bloodmagic:archmagebloodorb',
            'minecraft:budding_amethyst',
            'bloodmagic:lightritualstone',
            'alexsmobs:transmutation_table',
            'botania:blacker_lotus'
        ], 
        500000
    )
    /*
    //异彩化合物魔法合成
    event.recipes.botania.terra_plate('createchromaticreturn:chromatic_compound', 
        [
            'bloodmagic:rawdemoncrystal', 
            'bloodmagic:corrosivedemoncrystal',
            'bloodmagic:destructivedemoncrystal',
            'bloodmagic:vengefuldemoncrystal',
            'bloodmagic:steadfastdemoncrystal',
            'botania:gaia_ingot',
            'botania:corporea_spark_creative',
            'kubejs:midnight'
        ], 
        500000
    )

    //辉光锭合成
    
    event.recipes.botania.terra_plate('createchromaticreturn:glowing_ingot', 
        [
            'createchromaticreturn:chromatic_compound', 
            'botania:thor_ring',
            'botania:odin_ring',
            'botania:loki_ring',
            'bosses_of_mass_destruction:levitation_block',
            'botania:infinite_fruit',
            'botania:king_key',
            'botania:flugel_eye'
        ], 
        500000
    )*/

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
            'botania:terrasteel_ingot',
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