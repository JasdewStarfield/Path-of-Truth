ItemEvents.modification(event => {
  //下界合金增强
  event.modify('minecraft:netherite_helmet', item => {
    item.armorProtection = 5
  })
  event.modify('minecraft:netherite_chestplate', item => {
    item.armorProtection = 8
  })
  event.modify('minecraft:netherite_leggings', item => {
    item.armorProtection = 10
  })
  event.modify('minecraft:netherite_boots', item => {
    item.armorProtection = 5
  })

  //雪球堆叠64
  event.modify('minecraft:snowball', item => {
    item.maxStackSize = 64
  })

  //钻石削弱：耐久改到1/10，其它不变
  event.modify('minecraft:diamond_helmet', item => {
    item.maxDamage = 95
  })
  event.modify('minecraft:diamond_chestplate', item => {
    item.maxDamage = 225
  })
  event.modify('minecraft:diamond_leggings', item => {
    item.maxDamage = 240
  })
  event.modify('minecraft:diamond_boots', item => {
    item.maxDamage = 165
  })
  event.modify('minecraft:diamond_sword', item => {
    item.maxDamage = 150
  })
  event.modify('minecraft:diamond_pickaxe', item => {
    item.maxDamage = 150
  })
  event.modify('minecraft:diamond_axe', item => {
    item.maxDamage = 150
  })
  event.modify('minecraft:diamond_shovel', item => {
    item.maxDamage = 150
  })
  event.modify('minecraft:diamond_hoe', item => {
    item.maxDamage = 150
  })
  event.modify('farmersdelight:diamond_knife', item => {
    item.maxDamage = 150
  })
  event.modify('nethersdelight:diamond_machete', item => {
    item.maxDamage = 150
  })
})