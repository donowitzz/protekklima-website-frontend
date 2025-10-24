// src/components/home/Testimonials.js
import React from 'react';
import { FaQuoteLeft, FaStar, FaUser } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
  {
    id: 1,
    name: "Bora Şenel",
    title: "İşletme Sahibi",
    review: "PROTEK hizmetlerinden çok memnun kaldım. Hızlı ve güvenilirler.",
    rating: 5,
    image: null,
  },
  {
    id: 2,
    name: "Zehra Sevinç",
    title: "İç Mimar",
    review: "Çözüm odaklı ve güleryüzlü ekip. Tavsiye ederim.",
    rating: 4,
    image: null,
  },
  // diğer müşteriler
  {
    id: 3,
    name: "Murat Güler",
    title: "Sağlık Hizmetleri",
    review: "İnanılmaz bir hizmet aldım, çok memnunum kesinlikle tavsiye ederim.",
    rating: 4,
    image: null,
  },
];

  


  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 data-aos="fade-right" className="text-3xl font-bold text-center mb-10 text-regal-blue">Müşteri Görüşleri</h2>
        <p data-aos="fade-left" className="text-lg text-dark-gray text-center mb-12 max-w-3xl mx-auto">
          Müşterilerimizin memnuniyeti, işimizin kalitesinin en büyük kanıtıdır. İşte bazı geri bildirimler:
        </p>
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <FaQuoteLeft className="text-theme-hover text-3xl mb-4" />
              <p className="text-dark-gray italic mb-4">"{testimonial.review}"</p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonial.rating? "text-regal-blue" : "text-gray-300"} />
                ))}
              </div>
          
              {testimonial.image ? (
              <img src={testimonial.image} 
              alt={testimonial.name} 
              className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-dark-gray" 
              /> ) : (
                <div className="w-18 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 border-2 border-dark-gray">
                  <FaUser className="text-gray-500 text-3xl" />
                </div>
              )}
              
              
              
              
              <h4 className="font-semibold text-dark-gray">{testimonial.name}</h4>
              <p className="text-sm text-theme-hover">{testimonial.title}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}