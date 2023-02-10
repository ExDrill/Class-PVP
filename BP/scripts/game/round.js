import { world, system } from '@minecraft/server'
import * as Round from '../misc/properties.js'

/**
 * Decrements the gametime, while the game is ongoing.
 * Ends the match whenever the game is started and the gametime reaches 0.
 */
system.run(tick)

function tick() {
    if (Round.isRoundStarted() && Round.getRoundTime() > 0) {
        Round.setRoundTime(Round.getRoundTime() - 1)
    } 
    else if (Round.getRoundTime() == 0 && Round.isRoundStarted()) {
        endRound()
    }
    else {
        return
    }
}

export function startRound() {
    if (!Round.isRoundStarted()) {
        world.sendMessage("Round started")
        Round.setRoundStarted(true)
        Round.setRoundTime(6000)
    } else {
        console.error("Failed to start round, there is already an ongoing round!")
    }
}

export function endRound() {
    if (Round.isRoundStarted()) {
        world.sendMessage("Round ended")
        Round.setRoundStarted(false)
        Round.setRoundTime(0)
    } else {
        console.error("Failed to end round, there is no ongoing round!")
    }
    
}

export function getPlayerCount() {
    let playerCount = 0
    world.getAllPlayers().forEach(() => playerCount++)
    return playerCount
}