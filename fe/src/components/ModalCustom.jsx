/**
 * ModalCustom Component
 *
 * Tạo modal Bootstrap với form động (các input được cấu hình qua props).
 *
 * ⚠️ Props bắt buộc:
 * - id: string
 *   ID duy nhất của modal (dùng để mở/đóng modal với Bootstrap: data-bs-target="#id").
 *
 * - title: string
 *   Tiêu đề hiển thị trên header modal.
 *
 * - fields: Array<{
 *     name: string,                // key trong form (bắt buộc)
 *     label: string,               // label hiển thị
 *     type: string,                // loại input: "text" | "number" | "date" | "select" | ...
 *     defaultValue?: any,          // giá trị mặc định khi tạo form rỗng
 *     options?: Array<{            // chỉ dùng khi type = "select"
 *       label: string,
 *       value: string
 *     }>
 *   }>
 *   Cấu hình các field trong form.
 *
 * - onSubmit: (formData: object) => void
 *   Callback khi nhấn nút Save. Nhận object form (key theo name trong fields).
 *
 * Props tùy chọn:
 * - editData?: object
 *   Dữ liệu cần edit. Nếu truyền vào thì form sẽ nạp giá trị này.
 *
 * Example usage:
 *
 * ```jsx
 * <ModalCustom
 *   id="userModal"
 *   title="Edit User"
 *   fields={[
 *     { name: "username", label: "Username", type: "text" },
 *     { name: "email", label: "Email", type: "email" },
 *     { name: "role", label: "Role", type: "select", options: [
 *         { label: "Admin", value: "ADMIN" },
 *         { label: "User", value: "USER" }
 *       ]
 *     },
 *   ]}
 *   onSubmit={(data) => console.log("Form submitted:", data)}
 *   editData={{ username: "john", email: "john@example.com", role: "ADMIN" }}
 * />
 * ```
 *
 * Sau đó để mở modal:
 * ```html
 * <button className="btn btn-primary" data-bs-toggle="modal*

 /* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from "react";

export function ModalCustom({id, title, fields, onSubmit, editData, renderthing, width = "400px"}) {
    // Khởi tạo form rỗng
    const createEmptyForm = () => {
        const obj = {};
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];

            if (field.type === "select") {
                // Nếu có defaultValue thì dùng
                // Nếu không, nhưng có options, thì fallback về option đầu tiên
                obj[field.name] =
                    field.defaultValue ||
                    (field.options?.length > 0 ? field.options[0].value : "");
            } else {
                obj[field.name] = field.defaultValue || "";
            }
        }
        return obj;
    };

    const [form, setForm] = useState(createEmptyForm());

    // Khi editData thay đổi -> nạp lại form
    useEffect(() => {
        if (editData) {
            setForm(editData);
        } else {
            setForm(createEmptyForm());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData]);

    // Cập nhật khi nhập input/select
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    // Submit form
    const handleSave = () => {
        if (typeof onSubmit === "function") {
            onSubmit(form);
        }
        setForm(createEmptyForm());
    };

    return (
        <div
            className="modal fade"
            id={id}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
        >
            <div className="modal-dialog" style={{maxWidth: width}}>
                <div className="modal-content">
                    {/* HomeHeader */}
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        {fields.map((field, idx) => (
                            <div key={idx} className="mb-3">
                                <label className="form-label">{field.label}</label>
                                {field.type === "select" ? (
                                    <select
                                        name={field.name}
                                        className="form-select"
                                        value={form[field.name] || ""}
                                        onChange={handleChange}
                                    >
                                        {field.options.map((opt, i) => (
                                            <option key={i} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "radio" ? (
                                    field.options.map((opt, i) => (
                                        <div key={i} className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={field.name}
                                                value={opt.value}
                                                checked={form[field.name] === opt.value}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label">{opt.label}</label>
                                        </div>
                                    ))
                                ) : (
                                    <input
                                        className="form-control"
                                        name={field.name}
                                        type={field.type}
                                        value={form[field.name] || ""}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}
                        {typeof renderthing === "function" && renderthing(form)}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
