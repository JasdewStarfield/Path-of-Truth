ServerEvents.recipes(event => {
    //通用公式
    let InteractiveCrafting = (output, base, material) => {
      event.remove({output:output})
      event.recipes.createItemApplication(output, [base, material])
      event.shaped(output, [
        'B',
        'A'
      ], {
        A: base,
        B: material
      })
    }

    //动力工程块系列（安山系列）
    const andesiteEngineering = [
      ["create:mechanical_roller", "create:crushing_wheel"],
      ["create:mechanical_saw", "kubejs:crude_sawblade"],
      ["create:mechanical_drill", "immersiveengineering:drillhead_iron"],
      ["create:mechanical_plough", "#forge:plates/iron"],
      ["create:mechanical_harvester", "iron_trapdoor"],
      ["create:mechanical_bearing", "botania:livingwood_slab"],
      ["create:windmill_bearing", "botania:livingrock_slab"],
      ["create:mechanical_piston", "create:piston_extension_pole"],
      ["create:mechanical_mixer", "create:whisk"],
      ["create:mechanical_press", "#forge:storage_blocks/andesite_alloy"],
      ["create:contraption_controls", "create:electron_tube"],
      ["rechiseledcreate:mechanical_chisel", "rechiseled:chisel"],
      ["create:gantry_carriage", "create:cogwheel"],
      ["create:rope_pulley", "#forge:rope"],
      ["create:cuckoo_clock", "clock"],
      ["create:portable_storage_interface", "create:chute"],
      ["create:millstone", "grindstone"],
      ["create:encased_fan", "create:propeller"],
      ["create_power_loader:empty_andesite_chunk_loader", "glowstone"],
      ["create_mechanical_extruder:mechanical_extruder", "kubejs:fluid_engineering"],
      ['createaddition:rolling_mill', '#forge:storage_blocks/iron'],
      ['vintageimprovements:spring_coiling_machine', 'vintageimprovements:spring_coiling_machine_wheel'],
      ['vintageimprovements:vibrating_table', "kubejs:basic_spring_set"]
    ]
    andesiteEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:andesite_engineering", material)
    )

    //流体工程块（铜）
    const fluidEngineering = [
      ["create:deployer", "create:brass_hand"],
      ["create:spout", "hopper"],
      ["create:item_drain", "createdeco:iron_mesh_fence"],
      ["create_enchantment_industry:printer", "create:sturdy_sheet"],
      ["create_enchantment_industry:disenchanter", "#create:sandpaper"],
      ["create:hose_pulley", "dried_kelp_block"],
      ["create:portable_fluid_interface", "create:chute"],
      ["vintageimprovements:vacuum_chamber", "create:mechanical_pump"]
    ]
    fluidEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:fluid_engineering", material)
    )

    //精密工程块（黄铜）
    const preciseEngineering = [
      ["create:display_link", "create:redstone_link"],
      ["create:clockwork_bearing", "create:adjustable_chain_gearshift"],
      ["create:mechanical_arm", "create:brass_hand"],
      ["create:elevator_pulley", "#forge:rope"],
      ["create:content_observer", "observer"],
      ["iammusicplayer:music_manager", "jukebox"],
      ["create:redstone_link", "redstone_torch"],
      //["create:mechanical_crafter", "#forge:workbench"],
      ["create:stockpile_switch", "comparator"],
      ["create:rotation_speed_controller", "create:precision_mechanism"],
      ["create_power_loader:empty_brass_chunk_loader", "glowstone"],
      ['vintageimprovements:belt_grinder', 'vintageimprovements:grinder_belt']
    ]
    preciseEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:precise_engineering", material)
    )

    //传感工程块
    const sensoryEngineering = [
      //['createutilities:void_motor', "create_new_age:advanced_motor"],
      ['createutilities:void_chest', "ender_chest"],
      ['createutilities:void_tank', "tfmg:steel_fluid_tank"],
      ['createutilities:void_battery', "immersiveengineering:capacitor_mv"],
    ]
    sensoryEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "immersiveengineering:rs_engineering", material)
    )

    //物流工程块
    const logisticalEngineering = [
      ['storagedrawers:controller', "create:precision_mechanism"],
      ['storagedrawers:controller_slave', "#forge:plates/brass"],
      ['create:controls', "lever"],
      ['create:track_observer', "observer"],
      ['create:track_station', "compass"],
      ['create:track_signal', "create:electron_tube"],
      ['railways:portable_fuel_interface', "create:chute"],
      ['railways:track_coupler', "#forge:plates/iron"]
    ]
    logisticalEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:logistical_engineering", material)
    )

    //轻型工程块
    const lightEngineering = [
      ['createaddition:tesla_coil', "immersiveengineering:coil_mv"]
    ]
    lightEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "immersiveengineering:light_engineering", material)
    )

    //重型工程块
    const heavyEngineering = [
      /*
      ['tfmg:surface_scanner', "immersiveengineering:rs_engineering"],
      ['tfmg:machine_input', "kubejs:andesite_engineering"],
      ['tfmg:pumpjack_crank', "immersiveengineering:steel_scaffolding_standard"],
      ['tfmg:pumpjack_base', "tfmg:industrial_pipe"],
      ['tfmg:steel_distillation_output', "kubejs:fluid_engineering"],
      ['tfmg:steel_distillation_controller', "kubejs:precise_engineering"],
      ['create_new_age:energiser_t2', "minecraft:lightning_rod"]
      */
    ]
    heavyEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "immersiveengineering:heavy_engineering", material)
    )

    //电子工程块
    const electronicEngineering = [
      //['create_new_age:energiser_t3', "minecraft:lightning_rod"]
    ]
    electronicEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:electronic_engineering", material)
    )

    //一些其它的姑且也放这罢
    //传动杆
    event.remove({id: "create:crafting/kinetics/shaft"})
    event.shaped(
      Item.of('create:shaft', 4),
      [
      'A',
      'A'
      ],
      {
          A: 'create:andesite_alloy'
      }
    )
    //水车部件
    event.remove({id: "immersiveengineering:crafting/waterwheel_segment"})
    event.shaped(
      Item.of('immersiveengineering:waterwheel_segment', 2),
      [
      ' A ',
      'AAA',
      'BCB'
      ],
      {
          A: 'botania:livingwood_planks',
          B: 'create:andesite_alloy',
          C: '#forge:ingots/copper'
      }
    )
    //水车
    event.replaceInput(
      { output:/create:.*water_wheel/ },
      '#minecraft:planks',
      'immersiveengineering:waterwheel_segment'
    )
    //粉碎轮
    event.replaceInput(
      { output:"create:crushing_wheel" },
      '#minecraft:planks',
      'immersiveengineering:treated_wood_horizontal'
    )
    event.replaceInput(
      { output:"create:crushing_wheel" },
      '#forge:stone',
      '#forge:storage_blocks/brass'
    )

    //区块加载器
    event.recipes.botania.mana_infusion('create_power_loader:brass_chunk_loader', 'create_power_loader:empty_brass_chunk_loader', 10000)
    event.recipes.botania.mana_infusion('create_power_loader:andesite_chunk_loader', 'create_power_loader:empty_andesite_chunk_loader', 4000)
})
