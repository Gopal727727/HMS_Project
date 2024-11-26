import SidebarDashboard from "@/Components/user/sidebar_dashboard";
import Link from "next/link";

export default function page(){
    return(
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                      <SidebarDashboard/>
                </div>

                <div className="col-md-8 col-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Payment Date</th>
                                    <th>Detail</th>
                                    <th>Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2024/03/10</td>
                                    <td className="fw-bold">
                                        <p className="m-0 hms-txt-light">2 rooms</p>
                                        <p className="m-0 hms-txt-light">2024/03/10 - 2024/03/18</p>
                                        <p className="m-0 hms-txt-light">2 Guests</p>
                                    </td>
                                    <td>
                                        <p className="m-0 hms-txt-light"><Link href={'#'}>HMS-123</Link></p>
                                        <p className="m-0 fw-bold">15000</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}