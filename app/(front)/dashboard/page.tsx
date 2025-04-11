'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  city: string;
  isBlocked: boolean;
};

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
      } catch (error) {
        console.error('Błąd pobierania eventów:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Na pewno chcesz usunąć ten event?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Event usunięty!');
        setEvents(events.filter(event => event._id !== id));
      } else {
        alert('Brak uprawnień lub błąd przy usuwaniu.');
      }
    } catch (error) {
      console.error('Błąd usuwania:', error);
    }
  };

  const handleToggleBlock = async (id: string) => {
    try {
      const res = await fetch(`/api/events/${id}/block`, {
        method: 'PATCH',
      });

      if (res.ok) {
        alert('Status eventu zmieniony!');
        setEvents(events.map(event => 
          event._id === id ? { ...event, isBlocked: !event.isBlocked } : event
        ));
      } else {
        alert('Brak uprawnień lub błąd przy blokowaniu.');
      }
    } catch (error) {
      console.error('Błąd blokowania:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {events.length === 0 ? (
        <p>Brak dostępnych eventów.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event._id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{event.city} – {new Date(event.date).toLocaleDateString()}</p>
                <p>{event.description}</p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={`/dashboard/edit/${event._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edytuj
                  </a>

                  {/* {session?.user?.admin === true && (
                    <>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Usuń
                      </button>
                      <button
                        onClick={() => handleToggleBlock(event._id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        {event.isBlocked ? 'Odblokuj' : 'Zablokuj'}
                      </button>
                    </>
                  )} */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
