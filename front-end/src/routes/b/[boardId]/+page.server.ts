import type { PageServerLoad } from './$types';
import { pb } from '$lib/server/pocketbase';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;