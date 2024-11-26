'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/Components/Admin/sidebar';

const EditEventType = () => {
    const [newEvent, setNewEvent] = useState({
        type: '',
        eventimg: null,
        price: ''
    });
    const [imgname, setImgname] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); 

    useEffect(() => {
        // Fetch event data using POST and body data (id and action)
        const fetchEventData = async () => {
            if (id) {
                try {
                    const response = await fetch('/api/fetchid', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id, action: 'et' }) // Send id and action through POST
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch event data');
                    }

                    const data = await response.json();
                    setNewEvent({
                        type: data.type || '',
                        price: data.price || '',
                        eventimg: null // Event image will not be fetched
                    });
                    setImgname(data.eventimg || '');
                } catch (error) {
                    console.error('Error fetching event data:', error);
                    alert('Failed to fetch event data');
                }
            }
        };

        fetchEventData();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    };

    // Handle file changes for event image
    const handleFileChange = (e) => {
        setNewEvent(prevEvent => ({
            ...prevEvent,
            eventimg: e.target.files[0]
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        
        // Required fields validation
        if (!newEvent.type) formErrors.type = "Event type is required";
        if (!newEvent.price || newEvent.price <= 0) formErrors.price = "Price should be a positive number";

        // Validate image
        if (newEvent.eventimg) {
            // Validate size and type only if an image is selected
            if (newEvent.eventimg.size > 2 * 1024 * 1024) {
                formErrors.eventimg = "File size should be less than 2 MB";
            }
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(newEvent.eventimg.type)) {
                formErrors.eventimg = "Only image files are allowed";
            }
        } else {
            formErrors.eventimg = "Event image is required"; // Show error if no new image is provided
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0; // Return true if no errors exist
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Create form data for API request
            const formData = new FormData();
            formData.append('id', id);
            formData.append('type', newEvent.type);
            formData.append('price', newEvent.price);
            formData.append('imgname', imgname); // Append old image name
            if (newEvent.eventimg) {
                formData.append('eventimg', newEvent.eventimg); // Append new image if provided
            }

            try {
                const response = await fetch('/api/editevent', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to update event');
                }

                alert('Event updated successfully');
                router.back(); // Go back to the previous page after successful update
            } catch (error) {
                alert('Error updating event: ' + error.message);
            }
        } else {
            console.log("Validation errors", errors);
        }
    };

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <Sidebar />
                </div>
                <div className="col-md-8 col-12">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Event Type</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className='bg-white'>
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
                                    <button type="submit" className="btn btn-primary">Edit Event Type</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => router.back()}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditEventType;
