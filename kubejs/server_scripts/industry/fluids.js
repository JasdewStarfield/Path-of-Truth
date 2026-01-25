ServerEvents.recipes(event => {
    // 临时移除铜水槽配方
    event.remove({id: 'fluid:copper_sink'})

    // 流体构件
    event.recipes.create.sequenced_assembly(
      [
        Item.of('kubejs:fluid_mechanism', 1)
      ],
      '#forge:plates/constantan',
      [
        event.recipes.createDeploying('kubejs:incomplete_fluid_mechanism', ['kubejs:incomplete_fluid_mechanism', 'create:mechanical_pump']),
        event.recipes.createDeploying('kubejs:incomplete_fluid_mechanism', ['kubejs:incomplete_fluid_mechanism', 'rubberworks:rubber_sheet']),
        event.recipes.createDeploying('kubejs:incomplete_fluid_mechanism', ['kubejs:incomplete_fluid_mechanism', '#forge:nuggets/bronze']),
        event.recipes.createPressing('kubejs:incomplete_fluid_mechanism', 'kubejs:incomplete_fluid_mechanism')
      ]
    ).transitionalItem('kubejs:incomplete_fluid_mechanism').loops(2)
    event.recipes.create.compacting(
      'kubejs:fluid_mechanism',
      [
        '#forge:plates/constantan',
        'create:mechanical_pump',
        'create:mechanical_pump',
        'rubberworks:rubber_sheet',
        'rubberworks:rubber_sheet',
        '#forge:nuggets/bronze',
        '#forge:nuggets/bronze',
        Fluid.of('create:honey', 50)
      ]
    ).heated()

    // 流体接口
    event.remove({id: "fluid:fluid_interface"})
    event.shaped(
      Item.of('fluid:fluid_interface', 1),
      [
      ' A ',
      'BCB',
      ' A '
      ],
      {
          A: '#forge:nuggets/bronze',
          B: '#forge:nuggets/constantan',
          C: 'kubejs:fluid_mechanism'
      }
    )

    // 橡胶替换干海带
    event.replaceInput(
      { mod: 'createdieselgenerators' },
      'minecraft:dried_kelp',
      'rubberworks:rubber_sheet'
    )
    event.replaceInput(
      { mod: 'interiors' },
      'minecraft:dried_kelp',
      'rubberworks:rubber_sheet'
    )

    // 沉浸工程桶
    event.remove({id: 'immersiveengineering:crafting/wooden_barrel'})
    event.remove({id: 'immersiveengineering:crafting/metal_barrel'})
    event.shaped(
      Item.of('immersiveengineering:wooden_barrel', 1),
      [
        'AAA',
        'BCB',
        'BBB'
      ],
      {
        A: '#forge:treated_wood_slab',
        B: '#forge:treated_wood',
        C: 'create:fluid_tank'
      }
    )
    event.shaped(
      Item.of('immersiveengineering:metal_barrel', 1),
      [
        'AAA',
        'BCB',
        'BBB'
      ],
      {
        A: 'immersiveengineering:slab_sheetmetal_iron',
        B: 'immersiveengineering:sheetmetal_iron',
        C: 'create:fluid_tank'
      }
    )
})