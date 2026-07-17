import { useEffect, useState } from "react";
import Reveal from "../components/Reveal.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import api from "../api/axios.js";
import fallbackContent from "../content/fallbackContent.js";

const menuHeroImage = fallbackContent.menu.hero.image;

const categories = [
  { key: "all", label: "All" },
  { key: "bread", label: "Bread" },
  { key: "pastries", label: "Pastries" },
  { key: "cakes", label: "Cakes" },
  { key: "cookies", label: "Cookies" },
];

// Shared responsive grid: 1 col on phones, 2 on small tablets, 3 on laptops,
// 4 on large desktops — matches the card's aspect-square photo so nothing
// ever looks cramped or oversized at any breakpoint.
const gridClasses = "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = active === "all" ? "" : `?category=${active}`;
    api
      .get(`/products${query}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div className="bg-cream min-h-screen pb-24">
      <section className="relative overflow-hidden via-cream to-cream bg-mustard-100 min-h-[380px] md:min-h-[440px] flex items-center">
        <ImagePlaceholder
          src={menuHeroImage}
          alt="Jimtoz menu"
          label="Banner photo — spread of baked goods (1920x800 recommended)"
          className="absolute inset-0 w-full h-full rounded-none opacity-100"
        />
        <div className="container-page relative z-10 py-14">
          <Reveal className="max-w-xl">
            <p className="uppercase tracking-[0.25em] text-cream text-xs font-semibold mb-4">
              The full spread
            </p>
            <h1 className="text-3xl md:text-5xl leading-[1.1] font-display text-mustard-300 italic ">Our Menu</h1>
            <p className="text-cream mt-10 max-w-lg text-base md:text-lg max-w-md">
              Everything is baked in small batches, so availability changes daily. Order early to
              avoid missing out.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-page">
        <Reveal className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
          <div className="bg-white rounded-full shadow-card p-1.5 flex flex-wrap gap-1 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  active === cat.key
                    ? "bg-mustard-500 text-cocoa-800"
                    : "text-cocoa-600 hover:bg-mustard-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <div className={gridClasses}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-square w-full rounded-3xl bg-white animate-pulse shadow-card" />
                <div className="h-4 w-2/3 rounded bg-white animate-pulse" />
                <div className="h-4 w-1/3 rounded bg-white animate-pulse" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-cocoa-500 py-20">
            Nothing here yet — check back soon or try a different category.
          </p>
        ) : (
          <div className={gridClasses}>
            {products.map((product, i) => (
              <Reveal key={product._id} delay={(i % 4) * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;