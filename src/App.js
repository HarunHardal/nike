import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Detail from "./components/detail/Detail";
import Home from "./components/home/Home";
import Product from "./components/productadd/Product";
import AllProducts from "./components/allProducts/AllProducts";
import ProductsAll from "./components/Products/ProductsAll";
import Auth from "./components/auth/Auth";
import Cart from "./components/cartComponent/Cart";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import Favorites from "./components/favorites/Favorites";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId")){
    dispatch(authActions.login())
    }
    }, [dispatch])
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {/* Main Page */ }
          <Route path="/" element={<Home/>}/>
          <Route path="/detail/:id/:name" element={<Detail/>}/>
          <Route path="/products/:gender" sensitive={false}  element={<ProductsAll/>}/>
          <Route path="/singup" element={<Auth isLoggedIn={isLoggedIn}/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/favorites" element={<Favorites/>}/>

          <Route path="/product/allproducts" element={<AllProducts/>}/>
          <Route path="/product/add" element={<Product/>}/>
        </Routes>
      </main>
      <footer>
        <Footer/>
      </footer>
    </React.Fragment>
  );
}

export default App;
