import { useMemo, useState } from 'react';
import { student } from '../data/student';
import { useTranslation } from '../context/TranslationContext.jsx';

// BSCS 2022 Curriculum - Complete Prospectus Data (extracted from consolidated/prospectus.html)
const TERMS_DATA = [
  {
    id: 'y1s1',
    title: 'First Year · First Semester',
    totalUnits: 20,
    courses: [
      { code: 'CMSC 10', prerequisite: 'None', units: 3 },
      { code: 'CMSC 56', prerequisite: 'None', units: 3 },
      { code: 'CMSC 18', prerequisite: 'None', units: 3 },
      { code: 'RGE 1', prerequisite: 'None', units: 3 },
      { code: 'P.E 1', prerequisite: 'None', units: 2 },
      { code: 'NSTP 1-CWTS DHK', prerequisite: 'None', units: 3 },
      { code: 'CMSC 3', prerequisite: 'None', units: 3 },
    ],
  },
  {
    id: 'y1s2',
    title: 'First Year · Second Semester',
    totalUnits: 23,
    courses: [
      { code: 'NSTP 2-CWTS DHK', prerequisite: 'None', units: 3 },
      { code: 'PE 2 CH', prerequisite: 'None', units: 2 },
      { code: 'STAT 1', prerequisite: 'None', units: 3 },
      { code: 'CMSC 130', prerequisite: 'CMSC 56', units: 3 },
      { code: 'CMSC 126', prerequisite: 'CMSC 3 and CMSC 18', units: 3 },
      { code: 'CMSC 57', prerequisite: 'CMSC 56', units: 3 },
      { code: 'MATH 26', prerequisite: 'None', units: 3 },
      { code: 'CMSC 28', prerequisite: 'CMSC 10 and CMSC 18', units: 3 },
    ],
  },
  {
    id: 'y2s1',
    title: 'Second Year · First Semester',
    totalUnits: 20,
    courses: [
      { code: 'RGE 3', prerequisite: 'None', units: 3 },
      { code: 'PE 2 BT', prerequisite: 'None', units: 2 },
      { code: 'RGE 2', prerequisite: 'None', units: 3 },
      { code: 'MATH 27', prerequisite: 'MATH 26', units: 3 },
      { code: 'AMAT 131', prerequisite: 'STAT 1', units: 3 },
      { code: 'CMSC 133', prerequisite: 'CMSC 18 and CMSC 130', units: 3 },
      { code: 'CMSC 122', prerequisite: 'CMSC 18 and CMSC 57', units: 3 },
    ],
  },
  {
    id: 'y2s2',
    title: 'Second Year · Second Semester',
    totalUnits: 20,
    courses: [
      { code: 'PE 2 PG', prerequisite: 'None', units: 2 },
      { code: 'RGE 4', prerequisite: 'None', units: 3 },
      { code: 'MATH 28', prerequisite: 'MATH 27', units: 3 },
      { code: 'CMSC 124', prerequisite: 'CMSC 122', units: 3 },
      { code: 'CMSC 125', prerequisite: 'CMSC 122 and CMSC 133', units: 3 },
      { code: 'CMSC 127', prerequisite: 'CMSC 122', units: 3 },
      { code: 'CMSC 142', prerequisite: 'CMSC 122', units: 3 },
    ],
  },
  {
    id: 'y3s1',
    title: 'Third Year · First Semester',
    totalUnits: 18,
    courses: [
      { code: 'CMSC 128', prerequisite: 'CMSC 126 and CMSC 127', units: 3 },
      { code: 'CMSC 173', prerequisite: 'CMSC 142', units: 3 },
      { code: 'CMSC 185', prerequisite: 'CMSC 127', units: 3 },
      { code: 'CMSC 193', prerequisite: 'CMSC 126 and CMSC 127', units: 3 },
      { code: 'RGE 5', prerequisite: 'None', units: 3 },
      { code: 'RGE 6', prerequisite: 'None', units: 3 },
    ],
  },
  {
    id: 'y3s2',
    title: 'Third Year · Second Semester',
    totalUnits: 20,
    courses: [
      { code: 'CMSC 200a', prerequisite: 'None', units: 2 },
      { code: 'RGE 7', prerequisite: 'None', units: 3 },
      { code: 'NSM 192 (MPCS)', prerequisite: 'STAT 1 and Junior Standing', units: 3 },
      { code: 'CMSC 141', prerequisite: 'CMSC 124', units: 3 },
      { code: 'CMSC 137', prerequisite: 'CMSC 125', units: 3 },
      { code: 'CMSC 186', prerequisite: 'CMSC 128', units: 3 },
      { code: 'Qualified Elective 1', prerequisite: 'None', units: 3 },
    ],
  },
  {
    id: 'y3sum',
    title: 'Third Year · Summer',
    totalUnits: 3,
    courses: [
      { code: 'CMSC 198', prerequisite: 'COI', units: 3 },
    ],
  },
  {
    id: 'y4s1',
    title: 'Fourth Year · First Semester',
    totalUnits: 18,
    courses: [
      { code: 'RGE 8', prerequisite: 'None', units: 3 },
      { code: 'RGE 9', prerequisite: 'None', units: 3 },
      { code: 'CMSC 200b', prerequisite: 'COI', units: 2 },
      { code: 'Free Elective 1', prerequisite: 'None', units: 3 },
      { code: 'Qualified Elective 3', prerequisite: 'None', units: 3 },
      { code: 'Qualified Elective 2', prerequisite: 'None', units: 3 },
      { code: 'CMSC 199', prerequisite: 'COI', units: 1 },
    ],
  },
  {
    id: 'y4s2',
    title: 'Fourth Year · Second Semester',
    totalUnits: 17,
    courses: [
      { code: 'Qualified Elective 4', prerequisite: 'None', units: 3 },
      { code: 'Qualified Elective 5', prerequisite: 'None', units: 3 },
      { code: 'Free Elective 2', prerequisite: 'None', units: 3 },
      { code: 'CMSC 200c', prerequisite: 'COI', units: 2 },
      { code: 'PI 100', prerequisite: 'Junior Standing', units: 3 },
      { code: 'RGE 10', prerequisite: 'None', units: 3 },
    ],
  },
];

