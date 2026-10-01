// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface Resource {
  icon: string
  name: string
  tag: string
  href: string
}

const FILES: Resource[] = [
  { icon: '📑', name: 'LLMs_Text_Analytics_Intro_EVIC_2025.pptx', tag: 'Slides', href: '/evic/LLMs_Text_Analytics_Intro_EVIC_2025.pptx' },
  { icon: '📊', name: 'reviews_sample.xlsx', tag: 'Dataset', href: '/evic/reviews_sample.xlsx' },
  { icon: '🐍', name: 'codigos_py.zip', tag: 'Python', href: '/evic/codigos_py.zip' },
]

const NOTEBOOKS: Resource[] = [
  { icon: '🔬', name: 'Análisis de reclamos sin taxonomía (Ollama)', tag: 'Colab', href: 'https://colab.research.google.com/drive/10gupsBekNwUKU2lgiVN5TGGtcGjRlRID?usp=sharing' },
  { icon: '🏷️', name: 'Análisis de reclamos con taxonomía (Ollama)', tag: 'Colab', href: 'https://colab.research.google.com/drive/1_TMReHer6n4oITZ-rUVKWgbpfFwKN0uq?usp=sharing' },
]

// Machine Learning para las Finanzas (MF WKD) y Machine Learning (MAN): micrositios, notebooks en dos idiomas y Excel.
const GH = 'https://github.com/daviddiazsolis'
const colab = (repo: string, file: string) => `https://colab.research.google.com/github/daviddiazsolis/${repo}/blob/main/notebooks/${file}`
const nbPair = (repo: string, base: string, lang: 'en' | 'es') => colab(repo, lang === 'en' ? base.replace('.ipynb', '_EN.ipynb') : base)

const ML_SITES: Resource[] = [
  { icon: '📉', name: 'Supervised Intro: Regression', tag: 'Micrositio', href: 'https://regression-intro-playground.vercel.app' },
  { icon: '🎯', name: 'Supervised Intro: Classification', tag: 'Micrositio', href: 'https://classification-intro-playground.vercel.app' },
  { icon: '🧩', name: 'Clustering: aplicaciones financieras', tag: 'Micrositio', href: 'https://clustering-finance-playground.vercel.app' },
  { icon: '🛰️', name: 'Aplicaciones de reducción de dimensionalidad en finanzas (PCA, t-SNE, UMAP, autoencoders)', tag: 'Micrositio', href: 'https://dimred-finance-playground.vercel.app' },
  { icon: '🌱', name: 'Tree & Ensemble Foundations', tag: 'Micrositio', href: 'https://tree-foundations-playground.vercel.app' },
  { icon: '🧭', name: 'ML & AI Learning Hub (todos los micrositios)', tag: 'Portal', href: 'https://ml-ai-portal.vercel.app' },
]

