import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClientesList from "./components/ClientesList";
import ProductosList from "./components/ProductosList";
import TransaccionesList from "./components/TransaccionesList";
import TransaccionForm from "./components/TransaccionForm";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/productos" element={<ProductosList />} />
        <Route path="/transacciones" element={<TransaccionesList />} />
        <Route path="/crear-transaccion" element={<TransaccionForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
