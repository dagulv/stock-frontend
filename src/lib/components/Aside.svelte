<script>
	/**
	 * @typedef {Object} MenuItem
	 * @property {string} href
	 * @property {string} label
	 */

	/**
	 * @type {{items: MenuItem[]}}
	 */
	const { items = [] } = $props();
	console.log(items);
</script>

<aside>
	<nav>
		<ul>
			{#each items as item}
				<li>
					<a href={item.href}>{item.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
