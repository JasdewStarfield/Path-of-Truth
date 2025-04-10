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

const UnobtainableItems = [
    'netherdepthsupgrade:lava_fishing_rod',
    /sophisticatedbackpacks:stack_upgrade.*/,
    /structure_gel:.*/,
    /itemfilters:.*/,
    'createutilities:lshaped_gearbox',
    'createutilities:gearcube',
    "scguns:cryoniter",
    "scguns:thermolith",
    "scguns:polar_generator",
    "scguns:lightning_battery",
    "scguns:lightning_rod_connector",
    "scguns:macerator",
    "scguns:powered_macerator",
    "scguns:mechanical_press",
    "scguns:powered_mechanical_press",
    'createaddition:creative_generator',
    'createaddition:connector',
    'createaddition:small_light_connector',
    'createaddition:large_connector',
    'createaddition:redstone_relay',
    'createaddition:spool',
    'createaddition:copper_spool',
    'createaddition:gold_spool',
    'createaddition:electrum_spool',
    'createaddition:festive_spool',
    'createaddition:seed_oil_bucket',
    'createaddition:bioethanol_bucket',
    'createdieselgenerators:plant_oil_bucket',
    'createdieselgenerators:ethanol_bucket',
    'createdieselgenerators:biodiesel_bucket',
    'createdieselgenerators:chemical_sprayer',
    'createdieselgenerators:chemical_sprayer_lighter',
    'immersiveengineering:charging_station',
    'immersiveengineering:tesla_coil'
]

const UnobtainableFluids = [
    'createaddition:seed_oil',
    'createaddition:bioethanol'
]

const BWGWoodType = [
    'aspen',
    'baobab',
    'blue_enchanted',
    'cika',
    'cypress',
    'ebony',
    'fir',
    'florus',
    'green_enchanted',
    'holly',
    'ironwood',
    'jacaranda',
    'mahogany',
    'maple',
    'palm',
    'palo',
    'pine',
    'rainbow_eucalyptus',
    'redwood',
    'sakura',
    'skyris',
    'white_mangrove',
    'willow',
    'witch_hazel',
    'zelkova'
]

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




