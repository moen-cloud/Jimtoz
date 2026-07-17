import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wheat, Clock, Truck } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import Button from "../components/Button.jsx";
import ImagePlaceholder from "../components/ImagePlaceholder.jsx";
import CrimpDivider from "../components/CrimpDivider.jsx";
import ProductCard from "../components/ProductCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import api from "../api/axios.js";
import fallbackContent from "../content/fallbackContent.js";

const { hero, trustStrip, storyTeaser } = fallbackContent.home;
const trustIcons = [Wheat, Clock, Truck];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/products?featured=true").then((res) => setFeatured(res.data)).catch(() => {});
    api.get("/reviews").then((res) => setReviews(res.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mustard-100 via-cream to-cream min-h-[440px] md:min-h-[500px] flex items-center">
        {/* Hero photo sits behind the whole section as a background */}
        <ImagePlaceholder
          src={hero.image}
          alt="Jimtoz bakery hero"
          label="Hero photo — fresh bakes on a rustic table (1920x1080 recommended)"
          className="absolute inset-0 w-full h-full rounded-none opacity-100"
        />

        <div className="container-page relative z-10 grid md:grid-cols-2 gap-12 items-center py-14 pointer-events-none">
          <Reveal className="pointer-events-auto">
            <p className="uppercase tracking-[0.25em] text-mustard-300 text-xs font-semibold mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl leading-[1.1] font-display text-cream">
              {hero.heading}{" "}
              <span className="italic text-mustard-300">{hero.headingAccent}</span>
            </h1>
            <p className="mt-5 text-cream text-base md:text-lg max-w-md">{hero.body}</p>
            <div className="flex flex-wrap gap-4 mt-7">
              <Button as={Link} to="/menu" variant="primary">
                {hero.primaryButtonLabel} <ArrowRight size={18} />
              </Button>
              <Button as={Link} to="/custom-cakes" variant="outline">
                {hero.secondaryButtonLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CrimpDivider color="#FFF8ED" />

      {/* TRUST STRIP */}
      <section className="bg-cream py-10">
        <div className="container-page grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {trustStrip.map((item, i) => {
            const Icon = trustIcons[i];
            return (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-mustard-100 flex items-center justify-center text-mustard-600">
                    <Icon size={24} />
                  </div>
                  <p className="font-display text-lg text-cocoa-800">{item.title}</p>
                  <p className="text-sm text-cocoa-500">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-mustard-50 py-20">
        <div className="container-page">
          <Reveal className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="uppercase tracking-[0.25em] text-mustard-600 text-xs font-semibold mb-2">
                This week's favorites
              </p>
              <h2 className="text-3xl md:text-4xl">Fresh out of the oven</h2>
            </div>
            <Link to="/menu" className="text-cocoa-700 font-semibold flex items-center gap-1 hover:text-mustard-600">
              View full menu <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(featured.length ? featured : Array.from({ length: 4 })).map((product, i) => (
              <Reveal key={product?._id || i} delay={i * 0.08}>
                {product ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="aspect-square w-full rounded-3xl bg-white animate-pulse shadow-card" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CrimpDivider color="#3E2723" bg="#FDF8E9" flip />

      {/* STORY TEASER */}
      <section className="bg-cocoa-700 text-cream py-20">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <ImagePlaceholder
              src={storyTeaser.image}
              alt="The baker at work"
              label="Photo of the baker at work in the kitchen"
              className="w-full h-80 rounded-4xl"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="uppercase tracking-[0.25em] text-mustard-400 text-xs font-semibold mb-4">
              {storyTeaser.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl text-cream mb-5">{storyTeaser.heading}</h2>
            <p className="text-cream/70 leading-relaxed mb-6">{storyTeaser.body}</p>
            <Button as={Link} to="/about" variant="primary">
              {storyTeaser.buttonLabel}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream py-20">
        <div className="container-page">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <p className="uppercase tracking-[0.25em] text-mustard-600 text-xs font-semibold mb-2">
              Loved by regulars
            </p>
            <h2 className="text-3xl md:text-4xl">What people are saying</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(reviews.length
              ? reviews
              : [
                  { name: "Wanjiru M.", rating: 5, comment: "The sourdough is unreal — best in Nairobi, hands down." },
                  { name: "David K.", rating: 5, comment: "Ordered a custom cake for my daughter's birthday. Perfect every time." },
                  { name: "Amina S.", rating: 4, comment: "Fresh, warm, and the pickup process is so smooth." },
                ]
            ).map((review, i) => (
              <Reveal key={review._id || i} delay={i * 0.1}>
                <TestimonialCard review={review} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;