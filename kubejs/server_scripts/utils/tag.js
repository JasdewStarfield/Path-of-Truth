const engineeringBlocks = [
    'kubejs:andesite_engineering',
    'kubejs:fluid_engineering',
    'kubejs:precise_engineering',
    'kubejs:logistical_engineering',
    'immersiveengineering:light_engineering',
    'immersiveengineering:rs_engineering',
    'immersiveengineering:heavy_engineering',
    'kubejs:electronic_engineering'
]

const LeatherLikeBoots = [
    'alexsmobs:roadrunner_boots',
    'cold_sweat:goat_fur_boots',
    'botania:manaweave_boots',
    'immersive_armors:warrior_boots',
    'immersive_armors:robe_boots',
    'immersive_armors:divine_boots',
    'irons_spellbooks:wandering_magician_boots',
    'irons_spellbooks:pumpkin_boots',
    'irons_spellbooks:pyromancer_boots',
    'irons_spellbooks:electromancer_boots',
    'irons_spellbooks:archevoker_boots',
    'irons_spellbooks:cultist_boots',
    'irons_spellbooks:cryomancer_boots',
    'irons_spellbooks:shadowwalker_boots',
    'irons_spellbooks:priest_boots',
    'irons_spellbooks:plagued_boots',
    'irons_spellbooks:netherite_mage_boots'
]

const BasicFish = [
    "tide:trout",
    "minecraft:salmon",
    "tide:yellow_perch",
    "tide:bluegill",
    "tide:bass",
    "collectorsreap:platinum_bass",
    "minecraft:cod",
    "tide:ocean_perch",
    "tide:tuna",
    "tide:mackerel",
    "tide:angelfish",
    "minecraft:pufferfish",
    "minecraft:tropical_fish",
    "collectorsreap:tiger_prawn",
    "collectorsreap:clam",
    "collectorsreap:urchin"
]

const Unobtainable = [
    'netherdepthsupgrade:lava_fishing_rod',
    /sophisticatedbackpacks:stack_upgrade.*/,
    /structure_gel:.*/,
    /itemfilters:.*/,
    "create_new_age:electrical_connector",
    /create_new_age:.*extension/,
    /create_new_age:heat.*/,
    "create_new_age:stirling_engine",
    /create_new_age:.*corium/,
    "create_new_age:nuclear_fuel",
    /create_new_age:reactor.*/,
    /create_new_age:.*solar_heating_plate/,
    /create_new_age:.*thorium.*/,
    /create_new_age:overcharged.*/,
    /create_new_age:.*circuit/,
    /create_new_age:.*wire/
]

