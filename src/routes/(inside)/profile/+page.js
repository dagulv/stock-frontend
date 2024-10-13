import { defaults, superForm, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { api } from '$lib/fetch';

export const _profileSchema = z.object({
	username: z.string().min(2),
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.string().email(),
})

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const profile = await api.use(fetch).get("users/me");

	const form = await superValidate(profile, zod(_profileSchema));
	return { form };
}