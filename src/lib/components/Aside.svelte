<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	/**
	 * @typedef {Object} MenuItem
	 * @property {string} href
	 * @property {string} label
	 */

	/**
	 * @typedef {Object} session
	 * @property {string} [id]
	 * @property {string} [firstName]
	 * @property {string} [lastName]
	 * @property {string} [email]
	 * @property {boolean} loggedIn
	 */

	/**
	 * @type {{items: MenuItem[], sessionData: session}}
	 */
	const { items = [], sessionData } = $props();
</script>

<aside>
	<nav>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				><Button>{sessionData.firstName + ' ' + sessionData.lastName}</Button></DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Profile</DropdownMenu.Item>
					<DropdownMenu.Item>Log out</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<ul>
			{#each items as item}
				<li>
					<a href={item.href}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
