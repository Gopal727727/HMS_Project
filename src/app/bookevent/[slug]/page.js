'use client'
import Link from "next/link";
import RoomTypesimages from "@/Components/RoomTypesImages";
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
    const eventAmount = searchParams.get('amount'); 
    const availability = searchParams.get('available');
    const eventType = searchParams.get('type');
    const eventImg = searchParams.get('img');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const schema = Yup.object().shape({
         guests: Yup.number()
          .typeError('Guests must be a number')
          .min(5, 'At least 5 guest is required')
          .max(100, 'More than 50 guests are not allowed')
          .required('Guests is required'),
          details: Yup.string().required('Event details are required.'),
          checkIn: Yup.date()
          .min(today, 'Event date cannot be in the past')
          .max(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), 'Check-in date cannot be more than 7 days from today')
          .required('Event date is required'),
      });
    
      const { control, handleSubmit,register, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
      });
    
    if (user === null) {
        return <div>Loading...</div>;
      }
      const username = user.username;


      if(availability == 0)
      {
        alert("Sorry, This event is not available right now.")
        window.location.href="/bookevent"
      }
      const guests = watch('guests');
      const checkInDate = watch('checkIn');

      const calculateTotalPrice = () => {
        if (checkInDate && guests) {
            const selectedDate = new Date(checkInDate); 
            if (selectedDate >= today && guests > 0) {
                return guests * eventAmount;
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
            type: eventType,
            amount: totalPrice,
            tax: tax,
            famount: finalAmount,
            guests: data.guests,
            details: data.details,
            Eventdate: data.checkIn,

          };
          console.log(formData)
          try {
            const response = await fetch('/api/user/eventbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Event Booked Successfully!');
                router.push('/home');
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
                <div className="col-7"><div><img src={`/event_img/${eventImg}`} width={500}>
                </img></div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <h5 className="card-header">Book Event</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="mb-3">
                                    <label><b>Event Type: {eventType} </b></label>
                                </div>

                                <div class="mb-3">
                                    <label><b>Event Price: {eventAmount} / Guest </b></label>
                                </div>

                                <div class="mb-3">
                                    <label><b>Event Details: </b></label>
                                    <textarea 
                                        className="form-control"
                                        {...register('details')} 
                                    />
                                    {errors.details && <p className="text-danger">{errors.details.message}</p>}
                                </div>

                                <div class="mb-3">
                                    <label><b>Total Guests: </b></label>
                                    <input className="form-control" type="number" {...control.register('guests')} />
                                    {errors.guests && <p className="text-danger">{errors.guests.message}</p>}
                                </div>

                                <div class="mb-3">
                                    <label><b>Event Date: </b></label>
                                    <Controller
                                    control={control}
                                    name="checkIn"
                                    render={({ field }) => <input className="form-control" type="date" {...field} />}
                                    />
                                    {errors.checkIn && <p className="text-danger">{errors.checkIn.message}</p>}
                                </div>

                                <div class="mb-3">
                                    <label><b>Total Cost: </b></label>
                                    <h3 className="text-success">Rs. {totalPrice}</h3>
                                </div>

                                <input type="submit" value="Confirm Booking" className="btn btn-outline-success" />
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}