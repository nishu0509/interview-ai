export default function FormSection({ children, className = "" }) {
  return (
    <div className={`form-section ${className}`}>
      {children}
    </div>
  );
}
