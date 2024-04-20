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
    A: 'kubejs:fluid_engineering',
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
    A: 'kubejs:fluid_engineering',
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
})