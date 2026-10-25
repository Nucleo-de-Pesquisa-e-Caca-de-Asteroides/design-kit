"use client";

import { useNPCAFirebase } from "../firebase.js";
import { SignOutIcon } from "@phosphor-icons/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { auth } = useNPCAFirebase();
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Navegação principal">
      <div className="site-nav-brand">
        <Link href="/" className="site-nav-logo">SIG-NPCA</Link>
      </div>
      <div className="site-nav-links">
        <Link href="/ponto" className={pathname === "/ponto" ? "active" : ""} aria-current={pathname === "/ponto" ? "page" : undefined}>
          Ponto e atividades
        </Link>
        <Link href="/" className={pathname === "/" ? "active" : ""} aria-current={pathname === "/" ? "page" : undefined}>
          Gestão
        </Link>
        <Link href="/documentos" className={pathname === "/documentos" ? "active" : ""} aria-current={pathname === "/documentos" ? "page" : undefined}>
          Documentos
        </Link>
      </div>
      <div className="site-nav-actions">
        <span>Sistema Integrado de Gestão</span>
        <div className="divider" />
        <button className="withicon" aria-label="Sair" onClick={() => signOut(auth)}><SignOutIcon size={18}/><span>Sair</span></button>
      </div>
    </nav>
  );
}
