import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ProductCardsList from '../components/ProductCardsList';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin/');

  useEffect(() => {
    fetch(`http://localhost:3000/products?category=${categoryId}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [categoryId]);

  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    if (!userId) {
      alert('Vous devez être connecté pour ajouter au panier.');
      return;
    }
    if (product.quantity > 0) {
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: product.quantity - 1 })
      });
  
      if (response.ok) {
        const cartKey = `cart_${userId}`;
        let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem(cartKey, JSON.stringify(cart));
        setProducts(products.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        ));
        alert('Produit ajouté au panier !');
      } else {
        alert('Erreur lors de la mise à jour du stock.');
      }
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/products/${product.id}/edit`);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Supprimer ce produit ?')) {
      fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' })
        .then(() => setProducts(products.filter(p => p.id !== productId)));
    }
  };

  const handleAddProduct = () => {
    navigate(`/admin/categories/${categoryId}/products/add`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl mx-4 mt-8 mb-8 border border-blue-100 backdrop-blur-sm">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Produits de la catégorie
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductCardsList
          products={products}
          isAdmin={isAdmin}
          onAddToCart={handleAddToCart}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddProduct={handleAddProduct}
        />
      </div>
    </div>
  );
} 