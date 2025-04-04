// priority: 0

ItemEvents.toolTierRegistry(event => {
  event.add('bronze', tier => {
    tier.uses = 200
    tier.speed = 5.5
    tier.attackDamageBonus = 1.5
    tier.level = 2
    tier.enchantmentValue = 20
    tier.repairIngredient = '#forge:ingots/bronze'
  })
})
ItemEvents.armorTierRegistry(event => {
  event.add('bronze', tier => {
    tier.durabilityMultiplier = 12 // Each slot will be multiplied with [13, 15, 16, 11]
    tier.slotProtections = [1, 4, 5, 1] // Slot indicies are [FEET, LEGS, BODY, HEAD] 
    tier.enchantmentValue = 10
    tier.equipSound = 'minecraft:item.armor.equip_iron'
    tier.repairIngredient = '#forge:ingots/bronze'
    tier.toughness = 1.0
    tier.knockbackResistance = 0.0
  })
})