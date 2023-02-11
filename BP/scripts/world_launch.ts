import { world, DynamicPropertiesDefinition } from '@minecraft/server'

world.events.worldInitialize.subscribe(event => {
    event.propertyRegistry.registerWorldDynamicProperties(gameProperties())
    
    world.getDimension("overworld").runCommandAsync("gamerule pvp false")
    for (let scoreboard of world.scoreboard.getObjectives()) {
        world.scoreboard.removeObjective(scoreboard)
    }
    registerObjective("kills")
})

function gameProperties() {
    const propertyRegistry = new DynamicPropertiesDefinition()
    propertyRegistry.defineBoolean("RoundStarted")
    propertyRegistry.defineNumber("RoundTime")
    propertyRegistry.defineString("Spawnpoints", 3000)
    return propertyRegistry
}

function playerProperties() {
    const propertyRegistry = new DynamicPropertiesDefinition()
    propertyRegistry.defineBoolean("InGame")
    propertyRegistry.defineString("Class", 1000)
    return propertyRegistry
}

function registerObjective(id) {
    registerObjectiveWithDisplay(id, id)
}

function registerObjectiveWithDisplay(id, display) {
    if (world.scoreboard.getObjective(id) == undefined) {
        console.warn(`Registering scoreboard objective: ${id}`)
        world.scoreboard.addObjective(id, display)
    }
}