import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals, params}) => {
    const getBoard = async() => {
        try {
            const item = await locals.pb.collection('boards').getOne(params.boardId)
            return structuredClone(item)
        } catch (err:any) {
            throw error(err.status, err.message)
        }
    }
    
    return {
        currentBoard: await getBoard()
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    editBoardName: async({locals, request,params}) => {
        const formData = Object.fromEntries(await request.formData()) as {name: string}
        console.log(formData)

        try {
            await locals.pb.collection('boards').update(params.boardId, formData)
        } catch (err) {
            
        }
    }
};