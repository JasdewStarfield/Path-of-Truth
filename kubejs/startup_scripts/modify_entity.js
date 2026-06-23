EntityJSEvents.attributes((event) => {
    event.modify('minecraft:warden', attribute => {
        attribute.add('minecraft:generic.max_health', 50000)
    })
})