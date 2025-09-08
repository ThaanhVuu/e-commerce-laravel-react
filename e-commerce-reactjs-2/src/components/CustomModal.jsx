import { Modal } from "bootstrap";

export default function ModalCustom({ id, title, fields, onSubmit }) {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                    </div>
                    <div className="modal-body">
                        <form id={`${id}-form`}>
                            {fields.map((field, index) => (
                                <div className="mb-3" key={index}>
                                    <label className="form-label">{field.label}</label>
                                    {field.type === "select" ? (
                                        <select className="form-select" name={field.name}>
                                            {field.options.map((opt, i) => (
                                                <option key={i} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="form-control"
                                            name={field.name}
                                            defaultValue={field.defaultValue || ""}
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                                const form = document.getElementById(`${id}-form`);
                                const formData = new FormData(form);
                                const data = Object.fromEntries(formData.entries());

                                try {
                                    if (typeof onSubmit === "function") {
                                        await onSubmit(data);
                                    }
                                    const modalEl = document.getElementById(id);
                                    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
                                    modal.hide();
                                } catch (err) {
                                    console.error("Error khi submit:", err);
                                }
                            }}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
