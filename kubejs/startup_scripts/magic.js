StartupEvents.registry('item', (event) => {
	//元素核心
	event.create("earth_elemental_core").displayName('Earth Elemental Core').texture('kubejs:item/elemental_core/earth').rarity('uncommon')
	event.create("water_elemental_core").displayName('Water Elemental Core').texture('kubejs:item/elemental_core/water').rarity('rare')
	event.create("fire_elemental_core").displayName('Fire Elemental Core').texture('kubejs:item/elemental_core/fire').rarity('rare')
	event.create("wind_elemental_core").displayName('Wind Elemental Core').texture('kubejs:item/elemental_core/wind').rarity('epic')

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
			effects.add('cold_sweat:grace',2147483647,0)
			effects.add('irons_spellbooks:oakskin',2147483647,2)
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
			effects.add('minecraft:night_vision',2147483647,0)
			effects.add('irons_spellbooks:echoing_strikes',2147483647,4)
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
			effects.add('goety:insight',2147483647,2)
			effects.add('irons_spellbooks:instant_mana',2147483647,2)
			entity.give('kubejs:reinforced_bottle')
		})
})