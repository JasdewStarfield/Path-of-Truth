ServerEvents.recipes(event => {
    event.remove({id:/vintageimprovements\:craft\/.*_rod.*/})

    event.remove({id:"createdeco:pressing/netherite_sheet"})
    event.remove({id:"createdeco:pressing/netherite_sheet"})

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
    event.smelting('#forge:ingots/bronze', '#forge:dusts/bronze')
    event.blasting('#forge:ingots/bronze', '#forge:dusts/bronze')

    //青铜压板
    event.recipes.create.pressing('#forge:plates/bronze', '#forge:ingots/bronze')

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
    event.recipes.create.mixing('2x kubejs:bronze_dust', ['#forge:dusts/tin','#forge:dusts/copper','#forge:dusts/copper','#forge:dusts/copper'])

    //修改搅拌器配方
    event.replaceInput({mod:'create',output:'create:whisk'},
    '#forge:plates/iron', '#forge:plates/andesite' )

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
    event.recipes.create.crushing(Item.of('#forge:dusts/iron').withChance(0.75), '#forge:ingots/iron')

    event.remove({id:/alloyed\.*/})
    event.recipes.create.mixing('2x kubejs:bronze_ingot', ['#forge:ingots/tin','#forge:ingots/copper','#forge:ingots/copper','#forge:ingots/copper']).heated()

    //燃烧室
    event.replaceInput(
        { output:"create:empty_blaze_burner" },
        '#forge:plates/iron',
        '#forge:wires/iron'
    )

    //康铜
    //移除合成康铜粉配方
    event.remove({id:"immersiveengineering:crafting/constantan_mix"})
    //新增加热搅拌配方
    event.recipes.create.mixing('2x #forge:dusts/constantan', ['#forge:dusts/nickel','#forge:dusts/copper']).heated()
    //补充辊压配方
    event.recipes.create.pressing('#forge:plates/constantan', '#forge:ingots/constantan')
    //康铜代替铜
    event.replaceInput(
        { output:"create:fluid_pipe" },
        '#forge:ingots/copper',
        '#forge:ingots/constantan'
    )
    event.replaceInput(
        { output:"create:fluid_pipe" },
        '#forge:plates/copper',
        '#forge:plates/constantan'
    )
    event.replaceInput(
        { output:"create:fluid_tank" },
        '#forge:plates/copper',
        '#forge:plates/constantan'
    )
    event.replaceInput(
        { output:"create_connected:fluid_vessel" },
        '#forge:plates/copper',
        '#forge:plates/constantan'
    )

    //弹簧组
    event.shaped('kubejs:basic_spring_set', [ 
        'AA', 
        'AB',
        'AA'  
    ], {
        A: 'vintageimprovements:iron_spring',
        B: 'vintageimprovements:small_bronze_spring'
    })
    event.recipes.create.sequenced_assembly([
        Item.of('kubejs:basic_spring_set')
    ], 'vintageimprovements:small_bronze_spring', [
        event.recipes.createDeploying("kubejs:incomplete_basic_spring_set", ["kubejs:incomplete_basic_spring_set", 'vintageimprovements:iron_spring']),
    ]).transitionalItem("kubejs:incomplete_basic_spring_set").loops(4)

    event.shaped('kubejs:advanced_spring_set', [ 
        'AA', 
        'AB',
        'AA'  
    ], {
        A: 'vintageimprovements:steel_spring',
        B: 'vintageimprovements:small_brass_spring'
    })
    event.recipes.create.sequenced_assembly([
        Item.of('kubejs:advanced_spring_set')
    ], 'vintageimprovements:small_brass_spring', [
        event.recipes.createDeploying("kubejs:incomplete_advanced_spring_set", ["kubejs:incomplete_advanced_spring_set", 'vintageimprovements:steel_spring']),
    ]).transitionalItem("kubejs:incomplete_advanced_spring_set").loops(4)

    //黄铜
    event.remove({id:"create:mixing/brass_ingot"})

    event.recipes.create.mixing('kubejs:brass_blend', ['#forge:dusts/copper','#forge:dusts/zinc']).heated()

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

    event.recipes.create.milling([Item.of('#forge:dusts/copper').withChance(0.9),Item.of('#forge:dusts/zinc').withChance(0.9)], 'kubejs:failed_brass_ingot')

    //黑曜石支持用石磨处理
    event.recipes.create.milling(Item.of('create:powdered_obsidian').withChance(0.75), '#forge:obsidian')
    //焦煤也是
    event.recipes.create.milling(Item.of('#forge:dusts/coal_coke').withChance(0.75), '#forge:coal_coke').id('coal_coke_dust_manual_only')

    //深板岩
    event.recipes.create.filling('magma_block', [Fluid.of('minecraft:lava',500),'minecraft:cobblestone'])
    event.recipes.create.emptying([Fluid.of('minecraft:lava',250), 'minecraft:cobbled_deepslate'], 'magma_block')

    //木炭压制焦煤（小概率）
    event.recipes.create.compacting([Item.of('#forge:coal_coke').withChance(0.1), Fluid.of('immersiveengineering:creosote', 500)], ['#forge:dusts/coal','#forge:dusts/coal','#forge:dusts/coal','#forge:dusts/coal']).heated()

    //ban掉水搅拌出锌粒，火药烧烈焰粉

    //泥土到铜
    event.recipes.create.mixing('2x dirt', ['#forge:sand','#forge:cobblestone',Fluid.of('water',500)])
    event.recipes.create.splashing([Item.of('create:copper_nugget').withChance(0.5)], 'dirt')

    //削弱陶瓦出铜
    event.recipes.create.crushing([Item.of('minecraft:red_sand'),Item.of('create:copper_nugget').withChance(0.25)], '#minecraft:terracotta')

    //燧石出镍
    event.recipes.create.milling(Item.of('immersiveengineering:nugget_nickle').withChance(0.3), 'flint')

    //黏土出锌
    event.recipes.create.milling(Item.of('create:zinc_nugget').withChance(0.5), 'clay_ball')

    //泥巴出铁、铝土
    event.recipes.create.crushing([Item.of('create:crushed_raw_iron').withChance(0.14),Item.of('kubejs:crushed_raw_bauxite').withChance(0.07)], 'packed_mud')

    //深板岩粉碎出铅，银
    event.recipes.create.crushing([Item.of('oreganized:silver_nugget').withChance(0.2), Item.of('oreganized:lead_nugget').withChance(0.5)], 'deepslate')
    event.recipes.create.crushing([Item.of('oreganized:silver_nugget').withChance(0.2), Item.of('oreganized:lead_nugget').withChance(0.5)], 'cobbled_deepslate')

    //黑石粉碎出铀
    event.recipes.create.crushing([Item.of('#forge:nuggets/uranium').withChance(0.15)], 'blackstone')

    //红石量产
    event.recipes.create.filling('redstone_block', [Fluid.of('immersiveengineering:redstone_acid',1000),'botania:livingrock'])


    //霜火双层板
    event.recipes.create.compacting('kubejs:frostfire_double_plate', ['#forge:plates/froststeel','#forge:slimeballs','#forge:plates/horizonite'])

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
        "type":"immersiveengineering:crusher",
        "energy":3000,
        "input":{"tag":"forge:ingots/za"},
        "result":{"base_ingredient":{"tag":"forge:dusts/za"},"count":1},
        "secondaries":[]
    })

    //一些沉浸盔甲修改
    event.replaceInput(
        { output:/immersive_armors:divine_.*/ },
        '#forge:ingots/gold',
        '#forge:ingots/manasteel'
    )

    event.replaceInput(
        { output:/immersive_armors:steampunk_.*/ },
        '#forge:ingots/gold',
        '#forge:ingots/brass'
    )

    event.remove({output:/immersive_armors:wooden_.*/})

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
    event.remove({id: "blue_skies:snowcap_oven"})
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

    //补充一些沉浸工程压板配方
    let IEMetalPressing = (material) => {
        event.custom({
            "type":"immersiveengineering:metal_press",
            "conditions":[],
            "energy":2400,
            "input":{"tag":"forge:ingots/"+material},
            "mold":"immersiveengineering:mold_plate",
            "result":{
              "base_ingredient":{"tag":"forge:plates/"+material},
              "count":1
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
        "terrasteel"
    ]
    MissingPressingRecipeMetals.forEach(material => {
        IEMetalPressing(material)
    });

})
