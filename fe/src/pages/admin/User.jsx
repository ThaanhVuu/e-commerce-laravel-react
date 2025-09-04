import { useEffect, useState } from "react";
import { UserService } from "../../services/UserService";
import { CustomTable } from "../../components/CustomTable";
import { ActionBar } from "../../components/ActionBar";
import { CustomPaging } from "../../components/CustomPaging";
import { FormatDate } from "../../utils/FormatDate";
import { ModalCustom } from "../../components/ModalCustom";
import { Modal } from "bootstrap";

export function User() {
    // =========================
    // STATE
    // =========================
    const [editUser, setEditUser] = useState(null); // user đang được edit
    const [users, setUsers] = useState([]); // dữ liệu gốc
    const [filteredUsers, setFilteredUsers] = useState([]); // dữ liệu đã lọc
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [response, setResponse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(5);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [filterRole, setFilterRole] = useState("");

    // =========================
    // API HANDLERS
    // =========================
    const handleEditUser = async (user) => {
        try {
            let response = await UserService.getUserById(user.id);
            setEditUser(response);
            console.log(editUser);
        } catch (err) {
            alert(err.message);
            console.error("Add User Error:", err);
        }

        const modalEl = document.getElementById("editModal");
        let modal = Modal.getInstance(modalEl);
        if (!modal) modal = new Modal(modalEl);
        modal.show();
    };

    const loadPage = async (page = 1, limit = rowPerPage) => {
        const res = await UserService.getUserPaging(limit, page);
        setResponse(res);
        setUsers(res.data);
        setFilteredUsers(res.data); // ban đầu = gốc
        setCurrentPage(res.current_page);
    };

    // =========================
    // SEARCH + FILTER COMBO
    // =========================
    const applySearchAndFilter = (keyword, role) => {
        let result = users;

        // Lọc theo keyword
        if (keyword && keyword !== "") {
            result = result.filter((u) =>
                u.username.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        // Lọc theo role
        if (role && role !== "") {
            result = result.filter((u) =>
                u.role.toLowerCase().includes(role.toLowerCase())
            );
        }

        setFilteredUsers(result);
    };

    const handleSearchAction = (keyword) => {
        setSearchKeyword(keyword);
        applySearchAndFilter(keyword, filterRole);
    };

    const handleFilterAction = (role) => {
        setFilterRole(role);
        applySearchAndFilter(searchKeyword, role);
    };

    // =========================
    // ADD / EDIT / DELETE
    // =========================
    const handleAddUser = async (data) => {
        try {
            await UserService.create(data.username, data.password, data.role);
            alert(`Add user ${data.username} successful`);
            await loadPage(1);
        } catch (err) {
            alert(err.message);
            console.error("Add User Error:", err);
        }
    };

    const handleEditSubmit = async (data) => {
        try {
            await UserService.update(data.username, data.password, data.role, editUser.id);
            alert(`Update user ${data.username} successful`);
            await loadPage(currentPage);
        } catch (err) {
            alert(err.message);
            console.error("Update User Error:", err);
        }
    };

    async function handleDeleteBtn() {
        const isConfirm = window.confirm(
            "Are you sure you want to delete the selected users?"
        );
        if (!isConfirm) return;

        await Promise.all(selectedUserIds.map((id) => UserService.delete(id)));
        setSelectedUserIds([]);
        await loadPage(currentPage);
    }

    // =========================
    // EFFECTS
    // =========================
    useEffect(() => {
        (async () => {
            await loadPage(1);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =========================
    // SETTINGS
    // =========================
    const headerTableSetting = [
        { header: "Username", accessor: "username" },
        { header: "Role", accessor: "role" },
        { header: "Created at", accessor: (u) => FormatDate(u.created_at) },
        { header: "Updated at", accessor: (u) => FormatDate(u.updated_at) },
    ];

    const fieldsSettingModal = [
        { label: "Username", name: "username", type: "text" },
        { label: "Password", name: "password", type: "password" },
        {
            label: "Role",
            name: "role",
            type: "select",
            options: [
                { label: "USER", value: "USER" },
                { label: "ADMIN", value: "ADMIN" },
                { label: "MANAGER", value: "MANAGER" },
            ],
        },
    ];

    const filterSelectionSettingActionBar = [
        { label: "ADMIN", value: "ADMIN" },
        { label: "MANAGER", value: "MANAGER" },
        { label: "USER", value: "USER" },
    ];

    // =========================
    // RENDER
    // =========================
    return (
        <div className="d-flex flex-column gap-3">
            {/* Header */}
            <div className="d-flex justify-content-between">
                <h3 className="fw-bold">User list</h3>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                    className="btn btn-primary"
                >
                    Add
                </button>
            </div>

            {/* Content */}
            <div
                className="flex-grow-1 py-3 px-3 d-flex flex-column gap-2"
                style={{ background: "#fff" }}
            >
                {/* Action Bar */}
                <ActionBar
                    onDelete={handleDeleteBtn}
                    onSearch={handleSearchAction}
                    onFilter={handleFilterAction}
                    filterSelectionSetting={filterSelectionSettingActionBar}
                />

                <hr />

                {/* User Table */}
                <CustomTable
                    list={filteredUsers}
                    columns={headerTableSetting}
                    onSelectionChange={setSelectedUserIds}
                    handleEditBtn={handleEditUser}
                />

                <hr />

                {/* Paging Section */}
                <CustomPaging
                    response={response}
                    onPageChange={(page) => loadPage(page)}
                    rowSetting={{
                        value: rowPerPage,
                        onChange: (newLimit) => {
                            setRowPerPage(newLimit);
                            (async () => {
                                await loadPage(1, newLimit);
                            })();
                        },
                    }}
                />

                {/* Modal Section */}
                <ModalCustom
                    id="addModal"
                    title="Add New User"
                    fields={fieldsSettingModal}
                    onSubmit={handleAddUser}
                />

                <ModalCustom
                    id="editModal"
                    title={editUser ? `Edit user: ${editUser.username}` : "Edit User"}
                    fields={fieldsSettingModal}
                    onSubmit={handleEditSubmit}
                    editData={editUser}
                />
            </div>
        </div>
    );
}
