const bannedItems = [
    "immersiveengineering:potion_bucket",
    "kubejs:sword_o_justice",
    "#kubejs:unobtainable"
]

const bannedFluids = [
    'createaddition:seed_oil',
    'createaddition:bioethanol'
]

JEIEvents.hideItems((event) => {
    bannedItems.forEach(id => event.hide(id))
})
JEIEvents.hideFluids(event => {
    bannedFluids.forEach(id => event.hide(id))
})