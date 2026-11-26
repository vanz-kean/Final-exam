import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext.jsx';
import { announcements, getUrgentAnnouncements, getActionAnnouncements, getInfoAnnouncements } from '../data/announcements.js';

const Announcements = () => {
  const { translate } = useTranslation();
  const [filter, setFilter] = useState('all'); // all, urgent, action, info
  const [search, setSearch] = useState('');

  const filteredAnnouncements = useMemo(() => {
    let result = announcements;
    if (filter !== 'all') {
      result = result.filter(a => a.category === filter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.text.toLowerCase().includes(q) ||
        a.office.toLowerCase().includes(q)
      );
    }
    return result;
  }, [filter, search]);

  const urgentCount = getUrgentAnnouncements().length;
  const actionCount = getActionAnnouncements().length;
  const infoCount = getInfoAnnouncements().length;

  const categoryConfig = {
    // Colors updated for WCAG AA contrast (4.5:1 minimum)
    urgent: { label: translate('URGENT'), icon: '🚨', color: '#b3261e', bg: '#fef2f2', border: '#b3261e', textColor: '#7f1d1d' },
    action: { label: translate('ACTION REQUIRED'), icon: '⚠️', color: '#8a5b00', bg: '#fefce8', border: '#8a5b00', textColor: '#713f00' },
    info: { label: translate('ANNOUNCEMENT'), icon: '📢', color: '#014421', bg: '#e8f5ed', border: '#014421', textColor: '#013318' },
  };

  const renderCategorySection = (category, title, items) => {
    if (items.length === 0) return null;
    const config = categoryConfig[category];
    const cardStyle = { borderLeftColor: config.border, background: config.bg, color: config.textColor };
    const badgeStyle = { background: config.border, color: '#fff' };
    const buttonStyle = { background: config.border, color: '#fff' };
    const expiryStyle = { color: config.color };
    return (
      <section key={category} className="portal-card card-full announcement-section" aria-labelledby={`${category}-title`}>
        <div className="section-header" style={{ borderLeftColor: config.border }}>
          <h2 id={`${category}-title`} className="section-title">
            <span className="section-icon" aria-hidden="true">{config.icon}</span>
            <span>{title} ({items.length})</span>
          </h2>
        </div>
        <div className="announcement-list">
          {items.map((item) => (
            <article
              key={item.id}
              className={`announcement-card ${item.category}`}
              style={cardStyle}
            >
              <div className="announcement-header">
                <span className="announcement-badge" style={badgeStyle}>
                  {config.icon} {config.label}
                </span>
                <time className="announcement-date" dateTime={item.date} style={{ color: config.textColor }}>
                  {new Date(item.date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
              <h3 className="announcement-title" style={{ color: config.textColor }}>{item.title}</h3>
              <p className="announcement-text" style={{ color: config.textColor }}>{item.text}</p>
              <div className="announcement-footer">
                <span className="announcement-office" style={{ color: config.textColor }}>
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ width: 14, height: 14, marginRight: 4, verticalAlign: 'middle' }}>
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z"/>
                    <path d="M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                  {item.office}
                </span>
                {item.actionRequired && item.actionLink && (
                  <Link to={item.actionLink} className="btn btn-sm announcement-action-btn" style={buttonStyle}>
                    {item.actionText || translate('View Details')}
                  </Link>
                )}
              </div>
              {item.expiryDate && (
                <div className="announcement-expiry" style={expiryStyle}>
                  ⏰ {translate('Deadline')}: {new Date(item.expiryDate).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <>
      <section className="portal-card card-full announcements-heading">
        <div>
          <p className="schedule-kicker">{translate('Announcements')}</p>
          <h1 tabIndex="-1">{translate('Announcements')}</h1>
          <p>{translate('Official university announcements, deadlines, and updates from administrators.')}</p>
        </div>
        <div className="announcement-stats" role="status" aria-live="polite">
          <span className="stat stat-urgent" title={`${urgentCount} ${translate('URGENT')}`}>
            <span className="stat-icon">🚨</span>
            <span className="stat-count">{urgentCount}</span>
            <span className="stat-label">{translate('Urgent')}</span>
          </span>
          <span className="stat stat-action" title={`${actionCount} ${translate('ACTION REQUIRED')}`}>
            <span className="stat-icon">⚠️</span>
            <span className="stat-count">{actionCount}</span>
            <span className="stat-label">{translate('Action Needed')}</span>
          </span>
          <span className="stat stat-info" title={`${infoCount} ${translate('ANNOUNCEMENT')}`}>
            <span className="stat-icon">📢</span>
            <span className="stat-count">{infoCount}</span>
            <span className="stat-label">{translate('General')}</span>
          </span>
        </div>
      </section>

      <section className="portal-card card-full announcement-filters">
        <div className="filter-row">
          <label>
            {translate('Search announcements')}
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={translate('Search by title, content, or office...')}
              aria-label={translate('Search announcements')}
            />
          </label>
          <label>
            {translate('Filter by priority')}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label={translate('Filter by priority')}
            >
              <option value="all">{translate('All Announcements')}</option>
              <option value="urgent">{translate('URGENT')} ({urgentCount})</option>
              <option value="action">{translate('ACTION REQUIRED')} ({actionCount})</option>
              <option value="info">{translate('ANNOUNCEMENT')} ({infoCount})</option>
            </select>
          </label>
        </div>
      </section>

      {(() => {
        const urgent = filteredAnnouncements.filter(a => a.category === 'urgent');
        const action = filteredAnnouncements.filter(a => a.category === 'action');
        const info = filteredAnnouncements.filter(a => a.category === 'info');

        if (filter === 'all') {
          return (
            <>
              {renderCategorySection('urgent', translate('URGENT'), urgent)}
              {renderCategorySection('action', translate('ACTION REQUIRED'), action)}
              {renderCategorySection('info', translate('ANNOUNCEMENT'), info)}
            </>
          );
        } else if (filter === 'urgent') {
          return renderCategorySection('urgent', translate('URGENT'), urgent);
        } else if (filter === 'action') {
          return renderCategorySection('action', translate('ACTION REQUIRED'), action);
        } else if (filter === 'info') {
          return renderCategorySection('info', translate('ANNOUNCEMENT'), info);
        }
        return null;
      })()}

      {filteredAnnouncements.length === 0 && (
        <section className="portal-card card-full empty-page">
          <h2>{translate('No announcements found')}</h2>
          <p>{translate('Try adjusting your search or filter.')}</p>
        </section>
      )}
    </>
  );
};

export default Announcements;