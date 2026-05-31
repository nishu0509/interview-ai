export default function PageFooter({ className = "" }) {
  return (
    <footer className={`page-footer ${className}`}>
      <a href="#">Privacy Policy</a>
      <span className="separator">|</span>
      <a href="#">Terms of Service</a>
      <span className="separator">|</span>
      <a href="#">Help Center</a>
    </footer>
  );
}
