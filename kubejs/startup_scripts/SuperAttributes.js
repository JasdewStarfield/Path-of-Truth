// requires: irons_spellbooks

{
    let AttributeRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.AttributeRegistry')
    let AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
    let Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')

    // prebuilt attributes
    // 攻击伤害
    let attrIncDamage1 = new AttributeModifier('add damage', 2.5, AttributeModifier.Operation.ADDITION)
    let attrIncDamage2 = new AttributeModifier('add damage', 3, AttributeModifier.Operation.ADDITION)
    let curiosAttrIncDamage = new AttributeModifier('add damage', 0.5, AttributeModifier.Operation.MULTIPLY_TOTAL)
    // 最大魔法值
    let attrIncMana1 = new AttributeModifier('add mana', 200, AttributeModifier.Operation.ADDITION)
    let attrIncMana2 = new AttributeModifier('add mana', 150, AttributeModifier.Operation.ADDITION)
    let curiosAttrIncMana = new AttributeModifier('add mana', 0.75, AttributeModifier.Operation.MULTIPLY_TOTAL)
    // 法术强度
    let attrIncPower1 = new AttributeModifier('add power', 0.2, AttributeModifier.Operation.MULTIPLY_BASE)
    let attrIncPower2 = new AttributeModifier('add power', 0.15, AttributeModifier.Operation.MULTIPLY_BASE)
    // 冷却缩减
    let attrIncCD = new AttributeModifier('add cd', 0.05, AttributeModifier.Operation.MULTIPLY_TOTAL)
    let curiosAttrIncCD = new AttributeModifier('add cd', 0.15, AttributeModifier.Operation.MULTIPLY_TOTAL)
    // 生命值削减
    let attrIncHP = new AttributeModifier('add hp', -0.5, AttributeModifier.Operation.MULTIPLY_TOTAL)

    ForgeEvents.onEvent('net.minecraftforge.event.ItemAttributeModifierEvent', e => global.InjectNetheriteArmor(e))
    //修改下界合金法师护甲
    global.InjectNetheriteArmor = (/**@type {Internal.ItemAttributeModifierEvent}*/ e) => {
        let { itemStack, slotType: slot } = e
        if (itemStack.idLocation.namespace != 'irons_spellbooks') return
        if (slot !== itemStack.item?.type?.slot) return
        if (!itemStack.id.startsWith('irons_spellbooks:netherite_mage_')) return
        if (slot == 'HEAD' || 'CHEST' || 'LEGS' || 'FEET') {
            e.addModifier(Attributes.ATTACK_DAMAGE, attrIncDamage1)
            e.removeAttribute(AttributeRegistry.MAX_MANA.get())
            e.addModifier(AttributeRegistry.MAX_MANA.get(), attrIncMana1)
            e.removeAttribute(AttributeRegistry.SPELL_POWER.get())              
            e.addModifier(AttributeRegistry.SPELL_POWER.get(), attrIncPower1)
            e.addModifier(AttributeRegistry.COOLDOWN_REDUCTION.get(), attrIncCD)
        }
    }
    //修改下界合金普通护甲
    global.InjectNetheriteArmor = (/**@type {Internal.ItemAttributeModifierEvent}*/ e) => {
        let { itemStack, slotType: slot } = e
        if (itemStack.idLocation.namespace != 'minecraft') return
        if (!itemStack.id.startsWith('minecraft:netherite_')) return
        if (slot !== itemStack.item?.type?.slot) return
        if (slot == 'HEAD' || 'CHEST' || 'LEGS' || 'FEET') {
            e.addModifier(Attributes.ATTACK_DAMAGE, attrIncDamage2)
            e.addModifier(AttributeRegistry.MAX_MANA.get(), attrIncMana2)           
            e.addModifier(AttributeRegistry.SPELL_POWER.get(), attrIncPower2)
        }
    }

    ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioAttributeModifierEvent', e => global.InjectCurios(e))
    //修改魔戒
    global.InjectCurios = (/**@type {Internal.CurioAttributeModifierEvent}*/ e) => {
        let { itemStack, slotType: slot } = e
        if (itemStack.id == 'kubejs:max_magic_ring') {
            e.addModifier(Attributes.ATTACK_DAMAGE, curiosAttrIncDamage)
            e.addModifier(AttributeRegistry.MAX_MANA.get(), curiosAttrIncMana)           
            e.addModifier(AttributeRegistry.SPELL_POWER.get(), attrIncPower1)
            e.addModifier(AttributeRegistry.COOLDOWN_REDUCTION.get(), curiosAttrIncCD)
            e.addModifier(Attributes.MAX_HEALTH, attrIncHP)
        }
    }

}
