/**
 * CustomTable Component
 *
 * Hiển thị bảng dữ liệu có checkbox chọn dòng và nút Edit.
 *
 * ⚠️ Props bắt buộc:
 * - list: Array<object>
 *   Danh sách dữ liệu để render, mỗi item phải có `id` duy nhất.
 *
 *   Lưu ý:  selectionChange sẽ tương tác với DeleteBtn ở actionbar
 *
 * - columns: Array<{ header: string, accessor: string | (row) => any }>
 *   Định nghĩa cột hiển thị:
 *   - header: tên cột
 *   - accessor: key trong object hoặc function để custom hiển thị
 *
 * - handleEditBtn: (row: object) => void
 *   Callback khi nhấn nút Edit.
 *
 * Props tùy chọn:
 * - onSelectionChange?: (selectedIds: string[]) => void
 *   Callback khi user chọn checkbox.
 *
 * - modalSetting?: any
 *   Chưa sử dụng, để mở rộng trong tương lai.
 *
 * Example usage:
 *
 * ```jsx
 * const columns = [
 *   { header: "Username", accessor: (u) => u.user?.username },
 *   { header: "Role", accessor: (u) => u.user?.role },
 *   { header: "Full Name", accessor: "full_name" },
 *   { header: "Phone", accessor: "phone" },
 * ];
 *
 * <CustomTable
 *   list={profiles}
 *   columns={columns}
 *   handleEditBtn={(row) => console.log("Edit row:", row)}
 *   onSelectionChange={(ids) => console.log("Selected IDs:", ids)}
 * />
 * ```
 */

import {useState, useEffect} from "react";

//render table
export function CustomTable({list, columns, onSelectionChange, handleEditBtn}) {
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleRow = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((i) => i !== id)); // bỏ chọn
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    }

    // gửi selectedIds lên cha mỗi khi thay đổi
    useEffect(() => {
        onSelectionChange && onSelectionChange(selectedIds);
    }, [selectedIds, onSelectionChange]);

    return (
        <div style={{maxHeight: "300px", overflowY: "auto"}}>
            <table className={'table table-hover align-middle'} style={{width: "100%"}}>
                <thead style={{position: "sticky", top: 0, zIndex: 1}}>
                <tr>
                    <th style={{backgroundColor: "#f5f5f5"}}>
                        <input
                            className={'form-check-input'} type={'checkbox'}
                            checked={selectedIds.length === list.length && list.length > 0}
                            onChange={() =>
                                setSelectedIds(
                                    selectedIds.length === list.length ? [] : list.map((item) => item.id)
                                )}
                        />
                    </th>
                    {columns.map((col, colIndex) => (
                        <th key={colIndex} style={{backgroundColor: "#f5f5f5"}}>{col.header}</th>
                    ))}
                    <th style={{backgroundColor: "#f5f5f5"}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {list.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleRow(item.id)}
                            />
                        </td>
                        {columns.map((col, index) => (
                            <td key={index}>
                                {typeof col.accessor === 'function'
                                    ? col.accessor(item)
                                    : item[col.accessor]}
                            </td>
                        ))}
                        <td>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEditBtn(item)}
                            >Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}