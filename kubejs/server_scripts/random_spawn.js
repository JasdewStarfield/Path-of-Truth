// 最小及最大坐标
const minX = 1000;
const minZ = 1000;
const maxX = 1050;
const maxZ = 1050;
const minY = 100;
const maxY = 200;
// 是否随机取负值
const reverseNumber = true;

const DENBUG_MODE = true;


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

const BoolRecord = function(objName) {
    return {
        name: objName,
        event: null,
        save: function(key) {
            this.event.server.runCommand(`/scoreboard players set [${key}] ${this.name} 1`)
        },
        remove: function( key) {
            this.event.server.runCommand(`/scoreboard players reset [${key}] ${this.name}`)
        },
        check: function(key) {
            const pass = this.event.server.runCommand(`/execute if score [${key}] ${this.name} > false ${this.name} run scoreboard players set [${key}] ${this.name} 1`)
            return pass === 1;
        },
        init: function(event) {
            //event.player.tell([Text.lightPurple('[持久化]'), "this = ", this]);
            this.event = event;
            //this.event.server.tell([Text.lightPurple('[持久化]'), "创建计分板"]);
            
            if(!this.event.server.getScoreboard().hasObjective(`${this.name}`)) {
                this.event.server.runCommand(`/scoreboard objectives add ${this.name} dummy "${this.name}"`)
                this.event.server.runCommand(`/scoreboard players add false ${this.name} 1`)
                this.event.server.tell([Text.lightPurple('[持久化]'), "创建计分板"]);
            }
        }
    }
}

const Logger = function(realmName, event){
    return {
        realm: realmName,
        event: event,
        log: function(text){
            this.event.player.tell([Text.lightPurple(`[${this.realm}]`)].concat(text));
            console.log([`[${this.realm}]`].concat(text))
        }
    }
}

const spawnRecord = BoolRecord("occupied_spawnpoint");

const testRecord = BoolRecord("test_record");

const modifiedChunkRecord = BoolRecord("modified_chuncks")

BlockEvents.placed((event) => {
    const block = event.block;
    if(event.getPlayer()){
        const x = block.x;
        const y = block.y;
        const z = block.z;

        let chunkX = Math.floor(x / 16)
        let chunkZ = Math.floor(z / 16)

        modifiedChunkRecord.init(event);
        modifiedChunkRecord.save(`[${chunkX},${chunkZ}]`);
    }
})

PlayerEvents.chat((event) => {
	let input = event.message.trim();

    let x = Math.floor(event.player.x);
    let y = Math.floor(event.player.y);
    let z = Math.floor(event.player.z);

    event.player.tell([Text.lightPurple('[测试日志]'), "开始"]);

    let logger = Logger("测试持久化封装", event)
    logger.log("日志开始！")

    testRecord.init(event);

	if(input == "#testobj" && DENBUG_MODE){
        let target = `[${x},${z}]`
        let checkResult = testRecord.check(target)

        logger.log([`玩家拥有记录 “${target}”？[${checkResult}]`])

        testRecord.save(target)

        logger.log([`保存记录 “${target}”！`])
        logger.log([`现在玩家拥有记录 “${target}”？[${checkResult}]`])
    }
})


PlayerEvents.chat((event) => {
    let input = event.message.trim();
    let logger = Logger("测试生物群系", event)

	if(input == "#biome" && DENBUG_MODE){
        const player = event.player;
        const blockPos = {
            x: player.getBlockX(),
            y: player.getBlockY(),
            z: player.getBlockZ()
        }
        const biome = player.world.getBiome(blockPos);

        // 判断玩家当前位置的生物群系类型是否为海洋类型或河流类型
        const biomeType = biome.getBiomeCategory();
        if (biomeType === 'ocean' || biomeType === 'river') {
            logger.log('玩家当前位置为海洋或河流类型生物群系');
        }

        // 将玩家移动到所在列方块的最上面一个上
        for (let y = blockPos.y; y < 300; y++) {
            const block = player.world.getBlock(blockPos.up(y));
            const maxY = -114514;
            if (!block.isAir() && !block.isTransparent()) {
                maxY = y;
            }
        }

        player.setPosition(blockPos.up(maxY).add(0.5, 1, 0.5));

    }
})

function randomSpread(server, player) {
    let x = Math.floor(player.x);
    let y = Math.floor(player.y);
    let z = Math.floor(player.z);
    let event = {
        server: server,
        player: player
    }

    const logger = Logger("随机出生点", event)

    spawnRecord.init(event);
        
    const rawUsername = player.username;
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
        logger.log(["尝试： ", `[${rx}, ${rz}]`]);
        if(!((rz===0 && rx ===0) || spawnRecord.check(`[${rx},${rz}]`))) {   // 不：位于当前位置或被记录
            logger.log(["成功： ", `[${rx}, ${rz}]`]);
            break;
        }
        if(times > 50) {
            break;
        }
        logger.log(["失败： ", `[${rx}, ${rz}]`]);
    }
    const zoomRatio = 100;
    const X = zoomRatio * rx;
    const Z = zoomRatio * rz;

    player.potionEffects.add('minecraft:slow_falling', 600, 10, false, false);    // 给予缓降效果放置摔死
    logger.log(["移动玩家到： ", `${x+X}, 500, ${z+Z}`]);
    server.runCommand(`tp ${username} ${x+X} 500 ${z+Z}`);// 设置坐标
    
    spawnRecord.save(`[${rx},${rz}]`);
    
    const spreadCmd = `spreadplayers ${x+X} ${z+Z} 1 20 false ${username}`
    logger.log(["扩散命令： ", spreadCmd]);
    server.runCommand(spreadCmd)
    
    const nplayer = server.getPlayer(username)

    x = Math.floor(nplayer.x);
    y = Math.floor(nplayer.y);
    z = Math.floor(nplayer.z);

    const structure = spawnHouseStructureList[Math.floor(Math.random() * (spawnHouseStructureList.length - 1) )]
    
    const placeCmd = `place template path_of_truth:${structure.name} ${x} ${y + structure.generateYOffSet} ${z}`
    player.tell([Text.lightPurple('[生成小屋]'), placeCmd]);
    player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);// 给予缓降效果
    player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 2, z + structure.zOffSet)
    server.runCommand(placeCmd);
    player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 1, z + structure.zOffSet)

    player.tell([Text.lightPurple('[随机出生]'), "完成！"]);
}

PlayerEvents.chat((event) => {
	let input = event.message.trim();
	if(input == "#spawn" && DENBUG_MODE){
        randomSpread(event.server, event.player)
    }
})

PlayerEvents.chat((event) => {
	let input = event.message.trim();
	if(input == "r" && DENBUG_MODE){
        event.server.runCommand("kubejs reload server_scripts")
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
            if(!((rz===0 && rx ===0) || spawnRecord.check(`[${rx},${rz}]`))) {   // 不：位于当前位置或被记录
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
        
        spawnRecord.save(`[${rx},${rz}]`);
        
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