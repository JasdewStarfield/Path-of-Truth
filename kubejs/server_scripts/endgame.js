ServerEvents.recipes(event => {
  //下界合金
  event.remove({ id: 'minecraft:netherite_ingot' })
  event.recipes.create.mixing(['netherite_ingot'], ['#forge:ingots/uranium','#forge:ingots/uranium','#forge:ingots/uranium','#forge:ingots/uranium','minecraft:netherite_scrap','minecraft:netherite_scrap','minecraft:netherite_scrap','minecraft:netherite_scrap']).superheated()

  /*
  //多彩化合物
  event.remove({ id: 'createchromaticreturn:chromatic_compound_recipe' })
  event.shapeless(
    Item.of('createchromaticreturn:chromatic_compound',1),
    [
      'kubejs:buran',
      'kubejs:midnight'
    ]
  )

  //移除一些原有配方
  event.remove({ id: 'createchromaticreturn:bedrock_shard_crushing' })
  event.remove({ id: 'createchromaticreturn:andesite_component_recipe' })
  event.remove({ id: 'createchromaticreturn:brass_component_recipe' })
  event.remove({ input: 'createchromaticreturn:andesite_component' })
  event.remove({ input: 'createchromaticreturn:brass_component' })

  //黄铜，安山组件配方
  event.recipes.create.crushing(Item.of('create:andesite_alloy'), 'createchromaticreturn:andesite_component')
  event.recipes.create.crushing(Item.of('create:brass_ingot'), 'createchromaticreturn:brass_component')

  //环境枪
  event.shapeless(
    Item.of('create:handheld_worldshaper',1),
    [
      'createchromaticreturn:industrium_charm',
      'createchromaticreturn:shadow_charm',
      'createchromaticreturn:refined_charm',
      'createchromaticreturn:multiplite_charm',
      'createchromaticreturn:silkstrum_charm',
      'createchromaticreturn:antiplite_charm'
    ]
  )

  //工业侧
  event.recipes.create.mixing([Item.of('createchromaticreturn:shadow_steel')], ['createchromaticreturn:chromatic_compound',Fluid.of('create_confectionery:black_chocolate',500),{fluidTag: 'forge:heavy_oil', amount:500}]).superheated()
  event.remove({id:'createchromaticreturn:shadow_essence_recipe'})
  event.custom({
    "type":"immersiveengineering:mixer",
    "energy":12800,
    "fluid":{"amount":1000,"tag":"minecraft:lava"},
    "inputs":[{"item":"createchromaticreturn:shadow_steel"}],
    "result":{"amount":1000,"fluid":"createchromaticreturn:shadow_essence"}
  })

  //终极锭
  event.remove({ id: 'createchromaticreturn:shadow_steel_recipe' })
  event.remove({ id: 'createchromaticreturn:industrium_recipe' })
  event.remove({ id: 'createchromaticreturn:durasteel_recipe' })

  event.remove({id:'createchromaticreturn:refined_radiance_recipe'})
  event.remove({id:'createchromaticreturn:silkstrum_recipe'})
  event.remove({id:'createchromaticreturn:glowing_ingot_recipe'})

  event.remove({ id: 'createchromaticreturn:industrium_book_recipe' })
  event.remove({ id: 'createchromaticreturn:durasteel_book_recipe' })
  event.remove({id:'createchromaticreturn:silkstrum_book_recipe'})

  event.remove({id:'createchromaticreturn:multiplite_recipe'})
  event.remove({id:'createchromaticreturn:antiplite_recipe'})

  event.recipes.create.mixing(['createchromaticreturn:industrium_ingot',Item.of('createchromaticreturn:shadow_steel').withChance(0.75)], [{fluidTag:'forge:shadow_essence', amount:1000},'create:deployer','create:mechanical_arm','immersiveengineering:powerpack']).superheated()
  event.recipes.create.sequenced_assembly([
    Item.of('createchromaticreturn:industrium_book')
    ], '#forge:plates/plastic', [
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'createchromaticreturn:industrium_ingot']),
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', Fluid.of('create_enchantment_industry:hyper_experience',50)]),
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', Fluid.of('create_enchantment_industry:hyper_experience',50)])
  ]).transitionalItem('kubejs:incomplete_industrium_book').loops(2)

  event.recipes.create.compacting(['createchromaticreturn:durasteel_ingot',Item.of('createchromaticreturn:shadow_steel').withChance(0.75)], [{fluidTag:'forge:shadow_essence', amount:1000},'#forge:storage_blocks/steel','#forge:storage_blocks/lead','#forge:storage_blocks/cast_iron','#forge:storage_blocks/netherite']).superheated()
  event.recipes.create.sequenced_assembly([
    Item.of('createchromaticreturn:durasteel_book')
    ], '#forge:plates/obsidian', [
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'createchromaticreturn:durasteel_ingot']),
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', Fluid.of('create_enchantment_industry:hyper_experience',50)]),
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'minecraft:paper']),
    event.recipes.createFilling('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', Fluid.of('create_enchantment_industry:hyper_experience',50)])
  ]).transitionalItem('kubejs:incomplete_durasteel_book').loops(2)

  //魔法侧终极锭修改
  //光辉石
  event.shaped(Item.of('createchromaticreturn:refined_radiance',1),
      [' A ',
       'BCD',
       ' E '],
      {
          A:'irons_spellbooks:lesser_spell_slot_upgrade',
          B:'irons_spellbooks:arcane_ingot',
          C:'createchromaticreturn:chromatic_compound',
          D:'irons_spellbooks:shriving_stone',
          E:'irons_spellbooks:upgrade_orb'
      }
  )
  //删除光辉流体原有配方
  event.remove({id:'createchromaticreturn:refined_mixture_recipe'})
  //添加融化配方
  

  //添加随机生成两种锭的配方，两种液体注册名的版本
  
  //炼成复制火花
  
  //符文祭坛炼制永恒魔力池
  event.recipes.botania.runic_altar('botania:creative_pool',
    [
        'createchromaticreturn:multiplite_ingot',
        'botania:fabulous_pool',
        'botania:mana_bomb',
        'create:creative_fluid_tank'
    ],
    100000
  )

  //符文祭坛炼制丝触书籍
  event.recipes.botania.runic_altar('createchromaticreturn:silkstrum_book',
    [
        'createchromaticreturn:silkstrum', 
        'bosses_of_mass_destruction:void_thorn',
        'bosses_of_mass_destruction:blazing_eye',
        'irons_spellbooks:gold_spell_book',
        'bosses_of_mass_destruction:ancient_anima',
        'bosses_of_mass_destruction:obsidian_heart'
    ],
    100000
  )

  //丝绸书三本复制四本

  */
 

  //终极彩蛋：可睡觉的床
  event.remove({id:'undergarden:depthrock_bed'})
  //符文祭坛
  event.recipes.botania.runic_altar('undergarden:depthrock_bed', 
    [
      'create:handheld_worldshaper',
      'immersiveengineering:coke_oven', 
      'immersiveengineering:blast_furnace',
      'immersiveengineering:advanced_blast_furnace', 
      'immersiveengineering:metal_press',
      'immersiveengineering:crusher', 
      'immersiveengineering:fermenter',
      'immersiveengineering:squeezer', 
      'immersiveengineering:diesel_generator',
      'immersiveengineering:arc_furnace', 
      'immersiveengineering:excavator',
      'immersiveengineering:bucket_wheel'
    ], 
    50000
  )
})
