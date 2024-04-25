ServerEvents.recipes(event => {
    event.remove({id:'minecraft:bread'})

    //移除敲板子和粉末等离谱配方
    event.remove(/immersiveengineering\:crafting\/stick_.*/)
    event.remove({id:/immersiveengineering\:crafting\/plate_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/raw_hammercrushing_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/hammercrushing_\.*/})

    //按分类移除
    event.remove({type:'immersiveengineering:alloy'})

    //移除ie初级动能发电配方
    event.remove({id:'immersiveengineering:crafting/windmill_blade'})
    event.remove({id:'immersiveengineering:crafting/windmill_sail'})
    event.remove({id:'immersiveengineering:crafting/waterwheel_segment'})
    event.remove({id:'immersiveengineering:crafting/dynamo'})

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

    //高炉炼铁
    event.remove({type:"tfmg:coking"})
    event.remove({id:/immersiveengineering:blastfurnace\/steel.*/})
    event.remove({id:/immersiveengineering:blastfurnace\/fuel.*/})
    event.recipes.create.milling(Item.of('#forge:dusts/coal_coke').withChance(0.8), 'tfmg:coal_coke')
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
        'tfmg:steel_pipe'
    )

    //防腐木板
    event.remove({id:"immersiveengineering:crafting/treated_wood_horizontal"})
    event.custom({
		"type":"create:filling",
		"ingredients":[
			{"tag":"minecraft:planks"},
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

    //工程块
    event.remove({id:"immersiveengineering:crafting/light_engineering"})
    event.remove({id:"immersiveengineering:crafting/heavy_engineering"})
    event.remove({id:"immersiveengineering:crafting/rs_engineering"})

    event.shaped('immersiveengineering:light_engineering', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'tfmg:steel_casing',
        A: 'immersiveengineering:component_steel',
        C: 'immersiveengineering:component_iron'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:light_engineering'
        ], 'tfmg:steel_casing', [
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'immersiveengineering:component_steel']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'immersiveengineering:component_iron'])
    ]).transitionalItem('kubejs:incomplete_light_engineering').loops(2)

    event.shaped('immersiveengineering:heavy_engineering', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'tfmg:heavy_machinery_casing',
        A: 'immersiveengineering:component_steel',
        C: 'tfmg:steel_mechanism'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:heavy_engineering'
        ], 'tfmg:heavy_machinery_casing', [
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_heavy_engineering', 'immersiveengineering:component_steel']),
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_heavy_engineering', 'tfmg:steel_mechanism'])
    ]).transitionalItem('kubejs:incomplete_heavy_engineering').loops(2)

    event.shaped('immersiveengineering:rs_engineering', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'tfmg:steel_casing',
        A: '#forge:dusts/redstone',
        C: 'create:electron_tube'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:rs_engineering'
        ], 'tfmg:steel_casing', [
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_rs_engineering', '#forge:dusts/redstone']),
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_rs_engineering', 'create:electron_tube'])
    ]).transitionalItem('kubejs:incomplete_rs_engineering').loops(2)
})