ServerEvents.recipes(event => {
    //机壳通用公式
    let casing = (output, base, material) => {
      event.recipes.createItemApplication(output, [base, material])
    }

    //安山机壳
    event.remove({id:'create:item_application/andesite_casing_from_wood'})
    event.remove({id:'create:item_application/andesite_casing_from_log'})
    casing("create:andesite_casing", "botania:stripped_livingwood", "create:andesite_alloy")
    casing("create:andesite_casing", "botania:stripped_livingwood_log", "create:andesite_alloy")
    
    //铜机壳
    event.remove({id:'create:item_application/copper_casing_from_wood'})
    event.remove({id:'create:item_application/copper_casing_from_log'})
    casing('create:copper_casing', "botania:stripped_livingwood", '#forge:plates/constantan')
    casing('create:copper_casing', "botania:stripped_livingwood_log", '#forge:plates/constantan')

    //黄铜机壳
    event.remove({id:'create:item_application/brass_casing_from_wood'})
    event.remove({id:'create:item_application/brass_casing_from_log'})
    casing('create:brass_casing', "botania:stripped_livingwood", '#forge:plates/brass')
    casing('create:brass_casing', "botania:stripped_livingwood_log", '#forge:plates/brass')

    //火车机壳
    event.remove({id:'create:item_application/railway_casing'})
    casing('create:railway_casing', "create:brass_casing", '#forge:plates/obsidian')

    //钢机壳
    event.remove({id:'tfmg:item_application/steel_casing'})
    casing("tfmg:steel_casing", "immersiveengineering:treated_wood_horizontal", '#forge:plates/steel')
    event.replaceInput(
      {input:"tfmg:steel_casing", not: {output:'tfmg:steel_door'}},
      'tfmg:steel_casing',
      'immersiveengineering:light_engineering'
    )

    //重型机械机壳
    event.remove({id:'tfmg:item_application/heavy_machinery_casing'})
    casing("tfmg:heavy_machinery_casing", "tfmg:steel_casing", 'kubejs:frostfire_double_plate')
    event.replaceInput(
      {input:"tfmg:heavy_machinery_casing", not: {output:'tfmg:heavy_casing_door'}},
      'tfmg:heavy_machinery_casing',
      'immersiveengineering:heavy_engineering'
    )

    //齿轮
    event.remove({id:'create:crafting/kinetics/cogwheel'})
    event.remove({id:'create:deploying/cogwheel'})
    event.remove({id:'create:crafting/kinetics/large_cogwheel'})
    event.remove({id:'create:crafting/kinetics/large_cogwheel_from_little'})
    event.remove({id:'create:deploying/large_cogwheel'})
    event.shapeless('create:cogwheel', [
      'create:shaft',
      'botania:livingwood_planks',
    ])
    event.recipes.create.deploying('create:cogwheel', ['create:shaft', 'botania:livingwood_planks'])
    event.shapeless('create:large_cogwheel', [
      'create:cogwheel',
      'botania:livingwood_planks',
    ])
    event.shapeless('create:large_cogwheel', [
      'create:shaft',
      '2x botania:livingwood_planks',
    ])
    event.recipes.create.deploying('create:large_cogwheel', ['create:cogwheel', 'botania:livingwood_planks'])

    //安山工程块及替换机壳
    event.shaped('kubejs:andesite_engineering', [ 
      'DAC', 
      'ABA',
      'CAD'  
      ], {
      B: 'create:andesite_casing',
      A: 'botania:livingwood_planks',
      C: 'create:cogwheel',
      D: 'create:large_cogwheel'
    })
    event.recipes.create.sequenced_assembly([
      'kubejs:andesite_engineering'
    ], 'create:andesite_casing', [
      event.recipes.createDeploying('kubejs:incomplete_andesite_engineering', ['kubejs:incomplete_andesite_engineering', 'botania:livingwood_planks']),
      event.recipes.createDeploying('kubejs:incomplete_andesite_engineering', ['kubejs:incomplete_andesite_engineering', 'create:cogwheel']),
      event.recipes.createDeploying('kubejs:incomplete_andesite_engineering', ['kubejs:incomplete_andesite_engineering', 'create:large_cogwheel']),
      event.recipes.createDeploying('kubejs:incomplete_andesite_engineering', ['kubejs:incomplete_andesite_engineering', 'botania:livingwood_planks'])
    ]).transitionalItem('kubejs:incomplete_andesite_engineering').loops(1)

    //流体工程块及替换机壳
    event.shaped('kubejs:fluid_engineering', [ 
      'DAC', 
      'ABA',
      'CAD'  
      ], {
      B: 'create:copper_casing',
      A: '#forge:plates/bronze',
      C: 'create:fluid_pipe',
      D: 'create:mechanical_pump'
    })
    event.recipes.create.sequenced_assembly([
      'kubejs:fluid_engineering'
    ], 'create:copper_casing', [
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', '#forge:plates/bronze']),
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', 'create:mechanical_pump']),
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', 'create:fluid_pipe']),
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', '#forge:plates/bronze'])
    ]).transitionalItem('kubejs:incomplete_fluid_engineering').loops(1)

    event.remove({output:"create:brass_hand"})
    event.shaped('create:brass_hand', [ 
      ' A ', 
      'CBC',
      ' C '  
      ], {
      B: 'botania:mana_powder',
      A: 'create:andesite_alloy',
      C: 'botania:manasteel_ingot'
    })

    event.recipes.create.deploying('3x create:fluid_pipe', ['#forge:ingots/constantan', '#forge:plates/constantan'])
    event.recipes.create.deploying('create:mechanical_pump', ['create:fluid_pipe', 'create:cogwheel'])
    event.recipes.create.deploying('create:fluid_valve', ['create:fluid_pipe', '#forge:plates/iron'])

    //精密工程块及替换机壳
    event.shaped('kubejs:precise_engineering', [ 
      'DAC', 
      'ABA',
      'CAD'  
      ], {
      B: 'create:brass_casing',
      A: '#forge:treated_wood',
      C: 'create:precision_mechanism',
      D: '#forge:plates/obsidian'
    })
    event.recipes.create.sequenced_assembly([
      'kubejs:precise_engineering'
    ], 'create:brass_casing', [
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', '#forge:treated_wood']),
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', '#forge:plates/obsidian']),
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', '#forge:treated_wood'])
    ]).transitionalItem('kubejs:incomplete_precise_engineering').loops(1)
})