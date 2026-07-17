import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/**
 * Wraps every "normal" page with the site's Navbar and Footer.
 * Login/Register intentionally sit OUTSIDE this layout (see App.jsx) so they
 * render as standalone, full-page split-screen views with no site chrome.
 */
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;