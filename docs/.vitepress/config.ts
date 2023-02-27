import { defineConfig } from "vitepress";

const { BASE: base = "/" } = process.env;

export default defineConfig({
  title: "vue_component_template",
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
          text: "Example",
          link: "/components/example.md",
        },
      ],
    },
    editLink: {
      pattern:
        "https://github.com/GhentCDH/vue_component_template/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/GhentCDH/vue_component_template",
      },
    ],
  },
});
