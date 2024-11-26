'use client'
import Sidebar from "@/Components/Admin/sidebar";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchCurrentPassword = async () => {
            try {
                const response = await fetch('/api/adminsetting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ type: 'view', password: '' }), // Send empty password for view
                });
                const data = await response.json();
                if (data.pass) {
                    setCurrentPassword(data.pass); // Set the current password
                } else {
                    setError('Failed to fetch current password.');
                }
            } catch (error) {
                console.error('Error fetching current password:', error);
                setError('Error fetching current password.');
            }
        };

        fetchCurrentPassword();
    }, []);

    const validatePasswords = () => {
        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return false;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password must match.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validatePasswords()) {
            return;
        }

        try {
            const response = await fetch('/api/adminsetting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'update', password: newPassword }), // Send the new password for update
            });
            const data = await response.json();
            if (data.message) {
                setSuccess(data.message);
                setNewPassword('');
                setConfirmPassword('');

                // Alert the user and handle session
                alert('Password updated successfully! You need to re-login.');
                sessionStorage.clear(); // Clear session storage
                window.location.href = '/user/login'; // Redirect to login page
            } else {
                setError(data.error || 'Failed to update password.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Error updating password.');
        }
    };

    const handleReset = () => {
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
    };

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <Sidebar />
                </div>

                <div className="col-md-8 col-12">
                    <h3>Change Admin Password</h3>
                    <p className="text-danger">You need to relogin if password is changed</p>
                    <form onSubmit={handleSave}>
                        <div className="mb-3">
                            <label className="form-label">Current Password:</label>

                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                readOnly
                                className="form-control"
                            />
                            <input
                                type="checkbox"
                                checked={showCurrentPassword}
                                onChange={() => setShowCurrentPassword(!showCurrentPassword)}
                            /> Show Current Password
                        </div>

                        <div className="mb-3">
                            <label className="form-label">New Password:</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm Password:</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        {error && <div className="text-danger">{error}</div>}
                        {success && <div className="text-success">{success}</div>}

                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>Reset</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
