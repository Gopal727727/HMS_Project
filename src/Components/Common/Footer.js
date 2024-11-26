export default function Footer(){
    return (
        <footer className="container-fluid py-3 hms-bg-normal" >
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <a href="#" className="text-decoration-none hms-bg-light "><h3>HRS</h3></a>
                        <h6 className="text-white">Hotel Reservation System</h6>
                    </div>
                    <div className="col-3 text-white">
                       <h4>About</h4>
                       <p><a href="/about" className="text-white text-decoration-none">Company</a></p>
                       <p><a href="/about" className="text-white text-decoration-none">History</a></p>
                    </div>

                    <div className="col-3 text-white">
                        <h4>Contact</h4>
                        <p><a href="#" className="text-white text-decoration-none">Email: hrs@gmail.com</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Phone: 9823232233</a></p>
                     </div>

                     <div className="col-3 text-white">
                        <h4>Support</h4>
                        <p><a href="#" className="text-white text-decoration-none">Terms and Conditions</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Privacy Policy</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Help</a></p>
                     </div>
                    
                </div>
            </div>
        </footer>
    );
}