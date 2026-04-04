// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface ToolItem {
  href: string
  icon: string
  nameKey: string
  descKey: string
  tags: string[]
  accentTag?: boolean
}

const TOOLS: ToolItem[] = [
  { href: 'https://kernel-neural-playground.vercel.app', icon: '🧠', nameKey: 'toolKernelName', descKey: 'toolKernelDesc', tags: ['TypeScript', 'Vercel'], accentTag: true },
  { href: 'https://tree-ensemble-playground.vercel.app', icon: '🌲', nameKey: 'toolTreeName', descKey: 'toolTreeDesc', tags: ['TypeScript', 'Vercel'], accentTag: true },
  { href: 'https://linear-models-playground.vercel.app', icon: '📈', nameKey: 'toolLinearName', descKey: 'toolLinearDesc', tags: ['TypeScript', 'Vercel'], accentTag: true },
  { href: 'https://evaluation-playground-psi.vercel.app', icon: '📊', nameKey: 'toolEvalName', descKey: 'toolEvalDesc', tags: ['TypeScript', 'Vercel'], accentTag: true },
  { href: 'https://pca-playground.vercel.app', icon: '🔭', nameKey: 'toolPCAName', descKey: 'toolPCADesc', tags: ['TypeScript', 'Vercel'], accentTag: true },
  { href: 'https://autoencoder-embedding-playground.vercel.app', icon: '🔮', nameKey: 'toolAEName', descKey: 'toolAEDesc', tags: ['TypeScript', 'TensorFlow.js', 'Vercel ✓'] },
  { href: 'https://clustering-playground.vercel.app', icon: '🔵', nameKey: 'toolClusterName', descKey: 'toolClusterDesc', tags: ['TypeScript', 'React', 'Vercel'] },
  { href: 'https://association-rules-playground.vercel.app', icon: '🔗', nameKey: 'toolARName', descKey: 'toolARDesc', tags: ['TypeScript', 'React', 'Vercel'] },
  { href: 'https://github.com/daviddiazsolis/ml_landscape_crispdm', icon: '🗺️', nameKey: 'toolMLLandName', descKey: 'toolMLLandDesc', tags: ['TypeScript', 'React', 'Vercel'] },
  { href: 'https://github.com/daviddiazsolis/c50py', icon: '🌳', nameKey: 'toolC50Name', descKey: 'toolC50Desc', tags: ['Python', 'scikit-learn API', 'GNU GPL'] },
  { href: 'https://github.com/daviddiazsolis/Ayudantias-MIT-UCHILE', icon: '📚', nameKey: 'toolAyudName', descKey: 'toolAyudDesc', tags: ['Python', 'Jupyter', 'MIT/UChile'] },
]

export default function Tools() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.fade-in')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.05 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="tools" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('toolsLabel')}</div>
        <h2 className="section-title">
          {t('toolsTitleLine1')}<br />{t('toolsTitleLine2')}
        </h2>
        <p className="section-subtitle">{t('toolsSubtitle')}</p>
      </div>

      {/* Hub card destacado */}
      <div style={{ marginBottom: '1.5rem' }} className="fade-in">
        <a
          className="tool-card"
          href="https://ml-ai-portal.vercel.app"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'block', borderColor: 'var(--accent)', background: 'linear-gradient(135deg,rgba(192,132,252,0.07),var(--card-bg))' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🚀</span>
            <div>
              <div className="tool-name" style={{ margin: 0 }}>{t('toolHubName')}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.15rem' }}>
                ml-ai-portal.vercel.app
              </div>
            </div>
            <span style={{ marginLeft: 'auto', fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', color: '#fff', background: 'var(--accent)', padding: '0.2rem 0.7rem', borderRadius: '4px', fontWeight: 700, flexShrink: 0 }}>HUB</span>
          </div>
          <div className="tool-desc">{t('toolHubDesc')}</div>
          <div className="tool-stack">
            <span className="stack-tag">TypeScript</span>
            <span className="stack-tag">React</span>
            <span className="stack-tag">Vercel</span>
            <span className="stack-tag" style={{ color: 'var(--accent3)', background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.2)' }}>{t('tagNew')}</span>
          </div>
        </a>
      </div>

      <div className="tools-grid fade-in">
        {TOOLS.map(tool => (
          <a
            key={tool.href}
            className="tool-card"
            href={tool.href}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <span className="tool-icon">{tool.icon}</span>
            <div className="tool-name">{t(tool.nameKey)}</div>
            <div className="tool-desc">{t(tool.descKey)}</div>
            <div className="tool-stack">
              {tool.tags.map(tag => <span key={tag} className="stack-tag">{tag}</span>)}
              {tool.accentTag && (
                <span className="stack-tag" style={{ color: 'var(--accent3)', background: 'rgba(192,132,252,0.1)' }}>{t('tagNew')}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
