import { db } from "@/Components/utils/dbconnect";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const email = searchParams.get('email');
    const mobile = searchParams.get('mobile');
  
    try {
      let query = '';
      let values = [];
  
      if (username) {
        query = 'SELECT 1 FROM users WHERE username = $1';
        values = [username];
      } else if (email) {
        query = 'SELECT 1 FROM users WHERE email = $1';
        values = [email];
      } else if (mobile) {
        query = 'SELECT 1 FROM users WHERE mobile = $1';
        values = [mobile];
      } else {
        return new Response(JSON.stringify({ exists: false }), {
          status: 400,
        });
      }
  
      const result = await db.query(query, values);
      return new Response(JSON.stringify({ exists: result.rowCount > 0 }), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
      });
    }
  }