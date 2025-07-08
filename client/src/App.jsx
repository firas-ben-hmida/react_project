import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import Categories from "./pages/Categories";
import AdminCategories from "./pages/AdminCategories";
import CategoryProducts from "./pages/CategoryProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId/products" element={<CategoryProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/categories/:categoryId/products" element={<CategoryProducts />} />
        <Route path="/admin/categories/:categoryId/products/add" element={<AddProduct />} />
        <Route path="/admin/products/:productId/edit" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
