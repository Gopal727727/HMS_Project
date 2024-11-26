'use client'
import SidebarDashboard from "@/Components/user/sidebar_dashboard";
import Link from "next/link";
import React,{ useEffect, useState } from "react";

export default function page(){
    const [storedUser, setStoredUser] = useState(null);
    const [bookdata, setBookdata] = useState([]);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const user = sessionStorage.getItem('user');
        if (user) {
          setStoredUser(JSON.parse(user)); 
        }
      }
    }, []);
  
    useEffect(() => {
      if (storedUser) {
        const fetchBookingData = async () => {
          try {
            const username = storedUser.username;
            const response = await fetch('/api/bookhistory', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                type: 'event', 
              }),
            });
  
            if (response.ok) {
              const data = await response.json();
              setBookdata(data);
            } else {
              console.error('Failed to fetch booking data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching booking data:', error);
          }
        };
  
        fetchBookingData();
      }
    }, [storedUser]);

    const handleDelete = async (id, type) => {
      try {
          const response = await fetch('/api/cancelbooking', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id, type }), 
          });

          if (!response.ok) {
              throw new Error('Failed to cancel booking');
          }

          const result = await response.json();
          alert("Booking cancelled")
          console.log('Booking canceled:',result);
          window.location.reload();
      } catch (error) {
          console.error('Error canceling booking:', error);
      }
  };
    return(
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                      <SidebarDashboard/>
                </div>

                <div className="col-md-8 col-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Event Date</th>
                                    <th>Detail</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {bookdata.length === 0 ? (
                                  <tr>
                                      <td colSpan={4} className="text-danger text-center">
                                          0 Results
                                      </td>
                                  </tr>
                              ) : (
                                  bookdata.map((bd) => {
                                      const checkinDate = new Date(bd.eventdate);
                                      const amountClass = bd.status === 'unpaid' ? 'text-danger' : 'text-success';
                                      const paymentStatus = bd.status === 'unpaid' ? 'Due' : 'Paid';
                                      const formattedCheckin = `${checkinDate.getFullYear()}/${(checkinDate.getMonth() + 1).toString().padStart(2, '0')}/${checkinDate.getDate().toString().padStart(2, '0')}`;

                                      return (
                                          <tr key={bd.id}>
                                              <td>{formattedCheckin}</td>
                                              <td className="fw-bold">
                                                  <p className="m-0 hms-txt-light">{bd.type}</p>
                                                  <p className="m-0 hms-txt-light">Guests: {bd.guests}</p>
                                              </td>
                                              <td>
                                                  <div className="m-0 fw-bold">
                                                      <p className={`m-0 fw-bold ${amountClass}`}>
                                                          Rs {bd.amount} {paymentStatus}
                                                      </p>
                                                  </div>
                                              </td>
                                              <td>
                                                  <button 
                                                      onClick={() => handleDelete(bd.id, 'event')} 
                                                      className="btn btn-sm btn-outline-danger ms-2"
                                                  >
                                                      Cancel
                                                  </button>
                                                  {bd.status === 'unpaid' && (
                                                      <Link href={`/checkout-event?id=${bd.id}`} className="btn btn-sm btn-outline-success ms-2">Pay Now</Link>
                                                  )}
                                              </td>
                                          </tr>
                                      );
                                  })
                              )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}