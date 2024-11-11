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