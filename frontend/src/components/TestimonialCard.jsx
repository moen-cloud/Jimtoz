import { Star } from "lucide-react";
import ImagePlaceholder from "./ImagePlaceholder.jsx";

const TestimonialCard = ({ review }) => {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-card flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3">
        <ImagePlaceholder
          src={review.photo}
          label="Photo"
          className="h-12 w-12 rounded-full text-[10px] shrink-0"
        />
        <div>
          <p className="font-display text-cocoa-800">{review.name}</p>
          <div className="flex gap-0.5 text-mustard-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-cocoa-600 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
    </div>
  );
};

export default TestimonialCard;
