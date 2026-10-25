"use client";

import { useEffect, useId, useRef } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const cx = (...values) => values.filter(Boolean).join(' ');
export function Button({
  as: Element = 'button',
  variant = 'primary',
  className,
  type,
  ...props
}) {
  return /*#__PURE__*/_jsx(Element, {
    type: Element === 'button' ? type || 'button' : undefined,
    className: cx('npca-button', `npca-button--${variant}`, className),
    ...props
  });
}
export function Card({
  as: Element = 'section',
  className,
  ...props
}) {
  return /*#__PURE__*/_jsx(Element, {
    className: cx('npca-card', className),
    ...props
  });
}
export function Badge({
  variant = 'neutral',
  className,
  ...props
}) {
  return /*#__PURE__*/_jsx("span", {
    className: cx('npca-badge', `npca-badge--${variant}`, className),
    ...props
  });
}
export function Field({
  label,
  id,
  hint,
  error,
  as: Element = 'input',
  className,
  ...props
}) {
  const generated = useId();
  const inputId = id || generated;
  const descriptionId = `${inputId}-description`;
  return /*#__PURE__*/_jsxs("div", {
    className: cx('npca-field', className),
    children: [/*#__PURE__*/_jsx("label", {
      htmlFor: inputId,
      children: label
    }), /*#__PURE__*/_jsx(Element, {
      ...props,
      id: inputId,
      "aria-invalid": error ? true : props['aria-invalid'],
      "aria-describedby": cx(props['aria-describedby'], (error || hint) && descriptionId) || undefined
    }), (error || hint) && /*#__PURE__*/_jsx("small", {
      id: descriptionId,
      role: error ? 'alert' : undefined,
      children: error || hint
    })]
  });
}
export function Modal({
  open,
  onClose,
  title,
  children
}) {
  const dialog = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const node = dialog.current;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
    return () => {
      if (node.open) node.close();
    };
  }, [open]);
  return /*#__PURE__*/_jsxs("dialog", {
    ref: dialog,
    className: "npca-modal",
    "aria-labelledby": titleId,
    onCancel: event => {
      event.preventDefault();
      onClose?.();
    },
    children: [/*#__PURE__*/_jsxs("div", {
      className: "npca-modal-heading",
      children: [/*#__PURE__*/_jsx("h2", {
        id: titleId,
        children: title
      }), /*#__PURE__*/_jsx(Button, {
        variant: "secondary",
        onClick: onClose,
        "aria-label": "Fechar",
        children: "\xD7"
      })]
    }), children]
  });
}
export function Table({
  caption,
  children,
  className,
  ...props
}) {
  return /*#__PURE__*/_jsx("div", {
    className: "npca-table-scroll",
    role: "region",
    "aria-label": caption || 'Tabela',
    tabIndex: 0,
    children: /*#__PURE__*/_jsxs("table", {
      className: cx('npca-table', className),
      ...props,
      children: [caption && /*#__PURE__*/_jsx("caption", {
        children: caption
      }), children]
    })
  });
}
export function EmptyState({
  title = 'Nenhum resultado',
  children
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: "npca-empty",
    role: "status",
    children: [/*#__PURE__*/_jsx("h2", {
      children: title
    }), children]
  });
}
