import { useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import fallbackContent from "../content/fallbackContent.js";

const content = fallbackContent.contact;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to a real backend endpoint or email service (e.g. Resend, Nodemailer)
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full rounded-2xl border border-mustard-200 bg-white px-4 py-3 text-cocoa-700 focus:outline-none focus:ring-2 focus:ring-mustard-400 placeholder:text-cocoa-400";

  return (
    <div className="bg-cream min-h-screen pb-24">
      <section className="relative overflow-hidden bg-mustard-100 min-h-[300px] md:min-h-[340px] flex items-center">
        <ImagePlaceholder
          src={content.heroImage}
          alt="Jimtoz bakery"
          label="Banner photo — bakery storefront or kitchen scene (1920x600 recommended)"
          className="absolute inset-0 w-full h-full rounded-none opacity-100"
        />
        <Reveal className="container-page relative z-10 max-w-xl">
          <p className="uppercase tracking-[0.25em] text-cream text-xs font-semibold mb-3">
            {content.eyebrow}
          </p>
          <h1 className="text-4xl italic text-mustard-600 md:text-5xl">{content.heading}</h1>
        </Reveal>
      </section>

      <div className="container-page -mt-6 grid md:grid-cols-2 gap-8">
        <Reveal className="mt-10 md:mt-14 mb-16">
          <form onSubmit={handleSubmit} className="bg-white rounded-5xl shadow-soft p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-cocoa-700 mb-2">Name</label>
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cocoa-700 mb-2">Email</label>
              <input
                required
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-cocoa-700 mb-2">Message</label>
              <textarea
                required
                rows={5}
                className={inputClass}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <Button type="submit" variant="primary" className="w-full justify-center">
              Send Message
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 md:mt-14 mb-16 space-y-5">
          <ImagePlaceholder
            src={content.image}
            alt="Jimtoz storefront"
            label="Map or storefront photo"
            className="w-full h-64 rounded-4xl shadow-card"
          />
          <div className="bg-white rounded-4xl shadow-card p-8 space-y-5">
            <div className="flex gap-3 items-start">
              <MapPin className="text-mustard-500 shrink-0" size={20} />
              <p className="text-cocoa-600">{content.address}</p>
            </div>
            <div className="flex gap-3 items-start">
              <Phone className="text-mustard-500 shrink-0" size={20} />
              <p className="text-cocoa-600">{content.phone}</p>
            </div>
            <div className="flex gap-3 items-start">
              <Mail className="text-mustard-500 shrink-0" size={20} />
              <p className="text-cocoa-600">{content.email}</p>
            </div>
            <div className="flex gap-3 items-start">
              <Clock className="text-mustard-500 shrink-0" size={20} />
              <p className="text-cocoa-600">{content.hours}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Contact;