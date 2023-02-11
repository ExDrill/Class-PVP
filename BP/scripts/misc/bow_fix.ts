import { world, ItemStack, MinecraftItemTypes, EntityInventoryComponent, Player } from '@minecraft/server'

// Makes bows unbreakable
world.events.itemStopCharge.subscribe(event => {
    const player = event.source as Player
    const container = (player.getComponent("minecraft:inventory") as EntityInventoryComponent).container
    const item = container.getItem(player.selectedSlot)
    if (item == undefined || item.typeId != "minecraft:bow") return
    container.setItem(player.selectedSlot, new ItemStack(MinecraftItemTypes.bow, 1, 0))
})
