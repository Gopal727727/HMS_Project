'use client';
import { useState, useEffect } from "react";

const getData= () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
      const fetchStudents = async () => {
        const res = await fetch('/api/students');
        const data = await res.json();
        setStudents(data);
      };
  
      fetchStudents();
    }, []);
    return students;
}

const roomData = () => {
  const [roomtype, setroomtype] = useState([]);

  useEffect(() => {
      const fetchroomtype = async () => {
          const res = await fetch('/api/room_types');
          const data = await res.json();
          setroomtype(data);
      };

      fetchroomtype();
  }, []);

  return roomtype; // Return both roomtype and loading state
};

const eventData = () => {
  const [eventtype, seteventtype] = useState([]);

  useEffect(() => {
      const fetchroomtype = async () => {
          const res = await fetch('/api/event_types');
          const data = await res.json();
          seteventtype(data);
      };

      fetchroomtype();
  }, []);

  return eventtype; 
};


const bookingData = (user, type) => {
  const [bookdata, setBookdata] = useState([]);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        // Log user and type for debugging
        console.log('Fetching booking history for:', { username: user, type: type });

        const res = await fetch('/api/bookhistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user,
            type: type,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setBookdata(data);
          console.log('Received booking data:', data); // Log received data
        } else {
          console.error("Failed to fetch booking history:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    // Only fetch when user and type are valid
    if (user && type) {
      fetchBookingHistory();
    }
  }, [user, type]);

  return bookdata;
};




export {getData, roomData , eventData , bookingData};