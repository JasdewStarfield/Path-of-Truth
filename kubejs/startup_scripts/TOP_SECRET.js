StartupEvents.registry('item', (event) => {
  //Surprise!
  event.create("buran").displayName('Buran').tooltip('<工业的最高成就>').rarity('epic')
  event.create("incomplete_buran", 'create:sequenced_assembly').displayName('Incomplete Buran').texture('kubejs:item/buran').rarity('epic')
  event.create("midnight").displayName('Midnight').tooltip('<魔法的终极结晶>').rarity('epic')
})