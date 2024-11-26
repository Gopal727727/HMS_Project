'use client'
import { useEffect , useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const [eventData, seteventData] = useState([]);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://khalti.com/static/khalti-checkout.js";
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
                    body: JSON.stringify({ id: id , action: 'eb' }),
                });
                if (!response.ok) throw new Error('Failed to fetch datas');
                const data = await response.json();
                    seteventData(data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchData();
    }, []);
    console.log(eventData)
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
                                type: 'event', 
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
    const checkinDate = new Date(eventData.eventdate);
    const formattedCheckin = `${checkinDate.getFullYear()}/${(checkinDate.getMonth() + 1).toString().padStart(2, '0')}/${checkinDate.getDate().toString().padStart(2, '0')}`;
   
    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-8 offset-2">
                    <h3 className="my-4">Checkout</h3>
                    <table className="table table-bordered">
                        <tbody>
                                 <tr>
                                <th>Event Type</th>
                                <td>{eventData.type}</td>
                                </tr>

                                 <tr>
                                <th>Total Guests</th>
                                <td>{eventData.guests}</td>
                            </tr>
                            <tr>
                                <th>Event Date</th>
                                <td>{formattedCheckin}</td>
                            </tr>
                            <tr>
                                <th>Charges</th>
                                <td>{eventData.amount}</td>
                            </tr>
                            <tr>
                                <th>Tax</th>
                                <td>10% = {eventData.tax}</td>
                            </tr>
                            <tr>
                                <th>Total amount</th>
                                <td>charges + tax = {eventData.famount}</td>
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
