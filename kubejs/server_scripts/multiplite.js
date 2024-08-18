ServerEvents.recipes(event => {
    let seed = new Date().getFullYear()
    let sudokus = [
        // [answer, hollowed]
        GenSudoku(seed),
        GenSudoku(-seed),
    ]
    let materialMap = {
        '1': 'createchromaticreturn:glowing_ingot',
        '2': 'createchromaticreturn:refined_radiance',
        '3': 'createchromaticreturn:silkstrum',
        '4': 'createchromaticreturn:silkstrum_book',
        '5': 'createchromaticreturn:industrium_book',
        '6': 'createchromaticreturn:durasteel_book',
        '7': 'createchromaticreturn:shadow_steel',
        '8': 'createchromaticreturn:industrium_ingot',
        '9': 'createchromaticreturn:durasteel_ingot',
    }
    let materialMapShow = Object.assign({ _: 'minecraft:barrier' }, materialMap)

    //两种终极锭
    let targets = ['createchromaticreturn:multiplite_ingot', 'createchromaticreturn:antiplite_ingot']
    for (let i = 0; i < 2; i++) {
        event.recipes.create
            .mechanical_crafting(
                targets[i],
                sudokus[i][0].map(x => x.join('')),
                materialMap,
            )
            .id(`endgame${i + 1}`)
        event.recipes.create
            .mechanical_crafting(
                targets[i],
                sudokus[i][1].map(x => x.map(v => v || '_').join('')),
                materialMapShow,
            )
            .id(`endgame${i + 1}_show`)
    }
})
