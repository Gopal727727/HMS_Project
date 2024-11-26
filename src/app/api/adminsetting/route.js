import { NextResponse } from 'next/server';
import { db } from '@/Components/utils/dbconnect';
import { encryptPassword,decryptPassword } from '@/Components/utils/encryptdecrypt';

export async function POST(request) {
    const { type, password } = await request.json(); // Get the type and password from the request body

    try {
        if (type === 'view') {
            // Handle the view type
            const result = await db.query('SELECT password FROM admin LIMIT 1'); // Select password from admin table
            const encryptedPassword = result.rows[0]?.password;

            if (encryptedPassword) {
                const decryptedPassword = decryptPassword(encryptedPassword); // Decrypt the password
                return NextResponse.json({ pass: decryptedPassword }); // Return decrypted password
            } else {
                return NextResponse.json({ error: 'No password found' }, { status: 404 });
            }
        } else if (type === 'update') {
            // Handle the update type
            if (!password) {
                return NextResponse.json({ error: 'Password is required' }, { status: 400 });
            }

            const encryptedPassword = encryptPassword(password); // Encrypt the new password
            await db.query('UPDATE admin SET password = $1', [encryptedPassword]); // Update the password in the database

            return NextResponse.json({ message: 'Password updated successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error handling admin settings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
