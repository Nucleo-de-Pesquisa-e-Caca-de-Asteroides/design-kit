import {
  getMemberPositions,
  hasRoleAccumulation,
  unitLabel,
} from "../organization.js";

export default function OrgChart({ members }) {
  const grouped = members.reduce((groups, member) => {
    getMemberPositions(member).forEach((position) => {
      if (!groups[position.unit]) groups[position.unit] = [];
      groups[position.unit].push({ member, position });
    });
    return groups;
  }, {});

  const order = [
    "diretoria-executiva",
    "professor-orientador",
    "diretoria-orientacao",
    "diretoria-capacitacao",
    "diretoria-comunicacao"
  ];

  return (
    <section className="org-chart">
      <h2>Organograma</h2>
      <div className="org-chart-grid">
        {order.map((unit) => {
          const activePositions = (grouped[unit] || []).filter(
            ({ member }) => member.status === "ativo",
          );
          return (
            <div className="org-chart-unit" key={unit}>
              <div className="org-chart-unit-title">{unitLabel(unit)}</div>
              <div className="org-chart-members">
                {activePositions.map(({ member, position }) => (
                  <div
                    className="org-chart-member"
                    key={`${member.id}-${position.unit}-${position.role}`}
                  >
                    <strong>{position.role}</strong>
                    <small>{member.name}</small>
                    {hasRoleAccumulation(member) && (
                      <span className="member-accumulation-badge">
                        Acúmulo de cargos
                      </span>
                    )}
                  </div>
                ))}
                {!activePositions.length && <small>Nenhum membro ativo.</small>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
