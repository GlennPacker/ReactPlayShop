import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import PageNotFound from './PageNotFound';

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={ <h1>Welcome</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={ <PageNotFound /> } />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
