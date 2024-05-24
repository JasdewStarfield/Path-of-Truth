StartupEvents.registry('item', (event) => {
  //青铜一套
  event.create("bronze_dust").displayName('Bronze Grit').texture('kubejs:item/bronze/bronze_dust')
  event.create("bronze_ingot").displayName('Bronze Ingot').texture('kubejs:item/bronze/bronze_ingot')
  event.create("bronze_nugget").displayName('Bronze Nugget').texture('kubejs:item/bronze/bronze_nugget')
  event.create("bronze_sheet").displayName('Bronze Sheet').texture('kubejs:item/bronze/bronze_sheet')

  event.create("bronze_sword",'sword').displayName('Bronze Sword').tier('bronze').texture('kubejs:item/bronze/bronze_sword')
  event.create("bronze_pickaxe",'pickaxe').displayName('Bronze Pickaxe').tier('bronze').texture('kubejs:item/bronze/bronze_pickaxe')
  event.create("bronze_axe",'axe').displayName('Bronze Axe').tier('bronze').texture('kubejs:item/bronze/bronze_axe')
  event.create("bronze_shovel",'shovel').displayName('Bronze Shovel').tier('bronze').texture('kubejs:item/bronze/bronze_shovel')
  event.create("bronze_hoe",'hoe').displayName('Bronze Hoe').tier('bronze').texture('kubejs:item/bronze/bronze_hoe')

  /*
  event.create("bronze_helmet",'helmet').displayName('Bronze Helmet').tier('bronze')
  event.create("bronze_chestplate",'chestplate').displayName('Bronze Chestplate').tier('bronze')
  event.create("bronze_leggings",'leggings').displayName('Bronze Leggings').tier('bronze')
  event.create("bronze_boots",'boots').displayName('Bronze Boots').tier('bronze')
  */

  //补充：锌粉，锡粉
  event.create("zinc_dust").displayName('Zinc Grit')
  event.create("tin_dust").displayName('Tin Grit')

  //粗安山合金
  event.create("raw_andesite_alloy").displayName('Raw Andesite Alloy')

  //未完成的黄铜
  event.create("incomplete_brass_ingot", 'create:sequenced_assembly').displayName('Incomplete Brass Ingot')

  //金-银混合物
  event.create("gold_silver_mix").displayName('Gold-Silver Mix')
})

StartupEvents.registry('block', (event) => {
  //青铜块
  event.create('bronze_block')
		.displayName('Block of Bronze')
		.soundType("copper")
		.mapColor("metal")
		.hardness(3.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock("minecraft:needs_stone_tool")
    .tagItem("forge:storage_blocks")
    .tagItem("forge:storage_blocks/bronze")
		.opaque(true)
		.fullBlock(true)
		.renderType('solid')
		.textureAll('kubejs:block/bronze_block')
})