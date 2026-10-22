import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./cssModules/App.module.css";
import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaDetalhes from "./pages/PaginaDetalhes";
import PaginaLogin from "./pages/PaginaLogin";
import PaginaPerfil from "./pages/PaginaPerfil";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className={styles.App}>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<PaginaInicial />} />
              <Route path="/evento/:id" element={<PaginaDetalhes />} />
              <Route path="/login" element={<PaginaLogin />} />
              <Route path="/perfil" element={<PaginaPerfil />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
