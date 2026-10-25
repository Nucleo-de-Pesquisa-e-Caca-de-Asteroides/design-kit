"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contato";
  const isJoinPage = pathname === "/faca-parte";
  return /*#__PURE__*/_jsxs("footer", {
    id: "contato",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "foot-brand",
      children: [/*#__PURE__*/_jsx("b", {
        children: "NPCA"
      }), /*#__PURE__*/_jsxs("p", {
        children: ["N\xFAcleo de Pesquisa e Ca\xE7a de Asteroides", /*#__PURE__*/_jsx("br", {}), "\xA9 2026"]
      })]
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("b", {
        children: "INSTITUCIONAL"
      }), /*#__PURE__*/_jsxs(Link, {
        href: isContactPage ? "#contato" : "/contato",
        children: [/*#__PURE__*/_jsx(EnvelopeIcon, {
          size: 15
        }), "Contato"]
      }), /*#__PURE__*/_jsx(Link, {
        href: isJoinPage ? "#vagas" : "/faca-parte",
        children: "Fa\xE7a parte"
      }), /*#__PURE__*/_jsx(Link, {
        href: isJoinPage ? "#editais" : "/faca-parte#editais",
        children: "Editais"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("b", {
        children: "NPCA NA M\xCDDIA"
      }), /*#__PURE__*/_jsx(Link, {
        href: "/noticias",
        children: "Portal de Not\xEDcias"
      }), /*#__PURE__*/_jsx(Link, {
        href: "/publicacoes",
        children: "Publica\xE7\xF5es"
      }), /*#__PURE__*/_jsx(Link, {
        href: "https://www.instagram.com/npca.brasil/",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Instagram"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "sara",
      children: [/*#__PURE__*/_jsx("span", {
        children: "PLATAFORMA"
      }), /*#__PURE__*/_jsx("strong", {
        children: "SARA-NPCA"
      }), /*#__PURE__*/_jsx(Link, {
        href: "https://sara-npca.vercel.app",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Acessar SARA \u2197"
      })]
    })]
  });
}
export default Footer;
