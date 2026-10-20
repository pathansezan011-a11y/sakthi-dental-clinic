/**
 * Sakthi Dental Clinic - Shared Vanilla JavaScript (script.js)
 * High-quality, accessible, zero-dependency interactivity:
 * - Robust mobile navigation with full ARIA support, Escape key, and resize observer
 * - Accessible FAQ accordion supporting all 14 client questions
 * - Accessible form validation (Name, Email, Phone, Message) with transparent submission
 * - Header shadow on scroll & smooth scroll-to-top button
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. MOBILE HEADER & NAVIGATION (CRITICAL ACCESSIBILITY & RESPONSIVE FIX)
  // =========================================================================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.getElementById('main-nav-menu') || document.querySelector('.nav-menu');
  const siteHeader = document.querySelector('.site-header');

  function openMobileMenu() {
    if (!mobileNavToggle || !navMenu) return;
    mobileNavToggle.setAttribute('aria-expanded', 'true');
    mobileNavToggle.classList.add('is-active');
    navMenu.classList.add('open');
    document.body.classList.add('nav-menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu(returnFocus = false) {
    if (!mobileNavToggle || !navMenu) return;
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    mobileNavToggle.classList.remove('is-active');
    navMenu.classList.remove('open');
    document.body.classList.remove('nav-menu-open');
    document.body.style.overflow = '';
    if (returnFocus) {
      mobileNavToggle.focus();
    }
  }

  if (mobileNavToggle && navMenu) {
    // Ensure aria attributes are set
    mobileNavToggle.setAttribute('aria-controls', navMenu.id || 'main-nav-menu');
    if (!mobileNavToggle.hasAttribute('aria-expanded')) {
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }

    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu(true);
      }
    });

    // Close when clicking any link inside the navigation menu
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    });

    // Close if clicking outside the open menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open')) {
        if (!navMenu.contains(e.target) && !mobileNavToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Reset mobile menu if resized to desktop width (> 768px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // =========================================================================
  // 2. HEADER SCROLL & SCROLL-TO-TOP BUTTON
  // =========================================================================
  const scrollToTopBtn = document.querySelector('.float-btn-top');

  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (scrollToTopBtn) {
      if (window.scrollY > 350) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active navigation link highlighting based on current page URL
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');

  allNavLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // =========================================================================
  // 3. ACCESSIBLE FAQ ACCORDION (14 QUESTIONS)
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other accordions in the same container for clean reading
        const parentContainer = item.closest('.faq-container');
        if (parentContainer) {
          parentContainer.querySelectorAll('.faq-item.active').forEach((activeItem) => {
            if (activeItem !== item) {
              activeItem.classList.remove('active');
              const btn = activeItem.querySelector('.faq-question-btn');
              const ans = activeItem.querySelector('.faq-answer');
              if (btn) btn.setAttribute('aria-expanded', 'false');
              if (ans) ans.style.maxHeight = null;
            }
          });
        }

        if (isOpen) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // =========================================================================
  // 4. CONTACT & APPOINTMENT FORM VALIDATION
  // =========================================================================
  const appointmentForm = document.getElementById('appointment-form');
  const feedbackModal = document.getElementById('form-feedback-modal');

  if (appointmentForm) {
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Robust field validators
    const validators = {
      fullName: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your name.';
        if (trimmed.length < 2) return 'Name must be at least 2 characters long.';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name should only contain letters and standard characters.';
        return '';
      },
      email: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmed)) return 'Please enter a valid email address (e.g., name@example.com).';
        return '';
      },
      phone: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your phone number.';
        const cleaned = trimmed.replace(/[\s\-()]/g, '');
        const isIndianFormat = /^[6-9]\d{9}$/.test(cleaned);
        const isInternationalFormat = /^\+?[0-9]{10,14}$/.test(cleaned);
        if (!isIndianFormat && !isInternationalFormat) {
          return 'Please enter a valid 10-digit mobile number (e.g., 9862890897) or include country code.';
        }
        return '';
      }
    };

    function setFieldError(input, errorMsg) {
      if (!input) return;
      const formGroup = input.closest('.form-group');
      if (!formGroup) return;
      const errorDisplay = formGroup.querySelector('.error-message');

      if (errorMsg) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.setAttribute('aria-invalid', 'true');
        if (errorDisplay) {
          errorDisplay.textContent = errorMsg;
          errorDisplay.classList.add('active');
        }
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        input.setAttribute('aria-invalid', 'false');
        if (errorDisplay) {
          errorDisplay.textContent = '';
          errorDisplay.classList.remove('active');
        }
      }
    }

    // Inline blur & input validation
    [nameInput, emailInput, phoneInput].forEach((input) => {
      if (input) {
        input.addEventListener('blur', () => {
          const validator = validators[input.id];
          if (validator) {
            const error = validator(input.value);
            setFieldError(input, error);
          }
        });

        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            const validator = validators[input.id];
            if (validator) {
              const error = validator(input.value);
              setFieldError(input, error);
            }
          }
        });
      }
    });

    // Form submit
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;
      let firstInvalidInput = null;

      [nameInput, emailInput, phoneInput].forEach((input) => {
        if (input) {
          const validator = validators[input.id];
          const error = validator ? validator(input.value) : '';
          setFieldError(input, error);
          if (error) {
            hasErrors = true;
            if (!firstInvalidInput) firstInvalidInput = input;
          }
        }
      });

      if (hasErrors) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Collect data safely
      const clientName = nameInput ? nameInput.value.trim() : '';
      const clientEmail = emailInput ? emailInput.value.trim() : '';
      const clientPhone = phoneInput ? phoneInput.value.trim() : '';
      const messageVal = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'No additional message provided.';

      // Pre-fill WhatsApp message
      const whatsappText = `Hello Sakthi Dental Clinic,%0A%0AI would like to connect regarding an appointment/inquiry:%0A• Name: ${encodeURIComponent(clientName)}%0A• Phone: ${encodeURIComponent(clientPhone)}%0A• Email: ${encodeURIComponent(clientEmail)}%0A• Message: ${encodeURIComponent(messageVal)}%0A%0APlease let me know your availability. Thank you!`;
      const whatsappUrl = `https://wa.me/919862890897?text=${whatsappText}`;
      const mailtoUrl = `mailto:info@sakthidentalclinic.in?subject=Website%20Inquiry%20-%20${encodeURIComponent(clientName)}&body=${encodeURIComponent(`Dear Sakthi Dental Clinic,\n\nName: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}\n\nMessage:\n${messageVal}`)}`;

      // Display transparent feedback without claiming a fake backend saved it
      if (feedbackModal) {
        feedbackModal.innerHTML = `
          <div class="feedback-header">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h4>Thank You, ${escapeHtml(clientName)}!</h4>
          </div>
          <div class="feedback-body">
            <p>
              Your contact details have been verified. <em>Note: This website is a frontend client demonstration and does not automatically save bookings to a live database.</em>
            </p>
            <p style="font-size: 0.875rem; color: #334155; margin-bottom: 1.25rem; background: #FFFFFF; padding: 0.85rem; border-radius: 8px; border: 1px solid #A7F3D0;">
              <strong>Submitted Details:</strong><br>
              Name: ${escapeHtml(clientName)}<br>
              Phone: ${escapeHtml(clientPhone)}<br>
              Email: ${escapeHtml(clientEmail)}
            </p>
            <p style="font-size: 0.875rem; color: #475569; margin-bottom: 1.25rem;">
              To immediately connect with Dr. Anupriya and our clinic reception in Hosur, please choose a direct option below:
            </p>
          </div>
          <div class="feedback-actions">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background: #25D366; border-color: #25D366;">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.963 1.2 0.662.591 1.22.774 1.393.861.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/></svg>
              Send via WhatsApp
            </a>
            <a href="tel:+919862890897" class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call +91 9862890897
            </a>
            <a href="${mailtoUrl}" class="btn btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Send Email
            </a>
          </div>
        `;
        feedbackModal.classList.add('active');
        feedbackModal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // If hosted on Netlify, forward form submission
      if (appointmentForm.getAttribute('data-netlify') === 'true') {
        const formData = new FormData(appointmentForm);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        }).catch((err) => console.log('Netlify submission handled:', err));
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
