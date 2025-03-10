ServerEvents.recipes(event => {
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

  //融化铁粉
  event.recipes.create.mixing(Fluid.of('kubejs:molten_iron',100), '#forge:dusts/iron').heated()

  //转炉炼钢法
  event.recipes.vintageimprovements.pressurizing([
    Fluid.of("kubejs:molten_steel", 150),
    Item.of('kubejs:fire_elemental_core'),
    Fluid.of('kubejs:molten_slag', 50)
  ], [
    Item.of("#create:stone_types/limestone"),
    Item.of('kubejs:fire_elemental_core'),
    Fluid.of("kubejs:molten_iron", 200)
  ]).heated()

  //熔融钢、炉渣处理
  event.recipes.create.compacting("kubejs:unformed_steel_ingot", Fluid.of("kubejs:molten_steel", 100))
  event.recipes.create.compacting("#forge:slag", Fluid.of("kubejs:molten_slag", 100))
  
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