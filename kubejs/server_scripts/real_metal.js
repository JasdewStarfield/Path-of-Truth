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
  
  event.replaceOutput(
    { output: 'create:crushed_raw_aluminum' }, // Arg 1: the filter
    'create:crushed_raw_aluminum',            // Arg 2: the item to replace
    'kubejs:crushed_raw_bauxite'
  )
  event.remove([{ type: 'immersiveengineering:crusher', output: '#forge:dusts/aluminum' }])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":3000,
    "input":{"tag":"forge:ingots/aluminum"},
    "result":{"base_ingredient":{"tag":"forge:dusts/aluminum"},"count":1},
    "secondaries":[]
  })
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_aluminum"},
    "result":{"base_ingredient":{"tag":"forge:dusts/aluminum"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/aluminum"}}]
  })
  event.recipes.create.mixing([Item.of('mud'),Fluid.of('immersiveengineering:redstone_acid',50),Item.of('create:crushed_raw_aluminum').withChance(0.1)], [Fluid.of('minecraft:water',1000),'kubejs:crushed_raw_bauxite']).heated()

  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_aluminum'}])
  event.remove([{ type: 'minecraft:smelting', output: '#forge:ingots/aluminum' }, { type: 'minecraft:blasting', output: '#forge:ingots/aluminum' }])
  event.remove([{id:'immersiveengineering:crusher/ingot_aluminum'}])
  event.remove([{id:'immersiveengineering:crusher/raw_ore_aluminum'}])
  event.remove([{id:'immersiveengineering:arcfurnace/ore_aluminum'}])
  event.remove([{id:'immersiveengineering:arcfurnace/raw_ore_aluminum'}])
  event.remove([{id:'immersiveengineering:arcfurnace/raw_block_aluminum'}])
  event.remove([{id:'minecraft:kjs_immersiveengineering_ingot_aluminum'}])
    

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
    "result":{"base_ingredient":{"tag":"forge:dusts/iron"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/iron"}}]
  })
  event.replaceOutput(
    { id: 'create:splashing/gravel' }, // Arg 1: the filter
    '#forge:nuggets/iron',            // Arg 2: the item to replace
    '#forge:nuggets/tin'
  )
  event.replaceOutput(
    { id: 'farmersdelight:cutting/saddle' }, // Arg 1: the filter
    '#forge:nuggets/iron',            // Arg 2: the item to replace
    '#forge:nuggets/copper'
  )

  //铜
  event.remove([{id:'create:splashing/crushed_raw_copper'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_copper"},
    "result":{"base_ingredient":{"tag":"forge:dusts/copper"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/copper"}}]
  })

  
  //金
  event.remove([{id:'create:splashing/crushed_raw_gold'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_gold"},
    "result":{"base_ingredient":{"tag":"forge:dusts/gold"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/gold"}}]
  })

  //锌
  event.remove([{id:'create:splashing/crushed_raw_zinc'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_zinc"},
    "result":{"base_ingredient":{"tag":"forge:dusts/zinc"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/zinc"}}]
  })

  //银
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_silver'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_silver"},
    "result":{"base_ingredient":{"tag":"forge:dusts/silver"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/silver"}}]
  })

  //铅
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_lead'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_lead"},
    "result":{"base_ingredient":{"tag":"forge:dusts/lead"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/lead"}}]
  })

  //铀
  event.remove([{id:'immersiveengineering:mineral/uraninite'}])
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_uranium'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_uranium"},
    "result":{"base_ingredient":{"tag":"forge:dusts/uranium"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/uranium"}}]
  })

  //镍
  event.remove([{id:'create:splashing/immersiveengineering/crushed_raw_nickel'}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_nickel"},
    "result":{"base_ingredient":{"tag":"forge:dusts/nickel"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/nickel"}}]
  })

  //锡
  event.remove([{input:"create:crushed_raw_tin", type:"create:splashing"}])
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"item":"create:crushed_raw_tin"},
    "result":{"base_ingredient":{"tag":"forge:dusts/tin"},"count":2},
    "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/tin"}}]
  })

  //蔚蓝浩空适配
  event.remove([{mod:"create_blue_skies_compat", type:"create:splashing"}])
  let blueSkiesIngot = (material) => {
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":3000,
      "input":{"tag":"blue_skies:ingots/"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":1},
      "secondaries":[]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"item":"create_blue_skies_compat:crushed_"+material+"_ore"},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":2},
      "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/"+material}}]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"tag":"blue_skies:raw_materials/"+material},
      "result":{"tag":"forge:dusts/"+material},
      "secondaries":[{"chance":0.33333334,"output":{"tag":"forge:dusts/"+material}}]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":54000,
      "input":{"tag":"blue_skies:storage_blocks/raw_"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":12},
      "secondaries":[]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"tag":"blue_skies:ores/"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":2},
      "secondaries":[]
    })
    event.smelting("#blue_skies:ingots/"+material, "#forge:dusts/"+material)
  }
  let blueSkiesGem = (material) => {
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":3000,
      "input":{"tag":"blue_skies:gems/"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":1},
      "secondaries":[]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"item":"create_blue_skies_compat:crushed_"+material+"_ore"},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":2},
      "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/"+material}}]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"tag":"blue_skies:raw_materials/"+material},
      "result":{"tag":"forge:dusts/"+material},
      "secondaries":[{"chance":0.33333334,"output":{"tag":"forge:dusts/"+material}}]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":54000,
      "input":{"tag":"blue_skies:storage_blocks/raw_"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":12},
      "secondaries":[]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"tag":"blue_skies:ores/"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":2},
      "secondaries":[]
    })
    event.smelting("#blue_skies:gems/"+material, "#forge:dusts/"+material)
  }
  //镰鼬铁
  blueSkiesIngot("ventium")
  //炙铁
  blueSkiesIngot("horizonite")
  //缪铁
  blueSkiesIngot("falsite")
  //绛紫晶
  blueSkiesGem("charoite")
  //水蓝石
  blueSkiesGem("aquite")

  //深暗之园适配
  event.recipes.create.pressing('#forge:plates/forgotten_metal', '#forge:ingots/forgotten_metal')
  let Undergarden = (material) => {
    //碎矿相关
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":3000,
      "input":{"tag":"forge:ingots/"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":1},
      "secondaries":[]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"item":"kubejs:crushed_"+material+"_ore"},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":2},
      "secondaries":[{"chance":0.5,"output":{"tag":"forge:dusts/"+material}}]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"tag":"forge:raw_materials/"+material},
      "result":{"tag":"forge:dusts/"+material},
      "secondaries":[{"chance":0.33333334,"output":{"tag":"forge:dusts/"+material}}]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":54000,
      "input":{"tag":"forge:storage_blocks/raw_"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":12},
      "secondaries":[]
    })
    event.custom({
      "type":"immersiveengineering:crusher",
      "energy":6000,
      "input":{"tag":"forge:ores/"+material},
      "result":{"base_ingredient":{"tag":"forge:dusts/"+material},"count":2},
      "secondaries":[]
    })
    event.smelting("#forge:ingots/"+material, "#forge:dusts/"+material)
    event.smelting("#forge:ingots/"+material, "kubejs:crushed_"+material+"_ore")
    event.recipes.create.pressing('#forge:plates/'+material, '#forge:ingots/'+material)
    event.recipes.create.crushing(["kubejs:crushed_"+material+"_ore",Item.of("create:experience_nugget").withChance(0.75)], '#forge:raw_materials/'+material)
    event.recipes.create.crushing(["9x kubejs:crushed_"+material+"_ore",Item.of("create:experience_nugget", 9).withChance(0.75)], '#forge:storage_blocks/raw_'+material)
    event.recipes.create.crushing(["kubejs:crushed_"+material+"_ore",Item.of("kubejs:crushed_"+material+"_ore").withChance(0.75),Item.of("create:experience_nugget").withChance(0.75)], '#forge:ores/'+material)
  }
  //霜钢
  Undergarden("froststeel")
  //扼塞锭
  Undergarden("cloggrum")
  //御腐水晶
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"tag":"forge:ores/utherium"},
    "result":{"base_ingredient":{"tag":"forge:ingots/utherium"},"count":2},
    "secondaries":[]
  })
  event.recipes.create.crushing(["#forge:ingots/utherium",Item.of("#forge:ingots/utherium").withChance(0.75),Item.of("create:experience_nugget").withChance(0.75)], '#forge:ores/utherium')
  //贵豪水晶
  event.custom({
    "type":"immersiveengineering:crusher",
    "energy":6000,
    "input":{"tag":"forge:ores/regalium"},
    "result":{"base_ingredient":{"tag":"forge:ingots/regalium"},"count":2},
    "secondaries":[]
  })
  event.recipes.create.crushing(["#forge:ingots/regalium",Item.of("#forge:ingots/regalium").withChance(0.75),Item.of("create:experience_nugget").withChance(0.75)], '#forge:ores/regalium')
})