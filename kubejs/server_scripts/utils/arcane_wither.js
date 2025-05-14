// requires: irons_spellbooks
// requires: irons_spells_js
{
    let RangedAttackGoal = Java.loadClass('net.minecraft.world.entity.ai.goal.RangedAttackGoal')
    let attackInterval = 30
    EntityEvents.spawned(e => {
        let { entity } = e
        if (entity.type != 'minecraft:wither') return
        let customAttacker = new JavaAdapter(
            RangedAttackGoal,
            {
                m_8037_() {
                    this.super$m_8037_()
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
            40,
            20,
        )
        // thx PinkWither from Botania
        entity.goalSelector.availableGoals.removeIf(entry => entry.goal instanceof RangedAttackGoal)
        entity.goalSelector.addGoal(2, customAttacker)
    })
}
