// SPDX-License-Identifier: Apache-2.0
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Research from './components/Research'
import Tools from './components/Tools'
import Teaching from './components/Teaching'
import Distinctions from './components/Distinctions'
import Media from './components/Media'
import Contact from './components/Contact'
import Footer from './components/Footer'

function AppInner() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Research />
      <Tools />
      <Teaching />
      <Distinctions />
      <Media />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  )
}
