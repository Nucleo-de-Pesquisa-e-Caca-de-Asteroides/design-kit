"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contato";
  const isJoinPage = pathname === "/faca-parte";

  return (
    <footer id="contato">
      <div className="foot-brand">
        <b>NPCA</b>
        <p>
          Núcleo de Pesquisa e Caça de Asteroides
          <br />© 2026
        </p>
      </div>
      <div>
        <b>INSTITUCIONAL</b>
        <Link href={isContactPage ? "#contato" : "/contato"}>
          <EnvelopeIcon size={15} />
          Contato
        </Link>
        <Link href={isJoinPage ? "#vagas" : "/faca-parte"}>Faça parte</Link>
        <Link href={isJoinPage ? "#editais" : "/faca-parte#editais"}>
          Editais
        </Link>
      </div>
      <div>
        <b>NPCA NA MÍDIA</b>
        <Link href="/noticias">Portal de Notícias</Link>
        <Link href="/publicacoes">Publicações</Link>
        <Link
          href="https://www.instagram.com/npca.brasil/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </Link>
      </div>
      <div className="sara">
        <span>PLATAFORMA</span>
        <strong>SARA-NPCA</strong>
        <Link
          href="https://sara-npca.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acessar SARA ↗
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
