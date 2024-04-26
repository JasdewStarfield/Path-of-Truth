ServerEvents.recipes(event => {
    //机械手和电子管
    event.replaceInput(
        { output:"create:deployer" },
        'create:electron_tube',
        'create:polished_rose_quartz'
    )
    event.remove({id:"create:crafting/materials/electron_tube"})
    event.recipes.create.deploying('create:electron_tube', ['#forge:plates/brass', 'create:polished_rose_quartz'])

    //精密零件
    event.remove({id:"create:sequenced_assembly/precision_mechanism"})
    let inter = 'create:incomplete_precision_mechanism'
    event.recipes.create.sequenced_assembly([
        Item.of('create:precision_mechanism').withChance(80.0),
        Item.of('kubejs:precise_engineering').withChance(10.0),
        Item.of('create:cogwheel').withChance(3.0),
        Item.of('create:large_cogwheel').withChance(3.0),
        Item.of('create:electron_tube').withChance(3.0),
        Item.of('supplementaries:ash').withChance(1.0)
    ], 'kubejs:precise_engineering', [
        event.recipes.createDeploying(inter, [inter, 'create:cogwheel']),
        event.recipes.createDeploying(inter, [inter, 'create:large_cogwheel']),
        event.recipes.createDeploying(inter, [inter, '#forge:nuggets/zinc']),
        event.recipes.createDeploying(inter, [inter, 'create:electron_tube']),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(5)

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
    event.recipes.create.mixing('kubejs:gold_silver_mix', ['#forge:dusts/silver','#forge:dusts/gold'])
    event.remove({id:"immersiveengineering:crafting/electrum_mix"})
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

    //散热方块
    //这玩意配方比较神秘，只能用数据覆盖的方法改。参见data文件夹

})