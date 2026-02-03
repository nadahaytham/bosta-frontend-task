import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Products from "./Pages/Products";
import Navbar from "./Components/Navbar";
import ProductDetails from "./Pages/ProductDetails";
import CreateProduct from "./Pages/CreateProduct";
import Sidebar from "./Components/Sidebar";
import Cart from "./Pages/Cart";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  // Sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>

      {/* Top Navigation Bar */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Slide Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />}/>

      {/* Protected Pages */}
        <Route path="/create"  element={<ProtectedRoute><CreateProduct /></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;
