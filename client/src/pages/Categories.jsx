import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/categories');
      if (response.ok) {
        const data = await response.json();
        const filteredCategories = data.filter(category => category.name !== 'All');
        setCategories(filteredCategories);
      } else {
        setError('Erreur lors du chargement des catégories');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100 backdrop-blur-sm">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
              <p className="text-blue-700 text-lg font-medium">Chargement des catégories...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-blue-700 text-lg mb-6">{error}</p>
              <button 
                onClick={fetchCategories}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white rounded-2xl shadow-2xl mx-4 mt-8 mb-8 border border-blue-100 backdrop-blur-sm">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Nos Catégories
          </h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de produits organisés par catégories. 
            Choisissez votre catégorie préférée pour voir nos délicieuses offres.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              isAdmin={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 