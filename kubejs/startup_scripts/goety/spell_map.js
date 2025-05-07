// requires: goety
{
    let Spell = Java.loadClass('com.Polarice3.Goety.common.magic.Spell')
    let ModParticleTypes = Java.loadClass('top.ribs.scguns.init.ModParticleTypes')

    let spellFuncMap = {
        avada: {
            startSpell(worldIn, caster, staff, spellStat) {
                let rayTrace = caster.rayTrace(30, false)
                let { hit, hitX, hitY, hitZ, entity } = rayTrace
                if (hit) {
                    worldIn.sendParticles(ModParticleTypes.PLASMA_EXPLOSION.get(), hitX, hitY, hitZ, 1, 0, 0, 0, 0)
                    worldIn.playSeededSound(null, hitX, hitY, hitZ, 'scguns:item.plasma.fire', 'neutral', 5, 0, 0)
                } else {
                    worldIn.playSeededSound(
                        null,
                        caster.x,
                        caster.y,
                        caster.z,
                        'scguns:item.plasma.fire',
                        'neutral',
                        0.2,
                        0,
                        0,
                    )
                }
                if (entity && entity.living) {
                    caster.health += entity.health
                    caster.maxHealth += entity.maxHealth
                    entity.attack(caster.damageSources().playerAttack(caster), 1)
                    entity.kill()
                }
            },
        },
    }
    let buildSpell = (key, cost, duration, cd) => {
        let spellProto = {
            defaultSoulCost: () => cost,
            defaultCastDuration: () => duration,
            defaultSpellCooldown: () => cd,
            __proto__: spellFuncMap[key],
        }
        return new JavaAdapter(Spell, spellProto)
    }

    global.goetySpellMap = {
        'kubejs:midnight': buildSpell('avada', 20, 5, 20),
    }
}
