import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminProductList from "./pages/admin/AdminProductList";
import AdminCategoryList from "./pages/admin/AdminCategoryList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin-products" element={<AdminProductList />} />
        <Route path="/admin-categories" element={<AdminCategoryList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
