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

    /*
    event.add("minecraft:tools","kubejs:bronze_sword")
    event.add("minecraft:swords","kubejs:bronze_sword")
    event.add("minecraft:tools","kubejs:bronze_pickaxe")
    event.add("minecraft:pickaxes","kubejs:bronze_pickaxe")
    event.add("minecraft:tools","kubejs:bronze_axe")
    event.add("minecraft:axes","kubejs:bronze_axe")
    event.add("minecraft:tools","kubejs:bronze_hoe")
    event.add("minecraft:hoes","kubejs:bronze_hoe")
    event.add("minecraft:tools","kubejs:bronze_shovel")
    event.add("minecraft:shovels","kubejs:bronze_shovel")
    */

    event.add("forge:coal_coke","tfmg:coal_coke")
    event.add("forge:storage_blocks/coal_coke","tfmg:coal_coke_block")
    event.add("forge:dusts","kubejs:gold_silver_mix")
    event.add("forge:dusts/sulfur","tfmg:sulfur_dust")
    event.add("forge:flour","tmted:wheat_flour")
    event.add("forge:rope","beautify:rope")
})

ServerEvents.tags("fluid", (event) => {
    event.add("forge:ethylene","tfmg:ethylene")
    event.add("forge:propylene","tfmg:propylene")
})
