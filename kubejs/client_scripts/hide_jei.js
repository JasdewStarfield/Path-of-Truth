const bannedItems = [
    "immersiveengineering:potion_bucket",
    "netherdepthsupgrade:lava_fishing_rod",
    /sophisticatedbackpacks:stack_upgrade.*/,
    /structure_gel:.*/,
    /itemfilters:.*/,
    "kubejs:sword_o_justice"
]

JEIEvents.hideItems((event) => {
    bannedItems.forEach(id => event.hide(id))
})