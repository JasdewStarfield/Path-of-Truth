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
    //修改炼金炉配方
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:alchemicalreactionchamber'},
    'minecraft:furnace', 'immersiveengineering:blastbrick' )
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:alchemicalreactionchamber'},
    'minecraft:iron_block', 'undergarden:cloggrum_block' )
    //修改主仪式石配方
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:masterritualstone'},
    'minecraft:obsidian', 'tfmg:steel_casing' )

    //磁铁最终升级
    event.smithing(
        'create_new_age:netherite_magnet',
        'create_new_age:fluxuated_magnetite',
        'minecraft:netherite_ingot'
    )

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
                "item":'tfmg:aluminum_ingot'
            },
            {
                "item":'irons_spellbooks:arcane_salvage'
            },
            {
                "item":'blue_skies:glowing_nature_stone'
            },
            {
                "item":'alexsmobs:mimicream'
            }
        ],
        "output": {
          "item": 'alexsmobs:spawn_egg_farseer'
        },
        "syphon": 10000,
        "ticks": 200,
        "upgradeLevel": 5
    })
    //箱子炼制宝箱怪
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
                "tag": 'forge:chests'
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
            },
            {
                "item":'alexsmobs:mimicream'
            }
        ],
        "output": {
          "item": 'artifacts:mimic_spawn_egg'
        },
        "syphon": 5000,
        "ticks": 200,
        "upgradeLevel": 5
    })
    //潜影盒活化为潜影贝
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
                "item":'minecraft:popped_chorus_fruit'
            },
            {
                "item":'botania:corporea_spark_master'
            },
            {
                "item":'minecraft:end_crystal'
            },
            {
                "item":'alexsmobs:mimicream'
            }
        ],
        "output": {
          "item": 'minecraft:shulker_spawn_egg'
        },
        "syphon": 20000,
        "ticks": 200,
        "upgradeLevel": 5
    })
    //紫水晶母岩合成
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item":'alexsmobs:dimensional_carver'
            },
            {
                "item":'minecraft:dragon_egg'
            },
            {
                "item":'minecraft:amethyst_block'
            },
            {
                "item":'botania:spawner_mover'
            }
        ],
        "output": {
          "item": 'minecraft:budding_amethyst'
        },
        "syphon": 10000,
        "ticks": 200,
        "upgradeLevel": 5
    })
    //晶簇炼金变化
    //腐蚀，破坏，复仇，坚毅
    //腐蚀
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item":'bloodmagic:rawdemoncrystal'
            },
            {
                "item":'botania:life_essence'
            },
            {
                "item":'minecraft:poisonous_potato'
            }
        ],
        "output": {
          "item": 'bloodmagic:corrosivedemoncrystal'
        },
        "syphon": 5000,
        "ticks": 100,
        "upgradeLevel": 5
    })
    //破坏
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item":'bloodmagic:rawdemoncrystal'
            },
            {
                "item":'botania:life_essence'
            },
            {
                "item":'bloodmagic:veinmine_charge_2'
            }
        ],
        "output": {
          "item": 'bloodmagic:destructivedemoncrystal'
        },
        "syphon": 5000,
        "ticks": 100,
        "upgradeLevel": 5
    })
    //复仇
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item":'bloodmagic:rawdemoncrystal'
            },
            {
                "item":'botania:life_essence'
            },
            {
                "item":'biomesoplenty:bramble'
            }
        ],
        "output": {
          "item": 'bloodmagic:vengefuldemoncrystal'
        },
        "syphon": 5000,
        "ticks": 100,
        "upgradeLevel": 5
    })
    //坚毅
    event.custom({
        "type": "bloodmagic:alchemytable",
        "input": [
            {
                "item":'bloodmagic:rawdemoncrystal'
            },
            {
                "item":'botania:life_essence'
            },
            {
                "tag":'forge:ingots/steel'
            }
        ],
        "output": {
          "item": 'bloodmagic:steadfastdemoncrystal'
        },
        "syphon": 5000,
        "ticks": 100,
        "upgradeLevel": 5
    })

    //祭坛配方修改
    //耐火黏土生成
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 1000,
        "consumptionRate": 20,
        "drainRate": 0,
        "input": {
            "item": 'minecraft:clay'
        },
        "output": {
            "item": 'tfmg:fireclay'
        },
        "upgradeLevel": 1
    })
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 250,
        "consumptionRate": 10,
        "drainRate": 0,
        "input": {
            "item": 'minecraft:clay_ball'
        },
        "output": {
            "item": 'tfmg:fireclay_ball'
        },
        "upgradeLevel": 1
    })
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
            "item": 'tfmg:steel_block'
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
    //创造魔力池合成
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 500000,
        "consumptionRate": 200,
        "drainRate": 0,
        "input": {
            "item": 'bloodmagic:lightritualstone'
        },
        "output": {
            "item": 'botania:creative_pool'
        },
        "upgradeLevel": 4
    })
    //盖亚之魂合成奥术残骸
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 10000,
        "consumptionRate": 200,
        "drainRate": 0,
        "input": {
            "item": 'botania:life_essence'
        },
        "output": {
            "item": 'irons_spellbooks:arcane_debris'
        },
        "upgradeLevel": 2
    })
    //灰烬源质转化
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 2000,
        "consumptionRate": 50,
        "drainRate": 0,
        "input": {
            "item": 'irons_spellbooks:arcane_essence'
        },
        "output": {
            "item": 'irons_spellbooks:cinder_essence'
        },
        "upgradeLevel": 4
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
    //点下界合金成遗忆锭
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'minecraft:netherite_ingot'
        },
        "baseinput": {
            "item": 'minecraft:netherite_ingot'
        },
        "output": {
            "item": 'undergarden:forgotten_ingot'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/firesigil.png"
    })
    //下界合金盔甲注入盖亚之魂活化
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'botania:life_essence'
        },
        "baseinput": {
            "item": 'minecraft:netherite_chestplate'
        },
        "output": {
            "item": 'irons_spellbooks:armor_pile'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //姜饼人活化
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'botania:corporea_spark'
        },
        "baseinput": {
            "item": 'create_confectionery:gingerbread_man'
        },
        "output": {
            "item": 'create_confectionery:little_gingerbread_man_spawn_egg'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/airsigil.png"
    })
    //点铁成缪铁
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'minecraft:amethyst_shard'
        },
        "baseinput": {
            "item": 'minecraft:iron_ingot'
        },
        "output": {
            "item": 'blue_skies:falsite_ingot'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/watersigil.png"
    })
    //点钻成绛紫晶
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'minecraft:amethyst_block'
        },
        "baseinput": {
            "item": 'minecraft:diamond'
        },
        "output": {
            "item": 'blue_skies:charoite'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/airsigil.png"
    })
    //建立创造多媒体火花
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'kubejs:midnight'
        },
        "baseinput": {
            "item": 'botania:corporea_spark'
        },
        "output": {
            "item": 'botania:corporea_spark_creative'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //终极锭炼金翻转
    event.remove({id:'createchromaticreturn:antiplite_recipe'})
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'create_new_age:netherite_magnet'
        },
        "baseinput": {
            "item": 'createchromaticreturn:multiplite_ingot'
        },
        "output": {
            "item": 'createchromaticreturn:antiplite_ingot'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //磁铁升级（红石-铁金）
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'kubejs:gold_silver_mix'
        },
        "baseinput": {
            "item": 'create_new_age:redstone_magnet'
        },
        "output": {
            "item": 'create_new_age:layered_magnet'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/watersigil.png"
    })
    //龙蛋催化
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'botania:black_lotus'
        },
        "baseinput": {
            "item": 'minecraft:dragon_egg'
        },
        "output": {
            "item": 'minecraft:dragon_head'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/airsigil.png"
    })

    //灵魂锻炉配方修改
    //创造储存升级
    event.custom({
        "type": "bloodmagic:soulforge",
        "drain": 10.0,//单次吸收量
        "input0": {
            "item": 'storagedrawers:emerald_storage_upgrade'
        },
        "input1": {
            "item": 'sophisticatedbackpacks:everlasting_upgrade'
        },
        "input2": {
            "item": 'sophisticatedbackpacks:stack_upgrade_tier_4'
        },
        "input3": {
            "item": 'bloodmagic:altarcapacityrune2'
        },
        "minimumDrain": 128.0,//要求使用材料的最低容量
        "output": {
            "count": 1,//生成数量
            "item": 'storagedrawers:creative_storage_upgrade'
        }
    })
    //凋零骷髅刷怪蛋合成
    event.custom({
        "type": "bloodmagic:soulforge",
        "drain": 128.0,//单次吸收量
        "input0": {
            "item": 'minecraft:wither_skeleton_skull'
        },
        "input1": {
            "item": 'tide:witherfin'
        },
        "input2": {
            "item": 'immersive_armors:wither_chestplate'
        },
        "input3": {
            "tag": 'forge:eggs'
        },
        "minimumDrain": 512.0,//要求使用材料的最低容量
        "output": {
            "count": 1,//生成数量
            "item": 'minecraft:wither_skeleton_spawn_egg'
        }
    })
    //丝绸锭合成
    event.remove({id:'createchromaticreturn:silkstrum_recipe'})
    event.custom({
        "type": "bloodmagic:soulforge",
        "drain": 4096.0,//单次吸收量
        "input0": {
            "item": 'createchromaticreturn:glowing_ingot'
        },
        "input1": {
            "item": 'bloodmagic:activationcrystalcreative'
        },
        "input2": {
            "item": 'bloodmagic:strong_tau'
        },
        "input3": {
            "item": 'bloodmagic:lightritualstone'
        },
        "minimumDrain": 4096.0,//要求使用材料的最低容量
        "output": {
            "count": 1,//生成数量
            "item": 'createchromaticreturn:silkstrum'
        }
    })

    //炼金反应炉配方修改
    //磁铁系列升级（无-红石，铁金-钻）
    event.custom({
        "type": "bloodmagic:arc",
        //可能存在的追加输出（可以不写）
        "addedoutput": [
            {
            "type": {
                "item": 'minecraft:redstone'
            },
            "chance": 0.5,
            "mainchance": 0.0
            }
        ],
        //消耗配方（？）
        "consumeingredient": false,
        //输入材料
        "input": {
            "item": 'create_new_age:magnetite_block'
        },
        //输入液体（可以不写）
        "inputFluid": {
            "amount": 1000,
            "fluid": 'immersiveengineering:redstone_acid'
        },
        //输入数量（大概）
        "inputsize": 1,
        //主要产物输出几率
        "mainoutputchance": 0.0,
        //输出产物内容
        "output": {
            "count": 1,//输出数量（可以不写）
            "item": 'create_new_age:redstone_magnet'
        },
        //输出液体（可以不写）
        "outputFluid": {
            "amount": 500,
            "fluid": 'minecraft:water'
        },
        //使用工具（必须是血魔法原有工具）
        "tool": {
            "tag": 'bloodmagic:arc/hydrate'
        }
    })
    event.custom({
        "type": "bloodmagic:arc",
        //可能存在的追加输出（可以不写）
        //消耗配方（？）
        "consumeingredient": false,
        //输入材料
        "input": {
            "item": 'create_new_age:layered_magnet'
        },
        //输入液体（可以不写）
        "inputFluid": {
            "amount": 1000,
            "fluid": 'tfmg:kerosene'
        },
        //输入数量（大概）
        "inputsize": 1,
        //主要产物输出几率
        "mainoutputchance": 0.0,
        //输出产物内容
        "output": {
            "count": 1,//输出数量（可以不写）
            "item": 'create_new_age:fluxuated_magnetite'
        },
        //输出液体（可以不写）
        "outputFluid": {
            "amount": 100,
            "fluid": 'immersiveengineering:creosote'
        },
        //使用工具（必须是血魔法原有工具）
        "tool": {
            "tag": 'bloodmagic:arc/hydrate'
        }
    })

})