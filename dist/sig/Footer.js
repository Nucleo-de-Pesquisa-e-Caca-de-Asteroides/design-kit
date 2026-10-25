import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Footer({
  websiteUrl = 'https://npca.vercel.app/'
}) {
  return /*#__PURE__*/_jsxs("footer", {
    children: [/*#__PURE__*/_jsx("p", {
      children: "SIG-NPCA \xB7 N\xFAcleo de Pesquisa e Ca\xE7a de Asteroides"
    }), /*#__PURE__*/_jsx("a", {
      href: websiteUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      children: "Website do NPCA \u2197"
    })]
  });
}
