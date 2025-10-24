export default function ProductCard({ product, onClick }) {
  const imageUrl = product.images && product.images.length > 0
    ? product.images[0].imageUrl
    : 'https://via.placeholder.com/300x200?text=Resim+Yok';
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden cursor-pointer"
    >
      <img
        src={imageUrl}//{product.image.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
}
