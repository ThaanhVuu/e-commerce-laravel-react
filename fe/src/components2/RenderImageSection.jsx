// components2/RenderImageSection.jsx
// 👉 Component tái sử dụng để render từng <tr> cho bảng ảnh (Banner/Gallery)

export function RenderImageSection({
                                       data = [],
                                       selectedIds = [],
                                       setSelectedIds = () => {},
                                       onEdit = () => {}
                                   }) {
    return (
        <>
            {data.map(item => (
                <tr key={item.id}>
                    <td>
                        {/* Checkbox chọn nhiều row */}
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(item.id)}
                            className="form-check-input"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedIds(prev => [...prev, item.id]);
                                } else {
                                    setSelectedIds(prev => prev.filter(id => id !== item.id));
                                }
                            }}
                        />
                    </td>

                    {/* Name */}
                    <td>{item.name}</td>

                    {/* Image preview */}
                    <td>
                        <img
                            src={item.img_url}
                            alt={item.name}
                            width="200px"
                            style={{objectFit: "contain"}}
                        />
                    </td>

                    {/* Status */}
                    <td>{item.status}</td>

                    {/* Nút Edit gọi callback */}
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => onEdit(item)}
                        >
                            Edit
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}
