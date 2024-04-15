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

    //修改木质法杖配方
    event.remove({id:'irons_spellbooks:graybeard_staff'})
    event.shaped(Item.of('irons_spellbooks:graybeard_staff',1),
        ['  A',
        ' B ',
        'C  '],
        {
            A:'irons_spellbooks:arcane_essence',
            B:'kubejs:bronze_shovel',
            C:'#forge:ingots'
        }
    )

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

    //修改法术书系列配方
    event.remove({id:'irons_spellbooks:iron_spell_book'})
    event.remove({id:'irons_spellbooks:gold_spell_book'})
    event.remove({id:'irons_spellbooks:diamond_spell_book'})
    event.shaped(Item.of('irons_spellbooks:iron_spell_book',1),
        ['ABB',
        'ACD',
        'ABB'],
        {
            A:'minecraft:chain',
            B:'#forge:leather',
            C:'irons_spellbooks:copper_spell_book',
            D:'minecraft:paper'
        }
    )
    event.shaped(Item.of('irons_spellbooks:gold_spell_book',1),
        ['ABB',
        'ACD',
        'ABB'],
        {
            A:'#forge:ingots/brass',
            B:'#forge:leather',
            C:'irons_spellbooks:iron_spell_book',
            D:'irons_spellbooks:arcane_ingot'
        }
    )
    event.shaped(Item.of('irons_spellbooks:diamond_spell_book',1),
        ['ABB',
        'ACD',
        'ABB'],
        {
            A:'botania:mana_diamond',
            B:'irons_spellbooks:hogskin',
            C:'irons_spellbooks:gold_spell_book',
            D:'bloodmagic:apprenticebloodorb'
        }
    )

    //修改传说法术书配方
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:netherite_spell_book'},
    'irons_spellbooks:lightning_bottle', 'botania:terrasteel_ingot' )
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:dragonskin_spell_book'},
    'minecraft:obsidian', 'botania:terrasteel_ingot' )

    //奥术铁砧配方重写
    event.remove({id:'irons_spellbooks:arcane_anvil'})
    event.shaped(Item.of('irons_spellbooks:arcane_anvil',1),
        ['ABA',
        ' C ',
        'EDE'],
        {
            A:'botania:manasteel_block',
            B:'minecraft:amethyst_block',
            C:'botania:terrasteel_ingot',
            D:'#minecraft:anvil',
            E:'minecraft:polished_deepslate'
        }
    )

})