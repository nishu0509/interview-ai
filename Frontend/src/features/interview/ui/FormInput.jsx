export default function FormInput({
  label,
  placeholder,
  id,
  type = "text",
  value,
  onChange,
  icon,
  badge,
  className = ""
}) {
  return (
    <div className={`form-group ${className}`}>
      <div className="input-header">
        {label && (
          <label htmlFor={id}>
            {icon && <span className="input-icon">{icon}</span>}
            {label}
          </label>
        )}
        {badge && <span className="badge">{badge}</span>}
      </div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-group"
      />
    </div>
  );
}
