const bannedItems = [
    "immersiveengineering:potion_bucket",
    /sophisticatedbackpacks:stack_upgrade.*/,
    /structure_gel:.*/,
    /itemfilters:.*/
]

JEIEvents.hideItems((event) => {
    bannedItems.forEach(id => event.hide(id))
})