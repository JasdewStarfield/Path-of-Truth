const $ForgeCapabilities = Java.loadClass("net.minecraftforge.common.capabilities.ForgeCapabilities")

PlayerEvents.tick(event => {
    if (event.player.age % 10 == 0) {   //减轻计算压力
        let inventory = event.player.inventory
        if (inventory.find("kubejs:arcane_charger") != -1) {   //奥术充能器：每0.5s给予携带者5s超负荷2，并为其主手和副手物品充能1000FE
            event.player.potionEffects.add("irons_spellbooks:charged", 100, 1, true, false)
            let mainHandItem = event.player.getMainHandItem()
            let offHandItem = event.player.getOffHandItem()
            let chargeEnergy = (item, amount) => {
                if (item != 'immersiveengineering:powerpack') {
                    item.getCapability($ForgeCapabilities.ENERGY).ifPresent((energy) => {
                        energy.receiveEnergy(amount, false)
                        //event.player.tell(energy.getEnergyStored().toString())
                    })
                }
            }
            chargeEnergy(mainHandItem, 1000)
            chargeEnergy(offHandItem, 1000)
        }

        if (inventory.find("kubejs:soul_furnace") != -1) {    //灵魂电池：每0.5s给予携带者5s铁魔法急迫2和诡厄巫法食尸3
            event.player.potionEffects.add("irons_spellbooks:hastened", 100, 1, true, false)
            event.player.potionEffects.add("goety:corpse_eater", 100, 2, true, false)
        }

        let radioactiveItemCount = inventory.count(Ingredient.of("#kubejs:radioactive"))
        let armorPieces = [
            event.player.headArmorItem,
            event.player.chestArmorItem,
            event.player.legsArmorItem,
            event.player.feetArmorItem
        ]
        let radioactiveArmorCount = armorPieces.filter(armor => armor != null && armor.hasTag("createnuclear:anti_radiation_armor")).length;
        let regenerativeArmorCount = armorPieces.filter(armor => armor != null && armor.hasTag("kubejs:regenerative_armor")).length;
        let steelArmorCount = armorPieces.filter(armor => armor != null && armor.hasTag("kubejs:steel_armor")).length;
        let faradayArmorCount = armorPieces.filter(armor => armor != null && armor.hasTag("kubejs:faraday_armor")).length;
        if (event.player.age % 100 == 0 && radioactiveArmorCount != 4) {   //未穿戴全套防辐射装备（五秒检测一次）
            if (radioactiveItemCount >= 16 && radioactiveItemCount <= 64) {    //物品栏内有铀物品16-64个，则给予携带者3s中毒1
                event.player.potionEffects.add("minecraft:poison", 60, 0, false, true)
            }
            else if (radioactiveItemCount > 64 && radioactiveItemCount <= 128) {   //物品栏内有铀物品64-128个，则给予携带者8s中毒1与反胃1
                event.player.potionEffects.add("minecraft:poison", 160, 1, false, true)
                event.player.potionEffects.add("minecraft:nausea", 160, 0, false, true)
            }
            else if (radioactiveItemCount > 128) {    //物品栏内有铀物品128个以上，则给予携带者30s辐射1与反胃1
                event.player.potionEffects.add("createnuclear:radiation", 600, 2, false, true)
                event.player.potionEffects.add("minecraft:nausea", 600, 0, false, true)
            }
        }
        if (regenerativeArmorCount == 4) {   //穿戴全套再生装备
            event.player.potionEffects.add("minecraft:regeneration", 40, 2, true, false)   //给予携带者2s再生3
        }
        if (steelArmorCount == 4) {   //穿戴全套钢铁装备
            event.player.potionEffects.add("minecraft:resistance", 40, 1, true, false)   //给予携带者2s抗性提升2
        }
        if (faradayArmorCount == 4) {   //穿戴全套法拉第装备
            event.player.potionEffects.add("irons_spellbooks:charged", 40, 1, true, false)   //给予携带者2s超负荷2
        }


        let backpackCount = inventory.count(Ingredient.of("#kubejs:backpacks"))
        let curios = event.player.nbt.ForgeCaps['curios:inventory']
        let backpackEquipped = curios.toString().contains("sophisticatedbackpacks")
        if (backpackEquipped) {
            backpackCount += 1
        }
        let totalWeight = backpackCount * 5

        event.player.getInventory().items.forEach(item => {
            if (item.hasTag("storagedrawers:drawers") && item.nbt?.tile?.Drawers != null) {   //检查物品是否为有物品的储物抽屉
                totalWeight += 5    /*drawerWeight(item)*/ // 计算抽屉的重量
            }
        })

        if (totalWeight >= 15 && totalWeight <= 24) {   //负重15-24则给予携带者2s虚弱3和缓慢3
            event.player.potionEffects.add("minecraft:weakness", 40, 2, true, true)
            event.player.potionEffects.add("minecraft:slowness", 40, 2, true, true)
        }
        if (totalWeight >= 25) {   //负重不小于25则给予携带者2s虚弱5,缓慢5和挖掘疲劳3
            event.player.potionEffects.add("minecraft:weakness", 40, 4, true, true)
            event.player.potionEffects.add("minecraft:slowness", 40, 4, true, true)
            event.player.potionEffects.add("minecraft:mining_fatigue", 40, 2, true, true)
        }
    }


    if (event.player.age % 200 == 0) {  //每10秒触发一次
        if (event.player.inventory.find("kubejs:divine_shield_system") != -1) {    //神圣护盾系统：每10s给予携带者20s伤害吸收2（8点临时护盾），以及3s生命回复5
            event.player.potionEffects.add("minecraft:absorption", 400, 1, true, false)
            event.player.potionEffects.add("minecraft:regeneration", 60, 4, false, false)
        }
    }
})