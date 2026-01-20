/**
 * The Tech Space - Analytics & Tracking
 *
 * SETUP INSTRUCTIONS:
 * 1. Google Analytics 4: Replace 'G-XXXXXXXXXX' with your GA4 Measurement ID
 * 2. Microsoft Clarity: Replace 'XXXXXXXXXX' with your Clarity Project ID
 * 3. Google Search Console: Add the provided meta tag to your HTML head
 *
 * To get these IDs:
 * - GA4: https://analytics.google.com → Admin → Data Streams → Web → Measurement ID
 * - Clarity: https://clarity.microsoft.com → Settings → Overview → Project ID
 * - Search Console: https://search.google.com/search-console → Add Property
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION - Replace with your IDs
  // ============================================
  const CONFIG = {
    GA4_ID: 'G-20VESFTRML',        // Your Google Analytics 4 Measurement ID
    CLARITY_ID: 'v4a357fo13',       // Your Microsoft Clarity Project ID
    DEBUG: false                    // Set to true for console logging
  };

  // ============================================
  // GOOGLE ANALYTICS 4
  // ============================================
  function initGA4() {
    if (CONFIG.GA4_ID === 'G-XXXXXXXXXX') {
      if (CONFIG.DEBUG) console.log('[Analytics] GA4 not configured - skipping');
      return;
    }

    // Load gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_ID;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', CONFIG.GA4_ID, {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure'
    });

    if (CONFIG.DEBUG) console.log('[Analytics] GA4 initialized:', CONFIG.GA4_ID);
  }

  // ============================================
  // MICROSOFT CLARITY
  // ============================================
  function initClarity() {
    if (CONFIG.CLARITY_ID === 'XXXXXXXXXX') {
      if (CONFIG.DEBUG) console.log('[Analytics] Clarity not configured - skipping');
      return;
    }

    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", CONFIG.CLARITY_ID);

    if (CONFIG.DEBUG) console.log('[Analytics] Clarity initialized:', CONFIG.CLARITY_ID);
  }

  // ============================================
  // CUSTOM EVENT TRACKING
  // ============================================
  window.trackEvent = function(category, action, label, value) {
    // GA4 Event
    if (window.gtag) {
      gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }

    // Clarity Custom Tag
    if (window.clarity) {
      clarity('set', category, label || action);
    }

    if (CONFIG.DEBUG) {
      console.log('[Analytics] Event:', { category, action, label, value });
    }
  };

  // ============================================
  // CALCULATOR TRACKING
  // ============================================
  window.trackCalculatorUse = function(calculatorName, action, details) {
    trackEvent('Calculator', action, calculatorName + ': ' + (details || ''));
  };

  // Track tool switches
  window.trackToolSwitch = function(toolName) {
    trackEvent('Tools', 'switch_tool', toolName);
  };

  // Track form submissions
  window.trackFormSubmit = function(formName) {
    trackEvent('Form', 'submit', formName);
  };

  // Track CTA clicks
  window.trackCTAClick = function(ctaName, location) {
    trackEvent('CTA', 'click', ctaName + ' (' + location + ')');
  };

  // Track downloads
  window.trackDownload = function(fileName, fileType) {
    trackEvent('Download', fileType, fileName);
  };

  // Track outbound links
  window.trackOutboundLink = function(url) {
    trackEvent('Outbound', 'click', url);
  };

  // ============================================
  // SCROLL DEPTH TRACKING
  // ============================================
  function initScrollTracking() {
    const milestones = [25, 50, 75, 90, 100];
    const tracked = {};

    function checkScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      milestones.forEach(function(milestone) {
        if (scrollPercent >= milestone && !tracked[milestone]) {
          tracked[milestone] = true;
          trackEvent('Engagement', 'scroll_depth', milestone + '%');
        }
      });
    }

    window.addEventListener('scroll', throttle(checkScroll, 500), { passive: true });
  }

  // ============================================
  // TIME ON PAGE TRACKING
  // ============================================
  function initTimeTracking() {
    const startTime = Date.now();
    const intervals = [30, 60, 120, 300]; // seconds
    const tracked = {};

    setInterval(function() {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      intervals.forEach(function(interval) {
        if (elapsed >= interval && !tracked[interval]) {
          tracked[interval] = true;
          trackEvent('Engagement', 'time_on_page', interval + 's');
        }
      });
    }, 5000);
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() { inThrottle = false; }, limit);
      }
    };
  }

  // ============================================
  // AUTO-TRACK COMMON ELEMENTS
  // ============================================
  function initAutoTracking() {
    // Track CTA button clicks
    document.querySelectorAll('.btn--primary, .btn-primary, [data-track-cta]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const label = this.textContent.trim() || this.getAttribute('aria-label') || 'Unknown CTA';
        const location = this.closest('section')?.id || this.closest('[class*="hero"]') ? 'hero' : 'page';
        trackCTAClick(label, location);
      });
    });

    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
      if (!link.href.includes('thetech.space')) {
        link.addEventListener('click', function() {
          trackOutboundLink(this.href);
        });
      }
    });

    // Track PDF/file downloads
    document.querySelectorAll('a[href$=".pdf"], a[href$=".xlsx"], a[href$=".docx"]').forEach(function(link) {
      link.addEventListener('click', function() {
        const fileName = this.href.split('/').pop();
        const fileType = fileName.split('.').pop().toUpperCase();
        trackDownload(fileName, fileType);
      });
    });
  }

  // ============================================
  // INITIALIZE
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    initGA4();
    initClarity();
    initScrollTracking();
    initTimeTracking();
    initAutoTracking();

    if (CONFIG.DEBUG) console.log('[Analytics] All tracking initialized');
  });

})();
