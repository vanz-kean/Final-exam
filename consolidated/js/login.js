/**
 * KAPLAG Student Portal - Login Page JavaScript
 * Dynamic interactions for the login page
 */

// ============================================
// DEMO CREDENTIALS
// ============================================
const DEMO_CREDENTIALS = {
  studentNumber: '2026-17196',
  password: 'UPMin@2026'
};

// ============================================
// DOM ELEMENTS
// ============================================
let elements = {};

function cacheElements() {
  elements = {
    form: document.querySelector('main > form'),
    studentNumber: document.getElementById('student-number'),
    password: document.getElementById('password'),
    rememberMe: document.querySelector('input[name="remember"]'),
    signInBtn: document.querySelector('main > form button[type="submit"]'),
    autofillBtn: document.querySelector('main > section button'),
    forgotPassword: document.querySelector('main > form a[href="#"]'),
    demoSection: document.querySelector('main > section'),
    passwordToggle: null // Will be created
  };
}

// ============================================
// PASSWORD VISIBILITY TOGGLE
// ============================================
function initPasswordToggle() {
  if (!elements.password) return;

  // Create toggle button
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'password-toggle';
  toggle.setAttribute('aria-label', 'Show password');
  toggle.setAttribute('aria-pressed', 'false');
  toggle.innerHTML = `
    <svg class="icon-eye" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    <svg class="icon-eye-off" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  `;

  // Insert after password input
  elements.password.parentNode.insertBefore(toggle, elements.password.nextSibling);
  elements.passwordToggle = toggle;

  toggle.addEventListener('click', () => {
    const isPassword = elements.password.type === 'password';
    elements.password.type = isPassword ? 'text' : 'password';
    toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    toggle.setAttribute('aria-pressed', isPassword);
    toggle.classList.toggle('showing', isPassword);
  });
}

// ============================================
// AUTO-FILL DEMO CREDENTIALS
// ============================================
function initAutofill() {
  if (!elements.autofillBtn || !elements.studentNumber || !elements.password) return;

  elements.autofillBtn.addEventListener('click', () => {
    // Animate the inputs
    [elements.studentNumber, elements.password].forEach((input, index) => {
      input.style.transition = 'background-color 0.3s ease';
      input.style.backgroundColor = 'var(--primary-light)';

      setTimeout(() => {
        if (input === elements.studentNumber) {
          input.value = DEMO_CREDENTIALS.studentNumber;
        } else {
          input.value = DEMO_CREDENTIALS.password;
        }
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }, index * 100);

      setTimeout(() => {
        input.style.backgroundColor = '';
      }, 600);
    });

    // Focus the sign in button
    setTimeout(() => {
      elements.signInBtn.focus();
      KAPLAG.showToast('Demo credentials filled in', 'success');
    }, 300);
  });
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
  if (!elements.form || !elements.studentNumber || !elements.password) return;

  // Real-time validation
  const validators = {
    'student-number': {
      validate: (value) => value.length >= 8,
      message: 'Student number must be at least 8 characters'
    },
    'password': {
      validate: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters'
    }
  };

  function validateField(input) {
    const validator = validators[input.id];
    if (!validator) return true;

    const isValid = validator.validate(input.value);
    const errorEl = input.parentNode.querySelector('.field-error');

    if (!isValid && input.value.length > 0) {
      if (!errorEl) {
        const error = document.createElement('span');
        error.className = 'field-error';
        error.textContent = validator.message;
        error.setAttribute('aria-live', 'polite');
        input.parentNode.appendChild(error);
      }
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('invalid');
    } else {
      if (errorEl) errorEl.remove();
      input.setAttribute('aria-invalid', 'false');
      input.classList.remove('invalid');
    }

    return isValid;
  }

  // Validate on blur
  [elements.studentNumber, elements.password].forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        validateField(input);
      }
    });
  });

  // Form submission
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isStudentValid = validateField(elements.studentNumber);
    const isPasswordValid = validateField(elements.password);

    if (!isStudentValid || !isPasswordValid) {
      KAPLAG.showToast('Please fix the errors above', 'error');
      return;
    }

    // Check demo credentials
    const isDemo = elements.studentNumber.value === DEMO_CREDENTIALS.studentNumber &&
                   elements.password.value === DEMO_CREDENTIALS.password;

    // Show loading state
    elements.signInBtn.classList.add('loading');
    elements.signInBtn.disabled = true;
    elements.signInBtn.innerHTML = `
      <svg class="spinner" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 60" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
      Signing in...
    `;

    // Simulate API call
    setTimeout(() => {
      elements.signInBtn.classList.remove('loading');
      elements.signInBtn.disabled = false;
      elements.signInBtn.textContent = 'Sign in';

      if (isDemo) {
        KAPLAG.showToast('Welcome back, Vanz Kean!', 'success');

        // Store session
        if (elements.rememberMe.checked) {
          localStorage.setItem('kaplag-session', JSON.stringify({
            studentNumber: DEMO_CREDENTIALS.studentNumber,
            name: 'Vanz Kean',
            timestamp: Date.now()
          }));
        } else {
          sessionStorage.setItem('kaplag-session', JSON.stringify({
            studentNumber: DEMO_CREDENTIALS.studentNumber,
            name: 'Vanz Kean',
            timestamp: Date.now()
          }));
        }

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      } else {
        KAPLAG.showToast('Invalid credentials. Try the demo account.', 'error');
        elements.password.value = '';
        elements.password.focus();
      }
    }, 1500);
  });
}

