// SPDX-License-Identifier: Apache-2.0
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

type PubType = 'wos' | 'scopus' | 'chapter' | 'wp'

interface Pub {
  type: PubType
  year: number
  title: string
  authors: string
  journal: string
  doi?: string
}

const PUBS: Pub[] = [
  { type: 'wos', year: 2026, title: 'AI agents in service experience: towards autonomous and conscious agency', authors: 'Shaikh, M., Joseph, A., Zhao, H., Al Assadi, A., Bluemel, J. H., Diaz, D., & Zaki, M.', journal: 'Journal of Service Management, 1–24, 2026', doi: 'https://doi.org/10.1108/JOSM-04-2025-0187' },
  { type: 'wos', year: 2026, title: '"From retirement to entrepreneurship": profiles and challenges of older entrepreneurs. Do gender and social orientation matter?', authors: 'Espinoza-Benavides, J., Yañez-Valdés, C., Díaz, D., & Ribeiro-Soriano, D.', journal: 'International Entrepreneurship and Management Journal 22(2), 68, 2026', doi: 'https://doi.org/10.1007/s11365-026-01195-9' },
  { type: 'wos', year: 2026, title: 'Leveraging digital platforms for revitalisation of labour confederations: Insights from the Chilean context', authors: 'Bellido de Luna, D., Martinez-Troncoso, C., & Diaz, D.', journal: 'International Labour Review, Forthcoming 2026' },
  { type: 'wos', year: 2024, title: 'Exploring gender stereotypes in financial reporting: An aspect-level sentiment analysis using big data and deep learning', authors: 'Jeldes-Delgado, F., Ferreira, T. A., Diaz, D., & Ortiz, R.', journal: 'Heliyon 10(20), 2024', doi: 'https://doi.org/10.1016/j.heliyon.2024.e38915' },
  { type: 'wos', year: 2024, title: 'Does facial structure explain differences in student evaluations of teaching? The role of fWHR as a proxy for perceived dominance', authors: 'Paredes, V., Pino, F. J., & Díaz, D.', journal: 'Economics & Human Biology 54, 101381, 2024', doi: 'https://doi.org/10.1016/j.ehb.2024.101381' },
  { type: 'wos', year: 2024, title: 'Ensemble approach using k-partitioned isolation forests for the detection of stock market manipulation', authors: 'Núñez Delafuente, H., Astudillo, C. A., & Díaz, D.', journal: 'Mathematics 12(9), 1336, 2024', doi: 'https://doi.org/10.3390/math12091336' },
  { type: 'wos', year: 2021, title: 'Dissecting the ecosystems\' determinants of entrepreneurial re-entry after a business failure', authors: 'Espinoza-Benavides, J., Guerrero, M., & Díaz, D.', journal: 'European Business Review 33(6), 975–998, 2021', doi: 'https://doi.org/10.1108/EBR-09-2020-0222' },
  { type: 'wos', year: 2021, title: 'The role of pension knowledge in voluntary pension and banking savings in Chile', authors: 'Diaz, D., Ruiz, J. L., & Tapia, P.', journal: 'Academia Revista Latinoamericana de Administración 34(4), 545–560, 2021', doi: 'https://doi.org/10.1108/ARLA-12-2020-0264' },
  { type: 'wos', year: 2021, title: 'The strong need for extended research and replications in Latin American and emerging markets', authors: 'Olavarrieta, S., & Diaz, D.', journal: 'Journal of Business Research 127, 384–388, 2021', doi: 'https://doi.org/10.1016/j.jbusres.2021.01.021' },
  { type: 'scopus', year: 2021, title: 'Premio de Investigación SCHOT 2020: desarrollo y validación de un modelo multivariables de predicción de estadía hospitalaria en pacientes mayores de 65 años sometidos a artroplastia total de cadera', authors: 'Díaz-Ledezma, C., Díaz-Solís, D., Muñoz-Reyes, R., Torres Castro, J.', journal: 'Revista Chilena de Ortopedia y Traumatología 62(03), e180–e192, 2021', doi: 'https://doi.org/10.1055/s-0041-1740232' },
  { type: 'wos', year: 2020, title: 'The male warrior hypothesis: Testosterone-related cooperation and aggression in the context of intergroup conflict', authors: 'Muñoz-Reyes, J. A., Polo, P., Valenzuela, N., Pavez, P., Ramírez-Herrera, O., ..., Díaz, D., et al.', journal: 'Scientific Reports 10(1), 375, 2020', doi: 'https://doi.org/10.1038/s41598-019-57259-0' },
  { type: 'wos', year: 2020, title: 'Testing strategic pluralism: The roles of attractiveness and competitive abilities to understand conditionality in men\'s short-term reproductive strategies', authors: 'Figueroa, O., Muñoz-Reyes, J. A., Rodriguez-Sickert, C., Valenzuela, N., ..., Díaz, D., et al.', journal: 'PloS One 15(8), e0237315, 2020', doi: 'https://doi.org/10.1371/journal.pone.0237315' },
  { type: 'wos', year: 2019, title: 'The entrepreneurial profile after failure', authors: 'Espinoza-Benavides, J., & Díaz, D.', journal: 'International Journal of Entrepreneurial Behavior & Research 25(8), 1634–1651, 2019', doi: 'https://doi.org/10.1108/IJEBR-04-2018-0242' },
  { type: 'wos', year: 2018, title: 'Does facial structure predict academic performance?', authors: 'Kausel, E. E., Ventura, S., Díaz, D., & Vicencio, F.', journal: 'Personality and Individual Differences 129, 1–5, 2018', doi: 'https://doi.org/10.1016/j.paid.2018.02.041' },
  { type: 'scopus', year: 2018, title: 'A bibliometric analysis of venture capital research', authors: 'Cancino, C. A., Merigo, J. M., Torres, J. P., & Diaz, D.', journal: 'Journal of Economics, Finance and Administrative Science 23(45), 182–195, 2018', doi: 'https://doi.org/10.1108/JEFAS-01-2018-0016' },
  { type: 'wos', year: 2017, title: 'Exploring corporate social responsibility and financial performance through stakeholder theory in the tourism industries', authors: 'Theodoulidis, B., Diaz, D., Crotto, F., & Rancati, E.', journal: 'Tourism Management 62, 173–188, 2017', doi: 'https://doi.org/10.1016/j.tourman.2017.03.018' },
  { type: 'wos', year: 2017, title: 'Customer engagement in a big data world', authors: 'Kunz, W., Aksoy, L., Bart, Y., Heinonen, K., Kabadayi, S., ..., Sigala, M., et al.', journal: 'Journal of Services Marketing 31(2), 161–171, 2017', doi: 'https://doi.org/10.1108/JSM-10-2016-0352' },
  { type: 'wos', year: 2016, title: 'Modelling and forecasting interest rates during stages of the economic cycle: A knowledge-discovery approach', authors: 'Diaz, D., Theodoulidis, B., & Dupouy, C.', journal: 'Expert Systems with Applications 44, 245–264, 2016', doi: 'https://doi.org/10.1016/j.eswa.2015.09.010' },
  { type: 'wos', year: 2011, title: 'Analysis of stock market manipulations using knowledge discovery techniques applied to intraday trade prices', authors: 'Diaz, D., Theodoulidis, B., & Sampaio, P.', journal: 'Expert Systems with Applications 38(10), 12757–12771, 2011', doi: 'https://doi.org/10.1016/j.eswa.2011.04.066' },
  { type: 'wos', year: 2011, title: '"Stock-touting" through spam e-mails: a data mining case study', authors: 'Zaki, M., Theodoulidis, B., & Díaz Solís, D.', journal: 'Journal of Manufacturing Technology Management 22(6), 770–787, 2011', doi: 'https://doi.org/10.1108/17410381111149639' },
  { type: 'wos', year: 2008, title: 'Forecasting gold price changes: Rolling and recursive neural network models', authors: 'Parisi, A., Parisi, F., & Díaz, D.', journal: 'Journal of Multinational Financial Management 18(5), 477–487, 2008', doi: 'https://doi.org/10.1016/j.mulfin.2007.12.002' },
  { type: 'scopus', year: 2006, title: 'Modelos de algoritmos genéticos y redes neuronales en la predicción de índices bursátiles asiáticos', authors: 'Parisi, A., Parisi, F., & Díaz, D.', journal: 'Cuadernos de Economía 43(128), 251–284, 2006', doi: 'https://doi.org/10.4067/S0717-68212006000200002' },
  { type: 'chapter', year: 2025, title: 'How service experience can shape customer churn from a Service-Dominant Logic perspective', authors: 'Martínez, C., & Díaz, D.', journal: 'Handbook of Service Experience. Edward Elgar Publishing (Kristensson, Witell & Zaki, Eds.)', doi: 'https://www.elgaronline.com/abstract/book/9781035300198/book-part-9781035300198-33.xml' },
  { type: 'chapter', year: 2022, title: 'Customer experience measurement: Implications for customer loyalty', authors: 'Villarroel, F., Díaz, D., & Herhausen, D.', journal: 'Handbook of Research on Customer Loyalty. Edward Elgar Publishing', doi: 'https://www.elgaronline.com/edcollbook/book/9781800371637/9781800371637.xml' },
  { type: 'chapter', year: 2019, title: 'Ontology-Driven Framework for Stock Market Monitoring and Surveillance', authors: 'Zaki, M., Theodoulidis, B., & Diaz, D.', journal: 'Handbook of Global Financial Markets. World Scientific, ISBN: 978-981-3236-64-6', doi: 'https://doi.org/10.1142/9789813236653_0004' },
  { type: 'chapter', year: 2012, title: 'Innovation Perspectives of a Personal Financial Services Call Centre', authors: 'Theodoulidis, B., Strickland, S., & Diaz, D.', journal: 'Case Studies in Service Innovation. Springer, ISBN: 978-1-4614-1971-6', doi: 'https://link.springer.com/book/10.1007/978-1-4614-1972-3' },
  { type: 'wp', year: 2024, title: 'Can Large Language Models Predict Credit Risk? An Empirical Study on Consumer Loans in Chile', authors: 'Díaz, D., & Beas, D. (with CMF Chile)', journal: 'EURO 2025 Conference · Workshop in Management Science, Pucón 2025' },
  { type: 'wp', year: 2023, title: 'Modeling and Predicting the Yield Curve of the Chilean Bond Market Through Multi-Output LSTM', authors: 'Silvestre-Ponce, C., Diaz, D., & Astudillo, C.', journal: 'SSRN 4643746', doi: 'https://ssrn.com/abstract=4643746' },
]

