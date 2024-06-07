// priority: 0

// Make IE Crates drop their contents when broken instead of retaining it
// Adapted from https://pastebin.com/4ucJg0z1

BlockEvents.broken((event) => {
    const forceDropContainers = [
        "immersiveengineering:crate",
        "immersiveengineering:reinforced_crate",
    ]
    if (forceDropContainers.includes(event.block.id)) {
        let inventory = event.block.getInventory(Direction.UP) // Direction doesnt matter
        inventory.allItems.forEach((item) => event.block.popItem(item))

        // Destroy old crate and spawn new empty one
        event.block.set("air")
        event.block.popItem(event.block.id)

        event.cancel()
    }
})

BlockEvents.broken((event) => {
    const forceDropBarrel = [
        "immersiveengineering:wooden_barrel",
        "immersiveengineering:metal_barrel",
    ]
    if (forceDropBarrel.includes(event.block.id)) {
        // Destroy old barrel and spawn new empty one
        event.block.set("air")
        event.block.popItem(event.block.id)

        event.cancel()
    }
})

BlockEvents.placed((event) => {
    const bannedPlacing = [
    ]
    if (bannedPlacing.includes(event.block.id)) {
      event.block.set("air")
      event.block.popItem(event.block.id)

      event.cancel()
    }
})
