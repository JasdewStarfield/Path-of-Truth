EntityJSEvents.addGoalSelectors('minecraft:witch', e => {
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
            let target = mob.target
            let health = mob.health
            if (target != null) {
                if (target.distanceToEntity(mob) > 2 && target.distanceToEntity(mob) < 35) { //distanceToEntity allows you to develope specific situations when mod has to cast spell. Here, for example, I made Witch able to cast specific spells only at range between 2 and 25 blocks away from the player
                    mob.lookAt("eyes", new Vec3d(target.x, target.y, target.z))
                    const attackType = Math.random(); //Allows you to actually randomise all variants of spells possible to cast
                    if (attackType < 0.5) { //As I remember it has to do something with priority of which spell should be casted. As I get it, lower the number => higher the priority
                    mob.lookAt("eyes", new Vec3d(target.x, target.y, target.z))
                    if (mob.age % 160 != 0) return //Ok this one is very important: mob.age affects straight on how often mob will cast certain spell. Lower the number means more often cast
                    mob.initiateCastSpell(SpellRegistry.EVASION_SPELL.get(), 3) //And the spell that we need to cast. WARNING: it's better to leave just *one* spell here or it won't work entierly. All this Math stuff is needed for multiple attack types
                    }
                    else if (attackType < 0.6) { //And then, with "else", we add more spell attack types
                    if (mob.age % 160 != 0) return
                    mob.initiateCastSpell(SpellRegistry.RAY_OF_FROST_SPELL.get(), 3)
                    }
                    else if (attackType < 0.8) {
                    if (mob.age % 120 != 0) return
                    mob.initiateCastSpell(SpellRegistry.MAGIC_MISSILE_SPELL.get(), 4)
                    }
                } 
                else if (target.distanceToEntity(mob) < 2) {
                    if (mob.age % 120 != 0) return
                    mob.initiateCastSpell(SpellRegistry.TELEPORT_SPELL.get(), 1) //Also some spells can be used to escape player's attacks if you get too close to the mob, which depends on the spell's functionality. Gust will push away target, while teleport-kind spells simply teleports mob behind you
                    }
                }
            }
)})