import Link from "next/link";

export default function Button({ children, variant = "yellow", href = "#" }) {
  return (
    <Link className={`btn ${variant}`} href={href}>
      {children}
    </Link>
  );
}
