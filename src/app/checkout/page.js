'use client'
import { useEffect , useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { eventData } from "@/Components/Common/dbfetcher";

export default function Page() {
    const [roomData, setroomData] = useState([]);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const search = useSearchParams();
    const id = search.get('id');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetchid', {
                    method: 'POST',
                    body: JSON.stringify({ id: id , action: 'rb' }),
                });
                if (!response.ok) throw new Error('Failed to fetch datas');
                const data = await response.json();
                    setroomData(data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchData();
    }, []);

    const payNow = () => {
        const config = {
            publicKey: "test_public_key_4798bcf91d6c4d3b9284ae8e83b6d136", // Replace with your Khalti test public key
            productIdentity: "12345", // Unique ID for the product
            productName: "Hotel Reservation System", // Name of the product
            productUrl: "http://example.com/test", // URL of the product
            amount: roomData.famount, // Amount in paisa (16500 paisa = 165.00 NPR)
            eventHandler: {
                onSuccess: async () => {
                    console.log("Payment Success");
                    try {
                        const response = await fetch('/api/payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: id,      
                                type: 'room', 
                            }),
                        });
    
                        if (!response.ok) throw new Error('Failed to update payment status');
    
                        window.location.href = "/payment/success";
                    } catch (error) {
                        console.error('Error updating payment status:', error);
                        alert('Failed to update payment status');
                    }
                },
                onCancel() {
                    alert("Payment Cancelled!");
                },
                onError(error) {
                    console.error("Payment Error:", error);
                    alert("Oops, something went wrong!!!");
                },
            },
        };
    
        const checkout = new window.KhaltiCheckout(config);
        checkout.show();
    };
    
    console.log(roomData)
    const checkinDate = new Date(roomData.checkin);
    const checkoutDate = new Date(roomData.checkout);
    const formattedCheckin = `${checkinDate.getFullYear()}/${(checkinDate.getMonth() + 1).toString().padStart(2, '0')}/${checkinDate.getDate().toString().padStart(2, '0')}`;
    const formattedCheckout = `${checkoutDate.getFullYear()}/${(checkoutDate.getMonth() + 1).toString().padStart(2, '0')}/${checkoutDate.getDate().toString().padStart(2, '0')}`;

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-8 offset-2">
                    <h3 className="my-4">Checkout</h3>
                    <table className="table table-bordered">
                        <tbody>
                                 <tr>
                                <th>Room Type</th>
                                <td>{roomData.type}</td>
                                </tr>

                                 <tr>
                                <th>Total Guests</th>
                                <td>{roomData.guests}</td>
                            </tr>
                            <tr>
                                <th>Check-In Date</th>
                                <td>{formattedCheckin}</td>
                            </tr>
                            <tr>
                                <th>Check-Out Date</th>
                                <td>{formattedCheckout}</td>
                            </tr>
                            <tr>
                                <th>Charges</th>
                                <td>{roomData.amount}</td>
                            </tr>
                            <tr>
                                <th>Tax</th>
                                <td>10% = {roomData.tax}</td>
                            </tr>
                            <tr>
                                <th>Total amount</th>
                                <td>charges + tax = {roomData.famount}</td>
                            </tr>
                                
                            
                            <tr>
                                <td colSpan={2}>
                                    <Link href={'#'}>Terms and Conditions</Link>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button className="btn btn-secondary">Cancel</button>
                                    <button onClick={payNow} className="btn hms-bg-dark ms-4">Pay Now</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
