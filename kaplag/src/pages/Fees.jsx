import { useState } from 'react';
import { student } from '../data/student';
import {
  documentRequestOptions,
  freeHigherEducationLaw,
  governmentFundedFeeCategories,
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
  const tuitionAssessmentActive = Boolean(
    programYears && currentYear && currentYear > programYears + 1,
  );
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
        <h1 tabIndex="-1">Fees</h1>
        <p>{student.program} · {student.year} · {student.semester} {student.academicYear}</p>
        <p>Review government-funded fee categories, check your tuition-duration status, and request student documents.</p>
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
            <h2 id="fees-breakdown-title">Government-funded fee categories</h2>
            <p>Eligible Filipino undergraduate students at state universities may be exempt from tuition and other school fees under RA 10931.</p>
          </div>
          <a href={freeHigherEducationLaw.url} target="_blank" rel="noreferrer">
            Read {freeHigherEducationLaw.title}
          </a>
        </div>
        <div className="table-responsive">
          <table className="table kaplag-table fees-table">
            <thead>
              <tr>
                <th scope="col">Fee category</th>
                <th scope="col">Funding information</th>
                <th scope="col">Student-level amount</th>
              </tr>
            </thead>
            <tbody>
              {governmentFundedFeeCategories.map((category) => (
                <tr key={category}>
                  <th scope="row">{category}</th>
                  <td>Covered for students who meet the law’s eligibility requirements.</td>
                  <td>Not itemized in the available official rate data.</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Books, supplies, uniforms, transport, and personal expenses</th>
                <td>Separate from the tuition and other-school-fee exemption; some assistance may be available through TES subject to its rules.</td>
                <td>Varies; not calculated here.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="fees-data-note">
          No current UP Mindanao per-unit tuition rate, individual billing statement, or per-student government payment amount is connected to this portal. Amounts are left unreported rather than estimated.
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
          Prototype only: requests are saved in this browser session and are not delivered to the Registrar. Any applicable document fee and processing time must be confirmed by the University Registrar.
        </p>
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
