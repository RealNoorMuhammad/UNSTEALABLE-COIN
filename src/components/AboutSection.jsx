import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';
import proofImage from '../assets/proof.jpeg';

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const combinedTextRef = useRef(null);
  const newParagraph6Ref = useRef(null);
  const proofImageRef = useRef(null);
  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  const paragraph3Ref = useRef(null);
  const paragraph4Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const title = titleRef.current;
    const combinedText = combinedTextRef.current;
    const newParagraph6 = newParagraph6Ref.current;
    const proofContainer = proofImageRef.current;
    const proofImageElement = proofContainer?.querySelector('.about-proof-image');

    if (!section || !container || !title || !combinedText || !newParagraph6 || !proofContainer || !proofImageElement) return;

    // Initial setup - hide elements
    gsap.set([container, title, combinedText, newParagraph6, proofContainer], { 
      opacity: 0 
    });
    gsap.set(title, { y: -50, scale: 0.8, rotationX: -90 });
    gsap.set(combinedText, { 
      y: 60, 
      x: -30,
      rotationY: -15
    });
    gsap.set(newParagraph6, { 
      y: 60, 
      x: -30,
      rotationY: -15,
      scale: 0.8
    });
    gsap.set(proofContainer, {
      y: 80,
      scale: 0.7,
      rotationY: -20,
      rotationX: 10
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
        // Title animation - dramatic entrance
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        // Combined Text Box - slide in from left with rotation
        .to(
          combinedText,
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotationY: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.8'
        )
        // New Paragraph 6 - dramatic emphasis animation
        .to(
          newParagraph6,
          {
            opacity: 1,
            y: 0,
            x: 0,
            rotationY: 0,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
        // Proof Image - dramatic 3D entrance
        .to(
          proofContainer,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.5,
            ease: 'back.out(1.4)',
          },
          '-=0.5'
        );

        // Continuous floating animation for orbs
        gsap.to('.about-orb-1', {
          x: '+=50',
          y: '+=30',
          duration: 8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        gsap.to('.about-orb-2', {
          x: '-=40',
          y: '-=50',
          duration: 10,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Subtle continuous animations for text elements
        gsap.to(title, {
          y: '+=5',
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Continuous pulse animation for the final emphasis text
        gsap.to(newParagraph6, {
          scale: 1.05,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Hover effects for combined text box and legendary text
        combinedText.addEventListener('mouseenter', () => {
          gsap.to(combinedText, {
            scale: 1.02,
            x: 10,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        combinedText.addEventListener('mouseleave', () => {
          gsap.to(combinedText, {
            scale: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        newParagraph6.addEventListener('mouseenter', () => {
          gsap.to(newParagraph6, {
            scale: 1.1,
            x: 10,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        newParagraph6.addEventListener('mouseleave', () => {
          gsap.to(newParagraph6, {
            scale: 1.05,
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        // Hover effect for proof image
        proofImageElement.addEventListener('mouseenter', () => {
          gsap.to(proofImageElement, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        proofImageElement.addEventListener('mouseleave', () => {
          gsap.to(proofImageElement, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
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
    <section ref={sectionRef} className="about-section">
      <div className="about-background">
        <div className="about-orb about-orb-1" />
        <div className="about-orb about-orb-2" />
      </div>

      <div ref={containerRef} className="about-container">
        <h2 ref={titleRef} className="about-title">
          The Permanence of Unstealable Coin
        </h2>
        
        <div className="about-content">
          <div ref={combinedTextRef} className="about-combined-text">
            <p>
              On January 6th, something extraordinary happened — a coin quietly secured a trademark with the United States Patent and Trademark Office (USPTO). This isn't just any coin. It's Unstealable Coin.
            </p>
            
            <p>
              But it doesn't stop at the name. The logo, the color scheme, the entire identity — all locked down, officially protected, and airtight. Even the Corporate Address (CA) is recorded in the filing, leaving no room for doubt.
            </p>
            
            <p>
              What makes this legendary? The story behind the coin is nothing short of wild — a narrative so bold that any attempt to copy, imitate, or ride its coattails will trigger a formal cease-and-desist notice.
            </p>
            
            <p>
              Ignore that warning, and you're stepping into legal territory.
            </p>
            
            <p>
              Because here's the unbreakable truth:
            </p>
          </div>
          
          <p ref={newParagraph6Ref} className="about-paragraph about-paragraph-legendary">
            YOU CAN'T STEAL THE UNSTEALABLE COIN.
          </p>
          
          <div ref={proofImageRef} className="about-proof-container">
            <img 
              src={proofImage} 
              alt="USPTO Trademark Proof" 
              className="about-proof-image"
            />
          </div>
         
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
