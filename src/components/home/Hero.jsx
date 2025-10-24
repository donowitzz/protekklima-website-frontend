// src/components/home/Hero.js
import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-center text-white">
      <img
        src='images/navbar-foto111.jpg' // Kendi profesyonel görselinizle değiştirin
        alt='ProtekKlima Klima ve Soğutma Servisi'
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

      <div data-aos="zoom-in" className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-xl xl:text-5xl font-bold mb-4 leading-tight text-slate-900 text-shadow-md">
          PROTEK Klima ve Soğutma Servisi <br className="hidden md:block"/> Hızlı, Güvenilir, Garantili Çözümler
        </h1>
        <p className="text-md xl:text-2xl mb-8 text-white">
          Aynı Gün Servis, Orijinal Yedek Parça ve Uzman Teknisyen Kadrosuyla Kesintisiz Konforunuz İçin Buradayız.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+905350116597" // Kendi telefon numaranızla değiştirin
            className="bg-slate-900 hover:bg-button-hover text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out text-lg shadow-lg"
          >
            Hemen Servis Çağır
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base font-medium">
          
          <span className="flex items-center gap-2 text-white"><span className="text-yellow-400">★</span> Orijinal Yedek Parça</span>
          <span className="flex items-center gap-2 text-white"><span className="text-yellow-400">★</span> Garantili İşçilik</span>
        </div>
      </div>
    </section>
  );
}