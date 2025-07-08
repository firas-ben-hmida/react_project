import React from 'react';

export default function ProductCardsList({
  products,
  isAdmin = false,
  onAddToCart,
  onEdit,
  onDelete,
  onAddProduct 
}) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-blue-700 py-8">
        Aucun produit trouvé.
        {isAdmin && (
          <div className="mt-4">
            <button
              onClick={onAddProduct}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
            >
              Ajouter un produit
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-end mb-8">
          <button
            onClick={onAddProduct}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
          >
            Ajouter un produit
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border border-blue-100 backdrop-blur-sm overflow-hidden flex flex-col"
          >
            <div className="h-40 flex items-center justify-center bg-blue-600 relative overflow-hidden">
              <span className="text-5xl text-white font-bold">{product.name[0]}</span>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-blue-800">{product.price} €</span>
                {isAdmin ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  product.quantity > 0 ? (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                    >
                      Ajouter au panier
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-6 py-2 bg-gray-300 text-gray-500 rounded-xl font-bold cursor-not-allowed"
                    >
                      Rupture de stock
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 