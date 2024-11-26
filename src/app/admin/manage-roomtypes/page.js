'use client'
import Sidebar from "@/Components/Admin/sidebar";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [roomData, setRoomData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newRoom, setNewRoom] = useState({
        type: '',
        roomimg: null,
        amenities: '',
        amount: ''
    });
    const [errors, setErrors] = useState({});

    // Fetch data from the API
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

    // Validation logic
const validateForm = () => {
    let formErrors = {};

    if (!newRoom.type) {
        formErrors.type = "Room type is required";
    } else if (/[^a-zA-Z\s]/.test(newRoom.type)) {
        formErrors.type = "Room type should contain only letters and spaces";
    }

    if (!newRoom.roomimg) formErrors.roomimg = "Room image is required";
    if (newRoom.roomimg && newRoom.roomimg.size > 2 * 1024 * 1024) formErrors.roomimg = "File size should be less than 2 MB";
    if (newRoom.roomimg && !['image/png', 'image/jpeg', 'image/jpg'].includes(newRoom.roomimg.type)) {
        formErrors.roomimg = "Only image files are allowed";
    }
    
    if (!newRoom.amenities) formErrors.amenities = "Amenities are required";
    if (!newRoom.amount || newRoom.amount <= 0) formErrors.amount = "Amount should be a positive number";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
};


const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
        if (/[^a-zA-Z\s]/.test(value)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                type: "Room type should contain only letters and spaces"
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, type: "" }));
        }
        const cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
        setNewRoom({ ...newRoom, [name]: cleanedValue });
    } else {
        setNewRoom({ ...newRoom, [name]: value });
    }
};


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            setNewRoom({ ...newRoom, roomimg: file });
        } else {
            console.log("No file selected"); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append('type', newRoom.type);

        formData.append('roomimg', newRoom.roomimg); // Ensure roomimg is not null
        formData.append('amenities', newRoom.amenities);
        formData.append('amount', newRoom.amount);

        // Debug log to inspect FormData content
        for (var pair of formData.entries()) {
            if (pair[0] === 'roomimg') {
                console.log(pair[0] + ', File Name: ' + pair[1].name + ', File Size: ' + pair[1].size + ' bytes'); // Log file details
            } else {
                console.log(pair[0] + ', ' + pair[1]); // Log other key-value pairs in FormData
            }
        }

        try {
            const response = await fetch('/api/addroomtypes', {
                method: 'POST',
                body: formData, // Send FormData instead of JSON
            });

            if (response.ok) {
                alert('Room Type added successfully!');
                setShowModal(false);
                // Reset the form after successful submission
                setNewRoom({ type: '', roomimg: null, amenities: '', amount: '' });
                // Fetch updated room data
                const updatedData = await response.json(); // Adjust based on your API response
                setRoomData((prevData) => [...prevData, updatedData.roomType]);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error adding Room Type');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async (id,filename) => {
        const type = 'room'
        try {
            const response = await fetch("/api/deleteimage", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, filename , type }),
            });

            if (response.ok) {
                window.location.href = '/admin/manage-roomtypes';
            } else {
                console.error("Error deleting event type");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <Sidebar />
                </div>

                <div className="col-md-8 col-12">
                    {/* Add Room Type Button */}
                    <div className="d-flex justify-content-start mb-3">
                        <button
                            className="btn btn-success"
                            onClick={() => setShowModal(true)}>
                            Add Room Type
                        </button>
                    </div>

                    {/* Table for Room Types */}
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Image</th>
                                    <th>Amenities</th>
                                    <th>Amount</th>
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
                                        <td>{room.amenities}</td>
                                        <td>Rs {room.amount}</td>
                                        <td>
                                            <button onClick={() => handleDelete(room.id,room.roomimg)}
                                                className="btn btn-sm btn-outline-danger ms-2">
                                                Delete
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-primary ms-2">
                                               <a href={`/admin/editroom/?id=${room.id}`}>Edit</a>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for adding a new room type */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Room Type</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}> 
                                    <div className="mb-3">
                                        <label htmlFor="type" className="form-label">Room Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="type"
                                            name="type"
                                            value={newRoom.type}
                                            onChange={handleInputChange}
                                        />
                                        {errors.type && <div className="text-danger">{errors.type}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="roomimg" className="form-label">Room Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="roomimg"
                                            name="roomimg"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                        {errors.roomimg && <div className="text-danger">{errors.roomimg}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amenities" className="form-label">Amenities</label>
                                        <textarea
                                            className="form-control"
                                            id="amenities"
                                            name="amenities"
                                            value={newRoom.amenities}
                                            onChange={handleInputChange}
                                            rows="3">
                                        </textarea>
                                        {errors.amenities && <div className="text-danger">{errors.amenities}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            value={newRoom.amount}
                                            onChange={handleInputChange}
                                        />
                                        {errors.amount && <div className="text-danger">{errors.amount}</div>}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Save Room Type</button> {/* Add submit button here */}
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
