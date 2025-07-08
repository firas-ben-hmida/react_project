import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '' });

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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategory.name,
          id: Date.now().toString()
        }),
      });

      if (response.ok) {
        setNewCategory({ name: '' });
        setShowAddForm(false);
        fetchCategories();
      } else {
        setError('Erreur lors de l\'ajout de la catégorie');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const categoryToDelete = categories.find(cat => cat.id === categoryId);
    const categoryName = categoryToDelete ? categoryToDelete.name : 'cette catégorie';
    
    const confirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryName}" ?`);
    
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`La catégorie "${categoryName}" a été supprimée avec succès !`);
        fetchCategories();
      } else {
        setError('Erreur lors de la suppression de la catégorie');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
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
        <div className="p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h1 className="text-3xl font-bold text-blue-900 mb-4">
                Gestion des Catégories
              </h1>
              <p className="text-lg text-blue-700 max-w-2xl">
                Gérez les catégories de produits de votre restaurant avec facilité
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {showAddForm ? 'Annuler' : 'Ajouter une catégorie'}
            </button>
          </div>
        </div>
      </div>
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-2xl mx-4 mb-8 border border-blue-100 backdrop-blur-sm">
          <div className="p-8">
            <form onSubmit={handleAddCategory} className="max-w-md mx-auto">
              <div className="mb-6">
                <label className="block text-lg font-semibold text-blue-700 mb-3">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Ex: Pizzas"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Ajouter la catégorie
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryCard 
                category={category} 
                isAdmin={true}
                onDelete={handleDeleteCategory}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 