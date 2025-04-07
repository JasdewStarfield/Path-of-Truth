/**
 * 以防下次再忘了，为什么不存世界存档/persistentData内
 * 因为recipe阶段在server loaded阶段之前，但是世界种子在server存在之后
 * 所以想要用到种子相关的配方必须二回战
 * 此处缓存了各种子二回战所需的已掏空数独，以及上次进入游戏使用的种子
 * - 进入与上次种子相同的存档：全缓存
 * - 进入与上次种子不同的老存档：种子区别，强制reload
 * - 用新种子创建新存档：种子区别+数独失效，先生成数独后reload
 */
// init cache obj
let cachePath = 'kubejs/data/cached_seed.json'
let theCache = JsonIO.read(cachePath)
if (!theCache?.sudokuMap?.get) {
    JsonIO.write(cachePath, { sudokuMap: {} })
    theCache = JsonIO.read(cachePath)
}
this.Long = Java.loadClass('java.lang.Long')

function getCachedSeed() {
    try {
        return Long.valueOf(theCache.seed)
    } catch (e) {}
}
function getCachedSudoku(seed) {
    if (!seed) seed = getCachedSeed()
    try {
        seed = seed.toString()
        if (seed in getCachedSudoku.cache2) return getCachedSudoku.cache2[seed]
        let res = JSON.parse(theCache.sudokuMap.get(seed.toString()))
        getCachedSudoku.cache2[seed] = res
        return res
    } catch (e) {}
}
getCachedSudoku.cache2 = {}

ServerEvents.loaded(e => {
    let newSeed = Utils.server.getLevel('minecraft:overworld').seed
    let cacheDirty = false
    if (newSeed != getCachedSeed()) {
        theCache.seed = newSeed.toString()
        // theCache.flagNewSeed = 1
        cacheDirty = true
    }
    if (!getCachedSudoku(newSeed)) {
        let tmpl = [
            '  xxxxx  ',
            ' x  x  x ',
            'x  xxx  x',
            'x x x x x',
            'xxxxxxxxx',
            'x x x x x',
            'x  xxx  x',
            ' x  x  x ',
            '  xxxxx  ',
        ]
        theCache.sudokuMap[newSeed] = JSON.stringify(GenSudoku(newSeed, (r, c) => tmpl[r][c] == 'x'))
        // theCache.flagNewSudoku = 1
        cacheDirty = true
    }
    if (cacheDirty) {
        JsonIO.write(cachePath, theCache)
        e.server.runCommandSilent('reload')
    }
})

ServerEvents.recipes(event => {
    let sudokus = getCachedSudoku()
    if (!sudokus) return 'wait for reload'

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
