/**
 * FALLBACK CONTENT
 * -----------------
 * Every piece of static text and every static image on the site lives here.
 * Edit the text directly. For images, paste your Cloudinary URL between the
 * quotes where you see "PASTE CLOUDINARY URL HERE" — leave it as an empty
 * string ("") to keep showing the dashed placeholder box until you're ready.
 *
 * Cloudinary URLs look like:
 * https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/hero.jpg
 *
 * Nothing here needs a rebuild step beyond saving the file — Vite hot-reloads
 * it automatically while `npm run dev` is running.
 */

const fallbackContent = {
  // ───────────────────────────── HOME PAGE ─────────────────────────────
  home: {
    hero: {
      eyebrow: "Baked fresh, every single morning",
      heading: "Warm bread, honest ingredients,",
      headingAccent: "baked with care.",
      body: "Jimtoz is a small-batch bakery crafting sourdough, pastries, and celebration cakes from scratch. No shortcuts, no preservatives — just butter, flour, and time.",
      primaryButtonLabel: "Order Now",
      secondaryButtonLabel: "Design a Cake",
      image: "https://res.cloudinary.com/dglk2inxd/image/upload/v1783543117/fresh_bakes_trcnfh.jpg", // PASTE CLOUDINARY URL HERE — recommended 1920x1080, full-bleed hero background
    },
    trustStrip: [
      { title: "Small-batch, daily", desc: "Nothing sits overnight" },
      { title: "Ready when promised", desc: "Live order tracking" },
      { title: "Pickup or delivery", desc: "Across Nairobi" },
    ],
    storyTeaser: {
      eyebrow: "Meet the baker",
      heading: "Every loaf starts with a starter that's older than our shop.",
      body: "Jimtoz began in a home kitchen with one sourdough starter and a lot of trial and error. Today, that same starter — fed daily — is the base for every loaf we sell.",
      buttonLabel: "Read our story",
      image: "", // PASTE CLOUDINARY URL HERE — recommended 900x900, baker at work
    },
  },

  // ───────────────────────────── MENU PAGE ─────────────────────────────
  menu: {
    hero: {
      image: "https://res.cloudinary.com/dglk2inxd/image/upload/v1784246055/choco_r0nw4f.jpg", // PASTE CLOUDINARY URL HERE — recommended 1920x800, background behind "Our Menu" banner
    },
  },

  // ───────────────────────────── ABOUT PAGE ─────────────────────────────
  about: {
    intro: {
      eyebrow: "Our story",
      heading: "Meet the Baker",
      image: "https://res.cloudinary.com/dglk2inxd/image/upload/v1783543459/cupcakes_ybhv9b.jpg", // PASTE CLOUDINARY URL HERE — recommended 1920x600, background behind "Meet the Baker" banner
    },
    story: {
      heading: "From a home oven to your table",
      paragraph1:
        "Jimtoz started small — one oven, one sourdough starter, and a habit of waking up before sunrise to bake for friends and neighbors. What began as a hobby turned into a bakery built on the same principle: real ingredients, no rushed proofing, and no shortcuts.",
      paragraph2:
        "Today, every loaf, pastry, and cake that leaves our kitchen is still made by hand, in small batches, the same way it was on day one.",
      image: "", // PASTE CLOUDINARY URL HERE — recommended 900x1000, portrait of the baker
    },
    stats: [
      { stat: "5am", label: "Baking starts every morning" },
      { stat: "100%", label: "Made from scratch, daily" },
      { stat: "0", label: "Preservatives, ever" },
    ],
    gallery: [
      { image: "" }, // PASTE CLOUDINARY URL HERE — kitchen/process photo 1
      { image: "" }, // PASTE CLOUDINARY URL HERE — kitchen/process photo 2
      { image: "" }, // PASTE CLOUDINARY URL HERE — kitchen/process photo 3
    ],
  },

  // ──────────────────────────── CONTACT PAGE ────────────────────────────
  contact: {
    eyebrow: "We'd love to hear from you",
    heading: "Get in Touch",
    heroImage: "https://res.cloudinary.com/dglk2inxd/image/upload/v1783543719/baking_scene_eg4qht.jpg", // PASTE CLOUDINARY URL HERE — recommended 1920x600, background behind "Get in Touch" banner
    address: "Your street address, Nairobi, Kenya",
    phone: "+254 7XX XXX XXX",
    email: "hello@jimtoz.com",
    hours: "Tue – Sun, 7am – 6pm (Closed Mondays)",
    image: "", // PASTE CLOUDINARY URL HERE — map screenshot or storefront photo (used in the card below the form)
  },

  // ─────────────────────────── CUSTOM CAKES PAGE ─────────────────────────
  customCakes: {
    eyebrow: "Made just for your occasion",
    heading: "Design Your Cake",
    body: "Tell us the flavor, size, and vibe you're after — birthdays, weddings, baby showers, or just because. We'll follow up to confirm the final price and pickup date.",
    image: "https://res.cloudinary.com/dglk2inxd/image/upload/v1783551735/decorated_cake_pe0qhm.jpg", // PASTE CLOUDINARY URL HERE — decorated celebration cake, recommended 900x700
  },

  // ───────────────────────── LOGIN / REGISTER PAGES ──────────────────────
  auth: {
    image: "https://res.cloudinary.com/dglk2inxd/image/upload/v1784247286/login_stdaeo.jpg", // PASTE CLOUDINARY URL HERE — recommended 1200x1600 (tall), shown on the right half of sign-in/register
  },

  // ──────────────────────────────── LOGO ─────────────────────────────────
  logo: {
    image: "", // PASTE CLOUDINARY URL HERE — your logo mark, square, transparent background recommended
  },

  // ───────────────────────────── FOOTER ──────────────────────────────────
  footer: {
    phone: "+254 7XX XXX XXX",
  },
};

export default fallbackContent;