export default function CustomPaging({ links, currentPage }) {
    return (
        <nav className={'mt-3'}>
            <ul className="pagination">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}
                    >
                        <a
                            className="page-link"
                            href={link.url || "#"}
                            dangerouslySetInnerHTML={{ __html: link.label }} // giữ được ký tự « »
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
