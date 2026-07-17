import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Check } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import api from "../api/axios.js";

const steps = ["received", "confirmed", "baking", "ready", "completed"];

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(() => setError("We couldn't find that order. Double check the link and try again."));
  }, [id]);

  if (error) {
    return <div className="bg-cream min-h-[60vh] flex items-center justify-center text-cocoa-500">{error}</div>;
  }

  if (!order) {
    return <div className="bg-cream min-h-[60vh] flex items-center justify-center text-cocoa-400">Loading order...</div>;
  }

  const currentStepIndex = steps.indexOf(order.status);

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container-page max-w-2xl">
        <Reveal>
          <p className="uppercase tracking-[0.25em] text-mustard-600 text-xs font-semibold mb-2 text-center">
            Order #{order._id.slice(-6).toUpperCase()}
          </p>
          <h1 className="text-3xl text-center mb-10">Tracking Your Order</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-white rounded-5xl shadow-soft p-8">
            {order.status === "cancelled" ? (
              <p className="text-center text-red-500 font-semibold">This order was cancelled.</p>
            ) : (
              <div className="flex justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-1 bg-mustard-100 rounded-full -z-10" />
                <div
                  className="absolute top-4 left-0 h-1 bg-mustard-500 rounded-full -z-10 transition-all duration-700"
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
                {steps.map((step, i) => (
                  <div key={step} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                        i <= currentStepIndex
                          ? "bg-mustard-500 border-mustard-500 text-cocoa-800"
                          : "bg-white border-mustard-200 text-mustard-200"
                      }`}
                    >
                      {i <= currentStepIndex ? <Check size={16} /> : <span className="text-xs">{i + 1}</span>}
                    </div>
                    <span className="text-xs capitalize text-cocoa-600 text-center">{step}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 border-t border-mustard-100 pt-6 space-y-2 text-sm text-cocoa-600">
              <p>
                <span className="font-semibold">Total:</span> KES {order.totalPrice?.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Fulfillment:</span> {order.fulfillment?.type || "pickup"}
              </p>
              {order.fulfillment?.scheduledDate && (
                <p>
                  <span className="font-semibold">Scheduled:</span>{" "}
                  {new Date(order.fulfillment.scheduledDate).toLocaleDateString()} {order.fulfillment.scheduledTime}
                </p>
              )}
              <p>
                <span className="font-semibold">Placed:</span> {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default OrderTracking;
