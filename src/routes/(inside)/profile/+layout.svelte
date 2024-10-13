<script>
	import Aside from '$lib/components/Aside.svelte';

	const { data, children } = $props();
</script>

{@render children()}
