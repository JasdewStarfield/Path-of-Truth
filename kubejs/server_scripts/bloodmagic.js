//此文件提供血魔法系列修改
ServerEvents.recipes(event => {
    //修改血祭坛配方
    event.replaceInput({mod:'bloodmagic',output:'bloodmagic:altar'},
    'minecraft:gold_ingot', 'kubejs:bronze_ingot' )

    
})