'use client'
import Link from "next/link";
import { useSearchParams} from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import * as Yup from 'yup';
import React, { useEffect ,useState} from 'react';
export default function page(){
    const router = useRouter();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');

        if (!storedUser) {
        alert("Login to access")
        window.location.href='/user/login';
        } else {
        setUser(JSON.parse(storedUser));
        }
    }, [router]);
    const searchParams = useSearchParams();
    const availability = searchParams.get('available');
    const roomAmount = searchParams.get('amount'); 
    const roomType = searchParams.get('type');
    const roomImg = searchParams.get('img');
    const amenities = searchParams.get('facilities');
    const array = amenities.split(',');
    const trimmedarr = array.map(item => item.trim());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const schema = Yup.object().shape({
        guests: Yup.number()
          .typeError('Guests must be a number')
          .min(1, 'At least 1 guest is required')
          .max(4, 'More than four guests are not allowed')
          .required('Guests is required'),
          checkIn: Yup.date()
          .min(today, 'Check-in date cannot be in the past')
          .max(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), 'Check-in date cannot be more than 7 days from today')
          .required('Check-in date is required'),
          checkOut: Yup.date()
          .min(Yup.ref('checkIn'), 'Check-out must be after check-in date')
          .required('Check-out date is required'),
      });
    
      const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
      });
    
    if (user === null) {
        return <div>Loading...</div>;
      }
    const username = user.username;

    if(availability == 0)
    {
        alert("Sorry, this room is not available right now");
        window.location.href="/room-types";
    }
    
      const guests = watch('guests');
      const checkInDate = watch('checkIn');
      const checkOutDate = watch('checkOut');
      
      const calculateTotalPrice = () => {
        if (checkInDate && checkOutDate) {
          const checkIn = new Date(checkInDate);
          const checkOut = new Date(checkOutDate);
          const dayDiff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)); // difference in days
          if (dayDiff > 0) {
            return dayDiff * roomAmount;
          }
        }
        return 0;
      };
    
      const totalPrice = calculateTotalPrice();
      const tax = totalPrice * 0.10;
      const finalAmount = totalPrice + tax; 

      const onSubmit = async (data) => {
        const formData = {
            username: username,
            type: roomType,
            amount: totalPrice,
            tax: tax,
            famount: finalAmount,
            guests: data.guests,
            checkIn: data.checkIn,
            checkOut: data.checkOut,
          };
          try {
            const response = await fetch('/api/user/roombook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Room Booked Successfully!');
                router.push('/');
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
                <div className="col-6">
                <img src={`/room_img/${roomImg}`} className="responsive-image" alt={`${roomImg} image`}  ></img>
                <h4 className="mt-3">Amenities:</h4>
                <hr />
                    <div className="col-3 fw-bold">
                        {trimmedarr.map((item, index) => (
                            <p key={index} className="mb-0">
                            {item}:<i className="fa fa-check-circle text-success"></i>
                            </p>
                        ))}
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <h5 className="card-header">Book Room</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label><b>RoomType: </b>{roomType}</label>
                                </div>
                                <div className="mb-3">
                                    <label><b>Charges: </b>{roomAmount}/Night</label>
                                </div>
                                <hr />
                                <div className="mb-3">
                                    <label><b>Total Guests: </b></label>
                                    <input className="form-control" type="number" {...control.register('guests')} />
                                    {errors.guests && <p className="text-danger">{errors.guests.message}</p>}
                                </div>
                                <div className="mb-3">
                                <label><b>Amount: </b><span className="text-success">{totalPrice}</span></label>
                                </div>
                                <div className="mb-3">
                                    <label><b>Check-In: </b></label>
                                    <Controller
                                    control={control}
                                    name="checkIn"
                                    render={({ field }) => <input className="form-control" type="date" {...field} />}
                                    />
                                    {errors.checkIn && <p className="text-danger">{errors.checkIn.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label><b>Check-Out: </b></label>
                                    <Controller
                                        control={control}
                                        name="checkOut"
                                        render={({ field }) => <input className="form-control" type="date" {...field} />}
                                        />
                                        {errors.checkOut && <p className="text-danger">{errors.checkOut.message}</p>}
                                </div>
                                <input type="submit" className="btn btn-outline-success" value="Book Room"></input>
                                <input type="reset" className="btn btn-outline-danger" value="cancel"></input>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}