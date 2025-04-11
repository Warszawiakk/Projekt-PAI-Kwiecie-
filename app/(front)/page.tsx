'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  city: string;
};

const cities = [
  'Wszystkie',
  'Warszawa',
  'Kraków',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Łódź',
  'Katowice',
  'Szczecin',
  'Lublin',
  'Białystok',
];

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredCity, setFilteredCity] = useState('Wszystkie');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        const data: Event[] = res.data;

        if (filteredCity === 'Wszystkie') {
          setEvents(data);
        } else {
          const filtered = data.filter((event) => event.city === filteredCity);
          setEvents(filtered);
        }
      } catch (error) {
        console.error('Błąd pobierania eventów:', error);
      }
    };

    fetchEvents();
  }, [filteredCity]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <label htmlFor="city" className="block mb-1 font-semibold">
          Filtruj po mieście:
        </label>
        <select
          id="city"
          className="border px-3 py-2 rounded w-full"
          value={filteredCity}
          onChange={(e) => setFilteredCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {events.length === 0 ? (
        <p>Brak eventów w tym mieście.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{event.city} – {new Date(event.date).toLocaleDateString()}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
