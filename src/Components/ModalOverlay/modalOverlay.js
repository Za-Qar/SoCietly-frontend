import style from "./modalOverlay.module.css";

export default function ModalOverlay({
  children,
  onSave,
  onClose,
  visible,
  header,
}) {
  if (visible) {
    return (
      <div className={style.overlay}>
        <div className={style.modal}>
          {header && (
            <div className={style.modalHeader}>
              <h3>{header}</h3>
            </div>
          )}
          <div className={style.content}>{children}</div>
          <div className={style.actions}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
