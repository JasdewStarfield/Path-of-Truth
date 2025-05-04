ServerEvents.recipes(event => {
    event.remove({id:'minecraft:bread'})

    //移除敲板子和粉末等离谱配方
    event.remove({id:/immersiveengineering\:crafting\/stick_.*/,not:{output:'immersiveengineering:stick_treated'}})
    event.remove({id:/immersiveengineering\:crafting\/plate_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/raw_hammercrushing_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/hammercrushing_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/wire_\.*/})
    event.remove({id:"createnuclear:mixing/steel"})

    //按分类移除
    event.remove({type:'immersiveengineering:alloy'})
    event.remove({type:'immersiveengineering:sawmill'})

    //移除ie初级动能发电配方
    event.remove({id:'immersiveengineering:crafting/windmill_blade'})
    event.remove({id:'immersiveengineering:crafting/windmill_sail'})
    event.remove({id:'immersiveengineering:crafting/watermill'})
    event.remove({id:'immersiveengineering:crafting/dynamo'})

    //移除铝粒套回收配方
    event.remove({output:"#forge:nuggets/aluminum", type:"blasting"})
    event.remove({output:"#forge:nuggets/aluminum", type:"smelting"})

    //移除铁粒回收配方
    event.remove({output:"#forge:nuggets/iron", type:"blasting"})
    event.remove({output:"#forge:nuggets/iron", type:"smelting"})

    //传送带
    event.remove({id:"immersiveengineering:crafting/conveyor_basic"})
    event.shaped(Item.of('immersiveengineering:conveyor_basic', 6), [ 
        'DDD',
        'AAA',
        'CBC'  
    ], {
        A: 'create:belt_connector',
        B: 'create:electron_tube',
        C: '#forge:ingots/steel',
        D: '#forge:leather'
    })

    //锯条
    event.remove({id:"immersiveengineering:crafting/sawblade"})
    event.shaped('immersiveengineering:sawblade', [ 
        ' A ', 
        'ABA',
        ' A '  
    ], {
        A: '#forge:nuggets/steel',
        B: 'kubejs:crude_sawblade'
    })
    event.shaped('kubejs:crude_sawblade', [ 
      'CAC', 
      'ABA',
      'CAC'  
    ], {
      A: '#forge:ingots/iron',
      B: 'create:andesite_alloy_block',
      C: '#forge:plates/iron'
    })

    //焦炉砖
    event.remove({id:"immersiveengineering:crafting/cokebrick"})
    event.shaped('immersiveengineering:cokebrick', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'minecraft:mud_bricks',
        A: 'minecraft:brick',
        C: '#forge:nuggets/zinc'
    })

    //高炉砖
    event.remove({id:"immersiveengineering:crafting/blastbrick"})
    event.shaped('immersiveengineering:blastbrick', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'minecraft:magma_block',
        A: 'minecraft:brick',
        C: '#forge:nuggets/bronze'
    })

    //工程师锤
    event.replaceInput(
        { output:"immersiveengineering:hammer" },
        '#forge:ingots/iron',
        '#forge:ingots/bronze'
    )

    //剪线钳
    event.replaceInput(
      { output:"immersiveengineering:wirecutter" },
      '#forge:ingots/iron',
      '#forge:ingots/steel'
    )

    //装配台
    event.replaceInput(
      { output:"immersiveengineering:workbench" },
      '#forge:ingots/iron',
      'immersiveengineering:component_iron'
    )

    //高炉炼铁
    event.remove({id:/immersiveengineering:blastfurnace\/steel.*/})
    event.remove({id:/immersiveengineering:blastfurnace\/fuel.*/})
    event.custom({
        "type":"immersiveengineering:blast_furnace",
        "input":{"tag":"forge:raw_materials/iron"},
        "result":{"tag":"forge:ingots/iron"},
        "slag":{"tag":"forge:slag"},
        "time":200
    })
    event.custom({
        "type":"immersiveengineering:blast_furnace",
        "input":{"item":"create:crushed_raw_iron"},
        "result":{"tag":"forge:ingots/iron"},
        "slag":{"tag":"forge:slag"},
        "time":200
    })
    event.custom({
        "type":"immersiveengineering:blast_furnace",
        "input":{"tag":"forge:dusts/raw_iron"},
        "result":{"tag":"forge:ingots/iron"},
        "slag":{"tag":"forge:slag"},
        "time":200
    })
    event.custom({
        "type":"immersiveengineering:blast_furnace_fuel",
        "input":{"tag":"forge:dusts/coal_coke"},
        "time":1600
    })

    //流体管道
    event.remove({id:"immersiveengineering:crafting/fluid_pipe"})
    event.replaceInput(
        { input:"immersiveengineering:fluid_pipe" },
        'immersiveengineering:fluid_pipe',
        'create:fluid_pipe'
    )

    //防腐木板
    event.remove({id:"immersiveengineering:crafting/treated_wood_horizontal"})
    event.remove({id:"createaddition:filling/treated_wood_planks"})
    event.custom({
      "type":"create:filling",
      "ingredients":[
        {"item":"botania:livingwood_planks"},
        {"fluid":"immersiveengineering:creosote", "amount":125}
      ],
      "results":[
        {"item":"immersiveengineering:treated_wood_horizontal"},
      ]
	  })

    //玫瑰石英
    event.remove({output:'create:rose_quartz'})
    event.custom({
        "type": "create:filling",
        "ingredients": [
          {
            "item": "minecraft:quartz"
          },
          {
            "amount": 125,
            "fluid": "immersiveengineering:redstone_acid",
          }
        ],
        "results": [
          {
            "item": "create:rose_quartz"
          }
        ]
    })
    event.remove({id:'immersiveengineering:crafting/redstone_acid'})
    event.recipes.vintageimprovements.pressurizing([
      Fluid.of("immersiveengineering:redstone_acid", 250)
    ], [
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Item.of("#forge:dusts/redstone"),
      Fluid.of("minecraft:water", 250),
    ]).heated().secondaryFluidInput(0)

    //BOP的玫瑰石英碎块
    //event.recipes.create.crushing(Item.of('create:rose_quartz').withChance(0.1), 'biomesoplenty:rose_quartz_block')

    //坚固板
    event.remove({id:'create:sequenced_assembly/sturdy_sheet'})
    let inter = 'create:unprocessed_obsidian_sheet'
    event.recipes.create.sequenced_assembly([
      Item.of('create:sturdy_sheet')
    ], '#forge:plates/lead', [
      event.recipes.createDeploying(inter, [inter, '#forge:dusts/obsidian']),
      event.recipes.vintageimprovements.vibrating(inter, inter),
      event.recipes.createFilling(inter, [inter, Fluid.of("minecraft:lava", 500)]),
      event.recipes.createPressing(inter, inter),
      event.recipes.createPressing(inter, inter),
    ]).transitionalItem(inter).loops(1)

    event.remove({id:'createdieselgenerators:mixing/biodiesel'}) 
    event.remove({id:'createdieselgenerators:compacting/plant_oil'}) 
    //生物质初发酵
    event.remove({type:'create:mixing',output:'createaddition:biomass'})
    event.remove({type:'createdieselgenerators:basin_fermenting'})
    event.remove({output:'createdieselgenerators:basin_lid'}) 
    event.shaped(
      Item.of('createdieselgenerators:basin_lid', 1),
      [ 
        'BCB', 
        'AAA'
      ],
      {
        A: 'create:andesite_alloy',
        B: '#forge:rods/steel',
        C: 'immersiveengineering:light_engineering'
      }
    )
    event.custom({
      "type": "createdieselgenerators:basin_fermenting",
      "ingredients": [
        {
          "fluid": "create:honey",
          "amount": 50
        },
        {
          "tag": "forge:fermentable"
        },
        {
          "tag": "forge:fermentable"
        }
      ],
      "heatRequirement": "none",
      "processingTime": 200,
      "results": [
        {
          "item": "createaddition:biomass"
        }
      ]
    })
    event.custom({
      "type": "createdieselgenerators:basin_fermenting",
      "ingredients": [
        {
          "fluid": "minecraft:water",
          "amount": 200
        },
        {
          "tag": "forge:fermentable"
        },
        {
          "tag": "forge:fermentable"
        },
        {
          "tag": "forge:fermentable"
        },
        {
          "tag": "forge:fermentable"
        }
      ],
      "heatRequirement": "none",
      "processingTime": 400,
      "results": [
        {
          "item": "createaddition:biomass"
        }
      ]
    })

    //二次发酵
    event.remove({id:'createaddition:compacting/biomass_pellet'})
    event.remove({type:'immersiveengineering:fermenter'})
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":3200,"input":{"item":"createaddition:biomass"},
      "result":{"count":6,"item":"createaddition:biomass_pellet"},
      "secondaries":[{"chance":0.5,"output":{"count":3,"item":"createaddition:biomass_pellet"}}]
    })
    event.custom({
      "type":"immersiveengineering:fermenter",
      "energy":3200,
      "fluid":{"amount":20,"fluid":"immersiveengineering:ethanol"},
      "input":{"item":"createaddition:biomass_pellet"}
    })


    //继电器接线器材料
    event.replaceInput(
      { output:/immersiveengineering:connector.*/ },
      '#immersiveengineering:connector_insulator',
      'botania:glimmering_stripped_dreamwood'
    )

    //各级电池
    event.remove({id:"immersiveengineering:crafting/capacitor_lv"})
    event.remove({id:"immersiveengineering:crafting/capacitor_mv"})
    event.remove({id:"immersiveengineering:crafting/capacitor_hv"})
    event.remove({output:"createaddition:modular_accumulator"})

    event.shaped(
      Item.of('immersiveengineering:capacitor_lv', 1),
      [ 
        'ABA',
        'CCC', 
        'ABA'
      ],
      {
        A: '#forge:plates/steel',
        B: '#forge:treated_wood',
        C: 'kubejs:battery_component'
      }
    )
    event.shaped(
      Item.of('immersiveengineering:capacitor_mv', 1),
      [ 
        'ADA',
        'CBC', 
        'AEA'
      ],
      {
        A: '#forge:plates/steel',
        B: 'immersiveengineering:capacitor_lv',
        C: 'kubejs:battery_component',
        D: '#forge:plates/electrum',
        E: '#forge:plates/constantan'
      }
    )
    event.shaped(
      Item.of('immersiveengineering:capacitor_hv', 1),
      [ 
        'ADA',
        'CBC', 
        'AEA'
      ],
      {
        A: '#forge:plates/steel',
        B: 'immersiveengineering:capacitor_mv',
        C: 'kubejs:battery_component',
        D: '#forge:plates/aluminum',
        E: '#forge:plates/hop_graphite'
      }
    )
    event.shapeless(
      Item.of('createaddition:modular_accumulator', 1),
      [ 
        'immersiveengineering:capacitor_hv'
      ]
    )
    event.shapeless(
      Item.of('immersiveengineering:capacitor_hv', 1),
      [ 
        'createaddition:modular_accumulator'
      ]
    )


    //零件（配方用data写了）
    event.remove({id:"immersiveengineering:crafting/component_steel"})
    event.remove({id:"immersiveengineering:crafting/component_iron"})

    //烈焰蛋糕
    event.remove({ id: 'sob:sob/crafting/cinder_dough' })
    event.remove({ id: 'sob:sob/splashing/cinder_flour' })
    event.remove({ id: 'sob:sob/mixing/cinder_dough_by_mixing' })
    event.remove({ id: 'create:compacting/blaze_cake' })
    event.remove({ id: 'create:filling/blaze_cake' })
    event.recipes.create.mixing('sob:cinder_dough', [Fluid.of('minecraft:lava',500),'create:cinder_flour','irons_spellbooks:cinder_essence','#forge:dusts/horizonite']).heated()
    event.recipes.vintageimprovements.curving('create:blaze_cake_base', ['sob:cinder_dough','sob:cinder_dough','sob:cinder_dough']).mode(1)
    event.recipes.create.filling('create:blaze_cake',[{fluidTag: 'forge:biodiesel', amount:500},'create:blaze_cake_base'])
    event.recipes.create.filling('create:blaze_cake',[{fluidTag: 'forge:diesel', amount:250},'create:blaze_cake_base'])

    //锌铝合金
    event.recipes.vintageimprovements.pressurizing([
      'kubejs:wind_elemental_core',
      Fluid.of('kubejs:molten_za',100)
    ], [
      Fluid.of('minecraft:lava',200),
      'kubejs:wind_elemental_core',
      '#forge:ingots/zinc',
      '#forge:ingots/zinc',
      '#forge:ingots/zinc',
      '#forge:ingots/zinc',
      '#forge:ingots/aluminum',
      '#forge:ingots/aluminum',
    ]).superheated().secondaryFluidInput(0)
    event.custom({
      "type":"immersiveengineering:bottling_machine",
      "fluid":{"amount":100,"tag":"forge:molten_za"},
      "inputs":[
        {"item":"kubejs:mold_ingot"}
      ],
      "results":[
        {"item":"kubejs:mold_ingot"},
        {"item":"kubejs:za_ingot"}
      ]
    })

    //工程混凝土ban掉合成配方
    event.remove({ id: 'immersiveengineering:crafting/concrete' })

    //钢铁构件
    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:steel_mechanism').withChance(90.0),
      Item.of('createdieselgenerators:engine_turbocharger').withChance(2.0),
      Item.of('createdieselgenerators:engine_piston').withChance(2.5),
      Item.of('immersiveengineering:plate_steel').withChance(3.0),
      Item.of('create:precision_mechanism').withChance(2.5)
      ], '#forge:plates/steel', [
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'createdieselgenerators:engine_piston']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', '#forge:dusts/aquite']),
      event.recipes.vintageimprovements.vibrating('kubejs:unfinished_steel_mechanism', 'kubejs:unfinished_steel_mechanism'),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'createdieselgenerators:engine_turbocharger'])
    ]).transitionalItem('kubejs:unfinished_steel_mechanism').loops(4).id('kubejs:steel_mechanism_1')

    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:steel_mechanism')
      ], '#forge:plates/steel', [
      event.recipes.createFilling('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', {fluidTag: 'forge:lubricant', amount:25}]),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'createdieselgenerators:engine_piston']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', '#forge:dusts/aquite']),
      event.recipes.vintageimprovements.vibrating('kubejs:unfinished_steel_mechanism', 'kubejs:unfinished_steel_mechanism'),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'createdieselgenerators:engine_turbocharger']),
    ]).transitionalItem('kubejs:unfinished_steel_mechanism').loops(4).id('kubejs:steel_mechanism_2')

    //遗忆构件
    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:forgotten_mechanism').withChance(90.0),
      Item.of('immersiveengineering:component_electronic').withChance(2.0),
      Item.of('blue_skies:diopside_gem').withChance(2.5),
      Item.of('create:precision_mechanism').withChance(2.5),
      Item.of('kubejs:forgotten_plate').withChance(3.0)
      ], '#forge:plates/forgotten_metal', [
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'scguns:charged_amethyst_shard']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'blue_skies:diopside_gem']),
      event.recipes.vintageimprovements.polishing('kubejs:incomplete_forgotten_mechanism', 'kubejs:incomplete_forgotten_mechanism').speedLimits(3),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'immersiveengineering:component_electronic'])
    ]).transitionalItem('kubejs:incomplete_forgotten_mechanism').loops(4).id('kubejs:forgotten_mechanism_1')

    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:forgotten_mechanism')
      ], '#forge:plates/forgotten_metal', [
      event.recipes.createFilling('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', {fluidTag: 'forge:lubricant', amount:25}]),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'scguns:charged_amethyst_shard']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'blue_skies:diopside_gem']),
      event.recipes.vintageimprovements.polishing('kubejs:incomplete_forgotten_mechanism', 'kubejs:incomplete_forgotten_mechanism').speedLimits(3),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'immersiveengineering:component_electronic'])
    ]).transitionalItem('kubejs:incomplete_forgotten_mechanism').loops(4).id('kubejs:forgotten_mechanism_2')

    //工程块
    event.remove({id:"immersiveengineering:crafting/light_engineering"})
    event.remove({id:"immersiveengineering:crafting/heavy_engineering"})
    event.remove({id:"immersiveengineering:crafting/rs_engineering"})

    event.shaped('immersiveengineering:light_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'kubejs:steel_casing',
        A: '#forge:plates/ventium',
        D: 'kubejs:battery_component',
        C: 'kubejs:leyden_jar'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:light_engineering'
        ], 'kubejs:steel_casing', [
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/ventium']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'kubejs:battery_component']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'kubejs:leyden_jar']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/ventium'])
    ]).transitionalItem('kubejs:incomplete_light_engineering').loops(1)

    event.shaped('immersiveengineering:heavy_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'kubejs:factory_casing',
        A: '#forge:plates/cloggrum',
        D: 'kubejs:forgotten_mechanism',
        C: 'kubejs:steel_mechanism'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:heavy_engineering'
        ], 'kubejs:factory_casing', [
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/cloggrum']),
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_heavy_engineering', 'kubejs:forgotten_mechanism']),
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_heavy_engineering', 'kubejs:steel_mechanism']),
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/cloggrum'])
    ]).transitionalItem('kubejs:incomplete_heavy_engineering').loops(1)

    event.shaped('immersiveengineering:rs_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'createutilities:void_casing',
        A: '#forge:plates/zinc',
        D: 'minecraft:ender_eye',
        C: 'createutilities:graviton_tube'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:rs_engineering'
        ], 'createutilities:void_casing', [
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/zinc']),
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_rs_engineering', 'minecraft:ender_eye']),
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_rs_engineering', 'createutilities:graviton_tube']),
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/zinc'])
    ]).transitionalItem('kubejs:incomplete_rs_engineering').loops(1)

    //塑料
    event.remove({id:"immersiveengineering:bottling/duroplast_plate"})
    event.custom({
        "type":"immersiveengineering:refinery",
        "catalyst":{"item":"kubejs:frostfire_double_plate"},
        "energy":120,
        "input0":{
          "amount": 8,
          "tag":"forge:lpg"
        },
        "input1":{
          "tag": "forge:phenolic_resin",
          "amount": 8
        },
        "result":{
          "amount": 8,
          "fluid":"kubejs:liquid_plastic"
        }
    })
    event.custom({
      "type":"immersiveengineering:bottling_machine",
      "fluid":{"amount":1000,"tag":"forge:liquid_plastic"},
      "inputs":[
        {"item":"immersiveengineering:mold_plate"}
      ],
      "results":[
        {"item":"immersiveengineering:mold_plate"},
        {"item":"immersiveengineering:plate_duroplast"}
      ]
    })

    //高级电子元件
    event.remove({id:"immersiveengineering:blueprint/component_electronic_adv"})
    event.recipes.create.sequenced_assembly([
        Item.of('immersiveengineering:component_electronic_adv').withChance(90.0),
        Item.of('#forge:silicon').withChance(1.2),
        Item.of('#forge:wires/netherite').withChance(1.2),
        Item.of('immersiveengineering:component_electronic').withChance(2.6),
        Item.of('kubejs:electronic_circuit_board').withChance(5.0)
        ], 'kubejs:electronic_circuit_board', [
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:silicon']),
        event.recipes.vintageimprovements.laser_cutting('kubejs:incomplete_component_electronic_adv', 'kubejs:incomplete_component_electronic_adv'),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'immersiveengineering:component_electronic']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:wires/netherite']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'botania:gaia_ingot'])
    ]).transitionalItem('kubejs:incomplete_component_electronic_adv').loops(5)

    event.recipes.create.sequenced_assembly([
      Item.of('immersiveengineering:component_electronic_adv')
      ], 'kubejs:electronic_circuit_board', [
      event.recipes.createFilling('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', {fluidTag: 'forge:lubricant', amount:25}]),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:silicon']),
      event.recipes.vintageimprovements.laser_cutting('kubejs:incomplete_component_electronic_adv', 'kubejs:incomplete_component_electronic_adv'),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'immersiveengineering:component_electronic']),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:wires/netherite']),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'botania:gaia_ingot'])
    ]).transitionalItem('kubejs:incomplete_component_electronic_adv').loops(5)

    //散热器模块
    event.remove({id:"immersiveengineering:crafting/radiator"})
    event.recipes.create.sequenced_assembly([
      'immersiveengineering:radiator'
      ], '#forge:sheetmetals/steel', [
        event.recipes.createFilling('kubejs:incomplete_radiator', ['kubejs:incomplete_radiator', Fluid.of('immersiveengineering:biodiesel', 250)]),
        event.recipes.createDeploying('kubejs:incomplete_radiator', ['kubejs:incomplete_radiator', 'kubejs:frostfire_double_plate']),
        event.recipes.createPressing('kubejs:incomplete_radiator', 'kubejs:incomplete_radiator')
      ]
    ).transitionalItem('kubejs:incomplete_radiator').loops(1)
    event.recipes.create.sequenced_assembly([
      'immersiveengineering:radiator'
      ], '#forge:sheetmetals/steel', [
        event.recipes.createFilling('kubejs:incomplete_radiator', ['kubejs:incomplete_radiator', Fluid.of('createdieselgenerators:diesel', 125)]),
        event.recipes.createDeploying('kubejs:incomplete_radiator', ['kubejs:incomplete_radiator', 'kubejs:frostfire_double_plate']),
        event.recipes.createPressing('kubejs:incomplete_radiator', 'kubejs:incomplete_radiator')
      ]
    ).transitionalItem('kubejs:incomplete_radiator').loops(1)

    //电子工程块
    event.shaped('kubejs:electronic_engineering', [ 
        'CAD', 
        'ABA',
        'DAC'  
    ], {
        B: 'createnuclear:reactor_casing',
        A: 'goety:dark_ingot',
        C: 'immersiveengineering:component_electronic_adv',
        D: 'kubejs:fission_cell'
    })
    event.recipes.create.sequenced_assembly([
        'kubejs:electronic_engineering'
        ], 'createnuclear:reactor_casing', [
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'goety:dark_ingot']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'immersiveengineering:component_electronic_adv']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'kubejs:fission_cell']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'goety:dark_ingot'])
    ]).transitionalItem('kubejs:incomplete_electronic_engineering').loops(1)
})