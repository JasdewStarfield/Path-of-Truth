ServerEvents.recipes(event => {
  //高炉
  event.replaceInput(
    { output: 'minecraft:blast_furnace' }, // Arg 1: the filter
    '#forge:ingots/iron',            // Arg 2: the item to replace
    '#forge:storage_blocks/copper'
  )
  event.replaceInput(
      { id: 'immersiveengineering:crafting/blueprint_components' }, // Arg 1: the filter
      '#forge:ingots/aluminum',            // Arg 2: the item to replace
      '#forge:ingots/steel'
  )

  //铝
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_aluminum'}])
  event.custom({"type":"immersiveengineering:arc_furnace","additives":[],"energy":204800,"input":{"item":"create:crushed_raw_aluminum"},"results":[{"tag":"forge:ingots/aluminum"}],"slag":{"tag":"forge:slag"},"time":400})
  event.remove([{ type: 'minecraft:smelting', output: '#forge:ingots/aluminum' }, { type: 'minecraft:blasting', output: '#forge:ingots/aluminum' }])
  event.remove([{id:'immersiveengineering:crusher/ingot_aluminum'}])
  event.remove([{id:'minecraft:kjs_immersiveengineering_ingot_aluminum'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_aluminum"},
    "result":{"base_ingredient":{"tag":"forge:dusts/aluminum"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/aluminum"}}]
  })
    

  //铁
  event.remove([{ type: 'minecraft:blasting', input: '#forge:ingots/iron' }])
  event.remove([{ type: 'minecraft:smelting', output: 'iron_ingot' }, { type: 'minecraft:blasting', output: 'iron_ingot' }, { type: 'immersiveengineering:arc_furnace', output: 'iron_ingot' }])
  event.remove([{ type: 'minecraft:smelting', output: 'iron_block' }, { type: 'minecraft:blasting', output: 'iron_block' }])
  event.remove([{id:'create:splashing/crushed_raw_iron'}])
  event.remove([{id:'immersiveengineering:crusher/ingot_iron'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_iron"},
    "result":{"base_ingredient":{"tag":"forge:dusts/iron"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/iron"}}]
  })

  //铜
  event.remove([{id:'create:splashing/crushed_raw_copper'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_copper"},
    "result":{"base_ingredient":{"tag":"forge:dusts/copper"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/copper"}}]
  })

  
  //金
  event.remove([{id:'create:splashing/crushed_raw_gold'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_gold"},
    "result":{"base_ingredient":{"tag":"forge:dusts/gold"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/gold"}}]
  })

  //锌
  event.remove([{id:'create:splashing/crushed_raw_zinc'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_zinc"},
    "result":{"base_ingredient":{"tag":"forge:dusts/zinc"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/zinc"}}]
  })

  //银
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_silver'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_silver"},
    "result":{"base_ingredient":{"tag":"forge:dusts/silver"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/silver"}}]
  })

  //铅
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_lead'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_lead"},
    "result":{"base_ingredient":{"tag":"forge:dusts/lead"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/lead"}}]
  })

  //铀
  event.remove([{id:'immersiveengineering:mineral/uraninite'}])
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_uranium'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_uranium"},
    "result":{"base_ingredient":{"tag":"forge:dusts/uranium"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/uranium"}}]
  })

  //镍
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_nickel'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_nickel"},
    "result":{"base_ingredient":{"tag":"forge:dusts/nickel"},"count":1},
    "secondaries":[{"chance":0.75,"output":{"tag":"forge:dusts/nickel"}}]
  })
})
