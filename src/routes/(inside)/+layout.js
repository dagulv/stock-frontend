import { api } from '$lib/fetch';
import { menu } from './menu.svelte.js';

/**
 * @typedef {Object} session
 * @property {string} [id]
 * @property {string} [firstName]
 * @property {string} [lastName]
 * @property {string} [email]
 * @property {boolean} loggedIn
 */

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch }) {
    // auth

    /**
     * @type session
     */
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