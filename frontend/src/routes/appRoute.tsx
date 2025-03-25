// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Painel } from "../pages/Painel"; // você vai criar isso depois
import { Admin } from "../pages/Admin";

export function AppRouter() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={token ? <Painel /> : <Navigate to="/login" />} />
        <Route path="/admin" element={token ? <Admin /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
