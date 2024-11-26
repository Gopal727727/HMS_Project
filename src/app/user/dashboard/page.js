'use client'
import SidebarDashboard from "@/Components/user/sidebar_dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [bookingData, setBookingData] = useState({ room: 0, event: 0 });

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');

        if (!storedUser) {
            window.location.href = '/user/login';
        } else {
            setUser(JSON.parse(storedUser));

            const fetchBookingData = async () => {
                try {
                    const response = await fetch('/api/userdata', {
                        method: 'POST', // Assuming you're using POST to send data
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: JSON.parse(storedUser).username }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch booking data');
                    }

                    const jsonData = await response.json();
                    setBookingData(jsonData); // Assuming the response structure is { room: count, event: count }
                } catch (error) {
                    console.error('Error fetching booking data:', error);
                }
            };

            fetchBookingData();
        }
    }, [router]);

    if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <section className="container my-5">
            <div className="row">
                <h3 className="text-center text-success">Welcome, {user.username}</h3>
                <div className="col-md-4 col-12">
                    <SidebarDashboard />
                </div>
                <div className="col-md-8 col-12">
                    <div className="row">
                        <div className="col-6 text-center">
                            <div className="card">
                                <h3 className="card-header">Total Room Bookings</h3>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h5>
                                        <Link href="/user/Booking_history" className="text-success">
                                            {bookingData.room}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 text-center">
                            <div className="card">
                                <h3 className="card-header">Total Event Bookings</h3>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h5>
                                        <Link href="/user/Event_booking_history" className="text-success">
                                            {bookingData.event}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
