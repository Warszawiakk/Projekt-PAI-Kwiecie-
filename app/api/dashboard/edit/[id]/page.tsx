'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditEvent({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${params.id}`);
        setEvent(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCity(res.data.city);
        setDate(res.data.date);
        setLocation(res.data.location);
      } catch (error) {
        console.error('Błąd przy pobieraniu eventu:', error);
        alert('Błąd przy pobieraniu eventu.');
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEvent = { title, description, city, date, location };

    try {
      await axios.put(`/api/events/${params.id}`, updatedEvent);
      alert('Event edytowany!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Błąd przy edytowaniu eventu:', error);
      alert('Błąd przy edytowaniu eventu.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edytuj event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">Tytuł</label>
          <input
            id="title"
            type="text"
            placeholder="Tytuł eventu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-lg font-medium text-gray-700">Opis</label>
          <textarea
            id="description"
            placeholder="Opis eventu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="city" className="text-lg font-medium text-gray-700">Miasto</label>
            <input
              id="city"
              type="text"
              placeholder="Miasto"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="date" className="text-lg font-medium text-gray-700">Data</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="location" className="text-lg font-medium text-gray-700">Lokalizacja</label>
          <input
            id="location"
            type="text"
            placeholder="Lokalizacja"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Zapisz zmiany
          </button>
        </div>
      </form>
    </div>
  );
}
