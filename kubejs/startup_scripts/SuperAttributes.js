// requires: irons_spellbooks

{
    let AttributeRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.AttributeRegistry')
    let AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
    let Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')

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
            let key = `${this.itemId};${this.slot};${attr.descriptionId}`
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
        else if (id.startsWith('minecraft:netherite_')) {
            Attrs.init(e)
                .add(Attributes.ATTACK_DAMAGE, 3)
                .add(AttributeRegistry.MAX_MANA.get(), 150)
                .add(AttributeRegistry.SPELL_POWER.get(), 0.15, 'multiply_base')
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
