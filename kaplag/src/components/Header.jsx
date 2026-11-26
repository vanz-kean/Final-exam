import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext.jsx';

const Header = ({ onMenu, menuExpanded }) => {
  const { language, toggleLanguage, translate } = useTranslation();

  return (
    <header className="portal-header">
      <button
        type="button"
        className="menu-toggle"
        onClick={onMenu}
        aria-label={menuExpanded ? 'Close navigation' : 'Open navigation'}
        aria-controls="primary-navigation"
        aria-expanded={menuExpanded}
      >
        <span /><span /><span />
      </button>
      <Link to="/dashboard" className="brand" aria-label="KAPLAG dashboard">
        <img src={`${import.meta.env.BASE_URL}img/Logo.png`} alt="" className="brand-logo" />
        <span className="brand-text">
          <strong>{translate('KAPLAG')}</strong>
          <small>{translate('UP Mindanao · Student Portal')}</small>
        </span>
      </Link>
      <div className="header-actions" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleLanguage}
          aria-label={language === 'en' ? translate('Switch to Tagalog') : translate('Switch to English')}
          title={language === 'en' ? 'Tagalog' : 'English'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            minHeight: '40px',
            padding: '0 12px',
            background: 'transparent',
            border: '1px solid rgba(241, 233, 230, 0.35)',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(241, 233, 230, 0.35)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M21 12a9 9 0 0 1-9 9c-2.52 0-4.93-.69-6.74-1.88L2 12l6.26-8.12C6.07 2.69 8.48 2 11 2a9 9 0 0 1 9 9z" />
            <path d="M21 12a9 9 0 0 1-9 9" />
            <path d="M21 12a9 9 0 0 1-9-9" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>{language === 'en' ? 'TL' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
