import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';

export async function POST(request) {
    const { username } = await request.json();

    if (!username) {
        return NextResponse.json({ message: 'Username is required' }, { status: 400 });
    }

    try {
        // Fetch the room bookings count
        const roomBookingsQuery = 'SELECT COUNT(*) AS count FROM roombook WHERE username = $1';
        const roomBookingsResult = await db.query(roomBookingsQuery, [username]);
        const roomCount = roomBookingsResult.rows[0].count;

        // Fetch the event bookings count
        const eventBookingsQuery = 'SELECT COUNT(*) AS count FROM eventbook WHERE username = $1';
        const eventBookingsResult = await db.query(eventBookingsQuery, [username]);
        const eventCount = eventBookingsResult.rows[0].count;

        return NextResponse.json({ room: roomCount, event: eventCount });
    } catch (error) {
        console.error('Error fetching booking data:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
