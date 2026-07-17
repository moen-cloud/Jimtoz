import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBasket, User, LogOut, ClipboardList, ShieldCheck, ChevronDown } from "lucide-react";
import Logo from "./Logo.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/custom-cakes", label: "Custom Cakes" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, clearCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const accountRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the account dropdown when clicking anywhere outside it
  useEffect(() => {
    const onClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    // Clear the basket too, so the next person on this device/browser
    // never sees a previous customer's items or account data.
    clearCart();
    setAccountOpen(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <nav className="container-page flex items-center justify-between py-4">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `font-body font-medium text-sm tracking-wide transition-colors ${
                  isActive ? "text-mustard-600" : "text-cocoa-700 hover:text-mustard-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-1.5 text-cocoa-700 hover:text-mustard-600 transition-colors"
              >
                <User size={20} />
                <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                <ChevronDown size={16} className={`transition-transform ${accountOpen ? "rotate-180" : ""}`} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-soft ring-1 ring-cocoa-800/5 py-2 animate-fadeUp">
                  <Link
                    to="/orders"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-cocoa-700 hover:bg-mustard-50"
                  >
                    <ClipboardList size={16} /> My Orders
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-cocoa-700 hover:bg-mustard-50"
                    >
                      <ShieldCheck size={16} /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 text-left"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-cocoa-700 hover:text-mustard-600 transition-colors"
            >
              <User size={20} />
              <span className="text-sm font-medium">Sign in</span>
            </Link>
          )}

          <Link to="/cart" className="relative text-cocoa-700 hover:text-mustard-600 transition-colors">
            <ShoppingBasket size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-mustard-500 text-cocoa-800 text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <button
          className="md:hidden text-cocoa-700"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-cream border-t border-mustard-200 px-6 py-6 flex flex-col gap-5 animate-fadeUp">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className="font-body font-medium text-cocoa-700"
            >
              {link.label}
            </NavLink>
          ))}

          <div className="flex flex-col gap-4 pt-4 border-t border-mustard-100">
            {user ? (
              <>
                <Link to="/orders" onClick={() => setOpen(false)} className="flex items-center gap-2 text-cocoa-700">
                  <ClipboardList size={20} /> My Orders
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 text-cocoa-700">
                    <ShieldCheck size={20} /> Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 text-left">
                  <LogOut size={20} /> Log Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-2 text-cocoa-700">
                <User size={20} /> Sign in
              </Link>
            )}
            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2 text-cocoa-700">
              <ShoppingBasket size={20} /> Basket ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;