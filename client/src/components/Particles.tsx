import React, { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function Particles() {
  useEffect(() => {
    if (typeof window.particlesJS !== 'undefined') {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#00E5FF", "#FF00E5", "#9D00FF", "#FFD700"]
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "bubble"
            },
            onclick: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 100,
              size: 5,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            repulse: {
              distance: 150,
              duration: 0.4
            }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <div 
      id="particles-js" 
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    ></div>
  );
}
