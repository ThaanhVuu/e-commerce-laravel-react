export function CustomPagination({
                                     rowsPerPage = [10, 20, 50, 100], paging = {}, onPageChange, onLimitChange, rowPerPageDisplay = true
                                 }) {

    return (
        <div className={"d-flex justify-content-around "}>
            {rowPerPageDisplay === true && (
                <div className={"d-flex align-items-center gap-2 rowPerPage"}>
                    <span className={"h6"}>Rows per page</span>
                    <select className={"form-select w-auto"}
                            onChange={(e) => onLimitChange(e.target.value)}
                    >
                        {rowsPerPage.map((r, i) => (
                            <option value={r} key={i}>{r}</option>
                        ))}
                    </select>
                </div>
            )}

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {paging?.links?.map((link, i) => (
                        <li key={i}
                            className={`page-item ${link.active ? "active" : ""} ${link.url === null ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                dangerouslySetInnerHTML={{__html: link.label}}
                                onClick={() => {
                                    onPageChange?.(link.page);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    );
}