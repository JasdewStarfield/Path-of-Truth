StartupEvents.registry('item', (event) => {
  //书
  //event.create("incomplete_industrium_book", 'create:sequenced_assembly').displayName('Incomplete Industrium Infused Book')
  //event.create("incomplete_durasteel_book", 'create:sequenced_assembly').displayName('Incomplete Durasteel Infused Book')

  let buran = (tooltip, texture) => {
    event.create("buran").displayName('Buran').tooltip(tooltip).texture(texture).rarity('epic')
    event.create("incomplete_buran", 'create:sequenced_assembly').displayName('Incomplete Buran').texture(texture).rarity('epic')
  }
  let today= new Date()
  if (today.getMonth() + 1 == 12 && today.getDate() == 25) {
    buran('<她今天好像格外开心……？>','kubejs:item/buran_special')
  }
  else {
    buran('<工业的最高成就>','kubejs:item/buran')
  }
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