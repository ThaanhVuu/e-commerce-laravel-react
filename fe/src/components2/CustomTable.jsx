export function CustomTable({
                                theadFields = [], data = [], renderRow, selectedIds = [], setSelectedIds = () => {}
                            }) {

    const isAllSelected = data.length > 0 && selectedIds.length === data.length;

    return (
        <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
            <table className={"table table-striped rounded-2"}>
                <thead className={"sticky-top"}>
                <tr>
                    <th><input type={"checkbox"}
                               className={"form-check-input"}
                               checked={isAllSelected}
                               onChange={(e) => {
                                   if (e.target.checked) {
                                       setSelectedIds(data.map(d => d.id));
                                   } else {
                                       setSelectedIds([]);
                                   }
                               }}
                    /></th>
                    {theadFields.map((th, idx) => (
                        <th key={idx}>{th}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {typeof renderRow === "function" && renderRow()}
                </tbody>
            </table>
        </div>
    );
}