/**
 * KAPLAG - Privacy Notice Page JavaScript
 * Handles: expand/collapse all sections, read-and-understood behavior, copy buttons
 */

(() => {
  'use strict';

  // ============================================
  // EXPAND/COLLAPSE ALL SECTIONS
  // ============================================
  const expandAllBtn = document.getElementById('expand-all');
  const collapseAllBtn = document.getElementById('collapse-all');
  const contentSections = document.querySelectorAll('.content-section details');

  function expandAll() {
    contentSections.forEach(detail => detail.open = true);
    // Show toast notification
    if (window.KAPLAG && window.KAPLAG.toast) {
      window.KAPLAG.toast.show('All sections expanded', 'info');
    }
  }

  function collapseAll() {
    contentSections.forEach(detail => detail.open = false);
    if (window.KAPLAG && window.KAPLAG.toast) {
      window.KAPLAG.toast.show('All sections collapsed', 'info');
    }
  }

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', expandAll);
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', collapseAll);
  }

  // ============================================
  // COPY BUTTONS FOR EMAIL ADDRESSES
  // ============================================
  function addCopyButtons() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      // Avoid adding multiple buttons
      if (link.parentElement.querySelector('.copy-btn')) return;

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = 'Copy';
      copyBtn.style.cssText = `
        margin-left: 8px;
        padding: 2px 8px;
        font-size: 0.75rem;
        background: var(--primary-light);
        color: var(--primary);
        border: 1px solid var(--primary);
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      `;

      copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.background = 'var(--primary)';
        copyBtn.style.color = 'var(--on-primary)';
      });
      copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.background = 'var(--primary-light)';
        copyBtn.style.color = 'var(--primary)';
      });

      copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        try {
          await navigator.clipboard.writeText(email);
          copyBtn.textContent = 'Copied!';
          copyBtn.style.background = 'var(--primary-dark)';
          copyBtn.style.color = 'var(--on-primary)';
          copyBtn.style.borderColor = 'var(--primary-dark)';

          if (window.KAPLAG && window.KAPLAG.toast) {
            window.KAPLAG.toast.show(`Copied: ${email}`, 'success');
          }

          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.style.background = 'var(--primary-light)';
            copyBtn.style.color = 'var(--primary)';
            copyBtn.style.borderColor = 'var(--primary)';
          }, 2000);
        } catch (err) {
          if (window.KAPLAG && window.KAPLAG.toast) {
            window.KAPLAG.toast.show('Failed to copy email', 'error');
          }
        }
      });

      link.parentElement.appendChild(copyBtn);
    });
  }

  // ============================================
  // READ AND UNDERSTOOD CHECKBOX
  // ============================================
  const ackForm = document.querySelector('#ack form');
  const ackCheckbox = document.querySelector('#ack input[type="checkbox"]');
  const confirmBtn = document.querySelector('#ack button[type="submit"]');

  if (ackForm && ackCheckbox && confirmBtn) {
    // Check if already acknowledged (from localStorage)
    const acknowledged = localStorage.getItem('privacy-acknowledged') === 'true';
    if (acknowledged) {
      ackCheckbox.checked = true;
      confirmBtn.disabled = true;
      confirmBtn.textContent = 'Acknowledged';
      confirmBtn.style.opacity = '0.6';
      confirmBtn.style.cursor = 'not-allowed';
    }

    ackCheckbox.addEventListener('change', () => {
      confirmBtn.disabled = !ackCheckbox.checked;
    });

    ackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (ackCheckbox.checked) {
        localStorage.setItem('privacy-acknowledged', 'true');
        ackCheckbox.disabled = true;
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Acknowledged';
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'not-allowed';

        if (window.KAPLAG && window.KAPLAG.toast) {
          window.KAPLAG.toast.show('Thank you for confirming you have read the privacy notice.', 'success');
        }
      }
    });
  }

  // ============================================
  // TABLE OF CONTENTS SMOOTH SCROLL
  // ============================================
  const tocLinks = document.querySelectorAll('nav[aria-labelledby="toc-title"] a');
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        // Open the details if it's closed
        const details = target.closest('details');
        if (details) details.open = true;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.focus({ preventScroll: true });

        // Highlight briefly
        target.style.transition = 'background 0.5s';
        target.style.background = 'var(--primary-light)';
        setTimeout(() => {
          target.style.background = '';
        }, 1500);
      }
    });
  });

  // ============================================
  // PRINT FRIENDLY - EXPAND ALL ON PRINT
  // ============================================
  window.addEventListener('beforeprint', () => {
    contentSections.forEach(detail => detail.open = true);
  });

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + E to expand all
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      expandAll();
    }
    // Ctrl/Cmd + Shift + C to collapse all
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      collapseAll();
    }
  });

  // ============================================
  // INITIALIZATION
  // ============================================
  // Add expand/collapse buttons at the top of the page
  const tocNav = document.querySelector('nav[aria-labelledby="toc-title"]');
  if (tocNav && !document.getElementById('expand-all')) {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;';
    buttonContainer.innerHTML = `
      <button type="button" id="expand-all" style="
        padding: 8px 16px;
        background: var(--primary);
        color: var(--on-primary);
        border: none;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      ">Expand All</button>
      <button type="button" id="collapse-all" style="
        padding: 8px 16px;
        background: var(--surface);
        color: var(--primary);
        border: 1px solid var(--primary);
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      ">Collapse All</button>
    `;
    tocNav.appendChild(buttonContainer);

    // Re-attach event listeners
    const newExpandBtn = document.getElementById('expand-all');
    const newCollapseBtn = document.getElementById('collapse-all');
    if (newExpandBtn) newExpandBtn.addEventListener('click', expandAll);
    if (newCollapseBtn) newCollapseBtn.addEventListener('click', collapseAll);
  }

  // Add copy buttons to email links
  addCopyButtons();

  // Add keyboard shortcut hint
  const shortcutHint = document.createElement('p');
  shortcutHint.style.cssText = 'font-size: 0.75rem; color: var(--muted); margin-top: 8px;';
  shortcutHint.textContent = 'Shortcuts: Ctrl+Shift+E (Expand All) · Ctrl+Shift+C (Collapse All)';
  if (tocNav) {
    tocNav.appendChild(shortcutHint);
  }
})();