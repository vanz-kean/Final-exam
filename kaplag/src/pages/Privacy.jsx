import { useState } from 'react';

const sections = [
  ['What this notice is about', 'UP processes personal data to protect academic freedom and quality education. This notice explains why UP uses student data, the risks involved, and your privacy rights.'],
  ['Why UP can process your data', 'Enrollment creates a contract between UP and the student. Personal and sensitive information is processed to provide education and student services.'],
  ['What UP collects, and why', 'UP collects identity, academic, health, contact, financial, disciplinary and service information for admission, instruction, grading, campus services and emergency care.'],
  ['Storage and research', 'Educational records are stored securely to issue documents and meet legal obligations. Anonymized student data may support institutional research and planning.'],
  ['Who your data may be shared with', 'UP shares student information only when allowed or required by law, or with consent. Authorized parties include government offices, partner institutions and service providers.'],
  ['Your rights', 'You may request access to or correction of your personal data and may, in limited cases, object to or withdraw consent.'],
];

const Privacy = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <section className="portal-card card-full">
        <h1 tabIndex="-1">UP Privacy Notice for Students</h1>
        <p>University of the Philippines · Effective AY 2024–2025</p>
      </section>
      <section className="portal-card card-full">
        <h2>The short version</h2>
        <ul className="portal-list">
          <li>UP uses student data for enrollment, teaching, grading, campus services and legal compliance.</li>
          <li>Only authorized personnel and required outside parties may access it.</li>
          <li>You have rights to access and correct your personal data.</li>
        </ul>
      </section>
      {sections.map(([title, text]) => (
        <section className="portal-card card-full" key={title}>
          <details>
            <summary>{title}</summary>
            <p>{text}</p>
          </details>
        </section>
      ))}
      <section className="portal-card card-full">
        <h2>Confirmation</h2>
        <label className="read-confirmation">
          <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
          I have read and understood this privacy notice.
        </label>
        {accepted && <p className="success-message" role="status">Thank you. Your confirmation has been recorded for this session.</p>}
      </section>
    </>
  );
};

export default Privacy;
