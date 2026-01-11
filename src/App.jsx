import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { gsap } from 'gsap'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import CopyAddress from './components/CopyAddress'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ElectricBackground from './components/ElectricBackground'
import PrivacyTrademarkDisclaimer from './pages/PrivacyTrademarkDisclaimer'

function HomePage() {
  const contentRef = useRef(null)

  useEffect(() => {
    // Make content visible but it's behind curtains
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 1,
        y: 0,
      })
    }
  }, [])

  return (
    <div ref={contentRef} className="app-content">
      <Navbar />
      <HeroSection />
      <CopyAddress />
      <AboutSection />
      <Footer />
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    // Show website content (it will be behind the curtains)
    setShowContent(true)
    
    // Remove loading screen from DOM after curtains fully open
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Router>
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {showContent && (
        <>
          <Routes>
            <Route path="/" element={
              <>
                <ElectricBackground />
                <HomePage />
              </>
            } />
            <Route path="/privacy" element={<PrivacyTrademarkDisclaimer />} />
          </Routes>
        </>
      )}
    </Router>
  )
}

export default App
