// SPDX-License-Identifier: Apache-2.0
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-badge">{t('heroBadge')}</div>

        <h1 className="hero-name">
          David<br /><em>Díaz</em> Solís
        </h1>

        <div className="hero-title">
          <strong>Ph.D. Business Intelligence</strong> · University of Manchester<br />
          <span>{t('heroTagline')}</span>
        </div>

        <p className="hero-desc">{t('heroDesc')}</p>

        <div className="hero-links">
          <a className="btn-primary" href="#research">{t('heroBtnResearch')}</a>
          <a className="btn-outline" href="#tools">{t('heroBtnTools')}</a>
          <a className="btn-outline" href="/cv-david-diaz-solis.pdf" target="_blank" rel="noreferrer">{t('heroBtnCV')}</a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">20<span>+</span></div>
            <div className="stat-label">{t('heroStatPapers')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">1.7<span>k+</span></div>
            <div className="stat-label">{t('heroStatCitations')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">20<span>+</span></div>
            <div className="stat-label">{t('heroStatYears')}</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src="/foto.png" alt="David Díaz Solís" onError={e => { e.currentTarget.replaceWith(Object.assign(document.createTextNode('DDS'))) }} />
            </div>
            <div className="profile-info">
              <h3>David Díaz Solís</h3>
              <p>@daviddiazsolis</p>
            </div>
          </div>
          <ul className="affil-list">
            <li className="affil-item"><span className="affil-dot" /><span>{t('heroAffilUChile')}</span></li>
            <li className="affil-item"><span className="affil-dot" /><span>{t('heroAffilMIT')}</span></li>
            <li className="affil-item"><span className="affil-dot" /><span>{t('heroAffilCambridge')}</span></li>
            <li className="affil-item"><span className="affil-dot" /><span>{t('heroAffilObs')}</span></li>
          </ul>
          <div className="hero-external-links">
            <a className="ext-link" href="https://scholar.google.com/citations?user=6m3sR_oAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a>
            <a className="ext-link" href="https://orcid.org/0000-0001-7149-0535" target="_blank" rel="noreferrer">ORCID</a>
            <a className="ext-link" href="https://github.com/daviddiazsolis" target="_blank" rel="noreferrer">GitHub</a>
            <a className="ext-link" href="https://www.linkedin.com/in/david-diaz-s-phd-71430622/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="ext-link" href="https://cambridgeservicealliance.eng.cam.ac.uk/staff/dr-david-diaz" target="_blank" rel="noreferrer">Cambridge</a>
          </div>
        </div>
      </div>
    </section>
  )
}
