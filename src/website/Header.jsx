"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    ["Início", "/"],
    ["Contato", "/contato"],
    ["Faça parte", "/faca-parte"],
    ["Quem somos", "/quem-somos"],
    ["Notícias", "/noticias"],
    ["Publicações", "/publicacoes"],
  ];

  return (
    <header className="header">
      <Link className="brand" href="/">
        <img className="mark" src="/logo.png" alt="" />
        <b>NPCA</b>
      </Link>
      <button
        className="mobile"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        aria-controls="npca-navigation"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <XIcon /> : <ListIcon />}
      </button>
      <nav id="npca-navigation" aria-label="Navegação principal" className={isMenuOpen ? "open" : ""}>
        {links.map(([label, href]) => (
          <Link key={label} href={href} aria-current={(href === "/" ? pathname === href : pathname.startsWith(href)) ? "page" : undefined} onClick={() => setIsMenuOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
