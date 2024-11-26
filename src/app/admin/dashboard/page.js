'use client'
import Sidebar from "@/Components/Admin/sidebar";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Page() {
    const [data, setData] = useState({
        user: 0,
        Booking: 0,
        e_type: {},
        r_type: {},
    });

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch('/api/admindata');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, []);

    // Prepare data for pie charts
    const prepareChartData = (typeCounts) => {
        const labels = Object.keys(typeCounts).map(type => type.replace(/^(e_|r_)/, '')); // Remove prefixes
        const values = Object.values(typeCounts);
        return {
            labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverOffset: 4,
            }],
        };
    };

    const eventChartData = prepareChartData(data.e_type);
    const roomChartData = prepareChartData(data.r_type);

    return (
        <section className="container my-5">
            <div className="row">
                <div className="col-md-4 col-12">
                    <Sidebar />
                </div>
                <div className="col-md-8 col-12">
                    <div className="row">
                        <div className="col-6 text-center">
                            <div className="card">
                                <h3 className="card-header">Total Bookings</h3>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h5 className="text-center">
                                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {data.Booking}
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 text-center">
                            <div className="card">
                                <h3 className="card-header">Total Users</h3>
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <h5 className="text-center">
                                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            {data.user}
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 col-12 text-center chart-container">
                            <h4>Event Types Booking Visualization</h4>
                            {eventChartData.labels.length > 0 ? (
                                <Pie data={eventChartData} />
                            ) : (
                                <p>No data available for event bookings.</p>
                            )}
                        </div>
                        <div className="col-md-6 col-12 text-center chart-container">
                            <h4>Room Types Booking Visualization</h4>
                            {roomChartData.labels.length > 0 ? (
                                <Pie data={roomChartData} />
                            ) : (
                                <p>No data available for room bookings.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
