//模板储存区
/*
模组名列表：
铁魔法：irons_spellbooks
植物魔法：botania
血魔法：bloodmagic
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
    //删除配方
    event.remove({ output: "botania:livingrock" })

    //法力充能
    event.recipes.botania.mana_infusion("产出物", "原材料", 200, "下方催化方块")
    //精灵门交换
    event.recipes.botania.elven_trade(["minecraft:acacia_boat"], "minecraft:diamond")
    event.recipes.botania.elven_trade(["minecraft:acacia_boat", "minecraft:acacia_button"], ["minecraft:diamond_block", "minecraft:gold_ingot"])
    //白雏菊转化
    event.recipes.botania.pure_daisy("minecraft:acacia_button", "minecraft:acacia_leaves")
    event.recipes.botania.pure_daisy("minecraft:acacia_button", "minecraft:stone", 1)
    //植物炼药台
    event.recipes.botania.brew("kubejs:torrent", ["minecraft:acacia_boat"])
    //花药台合成
    event.recipes.botania.petal_apothecary("minecraft:acacia_boat", ["minecraft:acacia_button"])
    //符文祭坛
    event.recipes.botania.runic_altar("minecraft:acacia_boat", ["minecraft:acacia_button", "minecraft:acacia_door"], 5000)
    //泰拉凝聚板
    event.recipes.botania.terra_plate("minecraft:acacia_boat", ["minecraft:acacia_button", "minecraft:acacia_door"], 5000000)
    //？
    event.recipes.botania.orechid("minecraft:acacia_button", "minecraft:acacia_fence", 1)
    //？
    event.recipes.botania.orechid_ignem("minecraft:acacia_leaves", "minecraft:acacia_fence_gate", 1)
    //？
    event.recipes.botania.marimorphosis("minecraft:acacia_door", "minecraft:acacia_fence_gate", 1, ["plains"], 10)
})
*/