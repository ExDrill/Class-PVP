import { world } from '@minecraft/server'

export function getRoundTime() {
    return world.getDynamicProperty("RoundTime") as number
}

export function setRoundTime(value) {
    world.setDynamicProperty("RoundTime", value)
}

export function isRoundStarted() {
    return world.getDynamicProperty("RoundStarted") as boolean
}

export function setRoundStarted(value) {
    world.setDynamicProperty("RoundStarted", value)
}
