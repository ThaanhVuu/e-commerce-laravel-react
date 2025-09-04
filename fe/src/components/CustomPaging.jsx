/**
 * CustomPaging Component
 *
 * Hiển thị phân trang và lựa chọn số dòng mỗi trang.
 *
 * ⚠️ Bắt buộc phải truyền prop `response` từ API Laravel paginate.
 *
 * Props:
 * - response: object
 *   Dữ liệu trả về từ backend (Laravel paginate). Bắt buộc phải có `links`, `current_page`, `per_page`...
 *
 * - onPageChange: (page: number) => void
 *   Callback khi user bấm vào một trang bất kỳ. Nhận số trang và gọi hàm load dữ liệu mới.
 *
 * - rowSetting: {
 *     value: number,                // số dòng hiện tại mỗi trang
 *     onChange: (newLimit: number) => void  // callback khi đổi rows per page
 *   }
 *   Cấu hình số dòng/trang. Bắt buộc phải truyền nếu muốn đổi rows/page.
 *
 * Example usage:
 *
 * ```jsx
 * <CustomPaging
 *   response={response}
 *   onPageChange={(page) => getProfiles(rowPerPage, page)}
 *   rowSetting={{
 *     value: rowPerPage,
 *     onChange: (newLimit) => {
 *       setRowPerPage(newLimit);
 *       getProfiles(newLimit, 1); // reset về trang 1 khi đổi limit
 *     }
 *   }}
 * />
 * ```
 */


import he from "he";

// render pagination
export function CustomPaging({response, onPageChange, rowSetting}) {
    if (!response) return null;

    return (
        <div className={'d-flex justify-content-between'}>
            {/*row setting*/}
            <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0">Rows per page:</label>
                <select
                    className="form-select"
                    style={{ width: "80px" }}
                    value={rowSetting?.value}          // fallback default = 10
                    onChange={(e) => rowSetting?.onChange?.(Number(e.target.value))}
                >
                    {[5, 10, 20, 30, 40, 50].map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
            {/*render paging*/}
            <nav>
                <ul className="pagination">
                    {response.links.map((link, idx) => (
                        <li
                            key={idx}
                            className={`page-item ${link.active ? "active" : ""} ${
                                !link.page ? "disabled" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => link.page && onPageChange(link.page)}
                            >
                                {he.decode(link.label)}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
