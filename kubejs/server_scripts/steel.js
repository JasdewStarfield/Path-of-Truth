ServerEvents.recipes(event => {
  //铸铁
  event.remove({ id: 'tfmg:crafting/casting_spout' })
  event.remove({ id: 'tfmg:crafting/casting_basin' })
  event.remove({ id: 'tfmg:casting/steel' })
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
  */

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
  
  event.remove({id:'tfmg:mixing/cast_iron_ingot'})
  event.custom({
    "type":"immersiveengineering:blast_furnace",
    "input":{"tag":"forge:ingots/iron"},
    "result":{"tag":"forge:ingots/cast_iron"},
    "slag":{"tag":"forge:slag"},
    "time":400
  })

  //电弧炉炼铁
  event.custom({
    "type":"immersiveengineering:arc_furnace",
    "additives":[],
    "energy":102400,
    "input":{"tag":"forge:dusts/iron"},
    "results":[{"tag":"forge:ingots/iron"}],
    "slag":{"tag":"forge:slag"},
    "time":400
  })




  //event.shapeless('tfmg:coke_dust', [
  //  'immersiveengineering:coke_dust'
  //])
  event.remove({ output: 'tfmg:rebar' })
  event.replaceInput(
    { input:"tfmg:rebar" },
    'tfmg:rebar',
    '#forge:rods/steel'
  )

  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:filled_casting_mold_small')
    ], 'kubejs:casting_base', [
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', 'tfmg:ingot_mold']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', Fluid.of('tfmg:molten_steel',100)]),
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', 'kubejs:casting_seal']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_small', ['kubejs:incomplete_filled_casting_mold_small', Fluid.of('minecraft:water',1000)])
  ]).transitionalItem('kubejs:incomplete_filled_casting_mold_small').loops(1)
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:filled_casting_mold_large')
    ], 'kubejs:casting_base', [
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', 'tfmg:block_mold']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', Fluid.of('tfmg:molten_steel',900)]),
      event.recipes.createDeploying('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', 'kubejs:casting_seal']),
      event.recipes.createFilling('kubejs:incomplete_filled_casting_mold_large', ['kubejs:incomplete_filled_casting_mold_large', Fluid.of('minecraft:water',1000)])
  ]).transitionalItem('kubejs:incomplete_filled_casting_mold_large').loops(1)

  event.recipes.create.compacting(['tfmg:steel_ingot','kubejs:casting_seal','kubejs:casting_base',Item.of('tfmg:ingot_mold').withChance(0.95)], 'kubejs:filled_casting_mold_small')
  event.recipes.create.compacting(['tfmg:steel_block','kubejs:casting_seal','kubejs:casting_base',Item.of('tfmg:block_mold').withChance(0.95)], 'kubejs:filled_casting_mold_large')

  //发电
  event.remove({ mod: 'create_new_age'/*, not:[{output:'create_new_age:basic_motor'},{output:'create_new_age:carbon_brushes'},{output:'create_new_age:generator_coil'}]*/ })
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
})