// ============================================
// FORM ENHANCEMENTS
// ============================================
function initFormEnhancements() {
  // Floating label effect
  const inputs = document.querySelectorAll('main > form input[type="text"], main > form input[type="password"]');

  inputs.forEach(input => {
    const label = input.previousElementSibling;
    if (!label || label.tagName !== 'LABEL') return;

    // Check initial state
    if (input.value) {
      label.classList.add('has-value');
    }

    input.addEventListener('focus', () => {
      label.classList.add('focused');
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      label.classList.remove('focused');
      input.parentElement.classList.remove('focused');
      if (input.value) {
        label.classList.add('has-value');
      } else {
        label.classList.remove('has-value');
      }
    });

    input.addEventListener('input', () => {
      if (input.value) {
        label.classList.add('has-value');
      } else {
        label.classList.remove('has-value');
      }
    });
  });

  // Remember me - restore from localStorage
  const rememberMe = elements.rememberMe;
  if (rememberMe) {
    const saved = localStorage.getItem('kaplag-remember');
    if (saved) {
      const data = JSON.parse(saved);
      elements.studentNumber.value = data.studentNumber;
      rememberMe.checked = true;
      label.classList.add('has-value');
    }

    rememberMe.addEventListener('change', () => {
      if (rememberMe.checked) {
        localStorage.setItem('kaplag-remember', JSON.stringify({
          studentNumber: elements.studentNumber.value
        }));
      } else {
        localStorage.removeItem('kaplag-remember');
      }
    });
  }
}

// ============================================
// ENTRANCE ANIMATIONS
// ============================================
function initEntranceAnimations() {
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  if (main) {
    main.style.opacity = '0';
    main.style.transform = 'translateY(30px)';
    main.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }

  if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
  }

  requestAnimationFrame(() => {
    if (main) {
      main.style.opacity = '1';
      main.style.transform = 'translateY(0)';
    }
    if (footer) {
      footer.style.opacity = '1';
      footer.style.transform = 'translateY(0)';
    }
  });

  // Staggered animation for form elements
  const formElements = document.querySelectorAll('main > form > p, main > form button, main > section');
  formElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = `opacity 0.4s ease ${100 + index * 80}ms, transform 0.4s ease ${100 + index * 80}ms`;
  });

  setTimeout(() => {
    formElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 200);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Enter on autofill button
    if (e.key === 'Enter' && e.target === elements.autofillBtn) {
      e.preventDefault();
      elements.autofillBtn.click();
    }

    // Escape clears form
    if (e.key === 'Escape') {
      elements.studentNumber.blur();
      elements.password.blur();
    }
  });
}

// ============================================
// CHECK FOR EXISTING SESSION
// ============================================
function checkExistingSession() {
  const session = sessionStorage.getItem('kaplag-session') || localStorage.getItem('kaplag-session');
  if (session) {
    try {
      const data = JSON.parse(session);
      // Check if session is less than 24 hours old
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        if (confirm(`Welcome back, ${data.name}! Continue to dashboard?`)) {
          window.location.href = 'index.html';
          return true;
        } else {
          // Clear session
          sessionStorage.removeItem('kaplag-session');
          localStorage.removeItem('kaplag-session');
        }
      }
    } catch (e) {
      console.warn('Invalid session data');
    }
  }
  return false;
}

// ============================================
// FORGOT PASSWORD
// ============================================
function initForgotPassword() {
  if (!elements.forgotPassword) return;

  elements.forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    KAPLAG.showToast('Password reset: Contact registrar@upmin.edu.ph', 'info');
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Check for existing session first
  if (checkExistingSession()) return;

  cacheElements();

  initPasswordToggle();
  initAutofill();
  initFormValidation();
  initFormEnhancements();
  initEntranceAnimations();
  initKeyboardShortcuts();
  initForgotPassword();

  // Add loaded class
  document.body.classList.add('js-loaded');

  // Focus student number input
  setTimeout(() => {
    elements.studentNumber?.focus();
  }, 500);

  console.log('KAPLAG Login initialized');
});