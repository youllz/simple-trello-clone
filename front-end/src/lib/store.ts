import { writable } from "svelte/store";

export const sidebar = writable<boolean>(true)
export const changeBoardName = writable<boolean>(false)

export const wallpaperSt = writable('')