// app/api/addimage/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import pool from '@/Components/utils/dbconnect';

export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get('image'); 

    // Validate file type and size
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!file || !allowedTypes.includes(file.type) || file.size > maxSize) {
        return NextResponse.json({ message: 'Invalid file type or size.' }, { status: 400 });
    }

    const filename = file.name;
    const filePath = path.join(process.cwd(), 'public/Gallery', filename);

    // Write the file to the public/Gallery directory
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    // Insert into the database
    try {
        const query = 'INSERT INTO gallery (filename) VALUES ($1) RETURNING id';
        const values = [filename];
        const res = await pool.query(query, values); // Use your existing pool function
        
        return NextResponse.json({ id: res.rows[0].id, filename }, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }
}
