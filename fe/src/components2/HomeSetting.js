// noinspection JSCheckFunctionSignatures

import {CustomTable} from "./CustomTable";
import {ActionBar} from "./ActionBar";
import {CustomPagination} from "./CustomPagination";

export function HomeSetting
({
     data = [],
     title = "",
     onAdd = () => {
     }, onDelete = () => {
    }, onEdit = () => {
    }, onPageChange = () => {
    },
     paging,
     selectedIds = [],
     setSelectedIds = () => {
     },

 }) {
    return (
        <div className={"d-flex flex-column gap-2"}>
            <h4 className={"fw-bold"}>{title}</h4>

            <ActionBar
                handleAddBtn={onAdd} handleDeleteBtn={onDelete}
            />

            {/*    Table*/}
            <CustomTable data={data} selectedIds={selectedIds} setSelectedIds={setSelectedIds}
                         theadFields={["Name", "Image", "Status", "Action"]}
                         renderRow={() => (
                             data.map(item => (
                                 <tr key={item.id}>
                                     <td><input className={"form-check-input"} type={"checkbox"}
                                                checked={selectedIds.includes(item.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedIds([...selectedIds, item.id]);
                                                    } else {
                                                        setSelectedIds(selectedIds.filter(id => id !== item.id));
                                                    }
                                                }}
                                     /></td>
                                     <td>{item.name}</td>
                                     <td><img src={item.img_url} alt={item.name}
                                              style={{width: "200px", height: "auto"}}/></td>
                                     <td>{item.status}</td>
                                     <td>
                                         <button className={"btn btn-primary"}
                                                 onClick={() => onEdit(item)}
                                         >Edit
                                         </button>
                                     </td>
                                 </tr>
                             ))
                         )}
            />
            {/*    paging*/}
            <CustomPagination
                rowPerPageDisplay={false}
                paging={paging}
                onPageChange={onPageChange}
            />
        </div>
    );
}