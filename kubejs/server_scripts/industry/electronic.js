ServerEvents.recipes(event => {
    //电子管
    event.remove({id:"create:crafting/materials/electron_tube"})
    event.recipes.create.deploying('create:electron_tube', ['#forge:plates/iron', 'create:polished_rose_quartz'])

    //引力子管
    event.remove({id:"createutilities:shaped/graviton_tube"})
    event.recipes.create.deploying('createutilities:graviton_tube', ['createutilities:void_steel_sheet', 'createutilities:polished_amethyst'])

    //精密构件
    event.remove({id:"create:sequenced_assembly/precision_mechanism"})
    let inter = 'create:incomplete_precision_mechanism'
    event.recipes.create.sequenced_assembly([
        Item.of('create:precision_mechanism').withChance(90.0),
        Item.of('#forge:plates/silver').withChance(5.0),
        Item.of('create:cogwheel').withChance(1.5),
        Item.of('create:large_cogwheel').withChance(1.5),
        Item.of('create:electron_tube').withChance(2.0)
    ], '#forge:plates/gold', [
        event.recipes.createDeploying(inter, [inter, 'create:cogwheel']),
        event.recipes.createDeploying(inter, [inter, 'create:large_cogwheel']),
        event.recipes.createDeploying(inter, [inter, '#blue_skies:gems/moonstone_shard']),
        event.recipes.createDeploying(inter, [inter, 'create:electron_tube']),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(3)

    event.recipes.create.sequenced_assembly([
        Item.of('create:precision_mechanism')
    ], '#forge:plates/gold', [
        event.recipes.createFilling(inter, [inter, {fluidTag: 'forge:lubricant', amount:25}]),
        event.recipes.createDeploying(inter, [inter, 'create:cogwheel']),
        event.recipes.createDeploying(inter, [inter, 'create:large_cogwheel']),
        event.recipes.createDeploying(inter, [inter, '#blue_skies:gems/moonstone_shard']),
        event.recipes.createDeploying(inter, [inter, 'create:electron_tube']),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(3)

    //电池
    event.replaceInput(
        { output:"immersiveengineering:capacitor_lv" },
        '#forge:ingots/iron',
        '#forge:ingots/steel'
    )
    event.replaceInput(
        { output:"immersiveengineering:capacitor_mv" },
        '#forge:plates/nickel',
        '#forge:plates/electrum'
    )

    //琥珀金（解锁中压传输）
    event.recipes.create.mixing('kubejs:gold_silver_mix', ['#forge:dusts/silver','#forge:dusts/silver','#forge:dusts/silver','#forge:dusts/gold','#forge:dusts/gold','#forge:dusts/gold','#forge:dusts/gold','#forge:dusts/gold'])
    event.remove({id:"immersiveengineering:crafting/electrum_mix"})
    event.remove({id:"immersiveengineering:arcfurnace/alloy_electrum"})
    event.custom({
        "type":"immersiveengineering:squeezer",
        "energy":6400,
        "input":{
            "base_ingredient":{"item":"kubejs:gold_silver_mix"},
            "count":1
        },
        "result":{
            "tag":"forge:dusts/electrum"
        }
    })
    event.custom({
        "type":"immersiveengineering:arc_furnace",
        "additives":[],
        "energy":102400,
        "additives":[{"base_ingredient":{"tag":"forge:dusts/silver"},"count":3}],
        "input":{"base_ingredient":{"tag":"forge:dusts/gold"},"count":5},
        "results":[{"tag":"forge:ingots/electrum"}],
        "time":200
    })

    //限制热传导发电
    event.replaceInput(
        { output:"immersiveengineering:thermoelectric_generator" },
        'immersiveengineering:coil_lv',
        'immersiveengineering:coil_mv'
    )

    //散热方块
    //这玩意配方比较神秘，只能用数据覆盖的方法改。参见data文件夹

    //初级磁铁磁化量产
    /*
    event.custom({
        "type": "create_new_age:energising",
        "energy_needed": 4000,
        "ingredients": [
          {
            "tag": "forge:storage_blocks/raw_iron"
          }
        ],
        "results": [
          {
            "item": "create_new_age:magnetite_block"
          }
        ]
    })
    */

    //终极合成！
    let inter2 = 'kubejs:incomplete_buran'
    event.recipes.create.sequenced_assembly([
        'kubejs:buran'
    ], 'create:crafting_blueprint', [
        event.recipes.createDeploying(inter2, [inter2, 'kubejs:andesite_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'kubejs:fluid_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'kubejs:precise_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'kubejs:logistical_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'immersiveengineering:light_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'immersiveengineering:rs_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'immersiveengineering:heavy_engineering']),
        event.recipes.createDeploying(inter2, [inter2, 'kubejs:electronic_engineering']),
    ]).transitionalItem(inter2).loops(4)
})