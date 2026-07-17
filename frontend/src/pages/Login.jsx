import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import Logo from "../components/Logo.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import fallbackContent from "../content/fallbackContent.js";

const authImage = fallbackContent.auth.image;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-mustard-200 bg-white px-4 py-3 text-cocoa-700 focus:outline-none focus:ring-2 focus:ring-mustard-400";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-cream">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16">
        <Reveal className="w-full max-w-sm mx-auto">
          
          <h1 className="text-3xl mt-8 mb-2">Welcome Back</h1>
          <p className="text-cocoa-500 mb-8">Sign in to track orders</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              type="email"
              placeholder="Email"
              className={inputClass}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className={inputClass}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm text-cocoa-500 mt-6">
            New here?{" "}
            <Link to="/register" className="text-mustard-600 font-semibold">
              Create an account
            </Link>
          </p>
          <Link to="/" className="block text-center text-sm text-cocoa-400 hover:text-cocoa-600 mt-4">
            &larr; Back to home
          </Link>
        </Reveal>
      </div>

      {/* Right: full-height photo, hidden on small screens */}
      <div className="hidden md:block relative">
        <ImagePlaceholder
          src={authImage}
          alt="Jimtoz bakery"
          label="Photo — a beautifully finished cake (1200x1600 recommended)"
          className="absolute inset-0 w-full h-full rounded-none"
        />
      </div>
    </div>
  );
};

export default Login;