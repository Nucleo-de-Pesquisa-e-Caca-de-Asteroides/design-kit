"use client";

import { useNPCAFirebase } from "../firebase.js";
import { SignOutIcon } from "@phosphor-icons/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Navbar() {
  const {
    auth
  } = useNPCAFirebase();
  const pathname = usePathname();
  return /*#__PURE__*/_jsxs("nav", {
    className: "site-nav",
    "aria-label": "Navega\xE7\xE3o principal",
    children: [/*#__PURE__*/_jsx("div", {
      className: "site-nav-brand",
      children: /*#__PURE__*/_jsx(Link, {
        href: "/",
        className: "site-nav-logo",
        children: "SIG-NPCA"
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: "site-nav-links",
      children: [/*#__PURE__*/_jsx(Link, {
        href: "/ponto",
        className: pathname === "/ponto" ? "active" : "",
        "aria-current": pathname === "/ponto" ? "page" : undefined,
        children: "Ponto e atividades"
      }), /*#__PURE__*/_jsx(Link, {
        href: "/",
        className: pathname === "/" ? "active" : "",
        "aria-current": pathname === "/" ? "page" : undefined,
        children: "Gest\xE3o"
      }), /*#__PURE__*/_jsx(Link, {
        href: "/documentos",
        className: pathname === "/documentos" ? "active" : "",
        "aria-current": pathname === "/documentos" ? "page" : undefined,
        children: "Documentos"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "site-nav-actions",
      children: [/*#__PURE__*/_jsx("span", {
        children: "Sistema Integrado de Gest\xE3o"
      }), /*#__PURE__*/_jsx("div", {
        className: "divider"
      }), /*#__PURE__*/_jsxs("button", {
        className: "withicon",
        "aria-label": "Sair",
        onClick: () => signOut(auth),
        children: [/*#__PURE__*/_jsx(SignOutIcon, {
          size: 18
        }), /*#__PURE__*/_jsx("span", {
          children: "Sair"
        })]
      })]
    })]
  });
}
