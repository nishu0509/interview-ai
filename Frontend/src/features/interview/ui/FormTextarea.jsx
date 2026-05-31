export default function FormTextarea({
  label,
  placeholder,
  id,
  maxLength = 5000,
  charCount = 0,
  value,
  onChange,
  badge,
  icon,
  className = "",
}) {
  return (
    <div className={`form-group ${className}`}>
      <div className="textarea-header">
        {label && (
          <label htmlFor={id}>
            {icon && <span className="textarea-icon">{icon}</span>}
            {label}
          </label>
        )}
        {badge && <span className="badge">{badge}</span>}
      </div>
      <textarea
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className="textarea-group"
      />
      <div className="char-counter">
        {charCount} / {maxLength} chars
      </div>
    </div>
  );
}