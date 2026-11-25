import { Link } from 'react-router-dom';

const Header = ({ user, onMenu }) => (
  <header className="portal-header">
    <button type="button" className="menu-toggle" onClick={onMenu} aria-label="Open navigation">
      <span /><span /><span />
    </button>
    <Link to="/dashboard" className="brand" aria-label="KAPLAG dashboard">
      <img src="/img/Logo.png" alt="" className="brand-logo" />
      <span className="brand-text">
        <strong>KAPLAG</strong>
        <small>UP Mindanao · Student Portal</small>
      </span>
    </Link>
    <div className="header-actions">
      <button type="button" className="icon-btn" aria-label="Notifications">
        <span aria-hidden="true">●</span>
      </button>
      <button type="button" className="profile-btn" aria-label="Student profile">
        <span className="avatar">VK</span>
        <span className="profile-info">
          <span className="profile-name">{user?.name || 'Vanz Kean'}</span>
          <span className="profile-id">{user?.studentNumber || '2026-17196'}</span>
        </span>
      </button>
    </div>
  </header>
);

export default Header;
