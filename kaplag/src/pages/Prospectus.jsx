import { useMemo, useState } from 'react';
import { student } from '../data/student';
import { useTranslation } from '../context/TranslationContext.jsx';

const terms = [
  ['First Year · First Semester', ['CMSC 10|None|3', 'CMSC 56|None|3', 'CMSC 18|None|3', 'RGE 1|None|3', 'P.E 1|None|2', 'NSTP 1-CWTS DHK|None|3', 'CMSC 3|None|3']],
  ['First Year · Second Semester', ['NSTP 2-CWTS DHK|None|3', 'PE 2 CH|None|2', 'STAT 1|None|3', 'CMSC 130|CMSC 56|3', 'CMSC 126|CMSC 3 and CMSC 18|3', 'CMSC 57|CMSC 56|3', 'MATH 26|None|3', 'CMSC 28|CMSC 10 and CMSC 18|3']],
];

const Prospectus = () => {
  const { translate } = useTranslation();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const visibleTerms = useMemo(() => terms.map(([title, courses]) => [
    title,
    courses.filter((course) => course.toLowerCase().includes(search.toLowerCase()))
  ]), [search]);

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
        </dl>
      </section>
      <section className="portal-card card-full">
        <h2>{translate('Filter courses')}</h2>
        <div className="filter-row">
          <label>{translate('Search courses')}
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={translate('Course code or prerequisite')} />
          </label>
          <label>{translate('Filter by status')}
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">{translate('All courses')}</option>
              <option value="nottaken">{translate('Not yet taken')}</option>
            </select>
          </label>
        </div>
      </section>
      {visibleTerms.map(([title, courses]) => courses.length > 0 && (
        <section className="portal-card card-full" key={title}>
          <h2>{title}</h2>
          <div className="table-responsive">
            <table className="table kaplag-table">
              <thead><tr><th>{translate('Course')}</th><th>{translate('Prerequisite')}</th><th>{translate('Units')}</th><th>{translate('Grade')}</th></tr></thead>
              <tbody>{courses.map((course) => {
                const [code, prerequisite, units] = course.split('|');
                return <tr key={code}><th>{code}</th><td>{prerequisite}</td><td>{units}</td><td>—</td></tr>;
              })}</tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
};

export default Prospectus;
