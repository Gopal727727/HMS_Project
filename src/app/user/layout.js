import Bottom from '@/Components/Common/Bottom';
import Footer from '@/Components/Common/Footer';
import Header from '@/Components/Common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../styles/global.css';

export const metadata = {
  title: "User Dashboard - Hotel Management System",
  description: "User section of the Hotel Management System",
};

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Bottom />
    </>
  );
}
