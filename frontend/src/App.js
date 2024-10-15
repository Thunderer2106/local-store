import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AddProduct from "./pages/add_product/AddProduct";
import GetProducts from "./pages/get_product/GetProduct";
import Chat from "./pages/chat/chat";
import Home from "./pages/home/home";
import Individual from "./pages/individual/individual";
import Cart from "./pages/cart/cart";
import Products from "./pages/products/products";
import ProductForm from "./pages/add_product/addNew";
import Orders from "./pages/orders/Orders";
import SuccessPage from "./pages/success/Success";
import FailurePage from "./pages/cancel/Cancel";

function App() {
  return (
    <div className="">
      {/* <Header /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addnew" element={<ProductForm />} />
        <Route path="/getpro" element={<GetProducts />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/home" element={<Home />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failed" element={<FailurePage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
