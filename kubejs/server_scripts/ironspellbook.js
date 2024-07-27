//此文件提供铁魔法系列修改
ServerEvents.recipes(event => {

    //保留nbt的有序合成
    //可以用于背包、法术书升级一类的需要保留“内容”的配方
    //result, shape, keys：你正常写有序合成的部分，直接粘贴就行
    //source：你需要保留nbt的那个物品
    //extraNBTs：额外添加的nbt，可以用来改法术书容量之类的
    function keepNBTShapedCrafting(result, shape, keys, source, extraNBTs) {
        let resultItem = Item.of(result)
        event.shaped(resultItem, shape, keys).modifyResult((grid, stack) => {
            let sourceNBTs = grid.find(source).nbt
            stack.nbt.merge(sourceNBTs)
            stack.nbt.merge(extraNBTs)
            return stack
        })
    }

    //删除堆叠升级
    event.remove({id:'sophisticatedbackpacks:stack_upgrade_starter_tier'})
    event.remove({id:'sophisticatedbackpacks:stack_upgrade_tier_1'})
    event.remove({id:'sophisticatedbackpacks:stack_upgrade_tier_1_from_starter'})
    event.remove({id:'sophisticatedbackpacks:stack_upgrade_tier_2'})
    event.remove({id:'sophisticatedbackpacks:stack_upgrade_tier_3'})
    event.remove({id:'sophisticatedbackpacks:stack_upgrade_tier_4'})
    
    //修改奥术布匹配方
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:magic_cloth'},
    '#minecraft:wool', 'immersiveengineering:hemp_fabric' )

    //修改木质法杖配方
    event.remove({id:'irons_spellbooks:graybeard_staff'})
    event.shaped(Item.of('irons_spellbooks:graybeard_staff',1),
        ['  A',
        ' B ',
        'C  '],
        {
            A:'irons_spellbooks:arcane_essence',
            B:'kubejs:bronze_shovel',
            C:'#forge:ingots'
        }
    )

    //修改法师护甲配方
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:wandering_magician_helmet'},
    'irons_spellbooks:arcane_essence', 'irons_spellbooks:magic_cloth' )
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:wandering_magician_chestplate'},
    'irons_spellbooks:arcane_essence', 'irons_spellbooks:magic_cloth' )
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:wandering_magician_leggings'},
    'irons_spellbooks:arcane_essence', 'irons_spellbooks:magic_cloth' )
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:wandering_magician_boots'},
    'irons_spellbooks:arcane_essence', 'irons_spellbooks:magic_cloth' )
    
    //修改法术书系列配方
    event.remove({id:'irons_spellbooks:iron_spell_book'})
    event.remove({id:'irons_spellbooks:gold_spell_book'})
    event.remove({id:'irons_spellbooks:diamond_spell_book'})

    keepNBTShapedCrafting('irons_spellbooks:iron_spell_book',
        ['ABB',
        'ACD',
        'ABB'],
        {
            A:'minecraft:chain',
            B:'#forge:leather',
            C:'irons_spellbooks:copper_spell_book',
            D:'minecraft:paper'
        },
        'irons_spellbooks:copper_spell_book',
        {ISB_Spells: {maxSpells: 6}}
    )

    keepNBTShapedCrafting('irons_spellbooks:gold_spell_book',
        ['ABB',
        'ACD',
        'ABB'],
        {
            A:'#forge:ingots/brass',
            B:'#forge:leather',
            C:'irons_spellbooks:iron_spell_book',
            D:'irons_spellbooks:arcane_ingot'
        },
        'irons_spellbooks:iron_spell_book',
        {ISB_Spells: {maxSpells: 8}}
    )
    keepNBTShapedCrafting('irons_spellbooks:diamond_spell_book',
        ['ABB',
        'ACD',
        'ABB'],
        {
            A:'botania:mana_diamond',
            B:'irons_spellbooks:hogskin',
            C:'irons_spellbooks:gold_spell_book',
            D:'bloodmagic:apprenticebloodorb'
        },
        'irons_spellbooks:gold_spell_book',
        {ISB_Spells: {maxSpells: 10}}
    )

    //添加普通墨水配方
    event.custom({
        "type": "create:filling",
        "ingredients": [
          {
            "item": "botania:mana_bottle"
          },
          {
            "amount": 1000,
            "fluid": "create_enchantment_industry:ink",
          }
        ],
        "results": [
          {
            "item": "irons_spellbooks:common_ink"
          }
        ]
    })

    //修改传说法术书配方
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:netherite_spell_book'},
    'irons_spellbooks:lightning_bottle', 'botania:terrasteel_ingot' )
    event.replaceInput({mod:'irons_spellbooks',output:'irons_spellbooks:dragonskin_spell_book'},
    'minecraft:obsidian', 'botania:terrasteel_ingot' )

    //奥术铁砧配方重写
    event.remove({id:'irons_spellbooks:arcane_anvil'})
    event.shaped(Item.of('irons_spellbooks:arcane_anvil',1),
        ['ABA',
        ' C ',
        'EDE'],
        {
            A:'botania:manasteel_block',
            B:'minecraft:amethyst_block',
            C:'botania:terrasteel_ingot',
            D:'#minecraft:anvil',
            E:'undergarden:cloggrum_block'
        }
    )

    //泰拉钢锭加入各系胸甲配方
    event.remove({id:'irons_spellbooks:cryomancer_chestplate'})
    event.shaped(Item.of('irons_spellbooks:cryomancer_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:ice_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:pyromancer_chestplate'})
    event.shaped(Item.of('irons_spellbooks:pyromancer_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:fire_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:priest_chestplate'})
    event.shaped(Item.of('irons_spellbooks:priest_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:holy_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:electromancer_chestplate'})
    event.shaped(Item.of('irons_spellbooks:electromancer_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:lightning_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:archevoker_chestplate'})
    event.shaped(Item.of('irons_spellbooks:archevoker_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:evocation_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:cultist_chestplate'})
    event.shaped(Item.of('irons_spellbooks:cultist_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:blood_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:plagued_chestplate'})
    event.shaped(Item.of('irons_spellbooks:plagued_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:nature_rune',
            C:'botania:terrasteel_ingot'
        }
    )
    event.remove({id:'irons_spellbooks:shadowwalker_chestplate'})
    event.shaped(Item.of('irons_spellbooks:shadowwalker_chestplate',1),
        ['ABA',
        'ACA',
        'AAA'],
        {
            A:'irons_spellbooks:magic_cloth',
            B:'irons_spellbooks:ender_rune',
            C:'botania:terrasteel_ingot'
        }
    )

    /*
    event.shaped(Item.of('createchromaticreturn:multiplite_ingot',1),
        ['ABC',
        'DEF',
        'GHI'],
        {
            A:'createchromaticreturn:glowing_ingot',
            B:'createchromaticreturn:refined_radiance',
            C:'createchromaticreturn:silkstrum',
            D:'createchromaticreturn:silkstrum_book',
            E:'createchromaticreturn:industrium_book',
            F:'createchromaticreturn:durasteel_book',
            G:'createchromaticreturn:shadow_steel',
            H:'createchromaticreturn:industrium_ingot',
            I:'createchromaticreturn:durasteel_ingot'
        }
    )*/
})