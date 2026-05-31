export default function PageHeader({
  title,
  subtitle,
  titleHighlight,
  className = ""
}) {
  const renderTitleWithHighlight = () => {
    if (!titleHighlight) return title;

    const parts = title.split(titleHighlight);
    return parts.map((part, index) =>
      index < parts.length - 1 ? (
        <span key={index}>
          {part}
          <span className="highlight">{titleHighlight}</span>
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className={`page-header ${className}`}>
      <h1>{renderTitleWithHighlight()}</h1>
      {subtitle && (
        <p className="subtitle">{subtitle}</p>
      )}
    </div>
  );
}
