'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useValidation } from "@/Components/utils/useValidation";
export default function page(){
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const requestData = {
                ...data,
                action: 'insert' ,
                id: null
            };
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            alert("Account created successfully!");
            router.push('/user/login'); // Redirect to login page
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
        } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again.");
        }
    };

    const { register, handleSubmit, formState: { errors } } = useValidation();
   
      const handleReset = () => {
        document.getElementById("signupform").reset();
      };
    return(
        <section className="container my-5">
            <div className="row">
                <div className="col-10 offset-1">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <img src="/Thumbs/signup.png" className="img-fluid" />
                        </div>
                        <div className="col-md-6 col-12">
                            <h3 className="mb-3">Sign-Up</h3>
                            <form onSubmit={handleSubmit(onSubmit)} id="signupform" method="post">
                                <div className="row">
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" {...register('firstname')}  placeholder="First name"/>
                                        {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control"  {...register('lastname')} placeholder="Last name"/>
                                        {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">UserName</label>
                                        <input type="text" className="form-control"  {...register('username')} placeholder="Username"/>
                                        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control"  {...register('password')} placeholder="****"/>
                                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control"  {...register('email')} placeholder="E-Mail"/>
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Mobile</label>
                                        <input type="number" className="form-control"  {...register('mobile')} placeholder="Mobile"/>
                                        {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-12 my-3">
                                        <button className="btn hms-bg-dark" type="submit">Submit</button>
                                        <button className="btn btn-secondary" id="signupbtnspacing" type="button" onClick={handleReset}>Reset</button>
                                    </div>
                                    <p>If you are already registered user. <Link href={'/user/login'}>Login here.</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}