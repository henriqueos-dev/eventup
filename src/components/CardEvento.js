import React from "react";
import styles from "../cssModules/PaginaInicial.module.css";

export default function CardEvento({ evento }) {
  const nomeEvento = evento.name;

  const dataEvento = new Date(evento.dates.start.localDate).toLocaleDateString(
    "pt-BR",
    { timeZone: "UTC" }
  );

  let imagemUrl = "https://via.placeholder.com/300x200?text=Sem+Imagem";
  if (evento.images && evento.images.length > 0) {
    const imagemEncontrada = evento.images.find((img) => img.ratio === "3_2");
    imagemUrl = imagemEncontrada ? imagemEncontrada.url : evento.images[0].url;
  }

  let local = "Local não informado";
  if (
    evento._embedded &&
    evento._embedded.venues &&
    evento._embedded.venues[0]
  ) {
    local = evento._embedded.venues[0].name;
  }

  return (
    <div className={styles.cardEvento}>
      <img src={imagemUrl} alt={nomeEvento} className={styles.cardImagem} />
      <div className={styles.cardCorpo}>
        <h3 className={styles.cardTitulo}>{nomeEvento}</h3>
        <p className={styles.cardData}>{dataEvento}</p>
        <p className={styles.cardLocal}>{local}</p>
      </div>
    </div>
  );
}