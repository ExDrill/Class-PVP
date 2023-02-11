import { world, Player } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import * as Kits from './kits.js'

world.events.beforeItemUse.subscribe(event => {
    const item = event.item
    const player = event.source as Player
    if (event.source.typeId != "minecraft:player") return
    if (item.typeId != "minecraft:compass") return
    
    const classSelection = new ActionFormData()
    classSelection.title("Choose your class!")
    classSelection.button("Knight", "textures/items/iron_sword.png")
    classSelection.button("Archer", "textures/items/bow_standby.png")
    classSelection.button("Tank", "textures/items/iron_axe.png")
    classSelection.button("Gunner", "textures/items/gunpowder.png")
    
    classSelection.show(player).then(data => {
        player.triggerEvent('classpvp:reset_class')
        if (!data.canceled) {
            player.triggerEvent(`classpvp:${Kits.getRegistry()[data.selection].getName()}`)
        }
    })
})

world.events.beforeChat.subscribe(event => {
    const msg = event.message
    const player = event.sender

    for (const kit of Kits.getRegistry()) {
        if (msg == kit.getName()) {
            player.triggerEvent(`classpvp:${kit.getName()}`)
        } else if (msg == "reset") {
            player.triggerEvent('classpvp:reset_class')
        }
    }
})

world.events.playerSpawn.subscribe(event => {
    event.player.triggerEvent('classpvp:reset_class')
})

world.events.playerLeave.subscribe(event => {
    world.getAllPlayers()
})