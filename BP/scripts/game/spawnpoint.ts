import { world, Vector3 } from '@minecraft/server'

export function setSpawnpoint(location: Vector3) {
    const spawnpointsProperty = world.getDynamicProperty("Spawnpoints") as string

    const pos = blockPos(location)

    if (spawnpointsProperty === undefined) {
        const spawnpoints = []
        spawnpoints.push(pos)
        world.setDynamicProperty("Spawnpoints", JSON.stringify(spawnpoints))
        return
    }
    const spawnpoints = JSON.parse(spawnpointsProperty)
    spawnpoints.push(pos)
    world.setDynamicProperty("Spawnpoints", JSON.stringify(spawnpoints))
}

export function printSpawnpoints() {
    world.sendMessage(world.getDynamicProperty("Spawnpoints") as string)
}

export function clearSpawnpoints() {
    world.setDynamicProperty("Spawnpoints", "[]")
}

function blockPos(location: Vector3): {x: number, y: number, z:number} {
    return {x: Math.floor(location.x), y: Math.floor(location.y), z: Math.floor(location.z)}
}


