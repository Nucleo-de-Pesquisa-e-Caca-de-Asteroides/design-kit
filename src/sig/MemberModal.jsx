"use client";

import { useEffect, useState } from "react";
import {
  getMemberPositions,
  isExclusiveRole,
  organizationalUnits,
  rolesByUnit,
} from "../organization.js";

const emptyForm = {
  name: "",
  email: "",
  positions: [{ unit: "diretoria-executiva", role: "Presidente" }],
  status: "ativo",
  institution: "",
  phone: "",
  joinedAt: "",
  notes: "",
};

function getPositionError(positions) {
  if (positions.some((position) => !position.unit || !position.role)) {
    return "Selecione uma unidade e uma função para cada cargo.";
  }
  if (positions.length > 1 && positions.some((position) => isExclusiveRole(position.role))) {
    return "Secretário e tesoureiro não podem acumular cargos.";
  }

  const uniquePositions = new Set(
    positions.map((position) => `${position.unit}:${position.role}`),
  );
  if (uniquePositions.size !== positions.length) {
    return "O mesmo cargo não pode ser adicionado mais de uma vez.";
  }

  return "";
}

export default function MemberModal({ open, member, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) return;
    const memberForm = member ? { ...emptyForm, ...member } : emptyForm;
    setForm({
      ...memberForm,
      positions: member ? getMemberPositions(member) : emptyForm.positions,
    });
  }, [open, member]);

  if (!open) return null;

  const positions = form.positions;
  const positionError = getPositionError(positions);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  function updatePosition(index, key, value) {
    setForm((current) => ({
      ...current,
      positions: current.positions.map((position, positionIndex) => {
        if (positionIndex !== index) return position;
        if (key === "unit") {
          const usedRoles = current.positions
            .filter((_, otherIndex) => otherIndex !== index)
            .map((otherPosition) =>
              otherPosition.unit === value ? otherPosition.role : null,
            );
          const role = (rolesByUnit[value] || []).find(
            (candidate) =>
              (!isExclusiveRole(candidate) || current.positions.length === 1) &&
              !usedRoles.includes(candidate),
          );
          return { unit: value, role: role || "" };
        }
        return { ...position, [key]: value };
      }),
    }));
  }

  function addPosition() {
    const hasExclusivePosition = positions.some((position) =>
      isExclusiveRole(position.role),
    );
    if (hasExclusivePosition) return;

    const nextPosition = organizationalUnits
      .flatMap((unit) =>
        (rolesByUnit[unit.slug] || []).map((role) => ({ unit: unit.slug, role })),
      )
      .find(
        (candidate) =>
          !isExclusiveRole(candidate.role) &&
          !positions.some(
            (position) =>
              position.unit === candidate.unit && position.role === candidate.role,
          ),
      );
    if (nextPosition) update("positions", [...positions, nextPosition]);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal-content member-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} type="button">
          ×
        </button>
        <h2>{member ? "Editar membro" : "Novo membro"}</h2>
        <form
          className="login-form member-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (positionError) return;
            onSave({
              ...form,
              unit: positions[0]?.unit || "",
              role: positions[0]?.role || "",
            });
          }}
        >
          <div className="member-form-grid">
            <div className="input-group">
              <label>Nome</label>
              <input
                className="login-input"
                required
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
              />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input
                type="email"
                className="login-input"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </div>
          </div>

          <section className="member-positions">
            <div className="member-positions-heading">
              <h3>Cargos e unidades</h3>
              <button
                className="member-add-position"
                type="button"
                onClick={addPosition}
                disabled={
                  positions.some((position) => isExclusiveRole(position.role))
                }
              >
                + Adicionar cargo
              </button>
            </div>
            {positions.map((position, index) => {
              const availableRoles = (rolesByUnit[position.unit] || []).filter(
                (role) => {
                  const alreadyUsed = positions.some(
                    (otherPosition, otherIndex) =>
                      otherIndex !== index &&
                      otherPosition.unit === position.unit &&
                      otherPosition.role === role,
                  );
                  return (
                    role === position.role ||
                    ((!isExclusiveRole(role) || positions.length === 1) &&
                      !alreadyUsed)
                  );
                },
              );

              return (
                <div className="member-position-row" key={`${position.unit}-${index}`}>
                  <div className="input-group">
                    <label>Unidade</label>
                    <select
                      className="login-input"
                      value={position.unit}
                      onChange={(event) =>
                        updatePosition(index, "unit", event.target.value)
                      }
                    >
                      {organizationalUnits.map((unit) => (
                        <option key={unit.slug} value={unit.slug}>
                          {unit.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Função</label>
                    <select
                      className="login-input"
                      value={position.role}
                      onChange={(event) =>
                        updatePosition(index, "role", event.target.value)
                      }
                    >
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  {positions.length > 1 && (
                    <button
                      className="member-remove-position"
                      type="button"
                      onClick={() =>
                        update(
                          "positions",
                          positions.filter((_, positionIndex) => positionIndex !== index),
                        )
                      }
                      aria-label={`Remover cargo ${position.role}`}
                    >
                      Remover
                    </button>
                  )}
                </div>
              );
            })}
            {positionError && (
              <p className="member-form-error" role="alert">
                {positionError}
              </p>
            )}
          </section>

          <div className="member-form-grid">
            <div className="input-group">
              <label>Status</label>
              <select
                className="login-input"
                value={form.status}
                onChange={(event) => update("status", event.target.value)}
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            <div className="input-group">
              <label>Instituição</label>
              <input
                className="login-input"
                value={form.institution}
                onChange={(event) => update("institution", event.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Telefone</label>
              <input
                className="login-input"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Data de ingresso</label>
              <input
                type="date"
                className="login-input"
                value={form.joinedAt}
                onChange={(event) => update("joinedAt", event.target.value)}
              />
            </div>
            <div className="input-group member-notes">
              <label>Observações</label>
              <textarea
                className="login-input"
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
              />
            </div>
          </div>

          <button className="login-submit-btn" type="submit" disabled={Boolean(positionError)}>
            Salvar
          </button>
          {member && (
            <button
              type="button"
              className="member-delete-button"
              onClick={onDelete}
            >
              Excluir membro
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
