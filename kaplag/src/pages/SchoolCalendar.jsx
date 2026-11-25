import { useMemo, useState } from 'react';
import {
  academicCalendarEvents,
  academicCalendarSource,
} from '../data/academicCalendar';

const terms = ['All events', 'First Semester', 'Second Semester', 'Midyear'];

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

const getMonthName = (date) => new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

const SchoolCalendar = () => {
  const [term, setTerm] = useState('All events');
  const [search, setSearch] = useState('');
  const visibleEvents = useMemo(() => academicCalendarEvents.filter((event) => {
    const matchesTerm = term === 'All events' || event.term === term;
    const matchesSearch = `${event.title} ${event.category} ${event.term}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesTerm && matchesSearch;
  }), [term, search]);
  const eventsByMonth = visibleEvents.reduce((months, event) => {
    const month = getMonthName(event.startDate);
    if (!months[month]) months[month] = [];
    months[month].push(event);
    return months;
  }, {});

  return (
    <>
      <section className="portal-card card-full calendar-heading">
        <div>
          <p className="calendar-kicker">UP Mindanao · Proposed academic calendar</p>
          <h2>School Calendar</h2>
          <p>Academic Year 2026–2027 · Key academic dates, university events, and official holidays.</p>
        </div>
        <span className="calendar-event-count" aria-live="polite">
          {visibleEvents.length} {visibleEvents.length === 1 ? 'event' : 'events'}
        </span>
      </section>

      <section className="portal-card card-full calendar-filters" aria-label="Filter calendar events">
        <label>
          Term
          <select value={term} onChange={(event) => setTerm(event.target.value)}>
            {terms.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Search events
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try registration, exams, or holidays"
          />
        </label>
      </section>

      {Object.entries(eventsByMonth).map(([month, events]) => (
        <section className="portal-card card-full calendar-month" key={month} aria-labelledby={`calendar-${month.replaceAll(' ', '-')}`}>
          <h2 id={`calendar-${month.replaceAll(' ', '-')}`}>{month}</h2>
          <ol className="calendar-event-list">
            {events.map((event) => (
              <li className="calendar-event" key={`${event.startDate}-${event.title}`}>
                <div className="calendar-event-date">
                  <time dateTime={event.startDate}>{formatDate(event.startDate)}</time>
                  {event.endDate !== event.startDate && (
                    <>
                      <span aria-hidden="true">–</span>
                      <time dateTime={event.endDate}>{formatDate(event.endDate)}</time>
                    </>
                  )}
                </div>
                <div className="calendar-event-detail">
                  <h3>{event.title}</h3>
                  <p>{event.term} · {event.category}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {visibleEvents.length === 0 && (
        <section className="portal-card card-full calendar-empty" role="status">
          <h2>No matching events</h2>
          <p>Try another term or search phrase.</p>
        </section>
      )}

      <section className="portal-card card-full calendar-source">
        <h2>About this calendar</h2>
        <p><strong>{academicCalendarSource.title}</strong> · Document dated {academicCalendarSource.documentDate}.</p>
        <p>{academicCalendarSource.status}</p>
        <ul>
          {academicCalendarSource.notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
        <p className="calendar-source-reference">
          Source: University of the Philippines Mindanao, <em>Proposed Academic Calendar: Academic Year 2026–2027</em>, one-page document released 19 March 2026.
        </p>
      </section>
    </>
  );
};

export default SchoolCalendar;
