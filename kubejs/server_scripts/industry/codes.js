//毁灭代码：右击破坏视线上16格以内任何方块，0.5秒冷却
ItemEvents.rightClicked("kubejs:code_destruction", event => {
    const block = event.player.level.getBlock(event.player.rayTrace(16).block)
    if (block) {
        event.level.destroyBlock(block, true)
        event.server.runCommandSilent(`particle subtle_effects:smoke ${block.x} ${block.y} ${block.z} 0.5 0.5 0.5 0.01 15 normal`)
        event.player.addItemCooldown(event.item, 0.5*20)
    }
})

//构成代码：右击将视线上16格以内任何生物的生命值设置为其最大值的50%，5秒冷却
ItemEvents.rightClicked("kubejs:code_formation", event => {
    const entity = event.player.rayTrace(16).entity
    if (entity) { if (entity.getMaxHealth) {
        let targetHealth = entity.getMaxHealth()/2
        entity.setHealth(targetHealth)
        event.server.runCommandSilent(`particle alexsmobs:dna ${entity.x} ${entity.y} ${entity.z} 0.5 0.5 0.5 0.01 15 normal`)
        event.player.addItemCooldown(event.item, 5*20)
    }}
})

//完美代码：右击将玩家的营养值调整为最佳状态，并附带10秒饱和1效果，20分钟冷却
ItemEvents.rightClicked("kubejs:code_perfection", event => {
    let player = event.player
    let playerName = player.username
    if (!player.hasEffect("kubejs:perfection")) {
        event.server.runCommandSilent(`diet set ${playerName} fruits 0.6`)
        event.server.runCommandSilent(`diet set ${playerName} grains 0.6`)
        event.server.runCommandSilent(`diet set ${playerName} proteins 0.6`)
        event.server.runCommandSilent(`diet set ${playerName} vegetables 0.9`)
        event.server.runCommandSilent(`diet set ${playerName} sugars 0.4`)
        event.server.runCommandSilent(`particle minecraft:heart ${player.x} ${player.y} ${player.z} 0.5 0.5 0.5 0.01 15 normal`)
        player.potionEffects.add("minecraft:saturation", 200, 0, false, false)
        player.potionEffects.add("kubejs:perfection", 20*20*60, 0, false, false)
    }
    else {
        player.tell(Text.translate("item.kubejs.code_perfection.cooldown"))
    }
    event.player.addItemCooldown(event.item, 0.5*20)
})