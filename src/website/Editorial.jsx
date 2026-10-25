import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date);
}

export function FeedStatus({ loading, error, isEmpty }) {
  if (loading) {
    return (
      <p className="feed-status" role="status">
        Carregando conteúdo...
      </p>
    );
  }
  if (error) {
    return (
      <p className="feed-status" role="alert">
        Não foi possível carregar o conteúdo. Tente novamente mais tarde.
      </p>
    );
  }
  if (isEmpty)
    return <p className="feed-status">Nenhum conteúdo publicado ainda.</p>;
  return null;
}

export function EditorialHero({ section, title, description }) {
  return (
    <section className="editorial-hero">
      <div className="section-number">NPCA / {section}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export function PublicationBlock({ block }) {
  if (block.type === "heading") return <h2>{block.text}</h2>;
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return null;
}

export function PublicationNotFound() {
  return (
    <section className="publication-not-found">
      <div className="section-number">PUBLICAÇÃO / 404</div>
      <h1>Publicação não encontrada</h1>
      <Link href="/publicacoes">
        <ArrowLeftIcon size={17} /> Voltar às publicações
      </Link>
    </section>
  );
}
