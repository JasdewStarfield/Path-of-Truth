StartupEvents.registry('item', (event) => {
  //书
  event.create("incomplete_industrium_book", 'create:sequenced_assembly').displayName('Incomplete Industrium Infused Book')
  event.create("incomplete_durasteel_book", 'create:sequenced_assembly').displayName('Incomplete Durasteel Infused Book')
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