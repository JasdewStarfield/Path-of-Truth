let langMap = JsonIO.read('kubejs/assets/createchromaticreturn/lang/zh_cn.json')
ItemEvents.tooltip(e => {
    for (let item of Item.list) {
        if (item.idLocation.namespace !== 'createchromaticreturn') continue
        e.addAdvanced(item, (itemStack, isAdvanced, lines) => {
            lines.replaceAll(l => {
                let key = l.string
                if (key in langMap) {
                    return Text.of(langMap[key])
                }
                return l
            })
        })
    }
})
