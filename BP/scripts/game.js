import { world } from '@minecraft/server'
import { classList } from './class/selection.js'

/**
 * Decrements the gametime, while the game is ongoing.
 * Ends the match whenever the game is started and the gametime reaches 0.
 */
world.events.tick.subscribe(() => {
    if (isGameStarted() && getGameTime() > 0) {
        setGameTime(getGameTime() - 1)
    } else
    if (getGameTime() == 0 && isGameStarted()) {
        endMatch()
    }
    else {
        return
    }
})

world.events.beforeChat.subscribe(event => {
    if (event.message == "debugStart") {
        startMatch()
    }
})

export function startMatch() {
    setGameTime(200)

    world.getAllPlayers().forEach(player => {
        player.runCommandAsync("say game start!")
    })
    setGameStarted(true)
}

export function endMatch() {
    world.getAllPlayers().forEach(player => {
        //if (!player.hasTag("InGame")) continue
        player.runCommandAsync("say game end!")
    })
    setGameStarted(false)
}

export function getGameTime() {
    return world.getDynamicProperty("GameTime")
}

export function setGameTime(value) {
    world.setDynamicProperty("GameTime", value)
}

export function isGameStarted() {
    return world.getDynamicProperty("GameStarted")
}

export function setGameStarted(value) {
    world.setDynamicProperty("GameStarted", value)
}

export function getPlayerCount() {
    let playerCount = 0
    world.getAllPlayers().forEach(() => playerCount++)
    return playerCount
}