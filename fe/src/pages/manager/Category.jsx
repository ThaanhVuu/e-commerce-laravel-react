import {ActionBar} from "../../components/ActionBar";
import {CustomTable} from "../../components/CustomTable";
import {useEffect, useState} from "react";
import {CategoryService} from "../../services/CategoryService";
import {FormatDate} from "../../utils/FormatDate";

export function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async () => {
            await loadTable();
        }) ();
    }, []);

    const loadTable = async () => {
        const res = await CategoryService.getCategories();
        setCategories(res);
    }

    const headerTableFields = [
        {header: "Name", accessor: "name"},
        {header: "Description", accessor: "description"},
        {header: "Created at", accessor: (u) => FormatDate(u.created_at)},
        {header: "Updated at", accessor: (u) => FormatDate(u.updated_at)},
    ];

    return (
        <div className="d-flex flex-column gap-3">
            {/* Header */}
            <div className="d-flex justify-content-between">
                <h3 className="fw-bold">Category list</h3>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                    className="btn btn-primary"
                >
                    Add
                </button>
            </div>
            <div
                className="flex-grow-1 py-3 px-3 d-flex flex-column gap-2"
                style={{background: "#fff"}}
            >
                <ActionBar
                    filterSelectionSetting={[]}
                />

                <CustomTable
                    list={categories}
                    columns={headerTableFields}
                />
            </div>
        </div>
    );
}