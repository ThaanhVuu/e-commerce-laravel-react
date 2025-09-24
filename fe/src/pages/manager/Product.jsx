import {ActionBar} from "../../components2/ActionBar";
import {useCrudList} from "../../hooks/useCrudList";
import {CategoryService, ProductService} from "../../services/AllService";
import {useEffect, useState} from "react";
import {CustomTable} from "../../components2/CustomTable";
import {CustomPagination} from "../../components2/CustomPagination";
import {FormatDate} from "../../utils/FormatDate";
import {ModalCustom} from "../../components/ModalCustom";
import {Modal} from "bootstrap";

export function Product() {
    const [categories, setCategories] = useState([]);
    const [editData, setEditData] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);


    useEffect(() => {
        (async () => {
            let res = await CategoryService.getAll({limit: 1000});
            setCategories(res.data.data);
        })();
    }, []);

    const {data, filters, setFilters, paging}
        = useCrudList(ProductService, {
        page: 1,
        limit: 10,
        search: "",
        sort_by: "",
        sort_order: "",
        category_id: ""
    });

    const sortFields = [
        {label: "None", value: null},
        {label: "Price ↑", value: {sort_by: "price", sort_order: "desc"}},
        {label: "Price ↓", value: {sort_by: "price", sort_order: "asc"}},
        {label: "Name A→Z", value: {sort_by: "name", sort_order: "asc"}},
        {label: "Name Z→A", value: {sort_by: "name", sort_order: "desc"}},
    ];

    const filterFields = [
        {label: "All Categories", value: ""},
        ...categories.map(c => ({
            label: c.name,
            value: c.id
        }))
    ];

    const theadFields = [
        "Name", "Category", "Price", "Stock", "Status", "Image", "Description", "Created at", "Updated at", "Action"
    ]

    const productFields = [
        { name: "name", label: "Name", type: "text" },
        { name: "category_id", label: "Category", type: "select", options: categories.map(c => ({ label: c.name, value: c.id })) },
        { name: "price", label: "Price", type: "number" },
        { name: "stock", label: "Stock", type: "number" },
        { name: "status", label: "Status", type: "select", options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" }
            ]
        },
        { name: "img_url", label: "Image URL", type: "text" },
        { name: "description", label: "Description", type: "text" }
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

    function handleEditBtn(item) {
        setEditData(item);
        const modalEl = document.getElementById("productModal");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function handleSave(formData) {
        try {
            if (editData) {
                let res = await ProductService.update(editData.id, formData);
                alert(res.message);
            } else {
                let res = await ProductService.create(formData);
                alert(res.message);
            }
            setEditData(null);
            setFilters(prev => ({ ...prev })); // refresh list
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    function handleAddBtn(){
        setEditData(null);
        const modalEl = document.getElementById("productModal");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function handleDeleteBtn() {
        if (selectedIds.length === 0) {
            alert("Please select at least one product to delete!");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
            return;
        }

        try {
            // chạy song song tất cả API delete
            await Promise.all(
                selectedIds.map(id => ProductService.remove(id))
            );

            // reset danh sách chọn
            setSelectedIds([]);

            // reload list
            setFilters(prev => ({ ...prev }));

            alert("Deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed!");
        }
    }


    return (
        <section className="d-flex flex-column p-3">
            <h4 className="fw-bold">Product List</h4>
            <div className="border p-3 bg-light rounded-2 d-flex flex-column gap-2">
                <ActionBar
                    sortFields={sortFields}
                    filterFields={filterFields}
                    filters={filters}
                    setFilters={setFilters}
                    handleAddBtn={handleAddBtn}
                    handleDeleteBtn={handleDeleteBtn}
                />

                <CustomTable
                    data={data}
                    theadFields={theadFields}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    renderRow={() =>
                        data.map((item) => (
                            <tr key={item.id}>
                                <td><input type={"checkbox"} className={"form-check-input"}
                                           checked={selectedIds.includes(item.id)} // 🔑 sync với state
                                           onChange={(e) => {
                                               if (e.target.checked) {
                                                   setSelectedIds((prev) => [...prev, item.id]);
                                               } else {
                                                   setSelectedIds((prev) =>
                                                       prev.filter((id) => id !== item.id)
                                                   );
                                               }
                                           }}
                                /></td>
                                <td>{item.name}</td>
                                <td>{item.category?.name}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td>{item.status}</td>
                                <td>
                                    <img
                                        src={item.img_url}
                                        alt={item.name}
                                        width={"60px"} height={"auto"}
                                        style={{objectFit: "fill"}}
                                    />
                                </td>
                                <td>{item.description}</td>
                                <td>{FormatDate(item.created_at)}</td>
                                <td>{FormatDate(item.updated_at)}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditBtn(item)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                />


                <CustomPagination
                    paging={paging}
                    onPageChange={onPageChange}
                    onLimitChange={onLimitChange}
                />

                <ModalCustom
                    id="productModal"
                    title={editData ? "Edit Product" : "Add Product"}
                    fields={productFields}
                    onSubmit={handleSave}
                    editData={editData}
                />
            </div>
        </section>
    );
}
