import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';

export async function POST(req) {
  
  if (!req.body) {
    return NextResponse.json({ message: 'No data received' }, { status: 400 });
  }
  const formData = await req.formData();

  
  const type = formData.get('type'); 
  const eventimg = formData.get('eventimg'); 
  const price = formData.get('price'); 

  
  if (!type || !eventimg || !price) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  
  if (eventimg.size > 2 * 1024 * 1024) {
    return NextResponse.json({ message: 'File size exceeds 2 MB' }, { status: 400 });
  }
  
  const validTypes = ['image/jpeg', 'image/png'];
  if (!validTypes.includes(eventimg.type)) {
    return NextResponse.json({ message: 'Invalid file type. Only JPEG and PNG are allowed.' }, { status: 400 });
  }

  
  const priceValue = parseFloat(price);
  if (isNaN(priceValue) || priceValue <= 0) {
    return NextResponse.json({ message: 'Invalid price. Must be a positive number.' }, { status: 400 });
  }

  
  const uploadFolder = path.join(process.cwd(), 'public/event_img');
  await fs.mkdir(uploadFolder, { recursive: true });

  
  const uniqueSuffix = Date.now() + path.extname(eventimg.name);
  const filePath = path.join(uploadFolder, uniqueSuffix);

  
  const buffer = await eventimg.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(buffer));

  
  const query = `INSERT INTO eventtype (type, eventimg, price) VALUES ($1, $2, $3) RETURNING *`;
  const values = [type, uniqueSuffix, priceValue];

  
  try {
    const result = await db.query(query, values);
    return NextResponse.json({
      message: 'Event Type added successfully',
      eventType: result.rows[0],
    });
  } catch (dbError) {
    console.error('Error adding event type:', dbError);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
