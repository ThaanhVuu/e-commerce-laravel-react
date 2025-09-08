import {ActionBar} from "../../components/ActionBar";
import {CustomTable} from "../../components/CustomTable";
import {useEffect, useState} from "react";
import {ProfileService} from "../../services/ProfileService";
import {CustomPaging} from "../../components/CustomPaging";
import {FormatDate} from "../../utils/FormatDate";
import {ModalCustom} from "../../components/ModalCustom";
import {Modal} from "bootstrap";

export function Profile() {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [response, setResponse] = useState(null);
    const [rowPerPage, setRowPerPage] = useState(5);
    const [selectedProfileId, setSelectedProfileId] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [filterGender, setFilterGender] = useState("");
    const [profileEdit, setProfileEdit] = useState(null);

    useEffect(() => {
        (async () => {
            await loadPage(rowPerPage, 1);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPage = async (limit = rowPerPage, page = 1) => {
        const res = await ProfileService.getProfile(limit, page);
        setResponse(res);
        setProfiles(res.data);
        setFilteredProfiles(res.data);
        setCurrentPage(res.current_page);
    };

    const handleSubmitEdit = async (form) => {
        try {
            await ProfileService.update(
                form.full_name,
                form.phone,
                form.address,
                form.gender,
                form.dob,
                profileEdit.id
            );
            alert(`Update profile for user: ${profileEdit.user.username} successful!`);
            await loadPage(rowPerPage, currentPage); // reload lại danh sách
        } catch (error) {
            alert(error.message);
            console.log("edit profile failed: " + error);
        }
    };

    const handleEditBtn = async (profile) => {
        try {
            const res = await ProfileService.getById(profile.id);
            setProfileEdit(res);
        } catch (error) {
            alert(error.message);
            console.log("get profile by ID error: " + error)
        }

        const modalEl = document.getElementById("editModal");
        let modal = Modal.getInstance(modalEl);
        if (!modal) modal = new Modal(modalEl);
        modal.show();
    }

    const handleDeleteBtn = async () => {
        const isConfirm = window.confirm(
            "Are you sure you want to delete the selected profiles?"
        );
        if (!isConfirm) return;

        await Promise.all(selectedProfileId.map((id) => ProfileService.delete(id)));
        setSelectedProfileId([]);
        await loadPage(rowPerPage, currentPage);
    }

    const applySearchAndFilter = (keyword, role, gender) => {
        let result = profiles;

        // Lọc theo keyword (username hoặc full_name)
        if (keyword && keyword !== "") {
            result = result.filter(
                (p) =>
                    p.user.username.toLowerCase().includes(keyword.toLowerCase()) ||
                    p.full_name.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        // Lọc theo role
        if (role && role !== "") {
            result = result.filter(
                (p) => p.user.role.toLowerCase() === role.toLowerCase()
            );
        }

        // Lọc theo gender
        if (gender && gender !== "") {
            result = result.filter(
                (p) => p.gender.toLowerCase() === gender.toLowerCase()
            );
        }
        setFilteredProfiles(result);
    };

    const handleSearchAction = (keyword) => {
        setSearchKeyword(keyword);
        applySearchAndFilter(keyword, filterRole, filterGender);
    };

    const handleFilterAction = (value) => {
        if (["ADMIN", "MANAGER", "USER"].includes(value)) {
            // chọn Role
            setFilterRole(value);
            applySearchAndFilter(searchKeyword, value, filterGender);
        } else if (["MALE", "FEMALE"].includes(value)) {
            // chọn Gender
            setFilterGender(value);
            applySearchAndFilter(searchKeyword, filterRole, value);
        } else {
            // chọn ALL
            setFilterRole("");
            setFilterGender("");
            applySearchAndFilter(searchKeyword, "", "");
        }
    };


    const filterSelectionSettingActionBar = [
        {label: "ADMIN", value: "ADMIN"},
        {label: "MANAGER", value: "MANAGER"},
        {label: "USER", value: "USER"},
        {label: "MALE", value: "MALE"},
        {label: "FEMALE", value: "FEMALE"},
    ];

    const headerTableSetting = [
        {header: "Username", accessor: (u) => u.user?.username},
        {header: "Role", accessor: (u) => u.user?.role},
        {header: "Full Name", accessor: "full_name"},
        {header: "Phone", accessor: "phone"},
        {header: "Address", accessor: "address"},
        {header: "Gender", accessor: "gender"},
        {header: "Date of birth", accessor: "dob"},
        {header: "Created at", accessor: (u) => FormatDate(u.created_at)},
        {header: "Updated at", accessor: (u) => FormatDate(u.updated_at)},
    ];

    const modalFields = [
        {label: "Full Name", name: "full_name", type: "text"},
        {label: "Phone", name: "phone", type: "text"},
        {label: "Address", name: "address", type: "text"},
        {
            label: "Gender",
            name: "gender",
            type: "radio",
            options: [
                {label: "Male", value: "MALE"},
                {label: "Female", value: "FEMALE"}
            ]
        },
        {label: "Date of birth", name: "dob", type: "date"},
    ];


    return (
        <div className="d-flex flex-column gap-3">
            {/* Header */}
            <div className="d-flex justify-content-between">
                <h3 className="fw-bold">Profile list</h3>
                {/*<button*/}
                {/*    data-bs-toggle="modal"*/}
                {/*    data-bs-target="#addModal"*/}
                {/*    className="btn btn-primary"*/}
                {/*>*/}
                {/*    Add*/}
                {/*</button>*/}
            </div>

            <div
                className="flex-grow-1 py-3 px-3 d-flex flex-column gap-2"
                style={{background: "#fff"}}
            >
                <ActionBar
                    filterSelectionSetting={filterSelectionSettingActionBar}
                    onDelete={handleDeleteBtn}
                    onSearch={handleSearchAction}
                    onFilter={handleFilterAction}
                />

                <CustomTable
                    list={filteredProfiles}
                    columns={headerTableSetting}
                    onSelectionChange={setSelectedProfileId}
                    handleEditBtn={handleEditBtn}
                />

                <CustomPaging
                    response={response}
                    onPageChange={(page) => loadPage(rowPerPage, page)}
                    rowSetting={{
                        value: rowPerPage,
                        onChange: (newLimit) => {
                            setRowPerPage(newLimit);
                            (async () => {
                                await loadPage(newLimit, 1);
                            })();
                        },
                    }}
                />

                <ModalCustom
                    id={'editModal'}
                    editData={profileEdit}
                    fields={modalFields}
                    title={profileEdit ? `Edit user: ${profileEdit.user.username}` : "Edit User"}
                    onSubmit={handleSubmitEdit}
                />
            </div>
        </div>
    )
}