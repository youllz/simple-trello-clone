import type { LayoutServerLoad } from './$types';
import { pb } from '$lib/server/pocketbase';


export const load = (async ({locals}) => {
    const getAllBoard = async () => {
        const boards = await locals.pb.collection('boards').getFullList()
        return structuredClone(boards)
    }
    
    
    return {
        allBoards: await getAllBoard()
    };
}) satisfies LayoutServerLoad;