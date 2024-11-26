'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        window.location.href = '/'; 
    };

    return (
        <div className="list-group text-white bg-success">
            <Link className={`list-group-item ${pathname === '/admin/dashboard' ? 'hms-bg-dark-admin' : ''}`} href='/admin/dashboard'>
                <i className="fa fas fa-tachometer me-2"></i>Admin DashBoard
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/manage-roomtypes' ? 'hms-bg-dark-admin' : ''}`} href='/admin/manage-roomtypes'>
                <i className="fa fas fa-bed me-2"></i> Manage Roomtypes
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/manage-eventtypes' ? 'hms-bg-dark-admin' : ''}`} href='/admin/manage-eventtypes'>
                <i className="fa fas fa-calendar me-2"></i> Manage EventTypes
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/user-details' ? 'hms-bg-dark-admin' : ''}`} href='/admin/user-details'>
                <i className="fa fas fa-user me-2"></i> User Details
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/room-booking-confirmations' ? 'hms-bg-dark-admin' : ''}`} href='/admin/room-booking-confirmations'>
                <i className="fa fas fa-check-circle me-2"></i> Room Booking Confirmations
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/event-booking-confirmations' ? 'hms-bg-dark-admin' : ''}`} href='/admin/event-booking-confirmations'>
                <i className="fa fas fa-check-circle me-2"></i> Event Booking Confirmations
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/room-availability' ? 'hms-bg-dark-admin' : ''}`} href='/admin/room-availability'>
                <i className="fa fas fa-bed me-2"></i> Room Availability
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/add-hotel-gallery' ? 'hms-bg-dark-admin' : ''}`} href='/admin/add-hotel-gallery'>
                <i className="fa fas fa-image me-2"></i> Add Hotel Gallery
            </Link>
            <Link className={`list-group-item ${pathname === '/admin/settings' ? 'hms-bg-dark-admin' : ''}`} href='/admin/settings'>
                <i className="fa fas fa-cog me-2"></i> Settings
            </Link>
            <Link className="list-group-item text-danger" href="#" onClick={handleLogout}>
                <i className="fa fas fa-sign-out me-2"></i> Logout
            </Link>
        </div>
    );
}
