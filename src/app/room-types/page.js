'use client'
import Link from "next/link";
import { roomData } from "@/Components/Common/dbfetcher";
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
    const roomtype= roomData();
    if (user === null) {
        return <div>Loading...</div>;
      }
    

    if (roomtype.length === 0) {
        return <div>Loading...</div>; 
    }

    return (
        <section className="container my-5">
            <h3 className="my-4">Room Types</h3>
            <div className="row">
            {roomtype.map((roomtype) => (
                    <div className="col-4 mb-4" key={roomtype.id}>
                        <div className="card text-white hms-bg-dark text-center">
                            <Link 
                                href={{
                                    pathname: `/room-types/${roomtype.type.replace(/\s+/g, '-')}`, 
                                    query: { amount: roomtype.amount, img: roomtype.roomimg, type: roomtype.type, facilities: roomtype.amenities , available: roomtype.availability  } 
                                }} 
                                className="text-white"
                            >
                                <img className="card-img-top" src={`/room_img/${roomtype.roomimg}`} alt={`${roomtype.type} image`} />
                            </Link>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 className="card-title">
                                    <Link 
                                        href={{
                                            pathname: `/room-types/${roomtype.type.replace(/\s+/g, '-')}`, 
                                            query: { amount: roomtype.amount, img: roomtype.roomimg,type: roomtype.type, facilities: roomtype.amenities , available: roomtype.availability  } 
                                        }} 
                                        className="text-white"
                                    >
                                        {roomtype.type}
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

