StartupEvents.registry('item', (event) => {
  //Surprise!
  event.create("buran").displayName('Buran').food(food => {
    food
      .hunger(20)
      .saturation(0)
      .fastToEat()
      .alwaysEdible()
  })
  event.create("midnight").displayName('Midnight').food(food => {
    food
      .hunger(20)
      .saturation(0)
      .fastToEat()
      .alwaysEdible()
  })
})