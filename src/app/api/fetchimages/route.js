import pool from "@/Components/utils/dbconnect";

export async function GET(req) {
    try {
        const result = await pool.query("SELECT id, filename FROM gallery");
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error fetching images from the database" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
