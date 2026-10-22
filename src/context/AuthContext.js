import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("eventup_usuario");
    if (usuarioSalvo) {
      try {
        const dadosUsuario = JSON.parse(usuarioSalvo);
        if (!dadosUsuario.favoritos) {
          dadosUsuario.favoritos = [];
        }
        setUsuario(dadosUsuario);
      } catch (error) {
        localStorage.removeItem("eventup_usuario");
      }
    }
  }, []);

  function login(nome) {
    const dadosUsuario = {
      nome: nome,
      favoritos: [],
    };
    setUsuario(dadosUsuario);
    localStorage.setItem("eventup_usuario", JSON.stringify(dadosUsuario));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("eventup_usuario");
  }

  function alternarFavorito(evento) {
    if (!usuario) return;
    const listaAtual = usuario.favoritos || [];
    let novaListaFavoritos = [];

    const jaEhFavorito = listaAtual.some((fav) => fav.id === evento.id);

    if (jaEhFavorito) {
      novaListaFavoritos = listaAtual.filter((fav) => fav.id !== evento.id);
    } else {
      novaListaFavoritos = [...listaAtual, evento];
    }

    const usuarioAtualizado = {
      ...usuario,
      favoritos: novaListaFavoritos,
    };

    setUsuario(usuarioAtualizado);
    localStorage.setItem("eventup_usuario", JSON.stringify(usuarioAtualizado));
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, alternarFavorito }}>
      {children}
    </AuthContext.Provider>
  );
}