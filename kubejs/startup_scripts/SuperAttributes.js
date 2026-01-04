// requires: irons_spellbooks

{
    let AttributeRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.AttributeRegistry')
    let SCAttribute = Java.loadClass('top.ribs.scguns.attributes.SCAttributes')
    let AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
    let Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
    let TieredItem = Java.loadClass('net.minecraft.world.item.TieredItem')

    //attribute cache
    let Attrs = {
        cache: {},
        itemId: 'foo',
        slot: 'bar',
        event: null,
        OP_ADD: AttributeModifier.Operation.ADDITION,
        /**
         * @param {Internal.ItemAttributeModifierEvent & Internal.CurioAttributeModifierEvent} e
         * @param {boolean} multiCurios
         */
        init(e, multiCurios) {
            this.event = e
            this.itemId = e.itemStack.id
            this.slot = e.slotType
            if (!this.slot) {
                if (multiCurios && e.slotContext) {
                    this.slot = `${e.slotContext.identifier()}_${e.slotContext.index()}`
                } else {
                    this.slot = 'CURIOS'
                }
            }
            return this
        },
        /**
         *
         * @param {Internal.Attribute} attr
         * @param {number} value
         * @param {Internal.AttributeModifier$Operation_} op
         * @returns
         */
        add(attr, value, op) {
            let key = `${this.itemId};${this.slot};${attr.descriptionId||attr}`
            if (!(key in this.cache)) this.cache[key] = new AttributeModifier('PoT', value, op || this.OP_ADD)
            this.event.addModifier(attr, this.cache[key])
            return this
        },
    }

    ForgeEvents.onEvent('net.minecraftforge.event.ItemAttributeModifierEvent', e => {
        let {
            itemStack: { id, item },
            slotType: slot,
        } = e
        if (id == 'immersiveengineering:shield') {
            if (slot == 'mainhand' || slot == 'offhand') {
                //修改重型盾牌
                Attrs.init(e)
                    .add(Attributes.ARMOR, 6)
            }
        }

        if (slot == 'mainhand' && id.startsWith('minecraft:netherite_') && item instanceof TieredItem) {
            //修改下界合金工具
            if (item?.type?.slot)
                return
            let OriginalAttackDamage = item.damage||item.attackDamage
            if (OriginalAttackDamage != null) {
                e.removeAttribute(Attributes.ATTACK_DAMAGE)
                Attrs.init(e)
                    .add(Attributes.ATTACK_DAMAGE, OriginalAttackDamage*1.5)
            }
            Attrs.init(e)
                .add("forge:block_reach", 2)
                .add("forge:entity_reach", 2)
        }

        if (slot !== item?.type?.slot) return
        
        //修改下界合金法师护甲
        if (id.startsWith('irons_spellbooks:netherite_mage_')) {
            e.removeAttribute(AttributeRegistry.MAX_MANA.get())
            e.removeAttribute(AttributeRegistry.SPELL_POWER.get())
            Attrs.init(e)
                .add(Attributes.ATTACK_DAMAGE, 2.5)
                .add(AttributeRegistry.MAX_MANA.get(), 200)
                .add(AttributeRegistry.SPELL_POWER.get(), 0.2, 'multiply_base')
                .add(AttributeRegistry.COOLDOWN_REDUCTION.get(), 0.05, 'multiply_total')
        }
        //修改下界合金普通护甲
        else if (id.startsWith('minecraft:netherite_') || id.startsWith('scguns:netherite_')) {
            Attrs.init(e)
                .add(Attributes.ATTACK_DAMAGE, 3)
                .add(AttributeRegistry.MAX_MANA.get(), 150)
                .add(AttributeRegistry.SPELL_POWER.get(), 0.15, 'multiply_base')
        }
        //致密碳
        else if (id.startsWith('scguns:anthralite_')) {
            Attrs.init(e)
                .add(SCAttribute.RELOAD_SPEED.get(), 0.05, 'multiply_base')
        }
        //硝钢
        else if (id.startsWith('scguns:adrien_')) {
            Attrs.init(e)
                .add(SCAttribute.RELOAD_SPEED.get(), 0.025, 'multiply_base')
                .add(SCAttribute.BULLET_DAMAGE_MULTIPLIER.get(), 0.075, 'multiply_base')
                .add(Attributes.ATTACK_DAMAGE, 0.05, 'multiply_total')
                .add(Attributes.ATTACK_SPEED, 0.05, 'multiply_total')
        }
        //黄铜合金
        else if (id.startsWith('scguns:treated_brass_')) {
            Attrs.init(e)
                .add(SCAttribute.RELOAD_SPEED.get(), 0.075, 'multiply_base')
                .add(SCAttribute.BULLET_DAMAGE_MULTIPLIER.get(), 0.025, 'multiply_base')
                .add(Attributes.BLOCK_BREAK_SPEED, 0.05, 'multiply_total')
                .add(Attributes.MOVEMENT_SPEED, 0.05, 'multiply_total')
        }
        //钢化钻石
        else if (id.startsWith('scguns:diamond_steel_')) {
            Attrs.init(e)
                .add(SCAttribute.RELOAD_SPEED.get(), 0.075, 'multiply_base')
                .add(SCAttribute.BULLET_DAMAGE_MULTIPLIER.get(), 0.075, 'multiply_base')
                .add(Attributes.MAX_HEALTH, 4)
        }
    })

    ForgeEvents.onEvent('top.theillusivec4.curios.api.event.CurioAttributeModifierEvent', e => {
        let {
            itemStack: { id },
        } = e
        switch (id) {
            //修改魔戒
            case 'kubejs:max_magic_ring':
                Attrs.init(e)
                    .add(Attributes.ATTACK_DAMAGE, 0.5, 'multiply_total')
                    .add(AttributeRegistry.MAX_MANA.get(), 0.75, 'multiply_total')
                    .add(AttributeRegistry.SPELL_POWER.get(), 0.2, 'multiply_base')
                    .add(AttributeRegistry.COOLDOWN_REDUCTION.get(), 0.15, 'multiply_total')
                    .add(Attributes.MAX_HEALTH, -0.5, 'multiply_total')
                break
        }
    })
}
