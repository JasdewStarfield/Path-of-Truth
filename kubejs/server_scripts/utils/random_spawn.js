/*
*
* 随机器相关设定
*
*/
// 是否随机取负值
const reverseNumber = true;

// 是否启用调试模式
const DENBUG_MODE = true;

// 要求无修改区块的半径（曼哈顿距离）
const clearRange = 20;

// 出生小屋列表
const spawnHouseStructureList = [
    {
        name: "spawnhouse",     // 结构名称，文件应当位于 kubejs\data\path_of_truth\structures\<NAME_OF_THE_STRUCTURE>.nbt
        generateXOffSet: -9,
        generateYOffSet: -28,   // 结构生成的时候结构最下方相对于玩家的偏移
        generateZOffSet: -7,

        xOffSet: 0,             // 生成后玩家需要tp到的偏移量，以下三个均是
        yOffSet: 5,
        zOffSet: 0
    },
    {
        name: "chinesespawn",     // 结构名称，文件应当位于 kubejs\data\path_of_truth\structures\<NAME_OF_THE_STRUCTURE>.nbt
        generateXOffSet: -8,
        generateYOffSet: -30,   // 结构生成的时候结构最下方相对于玩家的偏移
        generateZOffSet: -6,

        xOffSet: 0,             // 生成后玩家需要tp到的偏移量，以下三个均是
        yOffSet: 5,
        zOffSet: 0
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

//限定范围整数随机数
function getRandomInt(max){
    let randNumber = Math.floor(Math.random() * (max+1));
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
            this.event.server.runCommandSilent(`/scoreboard players set [${key}] ${this.name} 1`)
        },
        remove: function( key) {
            this.event.server.runCommandSilent(`/scoreboard players reset [${key}] ${this.name}`)
        },
        check: function(key) {

            const pass = this.event.server.runCommandSilent(`/execute if score [${key}] ${this.name} > false ${this.name} run scoreboard players set [${key}] ${this.name} 1`)
            //this.event.server.tell([Text.lightPurple('[持久化]'), "检查：" , key, " : [", pass, "] "]);
            return pass === 1;
        },
        init: function(event) {
            //event.player.tell([Text.lightPurple('[持久化]'), "this = ", this]);
            this.event = event;
            //this.event.server.tell([Text.lightPurple('[持久化]'), "创建计分板"]);

            if(!this.event.server.getScoreboard().hasObjective(`${this.name}`)) {
                this.event.server.runCommandSilent(`/scoreboard objectives add ${this.name} dummy "${this.name}"`)
                this.event.server.runCommandSilent(`/scoreboard players set false ${this.name} -1`)
                // this.event.server.tell([Text.lightPurple('[持久化]'), "创建计分板：", this.name]);
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
            //console.log([`[${this.realm}]`].concat(text))
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


/**
 * 随机玩家出生点并生成初始小屋
 * @param {*} server 服务器对象，可以从大部分的 event.server 获得
 * @param {*} player 玩家对象，可以从大部分玩家事件的 event.player 获得
 * @author Jacky_Blackson
 */
function randomSpread(server, player) {

    let x = Math.floor(player.x);
    let y = Math.floor(player.y);
    let z = Math.floor(player.z);
    let chunkX = Math.floor(x / 16)
    let chunkZ = Math.floor(z / 16)
    let event = {
        server: server,
        player: player
    }

    const logger = Logger("随机出生点", event)

    spawnRecord.init(event);
    modifiedChunkRecord.init(event);

    const username = player.username;

    // 选择出生位置，不重&&不在出生点
    const loop = true;
    // 随机偏移量
    let rx = 0;
    let rz = 0;
    // 目标区块的区块坐标
    let targChunkX = 0;
    let targChunkZ = 0;
    // 尝试次数，以便增加随机半径
    let times = 0;
    // 基准随机半径
    let tryRange = 5;
    // 尝试次数每增加一次增加的随机半径
    let increaseRatio = 0.5;
    while(loop) {

        // 增加尝试次数，以便基于此增加随机半径
        times++;
        // 获取随机坐标偏移量，随着尝试次数逐渐增大半径
        rx = getNumber(0,Math.floor(tryRange + times * increaseRatio));
        rz = getNumber(0,Math.floor(tryRange + times * increaseRatio));
        // 获取偏移后的目标区块坐标
        targChunkX = rx + chunkX;
        targChunkZ = rz + chunkZ;
        // logger.log(["尝试： ", recordName]);

        //判定目标区域是否被占用
        if(!(rz===0 && rx ===0)) {   // 不位于当前位置
            // flag
            let occupied = false;
            // 判定区块是否被其他玩家占用，需要遍历目标区块前后左右的所有位置（九宫格）

            for(let tx = -clearRange; tx <=clearRange; tx++) {
                for(let tz = -clearRange; tz <= clearRange; tz++) {
                    if(modifiedChunkRecord.check(`[${targChunkX + tx},${targChunkZ + tz}]`)) { //区块被记录
                        occupied = true;
                        //logger.log([`[${targChunkX}, ${targChunkZ}] `, "失败： 被占用"]);
                        break;
                    }
                }
                // 如果上层循环已经判定为被占用，那么不需要进行剩余的循环了
                if(occupied) {
                    break;
                }
            }
            let X = 16 * targChunkX + 8;
            let Z = 16 * targChunkZ + 8;
            let targetBiome = player.getLevel().getBiome([X, 400, Z]);
            let targetBiomeString = targetBiome.toString()
            //判定群系是否合法
            if(targetBiomeString.includes("ocean") || targetBiomeString.includes("river")) {
                occupied = true;
                //logger.log([`[${targChunkX}, ${targChunkZ}] `, "失败： 生物群系不合理"]);
            }
            //如果没有被占用，那么可以直接推出尝试的while loop，进入生成阶段
            if(!occupied) {
                logger.log(["成功寻找到生成区域，正在生成初始结构，请在原地不要走动……"]);
                break;
            }
        }
        // 如果上面没有跳出循环，那么说明尝试失败，进行下一轮尝试
    }
    // 解释：因为上面确保了中心周围九个区块都没有被占用，因此这里无需进行格点缩放
    // 确定区块中心坐标
    const X = 16 * targChunkX + 8;
    const Z = 16 * targChunkZ + 8;
    // 找到当地位置的最高坐标
    let highestBlockY = 0;
    for(let l = 400; l > 0; l--) {
        let blockStr = player.getLevel().getBlock(X, l, Z).toString()
        if(!(blockStr.includes("air") || blockStr.includes("leav") || blockStr.includes("log") || blockStr.includes("snow")) ||  blockStr.includes("wood") ) {
            // event.player.tell([Text.lightPurple('[测试位置]'), "    不是空气，在 y = ", l]);
            highestBlockY = l;
            break;
        }
    }
    // 移动玩家
    player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);    // 给予缓降效果防止摔死
    // logger.log(["移动玩家到： ", `${X}, ${highestBlockY}, ${Z}`]);
    server.runCommandSilent(`tp ${username} ${X} ${highestBlockY + 1} ${Z}`);  // 设置坐标
    server.runCommandSilent(`tp ${username} ${x} ${y} ${z}`);  // 设置坐标
    server.runCommandSilent(`tp ${username} ${X} ${highestBlockY + 1} ${Z}`);  // 设置坐标
    //player.setPositioni(X, highestBlockY + 1, Z)
    // 设置坐标缓存：当前区块已经被占用
    modifiedChunkRecord.save(`[${targChunkX},${targChunkZ}]`);
    // 重新获取玩家坐标
    const nplayer = server.getPlayer(username)
    // 重新设置坐标
    x = Math.floor(nplayer.x);
    y = Math.floor(nplayer.y);
    z = Math.floor(nplayer.z);
    // 获取结构
    const structure = spawnHouseStructureList[getRandomInt(spawnHouseStructureList.length-1)]
    // 生成结构
    const placeCmd = `place template path_of_truth:${structure.name} ${x + structure.generateXOffSet} ${y + structure.generateYOffSet} ${z + structure.generateZOffSet}`
    // player.tell([Text.lightPurple('[生成小屋]'), placeCmd]);
    player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);// 给予缓降效果
    player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 2, z + structure.zOffSet)
    let pass = false;

    pass = (server.runCommandSilent(placeCmd) === 1);

    if(!pass) {
        server.scheduleInTicks(100, callback => {
            //console.log(this)
            // player.tell([Text.lightPurple('[生成小屋]'), placeCmd]);
            player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);// 给予缓降效果
            player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 2, z + structure.zOffSet)
            server.runCommandSilent(placeCmd)
            player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 1, z + structure.zOffSet)
            // 完成
            // 清除无敌状态      //
            server.runCommandSilent(`/execute as ${player.username} at ${player.username} run spawnpoint`)
        })
    }

    player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 1, z + structure.zOffSet)
    // 完成
}

