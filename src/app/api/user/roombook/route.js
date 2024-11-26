import { db } from "@/Components/utils/dbconnect";

export async function POST(req) {
    const {
        username,
        type,
        amount,
        tax,
        famount,
        guests,
        checkIn,
        checkOut,
      }= await req.json();

  try {
    const query = `
      INSERT INTO roombook (username, type, amount, tax, famount, guests, checkIn, checkOut)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [username, type, amount, tax, famount, guests, checkIn, checkOut];
    const result = await db.query(query, values);

    if (result.rowCount > 0) {
      return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: "Failed to create user" }), { status: 400 });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}