ServerEvents.tags("item", (event) => {
    //工程块
    engineeringBlocks.forEach((id) => event.add("kubejs:engineering_block", id))
    
    event.add("create:casing","kubejs:steel_casing")
    event.add("create:casing","kubejs:factory_casing")

    //为去皮原木和木头添加对应tag
    BWGWoodType.forEach((id) => {
        event.add(`forge:stripped_logs`, `biomeswevegone:stripped_${id}_log`)
        event.add(`forge:stripped_wood`, `biomeswevegone:stripped_${id}_wood`)
    })

    UndergardenWoodType.forEach((id) => {
        event.add(`forge:stripped_logs`, `undergarden:stripped_${id}_log`)
        event.add(`forge:stripped_wood`, `undergarden:stripped_${id}_wood`)
    })

    GoetyWoodType.forEach((id) => {
        event.add(`forge:stripped_logs`, `goety:stripped_${id}_log`)
        event.add(`forge:stripped_wood`, `goety:stripped_${id}_wood`)
    })

    event.add(`forge:stripped_logs`, 'outer_end:azure_stripped_stem')
    event.add(`forge:stripped_wood`, 'outer_end:azure_stripped_pith')
    event.add(`forge:stripped_logs`, 'netherexp:stripped_claret_stem')
    event.add(`forge:stripped_wood`, 'netherexp:stripped_claret_hyphae')
    event.add(`minecraft:logs`, 'netherexp:stripped_claret_stem')
    event.add(`minecraft:logs`, 'netherexp:stripped_claret_hyphae')

    //锌粉、锡粉
    event.add("forge:dusts","kubejs:zinc_dust")
    event.add("forge:dusts/zinc","kubejs:zinc_dust")
    event.add("forge:dusts","kubejs:tin_dust")
    event.add("forge:dusts/tin","kubejs:tin_dust")

    //铁粉
    event.add("forge:dusts","kubejs:iron_ingot_dust")
    event.add("forge:dusts/iron","kubejs:iron_ingot_dust")
    event.remove("forge:dusts/iron","immersiveengineering:dust_iron")
    event.add("forge:dusts/raw_iron","immersiveengineering:dust_iron")
    
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

    //锌铝合金
    event.add("forge:dusts","kubejs:za_dust")
    event.add("forge:dusts/za","kubejs:za_dust")
    event.add("forge:plates","kubejs:za_sheet")
    event.add("forge:plates/za","kubejs:za_sheet")
    event.add("forge:ingots","kubejs:za_ingot")
    event.add("forge:ingots/za","kubejs:za_ingot")
    event.add("forge:nuggets","kubejs:za_nugget")
    event.add("forge:nuggets/za","kubejs:za_nugget")

    //Unify
    event.add("forge:fermentable","#forge:grain/rice")
    event.add("forge:fermentable","#forge:dough/wheat")

    event.add("forge:ingots","kubejs:failed_brass_ingot")
    event.add("forge:dusts","kubejs:brass_blend")
    event.add("forge:dusts","kubejs:gold_silver_mix")
    event.add("forge:flour","tmted:wheat_flour")
    event.add("forge:rope","beautify:rope")
    event.add("forge:dusts/saltpeter","scguns:niter_dust")
    event.add("forge:dusts","scguns:niter_dust")
    event.add("forge:dusts/phosphor","scguns:phosphor_dust")
    event.add("forge:dusts","scguns:phosphor_dust")
    event.add("forge:plates/netherite","createdeco:netherite_sheet")
    event.add("forge:plates/zinc","createdeco:zinc_sheet")
    event.add("forge:plates/andesite","createdeco:andesite_sheet")
    event.add("forge:plates","createdeco:netherite_sheet")
    event.add("forge:plates","createdeco:zinc_sheet")
    event.add("forge:plates","createdeco:andesite_sheet")
    event.add("forge:nuggets/netherite","createdeco:netherite_nugget")
    event.add("forge:nuggets","createdeco:netherite_nugget")
    event.add("forge:nuggets/industrial_iron","createdeco:industrial_iron_nugget")
    event.add("forge:nuggets","createdeco:industrial_iron_nugget")

    event.add("forge:dusts/coal","createnuclear:coal_dust")
    event.add("forge:dusts/uranium","createnuclear:uranium_powder")
    event.add("forge:plates/hop_graphite","createnuclear:graphene")
    event.add("forge:dusts/uranium","createnuclear:uranium_powder")
    event.add("forge:storage_blocks/steel","createnuclear:steel_block")
    event.add("forge:storage_blocks/lead","createnuclear:lead_block")
    event.add("forge:storage_blocks/raw_uranium","createnuclear:raw_uranium_block")
    event.add("forge:storage_blocks/raw_lead","createnuclear:raw_lead_block")
    event.add("forge:ores/lead","createnuclear:deepslate_lead_ore")
    event.add("forge:ores","createnuclear:deepslate_lead_ore")
    event.add("forge:ores/lead","createnuclear:lead_ore")
    event.add("forge:ores","createnuclear:lead_ore")
    event.add("forge:ores/uranium","createnuclear:deepslate_uranium_ore")
    event.add("forge:ores","createnuclear:deepslate_uranium_ore")
    event.add("forge:ores/uranium","createnuclear:uranium_ore")
    event.add("forge:ores","createnuclear:uranium_ore")

    event.add("forge:dusts","createnuclear:coal_dust")
    event.add("forge:dusts","createnuclear:uranium_powder")
    event.add("forge:rods","createnuclear:graphite_rod")
    event.add("forge:plates","createnuclear:graphene")
    event.add("forge:dusts","createnuclear:uranium_powder")
    event.add("forge:rods","createnuclear:uranium_rod")
    event.add("forge:storage_blocks","createnuclear:steel_block")
    event.add("forge:storage_blocks","createnuclear:lead_block")
    event.add("forge:storage_blocks","createnuclear:raw_uranium_block")
    event.add("forge:storage_blocks","createnuclear:raw_lead_block")

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
    event.add("forge:plates","kubejs:terrasteel_sheet")
    event.add("forge:plates/terrasteel","kubejs:terrasteel_sheet")
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
    UnobtainableItems.forEach((id) => event.add("kubejs:unobtainable", id))
})

ServerEvents.tags("block", (event) => {
    //工程块
    engineeringBlocks.forEach((id) => event.add("kubejs:engineering_block", id))

    event.add("create:casing","kubejs:steel_casing")

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
        'immersiveengineering:blastfurnace_preheater',
        'kubejs:steel_casing'
    ]
    wrenchPickupList.forEach((id) => event.add("create:wrench_pickup", id))
})

//液体标签添加
ServerEvents.tags("fluid", (event) => {
    event.add("forge:lpg","kubejs:lpg")
    event.add("forge:lubricant","kubejs:lubricant")
    event.add("forge:heavy_oil","kubejs:heavy_oil")
    event.add("forge:liquid_plastic","kubejs:liquid_plastic")
    event.add("forge:molten_steel","kubejs:molten_steel")
    event.add("forge:molten_slag","kubejs:molten_slag")
    event.add("forge:molten_za","kubejs:molten_za")
    event.add("forge:molten_netherite","kubejs:molten_netherite")

    //无法获取的流体
    UnobtainableFluids.forEach((id) => event.add("kubejs:unobtainable", id))
})

ServerEvents.tags("block", (event) => {
    //幽冥锤添加
    event.add("irons_spellbooks:spectral_hammer_mineable","#forge:stone")
    event.add("irons_spellbooks:spectral_hammer_mineable","#undergarden:base_stone_undergarden")

    //为原木和木头添加对应tag
    event.add(`minecraft:logs`, 'outer_end:azure_stripped_stem')
    event.add(`minecraft:logs`, 'outer_end:azure_stripped_pith')
    event.add(`minecraft:logs`, 'outer_end:stripped_pith')
    event.add(`minecraft:logs`, 'netherexp:stripped_claret_stem')
    event.add(`minecraft:logs`, 'netherexp:stripped_claret_hyphae')
})