export default function page()
{
    return (
        <section className="container my-5">
           <h3 className="my-4 fw-bold text-center">About us</h3>
           <hr/>
           <div className="row">
                <div className="col-md-6">
                <img src="/Thumbs/signup.png" alt="Hotel Management System" className="about-image" />
                </div>
                <div className="col-md-6 about-content">
                <p className="lead mt-4">
                    Welcome to HRS, your go-to solution for seamless hotel operations. Our platform is designed to streamline booking, reservations, room management, and staff coordination, providing you with an efficient and user-friendly experience.
                </p>
                <p>
                    At HRS, we aim to revolutionize the hospitality industry by offering a powerful system that allows hotels of all sizes to manage their day-to-day operations with ease. From guest check-in and check-out processes to billing, reporting, and customer service, HMS ensures a smooth flow of operations and enhances guest satisfaction.
                </p>
                <p>
                    Our system is built with cutting-edge technology, providing secure, real-time data management, and a flexible interface that caters to the unique needs of each hotel. Whether you're a boutique hotel or a large chain, HMS is the perfect partner to help you elevate your hotel management processes.
                </p>
                </div>
            </div>
        </section>
    );
}