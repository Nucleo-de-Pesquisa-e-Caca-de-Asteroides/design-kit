export default function Footer({ websiteUrl = 'https://npca.vercel.app/' }) {
  return <footer>
    <p>SIG-NPCA · Núcleo de Pesquisa e Caça de Asteroides</p>
    <a href={websiteUrl} target="_blank" rel="noopener noreferrer">Website do NPCA ↗</a>
  </footer>;
}
