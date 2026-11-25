import { useMemo, useState } from 'react';
import { gradeTerms } from '../data/grades';
import { useTranslation } from '../context/TranslationContext.jsx';

const isNumericGrade = (grade) => /^\d+(?:\.\d+)?$/.test(grade);

const Grades = () => {
  const { translate } = useTranslation();
  const [year, setYear] = useState('All years');
  const [semester, setSemester] = useState('All semesters');

  const visibleTerms = useMemo(() => gradeTerms.filter((term) => {
    const matchesYear = year === 'All years' || term.year === year;
    const matchesSemester = semester === 'All semesters' || term.semester === semester;
    return matchesYear && matchesSemester;
  }), [year, semester]);

  const completedCourses = gradeTerms.flatMap((term) => term.courses)
    .filter((course) => isNumericGrade(course.grade));
  const weightedUnits = completedCourses.reduce((sum, course) => {
    return sum + (Number(course.grade) * course.units);
  }, 0);
  const totalUnits = completedCourses.reduce((sum, course) => sum + course.units, 0);
  const gwa = totalUnits ? (weightedUnits / totalUnits).toFixed(2) : '—';
  const incompleteCount = gradeTerms.flatMap((term) => term.courses)
    .filter((course) => course.status === 'Incomplete').length;

  return (
    <>
      <section className="portal-card grades-title card-full">
        <h1 tabIndex="-1">{translate('Grades')}</h1>
        <p>{translate('Choose a year and semester to see the grades for that term.')}</p>
      </section>

      <section className="portal-card grade-summary" aria-labelledby="grade-summary-title">
        <h2 id="grade-summary-title">{translate('Your grade summary')}</h2>
        <dl className="grade-summary-list">
          <div>
            <dt>{translate('General weighted average')}</dt>
            <dd>{gwa}</dd>
          </div>
          <div>
            <dt>{translate('Completed units')}</dt>
            <dd>{totalUnits}</dd>
          </div>
          <div>
            <dt>{translate('Incomplete grades')}</dt>
            <dd className={incompleteCount ? 'urgent-grade' : ''}>{incompleteCount}</dd>
          </div>
        </dl>
      </section>

      <section className="portal-card grade-filters card-full" aria-labelledby="grade-filter-title">
        <h2 id="grade-filter-title">{translate('Find grades')}</h2>
        <div className="filter-row">
          <label>
            {translate('Year')}
            <select value={year} onChange={(event) => setYear(event.target.value)}>
              <option>{translate('All years')}</option>
              <option>{translate('First Year')}</option>
              <option>{translate('Second Year')}</option>
              <option>{translate('Third Year')}</option>
              <option>{translate('Fourth Year')}</option>
            </select>
          </label>
          <label>
            {translate('Semester')}
            <select value={semester} onChange={(event) => setSemester(event.target.value)}>
              <option>{translate('All semesters')}</option>
              <option>{translate('First Semester')}</option>
              <option>{translate('Second Semester')}</option>
              <option>{translate('Summer')}</option>
            </select>
          </label>
        </div>
      </section>

      {visibleTerms.map((term) => {
        const numericCourses = term.courses.filter((course) => isNumericGrade(course.grade));
        const units = numericCourses.reduce((sum, course) => sum + course.units, 0);
        const weighted = numericCourses.reduce((sum, course) => sum + (Number(course.grade) * course.units), 0);
        const termGwa = units ? (weighted / units).toFixed(2) : '—';

        return (
          <section className="portal-card grade-term card-full" key={`${term.year}-${term.semester}`}>
            <div className="term-heading">
              <div>
                <p className="term-kicker">{term.year}</p>
                <h2>{term.semester}</h2>
                <p>{term.academicYear}</p>
              </div>
              <div className="term-gwa" aria-label={`${translate('Term GWA')} ${termGwa}`}>
                <span>{translate('Term GWA')}</span>
                <strong>{termGwa}</strong>
              </div>
            </div>

            {term.courses.length === 0 ? (
              <div className="grades-empty">
                <strong>{translate('No grades posted yet')}</strong>
                <p>{translate('There are no completed courses or grades available for this term.')}</p>
              </div>
            ) : (
              <div className="grade-table-wrapper">
                <table className="grade-table">
                  <thead>
                    <tr>
                      <th scope="col">{translate('Course')}</th>
                      <th scope="col">{translate('Units')}</th>
                      <th scope="col">{translate('Grade')}</th>
                      <th scope="col">{translate('Status')}</th>
                      <th scope="col">{translate('Removal')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {term.courses.map((course) => (
                      <tr key={course.code} className={course.status === 'Incomplete' ? 'incomplete-row' : ''}>
                        <th scope="row">
                          <strong>{course.code}</strong>
                          <span>{course.title}</span>
                        </th>
                        <td data-label={translate('Units')}>{course.units}</td>
                        <td data-label={translate('Grade')}><strong className="grade-value">{course.grade}</strong></td>
                        <td data-label={translate('Status')}>
                          <span className={`grade-status ${course.status.toLowerCase().replaceAll(' ', '-')}`}>
                            {translate(course.status)}
                          </span>
                        </td>
                        <td data-label={translate('Removal')}>{course.removal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}

      {visibleTerms.length === 0 && (
        <section className="portal-card grades-empty card-full">
          <strong>{translate('No matching term')}</strong>
          <p>{translate('Choose another year or semester to see grades.')}</p>
        </section>
      )}

      <section className="portal-card grade-guide card-full" aria-labelledby="grade-guide-title">
        <h2 id="grade-guide-title">{translate('How to read your grades')}</h2>
        <dl className="grade-guide-list">
          <div><dt>1.00–3.00</dt><dd>{translate('Passing grade')}</dd></div>
          <div><dt>4.00</dt><dd>{translate('Conditional grade; may need a removal exam')}</dd></div>
          <div><dt>5.00</dt><dd>{translate('Failed grade')}</dd></div>
          <div><dt>INC</dt><dd>{translate('Incomplete; course work still needs to be finished')}</dd></div>
        </dl>
      </section>
    </>
  );
};

export default Grades;
