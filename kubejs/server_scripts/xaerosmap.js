PlayerEvents.decorateChat(event => {
  if (event.message.trim().toLowerCase().includes('xaero-waypoint')) {
    let msg = '' + event.message
    let user_name = event.getUsername()
    let {x, y, z, dimension, biomeId} = event.player.getBlock()
    let dimensionKey = ('' + dimension).replace(':','$')
    let biomeKey = ('' + biomeId).replace(':','.')
    
//     /xaero_waypoint_add:Cave:C:468:65:-397:11:false:0:Internal-dim%blue-skies$everbright-waypoints
//     xaero-waypoint:地牢:地:3:93:-922:15:false:0:Internal-dim%blue-skies$everbright-waypoints
    
    let add_command = `/xaero_waypoint_add:${user_name}分享的地点:${user_name.slice(0,1).toUpperCase()}:${x}:${y}:${z}:4:false:0:Internal-dim%${dimensionKey}-waypoints`
    let base = Component.string('')
    let texts = [
      Component.string('分享了一个位置：').noColor(),
      Component.green('[').bold(),
      Component.translate(`biome.${biomeKey}`).underlined().green(),
      Component.gray(`(x: ${x} y: ${y} z: ${z})`),
      Component.green(']').bold(),
    ]
    texts.forEach(ele => base.append(ele))
    base.clickRunCommand(add_command).hover('' + dimension + ' - ' + biomeId + '\n点击添加路径点')
    
    event.setMessage(base)
  }
  
})