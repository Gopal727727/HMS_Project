import fs from 'fs/promises';
import path from 'path';
import pool, { db } from '@/Components/utils/dbconnect'; // Import your connection pool and db object

export async function POST(req) {
    try {
        const formData = await req.formData();
        const id = formData.get('id');
        const type = formData.get('type');
        const amount = formData.get('amount');
        const amenities = formData.get('amenities');
        const newImage = formData.get('roomimg');
        const oldImageName = formData.get('imgname'); 

        if (!id || !type || !amount || !amenities) {
            throw new Error("Missing required fields");
        }

        const imageDir = path.join(process.cwd(), 'public/room_img');

        // Delete the old image file if it exists
        if (oldImageName) {
            const oldImagePath = path.join(imageDir, oldImageName);
            try {
                await fs.unlink(oldImagePath);
                console.log(`Deleted old image: ${oldImageName}`);
            } catch (deleteError) {
                // Log the error and continue without throwing
                console.warn(`Error deleting old image ${oldImageName}:`, deleteError.message);
                // Do not throw an error, just continue with the update
            }
        }

        // Save the new image file if one was uploaded
        let newImageName = null;
        if (newImage && newImage.size > 0) {
            newImageName = newImage.name; 
            const newImagePath = path.join(imageDir, newImageName);
            const buffer = Buffer.from(await newImage.arrayBuffer());
            await fs.writeFile(newImagePath, buffer);
            console.log(`Uploaded new image: ${newImageName}`);
        } else {
            newImageName = oldImageName; // Keep the old image if no new one is uploaded
        }

        // Update the database with the new image name using the db object
        await db.query(
            'UPDATE roomtypes SET type = $1, amount = $2, roomimg = $3 , amenities = $4 WHERE id = $5',
            [type, amount, newImageName,amenities, id] 
        );
       
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error editing event:', error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to update event: ' + error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
