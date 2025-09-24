import {HomeHeader} from "../../components/home/HomeHeader";
import "./ProductHome.css";
import {CategoryService, ProductService} from "../../services/AllService";
import {useCrudList} from "../../hooks/useCrudList";
import {useEffect, useState} from "react";
import {MdAddShoppingCart} from "react-icons/md";
import {Footer} from "./Footer";
import {CustomPagination} from "../../components2/CustomPagination";
import {useLocation} from "react-router-dom";

export function ProductHome() {
    const [categories, setCategories] = useState([]);
    const [toastMessage, setToastMessage] = useState(""); // ⭐ toast state
    const location = useLocation();
    const cateIdFromParent = location.state || ""

    useEffect(() => {
        (async () => {
            let res = await CategoryService.getAll();
            setCategories(res.data.data);
        })();
        setFilters({...filters, category_id: cateIdFromParent})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {data, paging, filters, setFilters, loading} =
        useCrudList(ProductService, {
            page: 1,
            limit: 20,
            search: "",
            sort_by: "",
            sort_order: ""
        });
    //
    // function check(){
    //     console.log(data)
    // }
    //
    // check()

    function addToCart(product) {
        try {
            // 1. Lấy giỏ hàng hiện tại
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // 2. Tìm sản phẩm trong giỏ
            const index = cart.findIndex((item) => item.id === product.id);

            if (index >= 0) {
                // Nếu đã có sản phẩm → tăng số lượng
                cart[index].quantity += 1;
            } else {
                // Nếu chưa có → thêm mới
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: Number(product.price), // ép số cho chắc
                    img_url: product.img_url,
                    quantity: 1,
                });
            }

            // 3. Lưu lại vào localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // 4. Thông báo
            setToastMessage(`${product.name} đã thêm vào giỏ!`);
            setTimeout(() => setToastMessage(""), 1500);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Add to cart error:", error);
        }
    }

    function onPageChange(newPage) {
        // noinspection JSCheckFunctionSignatures
        setFilters(prev => ({
            ...prev,
            page: newPage,
        }));
    }

    return (
        <section>

            {/* Toast hiển thị */}
            {toastMessage && (
                <div
                    className="toast bg-warning show position-fixed top-0 end-0 p-3 m-3 text-dark"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{zIndex: 9999}}
                >
                    <div className="d-flex">
                        <div className="toast-body">{toastMessage}</div>
                    </div>
                </div>
            )}

            <HomeHeader home={"/"} gallery={"/#gallery"} category={"/#category"} aboutus={"/#footer"} cart={"/cart"}/>
            <div id="product-home">
                <hr/>
                <h3>Product</h3>
                <hr/>

                {/* SORT + FILTER */}
                <div className="d-flex w-50 gap-2 justify-content-start align-items-center">
                    <span>Sort: </span>
                    <select
                        className="form-select w-25"
                        value={`${filters.sort_by}_${filters.sort_order}`}
                        onChange={(e) => {
                            const [sort_by, sort_order] = e.target.value.split("_");
                            setFilters({...filters, sort_by, sort_order});
                        }}
                    >
                        <option value="">None</option>
                        <option value="price_asc">Price ↑</option>
                        <option value="price_desc">Price ↓</option>
                        <option value="name_asc">Name ↑</option>
                        <option value="name_desc">Name ↓</option>
                        <option value="created_at_desc">Newest</option>
                        <option value="created_at_asc">Oldest</option>
                    </select>

                    <span>Filter:</span>
                    <select
                        className="form-select w-50"
                        value={filters.category_id || ""}
                        onChange={(e) =>
                            setFilters({...filters, category_id: e.target.value})
                        }
                    >
                        <option value={""}>All Categories</option>
                        {categories.map((c) => (
                            <option value={c.id} key={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <hr/>

                {/* LIST PRODUCT */}
                {loading && <p>Loading...</p>}
                <div className={"row"}>
                    {data.map(product => (
                        product.status === "ACTIVE" && (
                            <div className={"col-3 my-2"} key={product.id} style={{height: "450px"}}>
                                <div className={"card border rounded-3 pt-3 mb-4 h-100"}>
                                    {product.img_url ? (
                                        <img className={"card-img-top-custom d-block mx-auto"} src={product.img_url}
                                             alt={product.name}/>
                                    ) : (
                                        <img className={"card-img-top-custom d-block mx-auto"}
                                             src={"https://i.pinimg.com/736x/c3/32/73/c3327380fdac729067f87ece947f1b19.jpg"}
                                             alt={product.name}/>
                                    )}
                                    <div className={"card-body d-flex flex-column justify-content-between"}>
                                        <div className={"d-flex flex-column"}>
                                            <h5 className={"card-title"}>{product.name}</h5>
                                            <span className={"card-text text-muted"}>{product.category.name}</span>
                                            <span
                                                className={"card-text text-danger"}>{Number(product.price).toLocaleString()}$</span>
                                            <span className={"card-text text-dark"}>{product.description}</span>
                                            {product.stock === 0 && (<span>Out of stock</span>)}
                                        </div>
                                        <button className={"btn btn-warning w-50 mt-2"}
                                                onClick={() => addToCart(product)}
                                                disabled={product.stock === 0}   //
                                        >
                                            <MdAddShoppingCart size={20}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )))}
                </div>

                <CustomPagination
                    paging={paging}
                    onPageChange={onPageChange}
                    rowPerPageDisplay={false}
                />
            </div>
            <Footer/>
        </section>
    );
}
