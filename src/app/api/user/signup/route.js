import { db } from "@/Components/utils/dbconnect";
import { encryptPassword } from "@/Components/utils/encryptdecrypt";

export async function POST(req) {
  const { username, email, mobile, action , id } = await req.json();

  try {
    if (action === 'insert') {
      // Insert new user
      const { firstname, lastname, password } = await req.json(); // Get the rest of the data for insert
      const encryptedPassword = encryptPassword(password);
      const query = `INSERT INTO users (firstname, lastname, username, password, email, mobile) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [firstname, lastname, username, encryptedPassword, email, mobile];
      const result = await db.query(query, values);

      if (result.rowCount > 0) {
        return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
      } else {
        return new Response(JSON.stringify({ message: "Failed to create user" }), { status: 400 });
      }
    } else if (action === 'update') {
      const query = `UPDATE users SET username = $1, email = $2, mobile = $3 WHERE id = $4 RETURNING *`; 
      const userId = id; 
      const values = [username, email, mobile, userId]; 
      const result = await db.query(query, values);

      if (result.rowCount > 0) {
        return new Response(JSON.stringify({ message: "User updated successfully" }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ message: "Failed to update user" }), { status: 400 });
      }
    } else {
      return new Response(JSON.stringify({ message: "Invalid action" }), { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
