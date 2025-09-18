import {InManageLayout} from "../../components/InManageLayout";
import {useEffect, useMemo, useState} from "react";
import {CategoryService} from "../../services/CategoryService";
import {API_URL} from "../../utils/Global";
import {ProductService} from "../../services/ProductService";
import {ModalCustom} from "../../components/ModalCustom";
import * as bootstrap from "bootstrap";
import {FormatDate} from "../../utils/FormatDate";

export function Product() {
    const [categories, setCategories] = useState([]);
    const [reloadKey, setReloadKey] = useState(0);
    const [editData, setEditData] = useState(null);

    // load categories 1 lần
    useEffect(() => {
        (async () => {
            const res = await CategoryService.getCategories();
            setCategories(res.data ?? []);
        })();
    }, []);

    // options cho filter & modal, memo để không tính lại nhiều lần
    const categoryOptions = useMemo(() => ([
        { label: "All", value: "" },
        ...categories.map(c => ({ label: c.name, value: String(c.id) }))
    ]), [categories]);

    // ========== CẤU HÌNH InManageLayout (refactor) ==========
    // search theo name + category.name
    const searchableFields = ["name", "category.name"];

    // filter theo category
    const filters = [
        {
            name: "category",
            label: "Category",
            options: categoryOptions,
            predicate: (item, v) => String(item?.category?.id ?? "") === String(v),
        },
    ];

    // sort theo price & newest
    const sorts = [
        { label: "Price ↑", value: "price_asc",
            comparator: (a,b)=> Number(a?.price??0) - Number(b?.price??0) },
        { label: "Price ↓", value: "price_desc",
            comparator: (a,b)=> Number(b?.price??0) - Number(a?.price??0) },
        { label: "Newest", value: "newest",
            comparator: (a,b)=> new Date(b?.created_at??0) - new Date(a?.created_at??0) },
    ];

    // ========== CRUD handlers ==========
    const handleDelete = async (selectedIds=[]) => {
        if (!selectedIds.length) return;
        if (!window.confirm(`Delete ${selectedIds.length} products?`)) return;
        try {
            await Promise.all(selectedIds.map(id => ProductService.deleteProduct(id)));
            alert("Delete successful!");
            setReloadKey(k => k+1);
        } catch (e) {
            console.error(e);
            alert("Delete failed ❌");
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await ProductService.getProductById(id);
            setEditData({
                ...res,
                category_id: res?.category?.id ?? ""
            });
            const el = document.getElementById("productModalToEdit");
            if (el) bootstrap.Modal.getOrCreateInstance(el).show();
        } catch (e) {
            console.error(e);
            alert("Load product failed ❌");
        }
    };

    const submitEdit = async (formData) => {
        try {
            const res = await ProductService.updateProduct(editData.id, formData);
            alert(res.message ?? "Updated!");
            setReloadKey(k => k+1);
        } catch (e) {
            console.error(e);
            alert("Update failed ❌");
        }
    };

    const handleAddNew = () => {
        const el = document.getElementById("productModalToAdd");
        if (el) bootstrap.Modal.getOrCreateInstance(el).show();
    };

    const submitCreate = async (formData) => {
        try {
            const res = await ProductService.createProduct(formData);
            alert(res.message ?? "Created!");
            setReloadKey(k => k+1);
        } catch (e) {
            console.error(e);
            alert("Create failed ❌");
        }
    };

    // fields cho Modal (options category cập nhật theo state)
    const modalFieldsSetting = [
        { name: "name", label: "Product Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
        { name: "price", label: "Price (VND)", type: "number", defaultValue: 0 },
        { name: "stock", label: "Stock Quantity", type: "number", defaultValue: 0 },
        {
            name: "status", label: "Status", type: "select",
            options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" }
            ],
            defaultValue: "ACTIVE"
        },
        {
            name: "category_id", label: "Category", type: "select",
            options: categories.map(item => ({ label: item.name, value: item.id })),
            defaultValue: categories[0]?.id ?? ""
        }
    ];

    const theadSetting = ["Name","Category","Price","Stock","Status","Created at","Updated at","Action"];

    return (
        <div className="d-flex flex-column">
            <h3><strong>List Product</strong></h3>

            <InManageLayout
                key={reloadKey}
                getApi={`${API_URL}/products`}
                theadSetting={theadSetting}
                // cấu hình tái sử dụng ↓↓↓
                searchableFields={searchableFields}
                filters={filters}
                sorts={sorts}
                idAccessor="id"
                // CRUD
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleAddNew={handleAddNew}
                // render mỗi dòng
                renderRow={(item) => (
                    <>
                        <td>{item.name}</td>
                        <td>{item.category?.name ?? "N/A"}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.status}</td>
                        <td>{FormatDate(item.created_at)}</td>
                        <td>{FormatDate(item.updated_at)}</td>
                    </>
                )}
            />

            <ModalCustom
                id="productModalToEdit"
                title="Edit Product"
                fields={modalFieldsSetting}
                onSubmit={submitEdit}
                editData={editData}
            />

            <ModalCustom
                id="productModalToAdd"
                title="Add New Product"
                fields={modalFieldsSetting}
                onSubmit={submitCreate}
            />
        </div>
    );
}
