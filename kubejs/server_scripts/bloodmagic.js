//此文件提供血魔法系列修改
//syphon=LP数值
//altarLevel/orbLevel=等级
//consumptionRate=LP消耗率（速度）
//drainRate=LP流失率（损耗）
//tick=速度（20tick=1s）
//count=数量
//minimumDrain=恶魔意志最小值
//drain=恶魔意志消耗值

ServerEvents.recipes(event => {
    //修改血祭坛配方
    //底层青铜，两侧活石，中间高炉砖
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:altar'},
    'minecraft:gold_ingot', 'kubejs:bronze_ingot' )
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:altar'},
    '#balm:stones', 'botania:livingrock' )
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:altar'},
    'minecraft:furnace', 'immersiveengineering:blastbrick' )

    //删除基岩配方
    event.remove({id:'bloodmagic:array/day'})
    event.remove({id:'bloodmagic:array/night'})
    event.remove({id:'bloodmagic:array/spike'})
    event.remove({id:'bloodmagic:array/bounce'})
    event.remove({id:'bloodmagic:array/movement'})
    event.remove({id:'bloodmagic:array/updraft'})

    //炼金术桌配方修改
    //魔力粉-奥术源质兑换
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item": 'botania:mana_powder'
            }
        ],
        "output": {
          "item": 'irons_spellbooks:arcane_essence'
        },
        "syphon": 500,
        "ticks": 200,
        "upgradeLevel": 1
    })
    //史莱姆球兑换末影之眼
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item": 'minecraft:slime_ball'
            },
            {
                "item":'minecraft:blaze_powder'
            },
            {
                "item":'create:powdered_obsidian'
            }
        ],
        "output": {
          "item": 'minecraft:ender_pearl'
        },
        "syphon": 1000,
        "ticks": 200,
        "upgradeLevel": 2
    })
    //熔岩瓶子提取恶魂之泪
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item": 'alexsmobs:lava_bottle'
            },
            {
                "item":'irons_spellbooks:arcane_ingot'
            },
            {
                "item":'create:powdered_obsidian'
            }
        ],
        "output": {
          "item": 'minecraft:ghast_tear'
        },
        "syphon": 1000,
        "ticks": 500,
        "upgradeLevel": 4
    })
    //虚空蠕虫之眼制造瞻远者刷怪蛋
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "tag": 'forge:eggs'
            },
            {
                "item":'alexsmobs:void_worm_eye'
            },
            {
                "item":'create:powdered_obsidian'
            },
            {
                "item":'blue_skies:glowing_nature_stone'
            }
        ],
        "output": {
          "item": 'alexsmobs:spawn_egg_farseer'
        },
        "syphon": 10000,
        "ticks": 200,
        "upgradeLevel": 5
    })
    //潜影盒炼制宝箱怪
    //追加一个肉块配方
    event.shaped(Item.of('biomesoplenty:flesh',1),
        ['AAA',
        'ABA',
        'AAA'],
        {
            A:'minecraft:rotten_flesh',
            B:'minecraft:bone'
        }
    )
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "tag": 'minecraft:shulker_boxes'
            },
            {
                "tag": 'forge:eggs'
            },
            {
                "item":'botania:pixie_dust'
            },
            {
                "item":'minecraft:bone_block'
            },
            {
                "item":'biomesoplenty:flesh'
            }
        ],
        "output": {
          "item": 'artifacts:mimic_spawn_egg'
        },
        "syphon": 5000,
        "ticks": 200,
        "upgradeLevel": 5
    })

    //祭坛配方修改
    //雷电瓶生成
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 500,
        "consumptionRate": 10,
        "drainRate": 0,
        "input": {
            "item": 'botania:mana_bottle'
        },
        "output": {
            "item": 'irons_spellbooks:lightning_bottle'
        },
        "upgradeLevel": 1
    })
    //四级血魔法宝珠（导师宝珠）合成方式修改
    event.remove({id:'bloodmagic:altar/masterbloodorb'})
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 40000,
        "consumptionRate": 50,
        "drainRate": 50,
        "input": {
            "item": 'immersiveengineering:storage_steel'
        },
        "output": {
            "item": "bloodmagic:masterbloodorb"
        },
        "upgradeLevel": 3
    })
    //万能仪式石合成
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 80000,
        "consumptionRate": 100,
        "drainRate": 10,
        "input": {
            "item": 'undergarden:forgotten_block'
        },
        "output": {
            "item": 'bloodmagic:activationcrystalcreative'
        },
        "upgradeLevel": 3
    })

    //炼金矩阵配方修改
    //点铁成金
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'botania:mana_powder'
        },
        "baseinput": {
            "item": 'minecraft:iron_ingot'
        },
        "output": {
            "item": 'minecraft:gold_ingot'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //点金成钻
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'botania:terrasteel_nugget'
        },
        "baseinput": {
            "item": 'minecraft:gold_ingot'
        },
        "output": {
            "item": 'minecraft:diamond'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //点盖亚成下界合金
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'botania:dragonstone_block'
        },
        "baseinput": {
            "item": 'botania:gaia_ingot'
        },
        "output": {
            "item": 'minecraft:netherite_ingot'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
})