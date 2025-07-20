ServerEvents.recipes(event => {
  const UndergardenWoodType = [
    'smogstem',
    'wigglewood',
    'grongle'
  ]

  const GoetyWoodType = [
      'haunted',
      'rotten',
      'windswept',
      'pine'
  ]

  UndergardenWoodType.forEach((id) => {
    event.recipes.create.cutting(`undergarden:stripped_${id}_log`, `undergarden:${id}_log`)
    event.recipes.create.cutting(`undergarden:stripped_${id}_wood`, `undergarden:${id}_wood`)
    event.recipes.create.cutting(`6x undergarden:${id}_planks`, `undergarden:stripped_${id}_log`)
    event.recipes.create.cutting(`6x undergarden:${id}_planks`, `undergarden:stripped_${id}_wood`)
  })

  GoetyWoodType.forEach((id) => {
    event.recipes.create.cutting(`goety:stripped_${id}_log`, `goety:${id}_log`)
    event.recipes.create.cutting(`goety:stripped_${id}_wood`, `goety:${id}_wood`)
    event.recipes.create.cutting(`6x goety:${id}_planks`, `goety:stripped_${id}_log`)
    event.recipes.create.cutting(`6x goety:${id}_planks`, `goety:stripped_${id}_wood`)
  })

  event.recipes.create.cutting(`outer_end:azure_stripped_stem`, `outer_end:azure_stem`)
  event.recipes.create.cutting(`outer_end:azure_stripped_pith`, `outer_end:azure_pith`)
  event.recipes.create.cutting(`6x outer_end:azure_planks`, `outer_end:azure_stripped_stem`)
  event.recipes.create.cutting(`6x outer_end:azure_planks`, `outer_end:azure_stripped_pith`)
  event.recipes.create.cutting(`netherexp:stripped_claret_stem`, 'netherexp:cerebrage_claret_stem')
  event.recipes.create.cutting(`netherexp:stripped_claret_hyphae`, 'netherexp:cerebrage_claret_hyphae')
  event.recipes.create.cutting(`6x netherexp:claret_planks`, 'netherexp:stripped_claret_stem')
  event.recipes.create.cutting(`6x netherexp:claret_planks`, 'netherexp:stripped_claret_hyphae')


  //鲶鱼转化
  event.shapeless(Item.of('alexsmobs:raw_catfish',1),
        [
            'tide:catfish'
        ]
  )

  //凝胶复刻示意图
  event.shaped(
    Item.of('minecraft:barrier'),
    [
        'AAA',
        'ABA',
        'AAA'
    ],
    {
        A: 'alexsmobs:mimicream',
        B: 'minecraft:barrier'
    }
  )

  //墨囊
  event.recipes.create.filling(
    Item.of('minecraft:ink_sac', 1),
    [
      "#forge:leather",
      Fluid.of('create_enchantment_industry:ink', 250)
    ]
  )

  /*
  //铁矿混合粉也可以用铁粉做
  event.recipes.create.mixing('3x tfmg:blasting_mixture', ['#forge:dusts/iron','#forge:dusts/iron','#forge:dusts/iron','tfmg:limesand'])

  //石灰砂可以用方解石磨
  event.remove({id:"create:milling/calcite"})
  event.recipes.create.milling([Item.of('tfmg:limesand').withChance(0.5), Item.of('bone_meal').withChance(0.75)], 'calcite')
  */

  //我寻思工业大麻也能做绳子
  event.shaped('3x farmersdelight:rope', [ 
    'AA', 
    'AA',
    'AA'  
  ], {
    A: 'immersiveengineering:hemp_fiber'
  })

  //干岩盐怎么就不能磨出盐了
  //event.recipes.create.crushing(Item.of('salt:raw_rock_salt').withChance(0.25), 'biomesoplenty:dried_salt')

  //硫磺石就不是硫磺了吗？
  //event.recipes.create.crushing(Item.of('#forge:dusts/sulfur').withChance(0.1), 'biomesoplenty:brimstone')

  //更真实的铁栅栏
  event.replaceInput(
    {id:"minecraft:iron_bars"},
    '#forge:ingots/iron',
    '#forge:rods/iron'
  )

  //所有沙子都可以注水成为原版沙子
  event.recipes.create.filling(Item.of('sand'), [Ingredient.of("#minecraft:sand").subtract('minecraft:sand'), Fluid.of('minecraft:water', 100)])

  //由于移除了沉浸工程锯木机，补充锯末的获取配方
  event.recipes.create.cutting(Item.of('immersiveengineering:dust_wood'), 'createdieselgenerators:wood_chip')

  //锯末面包……
  event.shaped('2x bread', [ 
    'BAB', 
    'ABA' 
  ], {
    A: 'createdieselgenerators:wood_chip',
    B: 'wheat'
  })

  //纸浆
  event.remove({id: 'create:mixing/cardboard_pulp'})
  event.recipes.create.mixing('create:pulp', ['immersiveengineering:dust_wood', 'immersiveengineering:dust_wood', 'farmersdelight:straw', 'farmersdelight:straw', Fluid.of('immersiveengineering:creosote', 100), Fluid.of('minecraft:water', 100)])

  //钟(?)
  event.shaped('bell', [ 
    'B', 
    'A' 
  ], {
    A: '#forge:plates/bronze',
    B: '#forge:storage_blocks/bronze'
  })

  //工业肥料搅拌配方
  event.recipes.create.mixing('3x immersiveengineering:fertilizer', ['#forge:dusts/sulfur', '#forge:dusts/saltpeter', '#forge:slag', Fluid.of('minecraft:water', 1000)])

  //工作台的通用性适配
  event.replaceInput(
    {input:'minecraft:crafting_table'},
    'minecraft:crafting_table',
    '#forge:workbench'
  )

  //皮革
  event.replaceInput(
    {input:'minecraft:leather'},
    'minecraft:leather',
    '#forge:leather'
  )

  //任意末影珍珠合成原版末影珍珠
  event.shapeless(Item.of('minecraft:ender_pearl',1),
        [
            '#forge:ender_pearls'
        ]
  )

  //灵质流体物品搅拌转化
  event.recipes.create.mixing('goety:ectoplasm', Fluid.of('netherexp:ectoplasm', 125))

  //蛋糕！
  //其它蛋糕的统一慢慢做吧
  event.remove({output:"minecraft:cake", type: "minecraft:crafting"})
  

  //下面是一些重复配方的移除
  event.replaceInput(
    {id:'bucketlib:farmersdelight/wheat_dough_from_water'},
    'minecraft:wheat',
    '#forge:flour'
  )
  event.remove({ id: 'beautify:rope' })
  event.remove({ id:"everycomp:c/botania/livingwood_slab_from_livingwood_planks_stonecutting" })
  event.remove({ id:"everycomp:c/botania/livingwood_stairs_from_livingwood_planks_stonecutting" })
  event.remove({ id:"everycomp:c/botania/dreamwood_slab_from_dreamwood_planks_stonecutting" })
  event.remove({ id:"everycomp:c/botania/dreamwood_stairs_from_dreamwood_planks_stonecutting" })
  event.remove({ id: 'create:industrial_iron_block_from_ingots_iron_stonecutting' })
  event.remove({ id: 'create:filling/compat/immersiveengineering/treated_wood_in_spout' })
  event.remove({ id: 'createnuclear:splashing/crushed_raw_lead' })
  event.remove({ id: 'createnuclear:crushing/charcoal' })
  event.remove({ id: 'createnuclear:crushing/fix/crushed_raw_uranium' })
  event.remove({ id: 'createnuclear:crushing/raw_uranium_block' })
  event.remove({ id: 'create:crushing/tuff' })
  event.remove({ id: 'create:crushing/tuff_recycling' })
  event.remove({ id: 'createaddition:mixing/electrum' })
  event.remove({ id: 'createaddition:compat/immersiveengineering/crushing/coal_coke'})
  event.remove({ id: 'createaddition:compat/immersiveengineering/crushing/coke_block'})
  event.remove({ id: 'oreganized:create/mixing/electrum_ingot' })
  event.remove({ id: 'oreganized:create/splashing/crushed_lead_ore' })
  event.remove({ id: 'oreganized:create/splashing/crushed_silver_ore' })
  event.remove({ input: 'oreganized:bush_hammer' })
  event.remove({ output: 'oreganized:bush_hammer' })
  event.remove({ id: 'farmersdelight:cutting/saddle' })
  event.remove({ id: 'vintageimprovements:centrifugation/mud' })
  event.remove({ id: 'vintageimprovements:pressurizing/compat/sulfur_dioxide_from_dust' })

})