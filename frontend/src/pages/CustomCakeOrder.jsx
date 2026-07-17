import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import fallbackContent from "../content/fallbackContent.js";

const content = fallbackContent.customCakes;

const flavors = ["Vanilla Bean", "Chocolate Fudge", "Red Velvet", "Lemon Zest", "Carrot Spice", "Fruit Cake"];
const sizes = ["6-inch (serves 8-10)", "8-inch (serves 15-20)", "10-inch (serves 25-30)", "Custom / tiered"];

const CustomCakeOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    flavor: flavors[0],
    size: sizes[0],
    tiers: 1,
    occasion: "",
    message: "",
    neededBy: "",
    guestName: user?.name || "",
    guestEmail: user?.email || "",
    guestPhone: "",
  });
  const [referenceFileName, setReferenceFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/orders", {
        items: [],
        customCake: {
          isCustom: true,
          flavor: form.flavor,
          size: form.size,
          tiers: Number(form.tiers),
          occasion: form.occasion,
          message: form.message,
          neededBy: form.neededBy,
          referenceImage: referenceFileName, // TODO: wire up real file upload (e.g. Cloudinary/S3)
        },
        fulfillment: { type: "pickup" },
        totalPrice: 0, // Admin will confirm final price after reviewing the design request
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        guestPhone: form.guestPhone,
      });
      toast.success("Your custom cake request has been sent!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-mustard-200 bg-white px-4 py-3 text-cocoa-700 focus:outline-none focus:ring-2 focus:ring-mustard-400 placeholder:text-cocoa-400";
  const labelClass = "block text-sm font-semibold text-cocoa-700 mb-2";

  return (
    <div className="bg-cream min-h-screen pb-24">
      <section className="relative overflow-hidden bg-mustard-100 min-h-[400px] md:min-h-[440px] flex items-center">
        <ImagePlaceholder
          src={content.image}
          alt="Decorated celebration cake"
          label="Banner photo — decorated celebration cake (1920x700 recommended)"
          className="absolute inset-0 w-full h-full rounded-none opacity-100"
        />
        <div className="container-page relative z-10 py-14">
          <Reveal className="max-w-xl">
            <p className="uppercase tracking-[0.25em] text-cream text-xs font-semibold mb-3">
              {content.eyebrow}
            </p>
            <h1 className="text-4xl italic text-mustard-300 md:text-5xl mb-5">{content.heading}</h1>
            <p className="text-cream max-w-md">{content.body}</p>
          </Reveal>
        </div>
      </section>

      <div className="container-page -mt-6 md:-mt-10">
        <Reveal className="mt-10 md:mt-14 mb-16">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl md:rounded-5xl shadow-soft p-5 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            <div>
              <label className={labelClass}>Flavor</label>
              <select name="flavor" value={form.flavor} onChange={handleChange} className={inputClass}>
                {flavors.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Size</label>
              <select name="size" value={form.size} onChange={handleChange} className={inputClass}>
                {sizes.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Number of tiers</label>
              <input
                type="number"
                min="1"
                max="6"
                name="tiers"
                value={form.tiers}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Occasion</label>
              <input
                type="text"
                name="occasion"
                placeholder="e.g. Birthday, Wedding, Graduation"
                value={form.occasion}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Message on the cake (optional)</label>
              <input
                type="text"
                name="message"
                placeholder="e.g. Happy 30th, Amina!"
                value={form.message}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Reference image (optional)</label>
              <div className="flex flex-wrap items-center gap-4">
                <ImagePlaceholder
                  label="Upload preview"
                  className="h-20 w-20 rounded-2xl text-[10px] shrink-0"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReferenceFileName(e.target.files?.[0]?.name || "")}
                  className="max-w-full text-sm text-cocoa-500 file:mr-4 file:rounded-full file:border-0 file:bg-mustard-500 file:px-4 file:py-2 file:text-cocoa-800 file:font-semibold file:cursor-pointer"
                />
              </div>
              {/* TODO: connect this to real file storage (Cloudinary/S3) and send the URL to the backend */}
            </div>

            <div>
              <label className={labelClass}>Date needed by</label>
              <input
                type="date"
                name="neededBy"
                value={form.neededBy}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Your name</label>
              <input
                type="text"
                name="guestName"
                value={form.guestName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="guestEmail"
                value={form.guestEmail}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                name="guestPhone"
                placeholder="07XX XXX XXX"
                value={form.guestPhone}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <Button type="submit" variant="primary" disabled={submitting} className="w-full md:w-auto justify-center">
                {submitting ? "Sending..." : "Send Cake Request"}
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
};

export default CustomCakeOrder;