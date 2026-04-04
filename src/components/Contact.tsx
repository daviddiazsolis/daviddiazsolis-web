// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
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
    <section id="contact" ref={sectionRef} style={{ background: 'var(--bg)' }}>
      <div className="contact-inner fade-in">
        <div className="section-header">
          <div className="section-label">{t('contactLabel')}</div>
          <h2 className="section-title">{t('contactTitle')}</h2>
        </div>
        <p className="contact-desc">{t('contactDesc')}</p>
        <div className="contact-links">
          <a className="contact-link-item" href="mailto:ddiaz@fen.uchile.cl">
            <span className="contact-link-icon">✉️</span>
            <div>
              <div className="contact-link-label">EMAIL</div>
              <div className="contact-link-value">ddiaz@fen.uchile.cl</div>
            </div>
          </a>
          <a className="contact-link-item" href="https://www.linkedin.com/in/david-diaz-s-phd-71430622/" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">💼</span>
            <div>
              <div className="contact-link-label">LINKEDIN</div>
              <div className="contact-link-value">david-diaz-s-phd</div>
            </div>
          </a>
          <a className="contact-link-item" href="https://scholar.google.com/citations?user=6m3sR_oAAAAJ" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">📖</span>
            <div>
              <div className="contact-link-label">GOOGLE SCHOLAR</div>
              <div className="contact-link-value">David Diaz · 1,700+ citations</div>
            </div>
          </a>
          <a className="contact-link-item" href="https://github.com/daviddiazsolis" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">💻</span>
            <div>
              <div className="contact-link-label">GITHUB</div>
              <div className="contact-link-value">github.com/daviddiazsolis</div>
            </div>
          </a>
          <a className="contact-link-item" href="https://orcid.org/0000-0001-7149-0535" target="_blank" rel="noreferrer">
            <span className="contact-link-icon">🆔</span>
            <div>
              <div className="contact-link-label">ORCID</div>
              <div className="contact-link-value">0000-0001-7149-0535</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
