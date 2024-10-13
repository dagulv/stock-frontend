import { api } from '$lib/fetch';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const stocks = await api.use(fetch).get("stocks");

	return { stocks };
}