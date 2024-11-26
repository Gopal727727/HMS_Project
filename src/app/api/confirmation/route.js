import { db } from '@/Components/utils/dbconnect';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another service, depending on your provider
    auth: {
        user: process.env.EMAIL_USER, // your email address from .env
        pass: process.env.EMAIL_PASS, // your email password from .env
    },
});

export async function POST(req) {
    try {
        const { id, username, type } = await req.json();

        // Fetch the user's email from the database using the username
        const emailQuery = `SELECT email FROM users WHERE username = $1`;
        const { rows } = await db.query(emailQuery, [username]);

        if (rows.length === 0) {
            return new Response('User not found', { status: 404 });
        }

        const userEmail = rows[0].email;

        // Prepare the query and email message based on the type
        let updateQuery, emailSubject, emailText;

        if (type === 'room') {
            updateQuery = `UPDATE roombook SET approval = 'accepted' WHERE id = $1`;
            emailSubject = 'Room Booking Confirmation';
            emailText = 'Your room booking is accepted!!';
        } else if (type === 'event') {
            updateQuery = `UPDATE eventbook SET approval = 'accepted' WHERE id = $1`;
            emailSubject = 'Event Booking Confirmation';
            emailText = 'Your event booking is accepted!!';
        }

        // Update the respective table
        await db.query(updateQuery, [id]);

        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // sender address from .env
            to: userEmail, // recipient's email
            subject: emailSubject, // Subject line
            text: emailText, // Plain text body
        });

        return new Response(JSON.stringify({ message: 'Booking approved and email sent successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error processing confirmation:', error);
        return new Response('Internal server error', { status: 500 });
    }
}
