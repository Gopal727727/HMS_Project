import Link from "next/link";
export default function Homereview(){
    return (
        <section className="container my-5">
            <h2 className="my-3 text-center">Reviews
            </h2>
        <div className="row mb-5">
            <div className="col-5 border p-2">
                   <h5>Ram</h5>
                   <p>Great services</p>
                   <span className="text-warning">
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                   </span>
            </div>

            <div className="col-5 border p-2 offset-1">
                   <h5>Hari</h5>
                   <p>Great services</p>
                   <span className="text-warning">
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                   </span>
            </div>
        </div>

        <div className="row mb-5">
            <div className="col-5 border p-2">
                   <h5>Krishna</h5>
                   <p>Great services</p>
                   <span className="text-warning">
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                   </span>
            </div>

            <div className="col-5 border p-2 offset-1">
                   <h5>Shyam</h5>
                   <p>Great services</p>
                   <span className="text-warning">
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                    <i className="fa fa-star fa-2x"></i>
                   </span>
            </div>
        </div>
        </section>
    );
}