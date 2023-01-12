import { world } from '@minecraft/server'

export const classList = [
    "knight",
    "archer",
    "tank",
    "gunner"
]

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