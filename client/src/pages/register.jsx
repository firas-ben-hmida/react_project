import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/controleDeSaisie";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRegisterError("");

    let hasError = false;
    
    if (!name.trim()) {
      setNameError("Le nom est requis.");
      hasError = true;
    }
    
    if (!isValidEmail(email)) {
      setEmailError("Veuillez entrer un email valide.");
      hasError = true;
    }
    
    if (!isValidPassword(password)) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      hasError = true;
    }
    
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      hasError = true;
    }
    
    if (hasError) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "user" }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          if (data.user.role === "user") {
            navigate("/categories");
          } else {
            navigate("/admin/categories");
          }
        }, 100);
      } else {
        setRegisterError(data.message || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      setRegisterError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Inscription</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-blue-700 font-medium mb-1">Nom complet</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                nameError ? "border-red-400 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder="Votre nom complet"
            />
            {nameError && <div className="text-red-500 text-sm mt-1">{nameError}</div>}
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                emailError ? "border-red-400 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="exemple@email.com"
            />
            {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-400 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="Votre mot de passe"
            />
            {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
          </div>
          <div>
            <label className="block text-blue-700 font-medium mb-1">Confirmer le mot de passe</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                confirmPasswordError ? "border-red-400 focus:ring-red-200" : "border-blue-200 focus:ring-blue-200"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              placeholder="Confirmez votre mot de passe"
            />
            {confirmPasswordError && <div className="text-red-500 text-sm mt-1">{confirmPasswordError}</div>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 text-white font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </button>
          {registerError && <div className="text-red-500 text-center mt-2">{registerError}</div>}
        </form>
        <div className="mt-6 text-center">
          <span className="text-blue-700">Déjà un compte ? </span>
          <Link to="/login" className="text-blue-900 font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}