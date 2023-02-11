import { world, Player } from '@minecraft/server'

world.events.itemUse.subscribe(event => {
    const player = event.source as Player
    
    
    
})