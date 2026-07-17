import { ShoppingBasket } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder.jsx";
import { useCart } from "../context/CartContext.jsx";

/**
 * Product card — aspect-square photo up top (like a classic ecommerce grid),
 * name + price below, and a clear "Add to Basket" CTA. Fully fluid: it just
 * fills whatever grid column it's placed in, so it reflows cleanly from a
 * single column on phones up to a 4-column grid on large screens.
 */
const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="group flex h-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
        <ImagePlaceholder
          src={product.image}
          alt={product.name}
          label={`Photo of "${product.name}"`}
          className="w-full h-full transition-opacity duration-300 group-hover:opacity-80"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-cocoa-700 text-cream text-xs font-semibold px-3 py-1 rounded-full">
            Sold out today
          </span>
        )}
        {product.tags?.includes("new") && (
          <span className="absolute top-3 right-3 bg-mustard-500 text-cocoa-800 text-xs font-semibold px-3 py-1 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-lg text-cocoa-800 leading-snug">{product.name}</h3>
        <p className="text-sm text-cocoa-500 mt-1 line-clamp-2 flex-1">{product.description}</p>
        <p className="mt-2 font-display text-lg text-mustard-600">
          KES {product.price?.toLocaleString()}
        </p>

        <button
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-cocoa-700 text-cream text-sm font-semibold px-5 py-2.5 transition-colors hover:bg-mustard-500 hover:text-cocoa-800 disabled:opacity-40 disabled:pointer-events-none w-full"
        >
          <ShoppingBasket size={16} />
          {product.inStock ? "Add to Basket" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;