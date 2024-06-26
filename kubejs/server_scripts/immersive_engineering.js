ServerEvents.recipes(event => {
    event.remove({id:'minecraft:bread'})

    //移除敲板子和粉末等离谱配方
    event.remove({id:/immersiveengineering\:crafting\/stick_.*/,not:{output:'immersiveengineering:stick_treated'}})
    event.remove({id:/immersiveengineering\:crafting\/plate_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/raw_hammercrushing_\.*/})
    event.remove({id:/immersiveengineering\:crafting\/hammercrushing_\.*/})

    //机械动力适配IE的敲板子
    let plates = (material) => {
        event.recipes.create.pressing('#forge:plates/'+material, '#forge:ingots/'+material)
    }

    const IEMetals=[
        "aluminum",
        "electrum",
        "uranium",
        "nickel",
        "silver",
        "lead"
    ]

    IEMetals.forEach((id) => plates(id))

    //按分类移除
    event.remove({type:'immersiveengineering:alloy'})

    //移除ie初级动能发电配方
    event.remove({id:'immersiveengineering:crafting/windmill_blade'})
    event.remove({id:'immersiveengineering:crafting/windmill_sail'})
    event.remove({id:'immersiveengineering:crafting/waterwheel_segment'})
    event.remove({id:'immersiveengineering:crafting/dynamo'})

    //传送带
    event.remove({id:"immersiveengineering:crafting/conveyor_basic"})
    event.shaped(Item.of('immersiveengineering:conveyor_basic', 6), [ 
        'DDD',
        'AAA',
        'CBC'  
    ], {
        A: 'create:belt_connector',
        B: 'create:electron_tube',
        C: '#forge:ingots/steel',
        C: '#forge:leather'
    })

    //锯条
    event.remove({id:"immersiveengineering:crafting/sawblade"})
    event.shaped('immersiveengineering:sawblade', [ 
        'CAC', 
        'A A',
        'CAC'  
    ], {
        A: '#forge:ingots/iron',
        C: '#forge:plates/iron'
    })

    //焦炉砖
    event.remove({id:"immersiveengineering:crafting/cokebrick"})
    event.shaped('immersiveengineering:cokebrick', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'minecraft:calcite',
        A: 'minecraft:brick',
        C: 'minecraft:clay_ball'
    })

    //高炉砖
    event.remove({id:"immersiveengineering:crafting/blastbrick"})
    event.shaped('immersiveengineering:blastbrick', [ 
        'CAC', 
        'ABA',
        'CAC'  
    ], {
        B: 'minecraft:magma_block',
        A: 'minecraft:brick',
        C: '#forge:nuggets/bronze'
    })

    //工程师锤
    event.replaceInput(
        { output:"immersiveengineering:hammer" },
        '#forge:ingots/iron',
        '#forge:ingots/bronze'
    )

    //高炉炼铁
    event.remove({type:"tfmg:coking"})
    event.remove({id:/immersiveengineering:blastfurnace\/steel.*/})
    event.remove({id:/immersiveengineering:blastfurnace\/fuel.*/})
    event.custom({
        "type":"immersiveengineering:blast_furnace",
        "input":{"tag":"forge:raw_materials/iron"},
        "result":{"tag":"forge:ingots/iron"},
        "slag":{"tag":"forge:slag"},
        "time":200
    })
    event.custom({
        "type":"immersiveengineering:blast_furnace",
        "input":{"item":"create:crushed_raw_iron"},
        "result":{"tag":"forge:ingots/iron"},
        "slag":{"tag":"forge:slag"},
        "time":200
    })
    event.custom({
        "type":"immersiveengineering:blast_furnace",
        "input":{"tag":"forge:dusts/iron"},
        "result":{"tag":"forge:ingots/iron"},
        "slag":{"tag":"forge:slag"},
        "time":200
    })
    event.custom({
        "type":"immersiveengineering:blast_furnace_fuel",
        "input":{"tag":"forge:dusts/coal_coke"},
        "time":1600
    })

    //流体管道
    event.remove({id:"immersiveengineering:crafting/fluid_pipe"})
    event.replaceInput(
        { input:"immersiveengineering:fluid_pipe" },
        'immersiveengineering:fluid_pipe',
        'tfmg:steel_pipe'
    )

    //防腐木板
    event.remove({id:"immersiveengineering:crafting/treated_wood_horizontal"})
    event.custom({
		"type":"create:filling",
		"ingredients":[
			{"tag":"minecraft:planks"},
			{"fluid":"immersiveengineering:creosote", "amount":125}
		],
		"results":[
			{"item":"immersiveengineering:treated_wood_horizontal"},
		]
	})

    //玫瑰石英
    event.remove({output:'create:rose_quartz'})
    event.custom({
        "type": "create:filling",
        "ingredients": [
          {
            "item": "minecraft:quartz"
          },
          {
            "amount": 1000,
            "fluid": "immersiveengineering:redstone_acid",
          }
        ],
        "results": [
          {
            "item": "create:rose_quartz"
          }
        ]
    })
    event.remove({id:'immersiveengineering:crafting/redstone_acid'})
    event.custom({
        "type": "create:mixing",
        "ingredients": [
          {
            "tag": "forge:dusts/redstone"
          },
          {
            "amount": 125,
            "fluid": "minecraft:water",
          }
        ],
        "results": [
          {
            "amount": 125,
            "fluid": "immersiveengineering:redstone_acid"
          }
        ]
    })
    //BOP的玫瑰石英碎块
    event.recipes.create.crushing(Item.of('create:rose_quartz').withChance(0.1), 'biomesoplenty:rose_quartz_block')

    //零件
    event.remove({id:"immersiveengineering:crafting/component_steel"})
    event.remove({id:"immersiveengineering:crafting/component_iron"})
    event.shaped('immersiveengineering:component_steel', [ 
        'A A', 
        ' B ',
        'A A'  
    ], {
        B: '#blue_skies:nuggets/falsite',
        A: '#forge:plates/steel'
    })
    event.shaped('immersiveengineering:component_iron', [ 
        'A A', 
        ' B ',
        'A A'  
    ], {
        B: '#blue_skies:gems/pyrope',
        A: '#forge:plates/iron'
    })

    //钢铁构件
    event.remove({id:"tfmg:sequenced_assembly/steel_mechanism"})
    event.custom({
          "type": "create:sequenced_assembly",
          "ingredient": {
            "item": "tfmg:heavy_plate"
          },
          "transitionalItem": {
            "item": "tfmg:unfinished_steel_mechanism"
          },
          "sequence": [
            {
              "type": "create:deploying",
              "ingredients": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                },
                {
                    "item": "create:precision_mechanism"
                }
              ],
              "results": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                }
              ]
            },
            {
              "type": "create:deploying",
              "ingredients": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                },
                {
                  "tag": "forge:plates/aluminum"
                }
              ],
              "results": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                }
              ]
            },
            {
              "type": "create:deploying",
              "ingredients": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                },
                {
                  "tag": "forge:dusts/aquite"
                }
              ],
              "results": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                }
              ]
            },
            {
              "type": "create:deploying",
              "ingredients": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                },
                {
                  "item": "tfmg:screw"
                }
              ],
              "results": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                }
              ]
            },
            {
              "type": "create:deploying",
              "ingredients": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                },
                {
                  "item": "tfmg:screwdriver"
                }
              ],
              "results": [
                {
                  "item": "tfmg:unfinished_steel_mechanism"
                }
              ]
            }
        
          ],
          "results": [
            {
              "chance": 120.0,
              "item": "tfmg:steel_mechanism"
            },
            {
              "chance": 8.0,
              "item": "tfmg:heavy_plate"
            },
            {
              "chance": 8.0,
              "item": "create:precision_mechanism"
            },
            {
              "chance": 5.0,
              "item": "tfmg:aluminum_ingot"
            },
            {
              "chance": 3.0,
              "item": "tfmg:industrial_pipe"
            }
          ],
          "loops": 3
    })

    //遗忆构件
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": {
          "tag": "forge:plates/forgotten_metal"
        },
        "transitionalItem": {
          "item": "kubejs:incomplete_forgotten_mechanism"
        },
        "sequence": [
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              },
              {
                  "item": "create:precision_mechanism"
              }
            ],
            "results": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              }
            ]
          },
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              },
              {
                "item": "blue_skies:diopside_gem"
              }
            ],
            "results": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              }
            ]
          },
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              },
              {
                "item": "immersiveengineering:component_electronic"
              }
            ],
            "results": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              }
            ]
          },
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              },
              {
                "item": "tfmg:screw"
              }
            ],
            "results": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              }
            ]
          },
          {
            "type": "create:deploying",
            "ingredients": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              },
              {
                "item": "tfmg:screwdriver"
              }
            ],
            "results": [
              {
                "item": "kubejs:incomplete_forgotten_mechanism"
              }
            ]
          }
      
        ],
        "results": [
          {
            "chance": 120.0,
            "item": "kubejs:forgotten_mechanism"
          },
          {
            "chance": 8.0,
            "item": "kubejs:forgotten_plate"
          },
          {
            "chance": 8.0,
            "item": "create:precision_mechanism"
          },
          {
            "chance": 5.0,
            "item": "blue_skies:diopside_gem"
          },
          {
            "chance": 3.0,
            "item": "immersiveengineering:component_electronic"
          }
        ],
        "loops": 3
  })

    //工程块
    event.remove({id:"immersiveengineering:crafting/light_engineering"})
    event.remove({id:"immersiveengineering:crafting/heavy_engineering"})
    event.remove({id:"immersiveengineering:crafting/rs_engineering"})

    event.shaped('immersiveengineering:light_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'tfmg:steel_casing',
        A: '#forge:plates/ventium',
        D: 'immersiveengineering:component_steel',
        C: 'immersiveengineering:component_iron'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:light_engineering'
        ], 'tfmg:steel_casing', [
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/ventium']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'immersiveengineering:component_steel']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', 'immersiveengineering:component_iron']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/ventium'])
    ]).transitionalItem('kubejs:incomplete_light_engineering').loops(1)

    event.shaped('immersiveengineering:heavy_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'tfmg:heavy_machinery_casing',
        A: '#forge:plates/cloggrum',
        D: 'kubejs:forgotten_mechanism',
        C: 'tfmg:steel_mechanism'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:heavy_engineering'
        ], 'tfmg:heavy_machinery_casing', [
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/cloggrum']),
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_heavy_engineering', 'kubejs:forgotten_mechanism']),
        event.recipes.createDeploying('kubejs:incomplete_heavy_engineering', ['kubejs:incomplete_heavy_engineering', 'tfmg:steel_mechanism']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/cloggrum'])
    ]).transitionalItem('kubejs:incomplete_heavy_engineering').loops(1)

    event.shaped('immersiveengineering:rs_engineering', [ 
        'DAC', 
        'ABA',
        'CAD'  
    ], {
        B: 'tfmg:steel_casing',
        A: '#forge:plates/falsite',
        D: '#forge:dusts/redstone',
        C: 'immersiveengineering:electron_tube'
    })
    event.recipes.create.sequenced_assembly([
        'immersiveengineering:rs_engineering'
        ], 'tfmg:steel_casing', [
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/falsite']),
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_rs_engineering', '#forge:dusts/redstone']),
        event.recipes.createDeploying('kubejs:incomplete_rs_engineering', ['kubejs:incomplete_rs_engineering', 'immersiveengineering:electron_tube']),
        event.recipes.createDeploying('kubejs:incomplete_light_engineering', ['kubejs:incomplete_light_engineering', '#forge:plates/falsite'])
    ]).transitionalItem('kubejs:incomplete_rs_engineering').loops(1)

    //塑料
    event.remove({id:"immersiveengineering:bottling/duroplast_plate"})
    event.remove({id:"tfmg:compacting/plastic_molding"})

    event.remove({id:"tfmg:mixing/liquid_plastic_from_propylene"})
    event.remove({id:"tfmg:mixing/liquid_plastic_from_ethylene"})
    event.custom({
        "type":"immersiveengineering:refinery",
        "catalyst":{"item":"kubejs:frostfire_double_plate"},
        "energy":120,
        "input0":{
            "amount":8,
            "tag":"forge:propylene"
        },
        "input1":{
            "amount":16,
            "tag":"forge:ethylene"
        },
        "result":{
            "amount": 16,
            "fluid":"tfmg:liquid_plastic"
        }
    })
    
    event.custom({
        "type": "create:compacting",
        "ingredients": [
            {
                "fluid": "immersiveengineering:phenolic_resin",
                "amount": 1000
            },
            {
                "fluid": "tfmg:liquid_plastic",
                "amount": 1000
            }
        ],
        "results": [
          {
            "item": "tfmg:plastic_sheet"
          }
        ]
    })
    event.recipes.create.pressing('immersiveengineering:plate_duroplast', 'tfmg:plastic_sheet')

    //流体管道
    const PipeMaterials = ['steel', 'cast_iron', 'brass', 'aluminum', 'plastic']
    let pipe = (material) => {
      event.remove({output:"tfmg:"+material+'_pipe'})
      event.recipes.createItemApplication('tfmg:'+material+'_pipe', ['create:fluid_pipe', '#forge:ingots/'+material])
    }
    PipeMaterials.forEach((id) => pipe(id))

    //高级电子元件
    event.remove({id:"immersiveengineering:blueprint/component_electronic_adv"})
    event.recipes.create.sequenced_assembly([
        Item.of('immersiveengineering:component_electronic_adv').withChance(70.0),
        Item.of('immersiveengineering:electron_tube').withChance(5.0),
        Item.of('immersiveengineering:component_electronic').withChance(20.0),
        Item.of('immersiveengineering:plate_duroplast').withChance(5.0)
        ], 'immersiveengineering:plate_duroplast', [
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'create_connected:control_chip']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', '#forge:wires/aluminum']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'createdeco:netherite_nugget']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'tfmg:screw']),
        event.recipes.createDeploying('kubejs:incomplete_component_electronic_adv', ['kubejs:incomplete_component_electronic_adv', 'tfmg:screwdriver'])
    ]).transitionalItem('kubejs:incomplete_component_electronic_adv').loops(5)

    //电子工程块
    event.shaped('kubejs:electronic_engineering', [ 
        'CAD', 
        'ABA',
        'DAC'  
    ], {
        B: 'create:brass_casing',
        A: 'tfmg:plastic_sheet',
        C: 'immersiveengineering:component_electronic_adv',
        D: 'immersiveengineering:component_electronic'
    })
    event.recipes.create.sequenced_assembly([
        'kubejs:electronic_engineering'
        ], 'create:brass_casing', [
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'tfmg:plastic_sheet']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'immersiveengineering:component_electronic_adv']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'immersiveengineering:component_electronic']),
            event.recipes.createDeploying('kubejs:incomplete_electronic_engineering', ['kubejs:incomplete_electronic_engineering', 'tfmg:plastic_sheet'])
    ]).transitionalItem('kubejs:incomplete_electronic_engineering').loops(1)
})