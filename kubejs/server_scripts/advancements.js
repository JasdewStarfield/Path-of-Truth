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
 
ItemEvents.dropped("#forge:seeds", event => {
  let {player} = event;
  // kubejs 检测这个事件的触发条件是主手物品而不是丢出物品
  // 也就是说，我主手拿着种子，打开背包丢出任何物品都会触发这个事件
  // 所以这里加一个过滤
  if (!event.item.hasTag("forge:seeds")) { return }
  // 假人与非玩家投掷不计入
  if (!player.isPlayer() || player.isFake()) { return }
  // 最远也就扔 4 格，这里设个 8 吧
  let target = player.rayTrace(8);
  if(target.type == "block") {
    // 检测变种花药台
    if (!target.block.id.startsWith("botania:apothecary")) { return }
    let ap_items = target.block.entityData['Items'];
    if (ap_items.length < 4) { return }

    let mystical_white_petal_count = ap_items.filter(item => item.id == "botania:white_petal").length;
    // 如果有其它含有四个白色花瓣的配方同样会触发，防止以后有之类配方，加个判断
    if (mystical_white_petal_count == 4 && ap_items.length == 4) { grantAdvancement(player,"path_of_truth:blind_idiot","only"); }
  }
});
