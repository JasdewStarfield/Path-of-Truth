// requires: irons_spellbooks
// requires: irons_spells_js
{
    let MeleeAttackGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.MeleeAttackGoal')
    let attackInterval = 30
    EntityEvents.spawned(e => {
        let { entity } = e
        if (entity.type != 'minecraft:wither') return
        const customAttacker = new JavaAdapter(
            MeleeAttackGoal,
            {
                m_6739_() {
                    let { target, age } = entity
                    if (!target || age % attackInterval) return
                    let spell =
                        SpellRegistry[
                            entity.position().distanceTo(target.position()) >= 20 ? 'ELDRITCH_BLAST_SPELL' : 'CHAIN_LIGHTNING_SPELL'
                        ].get()
                    let { magicData, level } = entity
                    magicData.additionalCastData = TargetEntityCastData(target)
                    spell.onCast(level, spell.maxLevel, entity, 'mob', magicData)
                },
            },
            entity,
            1,
            true,
        )
        entity.goalSelector.addGoal(1, customAttacker)
    })
}
