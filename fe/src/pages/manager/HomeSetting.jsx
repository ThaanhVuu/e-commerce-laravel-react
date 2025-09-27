// noinspection JSCheckFunctionSignatures

import {CustomTable} from "../../components2/CustomTable";
import {useCrudList} from "../../hooks/useCrudList";
import {SettingBanner, SettingCollection, SettingGallery} from "../../services/AllService";
import {ActionBar} from "../../components2/ActionBar";
import {CustomPagination} from "../../components2/CustomPagination";
import {ModalCustom} from "../../components/ModalCustom";
import {RenderImageSection} from "../../components2/RenderImageSection";
import {useState} from "react";
import {Modal} from "bootstrap";
import {toast} from "react-toastify";

export function HomeSetting() {
    // --- State Banner ---
    const [editBanner, setEditBanner] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const {data, paging, setFilters} = useCrudList(SettingBanner, {page: 1, limit: 10});

    // --- Pagination handlers ---
    function onPageChange(newPage) {
        setFilters(prev => ({...prev, page: newPage}));
    }

    // --- Modal Add/Edit Banner ---
    function handleBannerAddBtn() {
        setEditBanner(null);
        const modalEl = document.getElementById("bannerModal");
        new Modal(modalEl).show();
    }

    function handleBannerEditBtn(item) {
        setEditBanner(item);
        const modalEl = document.getElementById("bannerModal");
        new Modal(modalEl).show();
    }

    // --- Save form (Banner) ---
    async function handleSave(formData) {
        try {
            if (editBanner) {
                await SettingBanner.update(editBanner.id, formData);
            } else {
                await SettingBanner.create(formData);
            }
            toast.success("Successful!");
            setEditBanner(null);
            setFilters(prev => ({...prev})); // refresh list
        } catch (err) {
            console.error("Save error:", err);
        }
    }

    // --- Delete nhiều Banner ---
    async function handleBannerDeleteBtn() {
        if (selectedIds.length === 0) {
            toast.warn("Please select at least one product to delete!");
            return;
        }
        if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) return;

        try {
            await Promise.all(selectedIds.map(id => SettingBanner.remove(id)));
            setSelectedIds([]);                // reset selected
            setFilters(prev => ({...prev}));   // reload list
            toast.success("Deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            toast.warn("Delete failed!");
        }
    }


    // ======================================Gallery===============================
    // --- State Gallery ---
    const [gallerySelectedIds, setGallerySelectedIds] = useState([]);

    const {
        data: dataGallery,
        paging: pagingGallery,
        setFilters: setFiltersGallery
    } = useCrudList(SettingGallery, {page: 1, limit: 10});

    const [editGallery, setEditGallery] = useState()

    function onPageChangeGallery(newPage) {
        setFiltersGallery(prev => ({...prev, page: newPage}));
    }

    function handleGalleryEditBtn(item) {
        setEditGallery(item);
        const modalEl = document.getElementById("galleryModal");
        new Modal(modalEl).show();
    }

    function addNewGallery() {
        setEditGallery(null);
        const modalEl = document.getElementById("galleryModal");
        new Modal(modalEl).show();
    }

    async function deleteGallery() {
        if (gallerySelectedIds.length === 0) {
            toast.warn("Please select at least one product to delete!");
            return;
        }
        if (!window.confirm(`Are you sure you want to delete ${gallerySelectedIds.length} products?`)) return;

        try {
            await Promise.all(gallerySelectedIds.map(id => SettingGallery.remove(id)));
            setGallerySelectedIds([]);                // reset selected
            setFiltersGallery(prev => ({...prev}));   // reload list
            toast.success("Deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Delete failed!");
        }
    }

    async function handleGallerySubmit(formData) {
        try {
            if (editGallery) {
                await SettingGallery.update(editGallery.id, formData);
            } else {
                await SettingGallery.create(formData);
            }
            toast.success("Successful!");
            setEditGallery(null);
            setFiltersGallery(prev => ({...prev})); // reload Gallery list
        } catch (err) {
            console.error("Save error:", err);
            toast.error("Save failed!");
        }
    }

    // eslint-disable-next-line no-lone-blocks
    /** ==================== Collection ==================== */
    const [collectionSelectedIds, setCollectionSelectedIds] = useState([]);
    const [collectionEdit, setCollectionEdit] = useState(null);

    const {
        data: dataCollection,
        setFilters: setFiltersCollection
    } = useCrudList(SettingCollection, {page: 1, limit: 10});

    async function handleEditCollectionBtn(editform) {
        setCollectionEdit(editform);
        const modalEl = document.getElementById("editCollection");
        new Modal(modalEl).show();
    }

    async function submitFeatureCollection(formData) {
        try {
            console.log(formData);
            let res = await SettingCollection.update(collectionEdit.id, formData);
            console.log(res)
            toast.success("Successful!");
            setCollectionEdit(null);
            setFiltersCollection(prev => ({...prev})); // reload list
        } catch (err) {
            console.error("Save error:", err);
            toast.error("Save failed!");
        }
    }

    return (
        <div className="p-3 border" style={{width: "auto", maxHeight: "690px", overflowY: "auto"}}>

            {/** ==================== Banner ==================== */}
            <div className="gap-2 d-flex flex-column">
                <ModalCustom
                    id="bannerModal"
                    title={editBanner ? "Edit Banner Image" : "Add Banner Image"}
                    fields={[
                        {name: "name", label: "Name", type: "text"},
                        {name: "img_url", label: "Image Url", type: "text"},
                        {
                            name: "status", label: "Status", type: "select", options: [
                                {label: "Active", value: "ACTIVE"},
                                {label: "Inactive", value: "INACTIVE"}
                            ]
                        }
                    ]}
                    onSubmit={handleSave}
                    editData={editBanner}
                    renderthing={(item) => (
                        <div>
                            <hr/>
                            <h5>Image:</h5>
                            <img src={item.img_url} alt={item.name} width="1000px"
                                 className="img-fluid rounded"
                                 style={{maxHeight: "1000px", objectFit: "contain"}}/>
                            <hr/>
                        </div>
                    )}
                    width="1000px"
                />

                <h3>Home Banner Image</h3>
                <ActionBar handleAddBtn={handleBannerAddBtn} handleDeleteBtn={handleBannerDeleteBtn}/>

                <CustomTable
                    theadFields={['Name', 'Image', 'Status', 'Action']}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    data={data}
                    renderRow={() => (
                        <RenderImageSection
                            data={data}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                            onEdit={handleBannerEditBtn}
                        />
                    )}
                />

                <CustomPagination paging={paging} rowPerPageDisplay={false} onPageChange={onPageChange}/>
            </div>

            <hr/>

            {/** ==================== Gallery ==================== */}
            <div className="gap-2 d-flex flex-column">
                <ModalCustom
                    id="galleryModal"
                    title={editGallery ? "Edit Gallery Image" : "Add Gallery Image"}
                    fields={[
                        {name: "name", label: "Name", type: "text"},
                        {name: "img_url", label: "Image Url", type: "text"},
                        {
                            name: "status", label: "Status", type: "select", options: [
                                {label: "Active", value: "ACTIVE"},
                                {label: "Inactive", value: "INACTIVE"}
                            ]
                        }
                    ]}
                    onSubmit={handleGallerySubmit}
                    editData={editGallery}
                    renderthing={(item) => (
                        <div>
                            <hr/>
                            <h5>Image:</h5>
                            <img src={item.img_url} alt={item.name} width="1000px"
                                 className="img-fluid rounded"
                                 style={{maxHeight: "1000px", objectFit: "contain"}}/>
                            <hr/>
                        </div>
                    )}
                    width="1000px"
                />

                <h3>Gallery Image</h3>
                <ActionBar
                    handleAddBtn={addNewGallery}
                    handleDeleteBtn={deleteGallery}
                />

                <CustomTable
                    theadFields={['Name', 'Image', 'Status', 'Action']}
                    selectedIds={gallerySelectedIds}
                    setSelectedIds={setGallerySelectedIds}
                    data={dataGallery}
                    renderRow={() => (
                        <RenderImageSection
                            data={dataGallery}
                            selectedIds={gallerySelectedIds}
                            setSelectedIds={setGallerySelectedIds}
                            onEdit={handleGalleryEditBtn} // 👈 có thể làm hàm riêng cho Gallery
                        />
                    )}
                />

                <CustomPagination paging={pagingGallery} rowPerPageDisplay={false} onPageChange={onPageChangeGallery}/>
            </div>

            {/*    ===========================Feature collection=======================*/}
            <div>
                <hr/>
                <h3>Feature Collection Image</h3>

                <ModalCustom
                    onSubmit={submitFeatureCollection}
                    editData={collectionEdit}
                    fields={[
                        {name: "name", label: "Name", type: "text"},
                        {name: "img_url", label: "Image Url", type: "text"},
                        {
                            name: "status", label: "Status", type: "select", options: [
                                {label: "Active", value: "ACTIVE"},
                                {label: "Inactive", value: "INACTIVE"}
                            ]
                        }
                    ]}
                    id={"editCollection"}
                    title={"Edit Feature Collection Image"}
                    width="1000px"
                    renderthing={(item) => (
                        <div>
                            <hr/>
                            <h5>Image:</h5>
                            <img src={item.img_url} alt={item.name} width="1000px"
                                 className="img-fluid rounded"
                                 style={{maxHeight: "1000px", objectFit: "contain"}}/>
                            <hr/>
                        </div>
                    )}
                />

                <CustomTable
                    data={dataCollection}
                    theadFields={['Name', 'Image', 'Status', 'Action']}
                    renderRow={() => (
                        <RenderImageSection
                            data={dataCollection}
                            selectedIds={collectionSelectedIds}
                            setSelectedIds={setCollectionSelectedIds}
                            onEdit={handleEditCollectionBtn}
                        />
                    )}
                />
            </div>
        </div>
    );
}
