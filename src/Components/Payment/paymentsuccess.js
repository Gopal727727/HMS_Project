import Link from "next/link";
export default function Paymentsuccess(){
    return (
       <>
        <h3><i className="fa fa-check-circle text-success my-4">Thank You for choosing our hotel</i></h3>
        <p className="my-4"> 
            <Link className="btn btn-dark" href={'/home'}>Home</Link>
            <Link className="btn hms-bg-dark ms-4" href={'/user/dashboard'}>My DashBoard</Link>
        </p>
        </>
    );
}