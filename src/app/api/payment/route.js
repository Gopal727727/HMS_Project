import { NextResponse } from 'next/server';
import db from '@/Components/utils/dbconnect';

export async function POST(request) {
    try {
        const { id, type } = await request.json();

        // Check if id and type are valid
        if (!id || !type) {
            return NextResponse.json({ error: 'Invalid data provided' }, { status: 400 });
        }

        // Depending on the type, update the appropriate table
        let query = '';
        if (type === 'room') {
            query = `UPDATE roombook SET status = 'paid' WHERE id = $1`;
        } else if (type === 'event') {
            query = `UPDATE eventbook SET status = 'paid' WHERE id = $1`;
        } else {
            return NextResponse.json({ error: 'Invalid type provided' }, { status: 400 });
        }

        // Execute the query
        const result = await db.query(query, [id]);

        // Check if the update was successful
        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'Payment status updated successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
