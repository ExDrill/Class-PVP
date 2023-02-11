import * as RoundHandler from '../game/round.js'
import { world } from '@minecraft/server'
import * as SpawnpointHandler from '../game/spawnpoint.js'

import { RegisteredKits } from '../class/kit.js'

world.events.beforeChat.subscribe(event => {
    const msg = event.message
    const sender = event.sender
    const prefix = "!"

    function createDebugCommand(id: string, onSend: () => void) {
        if (msg.startsWith(prefix + id) && sender.isOp()) {
            onSend()
            event.cancel = true
            return true
        }
        return false
    }

    createDebugCommand("game start", () => RoundHandler.startRound())
    createDebugCommand("game end", () => RoundHandler.endRound())
    createDebugCommand("spawn set", () => SpawnpointHandler.setSpawnpoint(sender.location))
    createDebugCommand("spawn getall", () => SpawnpointHandler.printSpawnpoints())
    createDebugCommand("spawn clearall", () => SpawnpointHandler.clearSpawnpoints())

    createDebugCommand("class getall", () => {
        world.sendMessage("Registered Classes:")
        for (const kit of RegisteredKits) {
            world.sendMessage(kit.getName())
        }
    })
    createDebugCommand("class equip", () => {
        const selectedKit = msg.split(" ")[2]
        let kitNotFound = false

        if (selectedKit == null) {
            console.error("2nd parameter class_name missing!")
            return
        }
        for (const kit of RegisteredKits) {
            if (kit.getName() == selectedKit) {
                kit.equip(sender)
                break
            }
            kitNotFound = true
        }
        if (kitNotFound) console.error(`Could not find class ${selectedKit}!`)
    })
})





