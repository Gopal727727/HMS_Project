import fs from 'fs/promises';
import path from 'path';
import pool, { db } from '@/Components/utils/dbconnect'; // Import your connection pool and db object

export async function POST(req) {
    try {
        const formData = await req.formData();
        const id = formData.get('id');
        const type = formData.get('type');
        const price = formData.get('price');
        const newImage = formData.get('eventimg');
        const oldImageName = formData.get('imgname'); 

        if (!id || !type || !price) {
            throw new Error("Missing required fields");
        }

        // Define the directory for event images
        const imageDir = path.join(process.cwd(), 'public/event_img');

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
            newImageName = newImage.name; // Get the new image name
            const newImagePath = path.join(imageDir, newImageName);
            const buffer = Buffer.from(await newImage.arrayBuffer());
            await fs.writeFile(newImagePath, buffer);
            console.log(`Uploaded new image: ${newImageName}`);
        } else {
            newImageName = oldImageName; // Keep the old image if no new one is uploaded
        }

        // Update the database with the new image name using the db object
        await db.query(
            'UPDATE eventtype SET type = $1, price = $2, eventimg = $3 WHERE id = $4',
            [type, price, newImageName, id] 
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
