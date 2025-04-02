const bannedItems = [
    "immersiveengineering:potion_bucket",
    "woodenbucket:wooden_bucket",
    "kubejs:sword_o_justice",
    "#kubejs:unobtainable"
]

const bannedFluids = [
    'createaddition:seed_oil',
    'createaddition:bioethanol',
    'createdieselgenerators:plant_oil',
    'createdieselgenerators:ethanol',
    'createdieselgenerators:biodiesel'
]

JEIEvents.hideItems((event) => {
    bannedItems.forEach(id => event.hide(id))
})
JEIEvents.hideFluids(event => {
    bannedFluids.forEach(id => event.hide(id))
})

JEIEvents.addItems(event => {
    event.add(Item.of('woodenbucket:wooden_bucket'))
})

JEIEvents.removeRecipes(e => {
    e.remove('create:mechanical_crafting', ['endgamex'])
})