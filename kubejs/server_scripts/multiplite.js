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
/*
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
        // [answer, hollowed]
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
        ),
        GenSudoku(
            -seed,
            filterByTemplate([
                'xxx   xxx',
                'xxx   xxx',
                'xxx   xxx',
                '   xxx   ',
                '   xxx   ',
                '   xxx   ',
                'xxx   xxx',
                'xxx   xxx',
                'xxx   xxx',
            ]),
        ),
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
    event.recipes.create.mechanical_crafting('createchromaticreturn:multiplite_ingot', [
        'AIHGFEDCB',
        'BAIHGFEDC',
        'CBAIHGFED',
        'DCBAIHGFE',
        'EDCBAIHGF',
        'FEDCBAIHG',
        'GFEDCBAIH',
        'HGFEDCBAI',
        'IHGFEDCBA'
    ], {
        A:'createchromaticreturn:glowing_ingot',
        B:'createchromaticreturn:refined_radiance',
        C:'createchromaticreturn:silkstrum',
        D:'createchromaticreturn:silkstrum_book',
        E:'createchromaticreturn:industrium_book',
        F:'createchromaticreturn:durasteel_book',
        G:'createchromaticreturn:shadow_steel',
        H:'createchromaticreturn:industrium_ingot',
        I:'createchromaticreturn:durasteel_ingot'
    })
    event.recipes.create.mechanical_crafting('createchromaticreturn:antiplite_ingot', [
        'AIHGFEDCB',
        'BAIHGFEDC',
        'CBAIHGFED',
        'DCBAIHGFE',
        'EDCBAIHGF',
        'FEDCBAIHG',
        'GFEDCBAIH',
        'HGFEDCBAI',
        'IHGFEDCBA'
    ], {
        I:'createchromaticreturn:glowing_ingot',
        H:'createchromaticreturn:refined_radiance',
        G:'createchromaticreturn:silkstrum',
        F:'createchromaticreturn:silkstrum_book',
        E:'createchromaticreturn:industrium_book',
        D:'createchromaticreturn:durasteel_book',
        C:'createchromaticreturn:shadow_steel',
        B:'createchromaticreturn:industrium_ingot',
        A:'createchromaticreturn:durasteel_ingot'
    })
    /*
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
    */
})
