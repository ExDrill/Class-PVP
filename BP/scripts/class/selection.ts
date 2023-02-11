import { world, Player } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui'
import * as Kits from './kits.js'

world.events.beforeItemUse.subscribe(event => {
    const item = event.item
    const player = event.source as Player
    if (event.source.typeId != "minecraft:player") return
    if (item.typeId != "minecraft:compass") return
    createUI(player)
})

function createUI(player: Player) {
    const classSelection = new ActionFormData()
    classSelection.title("Choose your class!")
    for (const kit of Kits.getRegistry()) {
        const kitName = kit.getName().charAt(0).toUpperCase() + kit.getName().slice(1)
        classSelection.button(kitName, `textures/icons/${kit.getName()}.png`)
    }
    classSelection.show(player).then(data => {
        player.triggerEvent('classpvp:reset_class')
        if (!data.canceled) {
            const selectedKit = Kits.getRegistry()[data.selection].getName()
            try {
                player.triggerEvent(`classpvp:${selectedKit}`)
            } catch {
                console.error(`Class "${selectedKit}" does not have an event`)
            }   
        }
    })
}

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

/*
world.events.playerLeave.subscribe(event => {
    let player: Player = undefined
    for (const playerFinder of world.getAllPlayers()) {
        if (playerFinder.name != event.playerName) continue
        player = playerFinder
    }
})
*/