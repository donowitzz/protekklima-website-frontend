export default function BrandList() {
  const brands = [
    "Pfannenberg",
    "Mitsubishi Electric",
    "İnoksan",
    "Hantech",
    "Öztiryakiler",
    
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
      {brands.map((brand) => (
        <div
          key={brand}
          className="border rounded p-6 shadow hover:shadow-md transition"
        >
          <span className="text-lg font-medium text-gray-700">{brand}</span>
        </div>
      ))}
    </div>
  );
}
