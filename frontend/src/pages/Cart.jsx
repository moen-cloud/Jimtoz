import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fulfillmentType, setFulfillmentType] = useState("pickup");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [guestName, setGuestName] = useState(user?.name || "");
  const [guestEmail, setGuestEmail] = useState(user?.email || "");
  const [guestPhone, setGuestPhone] = useState("");
  const [placing, setPlacing] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-mustard-200 bg-white px-4 py-3 text-cocoa-700 focus:outline-none focus:ring-2 focus:ring-mustard-400";

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const { data } = await api.post("/orders", {
        items,
        fulfillment: { type: fulfillmentType, address, scheduledDate, scheduledTime },
        paymentMethod,
        totalPrice,
        guestName,
        guestEmail,
        guestPhone,
      });
      clearCart();
      toast.success("Order placed! Track it below.");
      navigate(`/track/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't place order, please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <ImagePlaceholder label="Empty basket illustration" className="h-40 w-40 rounded-full mx-auto mb-6" />
          <h1 className="text-2xl mb-3">Your basket is empty</h1>
          <p className="text-cocoa-500 mb-6">Let's fix that — the menu is waiting.</p>
          <Button as={Link} to="/menu" variant="primary">
            Browse the Menu
          </Button>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container-page grid lg:grid-cols-3 gap-10">
        <Reveal className="lg:col-span-2">
          <h1 className="text-3xl mb-8">Your Basket</h1>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product} className="bg-white rounded-4xl shadow-card p-4 flex items-center gap-4">
                <ImagePlaceholder label="Item" className="h-20 w-20 rounded-2xl text-[10px] shrink-0" />
                <div className="flex-1">
                  <p className="font-display text-lg text-cocoa-800">{item.name}</p>
                  <p className="text-mustard-600 font-semibold">KES {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3 bg-mustard-50 rounded-full px-3 py-1.5">
                  <button onClick={() => updateQuantity(item.product, item.quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={16} />
                  </button>
                  <span className="w-5 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product, item.quantity + 1)} aria-label="Increase quantity">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.product)}
                  className="text-cocoa-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-white rounded-4xl shadow-soft p-7 sticky top-24 space-y-5">
            <h2 className="font-display text-xl text-cocoa-800">Checkout Details</h2>

            <div>
              <label className="block text-sm font-semibold text-cocoa-700 mb-2">Fulfillment</label>
              <div className="flex gap-2">
                {["pickup", "delivery"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFulfillmentType(type)}
                    className={`flex-1 py-2.5 rounded-full text-sm font-semibold capitalize transition-colors ${
                      fulfillmentType === type ? "bg-mustard-500 text-cocoa-800" : "bg-mustard-50 text-cocoa-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {fulfillmentType === "delivery" && (
              <input
                placeholder="Delivery address"
                className={inputClass}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}

            <div className="grid grid-cols-2 gap-3">
              <input type="date" className={inputClass} value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
              <input type="time" className={inputClass} value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
            </div>

            {!user && (
              <div className="space-y-3 pt-2 border-t border-mustard-100">
                <p className="text-xs text-cocoa-500">Checking out as a guest — or <Link to="/login" className="text-mustard-600 font-semibold">sign in</Link>.</p>
                <input placeholder="Full name" className={inputClass} value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                <input placeholder="Email" type="email" className={inputClass} value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
                <input placeholder="Phone" className={inputClass} value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-cocoa-700 mb-2">Payment</label>
              <select className={inputClass} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="cash">Cash on pickup/delivery</option>
                <option value="mpesa">M-Pesa</option>
                <option value="card">Card</option>
              </select>
              {/* TODO: integrate a real payment gateway (e.g. M-Pesa Daraja API, Stripe) here */}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-mustard-100">
              <span className="text-cocoa-600">Total</span>
              <span className="font-display text-2xl text-mustard-600">KES {totalPrice.toLocaleString()}</span>
            </div>

            <Button onClick={handleCheckout} disabled={placing} variant="primary" className="w-full justify-center">
              {placing ? "Placing order..." : "Place Order"}
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Cart;
