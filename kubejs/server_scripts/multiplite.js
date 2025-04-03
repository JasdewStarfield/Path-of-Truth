function getCachedSeed() {
    let raw = Utils.server.persistentData.get('seed')
    if (!raw) return null
    return Utils.server.persistentData.getLong('seed')
}

ServerEvents.loaded(e => {
    let oldSeed = getCachedSeed()
    let newSeed = Utils.server.overworld().seed
    if (oldSeed != newSeed) {
        Utils.server.persistentData.putLong('seed', newSeed)
        Utils.server.persistentData.remove('cached_sudoku')
        Utils.server.runCommandSilent('reload') // enable this when enable code below
    }
})

ServerEvents.recipes(event => {
    let seed = getCachedSeed()
    if (!seed) return 'wait for reload'

    let filterByTemplate = tmpl => {
        return (r, c) => tmpl[r][c] == 'x'
    }

    let sudokus = null
    try {
        sudokus = JSON.parse(Utils.server.persistentData.getString('cached_sudoku'))
    } catch (e) {
        sudokus = GenSudoku(
            seed,
            filterByTemplate([
                '  xxxxx  ',
                ' x  x  x ',
                'x  xxx  x',
                'x x x x x',
                'xxxxxxxxx',
                'x x x x x',
                'x  xxx  x',
                ' x  x  x ',
                '  xxxxx  ',
            ]),
        )
        Utils.server.persistentData.cached_sudoku = JSON.stringify(sudokus)
    }
    let materialMap = {
        '1': 'kubejs:code_formation',
        '2': 'kubejs:code_destruction',
        '3': 'kubejs:code_perfection',
        '4': 'kubejs:potion_of_balance',
        '5': 'kubejs:potion_of_void',
        '6': 'kubejs:potion_of_talent',
        '7': 'kubejs:arcane_charger',
        '8': 'kubejs:soul_furnace',
        '9': 'kubejs:divine_shield_system',
    }
    let materialMapShow = Object.assign({ _: 'minecraft:barrier' }, materialMap)

    let target = '2x kubejs:world_base_gem'
    event.recipes.create
        .mechanical_crafting(
            target,
            sudokus[0].map(x => x.join('')),
            materialMap,
        )
        .id(`endgamex`)
    event.recipes.create
        .mechanical_crafting(
            target,
            sudokus[1].map(x => x.map(v => v || '_').join('')),
            materialMapShow,
        )
        .id(`endgamexxx`)
})
