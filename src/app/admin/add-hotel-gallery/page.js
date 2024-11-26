'use client'
import { useEffect, useState } from "react";
import Sidebar from "@/Components/Admin/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const imagesPerPage = 8;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/fetchimages");
                const data = await response.json();
                setImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, []);

    const deleteImage = async (id, filename) => {
        const type = 'img'
        try {
            const response = await fetch("/api/deleteimage", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, filename , type }),
            });

            if (response.ok) {
                setImages(images.filter((image) => image.id !== id));
            } else {
                console.error("Error deleting image");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
    const totalPages = Math.ceil(images.length / imagesPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        const maxSize = 2 * 1024 * 1024; 

        if (file) {
            if (!allowedTypes.includes(file.type)) {
                setError("Only PNG, JPG, and JPEG files are allowed.");
                setSelectedFile(null);
            } else if (file.size > maxSize) {
                setError("File size should not exceed 2 MB.");
                setSelectedFile(null);
            } else {
                setError("");
                setSelectedFile(file);
            }
        }
    };

    const handleAddImage = async () => {
        if (!selectedFile) {
            setError("Please select a valid image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch("/api/addimage", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const newImage = await response.json();
                setImages([...images, newImage]); 
                setShowModal(false); 
                setSelectedFile(null);
                setError("");
            } else {
                setError("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.error("Error adding image:", error);
            setError("Error adding image.");
        }
    };

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <Sidebar />
                </div>
                <div className="col-md-8 col-12">
                    <div className="row mb-3">
                        <div className="col-12 text-end">
                            <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                                <FontAwesomeIcon icon={faPlus} /> Add Image
                            </button>
                        </div>
                    </div>
                    <div className="row">
                    {currentImages.length > 0 ? (
                            currentImages.map((image) => (
                                <div key={image.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <div className="card">
                                        <img
                                            src={`/gallery/${image.filename}`}
                                            alt={image.filename}
                                            className="card-img-top img-fluid custom-image"
                                        />
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <span>{image.filename}</span>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteImage(image.id, image.filename)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No images found.</p>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <button
                                className="btn btn-secondary"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Image to Gallery</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="imageUpload">Select Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="imageUpload"
                                            onChange={handleFileChange}
                                        />
                                        {error && <small className="text-danger">{error}</small>}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleAddImage}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
