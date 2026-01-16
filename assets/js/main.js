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

  // Intersection Observer for fade-in animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(function(el) {
      observer.observe(el);
    });
  }

})();
