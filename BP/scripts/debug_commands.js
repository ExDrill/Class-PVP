import * as RoundHandler from './game/round.js'
import { world } from '@minecraft/server'

world.events.chat.subscribe(event => {
    const msg = event.message
    const sender = event.sender
    const cmdPrefix = "!"
    const getCommand = (id) => {
        return msg.startsWith(`${cmdPrefix}${id}`)
    }

    if (sender.hasTag("debug")) {
        if (getCommand("start")) {
            RoundHandler.startRound()
        } else
        if (getCommand("end")) {
            RoundHandler.endRound()
        }
    }
})



