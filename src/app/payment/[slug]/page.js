import Paymentfailure from "@/Components/Payment/paymentfailure";
import Paymentsuccess from "@/Components/Payment/paymentsuccess";

export default function page({params}){
    const slug = params.slug;
    return (
        <section className="container my-5 text-center">
            {
                slug== 'success' && <Paymentsuccess />
            }

            {
                slug== 'failure' && <Paymentfailure />
            }
       </section>
    );
}