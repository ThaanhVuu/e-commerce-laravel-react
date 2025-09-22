// noinspection JSCheckFunctionSignatures

import {CustomTable} from "../../components2/CustomTable";
import {useCrudList} from "../../hooks/useCrudList";
import {SettingHomeService} from "../../services/AllService";
import {ActionBar} from "../../components2/ActionBar";
import {CustomPagination} from "../../components2/CustomPagination";
import {ModalCustom} from "../../components/ModalCustom";
import {useState} from "react";
import {Modal} from "bootstrap";

export function HomeSetting() {

    const [editBanner, setEditBanner] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);

    const {data, paging, setFilters}
        = useCrudList(SettingHomeService, {
        page: 1,
        limit: 10,
    });

    function onPageChange(newPage) {
        setFilters(prev => ({
            ...prev,
            page: newPage,
        }));
    }

    const bannerFields = [
        {name: "name", label: "Name", type: "text"},
        {name: "img_url", label: "Image Url", type: "text"},
        {
            name: "status", label: "Status", type: "select", options: [
                {label: "Active", value: "ACTIVE"},
                {label: "Inactive", value: "INACTIVE"}
            ]
        }
    ]

    function handleBannerAddBtn() {
        setEditBanner(null);
        const modalEl = document.getElementById("bannerModal");
        const modal = new Modal(modalEl);
        modal.show();
    }

    function handleBannerEditBtn(item) {
        setEditBanner(item);
        const modalEl = document.getElementById("bannerModal");
        const modal = new Modal(modalEl);
        modal.show();
    }

    async function handleSave(formData) {
        try {
            if (editBanner) {
                await SettingHomeService.update(editBanner.id, formData);
                alert("Successful!");
            } else {
                await SettingHomeService.create(formData);
                alert("Successful!");
            }
            setEditBanner(null);
            setFilters(prev => ({ ...prev })); // refresh list
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    function handleDeleteBtn() {

    }


    return (
        <div className={"p-3"}>
            <ModalCustom
                id="bannerModal"
                title={editBanner ? "Edit Banner Image" : "Add Banner Image"}
                fields={bannerFields}
                onSubmit={handleSave}
                editData={editBanner}
                renderthing={(item) => (
                    <div>
                        <hr/>
                        <h5>Image:</h5>
                        <img src={item.img_url} alt={item.name} width={"1000px"} height={"auto"}
                             className="img-fluid rounded"
                             style={{maxHeight: "1000px", objectFit: "contain"}}
                        />
                        <hr/>
                    </div>
                )}
                width={"1000px"}
            />

            <div className={"gap-2 d-flex flex-column"}>
                <h3>Home Banner Image</h3>
                <ActionBar
                    handleAddBtn={handleBannerAddBtn}
                    handleDeleteBtn={handleDeleteBtn}
                />

                <CustomTable
                    theadFields={['Name', 'Image', 'Status', 'Action']}
                    data={data}
                    renderRow={() => (
                        data.map(data => (
                            <tr key={data.id}>
                                <td><input
                                    type={"checkbox"}
                                    checked={selectedIds.includes(data.id)}
                                    className={"form-check-input"}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedIds(prev => [...prev, data.id]);
                                        } else {
                                            setSelectedIds(prev => prev.filter(id => id !== data.id));
                                        }
                                    }}
                                /></td>
                                <td>{data.name}</td>
                                <td>
                                    <img
                                        src={data.img_url}
                                        alt={data.name}
                                        width={"200px"} height={"auto"}
                                        style={{objectFit: "fill"}}
                                    />
                                </td>
                                <td>{data.status}</td>
                                <td>
                                    <button className={"btn btn-primary"}
                                            onClick={() => handleBannerEditBtn(data)}
                                    >Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                />

                <CustomPagination
                    paging={paging}
                    rowPerPageDisplay={false}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}