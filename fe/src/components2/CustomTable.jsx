export function CustomTable({
                                theadFields = [], data = [], renderRow, setSelectedIds
                            }) {
    return (
        <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
            <table className={"table table-striped rounded-2"}>
                <thead className={"sticky-top"}>
                <tr>
                    <th><input type={"checkbox"}
                               className={"form-check-input"}
                               onChange={(e) => {
                                   if (e.target.checked) {
                                       setSelectedIds(data.map(d => d.id)); // chọn hết
                                   } else {
                                       setSelectedIds([]); // bỏ hết
                                   }
                               }}
                    /></th>
                    {theadFields.map((th) => (
                        <th>{th}</th>
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