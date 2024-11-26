import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';

// Route handler for POST requests
export async function POST(req) {
  // Check if the request is a form data submission
  if (!req.body) {
    return NextResponse.json({ message: 'No data received' }, { status: 400 });
  }

  // Create a new FormData instance
  const formData = await req.formData();

  // Extract fields from formData
  const type = formData.get('type');
  const amenities = formData.get('amenities');
  const amount = formData.get('amount');
  const roomimg = formData.get('roomimg');

  // Validate required fields
  if (!type || !amenities || !amount || !roomimg) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Validate the file type and size
  if (roomimg.size > 2 * 1024 * 1024) {
    return NextResponse.json({ message: 'File size exceeds 2 MB' }, { status: 400 });
  }
  const validTypes = ['image/jpeg', 'image/png'];
  if (!validTypes.includes(roomimg.type)) {
    return NextResponse.json({ message: 'Invalid file type. Only JPEG and PNG are allowed.' }, { status: 400 });
  }

  // Convert amenities from a text area to CSV
  const amenitiesCSV = amenities.split('\n').join(',');

  // Validate amount as a positive number
  const amountValue = parseFloat(amount);
  if (isNaN(amountValue) || amountValue <= 0) {
    return NextResponse.json({ message: 'Invalid amount. Must be a positive number.' }, { status: 400 });
  }

  // Save the file to the designated folder
  const uploadFolder = path.join(process.cwd(), 'public/room_img');
  await fs.mkdir(uploadFolder, { recursive: true });

  // Define the filename and save the file
  const uniqueSuffix = Date.now() + path.extname(roomimg.name);
  const filePath = path.join(uploadFolder, uniqueSuffix);
  
  const buffer = await roomimg.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(buffer));

  // Insert the data into the PostgreSQL database
  const query = `INSERT INTO roomtypes (type, roomimg, amenities, amount) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [type, uniqueSuffix, amenitiesCSV, amountValue];
  
  try {
    const result = await db.query(query, values);
    return NextResponse.json({
      message: 'Room Type added successfully',
      roomType: result.rows[0],
    });
  } catch (dbError) {
    console.error('Error adding room type:', dbError);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
