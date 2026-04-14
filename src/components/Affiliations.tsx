// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface Affiliation {
  years: string
  titleKey: string
  org: string
  icon: string
  current: boolean
  highlight?: boolean
}

const AFFILIATIONS: Affiliation[] = [
  { years: '2019–', titleKey: 'affilCambridge', org: 'Cambridge Service Alliance · University of Cambridge', icon: '🔬', current: true, highlight: true },
  { years: '2017–', titleKey: 'affilObs', org: 'FEN Universidad de Chile', icon: '⭐', current: true },
  { years: '2013–', titleKey: 'affilRetail', org: 'Comité de Retail Financiero', icon: '📊', current: true },
  { years: '2021', titleKey: 'affilAmChamDist', org: 'AmCham Chile', icon: '🏛️', current: false },
  { years: '2017', titleKey: 'affilThessaloniki', org: 'Aristotle University of Thessaloniki · Data Engineering Lab', icon: '🌐', current: false },
  { years: '2016', titleKey: 'affilManchester', org: 'University of Manchester · Manchester Business School', icon: '🎓', current: false },
]

export default function Affiliations() {
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
    <section id="affiliations" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('affilLabel')}</div>
        <h2 className="section-title">
          {t('affilTitleLine1')}<br />{t('affilTitleLine2')}
        </h2>
      </div>

      <div className="fade-in">
        <div className="dist-grid">
          {AFFILIATIONS.map(af => (
            <div
              key={af.titleKey}
              className="dist-item"
              style={af.highlight ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 1px var(--accent)' } : undefined}
            >
              <span className="dist-icon">{af.icon}</span>
              <div style={{ flex: 1 }}>
                <div className="dist-title">{t(af.titleKey)}</div>
                <div className="dist-detail">{af.org}</div>
              </div>
              <div className="role-meta">
                <span className="role-years">{af.years}</span>
                {af.current && <span className="role-current">{t('distCurrent')}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
