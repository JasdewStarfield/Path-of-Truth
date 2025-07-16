// requires: goety
{
    let Spell = Java.loadClass('com.Polarice3.Goety.common.magic.Spell')
    let ModParticleTypes = Java.loadClass('top.ribs.scguns.init.ModParticleTypes')
    let ModDamageSource = Java.loadClass('com.Polarice3.Goety.utils.ModDamageSource')

    let spellFuncMap = {
        avada: {
            doHit(caster, entity) {
                caster.health += entity.health
                // caster.maxHealth += entity.maxHealth
                entity.attack(ModDamageSource.deathCurse(caster), Math.max(10, entity.health / 2)) // nerfed but buffed
                // entity.kill()
            },
            /**
             * @param {Internal.ServerLevel} worldIn
             * @param {Vec3d} frm
             * @param {Vec3d} to
             */
            doFx(worldIn, frm, to) {
                let delta = to.subtract(frm)
                let dist = delta.length()
                delta = delta.normalize()
                for (let i = 1; i < dist; i += 0.3) {
                    let pos = frm.add(delta.scale(i))
                    // worldIn.tell(pos)
                    worldIn.sendParticles(ModParticleTypes.GREEN_FLAME.get(), pos.x(), pos.y(), pos.z(), 1, 0, 0, 0, 0.2)
                }
                worldIn.sendParticles(ModParticleTypes.PLASMA_EXPLOSION.get(), to.x(), to.y(), to.z(), 1, 0, 0, 0, 0)
                worldIn.playSeededSound(null, to.x(), to.y(), to.z(), 'scguns:item.plasma.fire', 'neutral', 3, 0, 0)
            },
            /**
             * @param {Internal.ServerLevel} worldIn
             * @param {Vec3d} frm
             */
            trySpread(worldIn, srcEntity, range, caster) {
                Utils.server.scheduleInTicks(5 + Math.random() * 5, () => {
                    let frm = this.getCenter(srcEntity)
                    // find nearest
                    let target = null,
                        dist = 114514,
                        hitPos = null
                    for (let sub of worldIn.getEntitiesWithin(AABB.ofSize(frm, range, range, range))) {
                        if (!sub.living || !sub.alive || sub === caster || sub === srcEntity) continue
                        let myHitPos = this.getCenter(sub)
                        let myDist = myHitPos.distanceToSqr(frm)
                        if (target == null || myDist < dist) {
                            target = sub
                            dist = myDist
                            hitPos = myHitPos
                        }
                    }
                    if (target) {
                        this.doHit(caster, target)
                        this.doFx(worldIn, frm, hitPos)
                        this.trySpread(worldIn, target, range - 1, caster)
                    }
                })
            },
            getCenter(entityOrVec) {
                if (entityOrVec.distanceTo) return entityOrVec // entity is vec
                return new Vec3d(entityOrVec.x, entityOrVec.y + entityOrVec.boundingBox.ysize / 2, entityOrVec.z)
            },
            startSpell(worldIn, caster, staff, spellStat) {
                let rayTrace = caster.rayTrace(30, false)
                let { hit, entity } = rayTrace
                if (hit) {
                    this.doFx(worldIn, caster.eyePosition, hit)
                    this.trySpread(worldIn, entity || hit, 10, caster)
                } else worldIn.playSeededSound(null, caster.x, caster.y, caster.z, 'scguns:item.plasma.fire', 'neutral', 0.2, 0, 0)
                if (entity && entity.living && entity.alive) this.doHit(caster, entity)
            },
            stopSpell(worldIn, caster, staff, useTimeRemaining) {
                if (caster.creative) return
                let focus = staff.item.getFocus(staff)
                focus.damageValue++
                if (focus.damageValue >= focus.maxDamage) focus.shrink(1)
            }
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
