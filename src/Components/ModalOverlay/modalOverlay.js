import "./modalOverlay.css";

export default function ModalOverlay({
  children,
  onSave,
  onClose,
  visible,
  header,
}) {
  if (visible) {
    return (
      <div className="overlay">
        <div className="modal">
          {header && (
            <div className="modal-header">
              <h3>{header}</h3>
            </div>
          )}
          <div className="content">{children}</div>
          <div className="actions">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
