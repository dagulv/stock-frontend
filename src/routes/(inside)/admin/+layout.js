import { api } from '$lib/fetch';
import { menu } from '../menu.svelte.js';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, parent }) {
    menu.items = [
        {
            label: "Users",
            href: "/admin/users"
        },
        {
            label: "Profile",
            href: "/profile"
        }
    ];

    const session = await parent();

    return {
        session,
    }
}