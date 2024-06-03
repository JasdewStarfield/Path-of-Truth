ServerEvents.recipes(event => {
  //我真是sb
  event.shapeless(Item.of('tfmg:coal_coke_dust',1),
        [
            '#forge:dusts/coal_coke'
        ]
  )
  //我不到啊
  event.shapeless(Item.of('tfmg:aluminum_ingot',1),
        [
            '#forge:ingots/aluminum'
        ]
  )
  event.shapeless(Item.of('create:copper_nugget',1),
        [
            '#forge:nuggets/copper'
        ]
  )

  //我寻思工业大麻也能做绳子
  event.shaped('3x farmersdelight:rope', [ 
    'AA', 
    'AA',
    'AA'  
  ], {
    A: 'immersiveengineering:hemp_fiber'
  })

  //齿轮方块就该是齿轮！
  event.remove({ id: 'supplementaries:cog_block' })
  event.shaped('12x supplementaries:cog_block', [ 
    'AAA', 
    'ABA',
    'AAA'  
  ], {
    A: 'create:cogwheel',
    B: '#forge:storage_blocks/redstone'
  })

  //干岩盐怎么就不能磨出盐了
  event.recipes.create.crushing(Item.of('salt:raw_rock_salt').withChance(0.25), 'biomesoplenty:dried_salt')

  //硫磺石就不是硫磺了吗？
  event.recipes.create.crushing(Item.of('tfmg:sulfur_dust').withChance(0.1), 'biomesoplenty:brimstone')

  //下面是一些重复配方的移除
  event.replaceInput(
    {id:'bucketlib:farmersdelight/wheat_dough_from_water'},
    'minecraft:wheat',
    '#forge:flour'
  )
  event.remove({ id: 'beautify:rope' })

})