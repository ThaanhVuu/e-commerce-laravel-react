// components/InManageLayout.jsx
import {useEffect, useMemo, useState} from "react";
import {api} from "../utils/Global";
import {getByPath} from "../utils/getByPath";

/**
 * Tái sử dụng bằng cách truyền cấu hình:
 * - searchableFields: string[] (path), ví dụ ['name', 'user.username', 'email']
 * - filters: [{ name, label, options:[{label,value}], predicate:(item, value)=>boolean }]
 * - sorts: [{ label, value, comparator:(a,b)=>number }]
 * - idAccessor: string path hoặc (item)=>id  (mặc định 'id')
 */
export function InManageLayout({
                                   getApi = "",
                                   theadSetting = [],
                                   renderRow = () => {},
                                   renderOtherButton = () => {},
                                   handleDelete = async () => {},
                                   handleEdit = async () => {},
                                   handleAddNew = async () => {},
                                   // cấu hình mới ↓↓↓
                                   searchableFields = ["name", "username"],
                                   filters = [],           // ví dụ: [{name:'status', label:'Status', options:[...], predicate:(item, v)=>item.status===v}]
                                   sorts = [],             // ví dụ: [{label:'Price ↑', value:'price_asc', comparator:(a,b)=>a.price-b.price}]
                                   idAccessor = "id",      // hoặc (item)=>item.uuid
                                   rowsPerPageOptions = [5,10,20,50,100],
                                   initialRowsPerPage = 5,
                                   keyReloadTable = 0,
                               }) {
    const [list, setList] = useState([]);
    const [listFiltered, setListFiltered] = useState([]);
    const [paging, setPaging] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
    const [selectedIds, setSelectedIds] = useState([]);

    // UI state cho search / filter / sort
    const [searchText, setSearchText] = useState("");
    const [filterValues, setFilterValues] = useState({}); // { [filter.name]: value }
    const [sortValue, setSortValue] = useState("");

    // helper lấy id an toàn
    const getId = useMemo(() => {
        return typeof idAccessor === "function"
            ? idAccessor
            : (item) => getByPath(item, idAccessor);
    }, [idAccessor]);

    // fetch
    useEffect(() => {
        (async () => {
            if (!getApi) return;
            try {
                const res = await api.get(`${getApi}/limit=${rowsPerPage}`);
                setList(res.data?.data ?? []);
                setPaging(res.data ?? null);
            } catch (e) {
                console.error(e?.response?.data ?? e);
            }
        })();
    }, [getApi, rowsPerPage, keyReloadTable]);

    // filter + sort
    useEffect(() => {
        let result = Array.isArray(list) ? [...list] : [];

        // search
        if (searchText) {
            const q = searchText.toLowerCase();
            result = result.filter((item) =>
                searchableFields.some((path) =>
                    String(getByPath(item, path, "") ?? "").toLowerCase().includes(q)
                )
            );
        }

        // filters (mỗi filter có predicate riêng)
        for (const f of filters) {
            const val = filterValues[f.name];
            if (val !== undefined && val !== "" && val !== "all") {
                result = result.filter((item) => {
                    try { return f.predicate(item, val); }
                    catch { return true; }
                });
            }
        }

        // sort
        if (sortValue) {
            const s = sorts.find(s => s.value === sortValue);
            if (s?.comparator) result.sort(s.comparator);
        }

        setListFiltered(result);
    }, [list, searchText, filterValues, sortValue, searchableFields, filters, sorts]);

    const toggleAll = (checked) => {
        if (!checked) return setSelectedIds([]);
        const ids = listFiltered.map((it) => getId(it)).filter(Boolean);
        setSelectedIds(ids);
    };

    const toggleOne = (id, checked) => {
        setSelectedIds(prev =>
            checked ? Array.from(new Set([...prev, id])) : prev.filter(x => x !== id)
        );
    };

    return (
        <section className="mt-3 bg-light">
            <div className="border rounded-2 p-3 d-flex flex-column gap-2">
                {/* ActionBar */}
                <div className="d-flex justify-content-around gap-2">
                    <button className="btn btn-primary" onClick={handleAddNew}>Add</button>

                    <button
                        className="btn btn-danger"
                        disabled={selectedIds.length === 0}
                        onClick={async () => {
                            await handleDelete(selectedIds);
                            setSelectedIds([]);
                            try {
                                const res = await api.get(`${getApi}/limit=${rowsPerPage}`);
                                setList(res.data?.data ?? []);
                                setPaging(res.data ?? null);
                            } catch (e) {
                                console.error(e?.response?.data ?? e);
                            }
                        }}
                    >
                        Delete
                    </button>

                    {/* Search */}
                    <input
                        className="form-control"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e)=>setSearchText(e.target.value)}
                    />

                    {/* Sort select */}
                    {sorts.length > 0 && (
                        <select
                            className="form-select w-auto"
                            value={sortValue}
                            onChange={(e)=>setSortValue(e.target.value)}
                        >
                            <option value="">Sort</option>
                            {sorts.map((s,i)=><option key={i} value={s.value}>{s.label}</option>)}
                        </select>
                    )}

                    {/* Dynamic filters */}
                    {filters.map((f) => (
                        <select
                            key={f.name}
                            className="form-select w-auto"
                            value={filterValues[f.name] ?? ""}
                            onChange={(e)=>setFilterValues(prev=>({...prev,[f.name]: e.target.value}))}
                        >
                            {f.options.map((op,i)=>(
                                <option value={op.value} key={i}>{op.label}</option>
                            ))}
                        </select>
                    ))}
                </div>

                {/* Table */}
                <div style={{maxHeight: "450px", overflowY: "auto"}}>
                    <table className="table table-striped">
                        <thead className="sticky-top bg-light">
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    className="form-check"
                                    checked={listFiltered.length>0 && selectedIds.length===listFiltered.length}
                                    onChange={(e)=>toggleAll(e.target.checked)}
                                />
                            </th>
                            {theadSetting.map((th, i)=><th key={i}>{th}</th>)}
                        </tr>
                        </thead>

                        <tbody>
                        {listFiltered.map((item, idx) => {
                            const id = getId(item) ?? idx; // fallback để không crash
                            return (
                                <tr key={id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check"
                                            checked={selectedIds.includes(getId(item))}
                                            onChange={(e)=>toggleOne(getId(item), e.target.checked)}
                                        />
                                    </td>

                                    {typeof renderRow === "function" && renderRow(item)}

                                    <td>
                                        <button className="btn btn-primary me-2" onClick={()=>handleEdit(getId(item))}>
                                            Edit
                                        </button>
                                        {typeof renderOtherButton === "function" && renderOtherButton(item)}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Paging */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center gap-2">
                        <h6 className="m-0">Rows per page:</h6>
                        <select
                            className="form-select w-auto"
                            value={rowsPerPage}
                            onChange={(e)=>setRowsPerPage(Number(e.target.value))}
                        >
                            {rowsPerPageOptions.map(n=> <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>

                    <nav aria-label="Page navigation">
                        <ul className="pagination mb-0">
                            {paging?.links?.map((link, i) => (
                                <li key={i}
                                    className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={async ()=>{
                                            if (!link.url) return;
                                            try {
                                                const res = await api.get(link.url);
                                                setList(res.data?.data ?? []);
                                                setPaging(res.data ?? null);
                                                setSelectedIds([]); // reset chọn khi trang thay đổi
                                            } catch (e) {
                                                console.error(e?.response?.data ?? e);
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{__html: link.label}}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
}
