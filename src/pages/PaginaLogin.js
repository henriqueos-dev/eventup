import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../cssModules/PaginaLogin.module.css";
import { AuthContext } from "../context/AuthContext";

function PaginaLogin() {
  const [nome, setNome] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome.trim()) {
      login(nome);
      navigate("/");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Bem vindo ao EventUp</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="nome">Digite seu nome para entrar:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite aqui"
          className={styles.inputNome}
        />
        <button type="submit" className={styles.botaoEntrar}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default PaginaLogin;
