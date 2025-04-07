ServerEvents.recipes(event => {
  //升级模板
  event.remove({id:"storagedrawers:upgrade_template"})
  event.shaped(
    Item.of('storagedrawers:upgrade_template', 1),
    [
    'AAA',
    'ABA',
    'AAA'
    ],
    {
    A: '#forge:rods/wooden',
    B: 'irons_spellbooks:arcane_essence'
    }
  )

  //一级
  event.remove({id:"storagedrawers:obsidian_storage_upgrade"})
  event.shaped(
    Item.of('storagedrawers:obsidian_storage_upgrade', 1),
    [
    ' C ',
    'ABA',
    ' C '
    ],
    {
    A: 'storagedrawers:upgrade_template',
    B: 'kubejs:andesite_engineering',
    C: '#forge:plates/bronze'
    }
  )

  //二级
  event.remove({id:"storagedrawers:iron_storage_upgrade"})
  event.shaped(
    Item.of('storagedrawers:iron_storage_upgrade', 1),
    [
    ' C ',
    'ABA',
    ' C '
    ],
    {
    A: 'storagedrawers:obsidian_storage_upgrade',
    B: 'kubejs:precise_engineering',
    C: '#forge:plates/brass'
    }
  )

  //三级
  event.remove({id:"storagedrawers:gold_storage_upgrade"})
  event.shaped(
    Item.of('storagedrawers:gold_storage_upgrade', 1),
    [
    ' C ',
    'ABA',
    ' C '
    ],
    {
    A: 'storagedrawers:iron_storage_upgrade',
    B: 'immersiveengineering:light_engineering',
    C: '#forge:plates/steel'
    }
  )

  //四级
  event.remove({id:"storagedrawers:diamond_storage_upgrade"})
  event.shaped(
    Item.of('storagedrawers:diamond_storage_upgrade', 1),
    [
    ' C ',
    'ABA',
    ' C '
    ],
    {
    A: 'storagedrawers:gold_storage_upgrade',
    B: 'immersiveengineering:heavy_engineering',
    C: '#forge:plates/aluminum'
    }
  )

  //五级
  event.remove({id:"storagedrawers:emerald_storage_upgrade"})
  event.shaped(
    Item.of('storagedrawers:emerald_storage_upgrade', 1),
    [
    ' C ',
    'ABA',
    ' C '
    ],
    {
    A: 'storagedrawers:diamond_storage_upgrade',
    B: 'kubejs:electronic_engineering',
    C: '#forge:plates/netherite'
    }
  )

  //压缩抽屉
  event.remove({id:"storagedrawers:compacting_drawers_2"})
  event.shaped(
    Item.of('storagedrawers:compacting_drawers_2', 1),
    [
    'DAD',
    'CBC',
    'DDD'
    ],
    {
    A: 'create:mechanical_piston',
    B: '#storagedrawers:full_drawers',
    C: 'create:cogwheel',
    D: '#forge:plates/iron'
    }
  )
  event.remove({id:"storagedrawers:compacting_drawers_3"})
  event.shaped(
    Item.of('storagedrawers:compacting_drawers_3', 1),
    [
    'DAD',
    'CBC',
    'DAD'
    ],
    {
    A: 'create:mechanical_piston',
    B: '#storagedrawers:full_drawers',
    C: 'create:cogwheel',
    D: '#forge:plates/iron'
    }
  )
  event.remove({id:"storagedrawers:compacting_half_drawers_2"})
  event.shaped(
    Item.of('storagedrawers:compacting_half_drawers_2', 1),
    [
    'DAD',
    'CBC',
    'DDD'
    ],
    {
    A: 'create:mechanical_piston',
    B: '#storagedrawers:half_drawers',
    C: 'create:cogwheel',
    D: '#forge:plates/iron'
    }
  )
  event.remove({id:"storagedrawers:compacting_half_drawers_3"})
  event.shaped(
    Item.of('storagedrawers:compacting_half_drawers_3', 1),
    [
    'DAD',
    'CBC',
    'DAD'
    ],
    {
    A: 'create:mechanical_piston',
    B: '#storagedrawers:half_drawers',
    C: 'create:cogwheel',
    D: '#forge:plates/iron'
    }
  )

  //成型台
  event.remove({id:"storagedrawers:framing_table"})
  event.shaped(
    Item.of('storagedrawers:framing_table', 1),
    [
    ' C ',
    'DDD',
    'B B'
    ],
    {
    B: 'create:andesite_alloy',
    C: 'stonecutter',
    D: '#forge:stripped_logs'
    }
  )
})
