export default function FileUpload({
  label,
  id,
  accept = ".pdf,.doc,.docx",
  description,
  badge,
  badgeVariant = "default",
  onFileSelect,
  icon,
  className = "",
}) {

  const inputId = id || "file-upload";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    console.log("FILE =>", file);

    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className={`form-group ${className}`}>

      <div className="file-header">

        {label && (
          <label htmlFor={inputId}>
            {icon && <span className="file-label-icon">{icon}</span>}
            {label}
          </label>
        )}

        {badge && (
          <span
            className={`badge ${
              badgeVariant === "green"
                ? "badge--green"
                : ""
            }`}
          >
            {badge}
          </span>
        )}

      </div>

      <label
        htmlFor={inputId}
        className="file-upload-group"
      >

        <div className="file-upload-icon">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>

        </div>

        <div className="file-text">

          <p className="file-title">
            Click to upload or drag & drop
          </p>

          {description && (
            <p className="file-description">
              {description}
            </p>
          )}

        </div>

      </label>

      <input
        type="file"
        id={inputId}
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

    </div>
  );
}