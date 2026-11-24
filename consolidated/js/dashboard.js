/**
 * KAPLAG Student Portal - Dashboard Page JavaScript
 * Dynamic interactions for the dashboard page
 */

// ============================================
// DASHBOARD STATE
// ============================================
const DashboardState = {
  currentDayIndex: 0,
  scheduleData: {
    Mon: [
      { course: 'MATH 55', title: 'Elementary Analysis I', time: '10:00–11:00', room: 'ACAD 201', type: 'Lecture' },
      { course: 'GE 3', title: 'Mathematics in the Modern World', time: '13:00–14:00', room: 'ACAD 101', type: 'Lecture' },
      { course: 'CS 151', title: 'Software Engineering I', time: '14:30–16:00', room: 'ACAD 303', type: 'Lecture' }
    ],
    Tue: [
      { course: 'PHYS 51', title: 'General Physics I', time: '08:00–10:00', room: 'SCI 201', type: 'Lab' },
      { course: 'CMSC 12', title: 'Discrete Mathematics', time: '10:30–12:00', room: 'ACAD 301', type: 'Lecture' },
      { course: 'STS 1', title: 'Science, Technology and Society', time: '13:00–14:30', room: 'HUM 101', type: 'Lecture' }
    ],
    Wed: [
      { course: 'MATH 55', title: 'Elementary Analysis I', time: '10:00–11:00', room: 'ACAD 201', type: 'Lecture' },
      { course: 'CS 151', title: 'Software Engineering I', time: '14:30–16:00', room: 'ACAD 303', type: 'Lecture' }
    ],
    Thu: [
      { course: 'PHYS 51', title: 'General Physics I', time: '08:00–10:00', room: 'SCI 201', type: 'Lab' },
      { course: 'CMSC 12', title: 'Discrete Mathematics', time: '10:30–12:00', room: 'ACAD 301', type: 'Lecture' }
    ],
    Fri: [
      { course: 'GE 3', title: 'Mathematics in the Modern World', time: '13:00–14:00', room: 'ACAD 101', type: 'Lecture' },
      { course: 'STS 1', title: 'Science, Technology and Society', time: '15:00–16:30', room: 'HUM 101', type: 'Lecture' }
    ]
  },
  upcomingClasses: [
    { course: 'MATH 55', title: 'Elementary Analysis I', time: '10:00–11:00', room: 'ACAD 201', day: 'Mon' },
    { course: 'GE 3', title: 'Mathematics in the Modern World', time: '13:00–14:00', room: 'ACAD 101', day: 'Mon' },
    { course: 'CS 151', title: 'Software Engineering I', time: '14:30–16:00', room: 'ACAD 303', day: 'Mon' }
  ]
};

// ============================================
// DOM ELEMENTS
// ============================================
let elements = {};

function cacheElements() {
  elements = {
    // Sidebar
    navToggle: document.getElementById('nav-toggle'),
    sidebar: document.getElementById('sidebar'),
    menuToggle: document.querySelector('.menu-toggle'),

    // Day tabs
    dayTabs: document.querySelectorAll('[role="tab"]'),
    scheduleList: document.querySelector('[aria-labelledby="classes"] ul'),
    upNext: document.querySelector('[aria-labelledby="classes"] p strong')?.parentElement,

    // Cards
    cards: document.querySelectorAll('main > section'),
    progressBar: document.querySelector('progress'),

    // Notifications
    notifBtn: document.querySelector('.icon-btn[aria-label="Notifications"]'),
    profileBtn: document.querySelector('.profile-btn'),

    // Logout
    logoutLink: document.querySelector('nav > p a[href="Login.html"]')
  };
}

// ============================================
// SIDEBAR TOGGLE ENHANCEMENT
// ============================================
function initSidebar() {
  if (!elements.navToggle || !elements.sidebar) return;

  // Close sidebar on link click (mobile)
  elements.sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 800) {
        elements.navToggle.checked = false;
      }
    });
  });

  // Close sidebar on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.navToggle.checked) {
      elements.navToggle.checked = false;
    }
  });

  // Announce sidebar state to screen readers
  elements.navToggle.addEventListener('change', () => {
    const isOpen = elements.navToggle.checked;
    elements.sidebar.setAttribute('aria-hidden', !isOpen);
    elements.menuToggle?.setAttribute('aria-expanded', isOpen);
  });
}

