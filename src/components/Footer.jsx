import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import dexscreenerLogo from '../assets/dexscreener.png';
import mainLogo from '../assets/logo.png';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setRotation(scrollY * 0.5); // Adjust rotation speed (0.5 degrees per pixel)
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info Section - Centered */}
          <div className="footer-section footer-section-centered">
            <div className="footer-logo-container">
              <img 
                src={mainLogo} 
                alt="UNSTABLECOIN Logo" 
                className="footer-main-logo"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>
            <h3 className="footer-logo">UNSTABLECOIN</h3>
            <p className="footer-description">
              Your trusted platform for cryptocurrency solutions. 
              Secure, fast, and reliable.
            </p>
            <div className="social-links">
              <a 
                href="https://x.com/i/communities/2009577699505746113" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link" 
                aria-label="X (Twitter)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://dexscreener.com/solana/2hraypbiddyfxbspavfizqhlgwinuz99o4ewkumbpump" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link" 
                aria-label="DexScreener"
              >
                <img src={dexscreenerLogo} alt="DexScreener" className="social-icon-img" />
              </a>
            </div>
          </div>
        </div>

        {/* Gold Divider */}
     

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} UNSTABLECOIN. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link 
                to="/privacy" 
                className="footer-legal-link"
                onClick={() => window.scrollTo(0, 0)}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

