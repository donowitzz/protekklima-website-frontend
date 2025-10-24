// src/components/home/Services.js
import React from 'react';
import Lottie from "lottie-react";
import climaFan from "../../assets/climaFan.json";
import pisirmeFan2 from "../../assets/pisirmeFan2.json";
import isitmaFan from "../../assets/isitmaFan.json";
import sogukOda1 from "../../assets/sogukOda1.json";
import washPro from "../../assets/washPro.json"
import dogramaMak from "../../assets/dogramaMak.json"

export default function Services() {
  const klimaServices = [
  {
    title: "Soğutma Sistemleri Teknik Servisi",
    description: "Klimalar, buzdolapları ve diğer soğutucuların yetkili teknik servis hizmeti.",
    animation: climaFan,
    link: "corporate/contact",
  },
  {
    title: "Pişirme Sistemleri Teknik Servisi",
    description: "Modüler pişiriciler, set üstü pişiriciler, fırınlar ve diğer tüm pişiricilerin teknik servis hizmeti.",
    animation: pisirmeFan2,
    link: "corporate/contact",
  },
  {
    title: "Isıtma Sistemleri Teknik Servisi",
    description: "Pano ısıtıcılar, termostatlar, klimalar ve diğer tüm ısıtıcıların teknik servis hizmeti.",
    animation: isitmaFan,
    link: "corporate/contact",
  },
];


  const sogutmaServices = [
  {
    title: "Soğuk Oda Kurulum ve Bakım Hizmeti",
    description: "İhtiyacınıza uygun soğuk oda projelendirme, montaj ve periyodik bakım hizmeti. ",
    animation: sogukOda1,
    link: "corporate/contact",
  },
  {
    title: "Yıkama Makineleri Teknik Servisi",
    description: "Bulaşık yıkama makineleri, sebze yıkama makineleri ve diğer yıkama sistemleri teknik servis hizmeti.",
    animation: washPro,
    link: "corporate/contact",
  },
  {
    title: "Doğrama Makineleri Teknik Servisi",
    description: "Sebze doğrama, et doğrama ve diğer doğrama makinelerinin teknik servis hizmeti.",
    animation: dogramaMak,
    link: "corporate/contact",
  },
];


  const ServiceCard = ({ title, description, animation, link }) => (
    <div className="p-6 rounded-lg shadow-2xl hover:shadow-md transition-transform text-center hover:scale-105 ease-in-out duration-300 group-hover:blur-xs hover:blur-none">
      <div className="text-4xl mb-4">
        <Lottie 
        animationData={animation} 
        loop={true}
        className="w-24 h-24 mx-auto"
      />
      </div>
      <h3 className="text-xl font-semibold text-regal-blue mb-2">{title}</h3>
      <p className="text-dark-gray mb-4">{description}</p>
      <a href={link} className="text-m font-semibold text-regal-blue hover:underline hover:text-theme-hover">
        Daha Fazla Bilgi Edinin
      </a>
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-regal-blue">Hizmetlerimiz</h2>

        {/* Klima Hizmetleri */}
        {/* <h3 className="text-2xl font-bold text-center mb-6 mt-12 text-gray-800">Klima Hizmetleri</h3> */}
        <div data-aos="fade-down" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group ">
          {klimaServices.map((service, index) => (
            <ServiceCard key={`klima-${index}`} {...service} />
          ))}
        </div>

        {/* Soğutma Sistemleri Hizmetleri */}
        {/* <h3 className="text-2xl font-bold text-center mb-6 mt-12 text-gray-800">Soğutma Sistemleri Hizmetleri</h3> */}
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-8 group">
          {sogutmaServices.map((service, index) => (
            <ServiceCard key={`sogutma-${index}`} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}