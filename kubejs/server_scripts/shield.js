ServerEvents.recipes(event => {
  //破坏者盾牌

  //月长石盾牌
  event.remove({id:'blue_skies:moonstone_shield'})
  event.shaped(
    Item.of('blue_skies:moonstone_shield', 1),
    [ 
    'AAA', 
    'ABA',
    'AAA'
    ],
    {
    A: 'blue_skies:vitreous_moonstone',
    B: '#forge:rods/wooden'
    }
  )

  //扼塞盾牌
  event.remove({id:'undergarden:cloggrum_shield'})
  event.shaped(
    Item.of('undergarden:cloggrum_shield', 1),
    [ 
    'AAA', 
    'ABA',
    'AAA'
    ],
    {
    A: '#forge:ingots/cloggrum',
    B: '#forge:rods/wooden'
    }
  )

  //青铜盾牌（原版盾）
  event.remove({id:'minecraft:shield'})
  event.shaped(
    Item.of('minecraft:shield', 1),
    [ 
    'AAA', 
    'ABA',
    'AAA'
    ],
    {
    A: '#forge:ingots/bronze',
    B: '#forge:rods/wooden'
    }
  )
})