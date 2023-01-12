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
    world.say("Round started")
    setRoundStarted(true)
    setRoundTime(200)
}

export function endRound() {
    world.say("Round ended")
    setRoundStarted(false)
    setRoundTime(0)
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