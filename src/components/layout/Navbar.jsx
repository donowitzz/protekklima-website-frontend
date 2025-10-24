import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSnowflake, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import { FiArrowUp } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import imageLogo from "/images/proteklogo1.png";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCorporateDropdownOpen, setCorporateDropdownOpen] = useState(false);

  const [navbarHidden, setNavbarHidden] = useState(false);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (currentY === 0) {
        setNavbarHidden(false); // En üstteysek menü ve buton görünür
        setShowScrollTopBtn(false);
      } else {
        setNavbarHidden(true); // Scroll yapıldıysa gizle
        setMobileMenuOpen(false); // Scroll yapılınca mobil menüyü kapat
        setCorporateDropdownOpen(false); // Dropdown da kapanmalı
      }

      if (currentY + windowHeight >= fullHeight - 150) {
        setShowScrollTopBtn(true); // Sayfa altına yaklaşıldığında göster
      } else {
        setShowScrollTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="absolute top-0 z-50 transition-all duration-300 py-4 bg-transparent w-full">
        <div data-aos="zoom-out" className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo her zaman görünür */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="flex items-center space-x-2">
             
            <img src={imageLogo} alt="logo" className="h-8 md:h-12 w-auto" /> 
             
            <motion.span
              initial={{ opacity: 1, width: "auto" }}
              animate={
                navbarHidden
                  ? { opacity: 0, width: 0 }
                  : { opacity: 1, width: "auto" }
              }
              transition={{ duration: 0.3 }}
              style={{
                overflow: "hidden",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
              className="md:text-3xl text-lg font-bold text-red-500"
            >
              PROTEK
            </motion.span>
          </div>
          </Link>

          {/* Masaüstü Menü */}
          {!navbarHidden && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex space-x-8 "
            >
              <Link to="/" className="text-white hover:text-slate-900 font-medium text-xl">
                Anasayfa
              </Link>

              <Popover className="relative group">
                <PopoverButton className="text-white hover:text-slate-900 font-medium flex items-center cursor-pointer text-xl">
                  Kurumsal <IoIosArrowDown className="ml-1 h-4 w-4" />
                </PopoverButton>

                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="opacity-0 translate-y-2"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-150 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-2"
                >
                  <PopoverPanel className="absolute left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 z-20 min-w-[180px]">
                    <Link
                      to="/corporate/about"
                      className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-theme-hover"
                    >
                      Hakkımızda
                    </Link>
                    <Link
                      to="/corporate/contact"
                      className="block px-4 py-2 text-gray-700 hover:bg-white hover:text-theme-hover"
                    >
                      İletişim
                    </Link>
                  </PopoverPanel>
                </Transition>
              </Popover>

              <Link
                to="/products"
                className="text-white hover:text-slate-900 font-medium text-xl"
              >
                Ürünlerimiz
              </Link>

              <Link
                to="/brands"
                className="text-white hover:text-slate-900 font-medium text-xl"
              >
                Markalarımız
              </Link>
            </motion.div>
          )}

          {/* Mobil Menü Butonu */}
          <AnimatePresence>
            {!navbarHidden && (
              <motion.div
                className="md:hidden flex items-center space-x-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="text-white focus:outline-none cursor-pointer"
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={
                    isMobileMenuOpen ? "Mobil menüyü kapa" : "Mobil menüyü aç"
                  }
                >
                  {isMobileMenuOpen ? (
                    <FiX className="h-6 w-6 text-theme-hover" />
                  ) : (
                    <HiOutlineMenu className="h-6 w-6" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobil Menü */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 50 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-3 space-y-3 px-4 bg-white shadow-md rounded-b-md fixed top-16 right-0 w-64"
            >
              <Link
                to="/"
                className="block text-regal-blue hover:text-theme-hover font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Anasayfa
              </Link>

              <div>
                <button
                  className="flex items-center justify-between w-full text-regal-blue hover:text-theme-hover font-medium cursor-pointer"
                  onClick={() =>
                    setCorporateDropdownOpen(!isCorporateDropdownOpen)
                  }
                >
                  Kurumsal <IoIosArrowDown className="h-4 w-4" />
                </button>

                {isCorporateDropdownOpen && (
                  <div className="pl-4 py-2 space-y-2">
                    <Link
                      to="/corporate/about"
                      className="block text-regal-blue hover:text-theme-hover"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Hakkımızda
                    </Link>
                    <Link
                      to="/corporate/contact"
                      className="block text-regal-blue hover:text-theme-hover"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      İletişim
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/products"
                className="block text-regal-blue hover:text-theme-hover font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ürünlerimiz
              </Link>
              <Link
                to="/brands"
                className="block text-regal-blue hover:text-theme-hover font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Markalarımız
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Yukarı dön butonu */}
      <AnimatePresence>
        {showScrollTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={() => {setShowScrollTopBtn(false);  window.scrollTo({ top: 0, behavior: "smooth" });}}
            aria-label="Sayfanın başına dön"
            className="fixed bottom-6 right-6 p-3 rounded-full bg-button-hover text-white shadow-lg hover:bg-regal-blue focus:outline-none z-50 animate-bounce cursor-pointer"
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
