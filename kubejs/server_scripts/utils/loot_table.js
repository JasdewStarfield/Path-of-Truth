LootJS.modifiers((event) => {
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("immersiveengineering:ingot_aluminum", "copper_ingot", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("immersiveengineering:stick_aluminum", "immersiveengineering:stick_iron", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("iron_block", "raw_iron_block", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("iron_ingot", "raw_iron", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("iron_nugget", "create:copper_nugget", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("botania:blacker_lotus", "botania:black_lotus", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("netherite_ingot", "ancient_debris", true)
    event.addLootTypeModifier(LootType.ENTITY).replaceLoot("iron_ingot", "raw_iron", true)
    event.addLootTypeModifier(LootType.ENTITY).replaceLoot("botania:blacker_lotus", "botania:black_lotus", true)
    event.addLootTableModifier(/.*/).removeLoot("netherite_ingot")
    event.addLootTableModifier(/.*/).removeLoot("goety:spent_totem")
    event.addLootTableModifier(/.*/).removeLoot("botania:overgrowth_seed")
    event.addBlockLootModifier("#minecraft:replaceable_by_trees").removeLoot("minecraft:wheat_seeds")
    event.addBlockLootModifier("#minecraft:replaceable_by_trees").removeLoot("immersiveengineering:seed")
    event.addBlockLootModifier("#minecraft:snow").removeLoot("minecraft:wheat_seeds")
    event.addBlockLootModifier("#minecraft:snow").removeLoot("immersiveengineering:seed")

    //在蔚蓝浩空的地牢箱子中有小概率生成冒险唱片碎片
    event
        .addLootTableModifier(/.*blue_skies:chests.*dungeon.*/)
        .randomChance(0.25)
        .addLoot("kubejs:disc_fragment_yggdrasil")
    //彩蛋物品，流浪商人概率掉落，必须由玩家击败，且玩家必须拥有不祥之兆效果
    event
        .addLootTableModifier("minecraft:entities/wandering_trader")
        .randomChance(0.1)
        .killedByPlayer()
        .matchKiller((entity) => {
            entity.hasEffect("minecraft:bad_omen")
        })
        .addLoot("kubejs:sword_o_justice")
        .damage([0.3, 0.9])
})