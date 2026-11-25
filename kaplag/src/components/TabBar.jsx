import { NavLink } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext.jsx';

const TabBar = ({ onMore }) => {
  const { translate } = useTranslation();

  return (
    <nav className="tab-bar" aria-label={translate('Quick navigation')}>
      <NavLink to="/dashboard">{translate('Dashboard')}</NavLink>
      <NavLink to="/class-schedule">{translate('Class Schedule')}</NavLink>
      <NavLink to="/grades">{translate('Grades')}</NavLink>
      <NavLink to="/fees">{translate('Fees')}</NavLink>
      <button type="button" onClick={onMore}>{translate('More')}</button>
    </nav>
  );
};

export default TabBar;
