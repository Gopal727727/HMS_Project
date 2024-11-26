import pool from "@/Components/utils/dbconnect";
export async function POST(req) {
  try {
    const { username, type, id, action } = await req.json(); 

    let query;
    const values = [];

    if (id != null) {
      if (action === 'view') {
        if (type === 'room') {
          query = 'SELECT * FROM roombook WHERE id=$1';
          values.push(id);
        } else if (type === 'event') {
          query = 'SELECT * FROM eventbook WHERE id=$1';
          values.push(id);
        } else {
          return new Response(JSON.stringify({ error: 'Invalid type for view' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else if (action === 'delete') {
        if (type === 'room') {
          query = 'DELETE FROM roombook WHERE id=$1 RETURNING *'; // Return the deleted row
          values.push(id);
        } else if (type === 'event') {
          query = 'DELETE FROM eventbook WHERE id=$1 RETURNING *'; // Return the deleted row
          values.push(id);
        } else {
          return new Response(JSON.stringify({ error: 'Invalid type for delete' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else {
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else if (username != null) {
      if (type === 'room') {
        query = 'SELECT * FROM roombook WHERE username=$1';
        values.push(username);
      } else if (type === 'event') {
        query = 'SELECT * FROM eventbook WHERE username=$1';
        values.push(username);
      } else {
        return new Response(JSON.stringify({ error: 'Invalid type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Either id or username must be provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await pool.query(query, values);
    
    // Log the result for debugging
    console.log('Query result:', result.rows);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
