ServerEvents.recipes(event => {
    //火车机壳
    event.remove({id:'create:item_application/railway_casing'})
    event.custom({
    "type":"create:item_application",
    "ingredients": [
        {
        "item":"create:andesite_casing"
        },
        {
        "item":"create:sturdy_sheet"
        }
    ],
    "results": [
        {
        "item":"create:railway_casing"
        }
    ]
    })

    //机壳通用公式
    let casing = (output, material) => {
      event.shaped(output, [ 
        ' A ', 
        'ABA',
        ' A '  
        ], {
        B: 'botania:stripped_livingwood_log',
        A: material
      })
      event.shaped(output, [ 
        ' A ', 
        'ABA',
        ' A '  
        ], {
        B: 'botania:stripped_livingwood',
        A: material
      })
      event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": {
          "item": "botania:stripped_livingwood"
        },
        "transitionalItem": {
          "item": "botania:stripped_livingwood"
        },
        "sequence": [
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "botania:stripped_livingwood"
              },
              {
                "item": material
              }
            ],
            "results": [
              {
                "item": "botania:stripped_livingwood"
              }
            ]
          }
        ],
        "results": [
          {
            "item": output,
            "chance": 30.0
          }
        ],
        "loops": 4
      })
      event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": {
          "item": "botania:stripped_livingwood_log"
        },
        "transitionalItem": {
          "item": "botania:stripped_livingwood_log"
        },
        "sequence": [
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "botania:stripped_livingwood_log"
              },
              {
                "item": material
              }
            ],
            "results": [
              {
                "item": "botania:stripped_livingwood_log"
              }
            ]
          }
        ],
        "results": [
          {
            "item": output,
            "chance": 30.0
          }
        ],
        "loops": 4
      })
    }

    //安山机壳
    event.remove({id:'create:item_application/andesite_casing_from_wood'})
    event.remove({id:'create:item_application/andesite_casing_from_log'})
    casing("create:andesite_casing", "create:andesite_alloy")
    
    //铜机壳
    event.remove({id:'create:item_application/copper_casing_from_wood'})
    event.remove({id:'create:item_application/copper_casing_from_log'})
    casing('create:copper_casing', 'kubejs:bronze_sheet')

    //黄铜机壳
    event.remove({id:'create:item_application/brass_casing_from_wood'})
    event.remove({id:'create:item_application/brass_casing_from_log'})
    casing('create:brass_casing', 'create:brass_sheet')

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

    event.replaceInput(
      { id:/.*mechanical.*/ },
      'create:andesite_casing',
      'kubejs:andesite_engineering'
    )
    const replacementAndesiteEngineering = [
      "create:deployer",
      "create_new_age:basic_motor",
      "create:gantry_carriage",
      "create:portable_storage_interface",
      "create:rope_pulley",
      "create:cuckoo_clock",
      "create:millstone",
      "create:encased_fan"
    ]
    replacementAndesiteEngineering.forEach((id) => event.replaceInput(
    { output:id },
    'create:andesite_casing',
    'kubejs:andesite_engineering'
    ))

    //辊压机
    event.replaceInput(
      { output:"create:mechanical_press" },
      '#forge:storage_blocks/iron',
      'create:andesite_alloy_block'
    )

    //搅拌机
    event.replaceInput(
      { output:"create:whisk" },
      '#forge:plates/iron',
      'createdeco:andesite_sheet'
    )
})