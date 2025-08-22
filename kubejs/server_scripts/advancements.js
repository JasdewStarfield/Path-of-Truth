/**
 * A helper for grant player advancement
 * @author: Gerard
 * @version: 1.0
 * @see https://zh.minecraft.wiki/w/%E5%91%BD%E4%BB%A4/advancement
 * @param {Player} player - The player entity
 * @param {String} advancement - The namespace of advancement
 * @param {"only" | "from" | "through" | "until"} mode - advancement grant mode
 */
let grantAdvancement = (player, advancement, mode) => player.server.runCommandSilent(
	`advancement grant ${player.getName().getString()} ${mode} ${advancement}`
  );
 
 
 let $MenuType = Java.loadClass("net.minecraft.world.inventory.MenuType")
 PlayerEvents.inventoryOpened((event) => {
   let {inventoryContainer, player, server} = event;
   try {
	 if (inventoryContainer?.type == $MenuType.FURNACE || inventoryContainer?.type == $MenuType.BLAST_FURNACE) {
	   server.scheduleInTicks(20 * 3, () => {
		 if (inventoryContainer.items[0] == Item.of("minecraft:raw_iron")) {
		   grantAdvancement(player,"path_of_truth:blind_challenger","only");
		 }
	   })
	 }
   } catch (e) {}
 })
 
 let grasses = ["minecraft:tall_grass","minecraft:grass"];
 
 grasses.forEach(block => BlockEvents.broken(block, event => {
   let {player, server} = event;
   let {persistentData} = player;
   let count = 0;
   if (persistentData.contains("Grass_Mined")) { count = persistentData.getInt("Grass_Mined"); }
   count += 1;
   persistentData.putInt("Grass_Mined", count);
   if (count >= 50) { grantAdvancement(player, "path_of_truth:grass", "only"); }
   if (count >= 1000) { grantAdvancement(player, "path_of_truth:grass_hunter", "only"); }
 }));
 
 let water_wheels = ["create:water_wheel","create:large_water_wheel"];
 
 water_wheels.forEach(wheel => PlayerEvents.inventoryChanged(wheel, event=>{
   let {player, server, item} = event;
   let count = item?.count || 1;
   if (count >= 30) { grantAdvancement(player, "path_of_truth:water_wheel", "only"); }
 }));
 