// ============================================
// DAY TABS FUNCTIONALITY
// ============================================
function initDayTabs() {
  if (!elements.dayTabs.length || !elements.scheduleList) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  elements.dayTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => switchDay(index));
    tab.addEventListener('keydown', (e) => {
      let newIndex = DashboardState.currentDayIndex;
      if (e.key === 'ArrowRight') newIndex = (index + 1) % days.length;
      else if (e.key === 'ArrowLeft') newIndex = (index - 1 + days.length) % days.length;
      else if (e.key === 'Home') newIndex = 0;
      else if (e.key === 'End') newIndex = days.length - 1;
      else return;

      e.preventDefault();
      elements.dayTabs[newIndex].focus();
      switchDay(newIndex);
    });
  });

  function switchDay(index) {
    if (index === DashboardState.currentDayIndex) return;

    const day = days[index];
    const schedule = DashboardState.scheduleData[day] || [];

    // Update tab states
    elements.dayTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === index);
      tab.classList.toggle('active', i === index);
    });

    DashboardState.currentDayIndex = index;

    // Animate schedule list
    elements.scheduleList.style.opacity = '0';
    elements.scheduleList.style.transform = 'translateX(10px)';

    setTimeout(() => {
      elements.scheduleList.innerHTML = schedule.map(item => `
        <li>
          <strong>${item.course}</strong> · ${item.title}<br>
          ${item.time} · ${item.room} · ${item.type}
        </li>
      `).join('');

      elements.scheduleList.style.opacity = '1';
      elements.scheduleList.style.transform = 'translateX(0)';
    }, 150);

    // Update "Up next" if it's the current day
    updateUpNext(day);
  }
}

function updateUpNext(day) {
  if (!elements.upNext) return;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const dayMap = { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri' };

  if (dayMap[day] === today) {
    const nextClass = DashboardState.upcomingClasses.find(c => c.day === day);
    if (nextClass) {
      elements.upNext.innerHTML = `<strong>Up next:</strong> ${nextClass.course} · ${nextClass.time} · ${nextClass.room}`;
    }
  }
}

// ============================================
// PROGRESS BAR ANIMATION
// ============================================
function initProgressBar() {
  if (!elements.progressBar) return;

  const targetValue = parseInt(elements.progressBar.value, 10);
  const maxValue = parseInt(elements.progressBar.max, 10);

  // Reset to 0
  elements.progressBar.value = 0;

  // Animate on scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        KAPLAG.animateCountUp(elements.progressBar, 0, targetValue, 1500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(elements.progressBar);
}

// ============================================
// CARD ENTRANCE ANIMATIONS
// ============================================
function initCardAnimations() {
  if (!elements.cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.cards.forEach(card => observer.observe(card));
}

// ============================================
// NOTIFICATION DROPDOWN
// ============================================
function initNotifications() {
  if (!elements.notifBtn) return;

  const notifications = [
    { title: 'Grade posted: MATH 55', time: '2 hours ago', unread: true },
    { title: 'Enrollment period announced', time: '1 day ago', unread: true },
    { title: 'INC grade deadline approaching', time: '3 days ago', unread: false },
    { title: 'New announcement from OUR', time: '5 days ago', unread: false }
  ];

  let dropdown = null;

  function createDropdown() {
    dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.innerHTML = `
      <div class="notif-header">
        <h3>Notifications</h3>
        <button class="mark-all-read" aria-label="Mark all as read">Mark all read</button>
      </div>
      <div class="notif-list">
        ${notifications.map((notif, i) => `
          <button class="notif-item ${notif.unread ? 'unread' : ''}" role="menuitem" data-index="${i}">
            <span class="notif-title">${notif.title}</span>
            <span class="notif-time">${notif.time}</span>
            ${notif.unread ? '<span class="unread-dot" aria-hidden="true"></span>' : ''}
          </button>
        `).join('')}
      </div>
      <div class="notif-footer">
        <a href="Announcements.html">View all notifications</a>
      </div>
    `;

    document.body.appendChild(dropdown);

    // Position dropdown
    positionDropdown();

    // Event listeners
    dropdown.querySelector('.mark-all-read').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.querySelectorAll('.unread').forEach(el => el.classList.remove('unread'));
      dropdown.querySelectorAll('.unread-dot').forEach(el => el.remove());
      elements.notifBtn.querySelector('.notif-dot')?.remove();
      KAPLAG.showToast('All notifications marked as read', 'success');
    });

    dropdown.querySelectorAll('.notif-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.remove('unread');
        item.querySelector('.unread-dot')?.remove();
        checkUnreadCount();
      });
    });

    // Close on outside click
    document.addEventListener('click', closeDropdown, { once: true });
  }

  function positionDropdown() {
    if (!dropdown) return;
    const rect = elements.notifBtn.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + 8}px`;
    dropdown.style.right = `${window.innerWidth - rect.right}px`;
  }

  function closeDropdown() {
    if (dropdown) {
      dropdown.remove();
      dropdown = null;
    }
  }

  function checkUnreadCount() {
    const unreadCount = dropdown?.querySelectorAll('.unread').length || 0;
    const dot = elements.notifBtn.querySelector('.notif-dot');
    if (unreadCount > 0 && !dot) {
      const newDot = document.createElement('span');
      newDot.className = 'notif-dot';
      newDot.setAttribute('aria-hidden', 'true');
      elements.notifBtn.appendChild(newDot);
    } else if (unreadCount === 0 && dot) {
      dot.remove();
    }
  }

  elements.notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown) {
      closeDropdown();
    } else {
      createDropdown();
    }
  });
}

// ============================================
// PROFILE DROPDOWN
// ============================================
function initProfileDropdown() {
  if (!elements.profileBtn) return;

  let dropdown = null;

  function createDropdown() {
    dropdown = document.createElement('div');
    dropdown.className = 'profile-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.innerHTML = `
      <div class="profile-dropdown-header">
        <span class="avatar" aria-hidden="true">VK</span>
        <div>
          <strong>Vanz Kean</strong>
          <small>2026-17196</small>
        </div>
      </div>
      <div class="profile-dropdown-divider"></div>
      <button role="menuitem"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg> Profile</button>
      <button role="menuitem"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Settings</button>
      <button role="menuitem"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Log out</button>
    `;

    document.body.appendChild(dropdown);
    positionDropdown();

    // Event listeners
    dropdown.querySelectorAll('[role="menuitem"]').forEach((item, i) => {
      item.addEventListener('click', () => {
        if (i === 2) { // Log out
          handleLogout();
        } else {
          KAPLAG.showToast(`${item.textContent.trim()} - Coming soon`, 'info');
        }
        closeDropdown();
      });
    });

    document.addEventListener('click', closeDropdown, { once: true });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    }, { once: true });
  }

  function positionDropdown() {
    if (!dropdown) return;
    const rect = elements.profileBtn.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + 8}px`;
    dropdown.style.right = `${window.innerWidth - rect.right}px`;
  }

  function closeDropdown() {
    if (dropdown) {
      dropdown.remove();
      dropdown = null;
    }
  }

  function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
      KAPLAG.showToast('Logging out...', 'info');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    }
  }

  elements.profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown) closeDropdown();
    else createDropdown();
  });
}

