import {useEffect, useState} from "react";
import {UserService} from "../../services/UserService";
import AddButton from "../../components/AddButton";
import CustomTable from "../../components/CustomTable";
import FormatDate from "../../utils/FormatDate";
import CustomModal from "../../components/CustomModal";
import {Modal} from "bootstrap";
import CustomPaging from "../../components/CustomPaging";

export default function User() {
    const [users, setUsers] = useState([]);
    const [links, setLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            (async () => {
                const response = await UserService.getUserPaging(10)
                setUsers(response.data);
                setLinks(response.links);
                setCurrentPage(response.current_page);
            })();
        } catch (err) {
            console.log('Error while check cookie sign in: ', (err.response) ? err.response.data : err);
        }
    }, []);

    const headerTableSetting = [{header: "Username", accessor: "username"}, {
        header: "Role",
        accessor: "role"
    }, {header: "Created at", accessor: (u) => FormatDate(u.created_at)}, {
        header: "Updated at",
        accessor: (u) => FormatDate(u.updated_at)
    }]

    const fieldsSettingModal = [{label: "Username", name: "username", type: "text"}, {
        label: "Password",
        name: "password",
        type: "password"
    }, {
        label: "Role",
        name: "role",
        type: "select",
        options: [{label: "User", value: "USER"}, {label: "Admin", value: "ADMIN"}]
    }];

    const openModal = () => {
        const modalEl = document.getElementById('addUserModal');
        const modal = new Modal(modalEl);
        modal.show();
    };

    const handleAddUser = async (data) => {
        try {
            const response = await UserService.create(data.username, data.password, data.role);
            console.log(response);
            alert(`Add new ${response.role} "${response.username}" successful at ${FormatDate(response.created_at)}"`);
        } catch (err) {
            alert(err.message);
            console.log('Error while adding new user: ', (err.response) ? err.response.data : err);
        }
    };

    return (<div className={"container d-flex flex-column"}>
        <AddButton onClick={openModal}/>
        <CustomTable list={users} columns={headerTableSetting}/>
        <CustomPaging links={links} currentPage={currentPage}/>
        <CustomModal id={'addUserModal'} title={"Add New User"} fields={fieldsSettingModal}
                     onSubmit={handleAddUser}/>
    </div>)
}