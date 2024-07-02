ServerEvents.recipes(event => {

    //修改初始背包配方
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

    //金和钻石背包修改
    event.remove({id:'sophisticatedbackpacks:gold_backpack'})
    event.shaped('sophisticatedbackpacks:gold_backpack',
        ['FAF',
        'BCD',
        'FEF'],
        {
            A:'irons_spellbooks:epic_ink',
            B:'botania:elementium_ingot',
            C:'sophisticatedbackpacks:iron_backpack',
            D:'bloodmagic:weak_tau',
            E:'botania:terrasteel_ingot',
            F:'#forge:ingots/gold'
        }
    )

    event.remove({id:'sophisticatedbackpacks:diamond_backpack'})
    event.shaped('sophisticatedbackpacks:diamond_backpack',
        ['FAF',
        'BCD',
        'FEF'],
        {
            A:'irons_spellbooks:legendary_ink',
            B:'botania:dragonstone',
            C:'sophisticatedbackpacks:gold_backpack',
            D:'bloodmagic:strong_tau',
            E:'bloodmagic:ingot_hellforged',
            F:'botania:mana_diamond'
        }
    )

})