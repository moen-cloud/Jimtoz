import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/MainLayout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { RequireAuth, RequireAdmin } from "./components/RouteGuards.jsx";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import CustomCakeOrder from "./pages/CustomCakeOrder.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import OrderTracking from "./pages/OrderTracking.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#3E2723",
            color: "#FFF8ED",
            borderRadius: "999px",
            padding: "10px 18px",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
      <Routes>
        {/* Standalone pages — no Navbar/Footer, full-page layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Every other page shares the site's Navbar + Footer via MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/custom-cakes" element={<CustomCakeOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track/:id" element={<OrderTracking />} />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;