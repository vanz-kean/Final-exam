import { NavLink } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext.jsx';

const mainLinks = [
  ['Dashboard', '/dashboard'],
  ['Registration', '/registration'],
  ['Class Schedule', '/class-schedule'],
  ['School Calendar', '/school-calendar'],
  ['Grades', '/grades'],
  ['Fees', '/fees'],
  ['Prospectus', '/prospectus'],
  ['Announcements', '/announcements'],
  ['UP Mail', '/up-mail'],
  ['Student Information', '/student-information'],
];

const moreLinks = [
  ['Evaluations', '/evaluations'],
  ['Campus Facility & Safety', '/campus-facility'],
  ['College Facility & Safety', '/college-facility'],
  ['Student Housing', '/student-housing'],
  ['UP Privacy Notice', '/privacy'],
];

const Sidebar = ({ open, onClose, onLogout }) => {
  const { translate } = useTranslation();

  return (
    <>
      {open && <button type="button" className="sidebar-backdrop" onClick={onClose} aria-label={translate('Close navigation')} />}
      <aside id="primary-navigation" className={`portal-sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        <button type="button" className="sidebar-close" onClick={onClose} aria-label={translate('Close navigation')}>×</button>
        <nav>
          {mainLinks.map(([label, to]) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => isActive ? 'active' : ''}>{translate(label)}</NavLink>
          ))}
          <details>
            <summary>{translate('More')}</summary>
            {moreLinks.map(([label, to]) => (
              <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => isActive ? 'active' : ''}>{translate(label)}</NavLink>
            ))}
          </details>
        </nav>
        <button type="button" className="logout-link" onClick={onLogout}>{translate('Logout')}</button>
      </aside>
    </>
  );
};

export default Sidebar;
