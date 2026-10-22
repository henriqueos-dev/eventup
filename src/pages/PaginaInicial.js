import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../cssModules/PaginaInicial.module.css";
import CardEvento from "../components/CardEvento";

function PaginaInicial() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;

  useEffect(() => {
    async function buscarEventos() {
      try {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=BR&apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados");
        }

        const data = await response.json();

        if (data._embedded && data._embedded.events) {
          setEventos(data._embedded.events);
        } else {
          setEventos([]);
        }
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarEventos();
  }, [apiKey]);

  if (carregando) {
    return (
      <div className={styles.paginaInicial}>
        <p>Carregando eventos</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className={styles.paginaInicial}>
        <p>Erro: {erro}</p>
      </div>
    );
  }

  return (
    <div className={styles.paginaInicial}>
      <h1 className={styles.titulo}>Eventos Próximos</h1>
      <div className={styles.conteudoGrid}>
        {eventos.map((evento) => (
          <Link
            to={`/evento/${evento.id}`}
            key={evento.id}
            className={styles.linkCard}
          >
            <CardEvento evento={evento} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PaginaInicial;