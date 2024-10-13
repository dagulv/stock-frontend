import { menu } from '../menu.svelte.js';
/** @type {import('./$types').LayoutLoad} */
export async function load({ parent }) {
    menu.items = [
        {
            label: "Profile",
            href: "/profile"
        }
    ];

    const session = await parent();

    return {
        session,
    };
}