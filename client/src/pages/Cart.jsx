import React, { useEffect, useState } from 'react';

export default function Cart() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const cartKey = `cart_${userId}`;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem(cartKey) || '[]'));
  }, [cartKey]);

  const handleRemove = (id) => {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem(cartKey, JSON.stringify(newCart));
    }
  };

  if (cart.length === 0) {
    return <div className="text-center text-blue-700 py-8">Votre panier est vide.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Votre panier</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b py-4">
              <span>{item.name} - {item.price} €</span>
              <button
                onClick={() => handleRemove(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 