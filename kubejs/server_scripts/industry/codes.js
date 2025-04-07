const $ForgeCapabilities = Java.loadClass("net.minecraftforge.common.capabilities.ForgeCapabilities")

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

PlayerEvents.tick(event => {
    //event.player.tell(event.player.inventory.find("kubejs:arcane_charger").toString())
    if (event.player.age % 10 == 0) {   //减轻计算压力
        if (event.player.inventory.find("kubejs:arcane_charger") != -1) {   //奥术充能器：每0.5s给予携带者5s超负荷2，并为其主手和副手物品充能1000FE
            event.player.potionEffects.add("irons_spellbooks:charged", 100, 1, true, false)
            let mainHandItem = event.player.getMainHandItem()
            let offHandItem = event.player.getOffHandItem()
            let chargeEnergy = (item, amount) => {
                if (item != 'immersiveengineering:powerpack') {
                    item.getCapability($ForgeCapabilities.ENERGY).ifPresent((energy) =>{
                        energy.receiveEnergy(amount, false)
                        //event.player.tell(energy.getEnergyStored().toString())
                    })
                }
            }
            chargeEnergy(mainHandItem, 1000)
            chargeEnergy(offHandItem, 1000)
        }
        if (event.player.inventory.find("kubejs:soul_furnace") != -1) {    //灵魂电池：每0.5s给予携带者5s铁魔法急迫2和诡厄巫法食尸3
            event.player.potionEffects.add("irons_spellbooks:hastened", 100, 1, true, false)
            event.player.potionEffects.add("goety:corpse_eater", 100, 2, true, false) 
        }
        if (event.player.age % 200 == 0) {  //每10秒触发一次
            if (event.player.inventory.find("kubejs:divine_shield_system") != -1) {    //神圣护盾系统：每10s给予携带者20s伤害吸收2（8点临时护盾），以及5s生命回复1
                event.player.potionEffects.add("minecraft:absorption", 400, 1, true, false)
                event.player.potionEffects.add("minecraft:regeneration", 100, 0, false, false)
            }
        }
    }
})