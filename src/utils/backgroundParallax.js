/**
 * Background Parallax Effect for Mobile
 * Moves the background pattern based on device gyroscope/accelerometer
 * Similar to WhatsApp's chat background effect
 */

export const initBackgroundParallax = () => {
  // Only enable on mobile devices
  const isMobile = window.matchMedia('(max-width: 1024px)').matches;
  if (!isMobile) return;

  let isListening = false;

  const handleOrientation = (event) => {
    // gamma: left-right tilt (-90 to 90)
    // beta: front-back tilt (-180 to 180)
    const gamma = event.gamma || 0;
    const beta = event.beta || 0;

    // Calculate parallax offset (amplify the movement for visibility)
    // Scale the tilt to create noticeable background movement
    const moveX = gamma * 1.2; // Left-right movement (increased from 0.5)
    const moveY = (beta - 60) * 1.2; // Front-back movement (increased from 0.5)

    // Apply transform to body::before through CSS variable
    document.documentElement.style.setProperty('--bg-parallax-x', `${moveX}px`);
    document.documentElement.style.setProperty('--bg-parallax-y', `${moveY}px`);
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
          console.log('Background parallax enabled (iOS)');
        }
      } catch (error) {
        console.log('DeviceOrientation permission denied:', error);
      }
    } else {
      // Non-iOS devices - no permission needed
      window.addEventListener('deviceorientation', handleOrientation, true);
      isListening = true;
      console.log('Background parallax enabled (Android)');
    }
  };

  // Request permission on first touch (required for iOS)
  const enableOnTouch = () => {
    requestPermission();
  };

  document.addEventListener('touchstart', enableOnTouch, { once: true });

  // Also try immediately for Android
  if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    requestPermission();
  }

  // Cleanup function
  return () => {
    window.removeEventListener('deviceorientation', handleOrientation, true);
    document.documentElement.style.removeProperty('--bg-parallax-x');
    document.documentElement.style.removeProperty('--bg-parallax-y');
  };
};
