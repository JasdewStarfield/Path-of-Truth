ServerEvents.recipes(event => {

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