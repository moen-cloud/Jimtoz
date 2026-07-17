import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import api from "../api/axios.js";

const tabs = ["Orders", "Products", "Reviews"];
const orderStatuses = ["received", "confirmed", "baking", "ready", "completed", "cancelled"];

const emptyProduct = {
  name: "",
  description: "",
  category: "bread",
  price: "",
  image: "",
  inStock: true,
  isFeatured: false,
};

const AdminDashboard = () => {
  const [tab, setTab] = useState("Orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newProduct, setNewProduct] = useState(emptyProduct);

  const loadOrders = () => api.get("/orders").then((res) => setOrders(res.data)).catch(() => {});
  const loadProducts = () => api.get("/products").then((res) => setProducts(res.data)).catch(() => {});
  const loadReviews = () => api.get("/reviews/all").then((res) => setReviews(res.data)).catch(() => {});

  useEffect(() => {
    loadOrders();
    loadProducts();
    loadReviews();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success("Order status updated");
      loadOrders();
    } catch {
      toast.error("Couldn't update order");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", { ...newProduct, price: Number(newProduct.price) });
      toast.success("Product added");
      setNewProduct(emptyProduct);
      loadProducts();
    } catch {
      toast.error("Couldn't add product");
    }
  };

  const handleImageSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image is too large — please choose one under 4MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setNewProduct((prev) => ({ ...prev, image: reader.result }));
    reader.onerror = () => toast.error("Couldn't read that image, please try another");
    reader.readAsDataURL(file);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product removed");
      loadProducts();
    } catch {
      toast.error("Couldn't remove product");
    }
  };

  const handleApproveReview = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`);
      toast.success("Review approved");
      loadReviews();
    } catch {
      toast.error("Couldn't approve review");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-mustard-200 bg-white px-4 py-2.5 text-sm text-cocoa-700 focus:outline-none focus:ring-2 focus:ring-mustard-400";

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container-page">
        <Reveal>
          <h1 className="text-3xl mb-8">Admin Dashboard</h1>
        </Reveal>

        <Reveal delay={0.05} className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                tab === t ? "bg-cocoa-700 text-cream" : "bg-white text-cocoa-600 shadow-card"
              }`}
            >
              {t}
            </button>
          ))}
        </Reveal>

        {tab === "Orders" && (
          <Reveal className="space-y-4">
            {orders.length === 0 && <p className="text-cocoa-500">No orders yet.</p>}
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl shadow-card p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-cocoa-800">
                    #{order._id.slice(-6).toUpperCase()} — {order.guestName || "Registered user"}
                  </p>
                  <p className="text-sm text-cocoa-500">
                    KES {order.totalPrice?.toLocaleString()} · {new Date(order.createdAt).toLocaleString()}
                    {order.customCake?.isCustom && " · Custom cake"}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={inputClass + " w-auto"}
                >
                  {orderStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </Reveal>
        )}

        {tab === "Products" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <Reveal className="lg:col-span-1">
              <form onSubmit={handleAddProduct} className="bg-white rounded-4xl shadow-card p-6 space-y-3">
                <h2 className="font-display text-lg text-cocoa-800 mb-2">Add Product</h2>

                <div className="flex items-center gap-4">
                  <ImagePlaceholder
                    src={newProduct.image}
                    alt="Product preview"
                    label="Preview"
                    className="h-20 w-20 rounded-2xl text-[10px] shrink-0"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageSelect(e.target.files?.[0])}
                      className="text-xs text-cocoa-500 file:mr-3 file:rounded-full file:border-0 file:bg-mustard-500 file:px-3 file:py-1.5 file:text-cocoa-800 file:font-semibold file:cursor-pointer"
                    />
                    <p className="text-xs text-cocoa-400 mt-1">Upload a photo from your computer (under 4MB)</p>
                  </div>
                </div>

                <input
                  required
                  placeholder="Name"
                  className={inputClass}
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Description"
                  className={inputClass}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <select
                  className={inputClass}
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  {["bread", "pastries", "cakes", "cookies", "custom"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  required
                  type="number"
                  placeholder="Price (KES)"
                  className={inputClass}
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <label className="flex items-center gap-2 text-sm text-cocoa-600">
                  <input
                    type="checkbox"
                    checked={newProduct.isFeatured}
                    onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                  />
                  Feature on homepage
                </label>
                <Button type="submit" variant="primary" className="w-full justify-center">
                  Add Product
                </Button>
              </form>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-2 space-y-3">
              {products.map((p) => (
                <div key={p._id} className="bg-white rounded-3xl shadow-card p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <ImagePlaceholder
                      src={p.image}
                      alt={p.name}
                      label="No photo"
                      className="h-14 w-14 rounded-xl text-[9px] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-display text-cocoa-800 truncate">{p.name}</p>
                      <p className="text-sm text-cocoa-500 capitalize">{p.category} · KES {p.price?.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-600 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </Reveal>
          </div>
        )}

        {tab === "Reviews" && (
          <Reveal className="space-y-4">
            {reviews.map((r) => (
              <div key={r._id} className="bg-white rounded-3xl shadow-card p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-cocoa-800">
                    {r.name} — {r.rating}★
                  </p>
                  <p className="text-sm text-cocoa-500">{r.comment}</p>
                </div>
                {r.approved ? (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Approved</span>
                ) : (
                  <button
                    onClick={() => handleApproveReview(r._id)}
                    className="text-sm font-semibold text-mustard-600 hover:text-mustard-700"
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;