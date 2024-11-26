'use client';
import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { loginValidation } from "@/Components/utils/useValidation";
export default function page(){
  const router = useRouter();
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData); // Parse userData
      alert("You are already logged in.");
      if (parsedUserData.type === 'admin') {
        router.replace('/admin/dashboard'); // Use replace to avoid navigating back to login
      } else {
        router.replace('/user/dashboard');
      }
    }
  }, [router]);

    const { register, handleSubmit, formState: { errors } } = loginValidation();
        const onSubmit = async (data) => {
            const { username, password } = data;
        
            try {
              const response = await fetch('/api/user/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              });
        
              if (!response.ok) {
                alert('Login failed: Wrong username or password');
                const errorData = await response.json().catch(() => ({ error: "Invalid response format." })); 
                return;
              }

              const userData = await response.json();
              sessionStorage.setItem('user', JSON.stringify(userData));
              const sessionExpiration = new Date().getTime() + 60 * 60 * 1000; 
              sessionStorage.setItem('sessionExpiration', sessionExpiration);
        
              const userType = userData.type;
              console.log(userType)
              if (userType === 'user') {
                  router.push('/user/dashboard') 
              } else {
                  router.push('/admin/dashboard') 
              }
            } catch (error) {
              console.error('Error during login:', error);
              alert("An unexpected error occurred. Please try again.");
            }
          };
        
      const handleReset = () => {
        document.getElementById("loginform").reset();
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
                            <h3 className="mb-3">Login</h3>
                            <form id="loginform" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control"  {...register('username')} placeholder="Username"/>
                                        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                                    </div>

                                    <div className="col-md-6 col-12 mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control"  {...register('password')} placeholder="****"/>
                                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                    </div>

                                    <div className="col-md-6 col-12 my-3">
                                        <button className="btn hms-bg-dark">Log in</button>
                                        <button className="btn btn-secondary" type="button" id="signupbtnspacing" onClick={handleReset}>Reset</button>
                                    </div>
                                    <p> <Link href={'/user/forgetpassword'} className="text-danger">Forgot password?</Link></p>
                                    <p>If you are not registered user. <Link href={'/user/sign-up'}>Sign-Up here.</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}