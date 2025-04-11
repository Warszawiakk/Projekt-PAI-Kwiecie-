'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cities = [
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

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    city: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${params.id}`);
        const data = res.data;
        setEventData({
          title: data.title,
          description: data.description,
          date: data.date.split('T')[0],
          location: data.location,
          city: data.city,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/events/${params.id}`, eventData);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edytuj Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tytuł"
          className="w-full border px-3 py-2 rounded"
          value={eventData.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Opis"
          className="w-full border px-3 py-2 rounded"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          required
        />
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={eventData.date}
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Lokalizacja"
          className="w-full border px-3 py-2 rounded"
          value={eventData.location}
          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
          required
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={eventData.city}
          onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
          required
        >
          <option value="">Wybierz miasto</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}
