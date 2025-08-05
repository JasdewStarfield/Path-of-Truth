ServerEvents.recipes(event => {
    event.remove({ id: /vintageimprovements\:craft\/.*_rod.*/ })

    event.remove({ id: "createdeco:pressing/netherite_sheet" })
    event.remove({ id: "createdeco:pressing/netherite_sheet" })

    //青铜块和锭
    //event.remove({id:'immersive_aircraft:airship'})
    event.shaped(
        Item.of('kubejs:bronze_block', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: '#forge:ingots/bronze'
        }
    )
    event.shapeless(
        Item.of('kubejs:bronze_ingot', 9),
        '#forge:storage_blocks/bronze'
    )

    //青铜粒和锭
    event.shaped(
        Item.of('kubejs:bronze_ingot', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: '#forge:nuggets/bronze'
        }
    )
    event.shapeless(
        Item.of('kubejs:bronze_nugget', 9),
        '#forge:ingots/bronze'
    )

    //青铜粉和锭
    event.smelting('kubejs:bronze_ingot', '#forge:dusts/bronze')
    event.blasting('kubejs:bronze_ingot', '#forge:dusts/bronze')

    //青铜工具，护甲
    event.shaped(
        Item.of('kubejs:bronze_pickaxe', 1),
        [
            'AAA',
            ' B ',
            ' B '
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_axe', 1),
        [
            'AA',
            'AB',
            ' B'
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_axe', 1),
        [
            'AA',
            'BA',
            'B '
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_sword', 1),
        [
            'A',
            'A',
            'B'
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_shovel', 1),
        [
            'A',
            'B',
            'B'
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_hoe', 1),
        [
            'AA',
            'B ',
            'B '
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_hoe', 1),
        [
            'AA',
            ' B',
            ' B'
        ],
        {
            A: '#forge:ingots/bronze',
            B: '#forge:rods/wooden'
        }
    )
    /*
    event.shaped(
        Item.of('kubejs:bronze_helmet', 1),
        [ 
        'AAA',
        'A A'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_chestplate', 1),
        [ 
        'A A',
        'AAA',
        'AAA'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_leggings', 1),
        [ 
        'AAA',
        'A A',
        'A A'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_boots', 1),
        [ 
        'A A',
        'A A'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    */

    //用铜粉、锡粉合成青铜粉
    event.recipes.create.mixing('2x kubejs:bronze_dust', ['#forge:dusts/tin', '#forge:dusts/copper', '#forge:dusts/copper', '#forge:dusts/copper', '#forge:dusts/sulfur'])

    //修改搅拌器配方
    event.replaceInput({ mod: 'create', output: 'create:whisk' },
        '#forge:plates/iron', '#forge:plates/andesite')

    //石磨粉碎铜锭锡锭镍锭锌锭
    event.recipes.create.milling(Item.of('kubejs:tin_dust').withChance(0.75), '#forge:ingots/tin').id('kubejs:tin_dust_manual_only')
    event.recipes.create.milling(Item.of('immersiveengineering:dust_copper').withChance(0.75), '#forge:ingots/copper').id('kubejs:copper_dust_manual_only')
    event.recipes.create.milling(Item.of('immersiveengineering:dust_nickel').withChance(0.75), '#forge:ingots/nickel').id('kubejs:nickel_dust_manual_only')
    event.recipes.create.milling(Item.of('kubejs:zinc_dust').withChance(0.75), '#forge:ingots/zinc').id('kubejs:zinc_dust_manual_only')

    event.recipes.create.milling(Item.of('immersiveengineering:dust_gold').withChance(0.25), '#forge:ingots/gold').id('kubejs:gold_dust_manual_only')
    event.recipes.create.milling(Item.of('immersiveengineering:dust_silver').withChance(0.25), '#forge:ingots/silver').id('kubejs:silver_dust_manual_only')

    event.recipes.create.crushing(Item.of('kubejs:tin_dust'), '#forge:ingots/tin')
    event.recipes.create.crushing(Item.of('immersiveengineering:dust_copper'), '#forge:ingots/copper')
    event.recipes.create.crushing(Item.of('immersiveengineering:dust_nickel'), '#forge:ingots/nickel')
    event.recipes.create.crushing(Item.of('kubejs:zinc_dust'), '#forge:ingots/zinc')

    //粉碎轮出铁粉
    event.recipes.create.crushing(Item.of('kubejs:iron_ingot_dust').withChance(0.75), '#forge:ingots/iron')

    event.remove({ id: /alloyed\.*/ })

    //燃烧室
    event.replaceInput(
        { output: "create:empty_blaze_burner" },
        '#forge:plates/iron',
        '#forge:wires/iron'
    )

    //康铜
    //移除合成康铜粉配方
    event.remove({ id: "immersiveengineering:crafting/constantan_mix" })
    //移除直接合金配方
    event.remove({ id: "createaddition:compat/immersiveengineering/constantan" })
    //新增加热搅拌配方
    event.recipes.create.mixing('2x immersiveengineering:dust_constantan', ['#forge:dusts/nickel', '#forge:dusts/copper', '#forge:dusts/phosphor']).heated()
    //康铜代替铜
    event.remove({ id: "create:crafting/kinetics/fluid_pipe" })
    event.remove({ id: "create:crafting/kinetics/fluid_pipe_vertical" })
    event.shaped('4x create:fluid_pipe', [
        'ABA',
    ], {
        A: '#forge:plates/constantan',
        B: '#forge:ingots/constantan'
    })
    event.shaped('4x create:fluid_pipe', [
        'A',
        'B',
        'A'
    ], {
        A: '#forge:plates/constantan',
        B: '#forge:ingots/constantan'
    })
    event.remove({ id: "create:crafting/kinetics/fluid_tank" })
    event.remove({ id: "create_connected:crafting/kinetics/fluid_vessel" })
    event.shaped('create_connected:fluid_vessel', [
        'ABA',
    ], {
        A: '#forge:plates/constantan',
        B: 'minecraft:barrel'
    })
    event.shaped('create:fluid_tank', [
        'A',
        'B',
        'A'
    ], {
        A: '#forge:plates/constantan',
        B: 'minecraft:barrel'
    })

    //弹簧组
    event.shaped('kubejs:basic_spring_set', [
        'AA',
        'AB'
    ], {
        A: 'vintageimprovements:iron_spring',
        B: 'vintageimprovements:small_bronze_spring'
    })
    event.recipes.create.sequenced_assembly([
        Item.of('kubejs:basic_spring_set')
    ], 'vintageimprovements:small_bronze_spring', [
        event.recipes.createDeploying("kubejs:incomplete_basic_spring_set", ["kubejs:incomplete_basic_spring_set", 'vintageimprovements:iron_spring']),
    ]).transitionalItem("kubejs:incomplete_basic_spring_set").loops(2)

    event.shaped('kubejs:advanced_spring_set', [
        'AA',
        'AB'
    ], {
        A: 'vintageimprovements:steel_spring',
        B: 'vintageimprovements:small_brass_spring'
    })
    event.recipes.create.sequenced_assembly([
        Item.of('kubejs:advanced_spring_set')
    ], 'vintageimprovements:small_brass_spring', [
        event.recipes.createDeploying("kubejs:incomplete_advanced_spring_set", ["kubejs:incomplete_advanced_spring_set", 'vintageimprovements:steel_spring']),
    ]).transitionalItem("kubejs:incomplete_advanced_spring_set").loops(2)

    event.remove({ id: "vintageimprovements:coiling/steel_rod" })
    event.recipes.vintageimprovements.coiling('vintageimprovements:steel_spring', '#forge:plates/steel')

    //黄铜
    event.remove({ id: "create:mixing/brass_ingot" })

    event.recipes.create.mixing('kubejs:brass_blend', ['#forge:dusts/copper', '#forge:dusts/zinc', '#forge:dusts/saltpeter']).heated()

    let inter = 'kubejs:incomplete_brass_ingot'
    event.recipes.create.sequenced_assembly([
        Item.of('create:brass_ingot').withChance(80.0),
        Item.of('kubejs:failed_brass_ingot').withChance(20.0)
    ], 'kubejs:brass_blend', [
        event.recipes.createFilling(inter, [inter, Fluid.lava(50)]),
        event.recipes.vintageimprovements.vibrating(inter, inter),
        event.recipes.createFilling(inter, [inter, Fluid.water(100)]),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(3)

    event.recipes.create.milling([Item.of('immersiveengineering:dust_copper').withChance(0.9), Item.of('kubejs:zinc_dust').withChance(0.9)], 'kubejs:failed_brass_ingot')

    //黑曜石支持用石磨处理
    event.recipes.create.milling(Item.of('create:powdered_obsidian').withChance(0.75), '#forge:obsidian')
    //焦煤也是
    event.recipes.create.milling(Item.of('immersiveengineering:dust_coke').withChance(0.75), '#forge:coal_coke').id('coal_coke_dust_manual_only')

    //深板岩
    event.recipes.create.filling('magma_block', [Fluid.of('minecraft:lava', 500), 'minecraft:cobblestone'])
    event.recipes.create.emptying([Fluid.of('minecraft:lava', 250), 'minecraft:cobbled_deepslate'], 'magma_block')

    //木炭缠魂到煤炭
    event.recipes.create.haunting(Item.of('minecraft:coal').withChance(0.5), 'minecraft:charcoal')

    //致密碳
    event.recipes.create.compacting([Item.of('scguns:anthralite_nugget', 3), Item.of('scguns:anthralite_nugget', 1).withChance(0.5)], ['#forge:dusts/coal', '#forge:dusts/coal', '#forge:dusts/saltpeter', '#forge:dusts/phosphor']).heated()

    //泥土到铜
    event.recipes.create.mixing('4x dirt', ['#forge:sand', '#forge:cobblestone', Fluid.of('water', 500)])
    event.recipes.create.splashing([Item.of('create:copper_nugget').withChance(0.25)], 'dirt')

    //丐版碎沙砾
    event.remove({ id: "create:milling/gravel" })
    event.recipes.create.milling([Item.of('minecraft:flint'), Item.of('minecraft:sand').withChance(0.75)], 'gravel').id('kubejs:milling/gravel_manual_only')

    //削弱陶瓦出铜
    event.recipes.create.crushing([Item.of('minecraft:red_sand'), Item.of('create:copper_nugget').withChance(0.25)], '#minecraft:terracotta')

    //燧石出镍
    event.recipes.create.milling(Item.of('immersiveengineering:nugget_nickel').withChance(0.3), 'flint')

    //黏土出锌
    event.recipes.create.milling(Item.of('create:zinc_nugget').withChance(0.5), 'clay_ball')

    //泥巴配方修改
    event.remove({ id: "minecraft:packed_mud" })
    event.remove({ id: "farmersdelight:packed_mud_from_straw" })
    event.shapeless(Item.of('minecraft:packed_mud', 4), ['minecraft:mud', 'minecraft:mud', 'minecraft:mud', 'minecraft:mud', 'farmersdelight:straw'])
    event.shapeless(Item.of('minecraft:packed_mud', 3), ['minecraft:mud', 'minecraft:mud', 'minecraft:mud', 'minecraft:wheat'])

    //泥巴出铁、铝土
    event.recipes.create.crushing([Item.of('kubejs:raw_iron_nugget'), Item.of('kubejs:raw_iron_nugget').withChance(0.25), Item.of('kubejs:raw_bauxite_nugget').withChance(0.75)], 'packed_mud')

    //深板岩粉碎出铅，银
    event.recipes.create.crushing([Item.of('oreganized:silver_nugget').withChance(0.2)], 'deepslate')
    event.recipes.create.crushing([Item.of('oreganized:silver_nugget').withChance(0.2)], 'cobbled_deepslate')

    //花岗岩粉碎出铀
    event.remove({ id: "createnuclear:crushing/granite" })
    event.recipes.create.crushing([Item.of('immersiveengineering:nugget_uranium').withChance(0.15), Item.of("minecraft:red_sand")], 'granite')

    //红石量产
    event.recipes.create.filling('redstone_block', [Fluid.of('immersiveengineering:redstone_acid', 250), 'botania:livingrock'])

    //玄武岩粉碎产青金石
    event.remove({ id: "vintageimprovements:crushing/basalt" })
    event.remove({ id: "vintageimprovements:crushing/basalt_recycling" })
    event.recipes.create.crushing([Item.of('minecraft:lapis_lazuli').withChance(0.3)], 'basalt')

    //焦黑熔渣粉碎生成硫粉
    event.recipes.create.crushing([Item.of('scguns:sulfur_dust').withChance(0.3)], 'create:scoria')

    //禁止粉碎生成硫
    event.remove({ id: "vintageimprovements:crushing/scoria" })
    event.remove({ id: "vintageimprovements:crushing/scoria_recycling" })
    event.remove({ id: "scguns:create/basalt_recycling" })

    //禁止致密碳
    event.remove({ id: "scguns:create/soul_soil" })


    //霜火双层板
    event.recipes.create.compacting('kubejs:frostfire_double_plate', ['#forge:plates/froststeel', '#forge:slimeballs', '#forge:plates/horizonite'])

    //锌铝块和锭
    event.shaped(
        Item.of('kubejs:za_block', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: '#forge:ingots/za'
        }
    )
    event.shapeless(
        Item.of('kubejs:za_ingot', 9),
        '#forge:storage_blocks/za'
    )

    //锌铝粒和锭
    event.shaped(
        Item.of('kubejs:za_ingot', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: '#forge:nuggets/za'
        }
    )
    event.shapeless(
        Item.of('kubejs:za_nugget', 9),
        '#forge:ingots/za'
    )

    //锌铝粉和锭
    event.smelting('#forge:ingots/za', '#forge:dusts/za')
    event.blasting('#forge:ingots/za', '#forge:dusts/za')
    event.custom({
        "type": "immersiveengineering:crusher",
        "energy": 3000,
        "input": { "tag": "forge:ingots/za" },
        "result": { "base_ingredient": { "tag": "forge:dusts/za" }, "count": 1 },
        "secondaries": []
    })

    //一些沉浸盔甲修改
    event.replaceInput(
        { output: /immersive_armors:divine_.*/ },
        '#forge:ingots/gold',
        '#forge:ingots/manasteel'
    )

    event.replaceInput(
        { output: /immersive_armors:steampunk_.*/ },
        '#forge:ingots/gold',
        '#forge:ingots/brass'
    )

    event.remove({ output: /immersive_armors:wooden_.*/ })

    event.shaped(
        Item.of('immersive_armors:wooden_helmet', 1),
        [
            'ABA',
            'A A'
        ],
        {
            A: 'botania:livingwood_planks',
            B: '#forge:nuggets/bronze'
        }
    )
    event.shaped(
        Item.of('immersive_armors:wooden_chestplate', 1),
        [
            'A A',
            'ABA',
            'AAA'
        ],
        {
            A: 'botania:livingwood_planks',
            B: '#forge:nuggets/bronze'
        }
    )
    event.shaped(
        Item.of('immersive_armors:wooden_leggings', 1),
        [
            'AAA',
            'B B',
            'A A'
        ],
        {
            A: 'botania:livingwood_planks',
            B: '#forge:nuggets/bronze'
        }
    )
    event.shaped(
        Item.of('immersive_armors:wooden_boots', 1),
        [
            'A A',
            'B B'
        ],
        {
            A: 'botania:livingwood_planks',
            B: '#forge:nuggets/bronze'
        }
    )

    //雪帽熔炉配方修改
    event.remove({ id: "blue_skies:snowcap_oven" })
    event.shaped(
        Item.of('blue_skies:snowcap_oven', 1),
        [
            'AAA',
            'CDC',
            'BCB'
        ],
        {
            A: 'blue_skies:snowcap_mushroom_block',
            B: 'blue_skies:turquoise_cobblestone',
            C: 'undergarden:raw_froststeel',
            D: 'minecraft:furnace'
        }
    )
    //破碎版
    event.shaped(
        Item.of('blue_skies:snowcap_oven', 1),
        [
            ' B ',
            'ADA',
            ' B '
        ],
        {
            A: 'undergarden:raw_froststeel',
            B: 'blue_skies:turquoise_cobblestone',
            D: 'kubejs:broken_snowcap_oven'
        }
    )
    event.smelting("kubejs:broken_snowcap_oven", "blue_skies:snowcap_oven")

    //石墨
    event.remove({ id: "createnuclear:pressing/graphene" })

    //粗铁、铝合成配方
    event.shaped(
        Item.of('create:crushed_raw_iron', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: 'kubejs:raw_iron_nugget'
        }
    )
    event.shapeless( Item.of('kubejs:raw_iron_nugget', 9), 'create:crushed_raw_iron')

    event.shaped(
        Item.of('kubejs:crushed_raw_bauxite', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: 'kubejs:raw_bauxite_nugget'
        }
    )
    event.shapeless( Item.of('kubejs:raw_bauxite_nugget', 9), 'kubejs:crushed_raw_bauxite')

    //矿渣再利用
    event.recipes.create.crushing([Item.of("kubejs:slag_chunk", 2), Item.of("kubejs:slag_chunk", 2).withChance(0.5)], "#forge:slag")
    event.recipes.create.mixing(Fluid.of("kubejs:slurry_slag", 100), [Fluid.of("minecraft:water", 100), Item.of("kubejs:slag_chunk")])
    event.recipes.vintageimprovements.centrifugation([
        Fluid.of("minecraft:water", 100),
        Item.of("mud"),
        Item.of("gold_nugget").withChance(0.01),
        Item.of("create:copper_nugget").withChance(0.03),
        Item.of("create:zinc_nugget").withChance(0.03),
        Item.of("immersiveengineering:nugget_nickel").withChance(0.03),
        Item.of("oreganized:lead_nugget").withChance(0.02),
        Item.of("oreganized:silver_nugget").withChance(0.01),
        Item.of("immersiveengineering:nugget_uranium").withChance(0.01),
        Item.of("simplemetals_tin:tin_nugget").withChance(0.03),
        Item.of("scguns:anthralite_nugget").withChance(0.02),
    ],
        Fluid.of('kubejs:slurry_slag', 200)).minimalRPM(128)

    //玉石增殖
    event.custom({
        "type": "immersiveengineering:cloche",
        "input": { "item": "blue_skies:sunstone_crystal" },
        "render": { "type": "generic", "block": "blue_skies:sunstone_crystal" },
        "results": [
            { "count": 1, "item": "blue_skies:sunstone_crystal" }
        ],
        "soil": { "item": "blue_skies:lunar_stone" },
        "time": 800
    })
    event.custom({
        "type": "immersiveengineering:cloche",
        "input": { "item": "blue_skies:moonstone_crystal" },
        "render": { "type": "generic", "block": "blue_skies:moonstone_crystal" },
        "results": [
            { "count": 1, "item": "blue_skies:moonstone_crystal" }
        ],
        "soil": { "item": "blue_skies:turquoise_stone" },
        "time": 800
    })
    event.recipes.create.crushing([Item.of('blue_skies:moonstone_shard', 2).withChance(0.5), Item.of('blue_skies:moonstone_shard', 4)], Item.of('blue_skies:moonstone_crystal'))
    event.recipes.create.mixing("goety:jade", [Item.of('blue_skies:moonstone_crystal'), Item.of('blue_skies:sunstone_crystal')])

    //炽铁
    event.recipes.create.compacting('blue_skies:horizonite_block', [
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#blue_skies:ingots/horizonite',
        '#blue_skies:ingots/horizonite',
        '#blue_skies:ingots/horizonite',
        'blue_skies:sunstone_crystal'
    ]).heated()

    //缪铁
    event.recipes.create.compacting('blue_skies:falsite_block', [
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#forge:ingots/iron',
        '#blue_skies:ingots/falsite',
        '#blue_skies:ingots/falsite',
        '#blue_skies:ingots/falsite',
        'blue_skies:moonstone_crystal'
    ])

    //榴石
    event.recipes.create.compacting(
        [
            Item.of('blue_skies:pyrope_gem', 1),
            Item.of('blue_skies:pyrope_gem', 1).withChance(0.5),
            'kubejs:fire_elemental_core'
        ], [
            'blue_skies:pyrope_gem',
            'kubejs:fire_elemental_core',
            Fluid.of("immersiveengineering:acetaldehyde", 100)
        ]
    ).heated()

    //批量炼焦
    event.recipes.vintageimprovements.pressurizing([
        Item.of('immersiveengineering:coal_coke', 1),
        Item.of('immersiveengineering:coal_coke', 1).withChance(0.25),
        Fluid.of('immersiveengineering:creosote', 500)
    ], [
        Item.of('goety:ectoplasm'),
        Item.of('minecraft:coal', 1),
    ]).heated()


    //补充一些沉浸工程压板配方
    let IEMetalPressing = (material) => {
        event.custom({
            "type": "immersiveengineering:metal_press",
            "conditions": [],
            "energy": 2400,
            "input": { "tag": "forge:ingots/" + material },
            "mold": "immersiveengineering:mold_plate",
            "result": {
                "base_ingredient": { "tag": "forge:plates/" + material },
                "count": 1
            }
        })
    }
    const MissingPressingRecipeMetals = [
        "voidsteel",
        "andesite",
        "zinc",
        "industrial_iron",
        "forgotten_metal",
        "za",
        "terrasteel",
        "hop_graphite"
    ]
    MissingPressingRecipeMetals.forEach(material => {
        IEMetalPressing(material)
    });

    //盖亚魂量产相关
    //恶魂之泪
    event.recipes.create.haunting([Item.of('minecraft:ghast_tear', 2), Item.of('minecraft:ghast_tear').withChance(0.5)], 'kubejs:frostfire_double_plate')
    //盖亚魂合成
    event.recipes.vintageimprovements.pressurizing([
        Item.of('botania:life_essence', 2),
        Item.of('botania:life_essence', 1).withChance(0.5),
        Item.of('createnuclear:enriched_yellowcake', 1)
    ], [
        Item.of('botania:life_essence', 1),
        Item.of('minecraft:echo_shard', 1),
        Item.of('minecraft:ghast_tear', 1),
        Item.of('createnuclear:enriched_yellowcake', 1)
    ]).superheated()
    //盖亚魂锭
    event.recipes.create.mixing('botania:gaia_ingot', [
        Item.of('botania:life_essence', 1),
        Item.of('botania:life_essence', 1),
        Item.of('botania:life_essence', 1),
        Item.of('botania:life_essence', 1),
        Item.of('botania:terrasteel_ingot', 1)
    ])
})
