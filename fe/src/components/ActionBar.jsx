/**
 * ActionBar Component
 *
 * Component thanh công cụ hành động, gồm các nút: Delete, Search, Filter.
 *
 * ⚠️ Bắt buộc phải truyền prop `filterSelectionSetting`.
 * lưu ý, nút Delete sẽ tương tác với selectionChange ở Table
 *
 * Props:
 * - onDelete: () => void {trả về list ID selected}
 *   Callback được gọi khi nhấn nút Delete.
 *
 * - onSearch: (value: string) => void
 *   Callback được gọi khi user nhập vào ô search.
 *   Trả về chuỗi text đang nhập.
 *
 * - onFilter: (value: string) => void
 *   Callback được gọi khi user chọn giá trị từ dropdown filter.
 *
 * - filterSelectionSetting: Array<{ label: string, value: string }>
 *   Danh sách option cho dropdown filter.
 *
 * Example usage:
 *
 * ```jsx
 * <ActionBar
 *   onDelete={() => console.log("Delete clicked")}
 *   onSearch={(text) => console.log("Search:", text)}
 *   onFilter={(value) => console.log("Filter:", value)}
 *   filterSelectionSetting={[
 *     { label: "Admin", value: "ADMIN" },
 *     { label: "Manager", value: "MANAGER" },
 *     { label: "User", value: "USER" },
 *   ]}
 * />
 * ```
 */

import {useState} from "react";

// render actionbar
export function ActionBar({onDelete, onSearch, onFilter, filterSelectionSetting}) {
    const [filter, setFilter] = useState(""); // state cho filter

    return (
        <div className={'d-flex gap-2'}>
            <button className={'btn btn-danger'} onClick={onDelete}>Delete</button>

            <div className={'d-flex gap-2'}>
                <input
                    className={'form-control'}
                    style={{width: "800px"}}
                    placeholder={'Search'}
                    // truyền value về cha
                    onChange={(e) => onSearch(e.target.value)}
                />

            </div>

            {/* dùng value và onChange thay vì selected */}
            <select
                className="form-select"
                value={filter}
                onChange={(e) => {
                    onFilter(e.target.value);
                    setFilter(e.target.value);
                }}
            >
                <option value="">ALL</option>
                {filterSelectionSetting.map((field) => (
                    <option value={field.value}>{field.label}</option>
                ))}
            </select>
        </div>
    );
}
