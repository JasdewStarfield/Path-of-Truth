ItemEvents.modification(event => {
    //温暖效果的食物
    const warmth = [
        ["minecraft:mushroom_stew", 5, 180],
        ["minecraft:beetroot_soup", 5, 180],
        ["minecraft:rabbit_stew", 5, 300],
        ["collectorsreap:portobello_rice_soup", 5, 180],
        ["collectorsreap:land_and_sea_burger", 3, 180],
        ["collectorsreap:apple_gummy", 2, 10],
        ["endersdelight:chorus_stew", 5, 300],
        ["endersdelight:endermite_stew", 5, 300],
        ["farmersdelight:cooked_rice", 3, 30],
        ["farmersdelight:bone_broth", 5, 60],
        ["farmersdelight:beef_stew", 5, 180],
        ["farmersdelight:chicken_soup", 5, 300],
        ["farmersdelight:vegetable_soup", 5, 180],
        ["farmersdelight:fish_stew", 5, 180],
        ["farmersdelight:fried_rice", 3, 300],
        ["farmersdelight:pumpkin_soup", 5, 300],
        ["farmersdelight:baked_cod_stew", 5, 300],
        ["farmersdelight:noodle_soup", 5, 300],
        ["nethersdelight:strider_moss_stew", 8, 120],
        ["nethersdelight:nether_skewer", 10, 30],
        ["nethersdelight:propelpearl", 10, 10],
        ["nethersdelight:magma_gelatin", 10, 60],
        ["sob:boba_tea", 5, 120],
        ["undergardensdelight:droopstew", 5, 120],
        ["undergardensdelight:gronelunch", 5, 360],
    ]
    //寒冷效果的食物
    const chill = [
        ["collectorsreap:lime_popsicle", 5, 60],
        ["farmersdelight:melon_popsicle", 5, 60]
    ]

    let addEffect = (itemid, effectid, lv, duration) => {
        event.modify(itemid, item => {
            item.foodProperties = food => {
                let durationInTick = duration * 20
                let amplifier = lv - 1
                food.effect(effectid, durationInTick, amplifier , 1)
            }
        })
    }

    warmth.forEach(([itemid, lv, duration]) =>
        addEffect(itemid, "cold_sweat:warmth", lv, duration)
    )
    chill.forEach(([itemid, lv, duration]) =>
        addEffect(itemid, "cold_sweat:chill", lv, duration)
    )
})