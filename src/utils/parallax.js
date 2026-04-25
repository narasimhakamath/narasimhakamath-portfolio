/**
 * Parallax Tilt Effect for Cards
 * Desktop: Mouse-based 3D tilt
 * Mobile: Gyroscope/accelerometer-based 3D tilt
 */

export const initParallaxCards = (selector, options = {}) => {
  // Detect device type
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = !hasHover;

  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    glare = true,
    glareMaxOpacity = 0.3
  } = options;

  const cards = document.querySelectorAll(selector);
  if (!cards.length) return;

  // MOBILE: Gyroscope-based parallax
  if (isMobile) {
    cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = `transform ${speed}ms ease-out`;

      // Create glare element if enabled
      if (glare) {
        const glareElement = document.createElement('div');
        glareElement.className = 'parallax-glare';
        glareElement.style.position = 'absolute';
        glareElement.style.top = '0';
        glareElement.style.left = '0';
        glareElement.style.width = '100%';
        glareElement.style.height = '100%';
        glareElement.style.borderRadius = 'inherit';
        glareElement.style.pointerEvents = 'none';
        glareElement.style.opacity = '0';
        glareElement.style.transition = `opacity ${speed}ms ease`;
        glareElement.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)';
        glareElement.style.mixBlendMode = 'overlay';
        card.style.position = 'relative';
        card.appendChild(glareElement);
      }
    });

    let isListening = false;

    const handleOrientation = (event) => {
      // gamma: left-right tilt (-90 to 90)
      // beta: front-back tilt (-180 to 180)
      const gamma = event.gamma || 0;
      const beta = event.beta || 0;

      cards.forEach(card => {
        // Normalize tilt values (assuming phone held upright at ~70-80 degrees)
        const normalizedBeta = (beta - 60) / 30; // Adjust for typical viewing angle
        const normalizedGamma = gamma / 30;

        // Clamp values to prevent extreme tilts
        const clampedX = Math.max(-1, Math.min(1, normalizedBeta));
        const clampedY = Math.max(-1, Math.min(1, normalizedGamma));

        // Calculate rotation
        const rotateX = clampedX * maxTilt * -1;
        const rotateY = clampedY * maxTilt;

        // Apply transform
        card.style.transform = `
          perspective(${perspective}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(1)
        `;

        // Update glare if enabled
        if (glare) {
          const glareElement = card.querySelector('.parallax-glare');
          if (glareElement) {
            const glareX = ((clampedY + 1) / 2) * 100;
            const glareY = ((clampedX + 1) / 2) * 100;
            const intensity = Math.min(Math.abs(clampedX) + Math.abs(clampedY), 1);
            const opacity = intensity * glareMaxOpacity;
            
            glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${opacity}) 0%, transparent 60%)`;
            glareElement.style.opacity = intensity > 0.1 ? '1' : '0';
          }
        }
      });
    };

    const requestPermission = async () => {
      if (isListening) return;

      // iOS 13+ requires permission
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            isListening = true;
          }
        } catch (error) {
          console.log('DeviceOrientation permission denied:', error);
        }
      } else {
        // Non-iOS or older devices - no permission needed
        window.addEventListener('deviceorientation', handleOrientation, true);
        isListening = true;
      }
    };

    // Request permission on first touch (required for iOS)
    const enableOnTouch = () => {
      requestPermission();
      document.removeEventListener('touchstart', enableOnTouch);
    };

    document.addEventListener('touchstart', enableOnTouch, { once: true });

    // Also try immediately for Android and other devices
    if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      requestPermission();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      cards.forEach(card => {
        card.style.transform = '';
        const glareElement = card.querySelector('.parallax-glare');
        if (glareElement) glareElement.remove();
      });
    };
  }

  // DESKTOP: Mouse-based parallax (existing implementation)

  cards.forEach(card => {
    // Add necessary styles
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;

    // Create glare element if enabled
    let glareElement;
    if (glare) {
      glareElement = document.createElement('div');
      glareElement.className = 'parallax-glare';
      glareElement.style.position = 'absolute';
      glareElement.style.top = '0';
      glareElement.style.left = '0';
      glareElement.style.width = '100%';
      glareElement.style.height = '100%';
      glareElement.style.borderRadius = 'inherit';
      glareElement.style.pointerEvents = 'none';
      glareElement.style.opacity = '0';
      glareElement.style.transition = `opacity ${speed}ms ease`;
      glareElement.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)';
      glareElement.style.mixBlendMode = 'overlay';
      card.style.position = 'relative';
      card.appendChild(glareElement);
    }

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;
      
      // Calculate mouse position relative to card center
      const centerX = rect.left + cardWidth / 2;
      const centerY = rect.top + cardHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Calculate rotation angles
      const rotateX = (mouseY / cardHeight) * -maxTilt;
      const rotateY = (mouseX / cardWidth) * maxTilt;
      
      // Apply transform
      card.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      // Update glare position
      if (glare && glareElement) {
        const glareX = ((mouseX / cardWidth) + 0.5) * 100;
        const glareY = ((mouseY / cardHeight) + 0.5) * 100;
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareMaxOpacity}) 0%, transparent 50%)`;
        glareElement.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      if (glare && glareElement) {
        glareElement.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      card.style.transition = 'none';
      setTimeout(() => {
        card.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      }, 0);
    };

    // Attach event listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
};

// Cleanup function
export const destroyParallaxCards = (selector) => {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    const glare = card.querySelector('.parallax-glare');
    if (glare) glare.remove();
    card.style.transform = '';
    card.style.transition = '';
  });
};
