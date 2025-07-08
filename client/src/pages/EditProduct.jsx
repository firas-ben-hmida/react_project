import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    navigate(-1);
  };

  if (!product) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Modifier le produit</h2>
        <input className="w-full mb-4 p-2 border rounded" placeholder="Nom" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} required />
        <input className="w-full mb-4 p-2 border rounded" placeholder="Prix" type="number" value={product.price} onChange={e => setProduct({ ...product, price: Number(e.target.value) })} required />
        <input className="w-full mb-4 p-2 border rounded" placeholder="Quantité" type="number" value={product.quantity} onChange={e => setProduct({ ...product, quantity: Number(e.target.value) })} required />
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Enregistrer</button>
      </form>
    </div>
  );
} 