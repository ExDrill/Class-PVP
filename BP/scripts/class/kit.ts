import { Player } from '@minecraft/server'

class Kit {
    name: string
    items: ItemData[] = []

    constructor(name, items) {
        this.name = name
        this.items = items
        RegisteredKits.push(this)
    }

    getName(): string {
        return this.name
    }

    getItems(): ItemData[]  {
        return this.items
    }

    equip(player: Player): void {
        for (let equipment of this.getItems()) {
            player.runCommandAsync(`replaceitem entity @s ${equipment.slot} ${equipment.index} ${equipment.item} 1`)
        }
    }
}

export class KitBuilder {
    name: string
    items: ItemData[] = []

    constructor(name: string) {
        this.name = name
    }

    addItem(item: string, hotbarIndex: number): KitBuilder {
        this.items.push({
            item: item,
            slot: "slot.hotbar",
            index: hotbarIndex
        })
        return this
    }

    addArmor(item: string, armorSlot: ArmorSlot): KitBuilder {
        this.items.push({
            item: item,
            slot: armorSlot,
            index: 0
        })
        return this
    }

    build(): Kit {
        return new Kit(this.name, this.items);
    }
}

export type ItemData = {
    item: string,
    slot: string,
    index: number
}

export enum ArmorSlot {
    helmet = "slot.armor.head",
    chestplate = "slot.armor.chest",
    leggings = "slot.armor.legs",
    boots = "slot.armor.feet" 
}

export const RegisteredKits: Kit[] = [
    
]