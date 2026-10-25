import { getMemberPositions, hasRoleAccumulation, unitLabel } from "../organization.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function OrgChart({
  members
}) {
  const grouped = members.reduce((groups, member) => {
    getMemberPositions(member).forEach(position => {
      if (!groups[position.unit]) groups[position.unit] = [];
      groups[position.unit].push({
        member,
        position
      });
    });
    return groups;
  }, {});
  const order = ["diretoria-executiva", "professor-orientador", "diretoria-orientacao", "diretoria-capacitacao", "diretoria-comunicacao"];
  return /*#__PURE__*/_jsxs("section", {
    className: "org-chart",
    children: [/*#__PURE__*/_jsx("h2", {
      children: "Organograma"
    }), /*#__PURE__*/_jsx("div", {
      className: "org-chart-grid",
      children: order.map(unit => {
        const activePositions = (grouped[unit] || []).filter(({
          member
        }) => member.status === "ativo");
        return /*#__PURE__*/_jsxs("div", {
          className: "org-chart-unit",
          children: [/*#__PURE__*/_jsx("div", {
            className: "org-chart-unit-title",
            children: unitLabel(unit)
          }), /*#__PURE__*/_jsxs("div", {
            className: "org-chart-members",
            children: [activePositions.map(({
              member,
              position
            }) => /*#__PURE__*/_jsxs("div", {
              className: "org-chart-member",
              children: [/*#__PURE__*/_jsx("strong", {
                children: position.role
              }), /*#__PURE__*/_jsx("small", {
                children: member.name
              }), hasRoleAccumulation(member) && /*#__PURE__*/_jsx("span", {
                className: "member-accumulation-badge",
                children: "Ac\xFAmulo de cargos"
              })]
            }, `${member.id}-${position.unit}-${position.role}`)), !activePositions.length && /*#__PURE__*/_jsx("small", {
              children: "Nenhum membro ativo."
            })]
          })]
        }, unit);
      })
    })]
  });
}
