// noinspection DuplicatedCode

import {HomeSetting} from "../../components2/HomeSetting";
import {useCrudList} from "../../hooks/useCrudList";
import {SettingGallery} from "../../services/AllService";
import {useState} from "react";
import Swal from "sweetalert2";
import {ModalCustom} from "../../components/ModalCustom";
import {Modal} from "bootstrap";
import {toast} from "react-toastify";

export function Gallery() {
    const {data, filters, setFilters, paging, update, create, remove, refresh} = useCrudList(SettingGallery);
    const [selectedIds, setSelectedIds] = useState([])
    const [editData, setEditData] = useState(null);

    async function onDelete() {
        if (selectedIds.length === 0) return;

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${selectedIds.length} banners`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (!result) return;

        let res = await Promise.all(selectedIds.map(id => remove(id)));
        console.log(selectedIds);
        setSelectedIds([]);
        await refresh();
        console.log(res);
        toast.success("Delete successful!");
    }

    const fields = [
        {name: "name", label: "Name", type: "text"},
        {name: "img_url", label: "Image Url", type: "text"},
        {
            name: "status", label: "Status", type: "select",
            options: [
                {label: "Active", value: "ACTIVE"},
                {label: "Inactive", value: "INACTIVE"}
            ]
        }
    ];

    function onAdd() {
        setEditData(null);
        const modalEl = document.getElementById("banner");
        const modal = new Modal(modalEl);
        modal.show();
    }

    function onEdit(item) {
        setEditData(item);
        const modalEl = document.getElementById("banner");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function onSave(formData) {
        try {
            let res;
            if (editData) {
                res = await update(editData.id, formData);
            } else {
                res = await create(formData);
            }
            setEditData(null);
            await refresh();
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div>
            <HomeSetting
                title={"Banner Images Manager"}
                data={data}
                theadFields={['Name', 'Image', 'Status']}
                paging={paging}
                filters={filters}
                setFilters={setFilters}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                onDelete={onDelete}
                onAdd={onAdd}
                onEdit={onEdit}
            />

            <ModalCustom
                id={"banner"}
                title={editData ? "Edit Banner" : "Add Banner"}
                editData={editData}
                fields={fields}
                onSubmit={onSave}
            />
        </div>
    )
}