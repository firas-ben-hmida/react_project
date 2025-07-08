import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category, isAdmin = false, onDelete = null }) {
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Burgers': '🍔',
      'Waters': '💧',
      'Fries': '🍟',
      'Chicken': '🍗',
      'Meat': '🥩',
      'Rice': '🍚',
      'Drinks': '🥤',
      'Ice Cream': '🍦',
      'Salads': '🥗',
      'Sides & Desserts': '🍰',
    };
    return icons[categoryName] || '🍽️';
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(category.id);}
  };

  return (
    <div className="group">
      <Link 
        to={isAdmin ? `/admin/categories/${category.id}/products` : `/categories/${category.id}/products`}
        className="block"
      >
        <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-blue-100 backdrop-blur-sm overflow-hidden">
          <div className="h-40 bg-blue-600 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 bg-opacity-10"></div>
            <span className="text-6xl relative z-10 drop-shadow-lg">{getCategoryIcon(category.name)}</span>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors duration-200">
              {category.name}
            </h3>
            <p className="text-blue-700 text-base leading-relaxed">
              Dégustez nos délicieux {category.name.toLowerCase()}
            </p>
          </div>
        </div>
      </Link>
      
      {isAdmin && (
        <div className="mt-4 flex space-x-3 justify-center">
          <button 
            onClick={handleDelete}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
} 