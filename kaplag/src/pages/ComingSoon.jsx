import { Link } from 'react-router-dom';

const ComingSoon = ({ title }) => (
  <section className="portal-card empty-page">
    <h1 tabIndex="-1">{title}</h1>
    <p>This page is under development.</p>
    <Link className="btn btn-primary" to="/dashboard">Back to dashboard</Link>
  </section>
);

export default ComingSoon;
