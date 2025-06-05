// requires: irons_spellbooks
let $LightningBolt = Java.loadClass('net.minecraft.world.entity.LightningBolt')
EntityEvents.spawned(e => {
    if (!(e.entity instanceof $LightningBolt)) return
    let range = e.entity.boundingBox.inflate(3)
    for (let entity of e.level.getEntitiesWithin(range)) {
        if (entity.type != 'minecraft:item') continue
        let { id } = entity.item
        if (id == 'minecraft:glass_bottle') {
            entity.attack(-114514)
            entity.item = Item.of('irons_spellbooks:lightning_bottle', entity.item.count)
        } else if (id == 'irons_spellbooks:lightning_bottle') {
            entity.attack(-1919810)
        }
    }
})
