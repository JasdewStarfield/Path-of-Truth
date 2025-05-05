// priority: 100
//实验性添加机械动力形式的tooltips支持
const ItemDescription = Java.loadClass("com.simibubi.create.foundation.item.ItemDescription$Modifier")
const TooltipModifier = Java.loadClass("com.simibubi.create.foundation.item.TooltipModifier")
const Palette = Java.loadClass("com.simibubi.create.foundation.item.TooltipHelper$Palette")

function AddCreateTooltips(id) {
  TooltipModifier.REGISTRY.register(
    id,
    new ItemDescription(id, Palette.STANDARD_CREATE)
  )
}

const CreateTooltipsItems = [
    "immersiveengineering:hammer",
    "botania:apothecary_default",
    "ftbquests:book",
    "botania:twig_wand",
    "immersiveengineering:seed",
    "immersiveengineering:hemp_fiber",
    "botania:thermalily",
    "botania:floating_thermalily",
    "mechanicalbotania:spinerette",
    "mechanicalbotania:spinerette_floating",
    "mechanicalbotania:mana_motor",
    "undergarden:depthrock_bed"
]

//下面是格式，写在assets/kubejs/lang/zh_cn.json（或者英文的就在en_us.json）
//如果要写的是方块描述则将item换为block
/*
{
  "item.{namespace}.{item}.tooltip": "114514(随便写点什么，告诉create这个东西存在tooltip)",
  "item.{namespace}.{item}.tooltip.summary": "按shift显示的内容",
  "item.{namespace}.{item}.tooltip.condition1": "条件",
  "item.{namespace}.{item}.tooltip.behaviour1": "该条件下的行为，同理可添加condition2和behaviour2等等",
  "item.{namespace}.{item}.tooltip.control1": "按control显示的内容，一般用来写按键操作",
  "item.{namespace}.{item}.tooltip.action1": "对应操作的行为，同样可以写多条"
}
*/

ClientEvents.loggedIn(event => {
    CreateTooltipsItems.forEach((id) => 
      AddCreateTooltips(id)
    )
})