import Link from "next/link";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Button({
  children,
  variant = "yellow",
  href = "#"
}) {
  return /*#__PURE__*/_jsx(Link, {
    className: `btn ${variant}`,
    href: href,
    children: children
  });
}
