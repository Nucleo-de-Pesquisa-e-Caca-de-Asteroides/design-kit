export const organizationalUnits = [
  { slug: "diretoria-executiva", title: "Diretoria Executiva", type: "Diretoria" },
  { slug: "professor-orientador", title: "Professor Orientador", type: "Orientação" },
  { slug: "diretoria-orientacao", title: "Diretoria de Orientação", type: "Diretoria" },
  { slug: "diretoria-capacitacao", title: "Diretoria de Capacitação", type: "Diretoria" },
  { slug: "diretoria-comunicacao", title: "Diretoria de Comunicação", type: "Diretoria" }
];

export const rolesByUnit = {
  "diretoria-executiva": ["Presidente", "Vice-Presidente", "Secretário", "Tesoureiro"],
  "professor-orientador": ["Professor Orientador"],
  "diretoria-orientacao": ["Diretor de Orientação", "Orientador", "Assessor"],
  "diretoria-capacitacao": ["Diretor de Capacitação", "Coordenador de Evento", "Coordenador de Materiais", "Criador de Materiais"],
  "diretoria-comunicacao": ["Diretor de Comunicação", "Coordenador de Mídias Sociais", "Coordenador de Design e Identidade Visual", "Coordenador de Comunicação Institucional", "Coordenador de Divulgação Científica", "Colaborador"]
};

export const unitLabel = (slug) => organizationalUnits.find((u) => u.slug === slug)?.title || slug;

export function getMemberPositions(member) {
  if (Array.isArray(member.positions) && member.positions.length) {
    return member.positions.filter((position) => position?.unit && position?.role);
  }
  return member.unit && member.role
    ? [{ unit: member.unit, role: member.role }]
    : [];
}

export function isExclusiveRole(role) {
  return ["secretario", "tesoureiro"].includes(
    String(role || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
  );
}

export function canPublishDocuments(member) {
  if (member?.status !== "ativo") return false;

  return getMemberPositions(member).some(({ role }) => {
    const normalizedRole = String(role || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLocaleLowerCase("pt-BR");
    return (
      normalizedRole.startsWith("diretor") ||
      ["secretario", "tesoureiro", "professor orientador"].includes(normalizedRole)
    );
  });
}

export function hasRoleAccumulation(member) {
  return getMemberPositions(member).length > 1;
}
