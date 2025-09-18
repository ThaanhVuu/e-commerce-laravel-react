// pages/Order.jsx
import {InManageLayout} from "../../components/InManageLayout";
import {API_URL} from "../../utils/Global";
import {FormatDate} from "../../utils/FormatDate";
import {ProductService} from "../../services/ProductService";
import {useState} from "react";
import {OrderService} from "../../services/OrderService";
import * as bootstrap from "bootstrap";
import {ModalCustom} from "../../components/ModalCustom";

export function Order(){
    const [key, setKey] = useState(0);
    const [editData, setEditData] = useState(null);


    const theadSetting = ["Id","Username","Total price","Status","Created at","Updated at","Action"];

    const filters = [
        {
            name: "status",
            label: "Status",
            options: [
                {label:"All", value:""},
                {label:"Pending", value:"PENDING"},
                {label:"Confirmed", value:"CONFIRMED"},
                {label:"Shipped", value:"SHIPPED"},
                {label:"Completed", value:"COMPLETED"},
                {label:"Cancelled", value:"CANCELLED"},
            ],
            predicate: (item, v) => item?.status === v,
        },
    ];

    const sorts = [
        { label: "Total ↑", value: "total_asc", comparator: (a,b)=> Number(a?.total_price??0)-Number(b?.total_price??0) },
        { label: "Total ↓", value: "total_desc", comparator: (a,b)=> Number(b?.total_price??0)-Number(a?.total_price??0) },
        { label: "Newest", value: "newest", comparator: (a,b)=> new Date(b?.created_at??0)-new Date(a?.created_at??0) },
    ];

    const modalFieldsSetting = [
        { name: "total_price", label: "Total price", type: "number" },
        { name: "status", label: "Status", type: "select",
            options: [
                { label: "Confirmed", value: "CONFIRMED" },
                { label: "Shipped", value: "SHIPPED" },
                { label: "Canceled", value: "CANCELED"},
                { label: "Completed", value: "COMPLETED"},
            ],},
    ];

    async function handleDelete(ids){
        if (!ids.length) return;
        if (!window.confirm(`Delete ${ids.length} products?`)) return;
        try {
            await Promise.all(ids.map(id => OrderService.delete(id)));
            alert("Delete successful!");
            setKey(k => k+1);
        } catch (e) {
            console.error(e);
            alert("Delete failed ❌");
        }
    }

    const handleEdit = async (id) => {
        try {
            const res = await OrderService.getById(id);
            console.log(res);
            setEditData(res);
            const el = document.getElementById("orderModal");
            if (el) bootstrap.Modal.getOrCreateInstance(el).show();
        } catch (e) {
            console.error(e);
            alert("Load product failed ❌");
        }
    };

    const submitEdit = async (formData) => {
        try {
            const res = await OrderService.update(editData.id, formData);
            alert(res.message ?? "Updated!");
            setKey(k => k+1);
        } catch (e) {
            console.error(e);
            alert("Update failed ❌");
        }
    };

    const handleAddNew = () => {
        alert("Unable to perform the action");
    };

    return (
        <section className="d-flex flex-column">
            <h3><strong>List Order</strong></h3>

            <InManageLayout
                keyReloadTable={key}
                getApi={`${API_URL}/orders`}
                theadSetting={theadSetting}
                searchableFields={["id","user.username"]}      // search chuẩn cho Orders
                filters={filters}
                sorts={sorts}
                idAccessor="id"
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleAddNew={handleAddNew}
                renderRow={(item)=>(
                    <>
                        <td>{item.id}</td>
                        <td>{item.user?.username ?? "N/A"}</td>
                        <td>{item.total_price}</td>
                        <td>{item.status}</td>
                        <td>{FormatDate(item.created_at)}</td>
                        <td>{FormatDate(item.updated_at)}</td>
                    </>
                )}
                renderOtherButton={(item) => (
                    <button className={"btn btn-success"}
                    >View</button>
                )}
            />

            <ModalCustom
                id="orderModal"
                title="Edit Order"
                fields={modalFieldsSetting}
                onSubmit={submitEdit}
                editData={editData}
            />
        </section>
    );
}
