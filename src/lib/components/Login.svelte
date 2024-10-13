<script>
	// @ts-nocheck

	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';
	import { api } from '$lib/fetch';

	/**
	 * @type {Array<string>}
	 */
	let errors = $state([]);

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zodClient(loginSchema),
		async onUpdate({ form }) {
			if (form.valid) {
				const resp = await api.post('auth', form.data);

				if (!resp) {
					errors.push('Invalid email or password');
				}
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<main class="flex h-full w-full items-center justify-center">
	<form method="post" use:enhance>
		<Card.Root class="w-full max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl" tag="h1">Sign up</Card.Title>
				<Card.Description>Enter your email below to login to your account.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				{#if errors.length}
					<ul>
						{#each errors as error}
							<li class="text-sm font-normal text-red-700">{error}</li>
						{/each}
					</ul>
				{/if}
				<Form.Field class="grid gap-2" {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} type="email" bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field class="grid gap-2" {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.password} />
					</Form.Control>
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<Form.Button class="w-full">Sign in</Form.Button>
			</Card.Footer>
		</Card.Root>
	</form>
</main>
