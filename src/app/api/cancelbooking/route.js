import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';

export async function DELETE(request) {
    try {
        const { id, type } = await request.json();

        let result;
        if (type === 'room') {
            // Delete from roombook table
            result = await db.query('DELETE FROM roombook WHERE id = $1', [id]);
        } else if (type === 'event') {
            // Delete from eventbook table
            result = await db.query('DELETE FROM eventbook WHERE id = $1', [id]);
        } else {
            return NextResponse.json({ message: 'Invalid booking type' }, { status: 400 });
        }

        // Check if any row was deleted
        if (result.rowCount > 0) {
            return NextResponse.json({ message: 'Booking canceled successfully' });
        } else {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error canceling booking:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
