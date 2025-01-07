ServerEvents.recipes(event => {
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
    event.shaped(
        Item.of('kubejs:bronze_ingot', 9),
        [ 
        'A'
        ],
        {
        A: '#forge:storage_blocks/bronze'
        }
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
    event.shaped(
        Item.of('kubejs:bronze_nugget', 9),
        [ 
        'A'
        ],
        {
        A: '#forge:ingots/bronze'
        }
    )

    //青铜粉和锭
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
    event.recipes.create.milling(Item.of('kubejs:tin_dust').withChance(0.5), '#forge:ingots/tin')
    event.recipes.create.milling(Item.of('immersiveengineering:dust_copper').withChance(0.5), '#forge:ingots/copper')
    event.recipes.create.milling(Item.of('immersiveengineering:dust_nickel').withChance(0.5), '#forge:ingots/nickel')
    event.recipes.create.milling(Item.of('kubejs:zinc_dust').withChance(0.5), '#forge:ingots/zinc')

    event.remove({id:/alloyed\.*/})
    event.recipes.create.mixing('2x kubejs:bronze_ingot', ['#forge:ingots/tin','#forge:ingots/copper','#forge:ingots/copper','#forge:ingots/copper']).heated()

    //康铜
    //移除合成康铜粉配方
    event.remove({id:"immersiveengineering:crafting/constantan_mix"})
    //新增加热搅拌配方
    event.recipes.create.mixing('2x #forge:dusts/constantan', ['#forge:dusts/nickel','#forge:dusts/copper']).heated()
    //补充辊压配方
    event.recipes.create.pressing('#forge:plates/constantan', '#forge:ingots/constantan')
    //康铜代替铜
    event.replaceInput(
        { input:"#forge:ingots/copper",mod:"immersiveengineering",not:{output:"#forge:nuggets/copper"} },
        '#forge:ingots/copper',
        '#forge:ingots/constantan'
    )
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

    //黄铜
    event.remove({id:"create:mixing/brass_ingot"})
    let inter = 'kubejs:incomplete_brass_ingot'
    event.recipes.create.sequenced_assembly([
        Item.of('create:brass_ingot').withChance(80.0),
        Item.of('create:zinc_ingot').withChance(10.0),
        Item.of('copper_ingot').withChance(10.0)
    ], 'minecraft:copper_ingot', [
        event.recipes.createFilling(inter, [inter, Fluid.lava(250)]),
        event.recipes.createDeploying(inter, [inter, 'kubejs:zinc_dust']),
        event.recipes.createFilling(inter, [inter, Fluid.water(250)]),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(1)

    //黑曜石支持用石磨处理
    event.recipes.create.milling(Item.of('create:powdered_obsidian').withChance(0.75), '#forge:obsidian')
    //焦煤也是
    event.recipes.create.milling(Item.of('#forge:dusts/coal_coke').withChance(0.75), '#forge:coal_coke').id('coal_coke_dust_manual_only')

    //深板岩
    event.recipes.create.filling('magma_block', [Fluid.of('minecraft:lava',500),'minecraft:cobblestone'])
    event.recipes.create.emptying([Fluid.of('minecraft:lava',250), 'minecraft:cobbled_deepslate'], 'magma_block')

    //木炭压制焦煤（小概率）
    event.recipes.create.compacting([Item.of('#forge:coal_coke').withChance(0.1), Fluid.of('immersiveengineering:creosote', 500)], ['createchromaticreturn:carbon_powder','createchromaticreturn:carbon_powder','createchromaticreturn:carbon_powder','createchromaticreturn:carbon_powder']).heated()

    //ban掉水搅拌出锌粒，火药烧烈焰粉
    //sb chromatic return
    event.remove({id:"createchromaticreturn:zinc_recipe"})
    event.remove({id:"createchromaticreturn:gp_to_bp"})
    event.remove({id:"createchromaticreturn:cf_to_rs"})
    event.remove({id:"createchromaticreturn:magma_block_recipe"})
    event.remove({id:"createchromaticreturn:obsidian_recipe"})
    event.remove({id:"createchromaticreturn:magma_drain"})
    event.remove({id:/createchromaticreturn\:.*doubling\.*/})

    //泥土到铜
    event.recipes.create.mixing('2x dirt', ['#forge:sand','#forge:cobblestone',Fluid.of('water',500)])
    event.recipes.create.splashing([Item.of('create:copper_nugget').withChance(0.5)], 'dirt')

    //削弱陶瓦出铜
    event.remove({id:"createchromaticreturn:copper_recipe"})
    event.recipes.create.crushing([Item.of('minecraft:red_sand'),Item.of('create:copper_nugget').withChance(0.25)], '#minecraft:terracotta')

    //燧石出镍
    event.recipes.create.milling(Item.of('#forge:nuggets/nickel').withChance(0.3), 'flint')

    //黏土出锌
    event.recipes.create.milling(Item.of('#forge:nuggets/zinc').withChance(0.5), 'clay_ball')

    //泥巴出铁、铝土
    event.recipes.create.crushing([Item.of('create:crushed_raw_iron').withChance(0.14),Item.of('kubejs:crushed_raw_bauxite').withChance(0.07)], 'packed_mud')

    //深板岩粉碎出铅，银
    event.recipes.create.crushing([Item.of('#forge:nuggets/lead').withChance(0.25), Item.of('#forge:nuggets/silver').withChance(0.25)], 'deepslate')
    event.recipes.create.crushing([Item.of('#forge:nuggets/lead').withChance(0.25), Item.of('#forge:nuggets/silver').withChance(0.25)], 'cobbled_deepslate')

    //黑石粉碎出铀
    event.recipes.create.crushing([Item.of('#forge:nuggets/uranium').withChance(0.15)], 'blackstone')

    //红石量产
    event.recipes.create.filling('redstone_block', [Fluid.of('immersiveengineering:redstone_acid',1000),'botania:livingrock'])


    //霜火双层板
    event.recipes.create.compacting('kubejs:frostfire_double_plate', ['#forge:plates/froststeel','#forge:slimeballs','#forge:plates/horizonite'])

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

    //虚空钢
    event.remove({id:"createutilities:mixing/void_steel_ingot"})
    event.recipes.create.mixing(Item.of('#forge:ingots/voidsteel').withChance(0.75), ['#forge:ingots/steel','#endersdelight:enderman_loot', '#endersdelight:enderman_loot', 'echo_shard']).heated()

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
        "netherite",
        "industrial_iron",
        "forgotten_metal"
    ]
    MissingPressingRecipeMetals.forEach(material => {
        IEMetalPressing(material)
    });

})
