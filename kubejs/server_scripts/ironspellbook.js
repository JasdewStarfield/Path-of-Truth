//此文件提供铁魔法系列修改
ServerEvents.recipes(event => {
    //修改背包配方
    event.remove({id:'sophisticatedbackpacks:backpack'})
    event.shaped(Item.of('sophisticatedbackpacks:backpack',1),
        ['BAB',
        'BCB',
        'DED'],
        {
            A:'#forge:leather',
            B:'#forge:string',
            C:'#balm:wooden_chests',
            D:'irons_spellbooks:magic_cloth',
            E:'create:andesite_alloy'
        }
    )
    
    //修改奥术布匹配方
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:magic_cloth'},
    '#minecraft:wool', 'immersiveengineering:hemp_fabric' )

    //修改法师护甲配方
    event.remove({id:'irons_spellbooks:wandering_magician_helmet'})
    event.remove({id:'irons_spellbooks:wandering_magician_chestplate'})
    event.remove({id:'irons_spellbooks:wandering_magician_leggings'})
    event.remove({id:'irons_spellbooks:wandering_magician_boots'})
    event.shaped(Item.of('irons_spellbooks:wandering_magician_helmet',1),
        ['AAA',
        'ABA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'#forge:ingots/copper'
        }
    )
    event.shaped(Item.of('irons_spellbooks:wandering_magician_chestplate',1),
        ['ABA',
        'AAA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'#forge:ingots/copper'
        }
    )
    event.shaped(Item.of('irons_spellbooks:wandering_magician_leggings',1),
        ['AAA',
        'ABA',
        'A A'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'#forge:ingots/copper'
        }
    )
    event.shaped(Item.of('irons_spellbooks:wandering_magician_boots',1),
        ['A A',
        'ABA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'#forge:ingots/copper'
        }
    )

})