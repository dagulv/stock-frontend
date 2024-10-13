import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 3000,
		strictPort: true
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/components')
		}
	},
	css: {
		preprocessorOptions: {
			sourceMap: true,
			preserve: ['ld+json']
		}
	}
});