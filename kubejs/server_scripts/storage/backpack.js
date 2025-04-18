ServerEvents.recipes(event => {
    //背包
    //基础材料替换
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'#forge:ingots/iron'},
        '#forge:ingots/iron',
        '#forge:plates/andesite'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'#forge:ingots/gold'},
        '#forge:ingots/gold',
        'create:brass_ingot'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'#forge:gems/diamond'},
        '#forge:gems/diamond',
        '#forge:gems/dragonstone'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'#forge:dusts/redstone'},
        '#forge:dusts/redstone',
        'irons_spellbooks:arcane_essence'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'experience_bottle'},
        'experience_bottle',
        'create:experience_nugget'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'#forge:glass'},
        '#forge:glass',
        'create:fluid_tank'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'dispenser'},
        'dispenser',
        'kubejs:logistical_engineering'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'piston', not:{output:"sophisticatedbackpacks:compacting_upgrade"}},
        'piston',
        'create:andesite_tunnel'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'sticky_piston'},
        'sticky_piston',
        'create:andesite_funnel'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*upgrade.*/, input:'#forge:chests'},
        '#forge:chests',
        'kubejs:logistical_engineering'
    )
    event.replaceInput(
        {id:/sophisticatedbackpacks\:.*filter_upgrade.*/, input:'#forge:strings'},
        '#forge:strings',
        'create:filter'
    )


    //修改初始背包配方
    event.remove({id:'sophisticatedbackpacks:backpack'})
    event.shaped(Item.of('sophisticatedbackpacks:backpack',1),
        ['BAB',
        'BCB',
        'DED'],
        {
            A:'#forge:leather',
            B:'#forge:string',
            C:'#balm:wooden_chests',
            D:'irons_spellbooks:magic_cloth',
            E:'create:andesite_alloy'
        }
    )

    //磁铁升级
    event.shapeless(Item.of('sophisticatedbackpacks:magnet_upgrade',1),
        [
            'sophisticatedbackpacks:upgrade_base',
            'artifacts:universal_attractor'
        ]
    )
    event.shaped(
        Item.of('sophisticatedbackpacks:magnet_upgrade'),
        [
            'ABA',
            'CDE',
            ' F '
        ],
        {
            A: 'create:brass_ingot',
            B: 'botania:magnet_ring',
            E: 'blue_skies:horizonite_ingot',
            D: 'sophisticatedbackpacks:upgrade_base',
            C: 'blue_skies:falsite_ingot',
            F: 'blue_skies:ventium_ingot'
        }
    )

    //金和钻石背包修改
    event.remove({id:'sophisticatedbackpacks:gold_backpack'})   
    event.custom({
        "type":
            "sophisticatedbackpacks:backpack_upgrade",
        "conditions":[{
            "type":
                "sophisticatedcore:item enabled",
            "itemRegistryName":
                "sophisticatedbackpacks:gold_backpack"
        }],
        "key":{
            "A":{
                "item":'irons_spellbooks:epic_ink'
            },
            "B":{
                "item":'botania:elementium_ingot'
            },
            "C":{
                "item":'sophisticatedbackpacks:iron_backpack'
            },
            "D":{
                "item":'goety:soul_emerald'
            },
            "E":{
                "item":'botania:terrasteel_ingot'
            },
            "F":{
                "tag":"forge:ingots/gold"
            }
        },
        "pattern": [
            "FAF",
            "BCD",
            "FEF"
        ],
        "result":{
            "item":
                "sophisticatedbackpacks:gold_backpack"
        }
    })
 

    event.remove({id:'sophisticatedbackpacks:diamond_backpack'})
    event.custom({
        "type":
            "sophisticatedbackpacks:backpack_upgrade",
        "conditions":[{
            "type":
                "sophisticatedcore:item enabled",
            "itemRegistryName":
                "sophisticatedbackpacks:diamond_backpack"
        }],
        "key":{
            "A":{
                "item":'irons_spellbooks:legendary_ink'
            },
            "B":{
                "item":'botania:dragonstone'
            },
            "C":{
                "item":'sophisticatedbackpacks:gold_backpack'
            },
            "D":{
                "item":'goety:dark_ingot'
            },
            "E":{
                "item":'botania:gaia_ingot'
            },
            "F":{
                "item":'botania:mana_diamond'
            }
        },
        "pattern": [
            "FAF",
            "BCD",
            "FEF"
        ],
        "result":{
            "item":
                "sophisticatedbackpacks:diamond_backpack"
        }
    })
 
})