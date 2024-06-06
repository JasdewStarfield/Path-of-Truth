LootJS.modifiers((event) => {
    //钓鱼战利品表修改
    //不知道tide什么毛病
    //总之加个附魔书就是了
    event
        .addLootTableModifier("/.*fishing.*/")
        .randomChance(0.1)
        .pool((book) => {
            book.addLoot("minecraft:book");
            book.enchantWithLevels([1, 4], true);
            book.applyBinomialDistributionBonus("minecraft:luck_of_the_sea", 0.05, 1);
        });
        
    event
        .addLootTableModifier("/.*fishing.*/")
        .randomChance(0.1)
        .pool((mending) => {
            mending.addLoot("minecraft:book");
            mending.enchantRandomly(['minecraft:mending','minecraft:looting','minecraft:fortune','minecraft:unbreaking']);
            mending.applyBinomialDistributionBonus("minecraft:luck_of_the_sea", 0.05, 1);
        });


})