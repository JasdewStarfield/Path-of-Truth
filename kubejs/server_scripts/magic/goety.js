//需求配方列表
    //酋长蟹炼制
    //碎铁矿兑换炙铁碎矿
    //榴石，月长和透辉的兑换
    //虚空蠕虫之眼制造瞻远者刷怪蛋
    //箱子炼制宝箱怪
    //潜影盒活化为潜影贝
    //魔力风暴催化
    //复刻凝胶变化
    //硫磺转烈焰粉
    //盖亚之魂合成奥术残骸
    //灰烬源质转化
    //原版蘑菇-双孢菇转化
    //海潮蛤-鹦鹉螺壳转化
    //点盖亚成下界合金
    //点下界合金成遗忆锭
    //下界合金盔甲注入盖亚之魂活化
    //点钻成绛紫晶
    //磁铁升级（红石-铁金）
    //龙蛋催化
    //凋零骷髅刷怪蛋合成
    //下界之星聚合
    //矿物处理（其他矿脉适配）
    //感谢工业完成的碎矿，这样魔法就可以直接接入了
    //榴石，月长石，透辉石，霜钢，扼塞，缪铁，镰鼬铁，炙铁，绛紫晶，天闪石，锌，锡

ServerEvents.recipes(event => {
    //根之图腾移除与合成
    //根之图腾移除
    event.remove({output:'goety:totem_of_roots'})
    //根之图腾合成
    event.shaped(
        Item.of('goety:totem_of_roots'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            B: '#botania:livingwood_logs',
            A: 'irons_spellbooks:arcane_essence',
            C: 'irons_spellbooks:copper_spell_book',
            D: 'botania:livingrock'
        }
    )
    
    //磁石替换核心（灵魂方舟要用）
    event.replaceInput({mod:'minecraft',output:'minecraft:lodestone'},
        'minecraft:netherite_ingot' , '#forge:ingots/steel')
    
    //灵魂图腾移除与新激活
    event.remove({output:'goety:totem_of_souls'})
    //耗尽的灵魂图腾合成
    event.shaped(
        Item.of('goety:spent_totem'),
        [
            ' A ',
            'BCB',
            ' D '
        ],
        {
            A: 'irons_spellbooks:arcane_ingot',
            C: 'goety:magic_emerald',
            D: 'goety:totem_of_roots',
            B: 'botania:livingrock'
        }
    )
    //灵魂图腾合成
    event.shaped(
        Item.of('goety:totem_of_souls'),
        [
            'A A',
            ' B ',
            '   '
        ],
        {
            B: 'goety:spent_totem',
            A: 'goety:magic_emerald'
        }
    )

    //诅咒之笼移除
    event.remove({output:'goety:cursed_cage'})
    //诅咒之笼合成
    event.shaped(
        Item.of('goety:cursed_cage'),
        [
            'ABA',
            'BCB',
            'ABA'
        ],
        {
            C: 'goety:empty_focus',
            B: 'irons_spellbooks:arcane_essence',
            A: 'goety:cursed_bars'
        }
    )
    
    //祭坛底座移除
    event.remove({output:'goety:pedestal'})
    //祭坛底座合成
    event.shaped(
        Item.of('8x goety:pedestal'),
        [
            'AAA',
            ' B ',
            'CDC'
        ],
        {
            D: 'botania:life_essence',
            B: 'irons_spellbooks:arcane_anvil',
            C: 'goety:haunted_planks',
            A: 'goety:shade_stone'
        }
    )

    //祭坛移除
    event.remove({output:'goety:dark_altar'})
    //祭坛合成
    event.shaped(
        Item.of('4x goety:dark_altar'),
        [
            'ABA',
            ' C ',
            'DED'
        ],
        {
            D: 'irons_spellbooks:arcane_salvage',
            C: 'goety:pedestal',
            E: 'goety:cursed_ingot',
            B: 'botania:mana_gun',
            A: 'goety:shade_stone_bricks'
        }
    )

    //幽匿收集器配方修改
    event.replaceInput({mod:'goety',output:'goety:sculk_devourer'},
        'goety:magic_emerald' , 'goety:pedestal')

    //雷霆聚晶配方修改
    event.replaceInput({mod:'goety',output:'goety:thunderbolt_focus'},
        'minecraft:redstone_block' , 'irons_spellbooks:lightning_bottle')

    //诅咒注入器配方替换
    event.replaceInput({mod:'goety',output:'goety:cursed_infuser'},
        'minecraft:cauldron' , 'botania:terrasteel_ingot')
    event.replaceInput({mod:'goety',output:'goety:cursed_infuser'},
        'minecraft:lapis_lazuli' , 'goety:cursed_ingot')

    //复刻凝胶复制
    event.shaped(
        Item.of('alexsmobs:mimicream', 16),
        [
            'ABA',
            'BCB',
            'ABA'
        ],
        {
            A: 'botania:overgrowth_seed',
            B: 'alexsmobs:mimicream',
            C: 'goety:philosophers_stone'
        }
    )

    //诅咒注入系列配方
    //灵质转化
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'botania:mana_powder'
        },
        "result": 'goety:ectoplasm',
        "cookingTime": 40
    })
    //暗影精粹
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'goety:cursed_metal_block'
        },
        "result": 'goety:shadow_essence',
        "cookingTime": 1200
    })
    //末影珍珠（末影人遍地都是所以这个也不值钱）
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item": 'minecraft:slime_ball'
        },
        "result": 'minecraft:ender_pearl',
        "cookingTime": 600
    })


    //仪式配方修改系列
    //撕裂聚晶合成
    event.remove({id:'goety:focus/rupture_focus'})
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",
        "activation_item": {
            "item": "goety:tunnel_focus"
        },
        "craftType": "magic",
        "soulCost": 500,
        "duration": 60,
        "ingredients": [
            {
            "item": 'kubejs:earth_elemental_core'
            },
            {
            "tag": "forge:ender_pearls"
            },
            {
            "item": 'kubejs:water_elemental_core'
            },
            {
            "tag": "forge:ender_pearls"
            },
            {
            "item": 'kubejs:fire_elemental_core'
            },
            {
            "item": "minecraft:dragon_head"
            },
            {
            "item": 'kubejs:wind_elemental_core'
            },
            {
            "item": "minecraft:dragon_breath"
            }
        ],
        "result": {
            "item": "goety:rupture_focus"
        }
    })
    //刷怪笼激活
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",//仪式主类型（制作）
        "activation_item": {
            "item": "goety:cursed_cage"//中心物品
        },
        "craftType": "forge",//仪式副类型（锻造）
        "soulCost": 1000,//每秒消耗
        "duration": 60,//时长
        "ingredients": [
            {
                "item": 'botania:overgrowth_seed'
            },
            {
                "item": 'botania:corporea_spark'
            },
            {
                "item": 'goety:rupture_focus'
            },
            {
                "item": 'irons_spellbooks:energized_core'
            }
        ],
        "result": {
            "item": 'minecraft:spawner'//实际产出
        }
    })
    

    //死灵火盆系列配方
    //启命英粉碎
    event.custom({
        "type": "goety:brazier",
        "soulCost": 2000,
        "ingredients": [
            {
                "item": "botania:dandelifeon"
            },
            {
                "item": "immersiveengineering:dust_steel"
            },
            {
                "item": "irons_spellbooks:cinder_essence"
            }
        ],
        "result": {
            "item": "botania:overgrowth_seed"
        }
    })
})