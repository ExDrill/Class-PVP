import { world } from '@minecraft/server'

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
