// SPDX-License-Identifier: Apache-2.0
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

export default function Nav() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const handler = () => {
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 80) cur = s.id
      })
      setActiveSection(cur)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navItems = [
    { href: '#about', key: 'navAbout' },
    { href: '#research', key: 'navResearch' },
    { href: '#tools', key: 'navTools' },
    { href: '#teaching', key: 'navTeaching' },
    { href: '#material', key: 'navMaterial' },
    { href: '#distinctions', key: 'navDistinctions' },
    { href: '#media', key: 'navMedia' },
    { href: '#contact', key: 'navContact' },
  ]

  return (
    <>
      <nav>
        <a className="nav-logo" href="#" aria-label="Inicio">David<span>.</span>Díaz</a>

        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.key}>
              <a
                href={item.href}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <button
            className={`btn-control${language === 'es' ? ' active' : ''}`}
            onClick={() => setLanguage('es')}
          >ES</button>
          <button
            className={`btn-control${language === 'en' ? ' active' : ''}`}
            onClick={() => setLanguage('en')}
          >EN</button>
          <button className="btn-control" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {t(item.key)}
          </a>
        ))}
      </div>
    </>
  )
}
