BlockEvents.rightClicked("minecraft:sculk", event => {
    const heldItem = event.player.getMainHandItem()
    if (heldItem === 'minecraft:amethyst_shard') {
        heldItem.setCount(heldItem.getCount() - 1)
        event.block.set("minecraft:air")
        if (Math.random() < 0.25) {
            event.block.popItem(Item.of("minecraft:echo_shard"))
            event.server.runCommandSilent(`particle minecraft:sculk_charge_pop ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0.01 5 normal`)
            event.server.runCommandSilent(`playsound minecraft:block.sculk.spread ambient @a ${event.block.x} ${event.block.y} ${event.block.z}`)
        }
        else {
            event.server.runCommandSilent(`particle minecraft:smoke ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0.01 5 normal`)
            event.server.runCommandSilent(`playsound minecraft:block.lava.extinguish ambient @a ${event.block.x} ${event.block.y} ${event.block.z}`)
        }
    }
})

BlockEvents.rightClicked("farmersdelight:cutting_board", event => {
    const heldItem = event.player.getItemInHand(event.hand)
    const blockStack = event.block.getInventory().getStackInSlot(0)
    const isOnionInBlockInventory = blockStack.hasTag("forge:crops/onion")
    const blockUnder = event.level.getBlock(event.block.x, event.block.y - 1, event.block.z)

    if (heldItem.hasTag("forge:tools/knives") && isOnionInBlockInventory && blockUnder.id === "minecraft:obsidian") {
        heldItem.hurtAndBreak(1, event.player, (player) => {
            player.broadcastBreakEvent(event.hand)
        })
        event.player.tell(Text.green({translate:'advancements.nether.obtain_crying_obsidian.title'}))
        event.server.runCommandSilent(`particle subtle_effects:water_splash_droplet 5 5 true ${event.block.x} ${event.block.y} ${event.block.z} 0.5 0.5 0.5 0.01 5 normal`)
        event.server.runCommandSilent(`playsound minecraft:block.lava.extinguish ambient @a ${event.block.x} ${event.block.y} ${event.block.z}`)
        blockUnder.set("minecraft:crying_obsidian")
    }
})