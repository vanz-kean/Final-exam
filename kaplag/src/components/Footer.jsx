import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext.jsx';

const Footer = () => {
  const { translate } = useTranslation();

  return (
    <footer className="portal-footer">
      <p><Link to="/privacy">{translate('Privacy')}</Link> · Data Privacy Act (RA 10173)</p>
      <p>© 2026 {translate('University of the Philippines Mindanao')}</p>
    </footer>
  );
};

export default Footer;
