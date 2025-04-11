import { NextResponse } from 'next/server';
import Event from '@/models/Events';
import connectDB from '@/lib/mongodb';
import { isAuthenticated } from '@/lib/checkAuth';

export async function GET(req: Request) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ message: 'Brak dostępu, użytkownik niezalogowany' }, { status: 401 });
  }

  await connectDB();
  const events = await Event.find();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ message: 'Brak dostępu, użytkownik niezalogowany' }, { status: 401 });
  }

  const eventData = await req.json();
  await connectDB();
  
  try {
    const event = new Event(eventData);
    await event.save();
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Błąd przy tworzeniu eventu' }, { status: 500 });
  }
}
