export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-icon" aria-hidden="true">★</span>
      {children}
    </button>
  );
}