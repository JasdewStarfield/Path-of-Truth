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
      ["create_power_loader:empty_andesite_chunk_loader", "glowstone"]
    ]
    andesiteEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:andesite_engineering", material)
    )

    const fluidEngineering = [
      ["create:deployer", "create:brass_hand"],
      ["create:spout", "hopper"],
      ["create:item_drain", "createdeco:iron_mesh_fence"],
      ["create_enchantment_industry:printer", "create:sturdy_sheet"],
      ["create_enchantment_industry:disenchanter", "#create:sandpaper"],
      ["create:hose_pulley", "dried_kelp_block"],
      ["create:portable_fluid_interface", "create:chute"]
    ]
    fluidEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:fluid_engineering", material)
    )

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
      ["create_power_loader:empty_brass_chunk_loader", "glowstone"]
    ]
    preciseEngineering.forEach(([output, material]) =>
      InteractiveCrafting(output, "kubejs:precise_engineering", material)
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
