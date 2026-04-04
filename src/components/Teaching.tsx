// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Teaching() {
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
    <section id="teaching" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('teachingLabel')}</div>
        <h2 className="section-title">
          {t('teachingTitleLine1')}<br />{t('teachingTitleLine2')}
        </h2>
      </div>
      <div className="courses-grid fade-in">
        <div className="course-card">
          <div className="course-num">MBA · FEN</div>
          <div className="course-name">{t('courseBI')}</div>
          <div className="course-prog">{t('courseBIProg')}</div>
          <span className="course-level level-mba">MBA</span>
        </div>
        <div className="course-card">
          <div className="course-num">MAN · MIT/UCHILE</div>
          <div className="course-name">{t('courseDAC')}</div>
          <div className="course-prog">{t('courseDACProg')}</div>
          <span className="course-level level-exec">Executive</span>
        </div>
        <div className="course-card">
          <div className="course-num">MBAN · FEN/FCFM</div>
          <div className="course-name">{t('courseMBAN')}</div>
          <div className="course-prog">{t('courseMBANProg')}</div>
          <span className="course-level level-phd">MSc</span>
        </div>
        <div className="course-card">
          <div className="course-num">PhD · FEN</div>
          <div className="course-name">{t('courseSeminar')}</div>
          <div className="course-prog">{t('courseSeminarProg')}</div>
          <span className="course-level level-phd">PhD</span>
        </div>
        <div className="course-card">
          <div className="course-num">MBA · FEN</div>
          <div className="course-name">{t('courseML')}</div>
          <div className="course-prog">{t('courseMLProg')}</div>
          <span className="course-level level-mba">MBA</span>
        </div>
        <div className="course-card">
          <div className="course-num">PREGRADO · FEN</div>
          <div className="course-name">{t('courseBIUG')}</div>
          <div className="course-prog">{t('courseBIUGProg')}</div>
          <span className="course-level level-ug">{t('levelUG')}</span>
        </div>
      </div>
    </section>
  )
}
