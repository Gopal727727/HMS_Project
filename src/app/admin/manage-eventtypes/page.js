'use client'
import Sidebar from "@/Components/Admin/sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [eventData, setEventData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        type: '',
        eventimg: null,
        price: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/event_types');
                if (!response.ok) throw new Error('Failed to fetch event types');

                const data = await response.json();
                if (Array.isArray(data)) {
                    setEventData(data);
                } else {
                    console.error('Invalid data format:', data);
                    alert('Failed to load event types. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching event types:', error);
            }
        };

        fetchData();
    }, []);

    const validateForm = () => {
        let formErrors = {};
        if (!newEvent.type) {
            formErrors.type = "Event type is required";
        } else if (!/^[a-zA-Z]+$/.test(newEvent.type)) {
            formErrors.type = "Event type can only contain letters and spaces";
        }
        if (!newEvent.eventimg) formErrors.eventimg = "Event image is required";
        if (newEvent.eventimg && newEvent.eventimg.size > 2 * 1024 * 1024) 
            formErrors.eventimg = "File size should be less than 2 MB";
        if (newEvent.eventimg && !['image/png', 'image/jpeg', 'image/jpg'].includes(newEvent.eventimg.type)) {
            formErrors.eventimg = "Only image files are allowed";
        }
        if (!newEvent.price || newEvent.price <= 0) 
            formErrors.price = "Price should be a positive number";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Validate event type to prevent special characters
        if (name === "type" && !/^[a-zA-Z ]*$/.test(value)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                type: "Event type can only contain letters and spaces"
            }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, type: "" }));
            setNewEvent({ ...newEvent, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent({ ...newEvent, eventimg: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('type', newEvent.type);
        formData.append('eventimg', newEvent.eventimg);
        formData.append('price', newEvent.price);

        try {
            const response = await fetch('/api/addeventtypes', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const updatedData = await response.json();

                if (updatedData.eventType && updatedData.eventType.id) {
                    alert('Event Type added successfully!');
                    setShowModal(false);
                    setNewEvent({ type: '', eventimg: null, price: '' });
                    setEventData((prevData) => [...prevData, updatedData.eventType]);
                } else {
                    console.error('Invalid response structure:', updatedData);
                    alert('Error adding Event Type. Please try again.');
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error adding Event Type');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    const handleDelete = async (id, filename) => {
        const type = 'event'
        try {
            const response = await fetch("/api/deleteimage", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, filename, type }),
            });

            if (response.ok) {
                window.location.href = '/admin/manage-eventtypes';
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
                    <div className="d-flex justify-content-start mb-3">
                        <button
                            className="btn btn-success"
                            onClick={() => setShowModal(true)}>
                            Add Event Type
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Event Type</th>
                                    <th>Event Image</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventData.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{event.type}</td>
                                        <td>
                                            <img 
                                                src={`/event_img/${event.eventimg}`} 
                                                alt={event.type} 
                                                style={{ width: '100px', height: 'auto' }} 
                                            />
                                        </td>
                                        <td>Rs {event.price}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-danger ms-2" 
                                                onClick={() => handleDelete(event.id, event.eventimg)}>
                                                Delete
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-primary ms-2" 
                                               >
                                                <a href={`/admin/editevent/?id=${event.id}`}>Edit</a>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Event Type</h5>
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
                                        <label htmlFor="type" className="form-label">Event Type</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="type"
                                            name="type"
                                            value={newEvent.type}
                                            onChange={handleInputChange}
                                        />
                                        {errors.type && <div className="text-danger">{errors.type}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="eventimg" className="form-label">Event Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="eventimg"
                                            name="eventimg"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                        {errors.eventimg && <div className="text-danger">{errors.eventimg}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            name="price"
                                            value={newEvent.price}
                                            onChange={handleInputChange}
                                        />
                                        {errors.price && <div className="text-danger">{errors.price}</div>}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Save Event Type</button>
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
