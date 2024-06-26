ServerEvents.tags("item", (event) => {
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
    event.add("forge:plates/andesite","createdeco:andesite_sheet")

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

    //others
    event.add("forge:plates","kubejs:frostfire_double_plate")
})

ServerEvents.tags("block", (event) => {
    event.remove("minecraft:mineable/pickaxe","tfmg:oil_deposit")
})

ServerEvents.tags("fluid", (event) => {
    event.add("forge:ethylene","tfmg:ethylene")
    event.add("forge:propylene","tfmg:propylene")
    event.add("forge:lubrication_oil","tfmg:lubrication_oil")
})
