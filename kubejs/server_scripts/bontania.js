//此文件提供植物魔法系列修改

ServerEvents.recipes(event => {
    //修改白雏菊合成配方
    event.remove({ output: 'botania:pure_daisy' })
    event.recipes.botania.petal_apothecary('botania:pure_daisy', ['botania:white_petal','irons_spellbooks:arcane_essence','#forge:dusts/tin'])


})