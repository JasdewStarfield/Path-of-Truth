// priority: 1000
ServerEvents.loaded((event) => {
    event.server.runCommandSilent("reload");
});