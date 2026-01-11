import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';
import mainLogo from '../assets/logo.png';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef(null);
  const loadingContentRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const progressBarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Faster at the beginning, slower near the end
        const increment = prev < 50 ? 3 : prev < 80 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Stop continuous logo rotation
      gsap.killTweensOf(logoRef.current);
      
      // Animate logo final rotation and scale
      gsap.to(logoRef.current, {
        rotation: '+=360',
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Wait a bit then hide loading content and show curtains
      setTimeout(() => {
        // Hide loading content (logo, title, progress bar)
        gsap.to(loadingContentRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            // Notify that website should be visible now (behind curtains)
            onComplete();
          },
        });

        // Show curtains after loading content is hidden
        setTimeout(() => {
          gsap.set([leftCurtainRef.current, rightCurtainRef.current], {
            opacity: 1,
            visibility: 'visible',
          });

          // Then animate curtains opening slowly to reveal website
          gsap.to(leftCurtainRef.current, {
            x: '-100%',
            duration: 1.5,
            ease: 'power3.inOut',
          });

          gsap.to(rightCurtainRef.current, {
            x: '100%',
            duration: 1.5,
            ease: 'power3.inOut',
            onComplete: () => {
              // Remove loading screen after curtains fully open
              setTimeout(() => {
                gsap.to(loadingRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  ease: 'power2.in',
                });
              }, 300);
            },
          });
        }, 300);
      }, 500);
    }
  }, [progress, onComplete]);

  // Animate logo rotation on mount
  useEffect(() => {
    // Hide curtains initially
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], {
      opacity: 0,
      visibility: 'hidden',
    });

    // Start logo rotation
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <>
      <div ref={loadingRef} className="loading-screen">
        <div ref={loadingContentRef} className="loading-content">
          <div ref={logoRef} className="loading-logo-container">
            <img src={mainLogo} alt="UNSTABLECOIN" className="loading-logo" />
          </div>
          <h2 className="loading-title">UNSTABLECOIN</h2>
          <p className="loading-subtitle">You can't steal what no one controls</p>
          
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div
                ref={progressBarRef}
                className="progress-bar"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-bar-glow"></div>
              </div>
            </div>
            <div className="progress-text">{progress}%</div>
          </div>
        </div>

        {/* Curtains - positioned to cover the website */}
        <div ref={leftCurtainRef} className="curtain curtain-left"></div>
        <div ref={rightCurtainRef} className="curtain curtain-right"></div>
      </div>
    </>
  );
}

export default LoadingScreen;

