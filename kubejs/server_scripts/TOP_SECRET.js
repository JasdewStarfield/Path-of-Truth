//Surprise!
//彩蛋物品，感谢幸运群u
/*
PlayerEvents.tick(event => {
    if (event.player.age % 20) return
    if (event.player.mainHandItem != 'kubejs:sword_o_justice') return
    event.player.potionEffects.add('slowness', 40, 4)
    event.player.potionEffects.add('weakness', 40, 3)
    event.player.potionEffects.add('poison', 40, 0)
    event.player.potionEffects.add('blindness', 40, 0)
})
*/

EntityEvents.hurt(event => {
    if (event.server
        && event.source.actual
        && event.source.actual.player
        && event.source.actual.mainHandItem.id === 'kubejs:sword_o_justice') {
            event.server.runCommandSilent(`/execute as ${event.source.actual.username} run summon minecraft:lightning_bolt`)
            event.source.actual.potionEffects.add("levitation", 10, 19, false, true)
            event.source.actual.potionEffects.add('slowness', 600, 3, false, true)
            event.source.actual.potionEffects.add('weakness', 600, 3, false, true)
            event.source.actual.potionEffects.add('wither', 600, 0, false, true)
            event.source.actual.potionEffects.add('blindness', 600, 0, false, true)
            event.source.actual.potionEffects.add('nausea', 600, 0, false, true)
            event.source.actual.potionEffects.add('hunger', 600, 3, false, true)
            event.source.actual.potionEffects.add('mining_fatigue', 600, 0, false, true)
            event.server.runCommandSilent(`/title ${event.source.actual.username} actionbar {"text":"啊哈哈哈——","color":"red","italic":true}`)
    }
})