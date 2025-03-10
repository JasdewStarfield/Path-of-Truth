PlayerEvents.decorateChat(event => {
  if (event.message.trim().toLowerCase().includes('xaero-waypoint')) {
    let msg = '' + event.message
    
    let parse = msg.split(':')
    let name = parse[1]
    let x = parse[3]
    let y = parse[4]
    let z = parse[5]
    let dim = parse[9]
    
    // 判断是否模组维度
	let dim_key = (dim.includes('$') ? dim.replace('Internal-','dimension.') : dim.replace('Internal-','dimension.minecraft.')).replace('-waypoints','').replace('dim%','').replace('$','.')
    //let dim_translate = Component.translate(dim_key)
    // ↑ 找不到翻译键名 mc原版自带的维度是有翻译的 如果能找到翻译键名就替换上去好了
    
     ///xaero_waypoint_add:Cave:C:468:65:-397:11:false:0:Internal-dim%blue-skies$everbright-waypoints
     //xaero-waypoint:地牢:地:3:93:-922:15:false:0:Internal-dim%blue-skies$everbright-waypoints
    
    let add_command = `/xaero_waypoint_add:${name}:${name.slice(0,1).toUpperCase()}:${x}:${y}:${z}:4:false:0:${dim}`
    let base = Component.string('')
    let texts = [
      Component.translate("msg.xearosmap.share_waypoint").noColor(),
      //dim_translate.green().underlined(),
      Component.green(`[x: ${x}, y: ${y}, z: ${z}, @${dim_key.split('.')[2]}]`).underlined(),
    ]
    texts.forEach(ele => base.append(ele))
    //base.clickRunCommand(add_command).hover('' + dim_translate.getString() + '\n点击添加路径点')
    base.clickRunCommand(add_command).hover('点击添加路径点 | Click to Add Waypoint')
    event.setMessage(base)
  }
})
