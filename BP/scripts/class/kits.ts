import { KitBuilder, ArmorSlot, RegisteredKits } from './kit.js'

export const KNIGHT = new KitBuilder("knight")
.addItem("iron_sword", 0)
.addArmor("classpvp:knight_helmet", ArmorSlot.helmet)
.addArmor("classpvp:knight_chestplate", ArmorSlot.chestplate)
.addArmor("classpvp:knight_leggings", ArmorSlot.leggings)
.addArmor("classpvp:knight_boots", ArmorSlot.boots)
.build()

export const ARCHER = new KitBuilder("archer")
.addItem("bow", 0)
.build()

export const TANK = new KitBuilder("tank")
.addItem("iron_axe", 0)
.build()

export const GUNNER = new KitBuilder("gunner")
.build()

export function getRegistry() {
    return RegisteredKits
}

