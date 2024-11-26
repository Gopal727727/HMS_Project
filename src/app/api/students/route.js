import pool from "@/Components/utils/dbconnect";

export async function GET(req) {
  try {
    const result = await pool.query('SELECT * FROM students'); 
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
