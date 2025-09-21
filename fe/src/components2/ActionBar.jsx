export function ActionBar({
                              sortFields = [],
                              filterFields = [],
                              filters = {},
                              setFilters,
                              handleAddBtn,
                              handleDeleteBtn
                          }) {
    const encode = (v) => {
        if (v === null) return "";       // ép null về chuỗi rỗng
        return JSON.stringify(v, ["sort_by", "sort_order"]);
    };


    return (
        <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleAddBtn}>Add</button>
            <button className="btn btn-danger" onClick={handleDeleteBtn}>Delete</button>

            {/* Search */}
            <input
                className="form-control"
                placeholder="Search"
                value={filters.search || ""}
                onChange={(e) => setFilters(prev => ({
                    ...prev,
                    search: e.target.value,
                    page: 1
                }))}
            />

            {/* Sort */}
            <select
                className="form-select w-25"
                value={filters.sort_by && filters.sort_order
                    ? encode({sort_by: filters.sort_by, sort_order: filters.sort_order})
                    : ""}

                onChange={(e) => {
                    const raw = e.target.value;

                    if (!raw) {
                        // reset sort
                        setFilters(prev => ({...prev, sort_by: "", sort_order: "", page: 1}));
                        return;
                    }

                    const obj = JSON.parse(raw);
                    setFilters(prev => ({...prev, ...obj, page: 1}));
                }}
            >
                {sortFields.map((s, i) => (
                    <option key={i} value={encode(s.value)}>{s.label}</option>
                ))}
            </select>

            {/* Filter */
            }
            <select
                className="form-select w-25"
                value={filters.category_id || ""}
                onChange={(e) => setFilters(prev => ({
                    ...prev,
                    category_id: e.target.value,
                    page: 1
                }))}
            >
                {filterFields.map((f, i) => (
                    <option key={i} value={f.value}>{f.label}</option>
                ))}
            </select>
        </div>
    )
        ;
}
