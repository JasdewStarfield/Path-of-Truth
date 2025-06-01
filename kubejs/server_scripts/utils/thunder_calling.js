{
    let mana_cost = 100000
    let costItem = 'botania:mana_diamond'
    BlockEvents.rightClicked('lightning_rod', e => {
        let {
            block: { pos },
            level,
            hand,
            player,
            player: { mainHandItem },
        } = e
        if (hand != 'main_hand' || mainHandItem.id != costItem) return
        player.swing()
        let poolBelow = level.getBlockEntity(pos.below())
        if (!(poolBelow?.currentMana >= mana_cost)) return
        poolBelow.receiveMana(-mana_cost)
        let lightning = level.createEntity('lightning_bolt')
        lightning.setPos(pos.center)
        lightning.spawn()
        level.runCommandSilent('weather thunder')
        mainHandItem.shrink(1)
    })
}
