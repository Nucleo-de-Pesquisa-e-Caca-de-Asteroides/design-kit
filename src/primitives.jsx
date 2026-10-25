"use client";
import { useEffect, useId, useRef } from 'react';
const cx = (...values) => values.filter(Boolean).join(' ');

export function Button({ as: Element = 'button', variant = 'primary', className, type, ...props }) {
  return <Element type={Element === 'button' ? (type || 'button') : undefined} className={cx('npca-button', `npca-button--${variant}`, className)} {...props} />;
}
export function Card({ as: Element = 'section', className, ...props }) {
  return <Element className={cx('npca-card', className)} {...props} />;
}
export function Badge({ variant = 'neutral', className, ...props }) {
  return <span className={cx('npca-badge', `npca-badge--${variant}`, className)} {...props} />;
}
export function Field({ label, id, hint, error, as: Element = 'input', className, ...props }) {
  const generated = useId();
  const inputId = id || generated;
  const descriptionId = `${inputId}-description`;
  return <div className={cx('npca-field', className)}>
    <label htmlFor={inputId}>{label}</label>
    <Element {...props} id={inputId} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={cx(props['aria-describedby'], (error || hint) && descriptionId) || undefined} />
    {(error || hint) && <small id={descriptionId} role={error ? 'alert' : undefined}>{error || hint}</small>}
  </div>;
}
export function Modal({ open, onClose, title, children }) {
  const dialog = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const node = dialog.current;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
    return () => { if (node.open) node.close(); };
  }, [open]);
  return <dialog ref={dialog} className="npca-modal" aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose?.(); }}>
    <div className="npca-modal-heading"><h2 id={titleId}>{title}</h2><Button variant="secondary" onClick={onClose} aria-label="Fechar">×</Button></div>{children}
  </dialog>;
}
export function Table({ caption, children, className, ...props }) {
  return <div className="npca-table-scroll" role="region" aria-label={caption || 'Tabela'} tabIndex={0}><table className={cx('npca-table', className)} {...props}>{caption && <caption>{caption}</caption>}{children}</table></div>;
}
export function EmptyState({ title = 'Nenhum resultado', children }) {
  return <div className="npca-empty" role="status"><h2>{title}</h2>{children}</div>;
}
