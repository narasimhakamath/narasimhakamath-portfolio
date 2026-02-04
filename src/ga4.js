// src/ga4.js
// Utility to send events to Google Analytics 4

export function sendGAEvent(eventName, eventParams = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
}
