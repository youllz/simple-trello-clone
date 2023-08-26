import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    createBoard: async({locals, request}) => {
        const formData = Object.fromEntries(await request.formData()) as {name:string, wallpaper:string}
        console.log(formData)

        try {
            await locals.pb.collection('boards').create(formData)
        } catch (err) {
            console.log('Error: ', err)
        }
    }
};