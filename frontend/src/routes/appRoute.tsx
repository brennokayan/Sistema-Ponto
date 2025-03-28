// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Painel } from "../pages/ColaboradorPage"; // você vai criar isso depois
import { AdminAdicionarEscalas } from "../pages/Admin/escala";
import { AdminAdicionarColaboradores } from "../pages/Admin/colaboradores";

export function AppRouter() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/painel"
          element={token ? <Painel /> : <Navigate to="/login" />}
        />
        <Route
          path="/escala"
          element={token ? <AdminAdicionarEscalas /> : <Navigate to="/login" />}
        />
        <Route
          path="/colaboradores"
          element={token ? <AdminAdicionarColaboradores /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
