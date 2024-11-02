StartupEvents.registry('item', (event) => {
  //书
  event.create("incomplete_industrium_book", 'create:sequenced_assembly').displayName('Incomplete Industrium Infused Book')
  event.create("incomplete_durasteel_book", 'create:sequenced_assembly').displayName('Incomplete Durasteel Infused Book')

  event.create("buran").displayName('Buran').tooltip('<工业的最高成就>').rarity('epic')
  event.create("incomplete_buran", 'create:sequenced_assembly').displayName('Incomplete Buran').texture('kubejs:item/buran').rarity('epic')
  event.create("midnight").displayName('Midnight').tooltip('<魔法的终极结晶>').rarity('epic')
})

StartupEvents.registry('block', (event) => {
  //重生碑底座
  event.create('obelisk_base')
  .displayName('Obelisk Base')
  .soundType("copper")
  .mapColor("metal")
  .hardness(50)
  .resistance(1200)
  .noDrops()
  .item(item => {
    item.rarity('epic')
  })
  .opaque(true)
  .fullBlock(true)
  .renderType('solid')
  .textureAll('kubejs:block/obelisk_base')
})