const ML_NOTEBOOKS_BASE = [
  { icon: '1️⃣', name: '01 Cuándo le gana el ML a una regresión (ventas)', en: '01 When does ML beat a plain regression (sales)', repo: 'regression_intro_playground', file: '01_Cuando_gana_el_ML_Ventas.ipynb' },
  { icon: '2️⃣', name: '02 Cuando no gana: el retorno del dólar', en: '02 When it does not win: the dollar return', repo: 'regression_intro_playground', file: '02_Cuando_no_gana_Retornos.ipynb' },
  { icon: '3️⃣', name: '03 Predecir el riesgo: la volatilidad', en: '03 Predicting risk: volatility', repo: 'regression_intro_playground', file: '03_Prediciendo_el_Riesgo_Volatilidad.ipynb' },
  { icon: '🇨🇱', name: '03b Volatilidad con contexto chileno', en: '03b Volatility with Chilean context', repo: 'regression_intro_playground', file: '03b_Volatilidad_con_Contexto_Chileno.ipynb' },
  { icon: '4️⃣', name: '04 No linealidad con datos reales: casas de California', en: '04 Non-linearity with real data: California housing', repo: 'regression_intro_playground', file: '04_No_Linealidad_con_Datos_Reales_Casas.ipynb' },
  { icon: '📝', name: 'Tarea: publicidad y ventas', en: 'Assignment: advertising and sales', repo: 'regression_intro_playground', file: 'Tarea_Publicidad_y_Ventas.ipynb' },
  { icon: '5️⃣', name: '05 Riesgo de crédito con regresión logística', en: '05 Credit risk with logistic regression', repo: 'classification_intro_playground', file: '05_Riesgo_de_Credito_Regresion_Logistica.ipynb' },
  { icon: '6️⃣', name: '06 Taiwán: más allá de la logística', en: '06 Taiwan: beyond logistic regression', repo: 'classification_intro_playground', file: '06_Riesgo_de_Credito_Taiwan_Mas_Alla_de_la_Logistica.ipynb' },
  { icon: '7️⃣', name: '07 Calibración de probabilidades', en: '07 Probability calibration', repo: 'classification_intro_playground', file: '07_Calibracion_de_Probabilidades.ipynb' },
  { icon: '🧩', name: 'Clustering 1 Segmentación de clientes de un banco', en: 'Clustering 1 Segmenting a bank\'s customers', repo: 'clustering_finance_playground', file: 'Clustering_01_Segmentacion_de_Clientes.ipynb' },
  { icon: '🧩', name: 'Clustering 2 Pair trading sobre el S&P 500', en: 'Clustering 2 Pair trading on the S&P 500', repo: 'clustering_finance_playground', file: 'Clustering_02_Pair_Trading.ipynb' },
  { icon: '🧩', name: 'Clustering 3 Perfilamiento de inversionistas y sesgos', en: 'Clustering 3 Investor profiling and bias', repo: 'clustering_finance_playground', file: 'Clustering_03_Perfilamiento_de_Inversionistas.ipynb' },
  { icon: '🧩', name: 'Clustering 4 De Markowitz a Hierarchical Risk Parity', en: 'Clustering 4 From Markowitz to Hierarchical Risk Parity', repo: 'clustering_finance_playground', file: 'Clustering_04_Hierarchical_Risk_Parity.ipynb' },
  { icon: '8️⃣', name: '08 Detección de fraude con PCA', en: '08 Fraud detection with PCA', repo: 'dimred_finance_playground', file: '08_Fraude_con_PCA.ipynb' },
  { icon: '9️⃣', name: '09 PCA de la curva de tasas en UF', en: '09 PCA of the UF yield curve', repo: 'dimred_finance_playground', file: '09_PCA_Curva_de_Tasas.ipynb' },
  { icon: '🔟', name: '10 Detección de fraude con un autoencoder (Keras)', en: '10 Fraud detection with an autoencoder (Keras)', repo: 'dimred_finance_playground', file: '10_Fraude_con_Autoencoder.ipynb' },
  { icon: '🌳', name: 'Árboles 01 Entropía e información', en: 'Trees 01 Entropy and information', repo: 'tree_foundations_playground', file: 'Arboles_01_Entropia_e_Informacion.ipynb' },
  { icon: '🌳', name: 'Árboles 02 Árboles de decisión (ID3, CART)', en: 'Trees 02 Decision trees (ID3, CART)', repo: 'tree_foundations_playground', file: 'Arboles_02_Arboles_de_Decision.ipynb' },
  { icon: '🌳', name: 'Árboles 03 Sobreajuste y poda', en: 'Trees 03 Overfitting and pruning', repo: 'tree_foundations_playground', file: 'Arboles_03_Sobreajuste_y_Poda.ipynb' },
  { icon: '🌲', name: 'Árboles 04 Ensambles: bagging, random forest, boosting', en: 'Trees 04 Ensembles: bagging, random forest, boosting', repo: 'tree_foundations_playground', file: 'Arboles_04_Ensambles.ipynb' },
  { icon: '🌲', name: 'Árboles 05 Importancia de variables', en: 'Trees 05 Variable importance', repo: 'tree_foundations_playground', file: 'Arboles_05_Importancia_de_Variables.ipynb' },
  { icon: '🌲', name: 'Árboles 06 C5.0 (bonus)', en: 'Trees 06 C5.0 (bonus)', repo: 'tree_foundations_playground', file: 'Arboles_06_C50_bonus.ipynb' },
  { icon: '📝', name: 'Tarea: árboles y ensambles', en: 'Assignment: trees and ensembles', repo: 'tree_foundations_playground', file: 'Tarea_Arboles_y_Ensambles.ipynb' },
]

