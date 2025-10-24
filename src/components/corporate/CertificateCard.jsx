import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CertificateCard({ cert, onClick }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
    
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="p-[2px] bg-gradient-to-r from-gray-300 to-white rounded-2xl cursor-pointer hover:scale-105 transition-transform">
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="px-2 py-1 text-center font-semibold">
        <h3 className="text-lg font-semibold text-regal-blue">{cert.title}</h3>
      </div>
    </motion.div>
  );
}