const TOTAL_UNITS = TERMS_DATA.reduce((sum, term) => sum + term.totalUnits, 0);

const Prospectus = () => {
  const { translate } = useTranslation();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredTerms = useMemo(() =>
    TERMS_DATA.map(term => ({
      ...term,
      courses: term.courses.filter(course =>
        course.code.toLowerCase().includes(search.toLowerCase()) ||
        course.prerequisite.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter(term => term.courses.length > 0),
    [search]
  );

  return (
    <>
      <section className="portal-card card-full">
        <h1 tabIndex="-1">{translate('Prospectus')}</h1>
        <p>{translate('Your course checklist for the whole program, term by term.')}</p>
        <dl className="student-details">
          <dt>{translate('Student number')}</dt><dd>{student.studentNumber}</dd>
          <dt>{translate('Name')}</dt><dd>{student.fullName}</dd>
          <dt>{translate('Program')}</dt><dd>{student.program}</dd>
          <dt>{translate('Curriculum')}</dt><dd>{student.curriculum}</dd>
          <dt>{translate('Total Units')}</dt><dd>{TOTAL_UNITS}</dd>
        </dl>
      </section>
      <section className="portal-card card-full">
        <h2>{translate('Filter courses')}</h2>
        <div className="filter-row">
          <label>{translate('Search courses')}
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={translate('Search by course code, name, or prerequisite...')}
            />
          </label>
          <label>{translate('Filter by status')}
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">{translate('All courses')}</option>
              <option value="nottaken">{translate('Not yet taken')}</option>
              <option value="taken">{translate('Completed')}</option>
            </select>
          </label>
        </div>
        <p className="filter-hint">
          Shortcut: Press <kbd>Ctrl</kbd>+<kbd>F</kbd> to focus search · <kbd>Esc</kbd> to clear
        </p>
      </section>
      {filteredTerms.map((term) => (
        <section className="portal-card card-full" key={term.id} aria-labelledby={term.id}>
          <h2 id={term.id}>{term.title}</h2>
          <div className="table-responsive">
            <table className="table kaplag-table prospectus-table">
              <thead>
                <tr>
                  <th scope="col">{translate('Course Description')}</th>
                  <th scope="col">{translate('Prerequisite')}</th>
                  <th scope="col">{translate('Units')}</th>
                  <th scope="col">{translate('Grade')}</th>
                  <th scope="col">{translate('Removal')}</th>
                  <th scope="col">{translate('Year')}</th>
                  <th scope="col">{translate('Semester')}</th>
                </tr>
              </thead>
              <tbody>
                {term.courses.map((course) => (
                  <tr key={course.code}>
                    <th scope="row">{course.code}</th>
                    <td>{course.prerequisite}</td>
                    <td>{course.units}</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" colSpan="2">{translate('Total units')}</th>
                  <td><strong>{term.totalUnits}</strong></td>
                  <td colSpan="4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      ))}
      <section className="portal-card card-full" aria-labelledby="legend-heading">
        <h2 id="legend-heading">{translate('Legend')}</h2>
        <ul className="legend-list">
          <li><strong>COI</strong>: {translate('Consent of Instructor')}</li>
          <li><strong>Removal</strong>: {translate('Grade from a removal exam, if any')}</li>
          <li><strong>Year / Semester</strong>: {translate('When the course was taken')}</li>
        </ul>
      </section>
    </>
  );
};

export default Prospectus;
