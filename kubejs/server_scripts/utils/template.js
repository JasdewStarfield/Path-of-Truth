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
/*
血魔法修改模板
//炼金术桌
event.custom({
    "type": "bloodmagic:alchemytable",
    "input": [
        {
            "item": "bloodmagic:weak_tau"
        },
        {
            "item": "bloodmagic:weak_tau"
        },
        {
            "item": "bloodmagic:weak_tau"
        },
        {
            "item": "minecraft:bone_meal"
        }
    ],
    "output": {
        "item": "bloodmagic:tauoil"
    },
    "syphon": 500,
    "ticks": 200,
    "upgradeLevel": 3
})
//祭坛
event.custom({
    "type": "bloodmagic:altar",
    "altarSyphon": 2000,
    "consumptionRate": 5,
    "drainRate": 1,
    "input": {
        "tag": "forge:gems/diamond"
    },
    "output": {
        "item": "bloodmagic:weakbloodorb"
    },
    "upgradeLevel": 0
})
//炼金矩阵
event.custom({
    "type": "bloodmagic:array",
    "addedinput": {
        "item": "第二输入"
    },
    "baseinput": {
        "item": "第一输入"
    },
    "output": {
        "item": "输出"
    },
    "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
})
//灵魂锻炉
event.custom({
    "type": "bloodmagic:soulforge",
    "drain": 2.0,//单次吸收量
    "input0": {
        "tag": "forge:stone"
    },
    "input1": {
        "tag": "forge:glass"
    },
    "minimumDrain": 10.0,//要求使用材料的最低容量
    "output": {
        "count": 8,//生成数量
        "item": "bloodmagic:throwing_dagger_syringe"
    }
})
//抽象炼金台
event.custom({
    "type": "bloodmagic:arc",
    //可能存在的追加输出（可以不写）
    "addedoutput": [
        {
        "type": {
            "item": "minecraft:clay_ball"
        },
        "chance": 0.5,
        "mainchance": 0.0
        }
    ],
    //消耗配方（？）
    "consumeingredient": false,
    //输入材料
    "input": {
        "tag": "forge:sand"
    },
    //输入液体（可以不写）
    "inputFluid": {
        "amount": 200,
        "fluid": "minecraft:water"
    },
    //输入数量（大概）
    "inputsize": 1,
    //主要产物输出几率
    "mainoutputchance": 0.0,
    //输出产物内容
    "output": {
        "count": 3,//输出数量（可以不写）
        "item": "minecraft:clay_ball"
    },
    //输出液体（可以不写）
    "outputFluid": {
        "amount": 50,
        "fluid": "minecraft:lava"
    },
    //使用工具（必须是血魔法原有工具）
    "tool": {
        "tag": "bloodmagic:arc/hydrate"
    }
})

*/