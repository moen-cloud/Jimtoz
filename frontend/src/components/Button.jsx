const variants = {
  primary:
    "bg-mustard-500 text-cocoa-800 hover:bg-mustard-400 shadow-card",
  dark:
    "bg-cocoa-700 text-cream hover:bg-cocoa-600 shadow-card",
  outline:
    "bg-transparent border-2 border-cocoa-700 text-cocoa-700 hover:bg-cocoa-700 hover:text-cream",
  ghost: "bg-transparent text-cocoa-700 hover:bg-mustard-100",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  as: Component = "button",
  ...props
}) => {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body font-semibold text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
