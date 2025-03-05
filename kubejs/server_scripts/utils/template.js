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
