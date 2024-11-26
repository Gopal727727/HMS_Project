import { db } from "@/Components/utils/dbconnect";

export async function POST(req) {
    const {
        username,
        type,
        amount,
        tax,
        famount,
        guests,
        details,
        Eventdate,
    } = await req.json();

    try {
        const query = `
            INSERT INTO eventbook (username, type, amount, tax, famount, guests, details, eventdate)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const values = [username, type, amount, tax, famount, guests, details, Eventdate];
        const result = await db.query(query, values);

        if (result.rowCount > 0) {
            return new Response(JSON.stringify({ message: "Event booking created successfully" }), { status: 201 });
        } else {
            return new Response(JSON.stringify({ message: "Failed to create booking" }), { status: 400 });
        }
    } catch (error) {
        console.error("Error inserting booking:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}
