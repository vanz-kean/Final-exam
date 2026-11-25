import { Link } from 'react-router-dom';
import { student } from '../data/student';
import { schedule, announcements } from '../data/sample';

const Dashboard = () => (
  <>
    <section className="portal-card greeting-card">
      <h1 tabIndex="-1">Good morning, {student.name}</h1>
      <p>{student.program} · {student.year} · {student.semester} {student.academicYear}</p>
    </section>

    <section className="portal-card" aria-labelledby="classes-title">
      <h2 id="classes-title">Today's classes</h2>
      <div className="day-tabs" role="tablist" aria-label="Day of the week">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <button key={day} type="button" role="tab" aria-selected={day === 'Mon'}>{day}</button>
        ))}
      </div>
      <p className="up-next"><strong>Up next:</strong> MATH 55 · 10:00–11:00 · ACAD 201</p>
      <ul className="portal-list">
        {schedule.map((item) => (
          <li key={item.code}><strong>{item.code}</strong> · {item.name}<br />{item.time} · {item.room}</li>
        ))}
      </ul>
      <Link className="card-link" to="/class-schedule">View full schedule</Link>
    </section>

    <section className="portal-card" aria-labelledby="attention-title">
      <h2 id="attention-title">Needs your attention</h2>
      <ul className="portal-list">
        <li><strong>Tuition fee payment</strong> · Balance ₱1,060.00<br />Due 2026-09-15 · <span className="urgent">10 days left</span><br /><Link to="/fees">View fees</Link></li>
        <li><strong>INC grade completion deadline</strong><br />2026-09-30</li>
        <li><strong>LOA application deadline</strong><br />2026-10-05</li>
      </ul>
    </section>

    <section className="portal-card announcements-card" aria-labelledby="announcements-title">
      <h2 id="announcements-title">Announcements ({announcements.length})</h2>
      {announcements.map((item) => (
        <article className="announcement-card" key={item.title}>
          <p className="category-date">{item.category} · <time dateTime={item.date}>{item.date}</time></p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <p className="office">{item.office}</p>
        </article>
      ))}
      <Link className="card-link" to="/announcements">View all announcements</Link>
    </section>

    <section className="portal-card progress-card" aria-labelledby="degree-title">
      <h2 id="degree-title">Completion of Degree</h2>
      <dl className="degree-list">
        <dt>Current GWA</dt><dd>1.85</dd>
        <dt>Units enrolled</dt><dd>18</dd>
        <dt>Degree progress</dt><dd><div className="progress progress-custom"><div className="progress-bar" style={{ width: '60%' }} /></div>87 of 144 units</dd>
      </dl>
    </section>
  </>
);

export default Dashboard;
