import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock_quantity: 0 });
  const [editingProduct, setEditingProduct] = useState(null);
  const { user } = useContext(AuthContext); // Get the user from context

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await axios.get('https://db-group5-452710.wl.r.appspot.com/seller/products'); // Replace with your seller products API endpoint
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Could not fetch seller products.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-group5-452710.wl.r.appspot.com/seller/products', newProduct); // Replace with your create product API endpoint
      fetchSellerProducts();
      setNewProduct({ name: '', description: '', price: 0, stock_quantity: 0 });
    } catch (err) {
      setError(err.message || 'Could not create product.');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/seller`, editingProduct); // Replace with your update product API endpoint
      fetchSellerProducts();
      setEditingProduct(null);
    } catch (err) {
      setError(err.message || 'Could not update product.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://db-group5-452710.wl.r.appspot.com/seller/products/${productId}`); // Replace with your delete product API endpoint
      fetchSellerProducts();
    } catch (err) {
      setError(err.message || 'Could not delete product.');
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <p>Welcome to the seller dashboard.</p>

      {/* Product Management */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Products</h2>

        {/* Create Product Form */}
        <form onSubmit={handleCreateProduct} className="mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock_quantity}
              onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: parseInt(e.target.value) })}
              className="border rounded py-2 px-3 mr-2"
              required
            />
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create Product
            </button>
          </div>
        </form>

        {/* Product List */}
        {products.map((product) => (
          <div key={product.product_id} className="py-2 border-b flex items-center justify-between">
            <div>
              {editingProduct?.product_id === product.product_id ? (
                <form onSubmit={handleUpdateProduct} className="flex items-center">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <input
                    type="number"
                    value={editingProduct.stock_quantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: parseInt(e.target.value) })}
                    className="border rounded py-2 px-3 mr-2"
                    required
                  />
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Update
                  </button>
                  <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {product.name} - Price: ${product.price} - Stock: {product.stock_quantity}
                </>
              )}
            </div>
            <div>
              {editingProduct?.product_id !== product.product_id && (
                <>
                  <button onClick={() => setEditingProduct(product)} className="text-blue-500 hover:text-blue-700 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product.product_id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerDashboard;