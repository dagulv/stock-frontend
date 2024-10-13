import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			precompress: true
		})
	},
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
        const { code } = warning;
        if (code === "css-unused-selector")
            return;

        handler(warning);
    }
};

export default config;
