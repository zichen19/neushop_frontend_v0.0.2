import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.product_id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{product.description}</p>
        <p className="mt-2 font-bold text-gray-900">${product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;