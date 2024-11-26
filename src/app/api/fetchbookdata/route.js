// app/api/user/fetchbookdata.js

import pool from '@/Components/utils/dbconnect';

export async function POST(request) {
    try {
        const { type } = await request.json();

        let query;
        let params = [];

        if (type === 'event') {
            // Query for eventbook
            query = `SELECT * FROM eventbook WHERE  approval = $1`;
            params = ['pending'];
        } else if (type === 'room') {
            // Query for roombook
            query = `SELECT * FROM roombook WHERE approval = $1`;
            params = ['pending'];
        } else {
            return new Response(JSON.stringify({ error: 'Invalid type provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        // Execute the query
        const { rows } = await pool.query(query, params);

        // Return the results
        return new Response(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching booking data:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
