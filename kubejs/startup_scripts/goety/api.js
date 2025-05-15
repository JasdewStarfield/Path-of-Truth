// requires: goety
{
    let MagicFocus = Java.loadClass('com.Polarice3.Goety.common.items.magic.MagicFocus')
    let Rarity = Java.loadClass('net.minecraft.world.item.Rarity')

    global.createMagicFocus = (event, id, tooltipLine, rarity, onCreate) => {
        if (id.indexOf(':') < 0) id = 'kubejs:' + id
        if (!(id in global.goetySpellMap)) throw `missing focus id: ${id}`
        let proto = {
            // hot reload focus
            getSpell() {
                return global.goetySpellMap[id]
            },
        }
        // appendHoverText
        if (tooltipLine)
            proto.m_7373_ = function (stack, worldIn, tooltip, flagIn) {
                tooltip.add(Text.translate(tooltipLine))
                this.super$m_7373_(stack, worldIn, tooltip, flagIn)
            }
        // getRarity
        if (rarity)
            proto.m_41460_ = function () {
                return Rarity[rarity]
            }
        let getter = () => {
            let ret = new JavaAdapter(MagicFocus, proto, global.goetySpellMap[id])
            if (onCreate) onCreate(ret)
            return ret
        }
        event.createCustom(id, getter)
    }
}