let questCallbackServer = "111111111111111111111111111111111111111111111111111111111111"
let questCallbackPlayer = "222222222222222222222222222222222222222222222222222222222222"
FTBQuestsEvents.completed('170E4E15DBE89604', event => {
    //event.server.runCommandSilent(`execute as ${event.player.username} run say #spawnSingly`)
    questCallbackPlayer = event.player
    questCallbackServer = event.server
    event.server.scheduleInTicks(20, callback => {
        //console.log(callback.data)
        randomSpread(this.questCallbackServer, this.questCallbackPlayer)
        //callback.reschedule(2 * MINUTE) //两分钟以后再通知一次
    })
})
FTBQuestsEvents.completed('6A1B42D208C780BD', event => {
    event.server.runCommandSilent(`/effect clear ${event.player.username}`)
    if(event.player.stages.has('beginnerQuestsNotCompleted')) {
        event.player.stages.remove('beginnerQuestsNotCompleted');
    }
})


const isStructureGenratedRecord = BoolRecord("is_struct_generated")

PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('notNewPlayer')) {

        let player = event.player;
        let server = event.server;

        let x = Math.floor(player.x);
        let y = Math.floor(player.y);
        let z = Math.floor(player.z);
        let chunkX = Math.floor(x / 16)
        let chunkZ = Math.floor(z / 16)

        modifiedChunkRecord.init(event);

        for(let tx = -clearRange; tx <=clearRange; tx++) {
            for(let tz = -clearRange; tz <= clearRange; tz++) {
                modifiedChunkRecord.save(`[${chunkX + tx},${chunkZ + tz}]`) //区块被记录
            }
        }

        modifiedChunkRecord.init(event);

        /*
        * 添加初始的无敌效果
        */
        event.player.tell([Text.lightPurple('[Welcome]'), `\n欢迎来到真理之路整合包！请通过初始任务选择你的起点！\nWelcome to Path of Truth! Please set your spawn place by choose in task!`]);
        event.server.runCommandSilent(`/give ${player.username} ftbquests:book`);// 给书（整合到这里了）
        event.server.runCommandSilent(`/effect give ${player.username} minecraft:slowness infinite 255 true`)
        event.server.runCommandSilent(`/effect give ${player.username} minecraft:resistance infinite 255 true`)
        event.server.runCommandSilent(`/effect give ${player.username} minecraft:regeneration infinite 255 true`)
        event.server.runCommandSilent(`/effect give ${player.username} minecraft:saturation infinite 255 true`)
        event.server.runCommandSilent(`/effect give ${player.username} minecraft:jump_boost infinite 128 true`)
        /*
        event.server.scheduleInTicks(50, callback => {
            event.server.runCommandSilent(`/clear ${player.username} patchouli:guide_book`);//清除烦人的铁魔法指引（模组没给配置）
            event.server.runCommandSilent(`/clear ${player.username} alexsmobsinteraction:ami_book_shattered`);
        })
        */
        event.player.stages.add('notNewPlayer');
        event.player.stages.add('beginnerQuestsNotCompleted');


        isStructureGenratedRecord.init(event);
        // if the house is never generated
        //如果没有生成房子且玩家是新玩家
        if(!isStructureGenratedRecord.check("worldSpawnpointHouse")) {
            // delay generation, due to the "not loaded" issue
            server.scheduleInTicks(10, callback => {
                // 获取结构
                const structure = spawnHouseStructureList[getRandomInt(spawnHouseStructureList.length-1)]
                // 生成结构
                const placeCmd = `place template path_of_truth:${structure.name} ${x + structure.generateXOffSet} ${y + structure.generateYOffSet} ${z + structure.generateZOffSet}`
                // player.tell([Text.lightPurple('[生成小屋]'), placeCmd]);
                player.potionEffects.add('minecraft:slow_falling', 60, 10, false, false);// 给予缓降效果
                player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 2, z + structure.zOffSet)
                for(let ty = 400; ty > 0; ty--){
                    server.runCommandSilent(`/execute as ${player.username} at ${player.username} if block ~ ${ty} ~ minecraft:barrier run ${placeCmd}`)
                }
                server.runCommandSilent(`/execute as ${player.username} at ${player.username} run fill ~5 ~10 ~5 ~-5 ~-10 ~-5 air replace barrier`)
                player.setPosition(x + structure.xOffSet, y + structure.yOffSet + 1, z + structure.zOffSet)
                server.runCommandSilent(`/execute as ${player.username} at ${player.username} run setworldspawn`)
                // 完成
                // 清除无敌状态      //
                //server.runCommandSilent(`effect clear ${player.username}`)
                //server.runCommandSilent(`effect give ${player.username} cold_sweat:grace 300 0 true`)
                //server.runCommandSilent(`/effect give ${player.username} cold_sweat:grace 300 0 true`)
                isStructureGenratedRecord.save("worldSpawnpointHouse");

                // let nplayer = server.getPlayer(player.username);
                // let x = Math.floor(nplayer.x);
                // let y = Math.floor(nplayer.y);
                // let z = Math.floor(nplayer.z);
                // server.runCommandSilent(`setworldspawn ${x} ${y} ${z}`)
            })
        }
        // event.player.tell([Text.lightPurple('[随机出生]'), `已经为玩家设置 notNewPlayer，成功？`, event.player.stages.has('notNewPlayer')]);
        // event.player.tell([Text.lightPurple('[随机出生]'), "执行完毕"]);
    }
})

PlayerEvents.tick(event => {
    if(event.player.age % 100 != 0) return // 每5秒提示一次
    if(event.player.stages.has('beginnerQuestsNotCompleted')) {
        // 如果玩家没有完成初始任务，那么每隔一段时间就会提示玩家
        event.player.tell([Text.lightPurple('[初始任务]'), "请完成初始任务以解除锁定状态！"]);
    }
})