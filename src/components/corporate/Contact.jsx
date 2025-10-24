import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaPen, FaBuffer } from "react-icons/fa";
import axios from "axios";

const basePath = import.meta.env.BASE_URL;

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLocked, setIsButtonLocked] = useState(false);
  const [countdown, setCountdown] = useState(0); // Geri sayım (saniye)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const sendTimes = JSON.parse(sessionStorage.getItem('contactSendTimes') || '[]');
      const now = Date.now();
      let lockTime = 0;

      if (sendTimes.length >= 5) {
        const lastSend = sendTimes[sendTimes.length - 1];
        if (now - lastSend < 10 * 60 * 1000) {
          setIsButtonLocked(true);
          lockTime = 10 * 60 * 1000 - (now - lastSend);
        } else {
          sessionStorage.setItem('contactSendTimes', JSON.stringify([]));
          setIsButtonLocked(false);
          setCountdown(0);
          return;
        }
      } else if (sendTimes.length > 0) {
        const lastSend = sendTimes[sendTimes.length - 1];
        if (now - lastSend < 5 * 60 * 1000) { // 5 dakika
          setIsButtonLocked(true);
          lockTime = 5 * 60 * 1000 - (now - lastSend);
        } else {
          setIsButtonLocked(false);
          setCountdown(0);
          return;
        }
      } else {
        setIsButtonLocked(false);
        setCountdown(0);
        return;
      }

      if (lockTime > 0) {
        setCountdown(Math.ceil(lockTime / 1000));
      } else {
        setCountdown(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonLocked) return;
    setIsLoading(true);
    try {
      const apiData = {
        email: formData.email,
        konu: formData.subject,
        mesaj: formData.message,
        isim: formData.name,
      };
      await axios.post("https://protekklima.onrender.com/api/v1/mail/send", apiData);
      alert("Mesajınız Başarıyla Gönderildi");
      setFormData({ name: "", email: "", subject: "", message: "" });
      if (formRef.current) {
        formRef.current.reset();
      }
      let sendTimes = JSON.parse(sessionStorage.getItem('contactSendTimes') || '[]');
      sendTimes.push(Date.now());
      if (sendTimes.length > 5) sendTimes = sendTimes.slice(-5);
      sessionStorage.setItem('contactSendTimes', JSON.stringify(sendTimes));
      setIsButtonLocked(true);
    } catch (error) {
      console.error("Form gönderirken hata oluştu", error);
      alert("Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsLoading(false);
    }
  };

  // Geri sayımı dakika:saniye formatında göster
  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {/* Header */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        <img
          src={`${basePath}images/navbar-foto111.jpg`}
          alt="ProtekKlima"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>
        <div data-aos="zoom-in" className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 ">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">İletişim</h1>
          <p className="text-xl max-w-2xl mx-auto text-white">
            Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilir ya da
            formu doldurabilirsiniz.
          </p>
        </div>
      </section>
      {/* İçerik */}
      <section className="py-2 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bilgi Kutuları */}
          <div data-aos="fade-right" className="space-y-6 md:mt-46 mt-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-slate-900">Adres</h2>
              <p className="text-dark-gray">Halkalı Merkez, Göçmen Sk. No:3, 34303 Küçükçekmece/İstanbul</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-slate-900">Telefon</h2>
              <a href="tel:+905350116597" className="text-theme-hover underline hover:text-dark-gray">
                +90 535 011 65 97
              </a><br />
              <a href="tel:+902125986161" className="text-theme-hover underline hover:text-dark-gray">
                +90 212 598 61 61
              </a>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-slate-900">E-posta</h2>
              <a href="mailto:info@sogutmapro.com" className="text-theme-hover hover:underline hover:text-dark-gray">
                no-reply@protekklima.com
              </a>
            </div>
          </div>
          {/* Form */}
          <form
            data-aos="fade-left"
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 md:ml-35 py-2 bg-white p-10 rounded-xl shadow-xl space-y-4 max-w-xl px-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Bize Ulaşın
            </h2>
            {/* Ad Soyad */}
            <div>
              <label className="block text-regal-blue font-bold mb-2 text-sm uppercase flex items-center gap-2">
                <FaUser className="text-theme-hover" /> Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınız Soyadınız"
                className="w-full border-2 border-regal-blue rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-0 transition"
                required
                disabled={isLoading || isButtonLocked}
              />
            </div>
            {/* E-posta */}
            <div>
              <label className="block text-regal-blue font-bold mb-2 text-sm uppercase flex items-center gap-2">
                <FaEnvelope className="text-theme-hover" /> E-posta
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ornek@mail.com"
                className="w-full border-2 border-regal-blue rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-0 transition"
                required
                disabled={isLoading || isButtonLocked}
              />
            </div>
            {/* Konu */}
            <div>
              <label className="block text-regal-blue font-bold mb-2 text-sm uppercase flex items-center gap-2">
                <FaBuffer className="text-theme-hover" /> Konu
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Konu"
                className="w-full border-2 border-regal-blue rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-0 transition"
                required
                disabled={isLoading || isButtonLocked}
              />
            </div>
            {/* Mesaj */}
            <div>
              <label className="block text-regal-blue font-bold mb-2 text-sm uppercase flex items-center gap-2">
                <FaPen className="text-theme-hover" /> Mesaj
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mesajınızı yazın..."
                required
                disabled={isLoading || isButtonLocked}
                className="w-full border-2 border-regal-blue rounded-lg px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-0 transition shadow-md"
              ></textarea>
            </div>
            {/* Gönder Butonu */}
            <button
              type="submit"
              disabled={isLoading || isButtonLocked}
              className="w-full bg-slate-900 text-white font-medium py-3 rounded hover:bg-button-hover hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Gönderiliyor...
                </div>
              ) : isButtonLocked ? (
                <>Gönderildi! {countdown > 0 && `(${formatCountdown(countdown)})`}</>
              ) : (
                <>Gönder <FaPaperPlane className="text-white" /></>
              )}
            </button>
          </form>
        </div>
      </section>
      {/* Harita Görünümü */}
      <section data-aos="zoom-out" className="w-full h-[450px] mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!3m2!1str!2str!4v1751025538071!5m2!1str!2str!6m8!1m7!1sz4o5k3Xv2zvmK4xnH2Unaw!2m2!1d41.0309311113582!2d28.79258829085527!3f222.88230519411363!4f5.609572254707388!5f0.7820865974627469"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="İşletme Konumu - Street View"
        ></iframe>
      </section>
    </div>
  );
}
