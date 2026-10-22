import React from "react";
import styles from "../cssModules/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 <strong>EventUp</strong>. Desenvolvido por Henrique Silva.
      </p>
    </footer>
  );
}

export default Footer;