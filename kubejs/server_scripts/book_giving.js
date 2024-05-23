PlayerEvents.loggedIn((event) =>{
    const username = event.player.username;
    if(!event.player.stages.has('NEW')){
        event.server.runCommand(`give ${username} ftbquests:book`);// 给书
        event.player.stages.add('NEW');
    }
})