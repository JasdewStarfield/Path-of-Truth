StartupEvents.registry('item', (event) => {
	//元素核心
	event.create("earth_elemental_core").displayName('Earth Elemental Core').texture('kubejs:item/elemental_core/earth').rarity('uncommon')
	event.create("water_elemental_core").displayName('Water Elemental Core').texture('kubejs:item/elemental_core/water').rarity('rare')
	event.create("fire_elemental_core").displayName('Fire Elemental Core').texture('kubejs:item/elemental_core/fire').rarity('rare')
	event.create("wind_elemental_core").displayName('Wind Elemental Core').texture('kubejs:item/elemental_core/wind').rarity('epic')
})