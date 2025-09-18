import {InManageLayout} from "../../components/InManageLayout";
import {useState} from "react";
import {API_URL} from "../../utils/Global";
import {FormatDate} from "../../utils/FormatDate";
import {ModalCustom} from "../../components/ModalCustom";
import * as bootstrap from 'bootstrap';
import {CategoryService} from "../../services/CategoryService";

export function Category() {
    const [key, setKey] = useState(0);
    const [editData, setEditData] = useState(null);

    const settingFilter = [
        {label: "None", value: ""}
    ];

    const settingFilter2 = [
        {label: "None", value: ""}
    ];

    const theadSetting = [
        "Name", "Description", "Img Url", "Created at", "Updated at", "Action"
    ];

    const fieldModal = [
        {name: "name", label: "Name", type: "text"},
        {name: "description", label: "Description", type: "text"},
        {name: "img_url", label: "Image URL", type: "text"},
    ]

    const handleDelete = async (selectedIds) => {
        if (selectedIds.length === 0) return;

        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) return;

        try {
            await Promise.all(selectedIds.map(id => CategoryService.delete(id)));
            alert("Delete successful!");
        } catch (err) {
            console.log(err);
            alert("Delete failed ❌");
        }
    }

    async function handleEdit(id) {
        try {
            let res = await CategoryService.getById(id);
            setEditData(res);

            let element = document.getElementById("editCate");
            if (element) {
                const modal = bootstrap.Modal.getOrCreateInstance(element); // an toàn, tái sử dụng instance
                modal.show();
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong ❌");
        }
    }

    async function submitEdit(formData) {
        let res = await CategoryService.update(editData.id, formData)
        alert(res.message);
        setKey((prev) => prev + 1);
    }

    async function handleAdd() {
        let element = document.getElementById("addCate");
        if (element) {
            const modal = bootstrap.Modal.getOrCreateInstance(element); // an toàn, tái sử dụng instance
            modal.show();
        }
    }

    async function submitAdd(formData) {
        try {
            await CategoryService.create(formData);
            alert("Create success!");
            setKey((prev) => prev + 1);
        } catch (err) {
            alert(err.message)
        }
    }

    const sorts = [
        { label: "None", value: ""}
    ]

    const filters = [
        {name: "", label: "None"}
    ]

    return (
        <>
            <InManageLayout
                keyReloadTable={key}
                getApi={`${API_URL}/categories`}
                theadSetting={theadSetting}
                searchableFields={["name"]}
                idAccessor={"id"}
                sorts={sorts}
                filters={filters}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleAddNew={handleAdd}
                renderRow={(item) => (
                    <>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td><img src={item.img_url}
                                 style={{
                                     width: "100px",
                                     height: "100px",
                                     objectFit: "fill"   // hoặc "contain"
                                 }}
                                 alt={item.name}/></td>
                        <td>{FormatDate(item.created_at)}</td>
                        <td>{FormatDate(item.updated_at)}</td>
                    </>
                )}
            />

            <ModalCustom
                id={"addCate"}
                title={"Add New Category"}
                fields={fieldModal}
                onSubmit={submitAdd}
            />

            <ModalCustom
                id={"editCate"}
                title={"Edit Category"}
                fields={fieldModal}
                onSubmit={submitEdit}
                editData={editData}
            />
        </>
    );
}