import { useState, useCallback } from 'react';
import { useTranslation } from '../context/TranslationContext.jsx';

// Teacher/Subject evaluation criteria
const TEACHER_CRITERIA = [
  { key: 'knowledge', label: 'Subject Knowledge & Expertise', short: 'Knowledge' },
  { key: 'teaching', label: 'Teaching Effectiveness & Clarity', short: 'Teaching' },
  { key: 'engagement', label: 'Student Engagement & Interaction', short: 'Engagement' },
  { key: 'availability', label: 'Availability for Consultation', short: 'Availability' },
  { key: 'fairness', label: 'Fairness in Grading & Assessment', short: 'Fairness' },
  { key: 'organization', label: 'Course Organization & Structure', short: 'Organization' },
];

// Service evaluation criteria
const SERVICE_CRITERIA = [
  { key: 'responsiveness', label: 'Responsiveness & Timeliness', short: 'Responsiveness' },
  { key: 'courtesy', label: 'Courtesy & Professionalism', short: 'Courtesy' },
  { key: 'knowledge', label: 'Knowledge & Accuracy of Info', short: 'Knowledge' },
  { key: 'process', label: 'Process Efficiency & Clarity', short: 'Process' },
  { key: 'accessibility', label: 'Accessibility (Hours, Location, Online)', short: 'Accessibility' },
  { key: 'resolution', label: 'Issue Resolution & Follow-through', short: 'Resolution' },
];

// Sample teachers (in real app, would come from enrollment data)
const SAMPLE_TEACHERS = [
  { id: 't1', name: 'Dr. Maria Santos', subject: 'CS 130 - Data Structures & Algorithms', department: 'Computer Science' },
  { id: 't2', name: 'Prof. Juan Dela Cruz', subject: 'MATH 55 - Calculus I', department: 'Mathematics' },
  { id: 't3', name: 'Dr. Ana Reyes', subject: 'PHYS 10 - General Physics', department: 'Physics' },
  { id: 't4', name: 'Prof. Carlos Mendoza', subject: 'ENG 10 - Technical Writing', department: 'Humanities' },
  { id: 't5', name: 'Dr. Patricia Lim', subject: 'CS 132 - Operating Systems', department: 'Computer Science' },
  { id: 't6', name: 'Prof. Roberto Garcia', subject: 'MATH 56 - Calculus II', department: 'Mathematics' },
  { id: 't7', name: 'Dr. Susan Tan', subject: 'PHYS 11 - General Physics II', department: 'Physics' },
  { id: 't8', name: 'Prof. Eduardo Ramos', subject: 'CHEM 16 - General Chemistry I', department: 'Chemistry' },
  { id: 't9', name: 'Dr. Grace Villanueva', subject: 'BIO 10 - General Biology', department: 'Biology' },
  { id: 't10', name: 'Prof. Miguel Torres', subject: 'STAT 101 - Elementary Statistics', department: 'Mathematics' },
  { id: 't11', name: 'Dr. Lourdes Cruz', subject: 'CS 140 - Database Systems', department: 'Computer Science' },
  { id: 't12', name: 'Prof. Antonio Reyes', subject: 'HIST 1 - Philippine History', department: 'Social Sciences' },
  { id: 't13', name: 'Dr. Elena Gomez', subject: 'PSY 10 - General Psychology', department: 'Social Sciences' },
  { id: 't14', name: 'Prof. Fernando Lopez', subject: 'CS 150 - Software Engineering', department: 'Computer Science' },
  { id: 't15', name: 'Dr. Cecilia Cruz', subject: 'ENG 11 - Speech & Oral Communication', department: 'Humanities' },
];