const ML_EXCEL: Resource[] = [
  { icon: '📗', name: 'logistica_01_german_credit.xlsx', tag: 'Excel', href: `${GH}/classification_intro_playground/raw/main/excel/logistica_01_german_credit.xlsx` },
  { icon: '📗', name: 'logistica_02_regularizacion.xlsx', tag: 'Excel', href: `${GH}/classification_intro_playground/raw/main/excel/logistica_02_regularizacion.xlsx` },
  { icon: '📗', name: 'logistica_03_desbalanceo.xlsx', tag: 'Excel', href: `${GH}/classification_intro_playground/raw/main/excel/logistica_03_desbalanceo.xlsx` },
]

const LINKS: Resource[] = [
  { icon: '⚔️', name: 'LM Arena', tag: 'Tool', href: 'https://lmarena.ai/' },
  { icon: '🗺️', name: 'Prompting Techniques Examples', tag: 'Miro', href: 'https://miro.com/app/board/uXjVN3c3BZQ=/' },
]

function ResourceGroup({ title, items }: { title: string; items: Resource[] }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div className="evic-group-label">{title}</div>
      <div className="evic-grid">
        {items.map(r => (
          <a key={r.href} className="evic-card" href={r.href} target="_blank" rel="noreferrer">
            <span className="evic-icon">{r.icon}</span>
            <div className="evic-card-body">
              <div className="evic-card-name">{r.name}</div>
              <span className="evic-tag">{r.tag}</span>
            </div>
            <span className="evic-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function CoursesMaterial() {
  const { t, language } = useLanguage()
  const mlNotebooks: Resource[] = ML_NOTEBOOKS_BASE.map(n => ({ icon: n.icon, name: language === 'en' ? n.en : n.name, tag: language === 'en' ? 'Colab EN' : 'Colab ES', href: nbPair(n.repo, n.file, language) }))
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
    <section id="material" ref={sectionRef}>
      <div className="section-header fade-in">
        <div className="section-label">{t('materialLabel')}</div>
        <h2 className="section-title">{t('materialTitle')}</h2>
        <p className="section-subtitle">{t('materialSubtitle')}</p>
      </div>

      <div className="fade-in">
        <div className="evic-header">
          <span className="evic-badge">2026</span>
          <h3 className="evic-title">{t('mlTitle')}</h3>
          <p className="evic-desc">{t('mlDesc')}</p>
        </div>

        <ResourceGroup title={t('mlGroupSites')} items={ML_SITES} />
        <ResourceGroup title={t('mlGroupNotebooks')} items={mlNotebooks} />
        <ResourceGroup title={t('mlGroupExcel')} items={ML_EXCEL} />
      </div>

      <div className="fade-in">
        <div className="evic-header">
          <span className="evic-badge">EVIC 2025</span>
          <h3 className="evic-title">{t('evicTitle')}</h3>
          <p className="evic-desc">{t('evicDesc')}</p>
        </div>

        <ResourceGroup title={t('evicGroupFiles')} items={FILES} />
        <ResourceGroup title={t('evicGroupNotebooks')} items={NOTEBOOKS} />
        <ResourceGroup title={t('evicGroupLinks')} items={LINKS} />
      </div>
    </section>
  )
}
