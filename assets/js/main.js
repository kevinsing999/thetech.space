/**
 * The Tech Space - Main JavaScript
 * Vanilla JS - No dependencies
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');

  // Mobile Navigation Toggle
  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');

      // Prevent body scroll when nav is open
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close nav when clicking a link
    navList.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Header scroll effect
  if (header) {
    let lastScrollY = window.scrollY;

    function updateHeader() {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // Form Validation
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Reset errors
      contactForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function(input) {
        input.classList.remove('error');
      });
      contactForm.querySelectorAll('.form-error').forEach(function(error) {
        error.textContent = '';
      });

      let isValid = true;
      const formData = new FormData(contactForm);

      // Validate name
      const name = formData.get('name');
      if (!name || name.trim().length < 2) {
        showError('name', 'Please enter your name');
        isValid = false;
      }

      // Validate email
      const email = formData.get('email');
      if (!email || !isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      }

      // Validate message
      const message = formData.get('message');
      if (!message || message.trim().length < 20) {
        showError('message', 'Please enter a message (at least 20 characters)');
        isValid = false;
      }

      // Check honeypot (spam protection)
      const honeypot = formData.get('website');
      if (honeypot) {
        console.log('Spam detected');
        return;
      }

      if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        submitBtn.disabled = true;
        if (btnText) btnText.style.opacity = '0';
        if (btnLoading) btnLoading.style.display = 'block';

        // Simulate form submission (replace with actual endpoint)
        setTimeout(function() {
          submitBtn.disabled = false;
          if (btnText) btnText.style.opacity = '1';
          if (btnLoading) btnLoading.style.display = 'none';

          // Show success message
          showFormSuccess();
        }, 1500);
      }
    });
  }

  function showError(fieldName, message) {
    const field = document.querySelector('[name="' + fieldName + '"]');
    if (field) {
      field.classList.add('error');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = message;
      }
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormSuccess() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.innerHTML = '<div class="text-center" style="padding: 2rem;"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2d7d46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><h3 style="color: var(--color-primary); margin-bottom: 0.5rem;">Message Sent!</h3><p style="color: var(--color-gray-700);">Thank you for reaching out. I\'ll get back to you within 24 hours.</p></div>';
    }
  }

  // Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#main') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // Enhanced Scroll Animations (Apple-style)
  // ============================================
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-50px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedSelectors = [
      '.fade-in',
      '.scale-in',
      '.slide-in-left',
      '.slide-in-right',
      '.stagger-in',
      '.text-reveal'
    ];

    animatedSelectors.forEach(function(selector) {
      document.querySelectorAll(selector).forEach(function(el) {
        observer.observe(el);
      });
    });
  }

  // ============================================
  // Accordion Component
  // ============================================
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(function(item) {
    const trigger = item.querySelector('.accordion__trigger');

    if (trigger) {
      trigger.addEventListener('click', function() {
        const isOpen = item.classList.contains('is-open');

        // Close all other accordion items (optional - remove for multi-open)
        accordionItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
          }
        });

        // Toggle current item
        item.classList.toggle('is-open');

        // Update ARIA
        trigger.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  // ============================================
  // Parallax Scroll Effect (subtle)
  // ============================================
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach(function(el) {
        const speed = el.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
      });
    }, { passive: true });
  }

  // ============================================
  // Smooth Counter Animation
  // ============================================
  function animateCounter(el, target, duration) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  // Counter animation on scroll
  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.counter, 10);
          animateCounter(entry.target, target, 2000);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(function(el) {
      counterObserver.observe(el);
    });
  }

  // ============================================
  // ROI Calculator
  // ============================================
  const calculatorInputs = {
    duration: document.getElementById('duration'),
    offshoreRate: document.getElementById('offshore-rate'),
    seniorRate: document.getElementById('senior-rate'),
    experiencedRate: document.getElementById('experienced-rate'),
    supervision: document.getElementById('supervision'),
    rework: document.getElementById('rework'),
    overrun: document.getElementById('overrun'),
    onboarding: document.getElementById('onboarding')
  };

  // Check if calculator exists on page
  if (calculatorInputs.duration) {
    // Constants for experienced resource (lower hidden costs)
    const EXP_SUPERVISION_HOURS = 1.5;  // hours/week
    const EXP_REWORK_RATE = 0.075;      // 7.5%
    const EXP_OVERRUN_RATE = 0.05;      // 5%
    const EXP_ONBOARDING_WEEKS = 2;     // weeks

    // Working days per month
    const WORKING_DAYS_PER_MONTH = 22;
    const WORKING_HOURS_PER_DAY = 8;

    // Format currency
    function formatCurrency(amount) {
      return '$' + Math.round(amount).toLocaleString('en-US');
    }

    // Format percentage
    function formatPercentage(value, showSign) {
      const sign = showSign && value > 0 ? '+' : '';
      return sign + Math.round(value) + '%';
    }

    // Update slider value displays
    function updateSliderDisplay(slider, displayId) {
      const display = document.getElementById(displayId);
      if (display) {
        display.textContent = slider.value;
      }
    }

    // Main calculation function
    function calculateROI() {
      // Get input values
      const duration = parseInt(calculatorInputs.duration.value) || 6;
      const offshoreRate = parseFloat(calculatorInputs.offshoreRate.value) || 450;
      const seniorRate = parseFloat(calculatorInputs.seniorRate.value) || 120;
      const experiencedRate = parseFloat(calculatorInputs.experiencedRate.value) || 1200;
      const supervisionHours = parseInt(calculatorInputs.supervision.value) || 8;
      const reworkRate = parseInt(calculatorInputs.rework.value) / 100 || 0.35;
      const overrunRate = parseInt(calculatorInputs.overrun.value) / 100 || 0.25;
      const onboardingWeeks = parseInt(calculatorInputs.onboarding.value) || 6;

      // Calculate total working days
      const totalDays = duration * WORKING_DAYS_PER_MONTH;
      const totalWeeks = duration * 4;

      // ========== OFFSHORE CALCULATIONS ==========
      // Apparent cost (day rate x days)
      const apparentCost = offshoreRate * totalDays;

      // Supervision cost (senior staff time reviewing/managing)
      const supervisionCost = supervisionHours * totalWeeks * seniorRate;

      // Rework cost (percentage of deliverables need to be redone)
      const reworkCost = apparentCost * reworkRate;

      // Timeline overrun cost (additional days due to delays)
      const overrunDays = totalDays * overrunRate;
      const overrunCost = overrunDays * offshoreRate;

      // Knowledge transfer/onboarding cost (senior staff training time)
      const onboardingCost = onboardingWeeks * 40 * seniorRate * 0.2; // 20% of senior time for X weeks

      // Total hidden costs
      const hiddenTotal = supervisionCost + reworkCost + overrunCost + onboardingCost;

      // True cost
      const trueCost = apparentCost + hiddenTotal;

      // Cost increase percentage
      const costIncrease = ((trueCost - apparentCost) / apparentCost) * 100;

      // ========== EXPERIENCED CALCULATIONS ==========
      // Base cost
      const expApparentCost = experiencedRate * totalDays;

      // Much lower hidden costs
      const expSupervisionCost = EXP_SUPERVISION_HOURS * totalWeeks * seniorRate;
      const expReworkCost = expApparentCost * EXP_REWORK_RATE;
      const expOverrunCost = totalDays * EXP_OVERRUN_RATE * experiencedRate;
      const expOnboardingCost = EXP_ONBOARDING_WEEKS * 40 * seniorRate * 0.1; // 10% of senior time

      const expHiddenTotal = expSupervisionCost + expReworkCost + expOverrunCost + expOnboardingCost;
      const expTrueCost = expApparentCost + expHiddenTotal;

      // ========== COMPARISONS ==========
      const ratePremium = ((experiencedRate - offshoreRate) / offshoreRate) * 100;
      const trueDifference = ((expTrueCost - trueCost) / trueCost) * 100;

      // ========== UPDATE DOM ==========
      // Offshore results
      document.getElementById('apparent-cost').textContent = formatCurrency(apparentCost);
      document.getElementById('supervision-cost').textContent = formatCurrency(supervisionCost);
      document.getElementById('rework-cost').textContent = formatCurrency(reworkCost);
      document.getElementById('overrun-cost').textContent = formatCurrency(overrunCost);
      document.getElementById('onboarding-cost').textContent = formatCurrency(onboardingCost);
      document.getElementById('hidden-total').textContent = formatCurrency(hiddenTotal);
      document.getElementById('true-cost').textContent = formatCurrency(trueCost);
      document.getElementById('cost-increase').textContent = formatPercentage(costIncrease, true) + ' over apparent cost';

      // Experienced results
      document.getElementById('experienced-cost').textContent = formatCurrency(expApparentCost);
      document.getElementById('exp-supervision-cost').textContent = formatCurrency(expSupervisionCost);
      document.getElementById('exp-rework-cost').textContent = formatCurrency(expReworkCost);
      document.getElementById('exp-overrun-cost').textContent = formatCurrency(expOverrunCost);
      document.getElementById('exp-onboarding-cost').textContent = formatCurrency(expOnboardingCost);
      document.getElementById('exp-hidden-total').textContent = formatCurrency(expHiddenTotal);
      document.getElementById('exp-true-cost').textContent = formatCurrency(expTrueCost);

      // Comparison
      document.getElementById('rate-premium').textContent = formatPercentage(ratePremium, true);
      document.getElementById('true-difference').textContent = formatPercentage(trueDifference, true);

      // Risk-adjusted value message
      const riskValueEl = document.getElementById('risk-value');
      if (expTrueCost > trueCost) {
        const premium = ((expTrueCost - trueCost) / trueCost) * 100;
        riskValueEl.textContent = 'Pay ' + Math.round(premium) + '% more for certainty';
      } else {
        const savings = ((trueCost - expTrueCost) / trueCost) * 100;
        riskValueEl.textContent = 'Save ' + Math.round(savings) + '% with lower risk';
      }
    }

    // Bind event listeners to all inputs
    Object.keys(calculatorInputs).forEach(function(key) {
      const input = calculatorInputs[key];
      if (input) {
        input.addEventListener('input', function() {
          // Update slider displays
          if (input.type === 'range') {
            updateSliderDisplay(input, key + '-value');
          }
          calculateROI();
        });
      }
    });

    // Initial calculation
    calculateROI();
  }

})();
