// SimilarProducts.jsx (Örnek)
import React from 'react';

// ProductModal'dan gelen getImageUrl fonksiyonunu prop olarak alıyoruz
export default function SimilarProducts({ products, onProductClick, getImageUrl }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500 mt-4">Benzer ürün bulunamadı.</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Benzer Ürünler</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((simProduct) => (
          <div
            key={simProduct.id}
            onClick={() => onProductClick(simProduct)}
            className="bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer text-center"
          >
            {/* Benzer ürünün resmini gösteriyoruz */}
            <img
              src={getImageUrl(simProduct)} // Burada da aynı helper fonksiyonu kullanıyoruz
              alt={simProduct.name}
              className="w-full h-24 object-contain mb-2 rounded"
            />
            <p className="text-sm font-medium text-regal-blue truncate">{simProduct.name}</p>
            {simProduct.price && (
              <p className="text-blue-500 text-sm font-semibold">{simProduct.price} TL</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}