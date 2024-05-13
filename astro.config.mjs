import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://stevenmichael.almeroth.net/',
  integrations: [mdx(), sitemap(), tailwind(), icon()],
  markdown: {
    remarkPlugins: [ [remarkToc, { maxDepth: 3 } ] ],
  },
});
