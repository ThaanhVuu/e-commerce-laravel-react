// CustomTable.jsx
export default function CustomTable({ list, columns }) {
    if (!list || list.length === 0) {
        return <p>Không có dữ liệu</p>;
    }

    return (
        <div className={'d-flex flex-column'} style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index} style={{position: "sticky", top: 0, background: "white", zIndex: 2}}>{col.header}</th>
                    ))}
                    <th style={{position: "sticky", top: 0, background: "white", zIndex: 2}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {typeof col.accessor === "function"
                                    ? col.accessor(item)
                                    : item[col.accessor]}
                            </td>
                        ))}
                        <td>
                            <button className={'btn btn-primary me-2'}>Edit</button>
                            <button className={'btn btn-danger'}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
