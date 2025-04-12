const $ForgeCapabilities = Java.loadClass("net.minecraftforge.common.capabilities.ForgeCapabilities")

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

            let radioactiveItemCount = event.player.inventory.count(Ingredient.of("#kubejs:radioactive"))
            let armorPieces = [
                event.player.headArmorItem,
                event.player.chestArmorItem,
                event.player.legsArmorItem,
                event.player.feetArmorItem
            ]
            let radioactiveArmorCount = armorPieces.filter(armor => armor != null && armor.hasTag("createnuclear:anti_radiation_armor")).length;
            if (radioactiveArmorCount != 4) {   //未穿戴全套防辐射装备
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
            //event.player.tell(event.player.inventory.count(Ingredient.of("#kubejs:radioactive")).toString())
            //event.player.tell(armorPieces.filter(armor => armor != null && armor.hasTag("createnuclear:anti_radiation_armor")).length.toString())
        }
    }
})