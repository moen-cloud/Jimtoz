import { Link } from "react-router-dom";
import fallbackContent from "../content/fallbackContent.js";

const { image: logoImage } = fallbackContent.logo;

/**
 * Paste your logo's Cloudinary URL into fallbackContent.js (logo.image) and
 * it will replace the placeholder circle automatically — no code changes needed.
 */
const Logo = ({ dark = false }) => {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      {logoImage ? (
        <img
          src={logoImage}
          alt="Jimtoz Bakery"
          className="h-11 w-11 rounded-full object-cover ring-1 ring-cocoa-800/10 shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-mustard-400 to-mustard-600 border-2 border-dashed border-cocoa-700/30 flex items-center justify-center text-[10px] text-cocoa-800 font-body text-center leading-tight shadow-sm transition-transform duration-300 group-hover:rotate-6">
          LOGO
        </div>
      )}
      <span
        className={`font-display text-2xl tracking-tight ${dark ? "text-cream" : "text-cocoa-800"}`}
      >
        Jimtoz
      </span>
    </Link>
  );
};

export default Logo;
