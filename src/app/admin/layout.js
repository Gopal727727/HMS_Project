
import AHeader from '@/Components/Admin/AHeader';
import Bottom from '@/Components/Common/Bottom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../styles/global.css';

export const metadata = {
  title: "Admin Dashboard - Hotel Management System",
  description: "Admin section of the Hotel Management System",
};

export default function UserLayout({ children }) {
  return (
    <>
      
      <div className='admin-page-bg'>
      <AHeader />
        {children}
        <Bottom />
        </div>
      
      
    </>
  );
}
