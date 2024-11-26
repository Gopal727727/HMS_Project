import { db } from '@/Components/utils/dbconnect';
import fs from 'fs';
import path from 'path';

export async function DELETE(req) {
    const { id, filename , type} = await req.json();
    

    try {
        if(type === 'img')
        {
            const imagePath = path.join(process.cwd(), 'public/gallery', filename);
            await db.query("DELETE FROM gallery WHERE id = $1", [id]);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        if(type === 'event')
        {
            const imagePath = path.join(process.cwd(), 'public/event_img', filename);
            await db.query("DELETE FROM eventtype WHERE id = $1", [id]);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        if(type === 'room')
        {
            const imagePath = path.join(process.cwd(), 'public/room_img', filename);
            await db.query("DELETE FROM roomtypes WHERE id = $1", [id]);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        if (type === 'user')
        {
            await db.query("DELETE FROM users WHERE id = $1", [id]);
        }

        return new Response(JSON.stringify({ message: "Image deleted successfully", id }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error deleting image" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
