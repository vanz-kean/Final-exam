import { NavLink } from 'react-router-dom';

const mainLinks = [
  ['Dashboard', '/dashboard'],
  ['Class Schedule', '/class-schedule'],
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

const Sidebar = ({ open, onClose, onLogout }) => (
  <>
    {open && <button type="button" className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
    <aside className={`portal-sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
      <button type="button" className="sidebar-close" onClick={onClose} aria-label="Close navigation">×</button>
      <nav>
        {mainLinks.map(([label, to]) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
        ))}
        <details>
          <summary>More</summary>
          {moreLinks.map(([label, to]) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
          ))}
        </details>
      </nav>
      <button type="button" className="logout-link" onClick={onLogout}>Log out</button>
    </aside>
  </>
);

export default Sidebar;
