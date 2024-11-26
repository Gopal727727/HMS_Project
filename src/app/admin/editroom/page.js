'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/Components/Admin/sidebar';
const EditRoomType = () => {
    const [imgname, setImgname] = useState('');
    const [newRoom, setNewRoom] = useState({
        type: '',
        roomimg: null,
        amenities: '',
        amount: ''
    });
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); 

    useEffect(() => {
        // Fetch room data using POST and body data (id and action)
        if (id) {
            fetch('/api/fetchid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, action: 'rt' }) // Send id and action through POST
            })
                .then(response => response.json())
                .then(data => {
                    setNewRoom({
                        type: data.type || '',
                        amenities: data.amenities || '',
                        amount: data.amount || '',
                        roomimg: null // Room image will not be fetched
                    });
                    setImgname(data.roomimg || '');
                })
                .catch(error => console.error('Error fetching room data:', error));
        }
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom(prevRoom => ({
            ...prevRoom,
            [name]: value
        }));
    };

    // Handle file changes for room image
    const handleFileChange = (e) => {
        setNewRoom(prevRoom => ({
            ...prevRoom,
            roomimg: e.target.files[0]
        }));
    };

    
    const validateForm = () => {
        let formErrors = {};
        if (!newRoom.type) formErrors.type = "Room type is required";
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

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Create form data for API request
            const formData = new FormData();
            formData.append('id', id);
            formData.append('type', newRoom.type);
            formData.append('amenities', newRoom.amenities); // Append amenities
            formData.append('amount', newRoom.amount); // Append amount
            formData.append('imgname', imgname); // Append old image name
    
            // Append the room image file if it exists
            if (newRoom.roomimg) {
                formData.append('roomimg', newRoom.roomimg); // Append new image as roomimg
            }

            for (let [key, value] of formData.entries()) {
                // Check if value is a File (i.e., an image)
                if (value instanceof File) {
                    console.log(`${key}:`, value.name); // Log only the file name
                } else {
                    console.log(`${key}:`, value); // Log other values
                }
            }
            try {
                const response = await fetch('/api/editroom', { // Update the API endpoint
                    method: 'POST',
                    body: formData
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update room type');
                }
    
                alert('Room type updated successfully');
                router.back(); // Go back to the previous page after successful update
            } catch (error) {
                alert('Error updating room type: ' + error.message);
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
                            <h5 className="modal-title">Edit Room Type</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className='bg-white'>
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
                                    <button type="submit" className="btn btn-primary">Edit Room Type</button>
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

export default EditRoomType;
