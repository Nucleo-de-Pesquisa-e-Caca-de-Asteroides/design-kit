"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [["Início", "/"], ["Contato", "/contato"], ["Faça parte", "/faca-parte"], ["Quem somos", "/quem-somos"], ["Notícias", "/noticias"], ["Publicações", "/publicacoes"]];
  return /*#__PURE__*/_jsxs("header", {
    className: "header",
    children: [/*#__PURE__*/_jsxs(Link, {
      className: "brand",
      href: "/",
      children: [/*#__PURE__*/_jsx("img", {
        className: "mark",
        src: "/logo.png",
        alt: ""
      }), /*#__PURE__*/_jsx("b", {
        children: "NPCA"
      })]
    }), /*#__PURE__*/_jsx("button", {
      className: "mobile",
      "aria-label": isMenuOpen ? "Fechar menu" : "Abrir menu",
      "aria-expanded": isMenuOpen,
      "aria-controls": "npca-navigation",
      onClick: () => setIsMenuOpen(!isMenuOpen),
      children: isMenuOpen ? /*#__PURE__*/_jsx(XIcon, {}) : /*#__PURE__*/_jsx(ListIcon, {})
    }), /*#__PURE__*/_jsx("nav", {
      id: "npca-navigation",
      "aria-label": "Navega\xE7\xE3o principal",
      className: isMenuOpen ? "open" : "",
      children: links.map(([label, href]) => /*#__PURE__*/_jsx(Link, {
        href: href,
        "aria-current": (href === "/" ? pathname === href : pathname.startsWith(href)) ? "page" : undefined,
        onClick: () => setIsMenuOpen(false),
        children: label
      }, label))
    })]
  });
}
export default Header;
