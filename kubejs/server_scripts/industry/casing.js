ServerEvents.recipes(event => {
    //机壳通用公式
    let casing = (output, base, material) => {
      event.recipes.createItemApplication(output, [base, material])
    }

    //安山机壳
    /*
    event.remove({id:'create:item_application/andesite_casing_from_wood'})
    event.remove({id:'create:item_application/andesite_casing_from_log'})
    casing("create:andesite_casing", "botania:stripped_livingwood", "create:andesite_alloy")
    casing("create:andesite_casing", "botania:stripped_livingwood_log", "create:andesite_alloy")
    */
    
    //铜机壳
    event.remove({id:'create:item_application/copper_casing_from_wood'})
    event.remove({id:'create:item_application/copper_casing_from_log'})
    casing('create:copper_casing', "createdeco:andesite_sheet_metal", '#forge:plates/constantan')

    //黄铜机壳
    event.remove({id:'create:item_application/brass_casing_from_wood'})
    event.remove({id:'create:item_application/brass_casing_from_log'})
    casing('create:brass_casing', "#forge:treated_wood", '#forge:plates/brass')

    //火车机壳
    event.remove({id:'create:item_application/railway_casing'})
    casing('create:railway_casing', "create:brass_casing", '#forge:plates/obsidian')

    //钢机壳
    casing("kubejs:steel_casing", "create:brass_casing", '#forge:plates/steel')

    //虚空机壳
    event.remove({id:'createutilities:item_application/void_casing'})
    casing("createutilities:void_casing", "obsidian", '#forge:plates/voidsteel')

    //工厂机壳
    casing("kubejs:factory_casing", "immersiveengineering:concrete_leaded", 'kubejs:za_sheet')

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

    //卷簧机
    event.replaceInput(
      { output:"vintageimprovements:spring_coiling_machine_wheel" },
      'create:andesite_alloy',
      '#forge:nuggets/constantan'
    )

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
      C: 'kubejs:basic_spring_set',
      D: 'create:mechanical_pump'
    })
    event.recipes.create.sequenced_assembly([
      'kubejs:fluid_engineering'
    ], 'create:copper_casing', [
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', '#forge:plates/bronze']),
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', 'create:mechanical_pump']),
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', 'kubejs:basic_spring_set']),
      event.recipes.createDeploying('kubejs:incomplete_fluid_engineering', ['kubejs:incomplete_fluid_engineering', '#forge:plates/bronze'])
    ]).transitionalItem('kubejs:incomplete_fluid_engineering').loops(1)

    event.remove({output:"create:brass_hand"})
    event.shaped('create:brass_hand', [ 
      ' A ', 
      'CBC',
      ' C '  
      ], {
      B: '#forge:ingots/brass',
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
      A: '#forge:plates/obsidian',
      C: 'create:precision_mechanism',
      D: '#forge:wires/brass'
    })
    event.recipes.create.sequenced_assembly([
      'kubejs:precise_engineering'
    ], 'create:brass_casing', [
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', '#forge:plates/obsidian']),
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', 'create:precision_mechanism']),
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', '#forge:wires/brass']),
      event.recipes.createDeploying('kubejs:incomplete_precise_engineering', ['kubejs:incomplete_precise_engineering', '#forge:plates/obsidian'])
    ]).transitionalItem('kubejs:incomplete_precise_engineering').loops(1)

    //物流工程块（来源列车机壳）
    event.shaped('kubejs:logistical_engineering', [ 
      'DAC', 
      'ABA',
      'CAD'  
      ], {
      B: 'create:railway_casing',
      A: 'dried_kelp_block',
      C: '#forge:leather',
      D: 'immersiveengineering:hemp_fabric'
    })
    event.recipes.create.sequenced_assembly([
      'kubejs:logistical_engineering'
    ], 'create:railway_casing', [
      event.recipes.createDeploying('kubejs:incomplete_logistical_engineering', ['kubejs:incomplete_logistical_engineering', 'dried_kelp_block']),
      event.recipes.createDeploying('kubejs:incomplete_logistical_engineering', ['kubejs:incomplete_logistical_engineering', '#forge:leather']),
      event.recipes.createDeploying('kubejs:incomplete_logistical_engineering', ['kubejs:incomplete_logistical_engineering', 'immersiveengineering:hemp_fabric']),
      event.recipes.createDeploying('kubejs:incomplete_logistical_engineering', ['kubejs:incomplete_logistical_engineering', 'dried_kelp_block'])
    ]).transitionalItem('kubejs:incomplete_logistical_engineering').loops(1)
})