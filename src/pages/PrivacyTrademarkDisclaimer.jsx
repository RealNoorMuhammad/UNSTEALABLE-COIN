import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './PrivacyTrademarkDisclaimer.css';
import Navbar from '../components/Navbar';
import ElectricBackground from '../components/ElectricBackground';

gsap.registerPlugin(ScrollTrigger);

function PrivacyTrademarkDisclaimer() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const section = sectionRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    if (!section || !container || !title || !content) return;

    // Initial setup - hide elements
    gsap.set([container, title, content], { 
      opacity: 0 
    });
    gsap.set(title, { y: -50, scale: 0.8 });
    gsap.set(content, { 
      y: 60, 
      opacity: 0
    });

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();
        
        // Container fade in
        tl.to(container, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        })
        // Title animation
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        // Content animation
        .to(
          content,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.8'
        );
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <ElectricBackground />
      <Navbar />
      <section ref={sectionRef} className="privacy-section">
        <div className="privacy-back-link">
          <Link to="/" className="privacy-link-button">
            ← Back to Home
          </Link>
        </div>
        <div className="privacy-background">
          <div className="privacy-orb privacy-orb-1" />
          <div className="privacy-orb privacy-orb-2" />
        </div>

        <div ref={containerRef} className="privacy-container">
          <h1 ref={titleRef} className="privacy-title">
            <span className="privacy-title-desktop">Privacy & Trademark Disclaimer</span>
            <span className="privacy-title-mobile">Privacy</span>
          </h1>
          
          <div ref={contentRef} className="privacy-content">
            <div className="privacy-section-block">
              <h2 className="privacy-subtitle">Trademark Protection</h2>
              <p>
                Unstealable Coin is the official and legally trademarked brand registered with the United States Patent and Trademark Office (USPTO). Our name, logo, color identity, and related branding elements are fully protected by law.
              </p>
              <p>
                We are aware that several projects and tokens have appeared claiming to be related or similar to Unstealable Coin. These are unauthorized copies or imitations and have no legal connection or endorsement from our team.
              </p>
            </div>

            <div className="privacy-section-block">
              <h2 className="privacy-subtitle">What This Means for You</h2>
              <ul className="privacy-list">
                <li>When you engage with Unstealable Coin, you are dealing with the real, authentic project, backed by verified trademarks and legal protection.</li>
                <li>Any other use of our name, logo, or branding without permission is a violation of our trademark rights.</li>
                <li>We take these infringements seriously and reserve the right to pursue legal action against any unauthorized use or imitation.</li>
              </ul>
            </div>

            <div className="privacy-section-block">
              <h2 className="privacy-subtitle">Our Commitment to Privacy</h2>
              <p>
                We respect your privacy and handle any personal information according to applicable laws. We do not sell, rent, or share your data with third parties beyond what is necessary to operate our services and comply with legal obligations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyTrademarkDisclaimer;
