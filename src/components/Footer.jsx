export default function Footer() {
  return (
    <footer style={{ background: "var(--primary)", color: "var(--card)" }} className="text-center py-3">
      <div className="text-sm">© {new Date().getFullYear()} PosSystem — Built by @Voeun Rithy email:mrrithyjr@gmail.com</div>
    </footer>
  );
}
