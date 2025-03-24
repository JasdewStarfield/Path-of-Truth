let $MysteriousItemConversionCategory = Java.loadClass('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')
let $ConversionRecipe = Java.loadClass('com.simibubi.create.compat.jei.ConversionRecipe')

$MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create('minecraft:amethyst_shard', 'minecraft:echo_shard'))
$MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create('immersiveengineering:concrete_bucket', 'immersiveengineering:concrete'))
$MysteriousItemConversionCategory.RECIPES.add($ConversionRecipe.create('trailandtales_delight:curd_block', 'trailandtales_delight:cheese_wheel'))