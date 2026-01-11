import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import './Navbar.css';
import dexscreenerLogo from '../assets/dexscreener.png';

function Navbar() {
  const navbarRef = useRef(null);
  const titleRef = useRef(null);
  const leftLogoRef = useRef(null);
  const rightLogoRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Ensure all elements are visible first
    if (navbarRef.current) {
      gsap.set(navbarRef.current, { opacity: 1, y: 0, visibility: 'visible' });
    }
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1, x: 0, visibility: 'visible' });
    }
    if (leftLogoRef.current) {
      gsap.set(leftLogoRef.current, { opacity: 1, scale: 1, visibility: 'visible' });
    }
    if (rightLogoRef.current) {
      gsap.set(rightLogoRef.current, { opacity: 1, scale: 1, visibility: 'visible' });
    }

    // Initial entrance animation - only if elements exist
    const tl = gsap.timeline({ delay: 0.2 });
    
    if (navbarRef.current) {
      gsap.set(navbarRef.current, { y: -100 });
      tl.to(navbarRef.current, {
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
    
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0.5 });
      tl.to(titleRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');
    }
    
    if (leftLogoRef.current) {
      gsap.set(leftLogoRef.current, { scale: 0.5 });
      tl.to(leftLogoRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.4');
    }
    
    if (rightLogoRef.current) {
      gsap.set(rightLogoRef.current, { scale: 0.5 });
      tl.to(rightLogoRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.3');
    }

    // Scroll detection for navbar background
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav
      ref={navbarRef}
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="navbar-container">
        {/* Left: X Logo */}
        <motion.a
          ref={leftLogoRef}
          href="https://x.com/i/communities/2009577699505746113"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-social-link navbar-left-logo"
          aria-label="X (Twitter)"
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -10, 10, -10, 0],
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </motion.a>

        {/* Center: UNSTABLECOIN Text */}
        <motion.h1
          ref={titleRef}
          className="navbar-title"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <Link to="/" className="navbar-title-link">
            <motion.span
              className="navbar-title-text"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255, 215, 0, 0.5)',
                  '0 0 20px rgba(255, 215, 0, 0.8)',
                  '0 0 10px rgba(255, 215, 0, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              UNSTABLECOIN
            </motion.span>
          </Link>
        </motion.h1>

        {/* Right: DexScreener Logo */}
        <motion.a
          ref={rightLogoRef}
          href="https://dexscreener.com/solana/2hraypbiddyfxbspavfizqhlgwinuz99o4ewkumbpump"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-social-link navbar-right-logo"
          aria-label="DexScreener"
          whileHover={{ 
            scale: 1.15,
            rotate: [0, 10, -10, 10, 0],
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
        >
          <img src={dexscreenerLogo} alt="DexScreener" className="navbar-social-icon" />
        </motion.a>
      </div>
    </motion.nav>
  );
}

export default Navbar;
