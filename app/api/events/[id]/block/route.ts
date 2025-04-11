import { NextResponse } from 'next/server';
import Event from '@/models/Events';
import connectDB from '@/lib/mongodb';
import { isAuthenticated } from '@/lib/checkAuth';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ message: 'Brak dostępu, użytkownik niezalogowany' }, { status: 401 });
  }

  await connectDB();

  try {
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ message: 'Event nie znaleziony' }, { status: 404 });
    }

    event.isBlocked = !event.isBlocked;
    await event.save();

    return NextResponse.json({ message: 'Status eventu zmieniony' });
  } catch (err) {
    return NextResponse.json({ message: 'Błąd przy zmianie statusu' }, { status: 500 });
  }
}
