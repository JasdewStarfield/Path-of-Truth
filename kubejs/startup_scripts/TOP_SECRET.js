StartupEvents.registry('item', (event) => {
  //Surprise!
  //彩蛋物品，感谢幸运群u
  event.create("sword_o_justice", "sword")
    .unstackable()
    .maxDamage(1145)
    .attackDamageBaseline(37)
    .displayName('"Sword o\' Justice"')
    .rarity('epic')
})