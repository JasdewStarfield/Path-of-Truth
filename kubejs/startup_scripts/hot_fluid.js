const hotFluids = [
  "kubejs:molten_iron",
  "kubejs:molten_steel",
  "kubejs:molten_slag",
  "kubejs:molten_za",
  "kubejs:molten_netherite",
  "kubejs:molten_enriched_uranium",
  "createnuclear:uranium"
]
const acidFluids = [
  "vintageimprovements:sulfuric_acid"
]
const flammableFluids = [
  "createdieselgenerators:diesel",
  "createdieselgenerators:gasoline",
  "kubejs:lpg",
  "kubejs:lubricant",
]
const slownessFluids = [
  "kubejs:heavy_oil",
  "kubejs:liquid_plastic",
  "createdieselgenerators:crude_oil"
]
const slipperyFluids = [
  "kubejs:lubricant"
]
const radiationFluids = [
  "kubejs:molten_enriched_uranium"
]

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEvent$LivingTickEvent', event => {
  global.entitytick(event)
})

let ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
let Registries = Java.loadClass('net.minecraft.core.registries.Registries')

/**
* 
* @param {Internal.LivingEvent$LivingTickEvent} event 
*/
global.entitytick = event => {
  const { entity } = event
  let acidDamageSource = DamageSource(global.getFromRegistry(Registries.DAMAGE_TYPE, "immersiveengineering:acid"))
  hotFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.lavaHurt()
    }
  })
  acidFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.attack(acidDamageSource, 2)
    }
  })
  flammableFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.potionEffects.add("immersiveengineering:flammable", 100, 1, false, true)
    }
  })
  slownessFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.potionEffects.add("minecraft:slowness", 20, 3, false, true)
    }
  })
  slipperyFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.potionEffects.add("immersiveengineering:slippery", 200, 0, false, true)
    }
  })
  radiationFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.potionEffects.add("createnuclear:radiation", 80, 0, false, true)
    }
  })
}

global.getFromRegistry = (regKey, id) => {
  var Level = Utils.server.overworld()
  var registry = Level.registryAccess().registryOrThrow(regKey)
  return registry.getHolderOrThrow(ResourceKey.create(regKey, id))
}