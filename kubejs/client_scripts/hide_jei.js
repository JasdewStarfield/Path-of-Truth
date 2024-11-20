const bannedItems = [
    "immersiveengineering:potion_bucket",
    "kubejs:sword_o_justice",
    "#kubejs:unobtainable"
]

JEIEvents.hideItems((event) => {
    bannedItems.forEach(id => event.hide(id))
})