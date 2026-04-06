// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface Award {
  year: string
  titleKey: string
  org: string
  icon: string
}

interface Affiliation {
  years: string
  titleKey: string
  org: string
  icon: string
  current: boolean
}

const AWARDS: Award[] = [
  { year: '2022', titleKey: 'award1000Citations', org: 'Google Scholar', icon: '📊' },
  { year: '2019–2022', titleKey: 'awardSSRNTop10', org: 'SSRN', icon: '📈' },
  { year: '2020', titleKey: 'awardSHOT', org: 'SHOT 2020', icon: '🏆' },
  { year: '2018', titleKey: 'awardEmerald', org: 'Emerald Publishing', icon: '🥇' },
  { year: '2017–2018', titleKey: 'awardISIWOS', org: 'Universidad de Chile · Aniversarios 175° y 176°', icon: '📜' },
  { year: '2016', titleKey: 'awardENEFA', org: 'ENEFA 2016', icon: '🏅' },
  { year: '2016', titleKey: 'awardCLADEA2016', org: 'CLADEA 2016', icon: '🏅' },
  { year: '2015', titleKey: 'awardTeachingExc', org: 'Depto. Administración, FEN U. de Chile', icon: '⭐' },
  { year: '2012', titleKey: 'awardCAISE', org: "CAiSE'12 · Gdansk, Poland", icon: '🏅' },
  { year: '2007–2011', titleKey: 'awardScholarship', org: 'Gobierno de Chile', icon: '🎓' },
  { year: '2005', titleKey: 'awardCLADEA2005', org: 'CLADEA 2005', icon: '🏅' },
]

const AFFILIATIONS: Affiliation[] = [
  { years: '2019–', titleKey: 'affilCambridge', org: 'Cambridge Service Alliance · University of Cambridge', icon: '🔬', current: true },
  { years: '2016', titleKey: 'affilManchester', org: 'University of Manchester · Manchester Business School', icon: '🎓', current: false },
  { years: '2017', titleKey: 'affilThessaloniki', org: 'Aristotle University of Thessaloniki · Data Engineering Lab', icon: '🌐', current: false },
  { years: '2021', titleKey: 'affilAmChamDist', org: 'AmCham Chile', icon: '🏛️', current: false },
  { years: '2017–', titleKey: 'affilObs', org: 'FEN Universidad de Chile', icon: '⭐', current: true },
  { years: '2013–', titleKey: 'affilRetail', org: 'Comité de Retail Financiero', icon: '📊', current: true },
]

export default function Distinctions() {
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
    <section id="distinctions" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('distLabel')}</div>
        <h2 className="section-title">
          {t('distTitleLine1')}<br />{t('distTitleLine2')}
        </h2>
      </div>

      <div className="teaching-subsection fade-in">
        <div className="subsection-heading">{t('distAwardsLabel')}</div>
        <div className="award-list">
          {AWARDS.map(a => (
            <div key={a.titleKey} className="award-item">
              <span className="award-icon">{a.icon}</span>
              <div>
                <div className="award-title">{t(a.titleKey)}</div>
                <div className="award-org">{a.org}</div>
              </div>
              <span className="award-year">{a.year}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="teaching-subsection fade-in">
        <div className="subsection-heading">{t('distAffiliationsLabel')}</div>
        <div className="dist-grid">
          {AFFILIATIONS.map(af => (
            <div key={af.titleKey} className="dist-item">
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
