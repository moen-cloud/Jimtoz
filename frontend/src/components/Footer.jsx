import { Instagram, Facebook, Phone } from "lucide-react";
import Logo from "./Logo.jsx";
import fallbackContent from "../content/fallbackContent.js";

const { phone } = fallbackContent.footer;

const Footer = () => {
  return (
    <footer className="bg-cocoa-700 text-cream/90">
      <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo dark />

        <div className="flex items-center gap-2 text-sm text-cream/70">
          <Phone size={16} className="shrink-0" />
          {phone}
        </div>

        <div className="flex gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-mustard-400 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-mustard-400 transition-colors">
            <Facebook size={20} />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Jimtoz Bakery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;