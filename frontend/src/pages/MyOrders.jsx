import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import api from "../api/axios.js";

const statusColors = {
  received: "bg-mustard-100 text-mustard-700",
  confirmed: "bg-blue-100 text-blue-700",
  baking: "bg-orange-100 text-orange-700",
  ready: "bg-green-100 text-green-700",
  completed: "bg-cocoa-100 text-cocoa-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container-page">
        <Reveal>
          <h1 className="text-3xl mb-8">Your Orders</h1>
        </Reveal>

        {loading ? (
          <p className="text-cocoa-500">Loading...</p>
        ) : orders.length === 0 ? (
          <Reveal>
            <p className="text-cocoa-500">
              No orders yet — head to the <Link to="/menu" className="text-mustard-600 font-semibold">menu</Link> to place your first one.
            </p>
          </Reveal>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <Reveal key={order._id} delay={i * 0.05}>
                <Link
                  to={`/track/${order._id}`}
                  className="flex items-center justify-between bg-white rounded-4xl shadow-card p-5 hover:shadow-soft transition-shadow"
                >
                  <div>
                    <p className="font-display text-lg text-cocoa-800">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-cocoa-500">
                      {new Date(order.createdAt).toLocaleDateString()} · KES {order.totalPrice?.toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
