{
    let Gun = Java.class.forName('top.ribs.scguns.common.Gun')
    let gf = name => {
        let field = Gun.getDeclaredField(name)
        field.accessible = true
        return field
    }
    let fGeneral = gf('general')
    let fReloads = gf('reloads')
    let fProjectile = gf('projectile')
    let upgradeGun = (gun, level) => {
        let original = gun.item.gun

        let levelLimited = Math.min(level, 5)
        let ratioBooster = 1 + 0.1 * level
        let ratioReducer = 1 - 0.1 * levelLimited

        gun.orCreateTag.merge({
            buranLvl: level,
            Gun: {
                General: {
                    Rate: Math.ceil(fGeneral.get(original).rate * ratioReducer),
                    MeleeDamage: ratioBooster * fGeneral.get(original).meleeDamage,
                },
                Reloads: {
                    ReloadTimer: Math.ceil(fReloads.get(original).reloadTimer * ratioReducer),
                },
                Projectile: {
                    Damage: ratioBooster * fProjectile.get(original).damage,
                },
            },
        })

        let levelName = Text[level < 5 ? 'gold' : 'red'](` +${level}`)
        gun.setHoverName(gun.item.getName(gun).append(levelName))
        return gun
    }

    let pickGun = grid => {
        let total = grid.width * grid.height
        let gunStack = null
        for (let i = 0; i < total; i++) {
            gunStack = grid.get(i)
            if (gunStack.item.getModifiedGun) break
        }
        return gunStack
    }

    let upgraderUntil = maxLvl => grid => {
        let gunStack = pickGun(grid)
        let oldLevel = gunStack.orCreateTag.buranLvl || 0
        if (oldLevel >= maxLvl) return
        return upgradeGun(gunStack, oldLevel + 1)
    }

    ServerEvents.recipes(e => {
        let targetGuns = Ingredient.of('@scguns').itemIds.filter(x => !!Item.of(x).item.getModifiedGun)

        for (let gun of targetGuns) {
            let displayLv1 = upgradeGun(Item.of(gun), 1)
            e.shaped(displayLv1, ['BBB', 'BGB', 'BBB'], {
                B: 'kubejs:buran',
                G: gun,
            })
                .modifyResult(upgraderUntil(10))
                .id(`kubejs:gun_lvl/${gun.split(':')[1]}`)
        }
    })
}