// ============================================
// AUTO-UPDATE GREETING BASED ON TIME
// ============================================
function initGreeting() {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';

    greetingEl.textContent = `${greeting}, Vanz Kean`;
  }

  updateGreeting();
  // Update every minute
  setInterval(updateGreeting, 60000);
}

// ============================================
// COUNTDOWN FOR UPCOMING DEADLINES
// ============================================
function initDeadlineCountdowns() {
  const deadlineItems = document.querySelectorAll('[aria-labelledby="attention"] li');

  function updateCountdowns() {
    const deadlines = [
      { date: '2026-09-15', label: 'Due' },
      { date: '2026-09-30', label: 'Deadline' },
      { date: '2026-10-05', label: 'Deadline' },
      { date: '2026-10-15', label: 'Deadline' }
    ];

    deadlineItems.forEach((item, index) => {
      const deadline = deadlines[index];
      if (!deadline) return;

      const targetDate = new Date(deadline.date);
      const now = new Date();
      const diffTime = targetDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const daysLeftEl = item.querySelector('br:last-of-type')?.nextSibling;
      if (daysLeftEl && daysLeftEl.nodeType === Node.TEXT_NODE) {
        if (diffDays <= 0) {
          daysLeftEl.textContent = ` ${deadline.label} today!`;
          item.style.color = 'var(--primary)';
        } else if (diffDays === 1) {
          daysLeftEl.textContent = ` 1 day left`;
        } else {
          daysLeftEl.textContent = ` ${diffDays} days left`;
        }
      }
    });
  }

  updateCountdowns();
  // Update daily at midnight
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const msUntilMidnight = tomorrow - now;
  setTimeout(() => {
    updateCountdowns();
    setInterval(updateCountdowns, 24 * 60 * 60 * 1000);
  }, msUntilMidnight);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        KAPLAG.smoothScrollTo(target, 80);
        target.focus({ preventScroll: true });
      }
    });
  });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Alt + M: Toggle sidebar
    if (e.altKey && e.key === 'm') {
      e.preventDefault();
      elements.navToggle?.click();
    }

    // Alt + N: Open notifications
    if (e.altKey && e.key === 'n') {
      e.preventDefault();
      elements.notifBtn?.click();
    }

    // Alt + P: Open profile
    if (e.altKey && e.key === 'p') {
      e.preventDefault();
      elements.profileBtn?.click();
    }

    // / : Focus search (if added later)
    if (e.key === '/' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      // Could focus a search input if implemented
    }
  });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();

  initSidebar();
  initDayTabs();
  initProgressBar();
  initCardAnimations();
  initNotifications();
  initProfileDropdown();
  initGreeting();
  initDeadlineCountdowns();
  initSmoothScroll();
  initKeyboardShortcuts();

  // Add loaded class for CSS transitions
  document.body.classList.add('js-loaded');

  console.log('KAPLAG Dashboard initialized');
});

// Handle page visibility change (pause animations when hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});