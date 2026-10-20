/**
 * Sakthi Dental Clinic - Shared Vanilla JavaScript (script.js)
 * Clean, accessible, zero-dependency interactivity:
 * - Responsive mobile navigation with ARIA support
 * - Accessible FAQ accordion
 * - Strict client-side form validation (Email, Phone, Name)
 * - Transparent appointment dispatch (WhatsApp / Direct Call / Mailto)
 * - Header shadow on scroll & scroll-to-top button
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Responsive Navigation Menu & Header Scroll ---
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const siteHeader = document.querySelector('.site-header');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('open');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        mobileNavToggle.focus();
      }
    });

    // Close when clicking a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Scroll to Top Button Visibility
    const scrollToTopBtn = document.querySelector('.float-btn-top');
    if (scrollToTopBtn) {
      if (window.scrollY > 350) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  // Scroll to Top action
  const scrollToTopBtn = document.querySelector('.float-btn-top');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 2. Active Page Link Highlighting ---
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

  // --- 3. Accessible FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Optional: close other open accordions within the same container for clean reading
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

  // --- 4. Robust Form Validation & Transparent Appointment Workflow ---
  const appointmentForm = document.getElementById('appointment-form');
  const feedbackModal = document.getElementById('form-feedback-modal');

  if (appointmentForm) {
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const treatmentInput = document.getElementById('treatment');
    const dateInput = document.getElementById('preferredDate');
    const slotInput = document.getElementById('preferredSlot');
    const messageInput = document.getElementById('message');

    // Validation Rules
    const validators = {
      fullName: (value) => {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your full name.';
        if (trimmed.length < 2) return 'Name must be at least 2 characters.';
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name should only contain letters and standard punctuation.';
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
        if (!trimmed) return 'Please enter your contact phone number.';
        // Clean characters for checking
        const cleaned = trimmed.replace(/[\s\-()]/g, '');
        // Validate Indian 10-digit mobile or international format (10-14 digits)
        const isIndianFormat = /^[6-9]\d{9}$/.test(cleaned);
        const isInternationalFormat = /^\+?[0-9]{10,14}$/.test(cleaned);
        if (!isIndianFormat && !isInternationalFormat) {
          return 'Please enter a valid 10-digit mobile number (e.g., 9862890897) or include country code.';
        }
        return '';
      }
    };

    // Helper: Show field error
    function setFieldError(input, errorMsg) {
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

    // Live validation on blur
    [nameInput, emailInput, phoneInput].forEach((input) => {
      if (input) {
        input.addEventListener('blur', () => {
          const validator = validators[input.id];
          if (validator) {
            const error = validator(input.value);
            setFieldError(input, error);
          }
        });

        // Clear error as user types
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

    // Form submit listener
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;
      let firstInvalidInput = null;

      // Validate required fields
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

      // Collect validated details
      const clientName = nameInput.value.trim();
      const clientEmail = emailInput.value.trim();
      const clientPhone = phoneInput.value.trim();
      const treatmentVal = treatmentInput ? treatmentInput.value : 'General Consultation';
      const dateVal = dateInput && dateInput.value ? dateInput.value : 'Flexible / Next Available';
      const slotVal = slotInput && slotInput.value ? slotInput.value : 'Anytime';
      const messageVal = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'No extra notes provided.';

      // Construct transparent WhatsApp message for clinic numbers (+91 9862890897)
      const whatsappText = `Hello Sakthi Dental Clinic,%0A%0AI would like to request an appointment:%0A• Name: ${encodeURIComponent(clientName)}%0A• Phone: ${encodeURIComponent(clientPhone)}%0A• Email: ${encodeURIComponent(clientEmail)}%0A• Treatment: ${encodeURIComponent(treatmentVal)}%0A• Preferred Date: ${encodeURIComponent(dateVal)}%0A• Preferred Time: ${encodeURIComponent(slotVal)}%0A• Message: ${encodeURIComponent(messageVal)}%0A%0APlease confirm availability. Thank you!`;

      const whatsappUrl = `https://wa.me/919862890897?text=${whatsappText}`;
      const mailtoUrl = `mailto:info@sakthidentalclinic.in?subject=Appointment%20Request%20-%20${encodeURIComponent(clientName)}&body=${encodeURIComponent(`Dear Sakthi Dental Clinic,\n\nName: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}\nTreatment: ${treatmentVal}\nDate: ${dateVal}\nTime: ${slotVal}\n\nNote:\n${messageVal}`)}`;

      // Display transparent feedback card
      if (feedbackModal) {
        feedbackModal.innerHTML = `
          <div class="feedback-header">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h4>Appointment Request Prepared Successfully</h4>
          </div>
          <div class="feedback-body">
            <p>
              Thank you, <strong>${escapeHtml(clientName)}</strong>. Your appointment request for <strong>${escapeHtml(treatmentVal)}</strong> has been verified.
            </p>
            <p style="font-size: 0.875rem; color: #334155; margin-bottom: 1.25rem; background: #FFFFFF; padding: 0.85rem; border-radius: 8px; border: 1px solid #A7F3D0;">
              <strong>Summary:</strong><br>
              Phone: ${escapeHtml(clientPhone)} | Preferred Date: ${escapeHtml(dateVal)} (${escapeHtml(slotVal)})
            </p>
            <p style="font-size: 0.85rem; color: #475569; margin-bottom: 1.25rem;">
              To ensure immediate scheduling without delay, connect directly with our clinic desk in Hosur via WhatsApp or direct phone call below. Our team is available 9 AM to 7 PM every day.
            </p>
          </div>
          <div class="feedback-actions">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background: #25D366; border-color: #25D366;">
              <svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.963 1.2 0.662.591 1.22.774 1.393.861.173.086.275.072.376-.044.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.419-.101.824z"/></svg>
              Send via WhatsApp to Clinic
            </a>
            <a href="tel:+919862890897" class="btn btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Call +91 9862890897
            </a>
            <a href="${mailtoUrl}" class="btn btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email Clinic Desk
            </a>
          </div>
        `;
        feedbackModal.classList.add('active');
        feedbackModal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // If user is hosting with Netlify Forms, let Netlify handle native POST in background
      if (appointmentForm.getAttribute('data-netlify') === 'true') {
        const formData = new FormData(appointmentForm);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        }).catch((err) => console.log('Netlify form submission caught:', err));
      }
    });
  }

  // Helper to prevent HTML injection in feedback summary
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
