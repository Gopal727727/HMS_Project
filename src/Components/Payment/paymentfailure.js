import Link from "next/link";
export default function Paymentfailure(){
    return (
       <>
        <h3><i className="fa fa-times-circle text-danger my-4"> Oops Something Went Wrong!!</i></h3>
        <h5 className="text-danger">Error Desciption: Error code</h5>
        <p className="my-4">
            <Link className="btn btn-dark" href={'/'}>Home</Link>
            <Link className="btn hms-bg-dark ms-4" href={'#'}>My DashBoard</Link>
        </p>
        </>
    );
}