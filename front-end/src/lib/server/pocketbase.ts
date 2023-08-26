import pocketbase from 'pocketbase'
import { writable } from 'svelte/store'
import { env } from '$env/dynamic/private'

export const pb = new pocketbase(env.SECRET_POCKETBASE_URL)
export const currentUser = writable(pb.authStore.model)