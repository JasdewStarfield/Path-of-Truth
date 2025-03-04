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
    /*event.shapeless(Item.of('biomesoplenty:glowing_moss_block',1),
        [
            'minecraft:moss_block',
            'biomesoplenty:glowworm_silk'
        ]
    )*/
    //青猪苔藓转化
    
    //沙漠蛛蜂合成
    
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
    //酋长蟹及其复制
    event.recipes.botania.mana_infusion('2x collectorsreap:chieftain_crab_spawn_egg', 'collectorsreap:chieftain_crab_spawn_egg', 1000,'botania:conjuration_catalyst')
    //螳螂虾及其复制
    event.recipes.botania.mana_infusion('2x alexsmobs:spawn_egg_mantis_shrimp', 'alexsmobs:spawn_egg_mantis_shrimp', 5000,'botania:conjuration_catalyst')
    //皱鳃鲨和锤头鲨
    
    //抹香鲸
    event.shapeless(Item.of('alexsmobs:spawn_egg_cachalot_whale',1),
        [
            'alexsmobs:spawn_egg_hammerhead_shark',
            'minecraft:bedrock'
        ]
    )
    //拟态章鱼
    
    //飞鱼
    
    //鳌虫刷怪蛋（海洋/沙漠交叉）

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
    
    //弹涂鱼
    
    //鸭嘴兽
    
    //臭鼬

    //两栖系
    //水龟
    
    //凯门鳄

    //大鳄龟
    
    //曦鹤
    event.recipes.botania.terra_plate('alexsmobs:spawn_egg_sunbird', 
        [
            'alexsmobs:emu_egg', 
            'botania:flight_tiara',
            'minecraft:elytra'
        ], 
        100000
    )
})