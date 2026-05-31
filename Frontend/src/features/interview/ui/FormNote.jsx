
export default function FormNote({ children, type = "info", className = "" }) {
  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    validation: "ℹ️"
  };

  return (
    <div className={`form-note form-note-${type} ${className}`}>
      <span className="note-icon">{icons[type]}</span>
      <div className="note-content">{children}</div>
    </div>
  );
}
