import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';
import herologo from '../assets/herologo.png';

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    const logo = logoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!hero || !logo || !title || !subtitle) return;

    // Initial setup - hide elements
    gsap.set([logo, title, subtitle], { opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Logo animation - scale and fade in with rotation
    gsap.set(logo, { scale: 0.5, rotation: -180, opacity: 0 });
    tl.to(logo, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'back.out(1.7)',
    });

    // Title animation - slide up and fade in
    gsap.set(title, { y: 50, opacity: 0 });
    tl.to(
      title,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.8'
    );

    // Subtitle animation - slide up and fade in
    gsap.set(subtitle, { y: 30, opacity: 0 });
    tl.to(
      subtitle,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    // Continuous logo rotation on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      gsap.to(logo, {
        rotation: scrollY * 0.3,
        duration: 0.1,
        ease: 'none',
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Parallax effect for hero section
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.to(hero, {
          y: self.progress * 100,
          opacity: 1 - self.progress * 0.5,
          duration: 0.1,
        });
      },
    });

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });

      gsap.to(logo, {
        x: x * 20,
        y: y * 20,
        rotation: x * 10,
        duration: 1,
        ease: 'power2.out',
      });
    };

    hero.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      hero.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      {/* Animated background particles */}
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-logo-container">
          <img
            ref={logoRef}
            src={herologo}
            alt="UNSTABLECOIN Hero Logo"
            className="hero-logo"
          />
          <div className="hero-logo-glow" />
        </div>

        <h1 ref={titleRef} className="hero-title">
          <span className="hero-title-line">UNSTABLECOIN</span>
       
        </h1>

        <p ref={subtitleRef} className="hero-subtitle">
          Pump.fun native. Permanent by design.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <a 
            href="https://dexscreener.com/solana/2hraypbiddyfxbspavfizqhlgwinuz99o4ewkumbpump"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-primary"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}

export default HeroSection;
