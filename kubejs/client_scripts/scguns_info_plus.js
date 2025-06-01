// requires: scguns

ItemEvents.tooltip(e => {
    // let Screen = Java.loadClass('net.minecraft.client.gui.screens.Screen')
    let wrapFloat = num => String(Math.round(num * 100) / 100)
    let buildInfo = (key, data) => {
        if (typeof data === 'number') data = wrapFloat(data)
        return Text.translate('info.scguns.' + key)
            .gray()
            .append(': ')
            .append(Text.white(data))
    }

    for (let gunId of Ingredient.of('@scguns').itemIds) {
        /**@type {Internal.GunItem} */
        let gunItem = Item.of(gunId).item
        if (!gunItem.getModifiedGun) continue
        e.addAdvanced(gunId, (stack, advanced, tooltips) => {
            // if (!Screen.hasShiftDown()) return
            let gun = gunItem.getModifiedGun(stack)
            let additional = [
                buildInfo('rate', gun.general.rate),
                buildInfo('spread', gun.general.spread),
                buildInfo(
                    'recoil',
                    Text.translate(
                        'info.scguns.recoil.sub',
                        // ↔ + ↓
                        wrapFloat(gun.general.recoilAngle),
                        wrapFloat(gun.general.recoilKick),
                    ),
                ),
            ]
            if (gun.general.burstAmount > 0) {
                additional.push(buildInfo('burst', gun.general.burstAmount), buildInfo('burst_cd', gun.general.burstCooldown))
            }
            if (gun.general.projectileAmount > 1) additional.push(buildInfo('split', gun.general.projectileAmount))
            tooltips.addAll(6, additional)
        })
    }
})

ClientEvents.lang('en_us', e => {
    e.add('info.scguns.recoil.sub', '%s↔; %s↓')

    e.add('info.scguns.recoil', 'Recoil')
    e.add('info.scguns.rate', 'Fire Interval (ticks)')
    e.add('info.scguns.spread', 'Spread')
    e.add('info.scguns.burst', 'Burst Amount')
    e.add('info.scguns.burst_cd', 'Burst Cooldown (ticks)')
    e.add('info.scguns.split', 'Projectile Amount')
})

ClientEvents.lang('zh_cn', e => {
    e.add('info.scguns.recoil', '后坐力')
    e.add('info.scguns.rate', '开火间隔 (ticks)')
    e.add('info.scguns.spread', '散布')
    e.add('info.scguns.burst', '连发数')
    e.add('info.scguns.burst_cd', '连发冷却 (ticks)')
    e.add('info.scguns.split', '弹丸数量')
})
