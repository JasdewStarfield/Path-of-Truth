ServerEvents.recipes(event => {
  //钢流体储罐，就你不一样！
  event.replaceInput(
    {id:"tfmg:crafting/steel_tank"},
    '#forge:ingots/steel',
    '#forge:plates/steel'
  )

  //加贵工业级流体管道
  event.replaceInput(
    {id:"tfmg:stonecutting/industrial_pipe"},
    '#forge:ingots/steel',
    '#forge:storage_blocks/steel'
  )
})