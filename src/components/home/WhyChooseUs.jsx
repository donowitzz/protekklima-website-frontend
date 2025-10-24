// src/components/home/WhyChooseUs.js
import React from 'react';
import { FaTools, FaClock, FaShieldAlt, FaMapMarkedAlt, FaSmileBeam, FaCar } from 'react-icons/fa';

export default function WhyChooseUs() {
  const features = [
  {
    icon: <FaTools />,
    title: "Uzman Kadro",
    description: "Alanında uzman teknisyenlerimizle kaliteli hizmet.",
  },
  {
    icon: <FaClock />,
    title: "Hızlı Servis",
    description: "Arızalara hızlı müdahale ve çözüm.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Garantili Hizmet",
    description: "Yaptığımız tüm işlemler garantimiz altındadır.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Geniş Servis Ağı",
    description: "İstanbul’un her yerine hizmet.",
  },
  {
    icon: <FaSmileBeam />,
    title: "Müşteri Memnuniyeti",
    description: "Her zaman %100 müşteri memnuniyeti odaklıyız.",
  },
  {
    icon: <FaCar />,
    title: "Mobil Servis Araçları",
    description: "Tam donanımlı servis araçlarımızla yerinde çözüm.",
  },
];
  
return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 data-aos="fade-right" className="text-3xl font-bold text-center mb-10 text-regal-blue">Neden Bizi Tercih Etmelisiniz?</h2>
        <p data-aos="fade-left" className="text-lg text-dark-gray text-center mb-12 max-w-3xl mx-auto">
          SoğutmaPro olarak, klima ve soğutma sistemleriniz için en kaliteli, hızlı ve güvenilir hizmeti sunmayı taahhüt ediyoruz. İşte bizi rakiplerimizden ayıran özellikler:
        </p>
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
              <div className="text-5xl text-regal-blue mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-theme-hover mb-2">{feature.title}</h3>
              <p className="text-dark-gray">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* Ölçülebilir metrikler */}
        <div data-aos="fade-up" className="mt-12 text-center">
          <p className="text-2xl font-bold text-regal-blue">
            <span className="text-4xl">53.000+</span> Memnun Müşteri <span className="text-gray-500">|</span> <span className="text-4xl">25+</span> Yıllık Deneyim
          </p>
        </div>
      </div>
    </section>
  );
}