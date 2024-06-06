LootJS.modifiers((event) => {
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("immersiveengineering:ingot_aluminum", "copper_ingot", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("immersiveengineering:stick_aluminum", "immersiveengineering:stick_iron", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("iron_block", "raw_iron_block", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("iron_ingot", "raw_iron", true)
    event.addLootTypeModifier(LootType.CHEST).replaceLoot("iron_nugget", "minecraft:copper_nugget", true)
    event.addLootTypeModifier(LootType.ENTITY).replaceLoot("iron_ingot", "raw_iron", true)
    event.addLootTableModifier(/.*/).removeLoot("netherite_ingot")
    event.addBlockLootModifier("#minecraft:replaceable_by_trees").removeLoot("minecraft:wheat_seeds")
    event.addBlockLootModifier("#minecraft:replaceable_by_trees").removeLoot("immersiveengineering:seeds")
    event.addLootTypeModifier(LootType.CHEST).removeLoot(Item.of('minecraft:enchanted_book').enchant('supplementaries:stasis', 1))

    event
        .addLootTableModifier(/.*blue_skies:chests.*dungeon.*/)
        .randomChance(0.1)
        .addLoot("kubejs:disc_fragment_yggdrasil");
})
