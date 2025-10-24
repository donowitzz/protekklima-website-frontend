import { motion, AnimatePresence } from "framer-motion";
import SimilarProducts from "./SimilarProducts";
import { useState, useEffect } from "react";

export default function ProductModal({ product: initialProduct, similarProducts, onClose }) {

  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  useEffect(() => {
    // initialProduct değiştiğinde modal içeriğini güncelle
    setCurrentProduct(initialProduct);
  }, [initialProduct]);

  if (!currentProduct) return null;

  // Resim URL'sini güvenli bir şekilde çekme fonksiyonu
  // Hem currentProduct hem de similarProducts için kullanılabilir
  const getImageUrl = (prod) => {
    return prod.images && prod.images.length > 0
      ? prod.images[0].imageUrl
      : 'https://via.placeholder.com/400x300?text=Resim+Yok'; // Varsayılan resim URL'si
  };

  const handleSimilarProductClick = (simProduct) => {
    setCurrentProduct(simProduct);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-start justify-center z-50 p-4 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Geri Butonu - En dış div'in içinde, modalın dışında */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-regal-blue text-white px-3 py-2 rounded-full shadow-md hover:bg-button-hover transition-colors flex items-center gap-1 text-sm font-medium z-50 cursor-pointer"
          aria-label="Geri"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Geri
        </button>

        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto relative p-6 mt-16"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Modalın arka plana tıklayınca kapanmasını engeller
        >
          {/* Ana içerik: ürün detay ve yeni açıklama bölümü yan yana */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sol taraf: Ürün Adı, Kısa Açıklama ve Görsel */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-4 text-regal-blue">{currentProduct.name}</h1>
              <p className="mb-4 text-gray-700 text-dark-gray">{currentProduct.description}</p>

              {/* RESİM KISMINDAKİ DEĞİŞİKLİK BURADA */}
              {currentProduct.images && currentProduct.images.length > 0 ? (
                <motion.img
                  src={getImageUrl(currentProduct)} // Helper fonksiyonu kullanarak URL'yi çekiyoruz
                  alt={currentProduct.name}
                  className="w-full max-h-80 object-contain rounded-lg mb-4 shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xl font-medium mb-4">
                  Görsel Yok
                </div>
              )}
            </div>

            {/* Sağ taraf: Yeni Açıklama, Kategori ve Model Bölümü */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-regal-blue">Ürün Detayları / Ek Bilgiler</h2>

              {/* Ürün Kategorisi */}
              {currentProduct.category && (
                <p className="text-theme-hover mb-2">
                  <span className="font-semibold text-dark-gray">Kategori:</span> {currentProduct.category?.label}
                </p>
              )}

              {/* Ürün Markası */}
              {currentProduct.brand && (
                <p className="text-theme-hover mb-2">
                  <span className="font-semibold text-dark-gray">Marka:</span> {currentProduct.brand?.name}
                </p>
              )}

              {/* Ürün Fiyatı */}
              {currentProduct.price && (
                <p className="text-gray-800 mb-4">
                  <span className="font-semibold">Fiyat:</span> {currentProduct.price} TL
                </p>
              )}

              {/* Uzun Açıklama */}
              {currentProduct.longDescription ? (
                <p className="text-dark-gray leading-relaxed">
                  {currentProduct.longDescription}
                </p>
              ) : ( 
                <div  className="text-theme-hover italic"> 
               <p>Bu ürün için ek detay bulunmamaktadır.</p>
               <button onClick={()=> window.location.href = '/corporate/contact'} 
                 className="mt-4 inline-block bg-regal-blue text-white px-4 py-2 rounded-lg shadow hover:bg-button-hover transition-colors cursor-pointer"
                >
                 Detaylı bilgi için iletişime geçin
               </button>
                </div>
              )}
            </div>
          </div>

          {/* Benzer ürünler - Hala ana içeriğin altında */}
          <div className="w-full mt-8">
            <SimilarProducts
              products={similarProducts}
              onProductClick={handleSimilarProductClick}
              getImageUrl={getImageUrl} // SimilarProducts'a da getImageUrl'yi geçiyoruz
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}