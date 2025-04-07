ServerEvents.recipes(event => {
    //扳手
    event.remove({id:"pipez:wrench"})
    event.shaped(
        Item.of('pipez:wrench', 1),
        [
        '  A',
        ' B ',
        'C  '
        ],
        {
        A: '#forge:plates/brass',
        B: '#forge:rods/wooden',
        C: '#forge:ingots/silver'
        }
    )

    //物品管道
    event.remove({id:"pipez:item_pipe"})
    event.shaped(
        Item.of('pipez:item_pipe', 24),
        [
        'AAA',
        'CBD',
        'AAA'
        ],
        {
        A: '#forge:plates/andesite',
        B: 'kubejs:logistical_engineering',
        C: 'create:belt_connector',
        D: 'kubejs:andesite_engineering'
        }
    )
    //流体管道
    event.remove({id:"pipez:fluid_pipe"})
    event.shaped(
        Item.of('pipez:fluid_pipe', 24),
        [
        'AAA',
        'CBD',
        'AAA'
        ],
        {
        A: '#forge:plates/constantan',
        B: 'kubejs:logistical_engineering',
        C: 'create:mechanical_pump',
        D: 'kubejs:fluid_engineering'
        }
    )
    //电力管道
    event.remove({id:"pipez:energy_pipe"})
    event.shaped(
        Item.of('pipez:energy_pipe', 24),
        [
        'AAA',
        'CBD',
        'AAA'
        ],
        {
        A: '#forge:plates/aluminum',
        B: 'kubejs:logistical_engineering',
        C: 'immersiveengineering:coil_hv',
        D: 'immersiveengineering:light_engineering'
        }
    )

    //通用管道
    event.replaceInput(
        { output:"pipez:universal_pipe" },
        '#forge:storage_blocks/redstone',
        'kubejs:logistical_engineering'
    )
    event.replaceInput(
        { output:"pipez:universal_pipe" },
        '#forge:ingots/iron',
        '#forge:nuggets/terrasteel'
    )
})