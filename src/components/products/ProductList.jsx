import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import ProductCard from "./ProductCard";

import ProductModal from "../ProductModal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsList() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const [totalPages, setTotalPages] = useState(0);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const openModal = (id) => {
    setSelectedProductId(id);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setSelectedProduct(null);
    setSimilarProducts([]);
  };

  useEffect(() => {
    axios
      .get("https://protekklima.onrender.com/rest/api/v1/category/list")
      .then((res) => {
        console.log("📦 Gelen Kategoriler:", res.data);
        setAllCategories(res.data);
      })
      .catch((err) => console.error("Kategoriler yüklenemedi:", err));
  }, []);

  useEffect(() => {
    axios
      .get("https://protekklima.onrender.com/rest/api/v1/brand/list")
      .then((res) => {
        console.log("📦 Markalar yüklenemedi", res.data);
        setAllBrands(res.data);
      })
      .catch((err) => console.error("Markalar yüklenemedi:", err));
  }, []);

  useEffect(() => {
    if (!selectedProductId) return;

    setModalLoading(true);
    axios
      .get(
        `https://protekklima.onrender.com/rest/api/v1/products/get/${selectedProductId}`
      )
      .then((res) => {
        setSelectedProduct(res.data);
        return axios.get(
          `https://protekklima.onrender.com/rest/api/v1/products/similar/${selectedProductId}`
        );
      })
      .then((res) => {
        setSimilarProducts(res.data);
        setModalLoading(false);
      })
      .catch((err) => {
        setModalLoading(false);
        console.error(
          "Ürün veya benzer ürünler getirilirken hata oluştu:",
          err
        );
      });
  }, [selectedProductId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://protekklima.onrender.com/rest/api/v1/products/filter",
          {
            params: {
              brand: selectedBrands.length > 0 ? selectedBrands[0] : null,
              category:
                selectedCategories.length > 0 ? selectedCategories[0] : null,
              name: searchQuery || null,
              page: pageNumber,
              size: pageSize,
            },
          }
        );
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Ürünler yüklenemedi:", err);
      }
    };

    fetchProducts();
  }, [selectedBrands, selectedCategories, searchQuery, pageNumber, pageSize]);

  const toggleSelection = (value, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    searchQuery.length > 0;

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Toplamda kaç sayfa numarasını göstermek istediğiniz
    let startPage = Math.max(0, pageNumber - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    if (startPage > 0) {
      pages.push(
        <span
          key="ellipsis-start"
          className="px-2 py-2 text-gray-500 text-sm font-medium self-center"
        >
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPageNumber(i)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              pageNumber === i
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
            }
          `}
        >
          {i + 1}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <span
          key="ellipsis-end"
          className="px-2 py-2 text-gray-500 text-sm font-medium self-center"
        >
          ...
        </span>
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        image="images/navbar-foto111.jpg"
        title="Ürünlerimiz"
        subtitle="Kaliteli ürün ve seçeneklerimiz ile hizmetinizdeyiz"
      />

      {/* Ana içerik kapsayıcısı: Filtreler ve Ürünler yan yana */}
      <div className="flex max-w-7xl mx-auto p-4 gap-6 flex-col lg:flex-row">
        {/* Filtre paneli */}
        <aside
          data-aos="fade-right"
          className="w-full lg:w-64 bg-white rounded-xl shadow-lg p-6 space-y-6 lg:sticky lg:top-24 h-fit"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-slate-900">Filtreler</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-slate-900 hover:text-theme-hover font-medium cursor-pointer"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Marka filtreleri */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 mb-3 border-b pb-2">
              Marka
            </h3>
            <div
              className="space-y-2 max-h-91 overflow-y-auto pr-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {allBrands.map((cat) => (
                <label
                  key={cat.name}
                  className={`flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors ${
                    selectedBrands.includes(cat.name)
                      ? "text-regal-blue font-semibold"
                      : "text-dark-gray"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(cat.name)}
                    onChange={() => {
                      toggleSelection(
                        cat.name,
                        selectedBrands,
                        setSelectedBrands
                      );
                      setPageNumber(0);
                    }}
                    className="mr-2 accent-blue-600"
                  />
                  <span className="text-sm select-none">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kategori filtreleri */}
          <div>
            <h3 className="font-semibold text-lg text-slate-900 mb-3 border-b pb-2">
              Kategori
            </h3>
            <div
              className="space-y-2 max-h-91 overflow-y-auto pr-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {allCategories.map((cat) => (
                <label
                  key={cat.name}
                  className={`flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors ${
                    selectedCategories.includes(cat.name)
                      ? "text-regal-blue font-semibold"
                      : "text-dark-gray"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => {
                      toggleSelection(
                        cat.name,
                        selectedCategories,
                        setSelectedCategories
                      );
                      setPageNumber(0);
                    }}
                    className="mr-2 accent-blue-600"
                  />
                  <span className="text-sm select-none">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Arama ve ürünler */}
        <div className="flex-1 flex flex-col">
          {/* Arama kutusu */}
          <div data-aos="fade-left" className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-regal-blue focus:border-transparent text-gray-700 pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Sonuç sayısı */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {products.length} ürün bulundu
              {hasActiveFilters && " (filtrelenmiş)"}
            </p>
          </div>

          {/* Ürün grid'i */}
          <motion.main
            data-aos="fade-left"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={products.length}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard
                    product={product}
                    onClick={() => openModal(product.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg mb-2">
                  Aramanıza uygun ürün bulunamadı
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Filtrelerinizi değiştirerek tekrar deneyin
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-theme-hover transition-colors text-sm cursor-pointer"
                  >
                    Tüm Filtreleri Temizle
                  </button>
                )}
              </motion.div>
            )}
          </motion.main>
          {/* Sayfalama Kontrolleri */}
          <div
            data-aos="fade-left"
            className="flex justify-center items-center mt-8 gap-2 p-2 bg-white rounded-lg shadow-lg"
          >
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
              disabled={pageNumber === 0}
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Geri
            </button>

            {/* Sayfa Numaraları */}
            <div className="flex gap-1">{renderPageNumbers()}</div>

            {totalPages > 0 && (
              <span className="px-3 py-2 text-gray-600 text-sm font-medium self-center whitespace-nowrap">
                Sayfa {pageNumber + 1} / {totalPages}
              </span>
            )}

            <button
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={pageNumber >= totalPages - 1}
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              İleri
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedProductId && (
        <ProductModal
          product={selectedProduct}
          similarProducts={similarProducts}
          loading={modalLoading}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
