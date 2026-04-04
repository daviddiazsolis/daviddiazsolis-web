// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Media() {
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
    <section id="media" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('mediaLabel')}</div>
        <h2 className="section-title">
          {t('mediaTitleLine1')}<br />{t('mediaTitleLine2')}
        </h2>
        <p className="section-subtitle">{t('mediaSubtitle')}</p>
      </div>
      <div className="tools-grid fade-in">
        <a
          className="tool-card"
          href="https://www.youtube.com/watch?v=tbAyjjO0b34"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <span className="tool-icon">📻</span>
          <div className="tool-name">{t('mediaRadioName')}</div>
          <div className="tool-desc">{t('mediaRadioDesc')}</div>
          <div className="tool-stack">
            <span className="stack-tag">Radio · Sept 2025</span>
            <span className="stack-tag">YouTube · FEN UChile</span>
          </div>
        </a>

        <div className="tool-card" style={{ opacity: 0.6, cursor: 'default' }}>
          <span className="tool-icon">🎙️</span>
          <div className="tool-name">{t('mediaComingSoonName')}</div>
          <div className="tool-desc">{t('mediaComingSoonDesc')}</div>
          <div className="tool-stack">
            <span className="stack-tag">Por confirmar</span>
          </div>
        </div>

        <a
          className="tool-card"
          href="https://alumni.fen.uchile.cl/noticia/academico-y-alumni-fen-david-diaz-solis-la-inteligencia-artificial-no-reemplaza-tu-trabajo-reemplaza-tareas-dentro-de-el"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <span className="tool-icon">📰</span>
          <div className="tool-name">{t('mediaAlumniName')}</div>
          <div className="tool-desc">{t('mediaAlumniDesc')}</div>
          <div className="tool-stack">
            <span className="stack-tag">Prensa · Sept 2025</span>
            <span className="stack-tag">alumni.fen.uchile.cl</span>
          </div>
        </a>

        <a
          className="tool-card"
          href="https://fen.uchile.cl/es/academicos/david-diaz-2/"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <span className="tool-icon">📝</span>
          <div className="tool-name">{t('mediaRevisteName')}</div>
          <div className="tool-desc">{t('mediaRevistaDesc')}</div>
          <div className="tool-stack">
            <span className="stack-tag">Columna · 2025</span>
            <span className="stack-tag">FEN UChile</span>
          </div>
        </a>
      </div>
    </section>
  )
}
