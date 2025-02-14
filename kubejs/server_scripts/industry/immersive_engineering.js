ServerEvents.recipes(event => {
    event.remove({id:'minecraft:bread'})

    //移除敲板子和粉末等离谱配方
    event.remove({id:/immersiveengineering\:crafting\/stick_.*/,not:{output:'immersiveengineering:stick_treated'}})
    event.remove({id:/immersiveengineering\:crafting\/plate_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/raw_hammercrushing_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/hammercrushing_\.*/})

    //机械动力适配IE的敲板子
    let plates = (material) => {
        event.recipes.create.pressing('#forge:plates/'+material, '#forge:ingots/'+material)
    }

    const IEMetals=[
        "aluminum",
        "electrum",
        "uranium",
        "nickel",
        "silver",
        "lead"
    ]

    IEMetals.forEach((id) => plates(id))

    //按分类移除
    event.remove({type:'immersiveengineering:alloy'})
    event.remove({type:'immersiveengineering:sawmill'})

    //移除ie初级动能发电配方
    event.remove({id:'immersiveengineering:crafting/windmill_blade'})
    event.remove({id:'immersiveengineering:crafting/windmill_sail'})
    event.remove({id:'immersiveengineering:crafting/watermill'})
    event.remove({id:'immersiveengineering:crafting/dynamo'})

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
        B: 'minecraft:calcite',
        A: 'minecraft:brick',
        C: 'minecraft:clay_ball'
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
      '#forge:ingots/steel'
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
        "input":{"tag":"forge:dusts/iron"},
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
            "amount": 1000,
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
    event.custom({
        "type": "create:mixing",
        "ingredients": [
          {
            "tag": "forge:dusts/redstone"
          },
          {
            "amount": 125,
            "fluid": "minecraft:water",
          }
        ],
        "results": [
          {
            "amount": 125,
            "fluid": "immersiveengineering:redstone_acid"
          }
        ]
    })
    //BOP的玫瑰石英碎块
    event.recipes.create.crushing(Item.of('create:rose_quartz').withChance(0.1), 'biomesoplenty:rose_quartz_block')

    //坚固板
    event.remove({id:'create:sequenced_assembly/sturdy_sheet'})
    let inter = 'create:unprocessed_obsidian_sheet'
    event.recipes.create.sequenced_assembly([
      Item.of('create:sturdy_sheet')
    ], '#forge:plates/lead', [
      event.recipes.createDeploying(inter, [inter, '#forge:dusts/obsidian']),
      event.recipes.createFilling(inter, [inter, Fluid.of("minecraft:lava", 500)]),
      event.recipes.createPressing(inter, inter),
      event.recipes.createPressing(inter, inter),
    ]).transitionalItem(inter).loops(1)

    //继电器接线器材料
    event.replaceInput(
      { output:/immersiveengineering:connector.*/ },
      '#immersiveengineering:connector_insulator',
      'botania:glimmering_stripped_dreamwood'
    )

    //零件
    event.remove({id:"immersiveengineering:crafting/component_steel"})
    event.remove({id:"immersiveengineering:crafting/component_iron"})
    event.shaped('immersiveengineering:component_steel', [ 
        'A A', 
        ' B ',
        'A A'  
    ], {
        B: '#blue_skies:nuggets/falsite',
        A: '#forge:plates/steel'
    })
    event.shaped('immersiveengineering:component_iron', [ 
        'A A', 
        ' B ',
        'A A'  
    ], {
        B: '#blue_skies:gems/pyrope',
        A: '#forge:ingots/cast_iron'
    })

    //钢铁构件

    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:steel_mechanism').withChance(90.0),
      Item.of('#forge:rods/steel').withChance(2.0),
      Item.of('#forge:ingots/aluminum').withChance(2.5),
      Item.of('#forge:plates/steel').withChance(3.0),
      Item.of('create:precision_mechanism').withChance(2.5)
      ], '#forge:plates/steel', [
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'createdieselgenerators:engine_turbocharger']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', '#forge:dusts/aquite'])
    ]).transitionalItem('kubejs:unfinished_steel_mechanism').loops(4)

    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:steel_mechanism')
      ], '#forge:plates/steel', [
      event.recipes.createFilling('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', {fluidTag: 'forge:lubricant', amount:25}]),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', 'createdieselgenerators:engine_turbocharger']),
      event.recipes.createDeploying('kubejs:unfinished_steel_mechanism', ['kubejs:unfinished_steel_mechanism', '#forge:dusts/aquite'])
    ]).transitionalItem('kubejs:unfinished_steel_mechanism').loops(4)

    //遗忆构件
    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:forgotten_mechanism').withChance(90.0),
      Item.of('immersiveengineering:component_electronic').withChance(2.0),
      Item.of('blue_skies:diopside_gem').withChance(2.5),
      Item.of('create:precision_mechanism').withChance(2.5),
      Item.of('kubejs:forgotten_plate').withChance(3.0)
      ], '#forge:plates/forgotten_metal', [
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'blue_skies:diopside_gem']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'immersiveengineering:component_electronic'])
    ]).transitionalItem('kubejs:incomplete_forgotten_mechanism').loops(4)

    event.recipes.create.sequenced_assembly([
      Item.of('kubejs:forgotten_mechanism')
      ], '#forge:plates/forgotten_metal', [
      event.recipes.createFilling('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', {fluidTag: 'forge:lubricant', amount:25}]),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'blue_skies:diopside_gem']),
      event.recipes.createDeploying('kubejs:incomplete_forgotten_mechanism', ['kubejs:incomplete_forgotten_mechanism', 'immersiveengineering:component_electronic'])
    ]).transitionalItem('kubejs:incomplete_forgotten_mechanism').loops(4)

    //工程块
    event.remove({id:"immersiveengineering:crafting/light_engineering"})
    event.remove({id:"immersiveengineering:crafting/heavy_engineering"})
    event.remove({id:"immersiveengineering:crafting/rs_engineering"})

    event.shaped('immersiveengineering:light_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'create:andesite_casing',
        A: '#forge:plates/ventium',
        D: 'immersiveengineering:component_steel',
        C: 'immersiveengineering:component_iron'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:light_engineering'
        ], 'create:andesite_casing', [
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/ventium']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'immersiveengineering:component_steel']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'immersiveengineering:component_iron']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/ventium'])
    ]).transitionalItem('kubejs:incomplete_light_engineering').loops(1)

    event.shaped('immersiveengineering:heavy_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'create:andesite_casing',
        A: '#forge:plates/cloggrum',
        D: 'kubejs:forgotten_mechanism',
        C: 'kubejs:steel_mechanism'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:heavy_engineering'
        ], 'create:andesite_casing', [
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
    event.remove({id:"tfmg:compacting/plastic_molding"})

    event.remove({id:"tfmg:mixing/liquid_plastic_from_propylene"})
    event.remove({id:"tfmg:mixing/liquid_plastic_from_ethylene"})
    event.custom({
        "type":"immersiveengineering:refinery",
        "catalyst":{"item":"kubejs:frostfire_double_plate"},
        "energy":120,
        "input0":{
            "amount":16,
            "tag":"forge:lpg"
        },
        "input1":{},
        "result":{
            "amount": 16,
            "fluid":"kubejs:liquid_plastic"
        }
    })
    
    event.custom({
        "type": "create:compacting",
        "ingredients": [
            {
                "fluid": "immersiveengineering:phenolic_resin",
                "amount": 500
            },
            {
                "fluid": "kubejs:liquid_plastic",
                "amount": 500
            }
        ],
        "results": [
          {
            "item": "kubejs:plastic_chunk"
          }
        ]
    })
    event.recipes.create.pressing(Item.of('immersiveengineering:plate_duroplast').withChance(0.5), 'kubejs:plastic_chunk')

    //高级电子元件
    event.remove({id:"immersiveengineering:blueprint/component_electronic_adv"})
    event.recipes.create.sequenced_assembly([
        Item.of('immersiveengineering:component_electronic_adv').withChance(90.0),
        Item.of('#forge:silicon').withChance(1.2),
        Item.of('#bloodmagic:gravels/hellforged').withChance(1.2),
        Item.of('immersiveengineering:component_electronic').withChance(2.6),
        Item.of('immersiveengineering:circuit_board').withChance(5.0)
        ], 'immersiveengineering:circuit_board', [
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:silicon']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'immersiveengineering:component_electronic']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:dusts/hellforged'])
    ]).transitionalItem('kubejs:incomplete_component_electronic_adv').loops(5)

    event.recipes.create.sequenced_assembly([
      Item.of('immersiveengineering:component_electronic_adv')
      ], 'immersiveengineering:circuit_board', [
      event.recipes.createFilling('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', {fluidTag: 'forge:lubricant', amount:25}]),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:silicon']),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'immersiveengineering:component_electronic']),
      event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:dusts/hellforged'])
    ]).transitionalItem('kubejs:incomplete_component_electronic_adv').loops(5)

    //散热器模块
    event.remove({id:"immersiveengineering:crafting/radiator"})
    event.recipes.create.sequenced_assembly([
      'immersiveengineering:radiator'
      ], '#forge:sheetmetals/steel', [
          event.recipes.createDeploying('kubejs:incomplete_radiator', ['kubejs:incomplete_radiator', 'kubejs:frostfire_double_plate']),
          event.recipes.createFilling('kubejs:incomplete_radiator', ['kubejs:incomplete_radiator', Fluid.of('immersiveengineering:biodiesel', 250)]),
          event.recipes.createPressing('kubejs:incomplete_radiator', 'kubejs:incomplete_radiator')
    ]).transitionalItem('kubejs:incomplete_radiator').loops(1)


    //电子工程块
    event.shaped('kubejs:electronic_engineering', [ 
        'CAD', 
        'ABA',
        'DAC'  
    ], {
        B: 'create:brass_casing',
        A: 'kubejs:plastic_chunk',
        C: 'immersiveengineering:component_electronic_adv',
        D: 'immersiveengineering:radiator'
    })
    event.recipes.create.sequenced_assembly([
        'kubejs:electronic_engineering'
        ], 'create:brass_casing', [
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'kubejs:plastic_chunk']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'immersiveengineering:component_electronic_adv']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'immersiveengineering:radiator']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'kubejs:plastic_chunk'])
    ]).transitionalItem('kubejs:incomplete_electronic_engineering').loops(1)
})