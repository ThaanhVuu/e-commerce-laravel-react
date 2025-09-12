import { useEffect, useState } from "react";

export function CustomTable({
                                list = [],
                                columns = [],
                                onSelectionChange,
                                handleEditBtn,
                                minTableWidth = 1200,
                                stickyFirstCol = true,
                            }) {
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleRow = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        onSelectionChange && onSelectionChange(selectedIds);
    }, [selectedIds, onSelectionChange]);

    // Style cho header
    const stickyTh = {
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: "#f5f5f5",
        whiteSpace: "nowrap",
    };

    // Style cho cột đầu tiên
    const stickyFirst = {
        position: "sticky",
        left: 0,
        zIndex: 3,
        backgroundColor: "#fff",
    };

    return (
        // 1 container scroll ngang + dọc
        <div
            style={{
                height: 400,
                overflow: "auto",
                width: "100%",
                border: "1px solid #ddd",
            }}
        >
            <table
                className="table table-hover align-middle text-nowrap"
                style={{ width: "max-content", minWidth: `${minTableWidth}px` }}
            >
                <thead>
                <tr>
                    {/* HomeHeader checkbox */}
                    <th
                        style={{
                            ...stickyTh,
                            ...(stickyFirstCol ? stickyFirst : null),
                            zIndex: 5, // đè lên
                        }}
                        className={'bg-light'}
                    >
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedIds.length === list.length && list.length > 0}
                            onChange={() =>
                                setSelectedIds(
                                    selectedIds.length === list.length ? [] : list.map((i) => i.id)
                                )
                            }
                        />
                    </th>

                    {columns.map((col, i) => (
                        <th key={i} style={stickyTh}>
                            {col.header}
                        </th>
                    ))}

                    <th style={stickyTh}>Action</th>
                </tr>
                </thead>

                <tbody>
                {list.map((item) => (
                    <tr key={item.id}>
                        <td
                            style={stickyFirstCol ? stickyFirst : undefined}
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedIds.includes(item.id)}
                                onChange={() => toggleRow(item.id)}
                            />
                        </td>

                        {columns.map((col, j) => (
                            <td key={j} style={{ whiteSpace: "nowrap" }}>
                                {typeof col.accessor === "function"
                                    ? col.accessor(item)
                                    : item[col.accessor]}
                            </td>
                        ))}

                        <td>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEditBtn(item)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
