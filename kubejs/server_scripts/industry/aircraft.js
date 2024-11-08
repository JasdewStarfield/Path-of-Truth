ServerEvents.recipes(event => {
    /*//机身
    event.remove({id:'immersive_aircraft:hull'})
    event.shaped(
        Item.of('immersive_aircraft:hull', 1),
        [ 
        'AAA', 
        'BBB',
        'AAA'  
        ],
        {
        A: 'immersiveengineering:treated_wood_horizontal', 
        B: '#forge:plates/iron'
        }
    )

    //发动机
    event.remove({id:'immersive_aircraft:engine'})
    event.shaped(
        Item.of('immersive_aircraft:engine', 1),
        [ 
        'AAA', 
        'BCB',
        'ADA'  
        ],
        {
        A: 'immersiveengineering:light_engineering', 
        B: 'minecraft:piston',
        C: 'minecraft:blast_furnace',
        D: 'immersive_aircraft:boiler'
        }
    )

    //替换sail为create的风帆
    event.remove({id:'immersive_aircraft:sail'})
    event.replaceInput(
        { input: 'immersive_aircraft:sail' }, // Arg 1: the filter
        'immersive_aircraft:sail',            // Arg 2: the item to replace
        'create:white_sail'
      )
    
    //替换螺旋桨
    event.remove({id:'immersive_aircraft:propeller'})
    event.replaceInput(
        { input: 'immersive_aircraft:propeller' }, // Arg 1: the filter
        'immersive_aircraft:propeller',            // Arg 2: the item to replace
        'create:propeller'
      )

    //强化船体
    event.replaceInput(
        { output: 'immersivepetroleum:upgrade_reinforced_hull' }, // Arg 1: the filter
        'immersiveengineering:plate_steel',            // Arg 2: the item to replace
        'create:sturdy_sheet'
    )
    
    //加固管道
    event.replaceInput(
        { output: 'immersive_aircraft:sturdy_pipes' }, // Arg 1: the filter
        '#forge:ingots/copper',            // Arg 2: the item to replace
        'create:fluid_pipe'
    )
    //起落架
    event.replaceInput(
        { output: 'immersive_aircraft:improved_landing_gear' }, // Arg 1: the filter
        'coal',            // Arg 2: the item to replace
        'create:belt_connector'
    )
    //齿轮
    event.replaceInput(
        { output: 'immersive_aircraft:industrial_gears' }, // Arg 1: the filter
        'lever',            // Arg 2: the item to replace
        'create:large_cogwheel'
    )*/

    //飞艇
    event.remove({id:'immersive_aircraft:airship'})
    event.shaped(
        Item.of('immersive_aircraft:airship', 1),
        [ 
        'AAA', 
        'EDB',
        'CCC'
        ],
        {
        A: 'immersive_aircraft:sail', 
        B: 'create:propeller',
        C: 'immersive_aircraft:hull',
        D: '#create:seats',
        E: 'immersive_aircraft:boiler'
        }
    )

    //锅炉
    event.replaceInput(
        { output: 'immersive_aircraft:boiler' }, // Arg 1: the filter
        'create:blaze_burner',            // Arg 2: the item to replace
        'blast_furnace'
    )

    //“钢制”锅炉
    event.replaceInput(
        { output: 'immersive_aircraft:steel_boiler' }, // Arg 1: the filter
        '#forge:plates/iron',            // Arg 2: the item to replace
        '#forge:plates/steel'
    )
})