ServerEvents.recipes(event => {
    event.remove({id:/scguns\:immersiveengineering\/hammercrushing\.*/})
    //移除scguns默认的机器，改用机械动力合成
    event.remove({type:"scguns:macerating"})
    event.remove({type:"scguns:powered_macerating"})
    event.remove({type:"scguns:mechanical_pressing"})
    event.remove({type:"scguns:powered_mechanical_pressing"})
    event.remove({type:"scguns:gun_bench"})
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
})