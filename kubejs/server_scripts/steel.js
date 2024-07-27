ServerEvents.recipes(event => {
  //铸铁
  event.remove({ id: 'tfmg:crafting/casting_spout' })
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

  //钢
  //event.shapeless('tfmg:coke_dust', [
  //  'immersiveengineering:coke_dust'
  //])
  event.replaceInput(
    { input:"tfmg:rebar" },
    'tfmg:rebar',
    '#forge:rods/steel'
  ) 

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
    A: 'immersiveengineering:light_engineering',
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