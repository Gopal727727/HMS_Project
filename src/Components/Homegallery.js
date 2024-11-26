'use client';
import FsLightbox from "fslightbox-react";
import React,{ useState ,useEffect } from "react";
export default function Homegallery(){
 const [toggler, setToggler]  = useState(false);
 const [sources, setSources] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/fetchimages'); 

                if (!response.ok) throw new Error('Failed to fetch images');

                const data = await response.json();
                const imageSources = data.map(({ filename }) => `/Gallery/${filename}`); // Only map filename with /Gallery/

                setSources(imageSources); // Set the sources for the lightbox
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);
    const imagesToShow = sources.slice(0, 6);

    return (
        <section className="container my-5">
            <FsLightbox 
                toggler={toggler}
                sources={sources}
            />
            <h2 className="my-3 text-center" id="gallery">Gallery 
                <button onClick={()=> setToggler(!toggler)} className="float-end fs-5 btn text-white hms-bg-dark">
                        View All
                </button>
            </h2>

            <div className="row">
                {imagesToShow.map((src, index) => (
                    <div className="col-4" key={index}>
                        <div className="card text-white bg-dark text-center mb-3">
                            <img width={500} height={300} className="card-img-top" src={src} alt={`Gallery image ${index + 1}`} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}