ServerEvents.recipes(event => {
  //食物清单
  event.remove({id:"solapplepie:food_book"})
  event.shapeless(Item.of('solapplepie:food_book',1),
        [
            'minecraft:book'
        ]
  )

  //午餐盒
  event.replaceInput(
    {output:"solapplepie:lunchbox"},
    '#forge:ingots/iron',
    '#forge:plates/iron'
  )

  //金午餐盒
  event.replaceInput(
    {output:"solapplepie:golden_lunchbox"},
    '#forge:ingots/gold',
    '#forge:plates/electrum'
  )

  //厨锅（隔壁乐事乱入）
  event.shaped('farmersdelight:cooking_pot', [ 
    'DAD', 
    'CBC',
    'CCC'  
  ], {
    B: 'woodenbucket:wooden_bucket',
    A: 'minecraft:wooden_shovel',
    C: '#forge:ingots/bronze',
    D: 'brick'
  })
})