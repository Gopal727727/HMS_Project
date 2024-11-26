'use client'
import SidebarDashboard from "@/Components/user/sidebar_dashboard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fieldexists } from "@/Components/utils/useValidation";

export default function page() {
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const userSession = JSON.parse(sessionStorage.getItem('user'));
            const userId = userSession ? userSession.id : null; 

            const requestData = {
                ...data,
                action: 'update',
                id: userId 
            };

            console.log(requestData);

            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                sessionStorage.clear();
                alert("Username changed, please re-login");
                window.location.href = '/user/login';
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error during change:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const { register, handleSubmit, formState: { errors } } = fieldexists();

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <SidebarDashboard />
                </div>

                <div className="col-md-8 col-12">
                    <div className="card">
                        <h5 className="card-header">Update Profile</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                </div>
                                <div className="row">
                                    <div className="col col-12 mb-3">
                                        <label className="form-label">UserName</label>
                                        <input type="text" className="form-control" {...register('username')} placeholder="Username" />
                                        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                                    </div>
                                    <div className="col col-12 mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" {...register('email')} placeholder="E-Mail" />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                    </div>
                                    <div className="col col-12 mb-3">
                                        <label className="form-label">Mobile</label>
                                        <input type="number" className="form-control" {...register('mobile')} placeholder="Mobile" />
                                        {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 my-3">
                                        <button className="btn hms-bg-dark" type="submit">Update</button>
                                        <button className="btn btn-secondary" id="signupbtnspacing" type="reset">Reset</button>
                                    </div>
                                    <p>If you want to change password. <Link href={'/user/forgetpassword'}>Click here.</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
