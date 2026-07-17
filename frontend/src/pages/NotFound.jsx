import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

const NotFound = () => (
  <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-6xl font-display text-mustard-500 mb-4">404</h1>
    <p className="text-cocoa-600 mb-8">This page must have gone stale. Let's get you back on track.</p>
    <Button as={Link} to="/" variant="primary">
      Back Home
    </Button>
  </div>
);

export default NotFound;
