import { useState } from 'react';
import { student } from '../data/student';
import {
  documentRequestOptions,
  freeHigherEducationLaw,
  form5FeeItems,
  form5FeeTotals,
  form5UnavailableAmount,
  isTuitionAssessmentActive,
  nominalProgramYears,
} from '../data/fees';

const requestStorageKey = `kaplag-document-requests:${student.studentNumber}`;

const Fees = () => {
  const [documentType, setDocumentType] = useState(documentRequestOptions[0]);
  const [copies, setCopies] = useState('1');
  const [purpose, setPurpose] = useState('');
  const [requests, setRequests] = useState(() => {
    const savedRequests = sessionStorage.getItem(requestStorageKey);
    return savedRequests ? JSON.parse(savedRequests) : [];
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const programYears = nominalProgramYears[student.program];
  const yearMatch = student.year.match(/\d+/);
  const currentYear = yearMatch ? Number(yearMatch[0]) : null;
  const tuitionAssessmentActive = isTuitionAssessmentActive(student.program, currentYear);
  const tuitionStatus = tuitionAssessmentActive
    ? 'Official assessment required'
    : programYears && currentYear
      ? 'Not activated by the duration rule'
      : 'Program duration unavailable';

  const submitDocumentRequest = (event) => {
    event.preventDefault();
    const requestId = `DOC-${Date.now().toString(36).toUpperCase()}`;
    const request = {
      id: requestId,
      documentType,
      copies: Number(copies),
      purpose: purpose.trim(),
      submittedAt: new Date().toISOString(),
      status: 'Saved in this browser session',
    };
    const updatedRequests = [request, ...requests];

    try {
      sessionStorage.setItem(requestStorageKey, JSON.stringify(updatedRequests));
      setRequests(updatedRequests);
      setSuccess(`Request ${requestId} was saved for this session. It was not sent to the University Registrar.`);
      setError('');
      setDocumentType(documentRequestOptions[0]);
      setCopies('1');
      setPurpose('');
    } catch {
      setError('Your request could not be saved in this browser session. Please try again or contact the University Registrar directly.');
      setSuccess('');
    }
  };

  return (
    <>
      <section className="portal-card card-full fees-heading">
        <p className="fees-kicker">Financial transparency · student services</p>
        <h1 tabIndex="-1">Fees &amp; Documents</h1>
        <p>{student.program} · {student.year} · {student.semester} {student.academicYear}</p>
        <p>Review government-funded fee categories, check your tuition-duration status, and request student documents.</p>
      </section>

      <section className="portal-card card-full document-request" aria-labelledby="document-request-title">
        <div className="fees-section-heading">
          <div>
            <h2 id="document-request-title">Request a school document</h2>
            <p>Choose a document and provide the purpose for your request.</p>
          </div>
        </div>
        <form className="document-request-form" onSubmit={submitDocumentRequest}>
          <div className="document-request-student">
            <strong>{student.fullName}</strong>
            <span>Student no. {student.studentNumber}</span>
          </div>
          <label>
            Document
            <select value={documentType} onChange={(event) => setDocumentType(event.target.value)}>
              {documentRequestOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label>
            Number of copies
            <input
              type="number"
              min="1"
              max="10"
              required
              value={copies}
              onChange={(event) => setCopies(event.target.value)}
            />
          </label>
          <label className="document-request-purpose">
            Purpose
            <textarea
              required
              minLength="5"
              maxLength="300"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              placeholder="Briefly explain why you need this document"
              rows="3"
            />
          </label>
          {error && <p className="fees-error" role="alert">{error}</p>}
          {success && <p className="fees-success" role="status">{success}</p>}
          <button type="submit" className="btn btn-primary document-request-submit">Save request</button>
        </form>
        <p className="document-request-note">
          Form 5 is generated from your course selections on the Registration page. Other document requests are saved only in this browser session and are not delivered to the Registrar. Confirm any applicable fee and processing time with the University Registrar.
        </p>
      </section>

      <section className="portal-card card-full fees-overview" aria-labelledby="fees-overview-title">
        <h2 id="fees-overview-title">Your fee overview</h2>
        <dl className="fees-stat-grid">
          <div>
            <dt>Standard program duration</dt>
            <dd>{programYears ? `${programYears} years` : 'Not configured'}</dd>
            <small>{currentYear ? `Current standing: ${student.year}` : 'Update your year level to check the duration rule.'}</small>
          </div>
          <div>
            <dt>Tuition status by duration</dt>
            <dd>{tuitionStatus}</dd>
            <small>
              {programYears
                ? `This portal activates assessment after the program duration plus one year (Year ${programYears + 2} onward).`
                : 'Ask the University Registrar to confirm your program duration.'}
            </small>
          </div>
          <div>
            <dt>Current amount due</dt>
            <dd>Not available</dd>
            <small>No official student billing statement is connected to this demo.</small>
          </div>
        </dl>
        <p className="fees-eligibility-note">
          The duration rule is only a portal indicator. Eligibility for free higher education also depends on the conditions in RA 10931, and the University’s official assessment takes precedence.
        </p>
      </section>

      <section className="portal-card card-full fees-breakdown" aria-labelledby="fees-breakdown-title">
        <div className="fees-section-heading">
          <div>
            <h2 id="fees-breakdown-title">Form 5 fee breakdown</h2>
            <p>Fee items and total adjustments follow the layout of the UP Mindanao Form 5 you provided.</p>
          </div>
          <a href={freeHigherEducationLaw.url} target="_blank" rel="noreferrer">
            Read {freeHigherEducationLaw.title}
          </a>
        </div>
        <div className="fees-form5-grid">
          <div className="table-responsive">
            <table className="table kaplag-table fees-table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Code</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {form5FeeItems.map((label) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>Not connected</td>
                    <td>{form5UnavailableAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-responsive">
            <table className="table kaplag-table fees-totals-table">
              <thead>
                <tr>
                  <th scope="col">Assessment total</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {form5FeeTotals.map((label) => (
                  <tr key={label} className={label === 'Amount payable' ? 'fees-amount-payable' : ''}>
                    <th scope="row">{label}</th>
                    <td>{form5UnavailableAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="fees-eligibility-note">
          Eligible students may receive tuition and other-school-fee subsidies under RA 10931, subject to the law’s requirements.
        </p>
        <p className="fees-data-note">
          The uploaded example is an individual First Semester AY 2026–2027 assessment, while this portal view is for {student.semester} {student.academicYear}. Its amounts are not reused as current rates. Current fee codes, charges, subsidies, and payable balances require an official term-specific schedule or student account.
        </p>
      </section>

      <section className="portal-card card-full fees-payment" aria-labelledby="fees-payment-title">
        <h2 id="fees-payment-title">If an official balance is assessed</h2>
        <ol>
          <li>Confirm the amount and due date on your latest official assessment from the University Registrar or Accounting Office.</li>
          <li>Use only the payment instructions and channels stated on that official assessment.</li>
          <li>Keep the official receipt or validated proof of payment for your records.</li>
        </ol>
        <p>This demo does not collect payments or replace an official UP Mindanao account statement.</p>
      </section>

      <section className="portal-card card-full document-request-history" aria-labelledby="document-request-history-title">
        <h2 id="document-request-history-title">Your document requests</h2>
        {requests.length ? (
          <ul className="document-request-list">
            {requests.map((request) => (
              <li key={request.id}>
                <div>
                  <strong>{request.documentType}</strong>
                  <span>{request.copies} {request.copies === 1 ? 'copy' : 'copies'} · {new Date(request.submittedAt).toLocaleString()}</span>
                  <span>Purpose: {request.purpose}</span>
                </div>
                <span className="document-request-status">{request.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="fees-muted">No document requests have been saved in this session.</p>
        )}
      </section>
    </>
  );
};

export default Fees;