const TYPE_LABELS: Record<PubType, string> = { wos: 'WoS', scopus: 'Scopus', chapter: '', wp: 'Working Paper' }

export default function Research() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<'all' | PubType>('all')
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

  const visible = filter === 'all' ? PUBS : PUBS.filter(p => p.type === filter)

  return (
    <section id="research" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('researchLabel')}</div>
        <h2 className="section-title">
          {t('researchTitleLine1')}<br />{t('researchTitleLine2')}
        </h2>
        <p className="section-subtitle">{t('researchSubtitle')}</p>
      </div>

      <div className="filter-bar fade-in">
        {(['all', 'wos', 'scopus', 'chapter', 'wp'] as const).map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? t('filterAll') : f === 'wos' ? t('filterWoS') : f === 'scopus' ? 'Scopus' : f === 'chapter' ? t('filterChapters') : t('filterWP')}
          </button>
        ))}
      </div>

      <div className="pub-list fade-in">
        {visible.map((pub, i) => (
          <div key={i} className="pub-item">
            <div className="pub-meta">
              <span className={`pub-type ${pub.type}`}>
                {pub.type === 'chapter' ? t('pubLabelChapter') : TYPE_LABELS[pub.type]}
              </span>
              <span className="pub-year">{pub.year}</span>
            </div>
            <div className="pub-title">{pub.title}</div>
            <div className="pub-authors">{pub.authors}</div>
            <div className="pub-journal">{pub.journal}</div>
            {pub.doi && (
              <a className="pub-doi" href={pub.doi} target="_blank" rel="noreferrer">
                {pub.doi.startsWith('https://doi.org') ? pub.doi : pub.doi.replace('https://', '')}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
