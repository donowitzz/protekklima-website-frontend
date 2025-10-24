import React from "react";

export default function PageHeader({ title, subtitle, image }) {
  return (
    <div  className="relative h-[400px] md:h-[500px] lg:h-[600px]">
      {image && (
        <img
        src={image}
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover"
        />
      )}
     <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

      <div data-aos="zoom-in" className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-2 text-lg md:text-xl text-white">{subtitle}</p>} </div>
    </div>
  );
}
