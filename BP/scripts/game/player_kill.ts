import { world, MinecraftEffectTypes, EntityHealthComponent } from '@minecraft/server'
import * as Round from '../misc/properties.js'

world.events.entityHurt.subscribe(event => {
    const victim = event.hurtEntity
    const victimHealth = victim.getComponent('minecraft:health') as EntityHealthComponent
    const attacker = event.damageSource.damagingEntity

    // Assure it's PVP
    if (victim.typeId != 'minecraft:player') return
    if (attacker.typeId != 'minecraft:player') return

    
    
    // Rewards on kill
    if (victimHealth.current <= 0 && Round.isRoundStarted()) {
        attacker.addEffect(MinecraftEffectTypes.regeneration, 100, 1, true)
        attacker.runCommandAsync('scoreboard players add @s kills 1')
    }
})


