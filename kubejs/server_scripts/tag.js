ServerEvents.tags("item", (event) => {
    //锌粉、锡粉
    event.add("forge:dusts","kubejs:zinc_dust")
    event.add("forge:dusts/zinc","kubejs:zinc_dust")
    event.add("forge:dusts","kubejs:tin_dust")
    event.add("forge:dusts/tin","kubejs:tin_dust")
    
    //青铜
    event.add("forge:dusts/bronze","kubejs:bronze_dust")
    event.add("forge:plates/bronze","kubejs:bronze_sheet")
    event.add("forge:ingots/bronze","kubejs:bronze_ingot")
    event.add("forge:nuggets/bronze","kubejs:bronze_nugget")
})
