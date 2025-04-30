StartupEvents.registry('item', (event) => {
	const INFINITE = Java.loadClass("java.lang.Integer").MAX_VALUE;
	//元素核心
	event.create("earth_elemental_core").displayName('Earth Elemental Core').texture('kubejs:item/elemental_core/earth').rarity('uncommon')
	event.create("water_elemental_core").displayName('Water Elemental Core').texture('kubejs:item/elemental_core/water').rarity('rare')
	event.create("fire_elemental_core").displayName('Fire Elemental Core').texture('kubejs:item/elemental_core/fire').rarity('rare')
	event.create("wind_elemental_core").displayName('Wind Elemental Core').texture('kubejs:item/elemental_core/wind').rarity('epic')

	//魔戒
	event.create("max_magic_ring")
		.maxStackSize(1)
		.displayName('Magic Ring')
		.texture('kubejs:item/max_magic_ring')
		.rarity('epic')
		.tag('curios:ring')

	//瓶子和三种药剂
	event.create("reinforced_bottle")
		.maxStackSize(16)
		.displayName('Reinforced Bottle')
		.texture('kubejs:item/final_potions/reinforced_bottle')
		.rarity('uncommon')

	event.create("potion_of_balance")
		.maxStackSize(1)
		.displayName('Potion of Balance')
		.texture('kubejs:item/final_potions/potion_of_balance')
		.rarity('epic')
		.useAnimation('drink')
		.useDuration(itemstack => 1)
    	.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			let effects = entity.potionEffects
			effects.add('cold_sweat:grace', INFINITE, 0, true, false)
			effects.add('irons_spellbooks:oakskin', INFINITE, 2, true, false)
			entity.give('kubejs:reinforced_bottle')
		})

	event.create("potion_of_void")
		.maxStackSize(1)
		.displayName('Potion of Void')
		.texture('kubejs:item/final_potions/potion_of_void')
		.rarity('epic')
		.useAnimation('drink')
		.useDuration(itemstack => 1)
    	.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			let effects = entity.potionEffects
			effects.add('minecraft:night_vision', INFINITE, 0, true, false)
			effects.add('irons_spellbooks:echoing_strikes', INFINITE, 4, true, false)
			entity.give('kubejs:reinforced_bottle')
		})
		
	event.create("potion_of_talent")
		.maxStackSize(1)
		.displayName('Potion of Talent')
		.texture('kubejs:item/final_potions/potion_of_talent')
		.rarity('epic')
		.useAnimation('drink')
		.useDuration(itemstack => 1)
    	.use((level, player, hand) => true)
		.finishUsing((itemstack, level, entity) => {
			let effects = entity.potionEffects
			effects.add('goety:insight', INFINITE, 2, true, false)
			effects.add('irons_spellbooks:instant_mana', INFINITE, 2, true, false)
			entity.give('kubejs:reinforced_bottle')
		})
})