function getCachedSeed() {
    let Long = Java.loadClass('java.lang.Long')
    try {
        let raw = JsonIO.read(getCachedSeed.cached_path)
        return Long.valueOf(raw.seed)
    } catch (e) {}
}
getCachedSeed.cached_path = 'kubejs/data/cached_seed.json'

ServerEvents.loaded(e => {
    //e.server.runCommandSilent('reload')
    let oldSeed = getCachedSeed()
    let newSeed = Utils.server.getLevel('minecraft:overworld').seed
    if (oldSeed != newSeed) {
        JsonIO.write(getCachedSeed.cached_path, { seed: newSeed.toString() })
        // Utils.server.runCommandSilent('reload')  // enable this when enable code below
    }
})

ServerEvents.recipes(event => {

    let seed = getCachedSeed()
    if (!seed) return 'wait for reload'
    let filterWan = (r, c) => {
        if (r == 4 || c == 4) return true
        if (c % 8 == 0 && r < 4 == (c == 0)) return true
        if (r % 8 == 0 && c < 4 == (r == 8)) return true
    }

    let filterByTemplate = tmpl => {
        return (r, c) => tmpl[r][c] == 'x'
    }

    let sudokus = [
        GenSudoku(
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
    ]
    let materialMap = {
        '1': 'kubejs:code_formation',
        '2': 'kubejs:code_destruction',
        '3': 'kubejs:code_perfection',
        '4': 'kubejs:potion_of_balance',
        '5': 'kubejs:potion_of_void',
        '6': 'kubejs:potion_of_talent',
        '7': 'botania:manasteel_ingot',
        '8': 'botania:mana_diamond',
        '9': 'botania:mana_pearl',
    }
    let materialMapShow = Object.assign({ _: 'minecraft:barrier' }, materialMap)

    let target = '2x kubejs:world_base_gem'
    event.recipes.create
        .mechanical_crafting(
            target,
            sudokus[0][0].map(x => x.join('')),
            materialMap,
        )
        .id(`endgamex`)
    event.recipes.create
        .mechanical_crafting(
            target,
            sudokus[0][1].map(x => x.map(v => v || '_').join('')),
            materialMapShow,
        )
        .id(`endgamexxx`)
})
