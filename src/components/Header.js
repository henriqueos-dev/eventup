import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../cssModules/Header.module.css";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate("/login");
  };

  const irParaPerfil = () => {
    navigate("/perfil");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoEmpresa}>
          EventUp
        </Link>

        <nav className={styles.nav}>
          {usuario ? (
            <div className={styles.areaUsuario}>
              <span className={styles.saudacao}>Olá, {usuario.nome}</span>

              <button
                className={styles.botaoLogin}
                onClick={irParaPerfil}
                style={{
                  marginRight: "10px",
                  backgroundColor: "mediumseagreen",
                }}
              >
                Favoritos
              </button>

              <button className={styles.botaoSair} onClick={logout}>
                Sair
              </button>
            </div>
          ) : (
            <button className={styles.botaoLogin} onClick={irParaLogin}>
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
