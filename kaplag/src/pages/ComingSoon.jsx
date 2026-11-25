import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext.jsx';

const ComingSoon = ({ title }) => {
  const { translate } = useTranslation();
  return (
    <section className="portal-card empty-page">
      <h1 tabIndex="-1">{title}</h1>
      <p>{translate('This page is under development.')}</p>
      <Link className="btn btn-primary" to="/dashboard">{translate('Back to dashboard')}</Link>
    </section>
  );
};

export default ComingSoon;
