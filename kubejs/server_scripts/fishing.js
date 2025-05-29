//钓鱼相关的修改扔到这里
ServerEvents.recipes(event => {

    //渔夫工作台配方替换
    event.replaceInput({mod:'tide',output:'tide:angler_workshop'},
    'minecraft:iron_nugget', 'kubejs:bronze_nugget')

    //移除熔岩钓竿
    event.remove({id:"netherdepthsupgrade:lava_fishing_rod"})

    //添加三叉戟配方
    event.shaped(
        Item.of('minecraft:trident'),
        [
            'ABA',
            'ACA',
            ' D '
        ],
        {
            A: 'minecraft:prismarine_shard',
            B: 'tide:aquathorn',
            C: 'minecraft:prismarine_crystals',
            D: 'immersiveengineering:stick_steel'
        }
    )

    //添加召星者
    event.shaped(
        Item.of('botania:star_sword'),
        [
            '  A',
            'BA ',
            'CB '
        ],
        {
            A: 'botania:elementium_ingot',
            C: 'tide:shooting_starfish',
            B: 'irons_spellbooks:cinder_essence'
        }
    )
})