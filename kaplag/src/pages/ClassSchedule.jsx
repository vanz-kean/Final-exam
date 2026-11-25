import { useState } from 'react';
import { Link } from 'react-router-dom';
import { student } from '../data/student';
import { blockSchedules, nstpSections, peCourseNames, peSections } from '../data/registration';

const weekdays = [
  { key: 'M', label: 'Monday' },
  { key: 'T', label: 'Tuesday' },
  { key: 'W', label: 'Wednesday' },
  { key: 'Th', label: 'Thursday' },
  { key: 'F', label: 'Friday' },
  { key: 'S', label: 'Saturday' },
  { key: 'Su', label: 'Sunday' },
];
const firstHour = 7;
const lastHour = 19;
const hourHeight = 64;

const formatHour = (hour) => {
  const suffix = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:00 ${suffix}`;
};

const ClassSchedule = () => {
  const [view, setView] = useState('week');
  const rawRegistration = sessionStorage.getItem('kaplag-registration');
  const registration = rawRegistration ? JSON.parse(rawRegistration) : null;
  const selectedBlock = blockSchedules.find((block) => (
    block.id === registration?.blockId && block.year === student.year
  ));
  const selectedPE = peSections.find((section) => section.id === registration?.peSectionId);
  const selectedNSTP = nstpSections.find((section) => section.id === registration?.nstpSectionId);
  const hasSavedSchedule = Boolean(
    selectedBlock && selectedPE && (student.year !== 'Year 1' || selectedNSTP),
  );
  const classes = hasSavedSchedule
    ? [
      ...selectedBlock.courses.map((course) => ({ ...course, scheduleType: 'Block course' })),
      {
        ...selectedPE,
        course: peCourseNames[selectedPE.course]
          ? `${selectedPE.course} (${peCourseNames[selectedPE.course]})`
          : selectedPE.course,
        scheduleType: 'PE selection',
      },
      ...(student.year === 'Year 1'
        ? [{ ...selectedNSTP, scheduleType: 'NSTP selection' }]
        : []),
    ]
    : [];
  const scheduledDays = weekdays.map((day) => ({
    ...day,
    classes: classes.flatMap((course) => (
      course.days.includes(day.key) ? [{ ...course, day: day.key }] : []
    )),
  }));

  if (!hasSavedSchedule) {
    return (
      <section className="portal-card card-full schedule-empty">
        <h1 tabIndex="-1">Class Schedule</h1>
        <p>Your weekly timetable will appear here after you complete and save registration.</p>
        <Link className="btn btn-primary" to="/registration">Go to Registration</Link>
      </section>
    );
  }

  return (
    <>
      <section className="portal-card card-full schedule-heading">
        <div>
          <p className="schedule-kicker">Your registered classes</p>
          <h1 tabIndex="-1">Class Schedule</h1>
          <p>{student.semester} · {student.academicYear} · Section {selectedBlock.id}</p>
        </div>
        <div className="schedule-view-toggle" role="group" aria-label="Schedule view">
          <button type="button" aria-pressed={view === 'week'} onClick={() => setView('week')}>Week</button>
          <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
        </div>
      </section>

      <section className="portal-card card-full registered-schedule" aria-label="Registered classes">
        {view === 'week' ? (
          <div className="schedule-scroll" role="region" aria-label="Weekly timetable, scroll horizontally to see every day" tabIndex="0">
            <div className="weekly-timetable">
              <div className="timetable-header timetable-time-header">Time</div>
              {scheduledDays.map((day) => (
                <div className="timetable-header" key={day.key}>{day.label}</div>
              ))}
              <div className="timetable-times" aria-hidden="true">
                {Array.from({ length: lastHour - firstHour + 1 }, (_, index) => (
                  <span key={index} style={{ top: `${index * hourHeight}px` }}>{formatHour(firstHour + index)}</span>
                ))}
              </div>
              {scheduledDays.map((day) => (
                <div className="timetable-day" key={day.key} aria-label={`${day.label}: ${day.classes.length} classes`}>
                  {day.classes.map((course, index) => {
                    const top = ((course.start / 60) - firstHour) * hourHeight;
                    const height = ((course.end - course.start) / 60) * hourHeight;
                    return (
                      <article
                        key={`${course.scheduleType}-${course.course}-${course.section}-${index}`}
                        className={`timetable-event ${course.scheduleType.toLowerCase().replaceAll(' ', '-')}`}
                        style={{ top: `${top}px`, height: `${height}px` }}
                        title={`${course.course} · ${course.section} · ${course.time}`}
                      >
                        <strong>{course.course}</strong>
                        <span>Section {course.section}</span>
                        <span>{course.time}</span>
                      </article>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="schedule-list-wrap">
            <table className="schedule-list">
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Type</th>
                  <th scope="col">Section</th>
                  <th scope="col">Day(s)</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((course, index) => (
                  <tr key={`${course.scheduleType}-${course.course}-${course.section}-${index}`}>
                    <th scope="row">{course.course}</th>
                    <td>{course.scheduleType}</td>
                    <td>{course.section}</td>
                    <td>{course.dayLabel}</td>
                    <td>{course.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="schedule-disclaimer">
          This timetable is based on the sections saved in your registration. Classroom locations are not included in the available schedule data.
        </p>
      </section>
    </>
  );
};

export default ClassSchedule;
