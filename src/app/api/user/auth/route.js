import { db } from "@/Components/utils/dbconnect";
import { decryptPassword } from "@/Components/utils/encryptdecrypt";
export async function POST(req) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return new Response(
          JSON.stringify({ error: "Username and password are required." }),
          { status: 400 } // Bad request
        );
      }
  
      try {
        // Fetch user and admin data based on username
        const user = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
        const admin = await db.query(`SELECT * FROM admin WHERE username = $1`, [username]);
      
        // Check if user exists and validate password
        if (user && user.rows && user.rows.length > 0) {
          const decryptedPassword = decryptPassword(user.rows[0].password);
      
          if (decryptedPassword === password) {
            return new Response(JSON.stringify({
              id: user.rows[0].id,
              username: user.rows[0].username,
              type: 'user'
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }
        } 
        
        // Check if admin exists and validate password
        if (admin && admin.rows && admin.rows.length > 0) {
          const decryptedPassword = decryptPassword(admin.rows[0].password);
      
          if (decryptedPassword === password) {
            return new Response(JSON.stringify({
              id: admin.rows[0].id,
              username: admin.rows[0].username,
              type: 'admin'
            }), {
              status: 200,
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }
        }
      
        // If no valid user or admin is found, return an error response
        return new Response(JSON.stringify({ error: "Invalid username or password" }), { status: 401 });
        
      } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
      }
    }      