// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface Role {
  years: string
  titleKey: string
  org: string
  current: boolean
}

interface Course {
  code: string
  nameKey: string
  progKey: string
  badge: string
  level: 'postgrad' | 'undergrad'
}

const ROLES: Role[] = [
  { years: '2012–', titleKey: 'roleAssocProf', org: 'FEN Universidad de Chile', current: true },
  { years: '2022–', titleKey: 'roleCoDir', org: 'FEN/FCFM U. de Chile', current: true },
  { years: '2023–', titleKey: 'roleMBADir', org: 'FEN Universidad de Chile', current: true },
  { years: '2024–', titleKey: 'roleBAC', org: 'MIT Sloan · FEN U. de Chile', current: true },
  { years: '2018–2023', titleKey: 'roleDACDir', org: 'MIT Sloan · FCFM U. de Chile', current: false },
  { years: '2018–2023', titleKey: 'roleCouncilDept', org: 'FEN Universidad de Chile', current: false },
  { years: '2023–', titleKey: 'roleCouncilBoard', org: 'FEN Universidad de Chile', current: true },
]

const COURSES: Course[] = [
  { code: 'MBA · FEN', nameKey: 'courseGenAI', progKey: 'courseGenAIProg', badge: 'MBA', level: 'postgrad' },
  { code: 'MBA · FEN', nameKey: 'courseML', progKey: 'courseMLProg', badge: 'MBA', level: 'postgrad' },
  { code: 'MBAN · FEN/FCFM', nameKey: 'courseFundML', progKey: 'courseFundMLProg', badge: 'MSc', level: 'postgrad' },
  { code: 'MBA · FEN', nameKey: 'courseBIDM', progKey: 'courseBIDMProg', badge: 'MBA', level: 'postgrad' },
  { code: 'MBA · FEN', nameKey: 'courseDecModels', progKey: 'courseDecModelsProg', badge: 'MBA', level: 'postgrad' },
  { code: 'PhD · FEN', nameKey: 'courseSeminar', progKey: 'courseSeminarProg', badge: 'PhD', level: 'postgrad' },
  { code: 'PREGRADO · FEN', nameKey: 'courseBIUG', progKey: 'courseBIUGProg', badge: 'UG', level: 'undergrad' },
  { code: 'PREGRADO · FEN', nameKey: 'courseMIS', progKey: 'courseMISProg', badge: 'UG', level: 'undergrad' },
  { code: 'PREGRADO · FEN', nameKey: 'courseFixedIncome', progKey: 'courseFixedIncomeProg', badge: 'UG', level: 'undergrad' },
]

const BADGE_CLASS: Record<string, string> = {
  MBA: 'level-mba',
  MSc: 'level-phd',
  PhD: 'level-phd',
  UG: 'level-ug',
}

export default function Teaching() {
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

  const pgCourses = COURSES.filter(c => c.level === 'postgrad')
  const ugCourses = COURSES.filter(c => c.level === 'undergrad')

  return (
    <section id="teaching" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('teachingLabel')}</div>
        <h2 className="section-title">
          {t('teachingTitleLine1')}<br />{t('teachingTitleLine2')}
        </h2>
      </div>

      <div className="teaching-subsection fade-in">
        <div className="subsection-heading">{t('teachingRolesLabel')}</div>
        <div className="role-list">
          {ROLES.map(role => (
            <div key={role.titleKey} className="role-item">
              <div>
                <div className="role-title">{t(role.titleKey)}</div>
                <div className="role-org">{role.org}</div>
              </div>
              <div className="role-meta">
                <span className="role-years">{role.years}</span>
                {role.current && <span className="role-current">{t('teachingCurrent')}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="teaching-subsection fade-in">
        <div className="subsection-heading">{t('teachingCoursesLabel')}</div>

        <div className="course-group-label">{t('teachingPostgrad')}</div>
        <div className="courses-grid" style={{ marginBottom: '2rem' }}>
          {pgCourses.map(c => (
            <div key={c.nameKey} className="course-card">
              <div className="course-num">{c.code}</div>
              <div className="course-name">{t(c.nameKey)}</div>
              <div className="course-prog">{t(c.progKey)}</div>
              <span className={`course-level ${BADGE_CLASS[c.badge]}`}>{c.badge}</span>
            </div>
          ))}
        </div>

        <div className="course-group-label">{t('teachingUndergrad')}</div>
        <div className="courses-grid">
          {ugCourses.map(c => (
            <div key={c.nameKey} className="course-card">
              <div className="course-num">{c.code}</div>
              <div className="course-name">{t(c.nameKey)}</div>
              <div className="course-prog">{t(c.progKey)}</div>
              <span className={`course-level ${BADGE_CLASS[c.badge]}`}>{t('levelUG')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
