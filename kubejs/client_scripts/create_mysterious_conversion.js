JEIEvents.information(event => {
    let $MysteriousItemConversionCategory = Java.loadClass('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')
    let $ConversionRecipe = Java.loadClass('com.simibubi.create.compat.jei.ConversionRecipe')
    let RemoveConversion = (to) => 
        $MysteriousItemConversionCategory.RECIPES.removeIf(recipe => recipe.getRollableResultsAsItemStacks()[0].idLocation.toString() == to)
    let AddConversion = (from, to) => {
        $MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create(from, to))
    }

    AddConversion('minecraft:amethyst_shard', 'minecraft:echo_shard')
    AddConversion('immersiveengineering:concrete_bucket', 'immersiveengineering:concrete')
    AddConversion('trailandtales_delight:curd_block', 'trailandtales_delight:cheese_wheel')
})