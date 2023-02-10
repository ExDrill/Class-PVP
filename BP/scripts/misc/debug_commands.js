import * as RoundHandler from '../game/round.js'
import { world } from '@minecraft/server'

import * as Kits from '../class/kits.js'
import { RegisteredKits } from '../class/kit.js'

world.events.chat.subscribe(event => {
    const msg = event.message
    const sender = event.sender

    if (sender.isOp() && msg == "toggleDebug") {
        if (!sender.hasTag("debug")) {
            sender.addTag("debug")
            world.sendMessage(`${sender.name} has enabled debug mode`)
        } else {
            sender.removeTag("debug")
            world.sendMessage(`${sender.name} has disabled debug mode`)
        }
    }

    if (sender.hasTag("debug")) {
        if (msg == "start") {
            RoundHandler.startRound()
        } else
        if (msg == "end") {
            RoundHandler.endRound()
        } else
        if (msg == "class") {
            world.sendMessage("Registered Classes:")
            RegisteredKits.forEach(kit => {
                world.sendMessage(kit.getName())
            })
        } else
        if (msg == "equip") {
            
        }
    }
})



