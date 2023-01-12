import { world } from '@minecraft/server'
import { classList } from '../class/selection.js'

/**
 * Decrements the gametime, while the game is ongoing.
 * Ends the match whenever the game is started and the gametime reaches 0.
 */
world.events.tick.subscribe(() => {
    if (isRoundStarted() && getRoundTime() > 0) {
        setRoundTime(getRoundTime() - 1)
    } else
    if (getRoundTime() == 0 && isRoundStarted()) {
        endRound()
    }
    else {
        return
    }
})

export function startRound() {
    if (!isRoundStarted()) {
        world.say("Round started")
        setRoundStarted(true)
        setRoundTime(200)
    } else {
        console.error("Failed to start round, there is already an ongoing round!")
    }
}

export function endRound() {
    if (isRoundStarted()) {
        world.say("Round ended")
        setRoundStarted(false)
        setRoundTime(0)
    } else {
        console.error("Failed to end round, there is no ongoing round!")
    }
    
}

export function getRoundTime() {
    return world.getDynamicProperty("RoundTime")
}

export function setRoundTime(value) {
    world.setDynamicProperty("RoundTime", value)
}

export function isRoundStarted() {
    return world.getDynamicProperty("RoundStarted")
}

export function setRoundStarted(value) {
    world.setDynamicProperty("RoundStarted", value)
}

export function getPlayerCount() {
    let playerCount = 0
    world.getAllPlayers().forEach(() => playerCount++)
    return playerCount
}