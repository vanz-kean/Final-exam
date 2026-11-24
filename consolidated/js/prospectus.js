/**
 * KAPLAG - Prospectus Page JavaScript
 * Handles: expand/collapse terms, filter "Not yet taken", search by course code, live unit totals
 */

(() => {
  'use strict';

  // ============================================
  // EXPAND/COLLAPSE TERMS
  // ============================================
  const expandAllBtn = document.getElementById('expand-all');
  const collapseAllBtn = document.getElementById('collapse-all');
  const termDetails = document.querySelectorAll('.content-section details');

  function expandAll() {
    termDetails.forEach(detail => detail.open = true);
  }

  function collapseAll() {
    termDetails.forEach(detail => detail.open = false);
  }

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', expandAll);
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', collapseAll);
  }

  // ============================================
  // SEARCH / FILTER FUNCTIONALITY
  // ============================================
  const searchInput = document.getElementById('prospectus-search');
  const filterSelect = document.getElementById('prospectus-filter');
  const termSections = document.querySelectorAll('.card-full');
  const unitTotals = document.querySelectorAll('.unit-total');

  function filterCourses() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const filterValue = filterSelect?.value || 'all';

    termSections.forEach(section => {
      const table = section.querySelector('.prospectus-table');
      if (!table) return;

      const rows = table.querySelectorAll('tbody tr');
      let visibleCount = 0;

      rows.forEach(row => {
        const courseCode = row.querySelector('th')?.textContent.toLowerCase() || '';
        const courseName = row.querySelector('th')?.textContent.toLowerCase() || '';
        const prerequisite = row.querySelector('td')?.textContent.toLowerCase() || '';
        const gradeCell = row.querySelectorAll('td')[3];
        const grade = gradeCell?.textContent.trim() || '';

        // Filter logic
        const matchesSearch = courseCode.includes(searchTerm) ||
                             courseName.includes(searchTerm) ||
                             prerequisite.includes(searchTerm);

        let matchesFilter = true;
        if (filterValue === 'nottaken') {
          matchesFilter = !grade || grade === '' || grade === '-';
        } else if (filterValue === 'taken') {
          matchesFilter = grade && grade !== '' && grade !== '-';
        }

        const shouldShow = matchesSearch && matchesFilter;
        row.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount++;
      });

      // Update section visibility based on visible rows
      const hasVisibleRows = visibleCount > 0;
      section.style.display = hasVisibleRows ? '' : 'none';
    });

    updateUnitTotals();
  }

  function updateUnitTotals() {
    termSections.forEach(section => {
      const table = section.querySelector('.prospectus-table');
      if (!table) return;

      const rows = table.querySelectorAll('tbody tr');
      let totalUnits = 0;
      let takenUnits = 0;

      rows.forEach(row => {
        if (row.style.display === 'none') return;

        const unitsCell = row.querySelector('td');
        const units = parseInt(unitsCell?.textContent.trim()) || 0;
        totalUnits += units;

        const gradeCell = row.querySelectorAll('td')[3];
        const grade = gradeCell?.textContent.trim() || '';
        if (grade && grade !== '' && grade !== '-') {
          takenUnits += units;
        }
      });

      const totalEl = section.querySelector('.unit-total-total');
      const takenEl = section.querySelector('.unit-total-taken');
      const remainingEl = section.querySelector('.unit-total-remaining');

      if (totalEl) totalEl.textContent = totalUnits;
      if (takenEl) takenEl.textContent = takenUnits;
      if (remainingEl) remainingEl.textContent = totalUnits - takenUnits;
    });

    // Update overall totals
    updateOverallTotals();
  }

  function updateOverallTotals() {
    let grandTotal = 0;
    let grandTaken = 0;

    termSections.forEach(section => {
      const table = section.querySelector('.prospectus-table');
      if (!table) return;

      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        if (row.style.display === 'none') return;
        const unitsCell = row.querySelector('td');
        const units = parseInt(unitsCell?.textContent.trim()) || 0;
        grandTotal += units;

        const gradeCell = row.querySelectorAll('td')[3];
        const grade = gradeCell?.textContent.trim() || '';
        if (grade && grade !== '' && grade !== '-') {
          grandTaken += units;
        }
      });
    });

    const overallTotal = document.getElementById('overall-total');
    const overallTaken = document.getElementById('overall-taken');
    const overallRemaining = document.getElementById('overall-remaining');
    const overallProgress = document.getElementById('overall-progress');

    if (overallTotal) overallTotal.textContent = grandTotal;
    if (overallTaken) overallTaken.textContent = grandTaken;
    if (overallRemaining) overallRemaining.textContent = grandTotal - grandTaken;
    if (overallProgress) {
      overallProgress.value = grandTaken;
      overallProgress.max = grandTotal;
    }
  }

  // Event listeners for search and filter
  if (searchInput) {
    searchInput.addEventListener('input', filterCourses);
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', filterCourses);
  }

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      if (searchInput && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }

    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      filterCourses();
      searchInput.blur();
    }
  });

  // ============================================
  // INITIALIZATION
  // ============================================
  // Add unit total displays to each term section
  termSections.forEach(section => {
    const table = section.querySelector('.prospectus-table');
    if (!table) return;

    const tfoot = table.querySelector('tfoot');
    if (tfoot) {
      const totalRow = tfoot.querySelector('tr');
      if (totalRow) {
        // Add unit breakdown after the total
        const breakdown = document.createElement('tr');
        breakdown.innerHTML = `
          <td colspan="2"><strong>Units Breakdown:</strong></td>
          <td colspan="5" class="unit-breakdown">
            Total: <span class="unit-total-total">0</span> |
            Taken: <span class="unit-total-taken">0</span> |
            Remaining: <span class="unit-total-remaining">0</span>
          </td>
        `;
        tfoot.appendChild(breakdown);
      }
    }
  });

  // Add overall summary at the bottom
  const lastSection = termSections[termSections.length - 1];
  if (lastSection) {
    const summary = document.createElement('div');
    summary.className = 'card card-full overall-summary';
    summary.style.marginTop = '24px';
    summary.innerHTML = `
      <h2>Overall Progress</h2>
      <dl style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">
        <div>
          <dt>Total Units</dt>
          <dd id="overall-total" style="font-size: 1.5rem; color: var(--text);">0</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd id="overall-taken" style="font-size: 1.5rem; color: var(--primary);">0</dd>
        </div>
        <div>
          <dt>Remaining</dt>
          <dd id="overall-remaining" style="font-size: 1.5rem; color: var(--muted);">0</dd>
        </div>
      </dl>
      <progress id="overall-progress" class="progress-bar" value="0" max="159"></progress>
      <p style="margin-top: 8px; font-size: 0.9rem; color: var(--muted);">
        <span id="overall-percent">0%</span> complete
      </p>
    `;
    lastSection.parentNode.insertBefore(summary, lastSection.nextSibling);
  }

  // Initial calculation
  updateUnitTotals();

  // Update progress percentage
  const progressEl = document.getElementById('overall-progress');
  const percentEl = document.getElementById('overall-percent');
  if (progressEl && percentEl) {
    const updatePercent = () => {
      const percent = progressEl.max > 0 ? Math.round((progressEl.value / progressEl.max) * 100) : 0;
      percentEl.textContent = `${percent}%`;
    };
    // Observe progress changes
    const observer = new MutationObserver(updatePercent);
    observer.observe(progressEl, { attributes: true, attributeFilter: ['value'] });
    updatePercent();
  }
})();