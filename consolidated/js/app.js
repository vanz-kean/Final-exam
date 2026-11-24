/**
 * KAPLAG Student Portal - Shared Utilities
 * Common functions used across pages
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit rate of execution
 */
function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * Throttle function to limit execution frequency
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold &&
    rect.left <= windowWidth * (1 - threshold) &&
    rect.right >= windowWidth * threshold
  );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element, offset = 0) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Format time remaining (e.g., "2h 30m", "45m", "5m")
 */
function formatTimeRemaining(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (diff <= 0) return 'Now';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * Animate number counting up
 */
function animateCountUp(element, start, end, duration = 1000) {
  const startTime = performance.now();
  const isProgress = element.tagName === 'PROGRESS';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + (end - start) * eased);

    if (isProgress) {
      element.value = current;
      element.textContent = `${current} of ${element.max} units`;
    } else {
      element.textContent = current;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Add entrance animation to elements
 */
function addEntranceAnimation(elements, delay = 100, baseClass = 'animate-in') {
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * delay}ms, transform 0.5s ease ${index * delay}ms`;

    // Force reflow
    el.offsetHeight;

    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.classList.add(baseClass);
    });
  });
}

/**
 * Create ripple effect on click
 */
function createRipple(event, element) {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
  const container = getOrCreateToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function getOrCreateToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }
  return container;
}

/**
 * Initialize dark mode from system preference or localStorage
 */
function initDarkMode() {
  const saved = localStorage.getItem('kaplag-dark-mode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved !== null ? saved === 'true' : prefersDark;

  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  return isDark;
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('kaplag-dark-mode', newTheme === 'dark');
  return newTheme === 'dark';
}

// ============================================
// EXPORTS (for module usage)
// ============================================
window.KAPLAG = {
  debounce,
  throttle,
  isInViewport,
  smoothScrollTo,
  formatTimeRemaining,
  animateCountUp,
  addEntranceAnimation,
  createRipple,
  showToast,
  initDarkMode,
  toggleDarkMode
};

// ============================================
// AUTO-INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();

  // Add ripple effect to buttons
  document.querySelectorAll('button:not([type="submit"])').forEach(btn => {
    btn.addEventListener('click', (e) => createRipple(e, btn));
  });

  // Keyboard navigation for custom elements
  document.addEventListener('keydown', (e) => {
    // Escape key closes dropdowns/modals
    if (e.key === 'Escape') {
      document.querySelectorAll('[open]').forEach(el => el.removeAttribute('open'));
      document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
    }
  });
});