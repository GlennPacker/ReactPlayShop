import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from './Products';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import PageNotFound from './PageNotFound';
import { useState } from 'react';

export default function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (id, sku) => {
        setCart((items) => {
            const itemInCart = items.find(r => r.sku === sku);
            if (itemInCart) {
                return items.map(i => {
                    return i.sku === sku ?
                        {...itemInCart, quantity: i.quantity + 1 } :
                        i
                    })

            } else {
                return [...items, { id, sku, quantity: 1 }]
            }
        })
    }

    const updateQuantity = (sku, quantity) => {
        setCart(items => {
            return quantity ?
                items.map(i => i.sku === sku ? { ...i, quantity } : i) :
                items.filter(r => r.sku !== sku)
        })
    }

    return (
        <>
            <div className="content">
                <Header />
                <main>
                    <Routes>
                    <Route path="/" element={ <h1>Welcome</h1>} />
                    <Route path="/:category" element={<Products />} />
                    <Route path="/:category/:id" element={<ProductDetail addToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}/>} />
                    <Route element={ <PageNotFound /> } />
                    </Routes>
                </main>
            </div>
            <Footer />
        </>
    );
}
