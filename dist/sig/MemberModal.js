"use client";

import { useEffect, useState } from "react";
import { getMemberPositions, isExclusiveRole, organizationalUnits, rolesByUnit } from "../organization.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const emptyForm = {
  name: "",
  email: "",
  positions: [{
    unit: "diretoria-executiva",
    role: "Presidente"
  }],
  status: "ativo",
  institution: "",
  phone: "",
  joinedAt: "",
  notes: ""
};
function getPositionError(positions) {
  if (positions.some(position => !position.unit || !position.role)) {
    return "Selecione uma unidade e uma função para cada cargo.";
  }
  if (positions.length > 1 && positions.some(position => isExclusiveRole(position.role))) {
    return "Secretário e tesoureiro não podem acumular cargos.";
  }
  const uniquePositions = new Set(positions.map(position => `${position.unit}:${position.role}`));
  if (uniquePositions.size !== positions.length) {
    return "O mesmo cargo não pode ser adicionado mais de uma vez.";
  }
  return "";
}
export default function MemberModal({
  open,
  member,
  onClose,
  onSave,
  onDelete
}) {
  const [form, setForm] = useState(emptyForm);
  useEffect(() => {
    if (!open) return;
    const memberForm = member ? {
      ...emptyForm,
      ...member
    } : emptyForm;
    setForm({
      ...memberForm,
      positions: member ? getMemberPositions(member) : emptyForm.positions
    });
  }, [open, member]);
  if (!open) return null;
  const positions = form.positions;
  const positionError = getPositionError(positions);
  const update = (key, value) => setForm(current => ({
    ...current,
    [key]: value
  }));
  function updatePosition(index, key, value) {
    setForm(current => ({
      ...current,
      positions: current.positions.map((position, positionIndex) => {
        if (positionIndex !== index) return position;
        if (key === "unit") {
          const usedRoles = current.positions.filter((_, otherIndex) => otherIndex !== index).map(otherPosition => otherPosition.unit === value ? otherPosition.role : null);
          const role = (rolesByUnit[value] || []).find(candidate => (!isExclusiveRole(candidate) || current.positions.length === 1) && !usedRoles.includes(candidate));
          return {
            unit: value,
            role: role || ""
          };
        }
        return {
          ...position,
          [key]: value
        };
      })
    }));
  }
  function addPosition() {
    const hasExclusivePosition = positions.some(position => isExclusiveRole(position.role));
    if (hasExclusivePosition) return;
    const nextPosition = organizationalUnits.flatMap(unit => (rolesByUnit[unit.slug] || []).map(role => ({
      unit: unit.slug,
      role
    }))).find(candidate => !isExclusiveRole(candidate.role) && !positions.some(position => position.unit === candidate.unit && position.role === candidate.role));
    if (nextPosition) update("positions", [...positions, nextPosition]);
  }
  return /*#__PURE__*/_jsx("div", {
    className: "modal-backdrop",
    onMouseDown: onClose,
    children: /*#__PURE__*/_jsxs("div", {
      className: "modal-content member-modal",
      onMouseDown: event => event.stopPropagation(),
      children: [/*#__PURE__*/_jsx("button", {
        className: "modal-close-btn",
        onClick: onClose,
        type: "button",
        children: "\xD7"
      }), /*#__PURE__*/_jsx("h2", {
        children: member ? "Editar membro" : "Novo membro"
      }), /*#__PURE__*/_jsxs("form", {
        className: "login-form member-form",
        onSubmit: event => {
          event.preventDefault();
          if (positionError) return;
          onSave({
            ...form,
            unit: positions[0]?.unit || "",
            role: positions[0]?.role || ""
          });
        },
        children: [/*#__PURE__*/_jsxs("div", {
          className: "member-form-grid",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "input-group",
            children: [/*#__PURE__*/_jsx("label", {
              children: "Nome"
            }), /*#__PURE__*/_jsx("input", {
              className: "login-input",
              required: true,
              value: form.name,
              onChange: event => update("name", event.target.value)
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "input-group",
            children: [/*#__PURE__*/_jsx("label", {
              children: "E-mail"
            }), /*#__PURE__*/_jsx("input", {
              type: "email",
              className: "login-input",
              value: form.email,
              onChange: event => update("email", event.target.value)
            })]
          })]
        }), /*#__PURE__*/_jsxs("section", {
          className: "member-positions",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "member-positions-heading",
            children: [/*#__PURE__*/_jsx("h3", {
              children: "Cargos e unidades"
            }), /*#__PURE__*/_jsx("button", {
              className: "member-add-position",
              type: "button",
              onClick: addPosition,
              disabled: positions.some(position => isExclusiveRole(position.role)),
              children: "+ Adicionar cargo"
            })]
          }), positions.map((position, index) => {
            const availableRoles = (rolesByUnit[position.unit] || []).filter(role => {
              const alreadyUsed = positions.some((otherPosition, otherIndex) => otherIndex !== index && otherPosition.unit === position.unit && otherPosition.role === role);
              return role === position.role || (!isExclusiveRole(role) || positions.length === 1) && !alreadyUsed;
            });
            return /*#__PURE__*/_jsxs("div", {
              className: "member-position-row",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "input-group",
                children: [/*#__PURE__*/_jsx("label", {
                  children: "Unidade"
                }), /*#__PURE__*/_jsx("select", {
                  className: "login-input",
                  value: position.unit,
                  onChange: event => updatePosition(index, "unit", event.target.value),
                  children: organizationalUnits.map(unit => /*#__PURE__*/_jsx("option", {
                    value: unit.slug,
                    children: unit.title
                  }, unit.slug))
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "input-group",
                children: [/*#__PURE__*/_jsx("label", {
                  children: "Fun\xE7\xE3o"
                }), /*#__PURE__*/_jsx("select", {
                  className: "login-input",
                  value: position.role,
                  onChange: event => updatePosition(index, "role", event.target.value),
                  children: availableRoles.map(role => /*#__PURE__*/_jsx("option", {
                    value: role,
                    children: role
                  }, role))
                })]
              }), positions.length > 1 && /*#__PURE__*/_jsx("button", {
                className: "member-remove-position",
                type: "button",
                onClick: () => update("positions", positions.filter((_, positionIndex) => positionIndex !== index)),
                "aria-label": `Remover cargo ${position.role}`,
                children: "Remover"
              })]
            }, `${position.unit}-${index}`);
          }), positionError && /*#__PURE__*/_jsx("p", {
            className: "member-form-error",
            role: "alert",
            children: positionError
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "member-form-grid",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "input-group",
            children: [/*#__PURE__*/_jsx("label", {
              children: "Status"
            }), /*#__PURE__*/_jsxs("select", {
              className: "login-input",
              value: form.status,
              onChange: event => update("status", event.target.value),
              children: [/*#__PURE__*/_jsx("option", {
                value: "ativo",
                children: "Ativo"
              }), /*#__PURE__*/_jsx("option", {
                value: "inativo",
                children: "Inativo"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "input-group",
            children: [/*#__PURE__*/_jsx("label", {
              children: "Institui\xE7\xE3o"
            }), /*#__PURE__*/_jsx("input", {
              className: "login-input",
              value: form.institution,
              onChange: event => update("institution", event.target.value)
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "input-group",
            children: [/*#__PURE__*/_jsx("label", {
              children: "Telefone"
            }), /*#__PURE__*/_jsx("input", {
              className: "login-input",
              value: form.phone,
              onChange: event => update("phone", event.target.value)
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "input-group",
            children: [/*#__PURE__*/_jsx("label", {
              children: "Data de ingresso"
            }), /*#__PURE__*/_jsx("input", {
              type: "date",
              className: "login-input",
              value: form.joinedAt,
              onChange: event => update("joinedAt", event.target.value)
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "input-group member-notes",
            children: [/*#__PURE__*/_jsx("label", {
              children: "Observa\xE7\xF5es"
            }), /*#__PURE__*/_jsx("textarea", {
              className: "login-input",
              value: form.notes,
              onChange: event => update("notes", event.target.value)
            })]
          })]
        }), /*#__PURE__*/_jsx("button", {
          className: "login-submit-btn",
          type: "submit",
          disabled: Boolean(positionError),
          children: "Salvar"
        }), member && /*#__PURE__*/_jsx("button", {
          type: "button",
          className: "member-delete-button",
          onClick: onDelete,
          children: "Excluir membro"
        })]
      })]
    })
  });
}
