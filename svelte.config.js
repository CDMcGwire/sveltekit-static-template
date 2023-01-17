import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeAddClasses from 'rehype-add-classes'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		sveltePreprocess({
			sourceMap: true,
			babel: {
				presets: [
					[
						'@babel/preset-env',
						{
							loose: true,
							modules: false,
							targets: {
								esmodules: true
							}
						}
					]
				]
			},
			sass: {
				prependData: `@use 'src/lib/styles/_design.sass'`,
				outputStyle: 'compressed'
			}
		}),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [
				[
					rehypeAddClasses,
					{
						'h1,h2,h3,pre,blockquote,p,ul,li,ol,strong,em,hr': 'markdown'
					}
				],
				rehypeSlug,
				rehypeAutolinkHeadings
			]
		})
	],
	kit: {
		adapter: adapter(),
		appDir: 'internal'
	}
}

export default config
