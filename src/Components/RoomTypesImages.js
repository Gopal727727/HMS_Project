'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
export default function RoomTypesimages(){
    return (
        <Carousel showThumbs={false}>
                <div>
                    <img src="/Banners/b1.png" />
                    
                </div>
                <div>
                    <img src="/Banners/b1.png" />
                </div>
        </Carousel>
    );
}