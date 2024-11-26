'use client'
import Sidebar from "@/Components/Admin/sidebar";
import { decryptPassword } from "@/Components/utils/encryptdecrypt"; // Import the decryption function
import React, { useEffect, useState } from "react";

export default function Page() {
    const [userData, setUserData] = useState([]);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/user/fetchall'); // Fetching all users
                const data = await response.json();

                // Decrypt the password for each user before setting the state
                const decryptedUserData = data.map(user => ({
                    ...user,
                    password: decryptPassword(user.password) // Decrypt the password using the function
                }));

                setUserData(decryptedUserData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const filename = '';
        const type = 'user'
        try {
            const response = await fetch("/api/deleteimage", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, filename , type }),
            });

            if (response.ok) {
                window.location.href = '/admin/user-details';
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
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td> {/* Decrypted password */}
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-danger ms-2" 
                                                onClick={() => handleDelete(user.id)}>
                                                Delete
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
