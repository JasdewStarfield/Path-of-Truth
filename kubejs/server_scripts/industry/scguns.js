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

    //黄铜合金

    //硝钢
    event.remove({id:"scguns:create/treated_iron_blend_from_mixing"})
    event.recipes.create.mixing(Item.of('scguns:treated_iron_blend'), ['kubejs:unformed_steel_ingot','charcoal','flint','scguns:niter_dust']).heated()
})