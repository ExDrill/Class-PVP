import { world } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'

export const classList = [
    "knight",
    "archer",
    "tank",
    "gunner"
]

world.events.beforeItemUse.subscribe(event => {
    const item = event.item
    const player = event.source
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
        if (data.canceled) {
        } else {
            player.triggerEvent(`classpvp:${classList[data.selection]}`)
        }
    })
})

world.events.beforeChat.subscribe(event => {
    const msg = event.message
    const player = event.sender
    classList.forEach(playerClass => {
        if (msg == playerClass) {
            player.triggerEvent(`classpvp:${playerClass}`)
        } else if (msg == "reset") {
            player.triggerEvent('classpvp:reset_class')
        }
    })
})

world.events.playerSpawn.subscribe(event => {
    event.player.triggerEvent('classpvp:reset_class')
})

world.events.playerLeave.subscribe(event => {
    world.getPlayers({
        name: event.playerName
    })
})