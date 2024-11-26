// app/api/fetchid/route.js
import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';

export async function POST(request) {
    const { id, action } = await request.json();

    let query;

    try {
        switch (action) {
            case 'rb':
                // Query for roombook
                query = `SELECT * FROM roombook WHERE id = $1`;
                break;
            case 'eb':
                // Query for eventbook
                query = `SELECT * FROM eventbook WHERE id = $1`;
                break;
            case 'rt':
                // Query for roomtypes
                query = `SELECT * FROM roomtypes WHERE id = $1`;
                break;
            case 'et':
                // Query for eventtype
                query = `SELECT * FROM eventtype WHERE id = $1`;
                break;
            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        // Execute the query
        const result = await db.query(query, [id]); // Use db.query with parameterized query
        const data = result.rows.length ? result.rows[0] : null; // Get the first row if available

        if (!data) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
