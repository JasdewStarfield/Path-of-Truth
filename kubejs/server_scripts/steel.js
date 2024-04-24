ServerEvents.recipes(event => {
  //铸铁
  event.remove({ id: 'tfmg:crafting/casting_spout' })
  event.recipes.create.mechanical_crafting('tfmg:casting_spout', [
    ' DDD ',
    'DBBBD',
    'DBABD',
    ' DCD ',
    ' DCD '
  ], {
    A: 'create:precision_mechanism',
    B: '#forge:glass',
    C: 'tfmg:cast_iron_pipe',
    D: '#forge:ingots/cast_iron'
  })
  event.remove({ id: 'tfmg:crafting/blast_furnace_output' })
  event.recipes.create.mechanical_crafting('tfmg:blast_furnace_output', [
    ' DDD ',
    'DBBBD',
    'DBABD',
    'DBBBD',
    ' DCD '
  ], {
    A: 'create:precision_mechanism',
    B: 'tfmg:fireproof_brick',
    C: 'tfmg:cast_iron_pipe',
    D: '#forge:ingots/cast_iron'
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
    B: '#forge:ingots/steel',
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
    B: '#forge:ingots/steel',
    D: '#forge:coal_coke'
  })
})