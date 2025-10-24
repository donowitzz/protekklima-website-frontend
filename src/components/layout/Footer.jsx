export default function Footer() {
  return (
    <footer className="bg-slate-900 text-center text-white py-6 mt-0">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} PROTEK Klima ve Soğutma Servisi. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
