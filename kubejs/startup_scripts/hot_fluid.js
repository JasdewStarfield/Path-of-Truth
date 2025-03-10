const hotFluids = [
  "kubejs:molten_iron",
  "kubejs:molten_steel",
  "kubejs:molten_slag"
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
  hotFluids.forEach((fluidName) => {
    if (entity.isInFluidType(Fluid.of(fluidName).fluid.fluidType)) {
      entity.lavaHurt()
    }
  })
}