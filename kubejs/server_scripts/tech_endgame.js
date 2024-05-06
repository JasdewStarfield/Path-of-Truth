ServerEvents.recipes(event => {
  //下界合金
  event.remove({ id: 'minecraft:netherite_ingot' })
  event.recipes.create.mixing(['netherite_ingot'], [Fluid.of('tfmg:napalm',500),'#forge:ingots/gold','#forge:ingots/gold','#forge:ingots/gold','#forge:ingots/gold','minecraft:netherite_scrap','minecraft:netherite_scrap','minecraft:netherite_scrap','minecraft:netherite_scrap']).superheated()

  //烈焰蛋糕
  event.remove({ id: 'create:compacting/blaze_cake' })
  event.remove({ id: 'create:filling/blaze_cake' })
  event.recipes.create.compacting(['create:blaze_cake_base'], ['minecraft:sugar','irons_spellbooks:cinder_essence','#forge:plates/horizonite']).heated()
  event.recipes.create.filling('create:blaze_cake',[Fluid.of('tfmg:gasoline',1000),'create:blaze_cake_base'])

  //多彩化合物
  event.recipes.create.compacting(['createchromaticreturn:chromatic_compound'], ['kubejs:buran','#forge:storage_blocks/andesite_alloy','#forge:storage_blocks/bronze','#forge:storage_blocks/brass','#forge:storage_blocks/electrum','#forge:storage_blocks/steel','#forge:storage_blocks/netherite']).superheated()

  //移除一些原有配方
  event.remove({ id: 'createchromaticreturn:bedrock_shard_crushing' })
  event.remove({ id: 'createchromaticreturn:chromatic_compound_recipe' })

  //环境枪
  event.shapeless(
    Item.of('create:handheld_worldshaper',1),
    [
      'create:creative_crate',
      'create:creative_fluid_tank',
      'create:creative_motor'
    ]
  )
})