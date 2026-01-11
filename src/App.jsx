import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import CopyAddress from './components/CopyAddress'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ElectricBackground from './components/ElectricBackground'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const contentRef = useRef(null)

  const handleLoadingComplete = () => {
    // Show website content (it will be behind the curtains)
    setShowContent(true)
    
    // Make content visible but it's behind curtains
    if (contentRef.current) {
      gsap.set(contentRef.current, {
        opacity: 1,
        y: 0,
      })
    }
    
    // Remove loading screen from DOM after curtains fully open
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {showContent && (
        <>
          <ElectricBackground />
          <div ref={contentRef} className="app-content">
            <Navbar />
            <HeroSection />
              <CopyAddress />
            <AboutSection />
          
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default App
