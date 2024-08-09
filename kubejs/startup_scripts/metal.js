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

  //钢铸造相关
  event.create("casting_base").displayName('Casting Base')
  event.create("casting_seal").displayName('Casting Seal')
  event.create("incomplete_filled_casting_mold_small", 'create:sequenced_assembly').displayName('Incomplete Filled Casting Mold')
  event.create("filled_casting_mold_small").displayName('Filled Casting Mold')
  event.create("incomplete_filled_casting_mold_large", 'create:sequenced_assembly').displayName('Incomplete Filled Casting Mold')
  event.create("filled_casting_mold_large").displayName('Filled Casting Mold')

  //金-银混合物
  event.create("gold_silver_mix").displayName('Gold-Silver Mix')

  //Undergarden适配
  event.create("crushed_froststeel_ore").displayName('Crushed Frost Steel Ore').texture('kubejs:item/undergarden_compat/crushed_froststeel_ore')
  event.create("crushed_cloggrum_ore").displayName('Crushed Cloggrum Ore').texture('kubejs:item/undergarden_compat/crushed_cloggrum_ore')
  event.create("froststeel_plate").displayName('Frost Steel Plate').texture('kubejs:item/undergarden_compat/froststeel_plate')
  event.create("cloggrum_plate").displayName('Cloggrum Plate').texture('kubejs:item/undergarden_compat/cloggrum_plate')
  event.create("froststeel_dust").displayName('Frost Steel Grit').texture('kubejs:item/undergarden_compat/froststeel_dust')
  event.create("cloggrum_dust").displayName('Cloggrum Grit').texture('kubejs:item/undergarden_compat/cloggrum_dust')
  event.create("forgotten_plate").displayName('Forgotten Plate').texture('kubejs:item/undergarden_compat/forgotten_plate')

  //Blueskies几种粉
  event.create("ventium_dust").displayName('Ventium Grit').texture('kubejs:item/blueskies_compat/ventium_dust')
  event.create("horizonite_dust").displayName('Horizonite Grit').texture('kubejs:item/blueskies_compat/horizonite_dust')
  event.create("falsite_dust").displayName('Falsite Grit').texture('kubejs:item/blueskies_compat/falsite_dust')
  event.create("charoite_dust").displayName('Charoite Grit').texture('kubejs:item/blueskies_compat/charoite_dust')
  event.create("aquite_dust").displayName('Aquite Grit').texture('kubejs:item/blueskies_compat/aquite_dust')

  //新材料
  event.create("crushed_raw_bauxite").displayName('Crushed Raw Bauxite')
  event.create("frostfire_double_plate").displayName('Frostfire Double Plate').texture('kubejs:item/undergarden_compat/frostfire_double_plate')
  event.create("forgotten_mechanism").displayName('Forgotten Mechanism').texture('kubejs:item/forgotten_mechanism')
  event.create("incomplete_forgotten_mechanism", 'create:sequenced_assembly').displayName('Incomplete Forgotten Mechanism').texture('kubejs:item/incomplete_forgotten_mechanism')
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
