import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const features = [
  {
    title: 'Plugin Distribution',
    description:
      'Install once from the marketplace, carry across projects. No manual setup, no copy-pasting prompt files.',
  },
  {
    title: 'Battle-Tested Workflows',
    description:
      'Each plugin encodes a proven workflow — research pipelines, code explanation, data lineage tracing — not just a prompt.',
  },
  {
    title: 'Extensible by Design',
    description:
      'Plugins can bundle skills, scripts, hooks, and agents. Start simple, grow without restructuring.',
  },
];

const plugins = [
  {
    name: 'research',
    description: 'Process any source into a structured, compounding knowledge base.',
    to: '/docs/plugins/research',
  },
  {
    name: 'explain',
    description: 'Layered explanations of files, functions, directories, or concepts.',
    to: '/docs/plugins/explain',
  },
  {
    name: 'data-lineage',
    description: 'Column-level lineage tracing through SQL, Kafka, Spark, and JDBC.',
    to: '/docs/plugins/data-lineage',
  },
  {
    name: 'orient',
    description: 'Topic-focused session orientation across graph, knowledge, and research.',
    to: '/docs/plugins/orient',
  },
  {
    name: 'stage',
    description: 'Capture session information into a staging file for later reflection.',
    to: '/docs/plugins/stage',
  },
];

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero">
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="hero-install">
          <code>/plugin marketplace add siracusa5/harness-kit</code>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link className="button button--primary button--lg" to="/docs/getting-started/installation">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/plugins/overview">
            Browse Plugins
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className="container">
      <div className="features">
        {features.map((f, idx) => (
          <div key={idx} className="feature">
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PluginShowcase() {
  return (
    <section className="container" style={{ paddingBottom: '3rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>5 Plugins</h2>
      <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '1.5rem' }}>
        Ready to install. Zero configuration.
      </p>
      <div className="plugin-grid">
        {plugins.map((p) => (
          <Link key={p.name} to={p.to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="plugin-card">
              <h4><code>{p.name}</code></h4>
              <p>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <Features />
        <PluginShowcase />
      </main>
    </Layout>
  );
}
