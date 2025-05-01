function GetSeededRandom(seed) {
    // sfc32
    let a = seed,
        b = 114514,
        c = 1919810,
        d = 19260817
    let res = function () {
        a |= 0
        b |= 0
        c |= 0
        d |= 0
        let t = (((a + b) | 0) + d) | 0
        d = (d + 1) | 0
        a = b ^ (b >>> 9)
        b = (c + (c << 3)) | 0
        c = (c << 21) | (c >>> 11)
        c = (c + t) | 0
        return (t >>> 0) / 4294967296
    }
    for (let i = 0; i < 5; i++) res()
    return res
}
function ShuffleArray(arr, rng) {
    for (let i = arr.length - 1; i > 0; i--) {
        let pick = Math.floor(rng() * (1 + i))
        if (pick != i) [arr[i], arr[pick]] = [arr[pick], arr[i]]
    }
    return arr
}

function GenSudoku(seed, keepPredicate) {
    console.log(seed)
    let rng = GetSeededRandom(seed)
    /**@type {number[][]}*/
    let pool = Array(9)
        .fill(0)
        .map(() => [])

    // 1. gen fill seq
    let getInitSeq = () => {
        let ret = []
        let offset = Math.floor(81 * rng())
        for (let i = 0; i < 81; i++) {
            let j = (i + offset) % 81
            ret.push([j % 9, Math.floor(j / 9)])
        }
        return ret
    }
    let getInitChoices = () => ShuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9], rng)
    let fillChoices, fillSeq // init later

    // 2. backtracking
    let counter = 0,
        success = false
    let early_terminate = 2085
    function validAt(r, c) {
        let self = pool[r][c]
        for (let i = 0; i < 9; i++) {
            if (i !== r && pool[i][c] === self) return false
            if (i !== c && pool[r][i] === self) return false
        }
        let rg = Math.floor(r / 3) * 3,
            cg = Math.floor(c / 3) * 3
        for (let i = 0; i < 3; i++) {
            let rr = rg + i
            if (rr === r) continue
            for (let j = 0; j < 3; j++) {
                let cc = cg + j
                if (cc === c) continue
                if (pool[rr][cc] === self) return false
            }
        }
        return true
    }
    function fillAt(idx) {
        // init
        if (idx === 0) {
            for (let row of pool) row.length = 0
            fillSeq = getInitSeq()
            fillChoices = getInitChoices()
            counter = 0
        }
        counter++
        if (counter >= early_terminate) throw 'stop'
        if (rng() < 0.5) ShuffleArray(fillChoices, rng)
        let choices = Array.from(fillChoices)
        if (idx >= fillSeq.length) return true
        let [r, c] = fillSeq[idx]
        for (let i = 0; i < 9; i++) {
            pool[r][c] = choices[i]
            if (!validAt(r, c)) continue
            if (fillAt(idx + 1)) return true
        }
        pool[r][c] = 0
    }
    for (let t = 0; t < 10; t++) {
        try {
            fillAt(0)
            success = true
            break
        } catch (e) {}
    }
    // fallback
    if (!success) {
        rng = GetSeededRandom(114514)
        fillAt(0)
    }

    // 3. hollow for question
    /**@type {(number|null)[][]}*/
    let hollowed = JSON.parse(JSON.stringify(pool))
    function determinedAt(r, c) {
        let checker = new Set()
        for (let i = 0; i < 9; i++) {
            if (i !== r) checker.add(hollowed[i][c])
            if (i !== c) checker.add(hollowed[r][i])
        }
        let rg = Math.floor(r / 3) * 3,
            cg = Math.floor(c / 3) * 3
        for (let i = 0; i < 3; i++) {
            let rr = rg + i
            if (rr === r) continue
            for (let j = 0; j < 3; j++) {
                let cc = cg + j
                if (cc === c) continue
                checker.add(hollowed[rr][cc])
            }
        }
        checker.delete(null)
        return checker.size == 8
    }
    if (keepPredicate) {
        fillSeq.length = 0
        for (let i = 0; i < 81; i++) {
            let r = Math.floor(i / 9),
                c = i % 9
            if (keepPredicate(r, c)) continue
            fillSeq.push([r, c])
        }
    }
    ShuffleArray(fillSeq, rng)
    for (let pair of fillSeq) {
        let [r, c] = pair
        if (determinedAt(r, c)) hollowed[r][c] = null
    }

    return [pool, hollowed]
}
