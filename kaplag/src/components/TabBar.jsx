import { NavLink } from 'react-router-dom';

const TabBar = ({ onMore }) => (
  <nav className="tab-bar" aria-label="Quick navigation">
    <NavLink to="/dashboard">Home</NavLink>
    <NavLink to="/class-schedule">Schedule</NavLink>
    <NavLink to="/grades">Grades</NavLink>
    <NavLink to="/fees">Fees</NavLink>
    <button type="button" onClick={onMore}>More</button>
  </nav>
);

export default TabBar;
