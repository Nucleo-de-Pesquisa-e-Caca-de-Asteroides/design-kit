"use client"
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <p>
        SARA-NPCA &copy; 2026. Todos os direitos reservados.{" "}
        <Link
          href="https://npca.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>Website do NPCA</b>
        </Link>
      </p>
      <br/>
      <p>
        <b>Como citar:</b>
      </p>
      <p>
        <i>Barcelos-Pusch, D. 2026. Sistema de Administração e Registro de Asteroides.</i>
      </p>
    </footer>
  );
};

export default Footer;
