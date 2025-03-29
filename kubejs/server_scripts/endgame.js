ServerEvents.recipes(event => {
  //下界合金
  event.remove({ id: 'minecraft:netherite_ingot' })
  event.recipes.vintageimprovements.pressurizing([
    'nether_star',
    Fluid.of('kubejs:molten_netherite',100),
  ], [
    Fluid.of('createdieselgenerators:gasoline',500),
    'nether_star',
    'createnuclear:enriched_yellowcake',
    'createnuclear:enriched_yellowcake',
    'minecraft:netherite_scrap',
    'minecraft:netherite_scrap',
    'minecraft:netherite_scrap',
    'minecraft:netherite_scrap'
  ]).superheated().secondaryFluidInput(0)
  event.custom({
    "type":"immersiveengineering:bottling_machine",
    "fluid":{"amount":100,"tag":"forge:molten_netherite"},
    "inputs":[
      {"item":"kubejs:mold_ingot"}
    ],
    "results":[
      {"item":"kubejs:mold_ingot"},
      {"item":"minecraft:netherite_ingot"}
    ]
  })

  //第五章工业：将Diesel Generators的配方中所有锌锭替换为锌铝合金
  event.replaceInput(
    { mod:"createdieselgenerators" },
    '#forge:ingots/zinc',
    '#forge:ingots/za'
  )
  event.replaceInput(
    { mod:"createdieselgenerators" },
    '#forge:nuggets/zinc',
    '#forge:nuggets/za'
  )
  //铁替换为钢
  event.replaceInput(
    { mod:"createdieselgenerators" },
    '#forge:rods/iron',
    'immersiveengineering:rod_steel'
  )
  event.replaceInput(
    { mod:"createdieselgenerators" },
    '#forge:plates/iron',
    'immersiveengineering:plate_steel'
  )
  event.replaceInput(
    { mod:"createdieselgenerators" },
    '#forge:ingots/iron',
    'immersiveengineering:ingot_steel'
  )
  //时钟替换为重型工程块
  event.replaceInput(
    { mod:"createdieselgenerators" },
    'clock',
    'immersiveengineering:heavy_engineering'
  )

  //分馏
  event.remove({id:"createdieselgenerators:distillation/crude_oil"})
  event.custom({
    "type": "createdieselgenerators:distillation",
    "ingredients": [
      {
        "fluid": "createdieselgenerators:crude_oil",
        "amount": 200
      }
    ],
    "heatRequirement": "heated",
    "processingTime": 200,
    "results": [
      {
        "fluid": "kubejs:heavy_oil",
        "amount": 50
      },
      {
        "fluid": "createdieselgenerators:diesel",
        "amount": 50
      },
      {
        "fluid": "createdieselgenerators:gasoline",
        "amount": 50
      },
      {
        "fluid": "kubejs:lpg",
        "amount": 50
      }
    ]
  })

  //铀处理
  event.remove({ id: 'createnuclear:mixing/uranium_fluid' })
  event.remove({ id: 'createnuclear:compacting/uranium_fluid_to_yellowcake' })
  event.remove({ id: 'createnuclear:crafting/enriched_soul_soil' })
  event.remove({ id: 'createnuclear:mechanical_crafting/uranium_rod' })
  event.custom({
    "type":"immersiveengineering:mixer",
    "energy":12800,
    "fluid":{"amount":500,"tag":"forge:diesel"},
    "inputs":[
      {"base_ingredient":{"tag":"forge:dusts/uranium"},"count":4},
      {"base_ingredient":{"tag":"forge:dusts/hop_graphite"},"count":1},
    ],
    "result":{"amount":500,"fluid":"createnuclear:uranium"}
  })
  event.custom({
    "type": "createdieselgenerators:distillation",
    "ingredients": [
      {
        "fluid": "createnuclear:uranium",
        "amount": 100
      }
    ],
    "heatRequirement": "superheated",
    "processingTime": 400,
    "results": [
      {
        "fluid": "kubejs:molten_enriched_uranium",
        "amount": 10
      },
      {
        "fluid": "minecraft:lava",
        "amount": 90
      }
    ]
  })
  event.recipes.vintageimprovements.centrifugation([
      Item.of("immersiveengineering:nugget_uranium", 4).withChance(0.5),
      Item.of("immersiveengineering:slag").withChance(0.5),
      "createnuclear:yellowcake"
    ],
    Fluid.of('kubejs:molten_enriched_uranium', 50)
  ).minimalRPM(256)
  event.recipes.create.mixing('createnuclear:enriched_soul_soil', ['goety:sonic_boom_focus','goety:dark_metal_block','goety:dark_metal_block','goety:dark_metal_block','goety:dark_metal_block','nethersdelight:rich_soul_soil','nethersdelight:rich_soul_soil','nethersdelight:rich_soul_soil','nethersdelight:rich_soul_soil']).superheated()

  //裂变电池
  event.recipes.create.sequenced_assembly([
      Item.of('kubejs:fission_cell').withChance(90.0),
      Item.of('createnuclear:graphite_rod').withChance(1.2),
      Item.of('createnuclear:uranium_rod').withChance(1.2),
      Item.of('immersiveengineering:radiator').withChance(2.6),
      Item.of('protection_pixel:heatresistantceramicsheet').withChance(5.0)
    ], 'protection_pixel:heatresistantceramicsheet', [
      event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'kubejs:za_sheet']),
      event.recipes.createPressing('kubejs:incomplete_fission_cell', 'kubejs:incomplete_fission_cell'),
      event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:uranium_rod']),
      event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:graphite_rod']),
      event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'immersiveengineering:radiator'])
  ]).transitionalItem('kubejs:incomplete_fission_cell').loops(5)
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:fission_cell')
  ], 'protection_pixel:heatresistantceramicsheet', [
    event.recipes.createFilling('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', {fluidTag: 'forge:lubricant', amount:25}]),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'kubejs:za_sheet']),
    event.recipes.createPressing('kubejs:incomplete_fission_cell', 'kubejs:incomplete_fission_cell'),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:uranium_rod']),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:graphite_rod']),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'immersiveengineering:radiator'])
]).transitionalItem('kubejs:incomplete_fission_cell').loops(5)

  //电路板
  event.remove({id:"vintageimprovements:mechanical_crafting/laser"})
  event.recipes.create.mechanical_crafting('vintageimprovements:laser_item', [
    ' A ',
    'ABA',
    'ACA',
    'ADA',
    'ADA'
  ], {
    A: '#forge:plates/netherite',
    B: 'immersiveengineering:toolupgrade_revolver_electro',
    C: 'scguns:laser_sight',
    D: '#forge:glass'
  })
  event.recipes.vintageimprovements.laser_cutting(Item.of('kubejs:electronic_circuit_board').withChance(0.5), ['#forge:plates/plastic']).energyCost(12800).maxChargeRate(3200)

  /*
  //多彩化合物
  event.remove({ id: 'createchromaticreturn:chromatic_compound_recipe' })
  event.shapeless(
    Item.of('createchromaticreturn:chromatic_compound',1),
    [
      'kubejs:buran',
      'kubejs:midnight'
    ]
  )
    {
        "fluid": "kubejs:heavy_oil",
        "amount": 25
      },
      {
        "fluid": "kubejs:lubricant",
        "amount": 25
      },
      {
        "fluid": "createdieselgenerators:diesel",
        "amount": 50
      },
      {
        "fluid": "createdieselgenerators:gasoline",
        "amount": 50
      },
      {
        "fluid": "kubejs:lpg",
        "amount": 50
      }

  //移除一些原有配方
  event.remove({ id: 'createchromaticreturn:bedrock_shard_crushing' })
  event.remove({ id: 'createchromaticreturn:andesite_component_recipe' })
  event.remove({ id: 'createchromaticreturn:brass_component_recipe' })
  event.remove({ input: 'createchromaticreturn:andesite_component' })
  event.remove({ input: 'createchromaticreturn:brass_component' })

  //黄铜，安山组件配方
  event.recipes.create.crushing(Item.of('create:andesite_alloy'), 'createchromaticreturn:andesite_component')
  event.recipes.create.crushing(Item.of('create:brass_ingot'), 'createchromaticreturn:brass_component')

  //环境枪
  event.shapeless(
    Item.of('create:handheld_worldshaper',1),
    [
      'createchromaticreturn:industrium_charm',
      'createchromaticreturn:shadow_charm',
      'createchromaticreturn:refined_charm',
      'createchromaticreturn:multiplite_charm',
      'createchromaticreturn:silkstrum_charm',
      'createchromaticreturn:antiplite_charm'
    ]
  )

  //工业侧
  event.recipes.create.mixing([Item.of('createchromaticreturn:shadow_steel')], ['createchromaticreturn:chromatic_compound',Fluid.of('create_confectionery:black_chocolate',500),{fluidTag: 'forge:heavy_oil', amount:500}]).superheated()
  event.remove({id:'createchromaticreturn:shadow_essence_recipe'})
  event.custom({
    "type":"immersiveengineering:mixer",
    "energy":12800,
    "fluid":{"amount":1000,"tag":"minecraft:lava"},
    "inputs":[{"item":"createchromaticreturn:shadow_steel"}],
    "result":{"amount":1000,"fluid":"createchromaticreturn:shadow_essence"}
  })

  //终极锭
  event.remove({ id: 'createchromaticreturn:shadow_steel_recipe' })
  event.remove({ id: 'createchromaticreturn:industrium_recipe' })
  event.remove({ id: 'createchromaticreturn:durasteel_recipe' })

  event.remove({id:'createchromaticreturn:refined_radiance_recipe'})
  event.remove({id:'createchromaticreturn:silkstrum_recipe'})
  event.remove({id:'createchromaticreturn:glowing_ingot_recipe'})

  event.remove({ id: 'createchromaticreturn:industrium_book_recipe' })
  event.remove({ id: 'createchromaticreturn:durasteel_book_recipe' })
  event.remove({id:'createchromaticreturn:silkstrum_book_recipe'})

  event.remove({id:'createchromaticreturn:multiplite_recipe'})
  event.remove({id:'createchromaticreturn:antiplite_recipe'})

  event.recipes.create.mixing(['createchromaticreturn:industrium_ingot',Item.of('createchromaticreturn:shadow_steel').withChance(0.75)], [{fluidTag:'forge:shadow_essence', amount:1000},'create:deployer','create:mechanical_arm','immersiveengineering:powerpack']).superheated()
  event.recipes.create.sequenced_assembly([
    Item.of('createchromaticreturn:industrium_book')
    ], '#forge:plates/plastic', [
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'createchromaticreturn:industrium_ingot']),
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', Fluid.of('create_enchantment_industry:hyper_experience',50)]),
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', Fluid.of('create_enchantment_industry:hyper_experience',50)])
  ]).transitionalItem('kubejs:incomplete_industrium_book').loops(2)

  event.recipes.create.compacting(['createchromaticreturn:durasteel_ingot',Item.of('createchromaticreturn:shadow_steel').withChance(0.75)], [{fluidTag:'forge:shadow_essence', amount:1000},'#forge:storage_blocks/steel','#forge:storage_blocks/lead','#forge:storage_blocks/cast_iron','#forge:storage_blocks/netherite']).superheated()
  event.recipes.create.sequenced_assembly([
    Item.of('createchromaticreturn:durasteel_book')
    ], '#forge:plates/obsidian', [
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'createchromaticreturn:durasteel_ingot']),
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', Fluid.of('create_enchantment_industry:hyper_experience',50)]),
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', Fluid.of('create_enchantment_industry:hyper_experience',50)])
  ]).transitionalItem('kubejs:incomplete_durasteel_book').loops(2)

  //魔法侧终极锭修改
  //光辉石
  event.shaped(Item.of('createchromaticreturn:refined_radiance',1),
      [' A ',
       'BCD',
       ' E '],
      {
          A:'irons_spellbooks:lesser_spell_slot_upgrade',
          B:'irons_spellbooks:arcane_ingot',
          C:'createchromaticreturn:chromatic_compound',
          D:'irons_spellbooks:shriving_stone',
          E:'irons_spellbooks:upgrade_orb'
      }
  )
  //删除光辉流体原有配方
  event.remove({id:'createchromaticreturn:refined_mixture_recipe'})
  //添加融化配方
  

  //添加随机生成两种锭的配方，两种液体注册名的版本
  
  //炼成复制火花
  
  //符文祭坛炼制永恒魔力池
  event.recipes.botania.runic_altar('botania:creative_pool',
    [
        'createchromaticreturn:multiplite_ingot',
        'botania:fabulous_pool',
        'botania:mana_bomb',
        'create:creative_fluid_tank'
    ],
    100000
  )

  //符文祭坛炼制丝触书籍
  event.recipes.botania.runic_altar('createchromaticreturn:silkstrum_book',
    [
        'createchromaticreturn:silkstrum', 
        'bosses_of_mass_destruction:void_thorn',
        'bosses_of_mass_destruction:blazing_eye',
        'irons_spellbooks:gold_spell_book',
        'bosses_of_mass_destruction:ancient_anima',
        'bosses_of_mass_destruction:obsidian_heart'
    ],
    100000
  )

  //丝绸书三本复制四本

  */
 

  //终极彩蛋：可睡觉的床
  event.remove({id:'undergarden:depthrock_bed'})
  //符文祭坛
  event.recipes.botania.runic_altar('undergarden:depthrock_bed', 
    [
      'create:handheld_worldshaper',
      'immersiveengineering:coke_oven', 
      'immersiveengineering:blast_furnace',
      'immersiveengineering:advanced_blast_furnace', 
      'immersiveengineering:metal_press',
      'immersiveengineering:crusher', 
      'immersiveengineering:fermenter',
      'immersiveengineering:squeezer', 
      'immersiveengineering:diesel_generator',
      'immersiveengineering:arc_furnace', 
      'immersiveengineering:excavator',
      'immersiveengineering:bucket_wheel'
    ], 
    50000
  )
})
