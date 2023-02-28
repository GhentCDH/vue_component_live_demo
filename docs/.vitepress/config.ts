import { defineConfig } from "vitepress";

const { BASE: base = "/" } = process.env;

export default defineConfig({
  title: "vue_component_live_demo",
  description: "Message display component.",
  base,
  themeConfig: {
    nav: [
      {
        text: "Components",
        link: "/components/",
      },
    ],
    sidebar: {
      "/components/": [
        {
          text: "LiveDemo",
          link: "/components/live-demo.md",
        },
      ],
    },
    editLink: {
      pattern:
        "https://github.com/GhentCDH/vue_component_live-demo/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/GhentCDH/vue_component_live_demo",
      },
    ],
  },
});
