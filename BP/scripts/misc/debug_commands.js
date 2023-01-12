import * as RoundHandler from '../game/round.js'
import { world } from '@minecraft/server'

world.events.chat.subscribe(event => {
    const msg = event.message
    const sender = event.sender

    if (sender.isOp() && msg == "toggleDebug") {
        if (!sender.hasTag("debug")) {
            sender.addTag("debug")
            world.say(`${sender.name} has enabled debug mode`)
        } else {
            sender.removeTag("debug")
            world.say(`${sender.name} has disabled debug mode`)
        }
    }

    if (sender.hasTag("debug")) {
        if (msg == "start") {
            RoundHandler.startRound()
        } else
        if (msg == "end") {
            RoundHandler.endRound()
        }
    }
})