ServerEvents.tags("item", (event) => {
    //工程块
    engineeringBlocks.forEach((id) => event.add("kubejs:engineering_block", id))

    //锌粉、锡粉
    event.add("forge:dusts","kubejs:zinc_dust")
    event.add("forge:dusts/zinc","kubejs:zinc_dust")
    event.add("forge:dusts","kubejs:tin_dust")
    event.add("forge:dusts/tin","kubejs:tin_dust")
    
    //青铜
    event.add("forge:dusts","kubejs:bronze_dust")
    event.add("forge:dusts/bronze","kubejs:bronze_dust")
    event.add("forge:plates","kubejs:bronze_sheet")
    event.add("forge:plates/bronze","kubejs:bronze_sheet")
    event.add("forge:ingots","kubejs:bronze_ingot")
    event.add("forge:ingots/bronze","kubejs:bronze_ingot")
    event.add("forge:nuggets","kubejs:bronze_nugget")
    event.add("forge:nuggets/bronze","kubejs:bronze_nugget")

    event.add("minecraft:tools","kubejs:bronze_sword")
    event.add("minecraft:swords","kubejs:bronze_sword")
    event.add("forge:tools/swords","kubejs:bronze_sword")
    event.add("minecraft:tools","kubejs:bronze_pickaxe")
    event.add("minecraft:pickaxes","kubejs:bronze_pickaxe")
    event.add("forge:tools/pickaxes","kubejs:bronze_pickaxe")
    event.add("minecraft:tools","kubejs:bronze_axe")
    event.add("minecraft:axes","kubejs:bronze_axe")
    event.add("forge:tools/axes","kubejs:bronze_axe")
    event.add("minecraft:tools","kubejs:bronze_hoe")
    event.add("minecraft:hoes","kubejs:bronze_hoe")
    event.add("forge:tools/hoes","kubejs:bronze_hoe")
    event.add("minecraft:tools","kubejs:bronze_shovel")
    event.add("minecraft:shovels","kubejs:bronze_shovel")
    event.add("forge:tools/shovels","kubejs:bronze_shovel")

    //Unify
    event.add("forge:coal_coke","tfmg:coal_coke")
    event.add("forge:storage_blocks/coal_coke","tfmg:coal_coke_block")
    event.add("forge:dusts","kubejs:gold_silver_mix")
    event.add("forge:dusts/sulfur","tfmg:sulfur_dust")
    event.add("forge:dusts/saltpeter","tfmg:nitrate_dust")
    event.add("forge:flour","tmted:wheat_flour")
    event.add("forge:rope","beautify:rope")
    event.add("forge:plates/netherite","createdeco:netherite_sheet")
    event.add("forge:plates/zinc","createdeco:zinc_sheet")
    event.add("forge:plates/andesite","createdeco:andesite_sheet")
    event.add("forge:slag","tfmg:slag")

    //Undergarden
    event.add("create:crushed_ores","kubejs:crushed_froststeel_ore")
    event.add("create:crushed_ores","kubejs:crushed_cloggrum_ore")
    event.add("forge:dusts","kubejs:froststeel_dust")
    event.add("forge:dusts","kubejs:cloggrum_dust")
    event.add("forge:dusts/froststeel","kubejs:froststeel_dust")
    event.add("forge:dusts/cloggrum","kubejs:cloggrum_dust")
    event.add("forge:plates","kubejs:froststeel_plate")
    event.add("forge:plates","kubejs:cloggrum_plate")
    event.add("forge:plates/froststeel","kubejs:froststeel_plate")
    event.add("forge:plates/cloggrum","kubejs:cloggrum_plate")
    event.add("forge:plates/forgotten_metal","kubejs:forgotten_plate")
    event.add("forge:plates","kubejs:forgotten_plate")

    //Blueskies
    event.add("forge:dusts","kubejs:ventium_dust")
    event.add("forge:dusts/ventium","kubejs:ventium_dust")
    event.add("forge:dusts","kubejs:horizonite_dust")
    event.add("forge:dusts/horizonite","kubejs:horizonite_dust")
    event.add("forge:dusts","kubejs:falsite_dust")
    event.add("forge:dusts/falsite","kubejs:falsite_dust")
    event.add("forge:dusts","kubejs:charoite_dust")
    event.add("forge:dusts/charoite","kubejs:charoite_dust")
    event.add("forge:dusts","kubejs:aquite_dust")
    event.add("forge:dusts/aquite","kubejs:aquite_dust")

    //VoidSteel
    event.add("forge:ingots/voidsteel","createutilities:void_steel_ingot")
    event.add("forge:ingots","createutilities:void_steel_ingot")
    event.add("forge:plates/voidsteel","createutilities:void_steel_sheet")
    event.add("forge:plates","createutilities:void_steel_sheet")

    //IndustrialIron
    event.add("forge:ingots/industrial_iron","createdeco:industrial_iron_ingot")
    event.add("forge:ingots","createdeco:industrial_iron_ingot")
    event.add("forge:plates/industrial_iron","createdeco:industrial_iron_sheet")
    event.add("forge:plates","createdeco:industrial_iron_sheet")

    //others
    event.add("forge:ingots/andesite","create:andesite_alloy")
    event.add("forge:plates","kubejs:frostfire_double_plate")
    event.add("minecraft:tools","kubejs:sword_o_justice")
    event.add("minecraft:swords","kubejs:sword_o_justice")
    event.add("forge:tools/swords","kubejs:sword_o_justice")

    //类皮革靴子物品（防细雪）
    //似乎坏了，先注释掉吧
    /*
    LeatherLikeBoots.forEach((id) => {
        event.add("quad:snow/boots", id)
        event.add("quad:snow/acts_solid", id)
    })
    */

    //基础鱼类
    BasicFish.forEach((id) => event.add("kubejs:basic_fish", id))

    //无法获取的物品
    Unobtainable.forEach((id) => event.add("kubejs:unobtainable", id))
})

ServerEvents.tags("block", (event) => {
    //工程块
    engineeringBlocks.forEach((id) => event.add("kubejs:engineering_block", id))

    //扳手可拆卸拓展
    engineeringBlocks.forEach((id) => event.add("create:wrench_pickup", id))
    const wrenchPickupList = [
        'immersiveengineering:wooden_barrel',
        'immersiveengineering:gunpowder_barrel',
        'immersiveengineering:metal_barrel',
        'immersiveengineering:ballon',
        'immersiveengineering:electric_lantern',
        'immersiveengineering:thermoelectric_generator',
        'immersiveengineering:fluid_pump',
        'immersiveengineering:sample_drill',
        'immersiveengineering:tesla_coil',
        'immersiveengineering:blastfurnace_preheater'
    ]
    wrenchPickupList.forEach((id) => event.add("create:wrench_pickup", id))

    event.remove("minecraft:mineable/pickaxe","tfmg:oil_deposit")
})

//液体标签添加
ServerEvents.tags("fluid", (event) => {
    event.add("forge:ethylene","tfmg:ethylene")
    event.add("forge:propylene","tfmg:propylene")
    event.add("forge:lubrication_oil","tfmg:lubrication_oil")
    event.add("forge:shadow_essence","createchromaticreturn:shadow_essence")
    event.add("forge:shadow_essence","createchromaticreturn:flowing_shadow_essence")
    event.add("forge:refined_mixture","createchromaticreturn:refined_mixture")
    event.add("forge:refined_mixture","createchromaticreturn:flowing_refined_mixture")
})

ServerEvents.tags("block", (event) => {
    //幽冥锤添加
    event.add("irons_spellbooks:spectral_hammer_mineable","#forge:stone")
    event.add("irons_spellbooks:spectral_hammer_mineable","#undergarden:base_stone_undergarden")
})