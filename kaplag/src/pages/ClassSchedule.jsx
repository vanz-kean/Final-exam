import { useState } from 'react';
import { Link } from 'react-router-dom';
import { student } from '../data/student';
import { blockSchedules, nstpSections, peCourseNames, peSections } from '../data/registration';
import SchoolCalendar from './SchoolCalendar';

const weekdays = [
  { key: 'M', label: 'Monday' },
  { key: 'T', label: 'Tuesday' },
  { key: 'W', label: 'Wednesday' },
  { key: 'Th', label: 'Thursday' },
  { key: 'F', label: 'Friday' },
  { key: 'S', label: 'Saturday' },
  { key: 'Su', label: 'Sunday' },
];
const firstHour = 6;
const lastHour = 22;
const hourHeight = 64;

const formatHour = (hour) => {
  const suffix = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:00 ${suffix}`;
};

const ClassSchedule = () => {
  const [activeTab, setActiveTab] = useState('schedule');
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

  return (
    <>
      <section className="portal-card card-full schedule-heading">
        <div>
          <p className="schedule-kicker">Your week at a glance</p>
          <h1 tabIndex="-1">Class Schedule</h1>
          <p>
            {hasSavedSchedule
              ? `${student.semester} · ${student.academicYear} · Section ${selectedBlock.id}`
              : 'View your registered classes and academic calendar.'}
          </p>
        </div>
        <button
          className="google-calendar-button"
          type="button"
          disabled
          title="Decorative preview only; Google Calendar is not connected."
          aria-label="Add to Google Calendar. Decorative preview only."
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect x="4" y="6" width="24" height="22" rx="4" fill="#fff" stroke="#4285f4" strokeWidth="2" />
            <path d="M4 12h24" stroke="#4285f4" strokeWidth="2" />
            <path d="M10 3v6M22 3v6" stroke="#4285f4" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="8" y="16" width="4" height="4" rx="1" fill="#ea4335" />
            <rect x="14" y="16" width="4" height="4" rx="1" fill="#fbbc04" />
            <rect x="20" y="16" width="4" height="4" rx="1" fill="#34a853" />
            <text x="16" y="26" textAnchor="middle" fill="#4285f4" fontSize="7" fontWeight="700">31</text>
          </svg>
          <span>Add to Google Calendar</span>
        </button>
      </section>

      <div className="portal-card card-full schedule-tabs" role="group" aria-label="Class schedule sections">
        <button
          id="schedule-tab"
          type="button"
          aria-pressed={activeTab === 'schedule'}
          aria-controls="schedule-panel"
          onClick={() => setActiveTab('schedule')}
        >
          Class Schedule
        </button>
        <button
          id="calendar-tab"
          type="button"
          aria-pressed={activeTab === 'calendar'}
          aria-controls="calendar-panel"
          onClick={() => setActiveTab('calendar')}
        >
          School Calendar
        </button>
      </div>

      <div
        id="schedule-panel"
        className="schedule-tabpanel"
        hidden={activeTab !== 'schedule'}
      >
        {hasSavedSchedule ? (
          <>
            <section className="portal-card card-full schedule-toolbar" aria-label="Schedule display options">
              <p>Weekly timetable · {selectedBlock.id}</p>
              <div className="schedule-view-toggle" role="group" aria-label="Schedule view">
                <button type="button" aria-pressed={view === 'week'} onClick={() => setView('week')}>Week</button>
                <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}>List</button>
              </div>
            </section>

            <section className="portal-card card-full registered-schedule" aria-label="Registered classes">
              {view === 'week' ? (
                <div className="schedule-scroll" role="region" aria-label="Weekly timetable, scroll horizontally to see every day" tabIndex="0">
                  <div className="weekly-timetable" style={{ '--schedule-hours': lastHour - firstHour }}>
                    <div className="timetable-header timetable-time-header">Time</div>
                    {scheduledDays.map((day) => (
                      <div className="timetable-header" key={day.key}>{day.label}</div>
                    ))}
                    <div className="timetable-times" aria-hidden="true">
                      {Array.from({ length: lastHour - firstHour }, (_, index) => (
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
        ) : (
          <section className="portal-card card-full schedule-empty">
            <h2>Complete registration to see your timetable</h2>
            <p>Your saved block, PE, and NSTP sections will appear here as weekly class blocks.</p>
            <Link className="btn btn-primary" to="/registration">Go to Registration</Link>
          </section>
        )}
      </div>

      <div
        id="calendar-panel"
        className="schedule-tabpanel"
        hidden={activeTab !== 'calendar'}
      >
        <SchoolCalendar />
      </div>
    </>
  );
};

export default ClassSchedule;
