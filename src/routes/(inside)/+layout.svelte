<script>
	import Aside from '$lib/components/Aside.svelte';
	import Login from '$lib/components/Login.svelte';
	import * as Resizable from '$lib/components/ui/resizable';

	const { data, children } = $props();
</script>

{#if data.session.loggedIn}
	<Resizable.PaneGroup direction="horizontal">
		<Resizable.Pane defaultSize={13} maxSize={15} minSize={10} class="px-3 py-2">
			<Aside items={data.menu.items} sessionData={data.session} />
		</Resizable.Pane>
		<Resizable.Handle class="my-4 -mr-2 translate-x-full bg-slate-700" />
		<Resizable.Pane class="p-2">
			<main class="h-full w-full overflow-y-scroll rounded-sm border border-slate-700">
				{@render children()}
			</main>
		</Resizable.Pane>
	</Resizable.PaneGroup>
{:else}
	<Login />
{/if}
