import { NextResponse } from 'next/server';
import pool from '@/Components/utils/dbconnect';
import { encryptPassword } from '@/Components/utils/encryptdecrypt';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const hashedPassword = encryptPassword(password);

    const query = 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *';
    const values = [hashedPassword, email];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'No user found with this email' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}