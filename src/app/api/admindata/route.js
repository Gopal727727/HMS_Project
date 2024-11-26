import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';

export async function GET() {
    try {

        const usersCountResult = await db.query('SELECT COUNT(*) AS count FROM users');
        const usersCount = parseInt(usersCountResult.rows[0].count, 10);

        const eventBookCountResult = await db.query('SELECT COUNT(*) AS count FROM eventbook');
        const roomBookCountResult = await db.query('SELECT COUNT(*) AS count FROM roombook');
        
        const eventBookCount = parseInt(eventBookCountResult.rows[0].count, 10);
        const roomBookCount = parseInt(roomBookCountResult.rows[0].count, 10);
        const totalBookingCount = eventBookCount + roomBookCount;

        const eventTypesCountsResult = await db.query(`
            SELECT type, COUNT(*) AS count 
            FROM eventbook 
            GROUP BY type
        `);
        const eventTypesCounts = {};
        for (const row of eventTypesCountsResult.rows) {
            eventTypesCounts[row.type] = parseInt(row.count, 10);
        }

        const roomTypesCountsResult = await db.query(`
            SELECT type, COUNT(*) AS count 
            FROM roombook 
            GROUP BY type
        `);
        const roomTypesCounts = {};
        for (const row of roomTypesCountsResult.rows) {
            roomTypesCounts[row.type] = parseInt(row.count, 10);
        }

        const responseData = {
            user: usersCount,
            Booking: totalBookingCount,
            e_type: eventTypesCounts,
            r_type: roomTypesCounts,
        };

        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
}
