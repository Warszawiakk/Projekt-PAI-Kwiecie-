import { NextResponse } from 'next/server';
import Event from '@/models/Events';
import connectDB from '@/lib/mongodb';
import { isAuthenticated } from '@/lib/checkAuth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ message: 'Brak dostępu, użytkownik niezalogowany' }, { status: 401 });
  }

  await connectDB();
  const event = await Event.findById(params.id);
  
  if (!event) {
    return NextResponse.json({ message: 'Event nie znaleziony' }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ message: 'Brak dostępu, użytkownik niezalogowany' }, { status: 401 });
  }

  await connectDB();

  try {
    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Event usunięty' });
  } catch (err) {
    return NextResponse.json({ message: 'Błąd przy usuwaniu eventu' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ message: 'Brak dostępu, użytkownik niezalogowany' }, { status: 401 });
  }

  const eventData = await req.json();
  await connectDB();
  
  try {
    const event = await Event.findByIdAndUpdate(params.id, eventData, { new: true });
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json({ message: 'Błąd przy edytowaniu eventu' }, { status: 500 });
  }
}
