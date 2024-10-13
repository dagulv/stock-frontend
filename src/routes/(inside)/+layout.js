import { api } from '$lib/fetch';
import { menu } from './menu.svelte.js';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
    // auth

    let session = await api.use(fetch).get("auth");

    if (!session?.id) {
        session = {
            loggedIn: false
        };
    } else {
        session.loggedIn = true;
    }

    return {
        session,
        menu,
    }
}