const $ForgeCapabilities = Java.loadClass("net.minecraftforge.common.capabilities.ForgeCapabilities")

/*  有bug，别用
function drawerWeight(drawerItem) {
    if (!drawerItem || !drawerItem.nbt || !drawerItem.nbt.tile || !drawerItem.nbt.tile.Drawers) {
        return 0; // Not a valid drawer or no Drawers data
    }

    // Check if any drawer slot has a Count greater than 0
    if (Array.isArray(drawerItem.nbt.tile.Drawers) && drawerItem.nbt.tile.Drawers.some(drawer => drawer.Count > 0)) {
        let backpackCount = drawerItem.nbt.tile.Drawers.filter(drawer => {
            return drawer.Item && drawer.Item.id && Ingredient.of("#kubejs:backpacks").test(Item.of(drawer.Item.id))
        }).length
        if (backpackCount > 0) {
            return drawerItem.getCount() * backpackCount * 5; // Each backpack in the drawer counts as 5
        }
        return drawerItem.getCount(); // At least one drawer has items, but not backpacks
    }
    return 0; // No items in any drawer slot
}
*/

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


        if (event.player.age % 100 == 0) {  //每5秒触发一次

            let radioactiveItemCount = event.player.inventory.count(Ingredient.of("#kubejs:radioactive"))
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
            if (regenerativeArmorCount == 4) {   //穿戴全套再生装备
                event.player.potionEffects.add("minecraft:regeneration", 200, 2, true, false)   //给予携带者10s再生3
            }
            if (steelArmorCount == 4) {   //穿戴全套钢铁装备
                event.player.potionEffects.add("minecraft:resistance", 200, 1, true, false)   //给予携带者10s抗性提升2
            }
            if (faradayArmorCount == 4) {   //穿戴全套法拉第装备
                event.player.potionEffects.add("irons_spellbooks:charged", 200, 0, true, false)   //给予携带者10s超负荷效果
            }
            //event.player.tell(event.player.inventory.count(Ingredient.of("#kubejs:radioactive")).toString())
            //event.player.tell(armorPieces.filter(armor => armor != null && armor.hasTag("createnuclear:anti_radiation_armor")).length.toString())


            let backpackCount = event.player.inventory.count(Ingredient.of("#kubejs:backpacks"))
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

            //event.player.tell(totalWeight.toString())
            if (totalWeight >= 15 && totalWeight <= 24) {   //负重15-24则给予携带者10s虚弱3和缓慢3
                event.player.potionEffects.add("minecraft:weakness", 200, 2, true, true)
                event.player.potionEffects.add("minecraft:slowness", 200, 2, true, true)
            }
            if (totalWeight >= 25) {   //负重不小于25则给予携带者10s虚弱5,缓慢5和挖掘疲劳3
                event.player.potionEffects.add("minecraft:weakness", 200, 4, true, true)
                event.player.potionEffects.add("minecraft:slowness", 200, 4, true, true)
                event.player.potionEffects.add("minecraft:mining_fatigue", 200, 2, true, true)
            }
        }


        if (event.player.age % 200 == 0) {  //每10秒触发一次
            if (event.player.inventory.find("kubejs:divine_shield_system") != -1) {    //神圣护盾系统：每10s给予携带者20s伤害吸收2（8点临时护盾），以及3s生命回复5
                event.player.potionEffects.add("minecraft:absorption", 400, 1, true, false)
                event.player.potionEffects.add("minecraft:regeneration", 60, 4, false, false)
            }
        }
    }
})

//Debug
/*
PlayerEvents.tick(event => {
    if (event.player.age % 200 == 0) {   //减轻计算压力
        let drawers = Ingredient.of('#storagedrawers:drawers').itemIds
        let quotedDrawers = drawers.map(id => `"${id}"`) // 将每个id加上引号
        event.player.tell(`drawers: [${quotedDrawers.join(", ")}]`)
    }
})
*/