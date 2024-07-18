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
  event.recipes.create.mixing([Item.of('createchromaticreturn:shadow_steel')], ['createchromaticreturn:chromatic_compound',Fluid.of('create_confectionery:black_chocolate',500),Fluid.of('tfmg:heavy_oil',500),Fluid.of('create_enchantment_industry:ink',500)]).superheated()
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

  event.recipes.create.mixing(['createchromaticreturn:industrium_ingot',Item.of('createchromaticreturn:shadow_steel').withChance(0.75)], [Fluid.of("createchromaticreturn:shadow_essence",1000),'create:deployer','create:mechanical_arm','immersiveengineering:powerpack','tfmg:large_radial_engine']).superheated()
  event.recipes.create.sequenced_assembly([
    Item.of('createchromaticreturn:industrium_book').withChance(10.0),
    Item.of('book').withChance(90.0)
    ], 'immersiveengineering:manual', [
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', '#forge:plates/plastic']),
    event.recipes.createFilling('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', Fluid.of('create_enchantment_industry:hyper_experience',500)]),
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', 'createchromaticreturn:industrium_ingot']),
    event.recipes.createFilling('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', Fluid.of('create_enchantment_industry:ink',500)]),
    event.recipes.createDeploying('kubejs:incomplete_industrium_book', ['kubejs:incomplete_industrium_book', '#forge:plates/plastic'])
  ]).transitionalItem('kubejs:incomplete_industrium_book').loops(10)

  event.recipes.create.compacting(['createchromaticreturn:durasteel_ingot',Item.of('createchromaticreturn:shadow_steel').withChance(0.75)], [Fluid.of("createchromaticreturn:shadow_essence",1000),'#forge:storage_blocks/steel','#forge:storage_blocks/lead','#forge:storage_blocks/cast_iron','#forge:storage_blocks/netherite']).superheated()
  event.recipes.create.sequenced_assembly([
    Item.of('createchromaticreturn:durasteel_book').withChance(10.0),
    Item.of('book').withChance(90.0)
    ], 'immersiveengineering:manual', [
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', '#forge:plates/obsidian']),
    event.recipes.createFilling('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', Fluid.of('create_enchantment_industry:hyper_experience',500)]),
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', 'createchromaticreturn:durasteel_ingot']),
    event.recipes.createFilling('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', Fluid.of('create_enchantment_industry:ink',500)]),
    event.recipes.createDeploying('kubejs:incomplete_durasteel_book', ['kubejs:incomplete_durasteel_book', '#forge:plates/obsidian'])
  ]).transitionalItem('kubejs:incomplete_durasteel_book').loops(10)

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
  event.custom({
    "type": "bloodmagic:arc",
    //可能存在的追加输出（可以不写）
    "addedoutput": [
        {
          "type": {
            "item": 'createchromaticreturn:chromatic_compound'
          },
          "chance": 0.5,
          "mainchance": 0.0
        },
        {
          "type": {
              "item": "botania:manasteel_ingot"
          },
          "chance": 0.5,
          "mainchance": 0.0
        },
        {
          "type": {
              "item": "irons_spellbooks:arcane_ingot"
          },
          "chance": 0.5,
          "mainchance": 0.0
        }
    ],
    //消耗配方（？）
    "consumeingredient": false,
    //输入材料
    "input": {
        "item": 'createchromaticreturn:refined_radiance'
    },
    //输入液体（可以不写）
    "inputFluid": {
        "amount": 1000,
        "fluid": "minecraft:water"
    },
    //输入数量（大概）
    "inputsize": 1,
    //主要产物输出几率
    "mainoutputchance": 0.0,
    //输出产物内容
    "output": {
      "item": 'botania:mana_powder'
    },
    //输出液体（可以不写）
    "outputFluid": {
        "amount": 1000,
        "fluid": "createchromaticreturn:refined_mixture"
    },
    //使用工具（必须是血魔法原有工具）
    "tool": {
        "tag": "bloodmagic:arc/hydrate"
    }
  })

  //添加随机生成两种锭的配方
  event.custom({
    "type": "bloodmagic:arc",
    //可能存在的追加输出（可以不写）
    "addedoutput": [
        {
        "type": {
            "item": 'createchromaticreturn:glowing_ingot'
        },
        "chance": 0.25,
        "mainchance": 0.0
        },
        {
          "type": {
              "item": 'createchromaticreturn:silkstrum'
          },
          "chance": 0.25,
          "mainchance": 0.0
        },
        {
          "type": {
              "item": 'createchromaticreturn:four_leaf_clover'
          },
          "chance": 0.05,
          "mainchance": 0.0
        }
    ],
    //消耗配方（？）
    "consumeingredient": false,
    //输入材料
    "input": {
        "item": 'botania:gaia_ingot'
    },
    //输入液体（可以不写）
    "inputFluid": {
        "amount": 5000,
        "fluid": "createchromaticreturn:refined_mixture"
    },
    //输入数量（大概）
    "inputsize": 1,
    //主要产物输出几率
    "mainoutputchance": 0.0,
    //输出产物内容
    "output": {
      "item": 'botania:gaia_ingot'
    },
    //输出液体（可以不写）
    "outputFluid": {
        "amount": 5000,
        "fluid": "minecraft:water"
    },
    //使用工具（必须是血魔法原有工具）
    "tool": {
        "tag": "bloodmagic:arc/resonator"
    }
  })

  //矩阵炼成复制火花
  event.custom({
    "type": "bloodmagic:array",
    "addedinput": {
        "item": 'createchromaticreturn:multiplite_ingot'
    },
    "baseinput": {
        "item": 'botania:corporea_spark_master'
    },
    "output": {
        "item": 'botania:corporea_spark_creative'
    },
    "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
  })

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

  //灵魂锻炉丝绸书三本复制四本
  event.custom({
    "type": "bloodmagic:soulforge",
    "drain": 512.0,//单次吸收量
    "input0": {
        "item": 'createchromaticreturn:silkstrum_book'
    },
    "input1": {
        "item": 'createchromaticreturn:silkstrum_book'
    },
    "input2": {
        "item": 'createchromaticreturn:silkstrum_book'
    },
    "input3": {
        "item": 'irons_spellbooks:gold_spell_book'
    },
    "minimumDrain": 2048.0,//要求使用材料的最低容量
    "output": {
        "count": 4,//生成数量
        "item": 'createchromaticreturn:silkstrum_book'
    }
  })

})
