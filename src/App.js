import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-setup/store";

// Api
import { getCategories } from "./services/Api";

// Import Layout
import Footer from "./shared/components/layout/Footer";
import NavBar from "./shared/components/layout/Navbar";
import TopBar from "./shared/components/layout/TopBar";
import Vendor from "./shared/components/layout/Vendor";

// Import Page
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Categories";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search/Search";
import Success from "./pages/Success";
// import Success from "./pages/Success";

const App = () => {
  //Danh mục sản phẩm
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories({}).then(({data}) => {
      return setCategories(data.data.docs);
    })
  }, []);

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <TopBar/>
      <NavBar item={categories}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/Category/:id" element={<Category/>}/>
          <Route path="/Detail/:id" element={<ProductDetail/>}/>
          <Route path="/Search" element={<Search/>}/>
          {/* <Route path="/Success" element={<Success/>}/> */}
          <Route path="*" element={<NotFound/>}/>
          <Route path="/Success" element={<Success/>}/>
        </Routes>
      </BrowserRouter>
      <Vendor/>
      <Footer/>
    </Provider>
    </>
  )
}

export default App;