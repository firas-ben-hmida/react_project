  import React, { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";

  export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Erreur lors du parsing des données utilisateur:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    useEffect(() => {
      checkUser();
    }, []);

    useEffect(() => {
      const interval = setInterval(checkUser, 500);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const handleStorageChange = () => {
        checkUser();
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");
    };

    return (
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-white font-bold text-xl hover:text-blue-100 transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="text-white font-medium text-lg hover:text-blue-100 transition-colors">
            À propos
          </Link>
        </div>
        <div>
          {!user ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Connexion
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium text-lg">
                Bonjour, {user.name?.split(" ")[0] || "Utilisateur"}
              </span>
              {user && !user.isAdmin && (
                <Link
                  to="/cart"
                  className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Panier
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }