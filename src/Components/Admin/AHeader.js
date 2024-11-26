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

        if(user == null)
        {
            return(<div>loading</div>)
        }

    return (
                        <nav className="navbar navbar-expand-lg navbar-light hms-bg-normal-admin" data-bs-theme="dark">
                        <Link className="navbar-brand fw-bold hms-bg-light-admin" href="/admin/dashboard"><h3>Admin Panel</h3></Link>
                        <div className={"collapse navbar-collapse"} id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                        
                                        <li className="nav-item me-3">
                                            <Link href="/admin/dashboard" className="nav-link text-white fw-bold hms-bg-dark-admin ms-2 mr-0">
                                                <i className='fa fas fa-user'></i> {user.username}
                                            </Link>
                                        </li>

                                        <li className="nav-item me-3">
                                            <Link className="nav-link text-white fw-bold forhover-admin" href="/admin/settings">Settings</Link> </li>

                                        <li className="nav-item me-3">
                                            <button className="nav-link text-white fw-bold forhover-admin btn" onClick={handleLogout}>Logout</button>
                                        </li>
                                    
                            </ul>
                        </div>
                      
                        </nav>
    );
}