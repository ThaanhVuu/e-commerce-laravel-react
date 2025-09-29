import {ActionBar} from "../../components2/ActionBar";
import {CustomTable} from "../../components2/CustomTable";
import {CustomPagination} from "../../components2/CustomPagination";
import {useCrudList} from "../../hooks/useCrudList";
import {CategoryService} from "../../services/AllService";
import {FormatDate} from "../../utils/FormatDate";
import {Modal} from "bootstrap";
import {useState} from "react";
import {ModalCustom} from "../../components/ModalCustom";
import {toast} from "react-toastify";
import Swal from "sweetalert2";

export function Category() {
    const [editData, setEditData] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const theadFields = [
        "Name", "Description", "Image", "Created at", "Updated at", "Action"
    ];

    const {data, paging, filters, setFilters} = useCrudList(CategoryService,
        {
            page: 1,
            limit: 10,
            search: "",
        })

    function handleEditBtn(item) {
        setEditData(item);
        const modalEl = document.getElementById("category");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function handleSave(formData) {
        try {
            if (editData) {
                let res = await CategoryService.update(editData.id, formData);
                toast.success(res.data.message);
            } else {
                let res = await CategoryService.create(formData);
                toast.success(res.data.message);
            }
            setEditData(null);
            setFilters(prev => ({...prev})); // refresh list
        } catch (err) {
            toast.error(err.data.response.message)
            console.error("Save error:", err);
        }
    }

    function handleAddBtn() {
        setEditData(null);
        const modalEl = document.getElementById("category");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function handleDelete(){
        if (selectedIds.length === 0) {
            toast.warn("Please select at least one category to delete!");
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${selectedIds.length} categories`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (!result) return;

        try {
            // chạy song song tất cả API delete
            await Promise.all(
                selectedIds.map(id => CategoryService.remove(id))
            );

            // reset danh sách chọn
            setSelectedIds([]);

            // reload list
            setFilters(prev => ({ ...prev }));

            toast.success("Deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            toast.error(err.data.response.message);
        }
    }

    const cateFieldsModal = [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text"},
        { name: "img_url", label: "Image URL", type: "text" },
    ];


    return (
        <div className={"d-flex flex-column p-3"}>
            <h4 className="fw-bold">Category List</h4>
            <div className="border p-3 bg-light rounded-2 d-flex flex-column gap-2">
                <ModalCustom
                    id={"category"}
                    editData={editData}
                    onSubmit={handleSave}
                    title={ editData ? "Edit Category" : "Add Category"}
                    fields={cateFieldsModal}
                />
                <ActionBar
                    handleDeleteBtn={handleDelete}
                    handleAddBtn={handleAddBtn}
                    filters={filters}
                    setFilters={setFilters}
                />

                <CustomTable
                    theadFields={theadFields}
                    data={data}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    renderRow={() => (
                        data.map(item => (
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
                                <td>{item.description}</td>
                                <td><img src={item.img_url} alt={item.name}
                                         style={{objectFit: "fill", width: "60px", height: "auto"}}
                                /></td>
                                <td>{FormatDate(item.created_at)}</td>
                                <td>{FormatDate(item.updated_at)}</td>
                                <td>
                                    <button className={"btn btn-primary"} onClick={() => handleEditBtn(item)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    )}
                />

                <CustomPagination
                    paging={paging}
                />
            </div>
        </div>
    );
}