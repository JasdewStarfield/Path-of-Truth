ServerEvents.recipes(event => {
    event.remove({id:/scguns\:immersiveengineering\/hammercrushing\.*/})
    event.remove({id:/scguns\:create\/recycling\.*/})
    //移除scguns默认的机器，改用机械动力合成
    event.remove({type:"scguns:macerating"})
    event.remove({type:"scguns:powered_macerating"})
    event.remove({type:"scguns:mechanical_pressing"})
    event.remove({type:"scguns:powered_mechanical_pressing"})
    let SCGunsRemoved = [
        "cryoniter",
        "thermolith",
        "polar_generator",
        "lightning_battery",
        "lightning_rod_connector",
        "macerator",
        "powered_macerator",
        "mechanical_press",
        "powered_mechanical_press"
    ]
    SCGunsRemoved.forEach((item) =>
        event.remove({output:"scguns:"+item})
    )
    event.remove({id:"immersiveengineering:crafting/gunpowder_from_dusts"})
    event.remove({id:"salt:gunpowder"})

    //各级蓝图
    event.shaped(Item.of('scguns:copper_blueprint'), [ 
        'DAD',
        'ABA',
        'DAD'
    ], {
        A: 'paper',
        B: '#forge:storage_blocks/copper',
        D: '#forge:ingots/copper'
    })
    event.shaped(Item.of('scguns:iron_blueprint'), [ 
        'DAD',
        'ABA',
        'DAD'
    ], {
        A: 'paper',
        B: '#forge:storage_blocks/iron',
        D: 'scguns:copper_blueprint'
    })
    event.shaped(Item.of('scguns:treated_brass_blueprint'), [ 
        'DAD',
        'ABA',
        'DAD'
    ], {
        A: 'paper',
        B: 'scguns:treated_brass_block',
        D: 'scguns:iron_blueprint'
    })
    event.shaped(Item.of('scguns:diamond_steel_blueprint'), [ 
        'DAD',
        'ABA',
        'DAD'
    ], {
        A: 'paper',
        B: 'scguns:diamond_steel_block',
        D: 'scguns:treated_brass_blueprint'
    })

    //模具
    const moldTypesSCGuns = [
        "small_casing_mold",
        "medium_casing_mold",
        "large_casing_mold",
        "bullet_mold",
        "gun_parts_mold",
        "disc_mold"
    ]
    moldTypesSCGuns.forEach( id => {
        event.recipes.vintageimprovements.turning([Item.of('scguns:'+id), Item.of('scguns:anthralite_nugget',5), Item.of('scguns:anthralite_nugget',8).withChance(0.5)], 'scguns:blank_mold')
    })
    event.recipes.vintageimprovements.turning([Item.of('kubejs:mold_ingot'), Item.of('scguns:anthralite_nugget',5), Item.of('scguns:anthralite_nugget',8).withChance(0.5)], 'scguns:blank_mold')

    //枪械台
    event.remove({id:"scguns:gun_bench"})
    event.shaped(Item.of('scguns:gun_bench'), [ 
        'DD',
        'AA' 
    ], {
        A: '#minecraft:planks',
        D: 'flint'
    })

    //握把
    event.remove({id:"scguns:gun_grip"})
    event.shaped(Item.of('scguns:gun_grip'), [ 
        'AA',
        'A ' 
    ], {
        A: '#minecraft:planks'
    })

    //铜级别弹药增加低科技生产路径
    event.stonecutting(
        Item.of('scguns:small_copper_casing', 6),
        '#forge:ingots/copper'
    )
    event.stonecutting(
        Item.of('scguns:medium_copper_casing', 4),
        '#forge:ingots/copper'
    )
    event.shapeless(
        Item.of('scguns:compact_copper_round'),
        ['scguns:small_copper_casing', '#scguns:gunpowder_dust', "#scguns:stan_bullet_tips", '#scguns:gunpowder_dust', "#scguns:stan_bullet_tips"]
    )
    event.shapeless(
        Item.of('scguns:standard_copper_round'),
        ['scguns:medium_copper_casing', '#scguns:gunpowder_dust', "#scguns:stan_bullet_tips", '#scguns:gunpowder_dust', "#scguns:stan_bullet_tips"]
    )
    event.shapeless(
        Item.of('scguns:shotgun_shell'),
        ['scguns:small_copper_casing', 'paper', "scguns:buckshot", 'paper', "scguns:buckshot"]
    )

    //古代黄铜平衡
    event.remove({id:"scguns:create/ancient_brass_brass_from_mixing"})
    event.recipes.create.mixing([
        Item.of('create:brass_nugget', 12),
        Item.of('create:brass_nugget', 4).withChance(0.5)
    ], [
        '#forge:ingots/brass',
        "scguns:ancient_brass",
    ]).heated()

    //烈性煤
    event.recipes.vintageimprovements.pressurizing([
        Item.of('scguns:vehement_coal', 2)
    ], [
        Item.of('scguns:vehement_coal'),
        Item.of('#forge:coal_coke'),
        Item.of('scguns:sheol'),
        Fluid.of("minecraft:lava", 500)
    ]).superheated()

    //硝钢
    event.remove({id:"scguns:create/treated_iron_blend_from_mixing"})
    event.recipes.create.mixing([
        Item.of('scguns:treated_iron_blend'),
        Item.of('scguns:treated_iron_blend').withChance(0.5)
    ], [
        '#forge:ingots/iron',
        'scguns:anthralite_ingot',
        'flint',
        '#forge:dusts/saltpeter'
    ]).heated()
    event.custom({
        "type":"immersiveengineering:arc_furnace",
        "additives":[],
        "energy":51200,
        "input":{"item":"scguns:treated_iron_blend"},
        "results":[{"item":"scguns:treated_iron_ingot"}],
        "time":40
    })

    //黄铜合金
    event.remove({id:"scguns:create/treated_brass_blend_from_mixing"})
    event.remove({id:"scguns:create/treated_brass_ingot_from_mixing"})
    event.recipes.create.mixing([
        Item.of('scguns:treated_brass_blend'),
        Item.of('scguns:treated_brass_blend').withChance(0.5)
    ], [
        '#forge:ingots/brass',
        'kubejs:unformed_steel_ingot',
        'botania:quartz_blaze',
        '#forge:dusts/redstone'
    ]).heated()
    event.custom({
        "type":"immersiveengineering:arc_furnace",
        "additives":[],
        "energy":51200,
        "input":{"item":"scguns:treated_brass_blend"},
        "results":[{"item":"scguns:treated_brass_ingot"}],
        "time":40
    })

    //钢化钻石
    event.remove({id:"scguns:create/diamond_steel_blend_from_mixing"})
    event.remove({id:"scguns:create/diamond_steel_ingot_from_mixing"})
    event.remove({id:"scguns:diamond_steel_ingot_from_smelting_diamond_steel_blend"})
    event.remove({id:"scguns:diamond_steel_ingot_from_blasting_diamond_steel_blend"})
    event.recipes.create.mixing([
        Item.of('scguns:diamond_steel_blend'),
        Item.of('scguns:diamond_steel_blend').withChance(0.5)
    ], [
        '#forge:gems/mana_diamond',
        '#forge:ingots/voidsteel',
        '#forge:gems/prismarine',
        'vintageimprovements:copper_sulfate',
    ]).superheated()
    event.custom({
        "type":"immersiveengineering:arc_furnace",
        "additives":[],
        "energy":102400,
        "input":{"item":"scguns:diamond_steel_blend"},
        "results":[{"item":"scguns:diamond_steel_ingot"}],
        "time":100
    })

    //焦化锭
    event.remove({id:"scguns:create/scorched_blend_from_mixing"})
    event.remove({id:"scguns:scorched_ingot_from_smelting_scorched_blend"})
    event.remove({id:"scguns:scorched_ingot_from_blasting_scorched_blend"})
    event.recipes.create.mixing([
        Item.of('scguns:scorched_blend'),
        Item.of('scguns:scorched_blend').withChance(0.5)
    ], [
        'scguns:vehement_coal',
        '#forge:ingots/netherite',
        'dragon_breath',
        'botania:life_essence'
    ]).superheated()
    event.custom({
        "type":"immersiveengineering:arc_furnace",
        "additives":[],
        "energy":204800,
        "input":{"item":"scguns:scorched_blend"},
        "results":[{"item":"scguns:scorched_ingot"}],
        "time":200
    })

    //创造子弹盒
    event.shaped(Item.of('scguns:creative_ammo_box'), [ 
        'BBB',
        'ACA',
        'BBB' 
    ], {
        A: 'scguns:scorched_blueprint',
        B: 'kubejs:electronic_engineering',
        C: 'scguns:special_ammo_box'
    })
})