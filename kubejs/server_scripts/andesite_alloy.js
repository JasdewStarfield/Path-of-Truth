ServerEvents.recipes(event => {
    //移除原有配方
    event.remove({id:'create:crafting/materials/andesite_alloy'})
    event.remove({id:'create:crafting/materials/andesite_alloy_from_zinc'})
    event.remove({id:'create:mixing/andesite_alloy'})
    event.remove({id:'create:mixing/andesite_alloy_from_zinc'})
    event.remove({id:'create:compat/simplemetals_tin/crafting/materials/andesite_alloy_from_tin'})
    event.remove({id:'create:compat/simplemetals_tin/mixing/andesite_alloy_from_tin'})

    //新配方
    event.shaped(
        Item.of('kubejs:raw_andesite_alloy', 2),
        [ 
        'ABA', 
        'BCB',
        'ABA'
        ],
        {
        A: '#forge:nuggets/tin', 
        B: 'minecraft:andesite',
        C: 'botania:livingrock'
        }
    ).id('raw_andesite_alloy_manual_only')

    event.recipes.create.mixing('4x kubejs:raw_andesite_alloy', ['#forge:nuggets/tin','#forge:nuggets/tin','#forge:nuggets/tin','#forge:nuggets/tin','minecraft:andesite','minecraft:andesite','minecraft:andesite','minecraft:andesite','botania:livingrock'])
    event.blasting('create:andesite_alloy', 'kubejs:raw_andesite_alloy')
})