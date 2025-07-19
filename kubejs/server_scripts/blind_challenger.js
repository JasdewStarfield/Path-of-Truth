let $MenuType = Java.loadClass("net.minecraft.world.inventory.MenuType")
PlayerEvents.inventoryOpened((event) => {
  let {inventoryContainer, player, server} = event;
  // 这个 type 列表在这
  // https://lexxie.dev/forge/1.20.1/net/minecraft/world/inventory/MenuType.html
  if (inventoryContainer.type == $MenuType.FURNACE || inventoryContainer.type == $MenuType.BLAST_FURNACE) {
	// 3s 防抖
	server.scheduleInTicks(20 * 3, () => {
	  // [0] 原料槽，[1] 燃料槽，[2] 输出槽
	  if (inventoryContainer.items[0] == Item.of("minecraft:raw_iron")) {
	    server.runCommandSilent(`advancement grant ${player.getName().getString()} only path_of_truth:blind_challenger`);
	  }
	})
  }
})