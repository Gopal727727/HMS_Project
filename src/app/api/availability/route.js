import { db } from "@/Components/utils/dbconnect";

export async function POST(req) {
    const { id, availability } = await req.json();

    if (typeof id === 'undefined' || typeof availability === 'undefined') {
        return new Response('Invalid input', { status: 400 });
    }

    try {
        const query = 'UPDATE roomtypes SET availability = $1 WHERE id = $2';
        await db.query(query, [availability, id]);

        return new Response('Availability updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error updating availability:', error);
        return new Response('Internal server error', { status: 500 });
    }
}
