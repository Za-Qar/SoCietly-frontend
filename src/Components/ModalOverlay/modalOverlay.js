import style from "./modalOverlay.module.css";
import cn from "classnames";

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
            <div className={cn(style.cancelButtonDiv)}>
              <button onClick={onClose} className="button-cancel">
                Cancel
              </button>
            </div>
            <div className={cn(style.confirmButtonDiv)}>
              <button onClick={onSave} className="button">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
