// src/components/home/FAQ.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQ() {
  const faqs = [
    {
      question: "Klima bakımı ne sıklıkla yapılmalıdır?",
      answer: "Klima bakımı yılda en az bir kere, tercihen yaz sezonu başlamadan önce yapılmalıdır.",
    },
    {
      question: "Soğutma sistemi arızalarında ne yapmalıyım?",
      answer: "Cihazınızı kapatıp, servisimizi aramalısınız. Uzman ekiplerimiz en kısa sürede destek verecektir.",
    },
    {
      question: "Servis süresi ne kadar sürer?",
      answer: "Arıza durumuna bağlı olarak çoğu servis işlemi aynı gün içinde tamamlanmaktadır.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div data-aos="fade-right" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-regal-blue">Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto">
          {faqs?.length > 0 ? (
            faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-dark-gray hover:text-theme-hover focus:outline-none cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openIndex === index ? (
                    <FaChevronUp className="text-theme-hover cursor-pointer" />
                  ) : (
                    <FaChevronDown className="text-button-hover cursor-pointer" />
                  )}
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Henüz sıkça sorulan soru eklenmedi.</p>
          )}
        </div>
      </div>
    </section>
  );
}
