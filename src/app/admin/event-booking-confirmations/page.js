'use client'
import Sidebar from "@/Components/Admin/sidebar";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/Components/utils/formatdate";

export default function Page() {
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetchbookdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: 'event' })
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data); 
                setBookingData(data); 

            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchData();
    }, []);

    const handleApprove = async (id, username, type) => {
        try {
            const response = await fetch('/api/confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, username, type })
            });
    
            if (!response.ok) {
                throw new Error('Failed to approve booking');
            }
    
            alert('Booking approved successfully');
            window.location.href = "/admin/event-booking-confirmation"
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };


    const handleReject = async (id, username, type) => {
        try {
            const response = await fetch('/api/rejection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, username, type })
            });
    
            if (!response.ok) {
                throw new Error('Failed to approve booking');
            }
    
            alert('Booking rejected successfully');
            window.location.href = "/admin/event-booking-confirmations";
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <Sidebar />
                </div>

                <div className="col-md-8 col-12">
                <div className="table-responsive">
    <table className="table table-bordered table-hover">
        <thead>
            <tr style={{ whiteSpace: 'nowrap' }}> {/* Prevent excessive wrapping */}
                <th>ID</th>
                <th>Username</th>
                <th>Type</th>
                <th>Total Amount</th>
                <th>Guests</th>
                <th>Event Date</th>
                <th>Payment Status</th>
                <th>Approval</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {bookingData.length === 0 ? (
                <tr>
                    <td colSpan="9" className="text-center">0 results</td> {/* Adjust colSpan */}
                </tr>
            ) : (
                bookingData.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.username}</td>
                        <td>{booking.type}</td>
                        <td>Rs {booking.famount}</td>
                        <td>{booking.guests}</td>
                        <td>{formatDate(booking.eventdate)}</td>
                        <td>{booking.status}</td>
                        <td>{booking.approval}</td>
                        <td>
                            {/* Inline block styling for buttons */}
                            <div className="d-flex justify-content-around">
                                <button 
                                    className="btn btn-sm btn-outline-success me-2" 
                                    onClick={() => handleApprove(booking.id, booking.username, 'event')}>
                                    Approve
                                </button>
                                <button 
                                    className="btn btn-sm btn-outline-danger" 
                                    onClick={() => handleReject(booking.id, booking.username, 'event')}>
                                    Reject
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
</div>

                </div>
            </div>
        </section>
    );
}
