import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import pl from 'date-fns/locale/pl';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as CalendarIcon } from 'lucide-react';
import { API_BASE_URL } from '../config';

const locales = {
  'pl': pl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leaves`);
      const data = await res.json();
      
      const formattedEvents = data.map(leave => ({
        id: leave.id,
        title: `Urlop: ${leave.officerName} [${leave.badgeNumber}]`,
        start: new Date(leave.startDate),
        end: new Date(leave.endDate),
        allDay: true,
        resource: leave
      }));
      
      setEvents(formattedEvents);
      setLoading(false);
    } catch (err) {
      console.error('Błąd pobierania urlopów', err);
      setLoading(false);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: 'var(--lspd-blue)',
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        padding: '2px 5px'
      }
    };
  };

  const handleSelectEvent = (event) => {
    alert(`Urlop Funkcjonariusza: ${event.resource.officerName}\nData: ${format(event.start, 'dd.MM.yyyy')} - ${format(event.end, 'dd.MM.yyyy')}\nPowód: ${event.resource.reason}`);
  };

  return (
    <div className="main-content" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header" style={{ flexShrink: 0 }}>
        <div className="page-title">
          <h2><CalendarIcon size={24} style={{ display: 'inline', marginRight: '10px', verticalAlign: 'bottom' }} /> Kalendarz Urlopów</h2>
          <p>Wszystkie wnioski urlopowe automatycznie synchronizowane z Botem Discord</p>
        </div>
      </div>

      <div className="glass-card" style={{ flex: 1, padding: '1rem', minHeight: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>Ładowanie kalendarza...</div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            culture="pl"
            date={currentDate}
            view={currentView}
            onNavigate={(newDate) => setCurrentDate(newDate)}
            onView={(newView) => setCurrentView(newView)}
            style={{ height: '100%', color: 'var(--text-main)' }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelectEvent}
            messages={{
              next: "Następny",
              previous: "Poprzedni",
              today: "Dziś",
              month: "Miesiąc",
              week: "Tydzień",
              day: "Dzień",
              noEventsInRange: "Brak urlopów w tym miesiącu."
            }}
          />
        )}
      </div>

      <style>{`
        .rbc-calendar {
          font-family: var(--font-main);
        }
        .rbc-month-view {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0,0,0,0.2);
        }
        .rbc-header {
          padding: 0.75rem 0;
          background: rgba(255,255,255,0.05);
          border-bottom: 1px solid var(--border-color);
          font-weight: 600;
          color: var(--text-muted);
        }
        .rbc-month-row {
          border-top: 1px solid var(--border-color);
        }
        .rbc-day-bg {
          border-left: 1px solid var(--border-color);
        }
        .rbc-day-bg + .rbc-day-bg {
          border-left: 1px solid var(--border-color);
        }
        .rbc-off-range-bg {
          background: rgba(0,0,0,0.3);
        }
        .rbc-today {
          background: rgba(59, 130, 246, 0.1);
        }
        .rbc-date-cell {
          padding: 0.5rem;
          font-weight: 500;
        }
        .rbc-event {
          border-radius: 4px;
        }
        .rbc-btn-group button {
          color: var(--text-main);
          border-color: var(--border-color);
          background: transparent;
        }
        .rbc-btn-group button:hover {
          background: rgba(255,255,255,0.05);
        }
        .rbc-btn-group button.rbc-active {
          background: var(--lspd-blue);
          color: white;
          border-color: var(--lspd-blue);
          box-shadow: none;
        }
        .rbc-toolbar button:active, .rbc-toolbar button.rbc-active:active, .rbc-toolbar button.rbc-active:focus {
          background: var(--lspd-blue);
          border-color: var(--lspd-blue);
        }
      `}</style>
    </div>
  );
}

export default CalendarView;
