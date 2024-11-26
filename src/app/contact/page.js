'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function page() {
    return (
        <section className="contact-section py-5">
            <div className="container text-center">
                <h2 className="">Contact Us</h2>
                <p className="mb-5">We'd love to hear from you! Feel free to reach out through any of our channels below.</p>

                <div className="row justify-content-center">
                    {/* Phone */}
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card border-0 shadow">
                            <div className="card-body d-flex flex-column align-items-center">
                                <i className="fas fa-phone-alt fa-2x mb-3"></i>
                                <h5 className="card-title">Phone</h5>
                                <p className="card-text">+977 981223327</p>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card border-0 shadow">
                            <div className="card-body d-flex flex-column align-items-center">
                                <i className="fas fa-envelope fa-2x mb-3"></i>
                                <h5 className="card-title">Email</h5>
                                <p className="card-text">HRS@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card border-0 shadow">
                            <div className="card-body d-flex flex-column align-items-center">
                                <i className="fas fa-map-marker-alt fa-2x mb-3"></i>
                                <h5 className="card-title">Address</h5>
                                <p className="card-text">Khairahani-8, Parsa, Chitwan</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card border-0 shadow">
                            <div className="card-body d-flex flex-column align-items-center">
                                <i className="fas fa-globe fa-2x mb-3"></i>
                                <h5 className="card-title">Follow Us</h5>
                                <div className="d-flex justify-content-center mt-3">
                                    <a href="#" className="me-3 text-dark"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="me-3 text-dark"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="me-3 text-dark"><i className="fab fa-instagram"></i></a>
                                    <a href="#" className="text-dark"><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
