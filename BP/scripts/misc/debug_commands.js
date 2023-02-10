import * as RoundHandler from '../game/round.js'
import { world } from '@minecraft/server'

import * as Kits from '../class/kits.js'
import { RegisteredKits } from '../class/kit.js'

// should probably revamp debug commands
world.events.beforeChat.subscribe(event => {
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
            event.cancel = true
        } else
        if (msg == "end") {
            RoundHandler.endRound()
            event.cancel = true
        } else
        if (msg == "class") {
            world.sendMessage("Registered Classes:")
            RegisteredKits.forEach(kit => {
                world.sendMessage(kit.getName())
            })
            event.cancel = true
        } else
        if (msg.startsWith("equip")) {
            const selectedKit = msg.split(" ")[1]
            let kitNotFound = false

            if (selectedKit == null) {
                console.error("2nd parameter class_name missing!")
                return
            }
            for (let kit of RegisteredKits) {
                if (kit.getName() == selectedKit) {
                    kit.equip(sender)
                    break
                }
                kitNotFound = true
            }
            if (kitNotFound) console.error(`Could not find class ${selectedKit}!`)
            event.cancel = true
        }
        
    }
})



