//储物袋系列修改
ServerEvents.recipes(event => {
    
    //普通与皮革
    event.shapeless(Item.of('minecraft:bundle',1),
        [
            'metalbundles:leather_bundle'
        ]
    )

    //铜（青铜）
    event.remove({id:'metalbundles:copper_bundle_smithing_transform'})
    event.custom({
        "type": "metalbundles:legacy_smithing_transform",
        "addition": {
            "item": 'kubejs:bronze_ingot'
        },
        "base": {
            "item": "metalbundles:leather_bundle"
        },
        "result": {
            "item": "metalbundles:copper_bundle"
        },
        "template": []
    })
    //铁（源质钢）
    event.remove({id:'metalbundles:iron_bundle_smithing_transform'})
    event.custom({
        "type": "metalbundles:legacy_smithing_transform",
        "addition": {
            "item": 'botania:elementium_ingot'
        },
        "base": {
            "item": "metalbundles:copper_bundle"
        },
        "result": {
            "item": "metalbundles:iron_bundle"
        },
        "template": []
    })
    //金（虚空钢）
    event.remove({id:'metalbundles:golden_bundle_smithing_transform'})
    event.custom({
        "type": "metalbundles:legacy_smithing_transform",
        "addition": {
            "item": 'createutilities:void_steel_ingot'
        },
        "base": {
            "item": "metalbundles:iron_bundle"
        },
        "result": {
            "item": "metalbundles:golden_bundle"
        },
        "template": []
    })
    //钻石（待修改）
    event.remove({id:'metalbundles:diamond_bundle_smithing_transform'})
    event.custom({
        "type": "metalbundles:legacy_smithing_transform",
        "addition": {
            "item": 'minecraft:bedrock'
        },
        "base": {
            "item": "metalbundles:golden_bundle"
        },
        "result": {
            "item": "metalbundles:diamond_bundle"
        },
        "template": []
    })

})