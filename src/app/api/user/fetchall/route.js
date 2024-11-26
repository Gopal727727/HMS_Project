// app/api/user/fetchall.js
import pool from "@/Components/utils/dbconnect";

export async function GET(req) {
    try {
        // Query to fetch all users
        const query = 'SELECT * FROM users';
        const { rows } = await pool.query(query); // Execute the query

        // Return the fetched data as JSON
        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response('Error fetching users', { status: 500 });
    }
}
