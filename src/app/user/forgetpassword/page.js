'use client'
import Link from "next/link";
import React, { useState } from 'react';
import { emailexists } from "@/Components/utils/useValidation";
export default function page(){
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const generateOtp = () => {
    const digits = '0123456789';
    let otp = '';
    let seed = 123456; 

    for (let i = 0; i < 6; i++) {
      seed = (seed * 93071 + 49297) % 233280; 
      const index = seed % 10; 
      otp += digits[index];
  }

  return parseInt(otp);
  };

  const { register, handleSubmit, formState: { errors },getValues } = emailexists();

  const handleSendOtp = async (emailValue) => {
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);
    console.log(otpCode);
    try {
      const response = await fetch('/api/user/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: emailValue, otp: otpCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      console.log(`Sending OTP ${otpCode} to ${email}`);
      setIsButtonDisabled(true); 

      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsButtonDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmitEmail = async (data) => {
    await handleSendOtp(data.email); 
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      window.location.href=`/user/change_password?email=${encodeURIComponent(getValues('email'))}`;
    } else {
      alert('Wrong OTP. Please try again.');
    }
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
                            <h3 className="mb-3">Forget Password</h3>
                            <form onSubmit={handleSubmit(onSubmitEmail)}>
                                <div className="row">
                                <div className="col-md-6 col-12 mb-3">
                                    <label className="form-label">Enter your Email</label>
                                    <div className="input-group">
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            aria-label="Email" 
                                            {...register('email')}
                                            value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                             required
                                        />
                  
                                    </div>
                                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                </div>
                                    <div className=" col-md-6 col-12 mb-3">
                                    <label className="form-label">Enter OTP</label>
                                    <div>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                    <button className="btn btn-dark" type="button" onClick={handleSubmit(onSubmitEmail)} disabled={isButtonDisabled}> 
                                      {isButtonDisabled ? `Resend OTP in ${timer}s` : 'Send OTP'}
                                    </button>
                                    <button className="btn hms-bg-dark ms-4" type="submit" onClick={onSubmitOtp}>Submit</button>
                                    </div>
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