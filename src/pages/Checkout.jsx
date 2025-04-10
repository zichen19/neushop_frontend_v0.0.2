import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Checkout() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // Implement your checkout logic here (e.g., send order to backend, payment processing)
    alert('Checkout process initiated! (Payment not implemented)'); // Replace with actual logic
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty. Nothing to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.product_id} className="flex items-center justify-between py-2 border-b">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-2 font-bold">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Form (Replace with actual form and payment integration) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <p>Implement shipping address form here.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
        <p>Implement payment method selection and processing here (e.g., Stripe, PayPal).</p>
      </div>

      <button
        onClick={handleCheckout}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;