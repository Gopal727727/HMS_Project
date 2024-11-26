'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SidebarDashboard()
{
    const pathname = usePathname();

    const handleLogout = () => {
      sessionStorage.removeItem('user');
      window.location.href = '/'; 
    };
    return(
        <div className="list-group">
        <Link className={`list-group-item ${pathname === '/user/dashboard' ? 'hms-bg-dark' : ''}`} href='/user/dashboard'>DashBoard</Link>
        <Link className={`list-group-item ${pathname === '/user/Booking_history' ? 'hms-bg-dark' : ''}`} href='/user/Booking_history'>Booking History</Link>
        <Link className={`list-group-item ${pathname === '/user/Event_booking_history' ? 'hms-bg-dark' : ''}`} href='/user/Event_booking_history'>Event Booking History</Link>
        <Link className={`list-group-item ${pathname === '/user/update_profile' ? 'hms-bg-dark' : ''}`} href='/user/update_profile'>Update profile</Link>
        <Link className="list-group-item text-danger" href='#' onClick={handleLogout}>Logout</Link>
         </div>
    );
}