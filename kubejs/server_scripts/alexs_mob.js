//此文件特别提供alex生物系列的修改、炼成、材料转化
//也包括一些生物环境的处理和材料转化
//目前暂定三个系别：沙漠系，丛林系，海洋系

ServerEvents.recipes(event => {

    //首先是非常见生物的刷怪蛋/材料

    //鸡蛋的生产和复制
    event.recipes.botania.petal_apothecary('minecraft:egg', 
        [
            'minecraft:clay_ball',
            'minecraft:feather',
            'minecraft:string'
        ]
    )
    event.recipes.botania.mana_infusion('2x minecraft:egg', 'minecraft:egg', 500)

    //沙漠系生物/材料
    //沙风之眼
    event.recipes.botania.runic_altar('alexsmobs:guster_eye', 
        [
            'minecraft:emerald', 
            'botania:rune_air',
            'kubejs:horizonite_dust',
            'minecraft:sand'
        ], 
        2500
    )
    //沙风之眼复制
    event.recipes.botania.mana_infusion('2x alexsmobs:guster_eye', 'alexsmobs:guster_eye', 5000,'botania:conjuration_catalyst')
    //蟑螂卵鞘
    event.recipes.botania.runic_altar('alexsmobs:cockroach_ootheca', 
        [
            'alexsmobs:maggot', 
            'botania:fertilizer',
            'undergarden:mogmoss',
            'minecraft:dirt'
        ], 
        2500
    )
    //苔藓转化
    event.shapeless(Item.of('biomesoplenty:glowing_moss_block',1),
        [
            'minecraft:moss_block',
            'biomesoplenty:glowworm_silk'
        ]
    )
    //青猪苔藓转化
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'minecraft:porkchop'
        },
        "baseinput": {
            "item": 'minecraft:moss_block'
        },
        "output": {
            "item": 'undergarden:mogmoss'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //沙漠蛛蜂合成
    event.custom({
        "type": "bloodmagic:soulforge",
        "drain": 128.0,//单次吸收量
        "input0": {
            "tag": 'balm:eggs'
        },
        "input1": {
            "item": 'alexsmobs:guster_eye'
        },
        "input2": {
            "item": 'alexsmobs:cockroach_wing'
        },
        "input3": {
            "item": 'minecraft:spider_eye'
        },
        "minimumDrain": 240.0,//要求使用材料内灵魂的最低量
        "output": {
            "count": 1,//生成数量
            "item": 'alexsmobs:spawn_egg_tarantula_hawk'
        }
    })
    //走鹃
    event.recipes.botania.runic_altar('alexsmobs:spawn_egg_roadrunner', 
        [
            '#balm:eggs', 
            'minecraft:feather',
            'alexsmobs:guster_eye',
            'minecraft:sand'
        ], 
        2500
    )
    //鸸鹋
    event.recipes.botania.runic_altar('alexsmobs:spawn_egg_emu', 
        [
            'alexsmobs:spawn_egg_roadrunner', 
            'alexsmobs:roadrunner_feather',
            'alexsmobs:guster_eye',
            'minecraft:sand'
        ], 
        2500
    )
    //响尾蛇
    event.recipes.botania.runic_altar('alexsmobs:spawn_egg_rattlesnake', 
        [
            'farmersdelight:rope', 
            'minecraft:poisonous_potato',
            'alexsmobs:guster_eye',
            'minecraft:sand'
        ], 
        2500
    )
    //袋鼠
    event.recipes.botania.runic_altar('alexsmobs:spawn_egg_kangaroo', 
        [
            '#forge:leather', 
            'farmersdelight:horse_feed',
            'alexsmobs:guster_eye',
            'minecraft:sand'
        ], 
        2500
    )

    //海洋系生物/材料
    //龙虾蛋
    event.recipes.botania.runic_altar('alexsmobs:spawn_egg_lobster', 
        [
            '#balm:eggs', 
            'botania:rune_water',
            'kubejs:falsite_dust',
            'minecraft:water_bucket'
        ], 
        2500
    )
    //龙虾复制
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_lobster', 'alexsmobs:spawn_egg_lobster', 1000,'botania:conjuration_catalyst')
    //螳螂虾及其复制
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'artifacts:fire_gauntlet'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_lobster'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_mantis_shrimp'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_mantis_shrimp', 'alexsmobs:spawn_egg_mantis_shrimp', 5000,'botania:conjuration_catalyst')
    //皱鳃鲨和锤头鲨
    event.custom({
        "type": "bloodmagic:altar",
        "altarSyphon": 5000,
        "consumptionRate": 50,
        "drainRate": 0,
        "input": {
            "item": 'alexsmobs:spawn_egg_lobster'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_frilled_shark'
        },
        "upgradeLevel": 2
    })
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'immersiveengineering:hammer'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_frilled_shark'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_hammerhead_shark'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //抹香鲸
    event.shapeless(Item.of('alexsmobs:spawn_egg_cachalot_whale',1),
        [
            'alexsmobs:spawn_egg_hammerhead_shark',
            'bloodmagic:largebloodstonebrick'
        ]
    )
    //拟态章鱼
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'alexsmobs:mimicream'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_lobster'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_mimic_octopus'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //飞鱼
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'alexsmobs:cockroach_wing'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_lobster'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_flying_fish'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //鳌虫刷怪蛋（海洋/沙漠交叉）
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'alexsmobs:guster_eye'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_lobster'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_triops'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })

    //丛林系
    //香蕉蛞蝓及其复制
    event.recipes.botania.runic_altar('alexsmobs:spawn_egg_banana_slug', 
        [
            '#balm:eggs', 
            'botania:rune_earth',
            'kubejs:ventium_dust',
            'alexsmobs:banana'
        ], 
        2500
    )
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_banana_slug', 'alexsmobs:spawn_egg_banana_slug', 500,'botania:conjuration_catalyst')
    //科莫多巨蜥
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'blue_skies:glowing_poison_stone'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_banana_slug'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_komodo_dragon'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //弹涂鱼
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'minecraft:mangrove_propagule'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_banana_slug'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_mudskipper'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })
    //鸭嘴兽
    event.custom({
        "type": "bloodmagic:array",
        "addedinput": {
            "item": 'minecraft:leather'
        },
        "baseinput": {
            "item": 'alexsmobs:spawn_egg_banana_slug'
        },
        "output": {
            "item": 'alexsmobs:spawn_egg_platypus'
        },
        "texture": "bloodmagic:textures/models/alchemyarrays/bindingarray.png"
    })

})