<script>
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { _profileSchema } from './+page';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { api } from '$lib/fetch';

	const { data } = $props();

	const form = superForm(data.form, {
		SPA: true,
		validators: zodClient(_profileSchema),
		async onUpdate({ form }) {
			if (form.valid) {
				await api.put('users/me', $formData);
			}
		}
	});

	const { form: formData, enhance } = form;

	$effect(() => console.log($formData));
</script>

<div class="space-y-6 p-10">
	<div>
		<h1 class="text-lg font-medium">Profile</h1>
		<p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
	</div>
	<Separator />
	<form method="POST" class="space-y-8" use:enhance id="profile-form">
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input placeholder="Your name" {...attrs} bind:value={$formData.username} />
			</Form.Control>
			<Form.Description>
				This is your public display name. It can be your real name or a pseudonym.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="firstName">
			<Form.Control let:attrs>
				<Form.Label>First name</Form.Label>
				<Input placeholder="Your first name" {...attrs} bind:value={$formData.firstName} />
			</Form.Control>
			<Form.Description>
				This is your public display name. It can be your real name or a pseudonym.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="lastName">
			<Form.Control let:attrs>
				<Form.Label>Last name</Form.Label>
				<Input placeholder="Your last name" {...attrs} bind:value={$formData.lastName} />
			</Form.Control>
			<Form.Description>
				This is your public display name. It can be your real name or a pseudonym.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button>Update profile</Form.Button>
	</form>
</div>
