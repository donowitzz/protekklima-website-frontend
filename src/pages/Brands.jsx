import PageHeader from "../components/PageHeader";

export default function Brands() {
  const brands = [
    { name: 'Pfannenberg', logo: 'images/pfannenberg_logo1.png' },
    { name: 'Mitsubishi Electric', logo: 'images/mitsu_logo.png' },
    { name: 'İnoksan', logo: 'images/inoksan-logo1.png' },
    { name: 'Hantech', logo: 'images/hantech-logo1.png' },
    { name: 'Öztiryakiler', logo: 'images/oztiryakiler_logo1.png' },
   
  ];

  return (
    <div>
      <PageHeader
        title="Markalarımız"
        subtitle="Birlikte çalıştığımız güvenilir markalar"
        image="images/markalar-logo.png"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 data-aos="fade-left" className="text-3xl font-bold text-center mb-10 text-slate-900">Çözüm Ortaklarımız</h2>
          <div className="w-24 h-1 bg-theme-hover mx-auto mb-10 rounded"></div>

          <div data-aos="fade-right" className="flex flex-wrap justify-center gap-6 text-center">
            {brands.map((brand) => (
              <div
                key={brand}
                className="
                border border-regal-blue rounded-xl p-6 shadow-sm
                hover:shadow-md hover:border-theme-hover transition transform hover:scale-105 bg-white
                w-full sm:w-1/2 md:w-1/4
                "
              >
                <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-16 object-contain block mx-auto"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              data-aos="fade-up"
              href="corporate/contact"
              className="inline-block bg-slate-900 hover:bg-button-hover text-white font-semibold py-3 px-6 rounded-lg shadow transition"
            >
              Bizimle İletişime Geçin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
