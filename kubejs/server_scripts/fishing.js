//钓鱼相关的修改扔到这里
ServerEvents.recipes(event => {

    //渔夫工作台配方替换
    event.replaceInput({mod:'tide',output:'tide:angler_workshop'},
    'minecraft:iron_nugget', 'kubejs:bronze_nugget')

    event.remove({id:"netherdepthsupgrade:lava_fishing_rod"})

})