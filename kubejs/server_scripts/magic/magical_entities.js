//时间单位为tick，20tick=1s

//测试性修改：僵尸
/*
EntityJSEvents.addGoalSelectors('minecraft:zombie', e => {
    e.customGoal(
        'follow_target',
        1,
        mob => true,
        mob => true,
        true,
        mob => { },
        mob => { },
        true,
        mob => {
            let target = mob.target//进入战斗状态
            if (target != null) {
                if (target.distanceToEntity(mob) > 10 && target.distanceToEntity(mob) < 20) {
                    mob.lookAt("eyes", new Vec3d(target.x, target.y, target.z))//释放指向性法术需要视线
                    mob.getNavigation().moveTo(mob, 0.5)//原地停滞，移速0.5
                    if (mob.age % 40 == 0)//按照时间周期进行释放（即CD）
                        return mob.initiateCastSpell(SpellRegistry.BLOOD_SLASH_SPELL.get(), 1)//鲜血之刃
                } 
                if (mob.age % 400 == 0)//并列：纯粹按照周期施法
                    return mob.initiateCastSpell(SpellRegistry.HEARTSTOP_SPELL.get(), 1)//止心术
            }
        }
    )
})
*/

EntityJSEvents.addGoalSelectors('botania:doppleganger', e => {
    e.customGoal(
        'follow_target',
        1,
        mob => true,
        mob => true,
        true,
        mob => { },
        mob => { },
        true,
        mob => {
            let target = mob.target//进入战斗状态
            if (target != null) {
                if (mob.age % 600 == 0)//并列：纯粹按照周期施法
                    return mob.initiateCastSpell(SpellRegistry.HEARTSTOP_SPELL.get(), 1)//止心术
            }
        }
    )
})