import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../cssModules/PaginaPerfil.module.css";
import { AuthContext } from "../context/AuthContext";
import CardEvento from "../components/CardEvento";

function PaginaPerfil() {
  const { usuario, alternarFavorito } = useContext(AuthContext);

  const [ultimoRemovido, setUltimoRemovido] = useState(null);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);

  useEffect(() => {
    let timer;
    if (mostrarNotificacao) {
      timer = setTimeout(() => {
        setMostrarNotificacao(false);
        setUltimoRemovido(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [mostrarNotificacao]);

  if (!usuario) {
    return (
      <p style={{ padding: "20px" }}>
        Você precisa estar logado para ver esta página
      </p>
    );
  }

  const handleRemover = (e, evento) => {
    e.preventDefault();
    alternarFavorito(evento);
    setUltimoRemovido(evento);
    setMostrarNotificacao(true);
  };

  const handleDesfazer = () => {
    if (ultimoRemovido) {
      alternarFavorito(ultimoRemovido);
      setMostrarNotificacao(false);
      setUltimoRemovido(null);
    }
  };

  return (
    <div className={styles.paginaPerfil}>
      <h1 className={styles.titulo}>Olá, {usuario.nome}</h1>
      <h3 className={styles.subtitulo}>Meus Favoritos</h3>
      {!usuario.favoritos || usuario.favoritos.length === 0 ? (
        <p>Você ainda não favoritou nenhum evento</p>
      ) : (
        <div className={styles.conteudoGrid}>
          {usuario.favoritos.map((evento) => (
            <div key={evento.id} className={styles.wrapperCard}>
              <button
                className={styles.botaoRemover}
                onClick={(e) => handleRemover(e, evento)}
                title="Remover favorito"
              >
                X
              </button>
              <Link to={`/evento/${evento.id}`} className={styles.linkCard}>
                <CardEvento evento={evento} />
              </Link>
            </div>
          ))}
        </div>
      )}
      {mostrarNotificacao && (
        <div className={styles.notificacaoDesfazer}>
          <span>Evento removido.</span>
          <button className={styles.botaoDesfazer} onClick={handleDesfazer}>
            Desfazer
          </button>
        </div>
      )}
    </div>
  );
}

export default PaginaPerfil;
