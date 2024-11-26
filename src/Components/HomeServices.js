import Link from "next/link";
export default function Homeservices(){
    return (
        <section className="container my-5">
            <h2 className="my-3 text-center" id="services">Services</h2>
        <div className="row h-100 d-flex align-items-center justify-content-center" >
            <div className="col-4">
                    <div className="card text-white hms-bg-dark text-center">
                            <img width={500} height={350} className="card-img-top" src="/Thumbs/event.png" alt="Card image cap"/>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 className="card-title"><Link href={'/bookevent'} className="text-white text-center">Events</Link></h5>
                            </div>
                    </div>
            </div>

            <div className="col-4">
                    <div className="card text-white hms-bg-dark text-center">
                            <Link href='/room-types'>
                            <img width={500} height={350} className="card-img-top" src="/Thumbs/room.png" alt="Card image cap"/>
                            </Link>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 className="card-title"><Link href='/room-types' className="text-white text-center">Room Types</Link></h5>
                            </div>
                    </div>
            </div>

        </div>
        </section>
    );
}