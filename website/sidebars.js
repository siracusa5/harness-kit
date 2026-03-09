/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Plugins',
      items: [
        'plugins/overview',
        'plugins/research',
        'plugins/explain',
        'plugins/data-lineage',
        'plugins/orient',
        'plugins/stage',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/creating-plugins',
        'guides/conventions',
        'guides/contributing',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/plugins-vs-skills',
        'concepts/cross-harness-portability',
      ],
    },
  ],
};

module.exports = sidebars;
