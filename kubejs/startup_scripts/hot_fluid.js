const hotFluids = [
  "kubejs:molten_iron",
  "kubejs:molten_steel",
  "kubejs:molten_slag"
]
const acidFluids = [
  "vintageimprovements:sulfuric_acid"
]

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEvent$LivingTickEvent', event => {
  global.entitytick(event)
})

/**
* 
* @param {Internal.LivingEvent$LivingTickEvent} event 
*/
global.entitytick = event => {
  const { entity } = event
  //let damageSource = global.getFromRegistry(Registries.DAMAGE_TYPE, "immersiveengineering:acid")
  hotFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.lavaHurt()
    }
  })
  acidFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.attack(/*damageSource, */2)
    }
  })
}

/*
let ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
global.getFromRegistry = (regKey, id) => {
  var Level = Utils.server.overworld()
  var registry = Level.registryAccess().registryOrThrow(regKey)
  return registry.getHolderOrThrow(ResourceKey.create(regKey, id))
}
*/