'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ChangePassword() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const queryEmail = searchParams.get('email');
        if (queryEmail) {
            setEmail(queryEmail);
        } else {
            alert('No email provided. Redirecting back to OTP page.');
            router.push('/user/forgetpassword'); // Redirect if no email is found
        }
    }, [searchParams, router]);

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if passwords match
        const pass1 = e.target.pass1.value;
        const pass2 = e.target.pass2.value;

        if (pass1 !== pass2) {
            alert('Passwords do not match');
            return;
        }

        const newData = {
            password: pass1, // Use the new password
            email: email // The email retrieved from URL
        };

        try {
            // Send data to the API
            const response = await fetch('/api/user/change_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (response.ok) {
                alert('Password changed successfully!');
                router.push('/user/login'); // Redirect to login page after success
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-10 offset-1">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <img src="/Thumbs/signup.png" className="img-fluid" alt="Signup" />
                        </div>
                        <div className="col-md-6 col-12">
                            <h3 className="mb-3">Forget Password</h3>
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">New Password</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="*****"
                                                name="pass1"
                                                id="pass1"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <div>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="*****"
                                                name="pass2"
                                                id="pass2"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button className="btn btn-dark" type="submit">Change Password</button>
                                        <button className="btn btn-danger ms-4" type="reset">Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
