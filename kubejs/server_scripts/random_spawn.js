// 最小及最大坐标
const minX = 1000;
const minZ = 1000;
const maxX = 1050;
const maxZ = 1050;
const minY = 100;
const maxY = 200;
// 是否随机取负值
const reverseNumber = true;

const spawnHouseStructureList = [
    {
        name: "spawnhouse",     // 结构名称，文件应当位于 kubejs\data\path_of_truth\structures\<NAME_OF_THE_STRUCTURE>.nbt
        generateYOffSet: -28,   // 结构生成的时候结构最下方相对于玩家的偏移
        xOffSet: 9,             // 生成后玩家需要tp到的偏移量，以下三个均是
        yOffSet: 5,
        zOffSet: 7
    }
]

const testLifeCycle = Math.floor(Math.random() * (114514 - 1919810 + 1) );

// 返回随机数
function getNumber(min,max){
    let randNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
    if(Math.random() > 0.5 && reverseNumber){
        randNumber = -randNumber;
    }
    return randNumber;
}

// PlayerEvents.loggedIn(event => {
//     let username = event.player.name
//     if (!event.player.stages.has('notNewPlayer')) {
//     	//0代表离线，1代表在线
//         event.player.setPosition(getNumber(minX,maxX), Math.abs(getNumber(minY,maxY)), getNumber(minZ,maxZ));// 设置坐标
//         event.player.statusMessage = `已将你传送到 x: ${event.player.x} y: ${event.player.y} z: ${event.player.z}`;// 玩家状态栏显示文字
//         event.player.potionEffects.add('minecraft:slow_falling', 600, 10, false, false);// 给予缓降效果
//         event.player.stages.add('notNewPlayer');
//         event.player.tell([Text.lightPurple('[游戏阶段测试]'), `已经为玩家设置 notNewPlayer，成功？`, event.player.stages.has('notNewPlayer')]);
//     }
// })


const spawnRecord = {
    save: (event, key) => {
        event.server.runCommand(`/scoreboard players add [${key}] occupied_spawnpoint 1`)
    },
    remove: (event, key) => {
        event.server.runCommand(`/scoreboard players reset [${key}] occupied_spawnpoint`)
    },
    check: (event, key) => {
        const pass = event.server.runCommand(`/execute if score [${key}] occupied_spawnpoint > false occupied_spawnpoint run scoreboard players set [${key}] occupied_spawnpoint 1`)
        return pass === 1;
    },
    init: (event) => {
        if(!event.server.getScoreboard().hasObjective(`occupied_spawnpoint`)) {
            event.server.runCommand(`/scoreboard objectives add occupied_spawnpoint dummy "occupied"`)
            event.server.runCommand(`/scoreboard players add false occupied_spawnpoint 1`)
            event.player.tell([Text.lightPurple('[持久化]'), "创建计分板"]);
        }
    }
}

PlayerEvents.chat((event) => {
	let input = event.message.trim();
    let x = Math.floor(event.player.x);
    let y = Math.floor(event.player.y);
    let z = Math.floor(event.player.z);
	if(input == "#spawn"){
        spawnRecord.init(event);
        
        const rawUsername = event.player.username;
        const username = rawUsername

        // 选择出生位置，不重&&不在出生点
        const loop = true;
        let rx = 0;
        let rz = 0;
        let times = 0;
        while(loop) {
            times++;
            rx = getNumber(0,20);
            rz = getNumber(0,20);
            event.player.tell([Text.lightPurple('[随机出生]'), "尝试： ", `[${rx}, ${rz}]`]);
            if(!((rz===0 && rx ===0) || spawnRecord.check(event, `[${rx},${rz}]`))) {   // 不：位于当前位置或被记录
                event.player.tell([Text.lightPurple('[随机出生]'), "成功： ", `[${rx}, ${rz}]`]);
                break;
            }
            if(times > 50) {
                break;
            }
            event.player.tell([Text.lightPurple('[随机出生]'), "失败： ", `[${rx}, ${rz}]`]);
        }
        const zoomRatio = 100;
        const X = zoomRatio * rx;
        const Z = zoomRatio * rz;

        event.player.potionEffects.add('minecraft:slow_falling', 600, 10, false, false);    // 给予缓降效果放置摔死
        event.player.tell([Text.lightPurple('[随机出生]'), "移动玩家到： ", `${x+X}, 500, ${z+Z}`]);
        event.server.runCommand(`tp ${username} ${x+X} 500 ${z+Z}`);// 设置坐标
        
        spawnRecord.save(event, `[${rx},${rz}]`);
        
        const spreadCmd = `spreadplayers ${x+X} ${z+Z} 1 20 false ${username}`
        event.player.tell([Text.lightPurple('[随机出生]'), "扩散命令： ", spreadCmd]);
        event.server.runCommand(spreadCmd)
        
        const player = event.server.getPlayer(username)

        x = Math.floor(player.x);
        y = Math.floor(player.y);
        z = Math.floor(player.z);

        const structure = spawnHouseStructureList[Math.floor(Math.random() * (spawnHouseStructureList.length - 1) )]
        
        const placeCmd = `place template path_of_truth:${structure.name} ${x} ${y + structure.generateYOffSet} ${z}`
        event.player.tell([Text.lightPurple('[生成小屋]'), placeCmd]);
        event.player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);// 给予缓降效果
        event.player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 2, z + structure.zOffSet)
        event.server.runCommand(placeCmd);
        event.player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 1, z + structure.zOffSet)

        event.player.tell([Text.lightPurple('[随机出生]'), "完成！"]);


        event.cancel();// 取消该事件，也就是说玩家发送的消息不会显示在其他玩家的公屏上
    }
})

PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('notNewPlayer')) {
        let x = Math.floor(event.player.x);
        let y = Math.floor(event.player.y);
        let z = Math.floor(event.player.z);

        spawnRecord.init(event);
        
        const rawUsername = event.player.username;
        const username = rawUsername

        // 选择出生位置，不重&&不在出生点
        const loop = true;
        let rx = 0;
        let rz = 0;
        let times = 0;
        while(loop) {
            times++;
            rx = getNumber(0,20);
            rz = getNumber(0,20);
            event.player.tell([Text.lightPurple('[随机出生]'), "尝试： ", `[${rx}, ${rz}]`]);
            if(!((rz===0 && rx ===0) || spawnRecord.check(event, `[${rx},${rz}]`))) {   // 不：位于当前位置或被记录
                event.player.tell([Text.lightPurple('[随机出生]'), "成功： ", `[${rx}, ${rz}]`]);
                break;
            }
            if(times > 50) {
                break;
            }
            event.player.tell([Text.lightPurple('[随机出生]'), "失败： ", `[${rx}, ${rz}]`]);
        }
        const zoomRatio = 100;
        const X = zoomRatio * rx;
        const Z = zoomRatio * rz;

        event.player.potionEffects.add('minecraft:slow_falling', 600, 10, false, false);    // 给予缓降效果放置摔死
        event.player.tell([Text.lightPurple('[随机出生]'), "移动玩家到： ", `${x+X}, 500, ${z+Z}`]);
        event.server.runCommand(`tp ${username} ${x+X} 500 ${z+Z}`);// 设置坐标
        
        spawnRecord.save(event, `[${rx},${rz}]`);
        
        const spreadCmd = `spreadplayers ${x+X} ${z+Z} 1 40 false ${username}`
        event.player.tell([Text.lightPurple('[随机出生]'), "扩散命令： ", spreadCmd]);
        event.server.runCommand(spreadCmd)
        
        const player = event.server.getPlayer(username)

        x = Math.floor(player.x);
        y = Math.floor(player.y);
        z = Math.floor(player.z);

        const structure = spawnHouseStructureList[Math.floor(Math.random() * (spawnHouseStructureList.length - 1) )]
        
        const placeCmd = `place template path_of_truth:${structure.name} ${x} ${y + structure.generateYOffSet} ${z}`
        event.player.tell([Text.lightPurple('[生成小屋]'), placeCmd]);
        event.player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);// 给予缓降效果
        event.player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 2, z + structure.zOffSet)
        event.server.runCommand(placeCmd);
        event.player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 1, z + structure.zOffSet)

        event.player.tell([Text.lightPurple('[随机出生]'), "生成小屋完成！"]);

        event.player.stages.add('notNewPlayer');
        event.player.tell([Text.lightPurple('[随机出生]'), `已经为玩家设置 notNewPlayer，成功？`, event.player.stages.has('notNewPlayer')]);
        event.player.tell([Text.lightPurple('[随机出生]'), "执行完毕"]);
    }
})