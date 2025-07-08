import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity),
        category: categoryId,
        id: Date.now().toString()
      })
    });
    navigate(`/admin/categories/${categoryId}/products`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Ajouter un produit</h2>
        <input className="w-full mb-4 p-2 border rounded" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
        <input className="w-full mb-4 p-2 border rounded" placeholder="Prix" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <input className="w-full mb-4 p-2 border rounded" placeholder="Quantité" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Ajouter</button>
      </form>
    </div>
  );
} 