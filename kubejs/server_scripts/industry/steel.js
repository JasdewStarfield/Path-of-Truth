ServerEvents.recipes(event => {

  event.remove({output:/createaddition\:crafting\/wire_\.*/})
  event.remove({id:"createaddition:compacting/seed_oil"})
  event.remove({id:"createaddition:mixing/bioethanol"})

  const CreateDupeItems = [
    'createaddition:creative_generator',
    'createaddition:connector',
    'createaddition:small_light_connector',
    'createaddition:large_connector',
    'createaddition:redstone_relay',
    'createaddition:spool',
    'createaddition:copper_spool',
    'createaddition:gold_spool',
    'createaddition:electrum_spool',
    'createaddition:festive_spool',
    'createaddition:seed_oil_bucket',
    'createaddition:bioethanol_bucket',
    'createaddition:capacitor',
    'createdieselgenerators:plant_oil_bucket',
    'createdieselgenerators:ethanol_bucket',
    'createdieselgenerators:biodiesel_bucket',
    'createdieselgenerators:chemical_sprayer',
    'createdieselgenerators:chemical_sprayer_lighter',
    'immersiveengineering:charging_station',
    'immersiveengineering:tesla_coil',
    'createutilities:gearcube',
    'createutilities:lshaped_gearbox',
  ]

  CreateDupeItems.forEach(id => {event.remove({output:id})})

  /*
  event.recipes.create.mechanical_crafting('tfmg:casting_spout', [
    ' DDD ',
    'DBBBD',
    'DBABD',
    ' ECE ',
    ' ECE '
  ], {
    A: 'kubejs:precise_engineering',
    B: '#forge:glass',
    C: 'tfmg:cast_iron_pipe',
    D: '#forge:ingots/cast_iron',
    E: '#forge:ingots/elementium'
  })

  event.recipes.create.mechanical_crafting('kubejs:casting_seal', [
    ' DDD ',
    'DBBBD',
    'DBABD',
    'D   D'
  ], {
    A: 'kubejs:precise_engineering',
    B: '#forge:ingots/elementium',
    D: '#forge:ingots/cast_iron'
  })

  event.shaped('kubejs:casting_base', [ 
    'A A', 
    'A A',
    'AAA'  
    ], {
    A: '#forge:ingots/cast_iron'
  })

  event.remove({ id: 'tfmg:crafting/blast_furnace_output' })
  event.recipes.create.mechanical_crafting('tfmg:blast_furnace_output', [
    ' DDD ',
    'DBBBD',
    'DBABD',
    'DBBBD',
    ' ECE '
  ], {
    A: 'kubejs:precise_engineering',
    B: 'tfmg:fireproof_brick',
    C: 'tfmg:cast_iron_pipe',
    D: '#forge:ingots/cast_iron',
    E: '#forge:gems/dragonstone'
  })
  */

  //动力合成器
  event.remove({ output: 'create:mechanical_crafter' })
  event.shaped('6x create:mechanical_crafter', [ 
    ' D ', 
    'ACA',
    ' B '  
    ], {
    B: 'kubejs:precise_engineering',
    D: 'kubejs:andesite_engineering',
    A: 'create:cogwheel',
    C: '#forge:workbench'
  })

  //电弧炉炼铁
  event.custom({
    "type":"immersiveengineering:arc_furnace",
    "additives":[],
    "energy":102400,
    "input":{"tag":"forge:dusts/raw_iron"},
    "results":[{"tag":"forge:ingots/iron"}],
    "slag":{"tag":"forge:slag"},
    "time":100
  })
  

  /*
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:filled_casting_mold_small')
    ], 'kubejs:casting_base', [
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', 'clay_ball']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', Fluid.of('kubejs:molten_steel',100)]),
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', 'kubejs:casting_seal']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', Fluid.of('minecraft:water',1000)])
  ]).transitionalItem('kubejs:incomplete_filled_casting_mold_small').loops(1)
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:filled_casting_mold_large')
    ], 'kubejs:casting_base', [
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', 'clay']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', Fluid.of('kubejs:molten_steel',900)]),
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', 'kubejs:casting_seal']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', Fluid.of('minecraft:water',1000)])
  ]).transitionalItem('kubejs:incomplete_filled_casting_mold_large').loops(1)

  event.recipes.create.compacting(['#forge:ingots/steel','kubejs:casting_seal','kubejs:casting_base',Item.of('clay_ball').withChance(0.95)], 'kubejs:filled_casting_mold_small')
  event.recipes.create.compacting(['#forge:storage_blocks/steel','kubejs:casting_seal','kubejs:casting_base',Item.of('clay').withChance(0.95)], 'kubejs:filled_casting_mold_large')
  */

  //硫酸
  event.remove({ id: "vintageimprovements:pressurizing/sulfur_trioxide" })
  event.recipes.vintageimprovements.centrifugation([Fluid.of('minecraft:lava', 20), '3x vintageimprovements:sulfur_chunk', Item.of('3x vintageimprovements:sulfur_chunk').withChance(0.5), Item.of("#forge:slag").withChance(0.25)], [Fluid.of('immersiveengineering:redstone_acid', 50),'scguns:sheol']).minimalRPM(128)
  event.recipes.vintageimprovements.pressurizing([
    Fluid.of("vintageimprovements:sulfur_trioxide", 250)
  ], [
    Item.of('goety:ectoplasm'),
    Fluid.of('vintageimprovements:sulfur_dioxide', 250)
  ]).heated().secondaryFluidOutput(0)

  //铅酸构件（原名红石构件）
  event.remove({ id: "vintageimprovements:sequenced_assembly/redstone_module" })
  let inter = 'vintageimprovements:incomplete_redstone_module'
  event.recipes.create.sequenced_assembly([
    Item.of('vintageimprovements:redstone_module').withChance(90.0),
    Item.of('#forge:rods/lead').withChance(2.5),
    Item.of('#forge:dusts/redstone').withChance(2.5),
    Item.of('create:sturdy_sheet').withChance(5.0)
  ], 'create:sturdy_sheet', [
    event.recipes.createDeploying(inter, [inter, '#forge:rods/lead']),
    event.recipes.createDeploying(inter, [inter, '#forge:dusts/redstone']),
    event.recipes.vintageimprovements.vibrating(inter, inter),
    event.recipes.createFilling(inter, [inter, Fluid.of("vintageimprovements:sulfuric_acid", 100)]),
  ]).transitionalItem(inter).loops(3)
  event.recipes.create.sequenced_assembly([
    Item.of('vintageimprovements:redstone_module')
  ], 'create:sturdy_sheet', [
    event.recipes.createFilling(inter, [inter, {fluidTag: 'forge:lubricant', amount:25}]),
    event.recipes.createDeploying(inter, [inter, '#forge:rods/lead']),
    event.recipes.createDeploying(inter, [inter, '#forge:dusts/redstone']),
    event.recipes.vintageimprovements.vibrating(inter, inter),
    event.recipes.createFilling(inter, [inter, Fluid.of("vintageimprovements:sulfuric_acid", 100)]),
  ]).transitionalItem(inter).loops(3)

  //电池组件
  

  //融化铁粉
  event.recipes.create.mixing(Fluid.of('kubejs:molten_iron',100), '#forge:dusts/iron').heated()

  //转炉炼钢法
  event.recipes.vintageimprovements.pressurizing([
    Item.of('kubejs:fire_elemental_core'),
    Fluid.of('kubejs:molten_slag', 200)
  ], [
    Item.of("create:limestone"),
    Item.of('kubejs:fire_elemental_core'),
    Fluid.of("kubejs:molten_iron", 200)
  ]).heated()

  //熔融钢、炉渣处理
  event.remove({id:"vintageimprovements:craft/centrifuge"})
  event.recipes.create.mechanical_crafting('vintageimprovements:centrifuge', [
    '  A  ',
    ' BDB ',
    'ADCDA',
    ' BDB ',
    '  A  '
  ], {
    A: 'create:portable_storage_interface',
    B: 'kubejs:basic_spring_set',
    C: 'kubejs:precise_engineering',
    D: '#forge:treated_wood'
  })
  event.recipes.vintageimprovements.centrifugation([Fluid.of('kubejs:molten_steel', 150), "#forge:slag"], Fluid.of('kubejs:molten_slag', 200)).minimalRPM(128)
  event.recipes.create.filling("kubejs:steel_ingot_with_mold", ['kubejs:mold_ingot', Fluid.of("kubejs:molten_steel", 100)])
  event.recipes.create.splashing(["kubejs:unformed_steel_ingot",'kubejs:mold_ingot'], "kubejs:steel_ingot_with_mold")
  event.custom({
    "type":"immersiveengineering:bottling_machine",
    "fluid":{"amount":100,"tag":"forge:molten_steel"},
    "inputs":[
      {"item":"kubejs:mold_ingot"}
    ],
    "results":[
      {"item":"kubejs:mold_ingot"},
      {"item":"kubejs:unformed_steel_ingot"}
    ]
  })
  event.stonecutting('kubejs:mold_ingot', 'scguns:blank_mold')
  
  //锻造钢锭
  event.recipes.create.sequenced_assembly([
    Item.of('immersiveengineering:ingot_steel').withChance(0.90),
    Item.of('kubejs:unformed_steel_ingot').withChance(0.10)
    ], 'kubejs:unformed_steel_ingot', [
      event.recipes.createDeploying('kubejs:incomplete_steel_ingot', ['kubejs:incomplete_steel_ingot', '#forge:nuggets/anthralite']),
      event.recipes.createPressing('kubejs:incomplete_steel_ingot', 'kubejs:incomplete_steel_ingot')
  ]).transitionalItem('kubejs:incomplete_steel_ingot').loops(6)

  //钢板
  event.remove({ id: 'createaddition:pressing/steel_ingot' })
  event.remove({ id: 'vintageimprovements:rolling/steel_ingot' })
  event.remove({ id: 'vintageimprovements:rolling/steel_plate' })
  event.remove({ id: 'vintageimprovements:mechanical_crafting/helve_hammer'})
  event.recipes.create.mechanical_crafting('vintageimprovements:helve_hammer', [
    ' D AA',
    'DBBBC',
    'DD  E'
  ], {
    A: 'kubejs:basic_spring_set',
    B: '#forge:treated_wood',
    C: 'kubejs:precise_engineering',
    D: '#forge:storage_blocks/steel',
    E: 'create:shaft'
  })
  event.recipes.vintageimprovementsHammering(Item.of('#forge:plates/steel'), '#forge:ingots/steel').hammerBlows(3)
  //泰拉钢？！
  event.recipes.vintageimprovementsHammering(Item.of('#forge:plates/terrasteel'), '#forge:ingots/terrasteel').hammerBlows(3)

  //莱顿瓶
  event.recipes.create.mechanical_crafting('kubejs:leyden_jar', [
    'D',
    'B',
    'A',
    'B'
  ], {
    A: 'irons_spellbooks:lightning_bottle',
    B: '#forge:plates/steel',
    D: 'immersiveengineering:component_iron'
  })

  //电容器
  event.recipes.create.deploying('createaddition:capacitor', ['#forge:plates/terrasteel', '#forge:plates/constantan'])
  event.recipes.create.deploying('createaddition:capacitor', ['#forge:plates/constantan', '#forge:plates/terrasteel'])

  //闪电瓶充电
  event.custom({
    "type":"createaddition:charging",
    "input": {
          "item": "minecraft:glass_bottle",
      "count": 1
    },
    "result": {
      "item": "irons_spellbooks:lightning_bottle",
      "count": 1
    },
    "energy": 16000,
    "maxChargeRate": 200
  })
  event.custom({
    "type":"createaddition:charging",
    "input": {
          "tag": "forge:storage_blocks/constantan",
      "count": 1
    },
    "result": {
      "item": "irons_spellbooks:energized_core",
      "count": 1
    },
    "energy": 128000,
    "maxChargeRate": 1600
  })

  //电动机、发电机
  event.remove({ id: 'createaddition:mechanical_crafting/alternator'})
  event.remove({ id: 'createaddition:mechanical_crafting/electric_motor'})
  event.recipes.create.mechanical_crafting('createaddition:alternator', [
    '  E  ',
    ' ACA ',
    'ACDCA',
    ' ABA '
  ], {
    A: '#forge:plates/steel',
    B: 'createaddition:capacitor',
    C: 'immersiveengineering:coil_lv',
    D: 'immersiveengineering:light_engineering',
    E: 'create:shaft'
  })
  event.recipes.create.mechanical_crafting('createaddition:electric_motor', [
    '  E  ',
    ' ACA ',
    'ACDCA',
    ' ABA '
  ], {
    A: '#forge:plates/brass',
    B: 'createaddition:capacitor',
    C: 'immersiveengineering:coil_lv',
    D: 'immersiveengineering:light_engineering',
    E: 'create:shaft'
  })

  //车床
  event.remove({ id: 'vintageimprovements:mechanical_crafting/lathe'})
  event.recipes.create.mechanical_crafting('vintageimprovements:lathe', [
    'ACCCA',
    'DE  B',
    'ACCCA'
  ], {
    A: '#forge:storage_blocks/steel',
    B: 'immersiveengineering:light_engineering',
    C: '#forge:rods/iron',
    D: 'kubejs:precise_engineering',
    E: 'create:shaft'
  })
  event.recipes.vintageimprovements.turning(Item.of('create:fluid_pipe', 16), '#forge:storage_blocks/constantan')

  //零件（直接合成）
  event.shaped('immersiveengineering:component_iron', [ 
    'CAC', 
    'ABA',
    'CAC'  
    ], {
    A: '#blue_skies:gems/pyrope',
    B: 'kubejs:advanced_spring_set',
    C: '#forge:plates/iron'
  })
  event.shaped('immersiveengineering:component_steel', [ 
    'CAC', 
    'ABA',
    'CAC'  
    ], {
    A: '#blue_skies:nuggets/falsite',
    B: 'kubejs:advanced_spring_set',
    C: '#forge:plates/steel'
  })

  //末影碎片
  event.remove({id:"endersdelight:cutting/ender_shard"})
  event.remove({id:"endersdelight:cutting/ender_shard_using_deployer"})
  event.recipes.farmersdelight.cutting(
    '#forge:ender_pearls',
    '#minecraft:pickaxes',
    [
      Item.of('endersdelight:ender_shard',2)
    ]
  )
  
  //虚空钢
  event.remove({id:"createutilities:mixing/void_steel_ingot"})
  event.recipes.create.mixing([Item.of('createutilities:void_steel_ingot'), Item.of('scguns:nether_star_fragment').withChance(0.9)], ['kubejs:unformed_steel_ingot', 'kubejs:unformed_steel_ingot', '#endersdelight:enderman_loot', '#endersdelight:enderman_loot', 'echo_shard', 'scguns:nether_star_fragment']).heated()
  event.remove({id:"createutilities:pressing/void_steel_sheet"})
  event.recipes.vintageimprovementsHammering(Item.of('#forge:plates/voidsteel'), '#forge:ingots/voidsteel').hammerBlows(3)

  //紫水晶
  event.remove({id:"createutilities:sandpaper_polishing/polished_amethyst"})
  event.recipes.vintageimprovements.polishing('createutilities:polished_amethyst', '#forge:gems/amethyst').speedLimits(2).fragile()

  //模具
  const moldTypes = [
    "mold_plate",
    "mold_gear",
    "mold_rod",
    "mold_bullet_casing",
    "mold_wire",
    "mold_packing_4",
    "mold_packing_9",
    "mold_unpacking"
  ]
  moldTypes.forEach( id => {
    event.remove({id:"immersiveengineering:blueprint/"+id})
    event.recipes.vintageimprovements.turning(Item.of('immersiveengineering:'+id), 'kubejs:mold_blank_steel')
  })

  //发电
  /*
  event.remove({ mod: 'create_new_age', not:[{output:'create_new_age:basic_motor'},{output:'create_new_age:carbon_brushes'},{output:'create_new_age:generator_coil'}] })
  event.recipes.create.mechanical_crafting('create_new_age:generator_coil', [
    ' DDD ',
    'D B D',
    'DBABD',
    'D B D',
    ' DDD '
  ], {
    A: 'immersiveengineering:light_engineering',
    B: 'immersiveengineering:component_steel',
    D: 'immersiveengineering:wirecoil_copper'
  })
  event.recipes.create.mechanical_crafting('create_new_age:carbon_brushes', [
    ' DDD ',
    'D B D',
    'DBABD',
    'D B D',
    ' DDD '
  ], {
    A: 'immersiveengineering:rs_engineering',
    B: 'immersiveengineering:component_iron',
    D: '#forge:coal_coke'
  })
  //电动机
  event.recipes.create.mechanical_crafting('create_new_age:basic_motor', [
    ' CBC ',
    'DBABD',
    ' CBC '
  ], {
    A: 'create_new_age:generator_coil',
    B: 'create_new_age:magnetite_block',
    C: 'immersiveengineering:light_engineering',
    D: 'immersiveengineering:coil_lv'
  })
  event.recipes.create.mechanical_crafting('create_new_age:advanced_motor', [
    ' CBC ',
    'DBABD',
    ' CBC '
  ], {
    A: 'create_new_age:basic_motor',
    B: 'create_new_age:layered_magnet',
    C: 'immersiveengineering:light_engineering',
    D: 'immersiveengineering:coil_mv'
  })
  event.recipes.create.mechanical_crafting('create_new_age:reinforced_motor', [
    ' CBC ',
    'DBABD',
    ' CBC '
  ], {
    A: 'create_new_age:advanced_motor',
    B: 'create_new_age:fluxuated_magnetite',
    C: 'immersiveengineering:light_engineering',
    D: 'immersiveengineering:coil_hv'
  })
  */
})