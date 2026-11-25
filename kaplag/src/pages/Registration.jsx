import { useEffect, useRef, useState } from 'react';
import { student } from '../data/student';
import { blockSchedules, nstpSections, peCourseNames, peSections } from '../data/registration';
import { useTranslation } from '../context/TranslationContext.jsx';

const getPELabel = (course) => (
  peCourseNames[course] ? `${course} (${peCourseNames[course]})` : course
);

const hasTimeConflict = (blockCourses, offering) => blockCourses.some((course) => (
  course.days.some((day) => offering.days.includes(day))
  && offering.start < course.end
  && course.start < offering.end
));

const Registration = () => {
  const confirmationDialogRef = useRef(null);
  const summaryHeadingRef = useRef(null);
  const { translate } = useTranslation();
  const [selection, setSelection] = useState(() => {
    const saved = sessionStorage.getItem('kaplag-registration');
    return saved
      ? JSON.parse(saved)
      : { blockId: '', peSectionId: '', nstpSectionId: '' };
  });
  const [saved, setSaved] = useState(() => Boolean(sessionStorage.getItem('kaplag-registration')));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const isFirstYear = student.year === 'Year 1';
  const availableBlocks = blockSchedules.filter((block) => block.year === student.year);
  const selectedBlock = availableBlocks.find((block) => block.id === selection.blockId);
  const availablePESections = selectedBlock
    ? peSections.filter((offering) => (
      offering.enrolled < offering.capacity
      && !hasTimeConflict(selectedBlock.courses, offering)
    ))
    : [];
  const selectedPE = peSections.find((offering) => offering.id === selection.peSectionId);
  const selectedPEAvailable = availablePESections.some((offering) => offering.id === selection.peSectionId);
  const selectedNSTP = nstpSections.find((offering) => offering.id === selection.nstpSectionId);
  const isRegistrationSaved = Boolean(
    saved && selectedBlock && selectedPE && (!isFirstYear || selectedNSTP),
  );
  const scheduleRows = selectedBlock && selectedPE
    ? [
      ...selectedBlock.courses.map((course) => ({ ...course, scheduleType: 'Block course' })),
      { ...selectedPE, course: getPELabel(selectedPE.course), scheduleType: 'PE selection' },
      ...(isFirstYear && selectedNSTP
        ? [{ ...selectedNSTP, scheduleType: 'NSTP selection' }]
        : []),
    ]
    : [];

  useEffect(() => {
    if (!showConfirmation) return undefined;
    const dialog = confirmationDialogRef.current;
    if (!dialog) return undefined;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [showConfirmation]);

  useEffect(() => {
    if (isRegistrationSaved) summaryHeadingRef.current?.focus();
  }, [isRegistrationSaved]);

  const updateSelection = (key, value) => {
    setSelection((current) => ({ ...current, [key]: value }));
    setError('');
    setSaved(false);
  };

  const chooseBlock = (blockId) => {
    setSelection((current) => ({ ...current, blockId, peSectionId: '' }));
    setError('');
    setSaved(false);
  };

  const reviewRegistration = (event) => {
    event.preventDefault();
    if (!selectedBlock) {
      setError('Select a block before saving your registration.');
      return;
    }
    if (!selectedPE || !selectedPEAvailable) {
      setError('Select an available, conflict-free PE section before saving.');
      return;
    }
    if (isFirstYear && !selectedNSTP) {
      setError('Select an NSTP section before saving your first-year registration.');
      return;
    }

    setError('');
    setShowConfirmation(true);
  };

  const confirmRegistration = () => {
    sessionStorage.setItem('kaplag-registration', JSON.stringify(selection));
    setSaved(true);
    setShowConfirmation(false);
    setError('');
  };

  return (
    <>
      {isRegistrationSaved ? (
        <>
          <section className="portal-card card-full registration-summary-heading">
            <div>
              <p className="registration-summary-kicker">{translate('Registration complete')}</p>
              <h1 ref={summaryHeadingRef} tabIndex="-1">{translate('Registration summary')}</h1>
              <p className="registration-term">
                {student.program} · {student.year} · {student.semester} {student.academicYear}
              </p>
            </div>
            <span className="registration-status">{translate('Saved for this session')}</span>
          </section>

          <section className="portal-card card-full registration-summary-card">
            <h2>{translate('Student information')}</h2>
            <dl className="registration-summary-details">
              <dt>{translate('Student number')}</dt>
              <dd>{student.studentNumber}</dd>
              <dt>{translate('Name')}</dt>
              <dd>{student.fullName}</dd>
              <dt>{translate('Program')}</dt>
              <dd>{student.program}</dd>
              <dt>{translate('Curriculum')}</dt>
              <dd>{student.curriculum}</dd>
              <dt>{translate('Block section')}</dt>
              <dd>{selectedBlock.id}</dd>
            </dl>
          </section>

          <section className="portal-card card-full registration-summary-card">
            <div className="registration-schedule-heading">
              <div>
                <h2>{translate('Enlisted schedules')}</h2>
                <p>{translate('These are the block courses and sections you selected.')}</p>
              </div>
              <span>{student.semester} {student.academicYear}</span>
            </div>
            <div className="table-responsive">
              <table className="table kaplag-table registration-summary-table">
                <thead>
                  <tr>
                    <th scope="col">{translate('Course')}</th>
                    <th scope="col">{translate('Type')}</th>
                    <th scope="col">{translate('Section')}</th>
                    <th scope="col">{translate('Day(s)')}</th>
                    <th scope="col">{translate('Time')}</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((course, index) => (
                    <tr key={`${course.scheduleType}-${course.course}-${course.section}-${index}`}>
                      <th scope="row">{course.course}</th>
                      <td><span className="registration-type">{course.scheduleType}</span></td>
                      <td>{course.section}</td>
                      <td>{course.dayLabel}</td>
                      <td>{course.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="registration-note">
              {translate('This prototype stores your selections in this browser session only. It does not submit an official UP registration.')}
            </p>
          </section>

          <section className="portal-card card-full registration-summary-card registration-summary-actions">
            <button type="button" className="btn btn-outline-primary" onClick={() => setSaved(false)}>
              {translate('Change selections')}
            </button>
          </section>
        </>
      ) : (
        <>
          <section className="portal-card card-full registration-heading">
            <h1 tabIndex="-1">{translate('Registration')}</h1>
            <p>{translate('Choose your block, then select PE and NSTP sections that fit your schedule.')}</p>
            <p className="registration-term">
              {student.program} · {student.year} · {student.semester} {student.academicYear}
            </p>
          </section>

      <form className="registration-form" onSubmit={reviewRegistration}>
        <section className="portal-card card-full">
          <h2>{translate('1. Choose your block')}</h2>
          <p>{translate('Compare the available block schedules below. Only blocks for your year level are shown.')}</p>
          <div className="registration-block-grid">
            {availableBlocks.map((block) => (
              <section
                className={`portal-card block-schedule-card${selection.blockId === block.id ? ' selected' : ''}`}
                key={block.id}
                aria-labelledby={`block-title-${block.id}`}
              >
                <div className="block-card-heading">
                  <label>
                    <input
                      type="radio"
                      name="block"
                      value={block.id}
                      required
                      checked={selection.blockId === block.id}
                      onChange={() => chooseBlock(block.id)}
                    />
                    <span>
                      <strong id={`block-title-${block.id}`}>{block.id}</strong>
                      <small>BSCS · {block.year} · {translate('Second semester')}</small>
                    </span>
                  </label>
                  {selection.blockId === block.id && <span className="registration-badge">{translate('Selected')}</span>}
                </div>
                <div className="table-responsive">
                  <table className="table kaplag-table block-schedule-table">
                    <thead>
                      <tr>
                        <th scope="col">{translate('Course')}</th>
                        <th scope="col">{translate('Section')}</th>
                        <th scope="col">{translate('Day(s)')}</th>
                        <th scope="col">{translate('Time')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.courses.map((course, index) => (
                        <tr key={`${course.course}-${course.section}-${index}`}>
                          <th scope="row">{course.course}</th>
                          <td>{course.section}</td>
                          <td>{course.dayLabel}</td>
                          <td>{course.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
          {availableBlocks.length === 0 && (
            <p className="registration-note" role="status">
              {translate('No block schedules have been added for')} {student.year} {translate('yet.')}
            </p>
          )}
          <p className="registration-note">
            {translate('The reference provided includes complete schedules for 1BSCS-A and 1BSCS-B. Other block schedules can be added when their details are available.')}
          </p>
        </section>

        <section className="portal-card card-full" aria-labelledby="pe-title">
          <h2 id="pe-title">{translate('2. Choose a PE section')}</h2>
          <p>
            {translate('PE means Physical Education. Only sections with available seats that do not overlap your selected block schedule are listed.')}
            {translate(' Activity names appear in parentheses to clarify the PE course codes.')}
          </p>
          {!selectedBlock ? (
            <p className="registration-note">{translate('Select a block above to see compatible PE sections.')}</p>
          ) : availablePESections.length > 0 ? (
            <div className="table-responsive">
              <table className="table kaplag-table registration-choice-table">
                <thead>
                  <tr>
                    <th scope="col">{translate('Choose')}</th>
                    <th scope="col">{translate('Course')}</th>
                    <th scope="col">{translate('Section')}</th>
                    <th scope="col">{translate('Day(s)')}</th>
                    <th scope="col">{translate('Time')}</th>
                    <th scope="col">{translate('Seats left')}</th>
                  </tr>
                </thead>
                <tbody>
                  {availablePESections.map((offering) => (
                    <tr key={offering.id}>
                      <td>
                        <input
                          type="radio"
                          name="pe-section"
                          aria-label={`Choose ${getPELabel(offering.course)}, section ${offering.section}`}
                          required
                          checked={selection.peSectionId === offering.id}
                          onChange={() => updateSelection('peSectionId', offering.id)}
                        />
                      </td>
                      <th scope="row">
                        {getPELabel(offering.course)}
                      </th>
                      <td>{offering.section}</td>
                      <td>{offering.dayLabel}</td>
                      <td>{offering.time}</td>
                      <td>{offering.capacity - offering.enrolled}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="registration-note">{translate('No open PE sections fit this block schedule.')}</p>
          )}
          {selectedBlock && (
            <p className="registration-note">{translate('Seat counts are copied from the supplied schedule screenshot and are not live enrollment data.')}</p>
          )}
        </section>

        <section className="portal-card card-full" aria-labelledby="nstp-title">
          <h2 id="nstp-title">{translate('3. NSTP section')}</h2>
          {isFirstYear ? (
            <>
              <p>{translate('NSTP registration is available to first-year students only.')}</p>
              <div className="nstp-option">
                {nstpSections.map((offering) => (
                  <label className="nstp-option-row" key={offering.id}>
                    <input
                      type="radio"
                      name="nstp-section"
                      required
                      checked={selection.nstpSectionId === offering.id}
                      onChange={() => updateSelection('nstpSectionId', offering.id)}
                    />
                    <span><strong>{offering.course}</strong> · {translate('Section')} {offering.section}</span>
                    <span>{offering.dayLabel}</span>
                    <span>{offering.time}</span>
                  </label>
                ))}
              </div>
            </>
          ) : (
            <p className="registration-note">{translate('NSTP schedule selection is only available to first-year students.')}</p>
          )}
        </section>

        <section className="portal-card card-full registration-submit">
          {error && <p className="registration-error" role="alert">{error}</p>}
          <p className="registration-note">{translate('Review your choices before the final confirmation.')}</p>
          <button type="submit" className="btn btn-primary">{translate('Review and confirm')}</button>
        </section>
      </form>
        </>
      )}

      {showConfirmation && selectedBlock && selectedPE && (
        <dialog
          ref={confirmationDialogRef}
          className="registration-confirmation"
          aria-labelledby="registration-confirmation-title"
          onCancel={(event) => {
            event.preventDefault();
            setShowConfirmation(false);
          }}
        >
          <div className="registration-confirmation-content">
            <p className="registration-summary-kicker">{translate('Final review')}</p>
            <h2 id="registration-confirmation-title">{translate('Confirm your registration choices')}</h2>
            <p>{translate('Check your selected sections before saving.')}</p>
            <dl className="registration-confirmation-details">
              <dt>{translate('Block section')}</dt>
              <dd>{selectedBlock.id}</dd>
              <dt>{translate('PE section')}</dt>
              <dd>{getPELabel(selectedPE.course)} · {translate('Section')} {selectedPE.section} · {selectedPE.dayLabel}, {selectedPE.time}</dd>
              {isFirstYear && selectedNSTP && (
                <>
                  <dt>{translate('NSTP section')}</dt>
                  <dd>{selectedNSTP.course} · {translate('Section')} {selectedNSTP.section} · {selectedNSTP.dayLabel}, {selectedNSTP.time}</dd>
                </>
              )}
            </dl>
            <p className="registration-note">
              {translate('Confirming saves these choices in this browser session only; it does not submit an official UP registration.')}
            </p>
            <div className="registration-confirmation-actions">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmation(false)}
              >
                {translate('Back to choices')}
              </button>
              <button type="button" className="btn btn-primary" onClick={confirmRegistration}>
                {translate('Confirm and save')}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Registration;
