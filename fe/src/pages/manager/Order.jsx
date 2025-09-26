import {ModalCustom} from "../../components/ModalCustom";
import {CustomTable} from "../../components2/CustomTable";
import {CustomPagination} from "../../components2/CustomPagination";
import {useCrudList} from "../../hooks/useCrudList";
import {OrderService} from "../../services/AllService";
import {ActionBar} from "../../components2/ActionBar";
import {useState} from "react";
import {FormatDate} from "../../utils/FormatDate";
import {Modal} from 'bootstrap';

export function Order() {
    const [editData, setEditData] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    const modalFields = [
        {
            name: "status", label: "Status", type: "select", options: [
                {label: "Pending", value: "PENDING"},
                {label: "Shipped", value: "SHIPPED"},
                {label: "Confirmed", value: "CONFIRMED"},
                {label: "Completed", value: "COMPLETED"},
                {label: "Cancelled", value: "CANCELLED"},
            ]
        }
    ]

    const {data, filters, setFilters, paging, update} = useCrudList(OrderService, {
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

    async function handleSave(formData) {
        try {
            let res = await update(editData.id, formData);
            console.log(res);
            setEditData(null); // reset sau khi lưu
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    function handleEdit(row) {
        setEditData(row);
        const modelEl = document.getElementById("orderModal");
        const modal = new Modal(modelEl);
        modal.show();
    }

    function handleView(row){
        setOrderDetails(row.order_details);
        const modalEl = document.getElementById("viewModal");
        const modal = new Modal(modalEl);
        modal.show();
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

                {/* Modal View OrderDetails */}
                <div className="modal fade" id="viewModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {orderDetails && orderDetails.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {orderDetails.map((detail) => (
                                            <tr key={detail.id}>
                                                <td>{detail.product?.name}</td>
                                                <td>{detail.quantity}</td>
                                                <td>{Number(detail.price).toLocaleString()}$</td>
                                                <td>
                                                    <img
                                                        src={detail.product?.img_url}
                                                        alt={detail.product?.name}
                                                        style={{width: "60px", height: "60px", objectFit: "cover"}}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No order details available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

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
                                        <button className="btn btn-primary" onClick={() => handleEdit(row)}>Edit</button>
                                        <button className="btn btn-warning" onClick={() => handleView(row)}>View</button>
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