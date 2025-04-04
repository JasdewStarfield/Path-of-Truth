//模板储存区
/*
模组名列表：
铁魔法：irons_spellbooks
植物魔法：botania
诡厄巫法：goety
*/

/*
//保留nbt的有序合成
    //可以用于背包、法术书升级一类的需要保留“内容”的配方
    //result, shape, keys：你正常写有序合成的部分，直接粘贴就行
    //source：你需要保留nbt的那个物品
    //extraNBTs：额外添加的nbt，可以用来改法术书容量之类的
    function keepNBTShapedCrafting(result, shape, keys, source, extraNBTs) {
        let resultItem = Item.of(result)
        event.shaped(resultItem, shape, keys).modifyResult((grid, stack) => {
            let sourceNBTs = grid.find(source).nbt
            stack.nbt.merge(sourceNBTs)
            stack.nbt.merge(extraNBTs)
            return stack
        })
    }
*/

/*
借用模板的合成
    event.custom({
        "取决于其他mod的合成json"
    })
*/

/*
加入有序配方模板
    event.shaped(Item.of('名字',数量),
        ['***',
        '***',
        '***'],
        {
            *:'',
            *:'',
            *:''
        }
    )
*/
/*
加入无序配方模板
    event.shapeless(Item.of('名字',数量),
        [
            '材料1',
            '材料2',
            '材料3'
        ]
    )
*/
/*
替换配方系列
    event.replaceInput({mod:'模组名',output:'输出产物'},
        '要被替换的物品名' , '要替换成的物品名')
*/
/*
删除配方：
    event.remove({id:'名字'})
*/

/*
实体表现修改
EntityJSEvents.attributes(event => {
    event.modify('kubejs:redacted', attribute => {
        attribute.add("minecraft:generic.max_health", 100)
        attribute.add("minecraft:generic.armor", 10)
        attribute.add("minecraft:generic.armor_toughness", 5)
        attribute.add("minecraft:generic.movement_speed", 0.25)
        attribute.add("irons_spellbooks:spell_power", 1.5)
        attribute.add("irons_spellbooks:spell_resist", 1.5)
        attribute.add("additional_attributes:spell_general", 2)
    })
})
*/

/*
goety系列配方记录
时间单位：tick, 20tick=1s
    //诅咒注入器
    event.custom({
        "type": "goety:cursed_infuser_recipes",
        "ingredient": {
            "item/tag": "材料"
        },
        "result": "产出",
        "cookingTime": 处理时间
    })
    //仪式相关
    //仪式类型列表
    主类型：craft(制作),summon(召唤生物),summon_tamed(召唤驯服生物),convert_complete_tamed(转化驯服生物)
    副类型：
    forge(锻造),animation(活力),frost(冰霜),geoturgy(大地),magic(魔法),storm(风暴),deep(深渊),sabbath(安息),sky(天空),necromancy(死灵)
    (adept/expert_)nether((进阶/专家)下界)
    制作类模板：
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:craft",//仪式主类型（制作）
        "activation_item": {
            "item": "goety:cursed_cage"//中心物品
        },
        "craftType": "forge",//仪式副类型（锻造）
        "soulCost": 1,//每秒消耗
        "duration": 30,//时长
        "ingredients": [
            {
                "item": "1"
            },
            {
                "tag": "2"
            }
        ],
        "result": {
            "item": "3"//实际产出
        }
    })
    召唤生物类模板：
    event.custom({
        "type": "goety:ritual",
        "ritual_type": "goety:summon_tamed",//仪式主类型（生成生物）
        "activation_item": {
            "item": "minecraft:goat_horn"//输入材料
        },
        "craftType": "animation",//仪式副类型（活力）
        "entity_to_summon": "goety:twilight_goat",//即将生成的生物
        "soulCost": 1,
        "duration": 10,
        "ingredients": [
            {
                "item": "minecraft:wheat"
            },
            {
                "tag": "forge:bones"
            }
        ],
        "result": {
            "item": "goety:jei_dummy/none"//空输出
        }
    })
    //死灵火盆模板（最多只能有五个输入）
    event.custom({
        "type": "goety:brazier",
        "soulCost": 2000,
        "ingredients": [
            {
                "item": "1"
            },
            {
                "tag": "2"
            }
        ],
        "result": {
            "item": "3"
        }
    })
*/

/*
植物魔法系列配方记录：
onEvent("recipes", event => {
    //法力充能
    event.recipes.botania.mana_infusion("产出物", "原材料", 200, "下方催化方块")
    //精灵门交换
    event.recipes.botania.elven_trade(
        [
            "输出1", 
            "输出2"
        ], 
        [
            "输入1", 
            "输入2"
        ]
    )
    //白雏菊转化
    event.recipes.botania.pure_daisy("minecraft:acacia_button", "minecraft:acacia_leaves")
    event.recipes.botania.pure_daisy("minecraft:acacia_button", "minecraft:stone", 1)
    //植物炼药台
    //需要写进数据包
    //暂时无法使用，原因未知
    {
        "type": "botania:brew",
        "brew": "cold_sweat:ice_resistance",
        "ingredients": [
            {
                "item": "minecraft:nether_wart"
            },
            {
                "item": "cold_sweat:soul_sprout"
            },
            {
                "item": "minecraft:soul_sand"
            }
        ]
    }
    //花药台合成
    event.recipes.botania.petal_apothecary('item', 
        [
            'material1',
            'material2',
            'material3'
        ]
    )
    //符文祭坛
    event.recipes.botania.runic_altar("产物", 
        [
            "输入1", 
            "输入2"
        ], 
        5000
    )
    //泰拉凝聚板
    event.recipes.botania.terra_plate('产物', 
        [
            '输入1', 
            '输入2'
        ], 
        5000000
    )
    //？
    event.recipes.botania.orechid("minecraft:acacia_button", "minecraft:acacia_fence", 1)
    //？
    event.recipes.botania.orechid_ignem("minecraft:acacia_leaves", "minecraft:acacia_fence_gate", 1)
    //？
    event.recipes.botania.marimorphosis("minecraft:acacia_door", "minecraft:acacia_fence_gate", 1, ["plains"], 10)
})
*/
