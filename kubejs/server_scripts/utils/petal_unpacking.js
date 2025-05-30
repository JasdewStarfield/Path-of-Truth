ServerEvents.recipes(e => {
    // let colors=Ingredient.of('@minecraft').itemIds.filter(x=>x.endsWith('_dye')).map(x=>x.replace(/minecraft:|_dye/g,''))
    // colors=JSON.stringify(Array.from(colors.toArray()))
    let colors = [
        'yellow',
        'white',
        'light_blue',
        'black',
        'cyan',
        'brown',
        'gray',
        'red',
        'light_gray',
        'blue',
        'orange',
        'purple',
        'green',
        'pink',
        'lime',
        'magenta',
    ]
    let types = [
        ['double', 4],
        ['mystical', 2],
    ]
    for (let color of colors) {
        for (let [name, count] of types)
            e.custom({
                type: 'vintageimprovements:vibrating',
                ingredients: [
                    {
                        item: `botania:${color}_${name}_flower`,
                    },
                ],
                results: [
                    {
                        item: `botania:${color}_petal`,
                        count: count,
                    },
                ],
                processingTime: count * 10,
            }).id(`kubejs:vibrating_${color}_${name}_flower`)
    }
})
