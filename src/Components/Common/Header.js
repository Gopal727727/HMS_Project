'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Header(){
        const [user, setUser] = useState(null);

        useEffect(() => {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set the user data
            }
        }, []);

        const handleLogout = () => {
            // Clear the session storage
            sessionStorage.removeItem('user');
            setUser(null);
            // Redirect to the homepage
           window.location.href = "/";
        };

    return (
                        <nav className="navbar navbar-expand-lg navbar-light hms-bg-normal" data-bs-theme="dark">
                        <div className="container">
                        <Link className="navbar-brand fw-bold hms-bg-light" href="/"><h3>HRS</h3></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={"collapse navbar-collapse"} id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3">
                                <Link className="nav-link text-white fw-bold forhover" href="/">Home</Link>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link text-white fw-bold forhover" href="/home#gallery">Gallery</a>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link text-white fw-bold forhover" href="/home#services">Services</a>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link text-white fw-bold forhover" href="/about">About Us</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link text-white fw-bold forhover" href="/contact">Contact</Link>
                            </li>
                            {!user ? (
                                    <li className="nav-item me-3">
                                        <Link href="/user/login" className="nav-link text-white fw-bold forhover">Login</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item me-3">
                                            <button className="nav-link text-white fw-bold forhover btn" onClick={handleLogout}>Logout</button>
                                        </li>
                                        <li className="nav-item">
                                            <Link href={'/bookevent'} className="nav-link text-white fw-bold hms-bg-dark">Book Event</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href={'/room-types'} className="nav-link text-white fw-bold hms-bg-dark ms-2">Book Room</Link>
                                        </li>
                                        <li className="nav-item me-3">
                                            <Link href="/user/dashboard" className="nav-link text-white fw-bold hms-bg-dark ms-2 mr-0">
                                                <i className='fa fas fa-user'></i> {user.username}
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        </div>
                        </nav>
    );
}