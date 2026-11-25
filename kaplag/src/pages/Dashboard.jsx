import { Link } from 'react-router-dom';
import { student } from '../data/student';
import { schedule, announcements } from '../data/sample';
import { useTranslation } from '../context/TranslationContext.jsx';

const Dashboard = () => {
  const { translate } = useTranslation();

  return (
    <>
      <section className="portal-card card-full dashboard-hero">
        <div>
          <h1 tabIndex="-1">{translate('Dashboard')}</h1>
          <p>{translate('Your term at a glance — classes, deadlines, and announcements.')}</p>
        </div>
        <button type="button" className="dashboard-notifications" aria-label={translate('Notifications')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span>{translate('Notifications')}</span>
        </button>
      </section>

      <section className="portal-card greeting-card card-full dashboard-welcome">
        <div>
          <p className="welcome-kicker">{translate('Welcome back')}</p>
          <h2>{student.name}</h2>
          <p>{student.program} · {student.year} · {student.semester} {student.academicYear}</p>
        </div>
        <div className="student-summary" aria-label={`${translate('Student number')} ${student.studentNumber}`}>
          <span className="avatar" aria-hidden="true">VK</span>
          <span>
            <small>{translate('Student number')}</small>
            <strong>{student.studentNumber}</strong>
          </span>
        </div>
      </section>

      <nav className="dashboard-quick-links" aria-label={translate('Dashboard shortcuts')}>
        <Link to="/class-schedule">{translate('Class Schedule')}</Link>
        <Link to="/grades">{translate('Grades')}</Link>
        <Link to="/fees">{translate('Fees')}</Link>
        <Link to="/prospectus">{translate('Prospectus')}</Link>
      </nav>

      <section className="portal-card" aria-labelledby="classes-title">
        <h2 id="classes-title">{translate("Today's classes")}</h2>
        <div className="day-tabs" role="tablist" aria-label={translate('Day of the week')}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <button key={day} type="button" role="tab" aria-selected={day === 'Mon'}>{day}</button>
          ))}
        </div>
        <p className="up-next"><strong>{translate('Up next:')}</strong> MATH 55 · 10:00–11:00 · ACAD 201</p>
        <ul className="portal-list">
          {schedule.map((item) => (
            <li key={item.code}><strong>{item.code}</strong> · {item.name}<br />{item.time} · {item.room}</li>
          ))}
        </ul>
        <Link className="card-link" to="/class-schedule">{translate('View full schedule')}</Link>
      </section>

      <section className="portal-card" aria-labelledby="attention-title">
        <h2 id="attention-title">{translate('Needs your attention')}</h2>
        <ul className="portal-list">
          <li><strong>{translate('Tuition fee payment')}</strong> · Balance ₱1,060.00<br />Due 2026-09-15 · <span className="urgent">{translate('10 days left')}</span><br /><Link to="/fees">{translate('View fees')}</Link></li>
          <li><strong>{translate('INC grade completion deadline')}</strong><br />2026-09-30</li>
          <li><strong>{translate('LOA application deadline')}</strong><br />2026-10-05</li>
        </ul>
      </section>

      <section className="portal-card announcements-card" aria-labelledby="announcements-title">
        <h2 id="announcements-title">{translate('Announcements')} ({announcements.length})</h2>
        {announcements.map((item) => (
          <article className="announcement-card" key={item.title}>
            <p className="category-date">{item.category} · <time dateTime={item.date}>{item.date}</time></p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <p className="office">{item.office}</p>
          </article>
        ))}
        <Link className="card-link" to="/announcements">{translate('View all announcements')}</Link>
      </section>

      <section className="portal-card progress-card" aria-labelledby="degree-title">
        <h2 id="degree-title">{translate('Completion of Degree')}</h2>
        <dl className="degree-list">
          <dt>{translate('Current GWA')}</dt><dd>1.85</dd>
          <dt>{translate('Units enrolled')}</dt><dd>18</dd>
          <dt>{translate('Degree progress')}</dt><dd><div className="progress progress-custom"><div className="progress-bar" style={{ width: '60%' }} /></div>87 of 144 units</dd>
        </dl>
      </section>
    </>
  );
};

export default Dashboard;
