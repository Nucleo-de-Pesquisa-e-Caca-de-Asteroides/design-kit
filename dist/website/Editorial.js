import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long"
  }).format(date);
}
export function FeedStatus({
  loading,
  error,
  isEmpty
}) {
  if (loading) {
    return /*#__PURE__*/_jsx("p", {
      className: "feed-status",
      role: "status",
      children: "Carregando conte\xFAdo..."
    });
  }
  if (error) {
    return /*#__PURE__*/_jsx("p", {
      className: "feed-status",
      role: "alert",
      children: "N\xE3o foi poss\xEDvel carregar o conte\xFAdo. Tente novamente mais tarde."
    });
  }
  if (isEmpty) return /*#__PURE__*/_jsx("p", {
    className: "feed-status",
    children: "Nenhum conte\xFAdo publicado ainda."
  });
  return null;
}
export function EditorialHero({
  section,
  title,
  description
}) {
  return /*#__PURE__*/_jsxs("section", {
    className: "editorial-hero",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "section-number",
      children: ["NPCA / ", section]
    }), /*#__PURE__*/_jsx("h1", {
      children: title
    }), /*#__PURE__*/_jsx("p", {
      children: description
    })]
  });
}
export function PublicationBlock({
  block
}) {
  if (block.type === "heading") return /*#__PURE__*/_jsx("h2", {
    children: block.text
  });
  if (block.type === "paragraph") return /*#__PURE__*/_jsx("p", {
    children: block.text
  });
  if (block.type === "list") {
    return /*#__PURE__*/_jsx("ul", {
      children: block.items.map(item => /*#__PURE__*/_jsx("li", {
        children: item
      }, item))
    });
  }
  return null;
}
export function PublicationNotFound() {
  return /*#__PURE__*/_jsxs("section", {
    className: "publication-not-found",
    children: [/*#__PURE__*/_jsx("div", {
      className: "section-number",
      children: "PUBLICA\xC7\xC3O / 404"
    }), /*#__PURE__*/_jsx("h1", {
      children: "Publica\xE7\xE3o n\xE3o encontrada"
    }), /*#__PURE__*/_jsxs(Link, {
      href: "/publicacoes",
      children: [/*#__PURE__*/_jsx(ArrowLeftIcon, {
        size: 17
      }), " Voltar \xE0s publica\xE7\xF5es"]
    })]
  });
}
