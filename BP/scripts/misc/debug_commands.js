import * as RoundHandler from '../game/round.js'
import { world } from '@minecraft/server'

world.events.beforeChat.subscribe(event => {
    const msg = event.message
    const sender = event.sender

    if (sender.hasTag("debug")) {
        if (msg == "start") {
            RoundHandler.startRound()
        } else
        if (msg == "end") {
            RoundHandler.endRound()
        }
    }
})



