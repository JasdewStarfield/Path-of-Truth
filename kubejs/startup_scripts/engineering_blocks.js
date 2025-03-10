StartupEvents.registry('item', (event) => {
	//序列组装半成品
	event.create("incomplete_andesite_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_andesite_engineering").displayName('Incomplete Mechanical Engineering Block')
	event.create("incomplete_fluid_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_fluid_engineering").displayName('Incomplete Fluid Engineering Block')
	event.create("incomplete_precise_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_precise_engineering").displayName('Incomplete Precise Engineering Block')
	event.create("incomplete_light_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_light_engineering").displayName('Incomplete Light Engineering Block')
	event.create("incomplete_heavy_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_heavy_engineering").displayName('Incomplete Heavy Engineering Block')
	event.create("incomplete_rs_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_rs_engineering").displayName('Incomplete Sensory Engineering Block')
	event.create("incomplete_component_electronic_adv", 'create:sequenced_assembly').displayName('Incomplete Advanced Electronic Component')
	event.create("incomplete_radiator", 'create:sequenced_assembly').parentModel("immersiveengineering:block/radiator").displayName('Incomplete Radiator Block')
	event.create("incomplete_logistical_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_logistical_engineering").displayName('Incomplete Logistical Engineering Block')
	event.create("incomplete_electronic_engineering", 'create:sequenced_assembly').parentModel("kubejs:item/incomplete_electronic_engineering").displayName('Incomplete Electronic Engineering Block')
})

StartupEvents.registry('block', (event) => {
  	//动力工程块
  	event.create('andesite_engineering')
		.displayName('Mechanical Engineering Block')
		.soundType("copper")
		.mapColor("metal")
		.hardness(3.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock("minecraft:needs_stone_tool")
		.opaque(true)
		.fullBlock(true)
		.renderType('solid')
		.item(item => {
			item.rarity('uncommon')
		})
		.model('kubejs:block/andesite_engineering')
	//流体工程块
	event.create('fluid_engineering')
		.displayName('Fluid Engineering Block')
		.soundType("copper")
		.mapColor("metal")
		.hardness(3.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock("minecraft:needs_stone_tool")
		.opaque(true)
		.fullBlock(true)
		.renderType('solid')
		.item(item => {
			item.rarity('uncommon')
		})
		.model('kubejs:block/fluid_engineering')
	//精密工程块
	event.create('precise_engineering')
		.displayName('Precise Engineering Block')
		.soundType("copper")
		.mapColor("metal")
		.hardness(3.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock("minecraft:needs_stone_tool")
		.opaque(true)
		.fullBlock(true)
		.renderType('solid')
		.item(item => {
			item.rarity('rare')
		})
		.model('kubejs:block/precise_engineering')
	//电子工程块
	event.create('electronic_engineering')
		.displayName('Electronic Engineering Block')
		.soundType("copper")
		.mapColor("metal")
		.hardness(3.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock("minecraft:needs_stone_tool")
		.opaque(true)
		.fullBlock(true)
		.renderType('solid')
		.item(item => {
			item.rarity('epic')
		})
		.model('kubejs:block/electronic_engineering')
	//物流工程块
	event.create('logistical_engineering')
		.displayName('Logistical Engineering Block')
		.soundType("copper")
		.mapColor("metal")
		.hardness(3.0)
		.resistance(6.0)
		.requiresTool(true)
		.tagBlock("mineable/pickaxe")
		.tagBlock("minecraft:needs_stone_tool")
		.opaque(true)
		.fullBlock(true)
		.renderType('solid')
		.item(item => {
			item.rarity('uncommon')
		})
		.model('kubejs:block/logistical_engineering')
})