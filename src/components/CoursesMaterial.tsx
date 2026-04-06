// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface Resource {
  icon: string
  name: string
  tag: string
  href: string
}

const FILES: Resource[] = [
  { icon: '📑', name: 'LLMs_Text_Analytics_Intro_EVIC_2025.pptx', tag: 'Slides', href: '/evic/LLMs_Text_Analytics_Intro_EVIC_2025.pptx' },
  { icon: '📊', name: 'reviews_sample.xlsx', tag: 'Dataset', href: '/evic/reviews_sample.xlsx' },
  { icon: '🐍', name: 'codigos_py.zip', tag: 'Python', href: '/evic/codigos_py.zip' },
]

const NOTEBOOKS: Resource[] = [
  { icon: '🔬', name: 'Análisis de reclamos sin taxonomía (Ollama)', tag: 'Colab', href: 'https://colab.research.google.com/drive/10gupsBekNwUKU2lgiVN5TGGtcGjRlRID?usp=sharing' },
  { icon: '🏷️', name: 'Análisis de reclamos con taxonomía (Ollama)', tag: 'Colab', href: 'https://colab.research.google.com/drive/1_TMReHer6n4oITZ-rUVKWgbpfFwKN0uq?usp=sharing' },
]

const LINKS: Resource[] = [
  { icon: '⚔️', name: 'LM Arena', tag: 'Tool', href: 'https://lmarena.ai/' },
  { icon: '🗺️', name: 'Prompting Techniques Examples', tag: 'Miro', href: 'https://miro.com/app/board/uXjVN3c3BZQ=/' },
]

function ResourceGroup({ title, items }: { title: string; items: Resource[] }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="evic-group-label">{title}</div>
      <div className="evic-grid">
        {items.map(r => (
          <a key={r.href} className="evic-card" href={r.href} target="_blank" rel="noreferrer">
            <span className="evic-icon">{r.icon}</span>
            <div className="evic-card-body">
              <div className="evic-card-name">{r.name}</div>
              <span className="evic-tag">{r.tag}</span>
            </div>
            <span className="evic-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function CoursesMaterial() {
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
    <section id="material" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('materialLabel')}</div>
        <h2 className="section-title">{t('materialTitle')}</h2>
        <p className="section-subtitle">{t('materialSubtitle')}</p>
      </div>

      <div className="fade-in">
        <div className="evic-header">
          <span className="evic-badge">EVIC 2025</span>
          <h3 className="evic-title">{t('evicTitle')}</h3>
          <p className="evic-desc">{t('evicDesc')}</p>
        </div>

        <ResourceGroup title={t('evicGroupFiles')} items={FILES} />
        <ResourceGroup title={t('evicGroupNotebooks')} items={NOTEBOOKS} />
        <ResourceGroup title={t('evicGroupLinks')} items={LINKS} />
      </div>
    </section>
  )
}
