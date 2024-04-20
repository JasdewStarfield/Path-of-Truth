ServerEvents.recipes(event => {
    //移除敲板子和粉末等离谱配方
    event.remove(/immersiveengineering\:crafting\/stick_.*/)
    event.remove({id:/immersiveengineering\:crafting\/plate_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/raw_hammercrushing_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/hammercrushing_\.*/})
    event.remove({id:/immersiveengineering:crafting\/wire_.*/})

    //按分类移除
    event.remove({type:'immersiveengineering:alloysmelter'})

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
})