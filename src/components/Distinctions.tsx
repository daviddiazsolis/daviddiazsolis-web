// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Distinctions() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.fade-in')
    if (!els) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
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
      <div className="dist-grid fade-in">
        <div className="dist-item">
          <span className="dist-icon">🏛️</span>
          <div>
            <div className="dist-title">{t('distAmChamTitle')}</div>
            <div className="dist-detail">AmCham Chile · 2021–</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">🔬</span>
          <div>
            <div className="dist-title">Research Collaborator</div>
            <div className="dist-detail">Cambridge Service Alliance · University of Cambridge</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">🎓</span>
          <div>
            <div className="dist-title">Honorary Research Fellow</div>
            <div className="dist-detail">University of Manchester · Manchester Business School</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">🌐</span>
          <div>
            <div className="dist-title">{t('distAdvisorTitle')}</div>
            <div className="dist-detail">BID · HSBC · World Bank</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">🏆</span>
          <div>
            <div className="dist-title">{t('distTeachingTitle')}</div>
            <div className="dist-detail">FEN Universidad de Chile</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">📖</span>
          <div>
            <div className="dist-title">{t('distVisitingTitle')}</div>
            <div className="dist-detail">Aristotle University of Thessaloniki · Data Engineering Lab</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">🤝</span>
          <div>
            <div className="dist-title">{t('distCoDirectorTitle')}</div>
            <div className="dist-detail">{t('distCoDirectorDetail')}</div>
          </div>
        </div>
        <div className="dist-item">
          <span className="dist-icon">⭐</span>
          <div>
            <div className="dist-title">{t('distObsTitle')}</div>
            <div className="dist-detail">{t('distObsDetail')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
