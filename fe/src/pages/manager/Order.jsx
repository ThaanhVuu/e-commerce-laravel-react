import {ModalCustom} from "../../components/ModalCustom";
import {CustomTable} from "../../components2/CustomTable";
import {CustomPagination} from "../../components2/CustomPagination";
import {useCrudList} from "../../hooks/useCrudList";
import {OrderService} from "../../services/AllService";
import {ActionBar} from "../../components2/ActionBar";
import {useState} from "react";
import {FormatDate} from "../../utils/FormatDate";

export function Order() {
    const [editData, setEditData] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const modalFields = [
        {
            name: "status", label: "Status", type: "select", options: [
                {label: "Pending", value: "PENDING"}
            ]
        }
    ]

    const {data, filters, setFilters, paging, loading, refresh, update, remove} = useCrudList(OrderService, {
        limit: 10,
        page: 1,
        search: "",
        sort_by: "",
        sort_order: "",
        status: ""
    })

    const sortFields = [
        {label: "None", value: null},
        {label: "Price ↑", value: {sort_by: "total_price", sort_order: "desc"}},
        {label: "Price ↓", value: {sort_by: "total_price", sort_order: "asc"}},
        {label: "Newest", value: {sort_by: "created_at", sort_order: "asc"}},
        {label: "Oldest", value: {sort_by: "created_at", sort_order: "desc"}},
    ];

    const filterFields = [
        {label: "All", value: ""},
        {label: "Pending", value: "PENDING"},
        {label: "Confirmed", value: "CONFIRMED"},
        {label: "Shipping", value: "SHIPPED"},
        {label: "Completed", value: "COMPLETED"}
    ];

    function handleSave(formData) {

    }

    function onPageChange(newPage) {
        // noinspection JSCheckFunctionSignatures
        setFilters(prev => ({
            ...prev,
            page: newPage,
        }));
    }

    function onLimitChange(newLimit) {
        // noinspection JSCheckFunctionSignatures
        setFilters(prev => ({
            ...prev,
            limit: newLimit
        }))
    }

    return (
        <section className="d-flex flex-column p-3">
            <h4 className={"fw-bold"}>Order List</h4>
            <div className={"border p-3 bg-light rounded-2 d-flex flex-column gap-2"}>
                <ModalCustom
                    id={"orderModal"}
                    title={"Edit Order"}
                    editData={editData}
                    onSubmit={handleSave}
                    fields={modalFields}
                />
                <ActionBar
                    filters={filters}
                    setFilters={setFilters}
                    sortFields={sortFields}
                    filterFields={filterFields}
                    filterKey={"status"}
                />
                <CustomTable
                    data={data}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    theadFields={["ID", "Name of Customer", "Phone Number", "Status", "Order Value", "Created at", "Updated at", "Action"]}
                    renderRow={() =>
                        data.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={selectedIds.includes(row.id)} // 🔑 sync với state
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedIds((prev) => [...prev, row.id]);
                                            } else {
                                                setSelectedIds((prev) =>
                                                    prev.filter((id) => id !== row.id)
                                                );
                                            }
                                        }}
                                    />
                                </td>
                                <td>{row.id.slice(-12)}</td>
                                <td>{row.profile?.full_name || "N/A"}</td>
                                <td>{row.profile?.phone || "N/A"}</td>
                                <td>{row.status}</td>
                                <td>{Number(row.total_price).toLocaleString()}$</td>
                                <td>{FormatDate(row.created_at)}</td>
                                <td>{FormatDate(row.updated_at)}</td>
                                <td>
                                    <button className="btn btn-primary">Edit</button>
                                </td>
                            </tr>
                            )
                        )}
                />
                <CustomPagination paging={paging} onPageChange={onPageChange} onLimitChange={onLimitChange}/>
            </div>
        </section>
    );
}