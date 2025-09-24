import {ActionBar} from "../../components2/ActionBar";
import {CustomTable} from "../../components2/CustomTable";
import {CustomPagination} from "../../components2/CustomPagination";
import {useCrudList} from "../../hooks/useCrudList";
import {CategoryService} from "../../services/AllService";
import {FormatDate} from "../../utils/FormatDate";
import {Modal} from "bootstrap";
import {useState} from "react";

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
        const modalEl = document.getElementById("productModal");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function handleSave(formData) {
        try {
            if (editData) {
                let res = await CategoryService.update(editData.id, formData);
                alert(res.message);
            } else {
                let res = await CategoryService.create(formData);
                alert(res.message);
            }
            setEditData(null);
            setFilters(prev => ({...prev})); // refresh list
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    function handleAddBtn() {
        setEditData(null);
        const modalEl = document.getElementById("productModal");
        const modal = new Modal(modalEl);
        modal.show();
    }


    return (
        <div className={"d-flex flex-column p-3"}>
            <h4 className="fw-bold">Product List</h4>
            <div className="border p-3 bg-light rounded-2 d-flex flex-column gap-2">
                <ActionBar
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
                                           onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIds(prevState => [...prevState, item.id]);
                                                }else {
                                                    setSelectedIds(prev => prev.filter(id => id !== item.id));
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