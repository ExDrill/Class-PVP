class Kit {
    name = ""
    items = []

    constructor(name, items) {
        this.name = name
        this.items = items
        RegisteredKits.push(this)
    }

    getName() {
        return this.name
    }

    getItems() {
        return this.items
    }

    equip(player) {
        for (let equipment of this.getItems()) {
            player.runCommandAsync(`replaceitem entity @s ${equipment.slot} ${equipment.index} ${equipment.item} 1`)
        }
    }
}

export class KitBuilder {
    name = ""
    items = []

    constructor(name = "") {
        this.name = name
    }

    addItem(item = "", hotbarIndex) {
        this.items.push({
            item: item,
            slot: "slot.hotbar",
            index: hotbarIndex
        })
        return this
    }

    addArmor(item, armorSlot) {
        this.items.push({
            item: item,
            slot: armorSlot,
            index: 0
        })
        return this
    }

    build() {
        return new Kit(this.name, this.items);
    }
}

export const ArmorSlot = Object.freeze({
    HELMET: "slot.armor.head",
    CHESTPLATE: "slot.armor.chest",
    LEGGINGS: "slot.armor.legs",
    BOOTS: "slot.armor.feet"
})

export const RegisteredKits = [
   
]