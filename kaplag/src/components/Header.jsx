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
        <img src="/img/Logo.png" alt="" className="brand-logo" />
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
          aria-label={language === 'en' ? 'Switch to Tagalog' : 'Switch to English'}
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
          <span style={{ fontSize: '1rem' }}>{language === 'en' ? '🇵🇭' : '🇺🇸'}</span>
          <span>{language === 'en' ? 'TL' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
