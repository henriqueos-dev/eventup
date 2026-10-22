import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "../cssModules/PaginaDetalhes.module.css";
import { AuthContext } from "../context/AuthContext";

function PaginaDetalhes() {
  const { id } = useParams();
  const { usuario, alternarFavorito } = useContext(AuthContext);

  const [evento, setEvento] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;

  useEffect(() => {
    async function buscarDetalhesDoEvento() {
      try {
        setCarregando(true);
        const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados");
        }

        const data = await response.json();
        setEvento(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarDetalhesDoEvento();
  }, [id, apiKey]);

  if (carregando) return <p>Carregando detalhes...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!evento) return <p>Evento não foi encontrado</p>;

  let imagemUrl = "https://via.placeholder.com/300x200?text=Sem+Imagem";
  if (evento.images && evento.images.length > 0) {
    const imagemEncontrada = evento.images.find((img) => img.ratio === "16_9");
    imagemUrl = imagemEncontrada ? imagemEncontrada.url : evento.images[0].url;
  }

  let nomeLocal = "Local não informado";
  let nomeCidade = "";

  if (
    evento._embedded &&
    evento._embedded.venues &&
    evento._embedded.venues[0]
  ) {
    nomeLocal = evento._embedded.venues[0].name;

    if (evento._embedded.venues[0].city) {
      nomeCidade = evento._embedded.venues[0].city.name;
    }
  }

  const termoBusca = encodeURIComponent(`${nomeLocal}, ${nomeCidade}`);
  const urlMapa = `https://www.google.com/maps/search/?api=1&query=${termoBusca}`;

  let ehFavorito = false;
  if (usuario && usuario.favoritos) {
    ehFavorito = usuario.favoritos.some((fav) => fav.id === evento.id);
  }

  const manipularClickFavorito = () => {
    if (usuario) {
      alternarFavorito(evento);
    } else {
      alert("Faça login para adicionar aos favoritos!");
    }
  };

  return (
    <div className={styles.detalhesContainer}>
      <div className={styles.cabecalhoDetalhes}>
        <h1 className={styles.titulo}>{evento.name}</h1>
        <button
          className={styles.botaoFavorito}
          onClick={manipularClickFavorito}
          title={
            ehFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          <span style={{ color: ehFavorito ? "red" : "lightgray" }}>♥</span>
        </button>
      </div>

      <img
        src={imagemUrl}
        alt={evento.name}
        className={styles.imagemDestaque}
      />

      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <strong>Local</strong>
          <p>{nomeLocal}</p>
        </div>

        <div className={styles.infoBox}>
          <strong>Cidade</strong>
          <p>{nomeCidade || "Brasil"}</p>
        </div>
      </div>

      <div className={styles.areaBotoes}>
        <a
          href={urlMapa}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.botaoMapa}
        >
          📍 Ver no google maps
        </a>

        <a
          href={evento.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.botaoTicket}
        >
          Comprar ingressos
        </a>
      </div>
    </div>
  );
}

export default PaginaDetalhes;