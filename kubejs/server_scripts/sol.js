ServerEvents.recipes(event => {
  //食物清单
  event.remove({id:"solapplepie:food_book"})
  event.shapeless(Item.of('solapplepie:food_book',1),
        [
            'minecraft:book',
            '#forge:crops'
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
})