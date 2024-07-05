ServerEvents.recipes(event => {
    //硅胶（哇袄！！！）
    event.remove({id:"refinedstorage:silicon"})
    event.recipes.create.mixing('refinedstorage:silicon', ['#forge:gems/quartz','#forge:gems/quartz','#forge:gems/quartz','#forge:gems/quartz','blaze_powder',Fluid.of('lava',500)]).superheated()

    //富石英铁
    event.remove({id:"refinedstorage:quartz_enriched_iron"})
    event.recipes.create.mixing('4x refinedstorage:quartz_enriched_iron', ['#forge:ingots/iron','#forge:ingots/iron','#forge:ingots/iron','#forge:ingots/iron','botania:quartz_mana','botania:quartz_blaze','botania:quartz_elven','botania:quartz_dark']).superheated()

    //移除这个很难看的机壳
    event.remove({id:"refinedstorage:machine_casing"})

    //机壳替换为电子工程块
    event.replaceInput(
        { input:"refinedstorage:machine_casing" },
        'refinedstorage:machine_casing',
        'kubejs:electronic_engineering'
    )

    //线缆增加物流工程块，通用管道
    event.replaceInput(
        { output:"refinedstorage:cable" },
        'redstone',
        'kubejs:logistical_engineering'
    )
    event.replaceInput(
        { output:"refinedstorage:cable" },
        '#forge:glass',
        'pipez:universal_pipe'
    )
})