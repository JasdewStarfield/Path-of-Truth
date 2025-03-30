ServerEvents.recipes(event => {
    
    //永固之瓶制作
    event.shaped(
        Item.of('kubejs:reinforced_bottle', 8),
        [
            'AEC',
            'BDB',
            'CEA'
        ],
        {
            B: 'botania:ender_air_bottle',
            A: 'minecraft:netherite_ingot',
            D: 'botania:mana_bottle',
            C: 'botania:gaia_ingot',
            E: 'kubejs:leyden_jar'
        }
    )
    
})