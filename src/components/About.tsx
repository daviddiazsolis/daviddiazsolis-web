// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
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
    <section id="about" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('aboutLabel')}</div>
        <h2 className="section-title">
          {t('aboutTitleLine1')}<br />{t('aboutTitleLine2')}
        </h2>
      </div>
      <div className="about-grid">
        <div className="about-text fade-in">
          <p dangerouslySetInnerHTML={{ __html: t('aboutP1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('aboutP2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('aboutP3') }} />
          <div className="tags-cloud">
            {['Generative AI','Credit Scoring','NLP / Deep Learning','Service Analytics',
              'Causal Inference','XAI','Financial ML','Customer Experience','LLMs'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="credentials-list fade-in">
          <div className="cred-item">
            <div className="cred-degree">Ph.D. Business Intelligence <span className="cred-year">2007–2011</span></div>
            <div className="cred-school">University of Manchester · Alliance Manchester Business School</div>
          </div>
          <div className="cred-item">
            <div className="cred-degree">{t('credMasterFinance')} <span className="cred-year">2004–2005</span></div>
            <div className="cred-school">Universidad de Chile · Santiago</div>
          </div>
          <div className="cred-item">
            <div className="cred-degree">{t('credDiplomado')} <span className="cred-year">2018</span></div>
            <div className="cred-school">Pontificia Universidad Católica de Chile</div>
          </div>
          <div className="cred-item">
            <div className="cred-degree">{t('credBusinessEng')} <span className="cred-year">2000–2002</span></div>
            <div className="cred-school">Universidad de Chile · Santiago</div>
          </div>
          <div className="cred-item">
            <div className="cred-degree">{t('credLicenciado')} <span className="cred-year">1998–1999</span></div>
            <div className="cred-school">Universidad de Chile · Santiago</div>
          </div>
        </div>
      </div>
    </section>
  )
}
