import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import FreeShippingBanner from "../FreeShippingBanner";
import { MainNavigation } from "../navigation/MainNavigation";
import TopNavbar from "../navigation/TopNavbar";

const VisitorLayout = () => {
  return (
    <div>
      <FreeShippingBanner />
      <TopNavbar />
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VisitorLayout;
