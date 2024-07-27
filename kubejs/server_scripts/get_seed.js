// priority: 1000

ServerEvents.recipes((e) => {
    // Perform this operation here to check if
    const server = Utils.getServer()
    global.WORLD_SEED =
      server === null ? -1 : server.worldData.worldGenOptions().seed()
})

ServerEvents.loaded((e) => {
    // Reloads the server on the first world load to ensure the world seed is
    // available for recipe registration.
    if (global.WORLD_SEED === -1) {
      e.server.runCommandSilent('reload')
    }
})