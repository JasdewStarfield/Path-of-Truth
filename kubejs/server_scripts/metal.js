ServerEvents.recipes(event => {
    //青铜块和锭
    //event.remove({id:'immersive_aircraft:airship'})
    event.shaped(
        Item.of('kubejs:bronze_block', 1),
        [ 
        'AAA', 
        'AAA',
        'AAA'
        ],
        {
        A: '#forge:ingots/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_ingot', 9),
        [ 
        'A'
        ],
        {
        A: '#forge:storage_blocks/bronze'
        }
    )

    //青铜粒和锭
    event.shaped(
        Item.of('kubejs:bronze_ingot', 1),
        [ 
        'AAA', 
        'AAA',
        'AAA'
        ],
        {
        A: '#forge:nuggets/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_nugget', 9),
        [ 
        'A'
        ],
        {
        A: '#forge:ingots/bronze'
        }
    )

    //青铜粉和锭
    event.smelting('#forge:ingots/bronze', '#forge:dusts/bronze')

    //青铜压板
    event.recipes.create.pressing('#forge:plates/bronze', '#forge:ingots/bronze')

    //青铜工具，护甲
    event.shaped(
        Item.of('kubejs:bronze_pickaxe', 1),
        [ 
        'AAA',
        ' B ',
        ' B '
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_axe', 1),
        [ 
        'AA',
        'AB',
        ' B'
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_axe', 1),
        [ 
        'AA',
        'BA',
        'B '
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_sword', 1),
        [ 
        'A',
        'A',
        'B'
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_shovel', 1),
        [ 
        'A',
        'B',
        'B'
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_hoe', 1),
        [ 
        'AA',
        'B ',
        'B '
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_hoe', 1),
        [ 
        'AA',
        ' B',
        ' B'
        ],
        {
        A: '#forge:ingots/bronze',
        B: '#forge:rods/wooden'
        }
    )
    /*
    event.shaped(
        Item.of('kubejs:bronze_helmet', 1),
        [ 
        'AAA',
        'A A'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_chestplate', 1),
        [ 
        'A A',
        'AAA',
        'AAA'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_leggings', 1),
        [ 
        'AAA',
        'A A',
        'A A'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    event.shaped(
        Item.of('kubejs:bronze_boots', 1),
        [ 
        'A A',
        'A A'
        ],
        {
        A: '#forge:plates/bronze'
        }
    )
    */

    //用铜粉、锡粉合成青铜粉
    event.recipes.create.mixing('kubejs:bronze_dust', ['#forge:dusts/tin','#forge:dusts/copper','#forge:dusts/copper','#forge:dusts/copper'])

    //石磨粉碎铜锭锡锭
    event.recipes.create.milling(Item.of('kubejs:tin_dust').withChance(0.5), '#forge:ingots/tin')
    event.recipes.create.milling(Item.of('immersiveengineering:dust_copper').withChance(0.5), '#forge:ingots/copper')
})