'use client';
import Sidebar from "@/Components/Admin/sidebar";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [roomData, setRoomData] = useState([]);
    const [availabilityErrors, setAvailabilityErrors] = useState({});
    const [newAvailability, setNewAvailability] = useState({}); // State to store new availability input

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/room_types');
                const data = await response.json();
                setRoomData(data);
            } catch (error) {
                console.error('Error fetching room types:', error);
            }
        };

        fetchData();
    }, []);

    const validateAvailability = (availability) => {
        if (availability < 0) {
            return "Availability cannot be negative.";
        }
        return "";
    };

    const handleUpdateAvailability = async (id) => {
        const availability = newAvailability[id] || 0; // Get the new availability value
        const errorMessage = validateAvailability(availability);

        if (errorMessage) {
            setAvailabilityErrors((prev) => ({ ...prev, [id]: errorMessage }));
            return; // Stop execution if validation fails
        }

        setAvailabilityErrors((prev) => ({ ...prev, [id]: "" })); // Clear any previous errors

        try {
            const response = await fetch('/api/availability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, availability }),
            });

            if (response.ok) {
                alert("Availability updated successfully!");
                // Optionally refresh the data or update state
                const updatedData = roomData.map((room) =>
                    room.id === id ? { ...room, availability } : room
                );
                setRoomData(updatedData);
                setNewAvailability((prev) => ({ ...prev, [id]: 0 })); // Reset the input after update
            } else {
                alert("Failed to update availability.");
            }
        } catch (error) {
            console.error('Error updating availability:', error);
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
                                <tr>
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Image</th>
                                    <th>Availability</th>
                                    <th>Modify Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomData.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.id}</td>
                                        <td>{room.type}</td>
                                        <td>
                                            <img
                                                src={`/room_img/${room.roomimg}`}
                                                alt={room.type}
                                                style={{ width: '100px', height: 'auto' }}
                                            />
                                        </td>
                                        <td>{room.availability}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="0"
                                                defaultValue={room.availability}
                                                onChange={(e) => 
                                                    setNewAvailability((prev) => ({
                                                        ...prev,
                                                        [room.id]: Number(e.target.value)
                                                    }))
                                                }
                                            />
                                            {availabilityErrors[room.id] && (
                                                <div className="text-danger" style={{ fontSize: 'small' }}>
                                                    {availabilityErrors[room.id]}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-success ms-2"
                                                onClick={() => handleUpdateAvailability(room.id)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
