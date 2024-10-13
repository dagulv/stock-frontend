import { api } from '$lib/fetch';
import { menu } from '../menu.svelte.js';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, parent }) {
    menu.items = [
        {
            label: "Dashboard",
            href: "/dashboard"
        },
        {
            label: "Algorithms",
            href: "/algorithms"
        },
        {
            label: "Stocks",
            href: "/stocks"
        },
        {
            label: "Watchlist",
            href: "/watchlist"
        },
    ];

    const session = await parent();

    return {
        session,
    }
}