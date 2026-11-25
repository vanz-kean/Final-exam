import { Link } from 'react-router-dom';

const Header = ({ onMenu, menuExpanded }) => (
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
        <strong>KAPLAG</strong>
        <small>UP Mindanao · Student Portal</small>
      </span>
    </Link>
  </header>
);

export default Header;
