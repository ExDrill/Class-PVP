import { world, ItemStack, MinecraftItemTypes } from '@minecraft/server'

// Makes bows unbreakable
world.events.itemStopCharge.subscribe(event => {
    const container = event.source.getComponent("minecraft:inventory").container
    const item = container.getItem(event.source.selectedSlot)
    if (item == undefined) return
    
    if (item.typeId != "minecraft:bow") return
    container.setItem(event.source.selectedSlot, new ItemStack(MinecraftItemTypes.bow, 1, 0))
})
