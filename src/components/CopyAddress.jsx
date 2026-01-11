import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CopyAddress.css';

gsap.registerPlugin(ScrollTrigger);

function CopyAddress() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const addressRef = useRef(null);
  const buttonRef = useRef(null);
  const notificationRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);

  const address = '2HrayPbiDDYfxBspavFiZqhLgwiNUZ99o4EWKuMbpump';

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const address = addressRef.current;
    const button = buttonRef.current;

    if (!section || !container || !address || !button) return;

    // Initial setup - hide elements
    gsap.set([container, address, button], { opacity: 0, y: 50 });

    // Scroll-triggered animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();
        
        tl.to(container, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(
          address,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          button,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      
      // Show notification
      setShowNotification(true);
      
      // Animate notification in
      if (notificationRef.current) {
        gsap.set(notificationRef.current, {
          y: 100,
          opacity: 0,
        });
        gsap.to(notificationRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
        });
      }

      // Hide notification after 2 seconds
      setTimeout(() => {
        if (notificationRef.current) {
          gsap.to(notificationRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
              setShowNotification(false);
            },
          });
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = address;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShowNotification(true);
        setTimeout(() => {
          if (notificationRef.current) {
            gsap.set(notificationRef.current, {
              y: 100,
              opacity: 0,
            });
            gsap.to(notificationRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => {
                setTimeout(() => {
                  gsap.to(notificationRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.in',
                    onComplete: () => {
                      setShowNotification(false);
                    },
                  });
                }, 2000);
              },
            });
          }
        }, 0);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      <section ref={sectionRef} className="copy-address-section">
        <div className="copy-address-background">
          <div className="copy-address-orb copy-address-orb-1" />
          <div className="copy-address-orb copy-address-orb-2" />
        </div>

        <div ref={containerRef} className="copy-address-container">
          <h2 className="copy-address-title">Copy Address</h2>
          
          <div className="copy-address-content">
            <div ref={addressRef} className="copy-address-box">
              <span className="copy-address-text">{address}</span>
            </div>
            
            <button
              ref={buttonRef}
              onClick={handleCopy}
              className="copy-address-button"
              aria-label="Copy address to clipboard"
            >
              <svg
                className="copy-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy</span>
            </button>
          </div>
        </div>
      </section>

      {/* Notification */}
      {showNotification && (
        <div ref={notificationRef} className="copy-notification">
          <div className="copy-notification-content">
            <svg
              className="copy-notification-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Address copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}

export default CopyAddress;
