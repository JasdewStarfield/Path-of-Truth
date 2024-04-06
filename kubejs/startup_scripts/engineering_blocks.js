StartupEvents.registry('item', (event) => {
	//序列组装半成品
	event.create("incomplete_andesite_engineering").displayName('Incomplete Andesite Engineering Block')
})

StartupEvents.registry('block', (event) => {
  	//青铜块
  	event.create('andesite_engineering')
		.displayName('Andesite Engineering Block')
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
		.textureAll('kubejs:block/andesite_engineering')
})