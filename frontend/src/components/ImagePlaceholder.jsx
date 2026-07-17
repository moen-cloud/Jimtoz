import { ImageIcon } from "lucide-react";

/**
 * Elegant image container used everywhere on the site.
 *
 * - Pass `src` (a Cloudinary URL, typically from fallbackContent.js) to render
 *   the real photo with a subtle hover zoom and soft ring.
 * - Leave `src` empty and it renders a warm, gradient dashed placeholder with
 *   a label describing what should go there.
 *
 * Sizing/shape/position are controlled entirely by `className`
 * (e.g. "w-full h-96 rounded-4xl" or "absolute inset-0 w-full h-full" for a
 * full-bleed background). If `className` doesn't specify a position utility
 * (relative/absolute/fixed/sticky), it defaults to `relative` so the inner
 * hover-ring overlay has something to anchor to.
 */
const ImagePlaceholder = ({ src, alt = "", label = "Image goes here", className = "" }) => {
  const hasPositionUtility = /\b(absolute|relative|fixed|sticky|static)\b/.test(className);
  const basePosition = hasPositionUtility ? "" : "relative";

  return (
    <div
      className={`group ${basePosition} overflow-hidden ring-1 ring-cocoa-800/5 shadow-card ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-mustard-100 via-mustard-50 to-cream text-cocoa-500">
          <div className="h-12 w-12 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
            <ImageIcon size={20} strokeWidth={1.5} className="text-mustard-500" />
          </div>
          <span className="text-sm font-body text-center px-6 leading-snug">{label}</span>
        </div>
      )}
      {/* Soft inner border for a polished, "framed" feel on real photos */}
      {src && <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />}
    </div>
  );
};

export default ImagePlaceholder;