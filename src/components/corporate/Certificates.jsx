import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CertificateCard from "./CertificateCard";

const basePath = import.meta.env.BASE_URL;

export default function Certificates() {
  const certificates = [
    { title: "Kalfalık Belgesi", image: `${basePath}images/sertifika1.jpg` },
    { title: "Ustalık Belgesi", image: `${basePath}images/sertifika2.jpg` },
    { title: "Usta Öğreticilik Belgesi", image: `${basePath}images/sertifika3.jpg` },
    { title: "Eğitim Sertifikası", image: `${basePath}images/sertifika4.jpg` },
    { title: "Yetkili Satıcı Belgesi", image: `${basePath}images/sertifika5.jpg` },
    { title: "Meslek Kursu Belgesi", image: `${basePath}images/sertifika6.jpg` },
  ];

  const [currentIndex, setCurrentIndex] = useState(null);
  const openModal = (index) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  const goNext = () =>
    setCurrentIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));

  const selectedCert = currentIndex !== null ? certificates[currentIndex] : null;

  return (
    <section className="py-16 bg-white flex flex-col items-center">
      <div className="container mx-auto px-0">
        <h2 className="text-3xl font-bold text-center mb-10 text-regal-blue">Sertifikalarımız</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center max-w-6xl w-full">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={index}
              cert={cert}
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center z-50 rounded-xl"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-lg p-4 max-w-3xl w-full"
            >
              <div className="relative">
                <h3 className="text-xl font-bold text-center mb-3">
                  {selectedCert.title}
                </h3>
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[80vh] rounded mx-auto block"
                />

                {/* Sol ok */}
                <button
                  onClick={(e) => {
                    goPrev();
                    e.stopPropagation();
                  }}
                  className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-black/40 text-white hover:bg-black/60 rounded-r-md cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Sağ ok */}
                <button
                  onClick={(e) => {
                    goNext();
                    e.stopPropagation();
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-black/40 text-white hover:bg-black/60 rounded-l-md cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
