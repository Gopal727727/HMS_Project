'use client'
import Link from "next/link";
import { eventData } from "@/Components/Common/dbfetcher";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
const Page = () => {
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
    const eventtype= eventData();
    if (user === null) {
        return <div>Loading...</div>;
      }
    

    if (eventtype.length === 0) {
        return <div>Loading...</div>; 
    }

    return (
        <section className="container my-5">
            <h3 className="my-4">Event Types</h3>
            <div className="row">
            {eventtype.map((eventtype) => (
                    <div className="col-4 mb-4" key={eventtype.id}>
                        <div className="card text-white hms-bg-dark text-center">
                            <Link 
                                href={{
                                    pathname: `/bookevent/${eventtype.type.replace(/\s+/g, '-')}`, 
                                    query: { amount: eventtype.price, img: eventtype.eventimg, type: eventtype.type , facilities: eventtype.amenities , available: eventtype.availability } 
                                }} 
                                className="text-white"
                            >
                                <img className="card-img-top" src={`/event_img/${eventtype.eventimg}`} width={500} alt={`${eventtype.type} image`} />
                            </Link>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 className="card-title">
                                    <Link 
                                        href={{
                                            pathname: `/bookevent/${eventtype.type.replace(/\s+/g, '-')}`, 
                                            query: { amount: eventtype.price, img: eventtype.eventimg,type: eventtype.type , facilities: eventtype.amenities , available: eventtype.availability } 
                                        }} 
                                        className="text-white"
                                    >
                                        {eventtype.type}
                                    </Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
export default Page;