// Sample services
const SAMPLE_SERVICES = [
  { id: 's1', name: 'Office of the University Registrar (OUR)', category: 'Registrar', icon: '📋' },
  { id: 's2', name: 'Accounting Office', category: 'Finance', icon: '💰' },
  { id: 's3', name: 'Office of Student Affairs (OSA)', category: 'Student Services', icon: '👥' },
  { id: 's4', name: 'University Library', category: 'Academic Support', icon: '📚' },
  { id: 's5', name: 'Information Technology Office (ITO)', category: 'Tech Support', icon: '💻' },
  { id: 's6', name: 'Cashier\'s Office', category: 'Finance', icon: '🏦' },
  { id: 's7', name: 'Health Services Unit', category: 'Health', icon: '🏥' },
  { id: 's8', name: 'Guidance & Counseling Office', category: 'Student Services', icon: '🧠' },
];

// Grievance form URL
const GRIEVANCE_FORM_URL = 'https://forms.gle/RgnvVgaF2TzCRggk6';

const STAR_LABELS = ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'];

const Evaluations = () => {
  const { translate } = useTranslation();
  const [activeTab, setActiveTab] = useState('teacher'); // 'teacher', 'service', 'history'
  const [teacherRatings, setTeacherRatings] = useState(() => {
    const saved = sessionStorage.getItem('kaplag-teacher-evaluations');
    return saved ? JSON.parse(saved) : {};
  });
  const [serviceRatings, setServiceRatings] = useState(() => {
    const saved = sessionStorage.getItem('kaplag-service-evaluations');
    return saved ? JSON.parse(saved) : {};
  });
  // Track which services the student has actually used
  const [servicesUsed, setServicesUsed] = useState(() => {
    const saved = sessionStorage.getItem('kaplag-services-used');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentTeacherId, setCurrentTeacherId] = useState(null);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [strengths, setStrengths] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Save to sessionStorage whenever ratings change
  const saveTeacherRatings = useCallback((ratings) => {
    setTeacherRatings(ratings);
    sessionStorage.setItem('kaplag-teacher-evaluations', JSON.stringify(ratings));
  }, []);

  const saveServiceRatings = useCallback((ratings) => {
    setServiceRatings(ratings);
    sessionStorage.setItem('kaplag-service-evaluations', JSON.stringify(ratings));
  }, []);

  const toggleServiceUsed = useCallback((serviceId) => {
    setServicesUsed(prev => {
      const next = { ...prev, [serviceId]: !prev[serviceId] };
      sessionStorage.setItem('kaplag-services-used', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleTeacherRatingChange = (teacherId, criterionKey, value) => {
    setTeacherRatings(prev => ({
      ...prev,
      [teacherId]: {
        ...prev[teacherId],
        [criterionKey]: value,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const handleServiceRatingChange = (serviceId, criterionKey, value) => {
    setServiceRatings(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [criterionKey]: value,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const getAverageRating = (ratings, criteriaKeys) => {
    if (!ratings) return 0;
    const values = criteriaKeys.map(k => ratings[k]).filter(v => v != null);
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const getCompletedCount = (ratings, items, criteriaKeys) => {
    return items.filter(item => {
      const r = ratings[item.id];
      return r && criteriaKeys.every(k => r[k] != null);
    }).length;
  };

  const openTeacherEval = (teacherId) => {
    setCurrentTeacherId(teacherId);
    const existing = teacherRatings[teacherId] || {};
    setRemarks(existing.remarks || '');
    setStrengths(existing.strengths || '');
    setShowRemarks(true);
  };

  const openServiceEval = (serviceId) => {
    // Check if student has used this service
    if (!servicesUsed[serviceId]) {
      // Auto-mark as used and open
      toggleServiceUsed(serviceId);
    }
    setCurrentServiceId(serviceId);
    const existing = serviceRatings[serviceId] || {};
    setRemarks(existing.remarks || '');
    setStrengths(existing.strengths || '');
    setShowRemarks(true);
  };

  const closeRemarks = () => {
    setCurrentTeacherId(null);
    setCurrentServiceId(null);
    setShowRemarks(false);
    setRemarks('');
    setStrengths('');
  };

  const submitTeacherEval = async () => {
    if (!currentTeacherId) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    saveTeacherRatings({
      ...teacherRatings,
      [currentTeacherId]: {
        ...teacherRatings[currentTeacherId],
        remarks,
        strengths,
        submittedAt: new Date().toISOString(),
        completed: true,
      },
    });
    setToast({ type: 'success', message: translate('Evaluation submitted successfully') });
    closeRemarks();
    setSubmitting(false);
  };

  const submitServiceEval = async () => {
    if (!currentServiceId) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    saveServiceRatings({
      ...serviceRatings,
      [currentServiceId]: {
        ...serviceRatings[currentServiceId],
        remarks,
        strengths,
        submittedAt: new Date().toISOString(),
        completed: true,
      },
    });
    setToast({ type: 'success', message: translate('Evaluation submitted successfully') });
    closeRemarks();
    setSubmitting(false);
  };

  const teacherCriteriaKeys = TEACHER_CRITERIA.map(c => c.key);
  const serviceCriteriaKeys = SERVICE_CRITERIA.map(c => c.key);

  const completedTeachers = getCompletedCount(teacherRatings, SAMPLE_TEACHERS, teacherCriteriaKeys);
  const completedServices = getCompletedCount(serviceRatings, SAMPLE_SERVICES, serviceCriteriaKeys);

  return (
    <>
      {/* Header */}
      <section className="portal-card card-full evaluations-heading">
        <div>
          <p className="schedule-kicker">{translate('Evaluations')}</p>
          <h1 tabIndex="-1">{translate('Evaluations')}</h1>
          <p>{translate('Help improve teaching quality and university services by sharing your feedback.')}</p>
        </div>
        <div className="evaluation-stats" role="status" aria-live="polite">
          <span className="stat stat-teacher">
            <span className="stat-icon">👨‍🏫</span>
            <span className="stat-count">{completedTeachers}/{SAMPLE_TEACHERS.length}</span>
            <span className="stat-label">{translate('Teachers Evaluated')}</span>
          </span>
          <span className="stat stat-service">
            <span className="stat-icon">🏢</span>
            <span className="stat-count">{completedServices}/{SAMPLE_SERVICES.length}</span>
            <span className="stat-label">{translate('Services Evaluated')}</span>
          </span>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="portal-card card-full evaluation-tabs">
        <div role="tablist" aria-label={translate('Evaluation types')}>
          <button
            role="tab"
            aria-selected={activeTab === 'teacher'}
            onClick={() => setActiveTab('teacher')}
            className={activeTab === 'teacher' ? 'active' : ''}
          >
            👨‍🏫 {translate('Teacher Evaluation')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'service'}
            onClick={() => setActiveTab('service')}
            className={activeTab === 'service' ? 'active' : ''}
          >
            🏢 {translate('Service Evaluation')}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            className={activeTab === 'history' ? 'active' : ''}
          >
            📋 {translate('My Evaluations')}
          </button>
        </div>
      </section>

      {/* Teacher Evaluation Tab */}
      {activeTab === 'teacher' && (
        <section className="portal-card card-full teacher-evaluation-list" aria-labelledby="teacher-eval-title">
          <h2 id="teacher-eval-title">{translate('Teacher & Subject Evaluation')}</h2>
          <p className="evaluation-intro">{translate('Rate each criterion from 1 (Poor) to 5 (Excellent). Click a teacher to add remarks and submit.')}</p>

          <div className="evaluation-grid">
            {SAMPLE_TEACHERS.map((teacher) => {
              const rating = teacherRatings[teacher.id];
              const avg = rating ? getAverageRating(rating, teacherCriteriaKeys) : 0;
              const isComplete = rating && teacherCriteriaKeys.every(k => rating[k] != null);
              const hasRemarks = rating?.remarks;

              return (
                <article
                  key={teacher.id}
                  className={`evaluation-card teacher-card ${isComplete ? 'completed' : ''}`}
                  onClick={() => openTeacherEval(teacher.id)}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTeacherEval(teacher.id); } }}
                >
                  <div className="card-header">
                    <div className="teacher-info">
                      <strong>{teacher.name}</strong>
                      <span className="teacher-subject">{teacher.subject}</span>
                      <span className="teacher-dept">{teacher.department}</span>
                    </div>
                    <div className="card-status">
                      {isComplete ? (
                        <span className="status-badge completed">
                          ✓ {translate('Completed')}
                        </span>
                      ) : (
                        <span className="status-badge pending">
                          {translate('Pending')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="criteria-preview">
                    {TEACHER_CRITERIA.map((c) => (
                      <div key={c.key} className="criterion-mini" title={`${c.label}: ${rating?.[c.key] ? `${rating[c.key]}/5` : translate('Not rated')}`}>
                        <span className="criterion-label">{c.short}</span>
                        <div className="star-row" aria-label={`${c.label}: ${rating?.[c.key] || translate('Not rated')}`}>
                          {[1,2,3,4,5].map((star) => (
                            <span key={star} className={star <= (rating?.[c.key] || 0) ? 'filled' : ''}>★</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="avg-rating">
                      {avg > 0 ? (
                        <>
                          <span className="avg-value">{avg.toFixed(1)}</span>
                          <span className="avg-label">/5.0</span>
                        </>
                      ) : (
                        <span className="no-rating">{translate('Not rated yet')}</span>
                      )}
                    </div>
                    {hasRemarks && (
                      <span className="remarks-indicator" title={rating.remarks}>
                        💬 {translate('Has remarks')}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Service Evaluation Tab */}
      {activeTab === 'service' && (
        <section className="portal-card card-full service-evaluation-list" aria-labelledby="service-eval-title">
          <div className="service-eval-header">
            <div>
              <h2 id="service-eval-title">{translate('University Service Evaluation')}</h2>
              <p className="evaluation-intro">{translate('Evaluate only the services you have personally used. Check "I used this service" to enable rating.')}</p>
            </div>
            {/* Grievance Form Link */}
            <a
              href={GRIEVANCE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="grievance-link"
              aria-label={translate('Open grievance form for complaints')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>{translate('File a Grievance / Complaint')}</span>
            </a>
          </div>

          <div className="evaluation-grid">
            {SAMPLE_SERVICES.map((service) => {
              const rating = serviceRatings[service.id];
              const avg = rating ? getAverageRating(rating, serviceCriteriaKeys) : 0;
              const isComplete = rating && serviceCriteriaKeys.every(k => rating[k] != null);
              const hasRemarks = rating?.remarks;
              const isUsed = servicesUsed[service.id];

              return (
                <article
                  key={service.id}
                  className={`evaluation-card service-card ${isComplete ? 'completed' : ''} ${isUsed ? 'used' : 'not-used'}`}
                >
                  <div className="card-header">
                    <div className="service-info">
                      <span className="service-icon" aria-hidden="true">{service.icon}</span>
                      <div>
                        <strong>{service.name}</strong>
                        <span className="service-category">{service.category}</span>
                      </div>
                    </div>
                    <div className="card-status">
                      {isComplete ? (
                        <span className="status-badge completed">
                          ✓ {translate('Completed')}
                        </span>
                      ) : isUsed ? (
                        <span className="status-badge pending">
                          {translate('In Progress')}
                        </span>
                      ) : (
                        <span className="status-badge not-used">
                          {translate('Not Used')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* "I used this service" toggle */}
                  <div className="service-used-toggle">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={isUsed}
                        onChange={() => toggleServiceUsed(service.id)}
                        aria-label={`${translate('I used this service')} ${service.name}`}
                      />
                      <span className="checkbox-custom" aria-hidden="true"></span>
                      <span>{translate('I used this service')}</span>
                    </label>
                  </div>

                  {/* Only show evaluation content if service was used */}
                  {isUsed && (
                    <>
                      <div className="criteria-preview">
                        {SERVICE_CRITERIA.map((c) => (
                          <div key={c.key} className="criterion-mini" title={`${c.label}: ${rating?.[c.key] ? `${rating[c.key]}/5` : translate('Not rated')}`}>
                            <span className="criterion-label">{c.short}</span>
                            <div className="star-row" aria-label={`${c.label}: ${rating?.[c.key] || translate('Not rated')}`}>
                              {[1,2,3,4,5].map((star) => (
                                <span key={star} className={star <= (rating?.[c.key] || 0) ? 'filled' : ''}>★</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="card-footer">
                        <div className="avg-rating">
                          {avg > 0 ? (
                            <>
                              <span className="avg-value">{avg.toFixed(1)}</span>
                              <span className="avg-label">/5.0</span>
                            </>
                          ) : (
                            <span className="no-rating">{translate('Not rated yet')}</span>
                          )}
                        </div>
                        {hasRemarks && (
                          <span className="remarks-indicator" title={rating.remarks}>
                            💬 {translate('Has remarks')}
                          </span>
                        )}
                      </div>

                      {/* Click to open evaluation modal (only when used) */}
                      <button
                        type="button"
                        className="eval-action-btn"
                        onClick={() => openServiceEval(service.id)}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openServiceEval(service.id); } }}
                        aria-label={isComplete ? translate('Review evaluation') : translate('Rate this service')}
                      >
                        {isComplete ? translate('Review Evaluation') : translate('Rate This Service')}
                      </button>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <section className="portal-card card-full evaluation-history" aria-labelledby="history-title">
          <h2 id="history-title">{translate('My Submitted Evaluations')}</h2>

          {/* Teacher Evaluations History */}
          {Object.entries(teacherRatings).filter(([, r]) => r.completed).length > 0 && (
            <div className="history-section">
              <h3>👨‍🏫 {translate('Teacher Evaluations')}</h3>
              <div className="history-list">
                {Object.entries(teacherRatings)
                  .filter(([, r]) => r.completed)
                  .map(([id, r]) => {
                    const teacher = SAMPLE_TEACHERS.find(t => t.id === id);
                    const avg = getAverageRating(r, teacherCriteriaKeys);
                    return (
                      <article key={id} className="history-card">
                        <div className="history-header">
                          <div>
                            <strong>{teacher?.name || id}</strong>
                            <span className="history-meta">{teacher?.subject}</span>
                          </div>
                          <div className="history-rating">
                            <span className="avg-value">{avg.toFixed(1)}</span>
                            <span>/5.0</span>
                          </div>
                        </div>
                        <div className="history-details">
                          {TEACHER_CRITERIA.map(c => (
                            <span key={c.key} className="history-criterion">
                              {c.short}: {r[c.key]}/5
                            </span>
                          ))}
                        </div>
                        {r.strengths && (
                          <div className="history-remarks strengths">
                            <strong>{translate('Strengths:')}</strong> {r.strengths}
                          </div>
                        )}
                        {r.remarks && (
                          <div className="history-remarks improvements">
                            <strong>{translate('Suggestions:')}</strong> {r.remarks}
                          </div>
                        )}
                        <div className="history-date">
                          {translate('Submitted')}: {new Date(r.submittedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </article>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Service Evaluations History */}
          {Object.entries(serviceRatings).filter(([, r]) => r.completed).length > 0 && (
            <div className="history-section">
              <h3>🏢 {translate('Service Evaluations')}</h3>
              <div className="history-list">
                {Object.entries(serviceRatings)
                  .filter(([, r]) => r.completed)
                  .map(([id, r]) => {
                    const service = SAMPLE_SERVICES.find(s => s.id === id);
                    const avg = getAverageRating(r, serviceCriteriaKeys);
                    return (
                      <article key={id} className="history-card">
                        <div className="history-header">
                          <div>
                            <span className="service-icon" aria-hidden="true">{service?.icon}</span>
                            <strong>{service?.name || id}</strong>
                          </div>
                          <div className="history-rating">
                            <span className="avg-value">{avg.toFixed(1)}</span>
                            <span>/5.0</span>
                          </div>
                        </div>
                        <div className="history-details">
                          {SERVICE_CRITERIA.map(c => (
                            <span key={c.key} className="history-criterion">
                              {c.short}: {r[c.key]}/5
                            </span>
                          ))}
                        </div>
                        {r.strengths && (
                          <div className="history-remarks strengths">
                            <strong>{translate('What worked well:')}</strong> {r.strengths}
                          </div>
                        )}
                        {r.remarks && (
                          <div className="history-remarks improvements">
                            <strong>{translate('Suggestions:')}</strong> {r.remarks}
                          </div>
                        )}
                        <div className="history-date">
                          {translate('Submitted')}: {new Date(r.submittedAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </article>
                    );
                  })}
              </div>
            </div>
          )}

          {Object.keys(teacherRatings).filter(k => teacherRatings[k].completed).length === 0 &&
           Object.keys(serviceRatings).filter(k => serviceRatings[k].completed).length === 0 && (
            <div className="empty-page">
              <h2>{translate('No evaluations submitted yet')}</h2>
              <p>{translate('Complete teacher or service evaluations to see them here.')}</p>
            </div>
          )}
        </section>
      )}

      {/* Remarks Modal */}
      {showRemarks && (
        <div className="modal-backdrop" onClick={closeRemarks} role="dialog" aria-modal="true" aria-labelledby="remarks-title">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 id="remarks-title">
                {currentTeacherId ? (
                  <>
                    👨‍🏫 {SAMPLE_TEACHERS.find(t => t.id === currentTeacherId)?.name}
                    <br />
                    <small>{SAMPLE_TEACHERS.find(t => t.id === currentTeacherId)?.subject}</small>
                  </>
                ) : (
                  <>
                    🏢 {SAMPLE_SERVICES.find(s => s.id === currentServiceId)?.name}
                    <br />
                    <small>{SAMPLE_SERVICES.find(s => s.id === currentServiceId)?.category}</small>
                  </>
                )}
              </h2>
              <button type="button" className="modal-close" onClick={closeRemarks} aria-label={translate('Close')}>×</button>
            </div>

            <div className="modal-body">
              {/* Quick rating summary */}
              <div className="rating-summary">
                <h3>{translate('Quick Ratings')}</h3>
                <div className="rating-grid">
                  {(currentTeacherId ? TEACHER_CRITERIA : SERVICE_CRITERIA).map((c) => {
                    const ratings = currentTeacherId ? teacherRatings[currentTeacherId] : serviceRatings[currentServiceId];
                    return (
                      <div key={c.key} className="rating-item">
                        <label>{c.label}</label>
                        <div className="star-input" role="radiogroup" aria-label={c.label}>
                          {[1,2,3,4,5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className={`star-btn ${star <= (ratings?.[c.key] || 0) ? 'filled' : ''}`}
                              onClick={() => currentTeacherId
                                ? handleTeacherRatingChange(currentTeacherId, c.key, star)
                                : handleServiceRatingChange(currentServiceId, c.key, star)}
                              aria-label={`${STAR_LABELS[star-1]} (${star}/5)`}
                              aria-pressed={star === (ratings?.[c.key] || 0)}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Remarks */}
              <div className="remarks-section">
                <div className="form-group">
                  <label htmlFor="strengths">{translate('What worked well / Strengths')}</label>
                  <textarea
                    id="strengths"
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder={currentTeacherId
                      ? translate('e.g., Clear explanations, approachable, well-organized lectures...')
                      : translate('e.g., Fast processing, friendly staff, clear instructions, online options...')}
                    rows={3}
                    aria-describedby="strengths-help"
                  />
                  <div id="strengths-help" className="form-text">
                    {translate('Optional but encouraged. Highlight what the teacher/service does well.')}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="remarks">{translate('Suggestions for Improvement')}</label>
                  <textarea
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder={currentTeacherId
                      ? translate('e.g., More examples in lectures, faster grading return, additional office hours...')
                      : translate('e.g., Longer office hours, online appointment system, clearer forms, faster response...')}
                    rows={3}
                    aria-describedby="remarks-help"
                  />
                  <div id="remarks-help" className="form-text">
                    {translate('Optional. Constructive feedback helps improve the experience for everyone.')}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={closeRemarks}>
                {translate('Cancel')}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={currentTeacherId ? submitTeacherEval : submitServiceEval}
                disabled={submitting}
              >
                {submitting ? translate('Submitting...') : translate('Submit Evaluation')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`} role="alert" aria-live="polite">
          {toast.message}
        </div>
      )}
    </>
  );
};

export default Evaluations;