// SPDX-License-Identifier: Apache-2.0
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      <div className="footer-copy">{t('footerCopy')}</div>
      <div className="footer-built">built with <span>React + Vite + Vercel</span> · {t('footerBuilt')}</div>
    </footer>
  )
}
