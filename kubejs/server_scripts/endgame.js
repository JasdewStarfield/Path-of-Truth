ServerEvents.recipes(event => {
  //下界合金
  event.remove({ id: 'minecraft:netherite_ingot' })
  event.recipes.vintageimprovements.pressurizing([
    'nether_star',
    Fluid.of('kubejs:molten_netherite', 100),
  ], [
    Fluid.of('createdieselgenerators:gasoline', 500),
    'nether_star',
    '#forge:dusts/electrum',
    '#forge:dusts/electrum',
    '#forge:dusts/electrum',
    '#forge:dusts/electrum',
    'minecraft:netherite_scrap',
    'minecraft:netherite_scrap',
    'minecraft:netherite_scrap',
    'minecraft:netherite_scrap'
  ]).superheated().secondaryFluidInput(0)
  event.custom({
    "type": "immersiveengineering:bottling_machine",
    "fluid": { "amount": 100, "tag": "forge:molten_netherite" },
    "inputs": [
      { "item": "kubejs:mold_ingot" }
    ],
    "results": [
      { "item": "kubejs:mold_ingot" },
      { "item": "minecraft:netherite_ingot" }
    ]
  })

  //自动化下界之星
  event.recipes.create.mixing([
    'botania:blacker_lotus',
    '4x nether_star'
  ], [
    'botania:blacker_lotus',
    'aquamirae:ship_graveyard_echo',
    'aquamirae:ship_graveyard_echo',
    'minecraft:ender_eye',
    'minecraft:ender_eye',
    'scguns:nether_star_fragment',
    'scguns:nether_star_fragment',
    'scguns:nether_star_fragment',
    'scguns:nether_star_fragment'
  ]).superheated()
  event.recipes.create.mixing([
    'kubejs:water_elemental_core',
    '2x aquamirae:ship_graveyard_echo'
  ], [
    'kubejs:water_elemental_core',
    'aquamirae:ship_graveyard_echo',
    Fluid.of('netherexp:ectoplasm', 500),
  ]).heated()

  //第五章工业：将Diesel Generators的配方中所有锌锭替换为锌铝合金
  event.replaceInput(
    { mod: "createdieselgenerators" },
    '#forge:ingots/zinc',
    '#forge:ingots/za'
  )
  event.replaceInput(
    { mod: "createdieselgenerators" },
    '#forge:nuggets/zinc',
    '#forge:nuggets/za'
  )
  //铁替换为钢
  event.replaceInput(
    { mod: "createdieselgenerators" },
    '#forge:rods/iron',
    'immersiveengineering:rod_steel'
  )
  event.replaceInput(
    { mod: "createdieselgenerators" },
    '#forge:plates/iron',
    'immersiveengineering:plate_steel'
  )
  event.replaceInput(
    { mod: "createdieselgenerators" },
    '#forge:ingots/iron',
    'immersiveengineering:ingot_steel'
  )
  //时钟替换为重型工程块
  event.replaceInput(
    { mod: "createdieselgenerators" },
    'clock',
    'immersiveengineering:heavy_engineering'
  )

  //分馏
  event.remove({ id: 'createdieselgenerators:crafting/distillation_controller' })
  event.shaped(
    Item.of('createdieselgenerators:distillation_controller', 5),
    [
      'ABA',
      'CDC'
    ],
    {
      A: 'create:fluid_pipe',
      C: 'create:andesite_alloy',
      D: '#forge:plates/za',
      B: 'immersiveengineering:heavy_engineering'
    }
  )
  event.remove({ id: "createdieselgenerators:distillation/crude_oil" })
  event.custom({
    "type": "createdieselgenerators:distillation",
    "ingredients": [
      {
        "fluid": "createdieselgenerators:crude_oil",
        "amount": 200
      }
    ],
    "heatRequirement": "heated",
    "processingTime": 200,
    "results": [
      {
        "fluid": "kubejs:heavy_oil",
        "amount": 50
      },
      {
        "fluid": "createdieselgenerators:diesel",
        "amount": 50
      },
      {
        "fluid": "createdieselgenerators:gasoline",
        "amount": 50
      },
      {
        "fluid": "kubejs:lpg",
        "amount": 50
      }
    ]
  })

  //沥青
  event.remove({ id: 'createdieselgenerators:mixing/asphalt_block' })
  event.remove({ id: 'createdieselgenerators:crafting/asphalt_block' })
  event.recipes.vintageimprovements.pressurizing([
    Fluid.of('kubejs:lubricant', 250),
    '2x createdieselgenerators:asphalt_block',
    'kubejs:fire_elemental_core',
    'kubejs:water_elemental_core',
  ], [
    Fluid.of('kubejs:heavy_oil', 500),
    'kubejs:fire_elemental_core',
    'kubejs:water_elemental_core',
    '#forge:dusts/sulfur',
  ]).superheated()

  //反应堆机壳
  event.remove({ id: 'createnuclear:item_application/reactor_casing_from_steel_and_brass_casing' })

  //铀处理
  event.remove({ id: 'createnuclear:mixing/uranium_fluid' })
  event.remove({ id: 'createnuclear:compacting/uranium_fluid_to_yellowcake' })
  event.remove({ id: 'createnuclear:crafting/enriched_soul_soil' })
  event.remove({ id: 'createnuclear:mechanical_crafting/uranium_rod' })
  event.remove({ id: 'createnuclear:mechanical_crafting/graphite_rod' })
  event.custom({
    "type": "immersiveengineering:mixer",
    "energy": 12800,
    "fluid": { "amount": 500, "tag": "forge:diesel" },
    "inputs": [
      { "base_ingredient": { "tag": "forge:dusts/uranium" }, "count": 4 },
      { "base_ingredient": { "tag": "forge:dusts/hop_graphite" }, "count": 1 },
    ],
    "result": { "amount": 500, "fluid": "createnuclear:uranium" }
  })
  event.custom({
    "type": "createdieselgenerators:distillation",
    "ingredients": [
      {
        "fluid": "createnuclear:uranium",
        "amount": 100
      }
    ],
    "heatRequirement": "superheated",
    "processingTime": 20,
    "results": [
      {
        "fluid": "kubejs:molten_enriched_uranium",
        "amount": 10
      },
      {
        "fluid": "minecraft:lava",
        "amount": 90
      }
    ]
  })
  event.recipes.vintageimprovements.centrifugation([
    Item.of("immersiveengineering:nugget_uranium", 4).withChance(0.5),
    Item.of("immersiveengineering:slag").withChance(0.5),
    "createnuclear:yellowcake"
  ],
    Fluid.of('kubejs:molten_enriched_uranium', 5)
  ).minimalRPM(256)
  event.recipes.create.mixing('createnuclear:enriched_soul_soil', ['goety:sonic_boom_focus', 'goety:dark_metal_block', 'goety:dark_metal_block', 'goety:dark_metal_block', 'goety:dark_metal_block', 'nethersdelight:rich_soul_soil', 'nethersdelight:rich_soul_soil', 'nethersdelight:rich_soul_soil', 'nethersdelight:rich_soul_soil']).superheated()
  event.recipes.createItemApplication("createnuclear:graphite_rod", ["#forge:rods/steel", "#forge:plates/hop_graphite"])

  //裂变电池
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:fission_cell').withChance(90.0),
    Item.of('createnuclear:graphite_rod').withChance(1.2),
    Item.of('createnuclear:uranium_rod').withChance(1.2),
    Item.of('immersiveengineering:radiator').withChance(2.6),
    Item.of('kubejs:za_sheet').withChance(5.0)
  ], 'kubejs:za_sheet', [
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'immersiveengineering:connector_mv']),
    event.recipes.createPressing('kubejs:incomplete_fission_cell', 'kubejs:incomplete_fission_cell'),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:uranium_rod']),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:graphite_rod']),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'immersiveengineering:radiator'])
  ]).transitionalItem('kubejs:incomplete_fission_cell').loops(5)
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:fission_cell')
  ], 'kubejs:za_sheet', [
    event.recipes.createFilling('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', { fluidTag: 'forge:lubricant', amount: 25 }]),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'immersiveengineering:connector_mv']),
    event.recipes.createPressing('kubejs:incomplete_fission_cell', 'kubejs:incomplete_fission_cell'),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:uranium_rod']),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'createnuclear:graphite_rod']),
    event.recipes.createDeploying('kubejs:incomplete_fission_cell', ['kubejs:incomplete_fission_cell', 'immersiveengineering:radiator'])
  ]).transitionalItem('kubejs:incomplete_fission_cell').loops(5)

  /*
  event.remove({id:"protection_pixel:hrcsheetloot"})
  event.recipes.create.compacting(
    'protection_pixel:heatresistantceramicsheet', [
      Fluid.of("minecraft:lava",200),
      '#forge:clay',
      '#forge:clay',
      '#forge:clay',
      '#forge:clay',
      'create:rose_quartz',
      'create:rose_quartz',
      '#forge:plates/za'
    ]
  ).superheated()
  */


  //电路板
  event.remove({ id: "vintageimprovements:mechanical_crafting/laser" })
  event.recipes.create.mechanical_crafting('vintageimprovements:laser_item', [
    ' A ',
    'ABA',
    'ACA',
    'ADA',
    'ADA'
  ], {
    A: '#forge:plates/netherite',
    B: 'immersiveengineering:toolupgrade_revolver_electro',
    C: 'scguns:laser_sight',
    D: '#forge:glass'
  })
  event.recipes.vintageimprovements.laser_cutting(Item.of('kubejs:electronic_circuit_board'), '#forge:plates/plastic').energyCost(51200).maxChargeRate(3200)

  //原始万象石
  event.shaped(
    Item.of('kubejs:raw_world_base'),
    [
      ' A ',
      'BCD',
      ' E '
    ],
    {
      B: 'kubejs:midnight',
      E: 'createnuclear:enriched_yellowcake',
      D: 'kubejs:buran',
      C: 'goety:philosophers_stone',
      A: 'alexsmobs:farseer_arm'
    }
  )

  //代码容器
  event.recipes.create.compacting('kubejs:code_vessel', [
    "kubejs:electronic_circuit_board",
    "kubejs:raw_world_base",
    "#forge:plates/netherite",
    "#forge:plates/netherite",
    "#forge:wires/electrum",
    "#forge:wires/electrum",
    "#forge:wires/electrum",
    "#forge:wires/electrum"
  ]).superheated()

  //完美代码
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:code_perfection').withChance(0.8),
    Item.of('kubejs:code_formation').withChance(0.1),
    Item.of('kubejs:code_destruction').withChance(0.1)
  ], 'kubejs:code_vessel', [
    event.recipes.createDeploying('kubejs:incomplete_code_perfection', ['kubejs:incomplete_code_perfection', 'farmersdelight:rice_roll_medley_block']),
    event.recipes.createDeploying('kubejs:incomplete_code_perfection', ['kubejs:incomplete_code_perfection', 'refinedstorage:controller']),
    event.recipes.createDeploying('kubejs:incomplete_code_perfection', ['kubejs:incomplete_code_perfection', 'bosses_of_mass_destruction:obsidian_heart']),
    event.recipes.createDeploying('kubejs:incomplete_code_perfection', ['kubejs:incomplete_code_perfection', 'createnuclear:reactor_controller']),
    event.recipes.vintageimprovements.vibrating('kubejs:incomplete_code_perfection', 'kubejs:incomplete_code_perfection'),
    event.recipes.createFilling('kubejs:incomplete_code_perfection', ['kubejs:incomplete_code_perfection', Fluid.of('create_enchantment_industry:hyper_experience', 200)])
  ]).transitionalItem('kubejs:incomplete_code_perfection').loops(1)

  //构成代码
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:code_formation').withChance(0.8),
    Item.of('kubejs:code_perfection').withChance(0.1),
    Item.of('kubejs:code_destruction').withChance(0.1)
  ], 'kubejs:code_vessel', [
    event.recipes.createDeploying('kubejs:incomplete_code_formation', ['kubejs:incomplete_code_formation', 'botania:spawner_mover']),
    event.recipes.createDeploying('kubejs:incomplete_code_formation', ['kubejs:incomplete_code_formation', 'alexsmobs:enderiophage_rocket']),
    event.recipes.createDeploying('kubejs:incomplete_code_formation', ['kubejs:incomplete_code_formation', 'create_confectionery:gingerbread_man']),
    event.recipes.createDeploying('kubejs:incomplete_code_formation', ['kubejs:incomplete_code_formation', 'alexsmobs:blood_sprayer']),
    event.recipes.vintageimprovements.laser_cutting('kubejs:incomplete_code_formation', 'kubejs:incomplete_code_formation').energyCost(409600).maxChargeRate(4096),
    event.recipes.createFilling('kubejs:incomplete_code_formation', ['kubejs:incomplete_code_formation', Fluid.of('create_enchantment_industry:hyper_experience', 200)])
  ]).transitionalItem('kubejs:incomplete_code_formation').loops(1)

  //毁灭代码
  event.recipes.create.sequenced_assembly([
    Item.of('kubejs:code_destruction').withChance(0.8),
    Item.of('kubejs:code_formation').withChance(0.1),
    Item.of('kubejs:code_perfection').withChance(0.1)
  ], 'kubejs:code_vessel', [
    event.recipes.createDeploying('kubejs:incomplete_code_destruction', ['kubejs:incomplete_code_destruction', 'scguns:osborne_slug']),
    event.recipes.createDeploying('kubejs:incomplete_code_destruction', ['kubejs:incomplete_code_destruction', 'botania:astrolabe']),
    event.recipes.createDeploying('kubejs:incomplete_code_destruction', ['kubejs:incomplete_code_destruction', 'bosses_of_mass_destruction:blazing_eye']),
    event.recipes.createDeploying('kubejs:incomplete_code_destruction', ['kubejs:incomplete_code_destruction', 'minecraft:netherite_pickaxe']),
    event.recipes.vintageimprovementsHammering('kubejs:incomplete_code_destruction', 'kubejs:incomplete_code_destruction'),
    event.recipes.createFilling('kubejs:incomplete_code_destruction', ['kubejs:incomplete_code_destruction', Fluid.of('create_enchantment_industry:hyper_experience', 200)])
  ]).transitionalItem('kubejs:incomplete_code_destruction').loops(1)

  //创造板条箱
  event.recipes.create.deploying("create:creative_crate", ['createutilities:void_chest', 'botania:corporea_spark_creative'])

  //创造流体储罐
  event.recipes.create.deploying("create:creative_fluid_tank", ['createutilities:void_tank', 'kubejs:world_base_gem'])

  //创造马达
  event.recipes.create.deploying("create:creative_motor", ['createutilities:void_motor', 'kubejs:world_base_gem'])

  //创造蓄电池
  event.recipes.create.deploying("immersiveengineering:capacitor_creative", ['createutilities:void_battery', 'kubejs:world_base_gem'])

  //创造烈焰蛋糕
  event.recipes.create.deploying("create:creative_blaze_cake", ['create:blaze_cake', 'kubejs:world_base_gem'])


  //魔法侧终极修改

  //头像复制
  event.shapeless(Item.of('kubejs:midnight', 4),
    [
      'goety:philosophers_stone',
      'kubejs:raw_world_base',
      'minecraft:echo_shard',
      'aquamirae:ship_graveyard_echo'
    ]
  )

  //永固之瓶制作
  event.shaped(
    Item.of('kubejs:reinforced_bottle', 8),
    [
      'AEC',
      'BDB',
      'CEA'
    ],
    {
      B: 'botania:ender_air_bottle',
      A: 'minecraft:netherite_ingot',
      D: 'kubejs:raw_world_base',
      C: 'botania:gaia_ingot',
      E: 'kubejs:leyden_jar'
    }
  )

  //亡灵火盆催化虚空精华
  event.custom({
    "type": "goety:brazier",
    "soulCost": 10000,
    "ingredients": [
      {
        "item": 'kubejs:reinforced_bottle'
      },
      {
        "item": 'kubejs:raw_world_base'
      },
      {
        "item": 'bosses_of_mass_destruction:void_thorn'
      },
      {
        "item": 'goety:shadow_essence'
      }
    ],
    "result": {
      "item": 'kubejs:potion_of_void'
    }
  })

  //花药台合成平衡精华
  event.recipes.botania.petal_apothecary('kubejs:potion_of_balance',
    [
      'kubejs:reinforced_bottle',
      'kubejs:raw_world_base',
      'kubejs:earth_elemental_core',
      'kubejs:water_elemental_core',
      'kubejs:fire_elemental_core',
      'kubejs:wind_elemental_core'
    ]
  )

  //魔法仪式合成天赋精华
  event.custom({
    "type": "goety:ritual",
    "ritual_type": "goety:craft",//仪式主类型（制作）
    "activation_item": {
      "item": 'kubejs:reinforced_bottle'//中心物品
    },
    "craftType": "magic",//仪式副类型（魔法）
    "soulCost": 1000,//每秒消耗
    "duration": 50,//时长
    "ingredients": [
      {
        "item": 'bosses_of_mass_destruction:ancient_anima'
      },
      {
        "item": 'goety:forbidden_scroll'
      },
      {
        "item": 'kubejs:raw_world_base'
      },
      {
        "item": 'irons_spellbooks:legendary_ink'
      }
    ],
    "result": {
      "item": 'kubejs:potion_of_talent'//实际产出
    }
  })

  //混合终末修改
  //神圣护盾系统
  event.shaped(
    Item.of('kubejs:divine_shield_system'),
    [
      ' A ',
      'BCD',
      ' E '
    ],
    {
      A: 'shieldexp:netherite_shield',
      B: 'irons_spellbooks:holy_upgrade_orb',
      C: 'kubejs:raw_world_base',
      D: 'minecraft:dragon_egg',
      E: 'kubejs:electronic_engineering'
    }
  )
  //灵魂熔炉
  event.shaped(
    Item.of('kubejs:soul_furnace'),
    [
      'ABA',
      'CDC',
      'ABA'
    ],
    {
      B: 'goety:sculk_devourer',
      A: 'immersiveengineering:blastbrick_reinforced',
      D: 'kubejs:raw_world_base',
      C: 'goety:reinforced_redstone_block'
    }
  )
  //奥术充能器
  event.shaped(
    Item.of('kubejs:arcane_charger'),
    [
      'ABA',
      'CDC',
      'ABA'
    ],
    {
      C: 'kubejs:fission_cell',
      A: 'irons_spellbooks:lightning_upgrade_orb',
      B: 'irons_spellbooks:arcane_anvil',
      D: 'kubejs:raw_world_base'
    }
  )


  //魔法创造系合成
  //炼成复制火花
  event.custom({
    "type": "goety:cursed_infuser_recipes",
    "ingredient": {
      "item": 'kubejs:world_base_gem'
    },
    "result": 'botania:corporea_spark_creative',
    "cookingTime": 2400
  })

  //符文祭坛炼制永恒魔力池
  event.recipes.botania.runic_altar('botania:creative_pool',
    [
      'kubejs:world_base_gem',
      'botania:fabulous_pool',
      'botania:mana_bomb',
      'create:creative_fluid_tank'
    ],
    100000
  )

  //环境枪：创造集成
  //铸造仪式
  event.custom({
    "type": "goety:ritual",
    "ritual_type": "goety:craft",//仪式主类型（制作）
    "activation_item": {
      "item": 'kubejs:world_base_gem'//中心物品
    },
    "craftType": "forge",//仪式副类型（铸造）
    "soulCost": 1000,//每秒消耗
    "duration": 50,//时长
    "ingredients": [
      {
        "item": 'botania:corporea_spark_creative'
      },
      {
        "item": 'create:creative_blaze_cake'
      },
      {
        "item": 'botania:creative_pool'
      },
      {
        "item": 'create:creative_crate'
      },
      {
        "item": 'create:creative_fluid_tank'
      },
      {
        "item": 'create:creative_motor'
      },
      {
        "item": 'immersiveengineering:capacitor_creative'
      },
      {
        "item": 'scguns:creative_ammo_box'
      },
    ],
    "result": {
      "item": 'create:handheld_worldshaper'//实际产出
    }
  })
  //终极彩蛋：可睡觉的床
  event.remove({ id: 'undergarden:depthrock_bed' })
  //安息仪式
  event.custom({
    "type": "goety:ritual",
    "ritual_type": "goety:craft",//仪式主类型（制作）
    "activation_item": {
      "item": 'create:handheld_worldshaper'//中心物品
    },
    "craftType": "sabbath",//仪式副类型（安息）
    "soulCost": 1000,//每秒消耗
    "duration": 50,//时长
    "ingredients": [
      {
        "item": 'goety:unholy_hat'
      },
      {
        "item": 'goety:soul_ruby'
      },
      {
        "item": 'aquamirae:coral_lance'
      },
      {
        "item": 'alexsmobs:shattered_dimensional_carver'
      },
      {
        "item": 'bosses_of_mass_destruction:monolith_block'
      },
      {
        "item": 'bosses_of_mass_destruction:charged_ender_pearl'
      },
      {
        "tag": 'minecraft:beds'
      },
      {
        "item": 'scguns:scorched_blueprint'
      }
    ],
    "result": {
      "item": 'undergarden:depthrock_bed'//实际产出
    }
  })

  //声纳模块
  event.shaped(
    Item.of('kubejs:sonic_mechanism'),
    [
      'ABA',
      'ADA',
      'ACA'
    ],
    {
      A: 'create:precision_mechanism',
      B: 'stardew_fishing:sonar_bobber',
      C: 'immersiveengineering:rs_engineering',
      D: 'alexsmobs:echolocator'
    }
  )



  //终极合成！
  let inter2 = 'kubejs:incomplete_buran'
  event.recipes.create.sequenced_assembly([
    'kubejs:buran'
  ], 'create:empty_schematic', [
    event.recipes.createDeploying(inter2, [inter2, 'kubejs:andesite_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'kubejs:fluid_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'kubejs:precise_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'kubejs:logistical_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'immersiveengineering:light_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'immersiveengineering:rs_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'immersiveengineering:heavy_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'kubejs:sensory_engineering']),
    event.recipes.createDeploying(inter2, [inter2, 'kubejs:electronic_engineering']),
  ]).transitionalItem(inter2).loops(4)
})
