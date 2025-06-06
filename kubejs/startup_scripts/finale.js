StartupEvents.registry('item', (event) => {
  //书
  //event.create("incomplete_industrium_book", 'create:sequenced_assembly').displayName('Incomplete Industrium Infused Book')
  //event.create("incomplete_durasteel_book", 'create:sequenced_assembly').displayName('Incomplete Durasteel Infused Book')

  //虽然不是终末物品但是放在这：回响之心，声波构件
  event.create("echoing_heart").displayName('Echoing Heart').rarity('uncommon')   //打开生物雷达
  event.create("sonic_mechanism").displayName('Sonic Mechanism').rarity('uncommon')   //打开洞穴雷达
  
  //注册终末起始物品与融合产物
  event.create("raw_world_base").displayName('Raw World Base').texture('kubejs:item/final_items/raw_world_base').tooltip('「一即是万」').rarity('uncommon')
  event.create("world_base_gem").displayName('World Base Gem').texture('kubejs:item/final_items/world_base_gem').tooltip('「万象归一」').rarity('epic')

  //工业终极代码
  event.create("code_vessel").displayName('Code Vessel').rarity('uncommon')
  event.create("code_formation").displayName('Code: Formation').rarity('epic')
  event.create("code_destruction").displayName('Code: Destruction').rarity('epic')
  event.create("code_perfection").displayName('Code: Perfection').rarity('epic')
  event.create("incomplete_code_formation", 'create:sequenced_assembly').displayName('Incomplete Code: Formation').texture('kubejs:item/incomplete_code').rarity('rare')
  event.create("incomplete_code_destruction", 'create:sequenced_assembly').displayName('Incomplete Code: Destruction').texture('kubejs:item/incomplete_code').rarity('rare')
  event.create("incomplete_code_perfection", 'create:sequenced_assembly').displayName('Incomplete Code: Perfection').texture('kubejs:item/incomplete_code').rarity('rare')

  //联合饰品
  event.create("arcane_charger").displayName('Arcane Charger').rarity('epic')
  event.create("soul_furnace").displayName('Soul Furnace').rarity('epic')
  event.create("divine_shield_system").displayName('Divine Shield System').rarity('epic')

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
  // event.create("midnight").displayName('Midnight').tooltip('<魔法的终极结晶>').rarity('epic')
  global.createMagicFocus(event, 'midnight', 'item.kubejs.midnight.tooltip', 'EPIC', item => {
    item.maxDamage = 10
    item.maxStackSize = 64
  })
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

StartupEvents.registry('mob_effect', (event) => {
  event.create('perfection')
    .displayName('Perfection')
    .color(Color.DARK_RED)
    .harmful()
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.MobEffectEvent$Added', event => {
  let effect = event.effectInstance
  if (effect.descriptionId === "effect.kubejs.perfection") effect.curativeItems = []
})