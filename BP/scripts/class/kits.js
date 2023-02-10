import { KitBuilder, ArmorSlot } from './kit.js'

export const KNIGHT = new KitBuilder("knight")
.addItem("iron_sword", 0)
.addArmor("classpvp:knight_helmet", ArmorSlot.HELMET)
.addArmor("classpvp:knight_chestplate", ArmorSlot.CHESTPLATE)
.addArmor("classpvp:knight_leggings", ArmorSlot.LEGGINGS)
.addArmor("classpvp:knight_boots", ArmorSlot.BOOTS)
.build()

export const ARCHER = new KitBuilder("archer")
.addItem("bow", 0)
.build()

export const TANK = new KitBuilder("tank")
.addItem("iron_axe", 0)
.build()

export const GUNNER = new KitBuilder("gunner")
.build()

