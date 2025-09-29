import {HomeHeader} from "../../components/home/HomeHeader";
import {CiShoppingCart} from "react-icons/ci";
import {FaTrash} from "react-icons/fa";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Footer} from "./Footer";

export function Cart() {
    // 🔹 State giỏ hàng: khởi tạo từ localStorage
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const navigate = useNavigate();

    // 🔹 Tính tổng giá
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // 🔹 Hàm tăng/giảm số lượng
    const updateQty = (id, type) => {
        setCartItems((prev) => {
            const updated = prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === "inc"
                                ? item.quantity + 1
                                : Math.max(1, item.quantity - 1),
                    }
                    : item
            );
            localStorage.setItem("cart", JSON.stringify(updated));
            window.dispatchEvent(new Event("cartUpdated")); // 👈 thêm dòng này
            return updated;
        });
    };

// 🔹 Hàm xóa 1 sản phẩm
    const removeItem = (id) => {
        setCartItems((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updated));
            window.dispatchEvent(new Event("cartUpdated")); // 👈 thêm dòng này
            return updated;
        });
    };

// 🔹 Hàm xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated")); // 👈 thêm dòng này
    };

    return (
        <section>
            {/* Header */}
            <HomeHeader
                home={"/"}
                gallery={"/#gallery"}
                category={"/#category"}
                aboutus={"/#footer"}
                cart={"/cart"}
            />
            <hr/>

            {/* Title */}
            <h4 className="text-center">
                <CiShoppingCart size={40}/> Cart
            </h4>
            <hr/>

            <div className="container my-4">
                {cartItems.length === 0 ? (
                    // Khi giỏ hàng trống
                    <div className="text-center border rounded p-5">
                        <p className="mb-3">Cart is empty! Let’s shopping!</p>
                        <button className="btn btn-warning" onClick={() => navigate("/")}>
                            Shopping now
                        </button>
                    </div>
                ) : (
                    <div className="row">
                        {/* Left side - Cart items */}
                        <div className="col-md-8">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="d-flex align-items-center justify-content-between border rounded p-3 mb-3"
                                >
                                    {/* Ảnh sản phẩm */}
                                    <img
                                        src={item.img_url || "https://via.placeholder.com/100"}
                                        alt={item.name}
                                        className="rounded"
                                        style={{width: "100px", height: "100px", objectFit: "cover"}}
                                    />

                                    {/* Thông tin sản phẩm */}
                                    <div className="flex-grow-1 px-3">
                                        <h6>{item.name}</h6>
                                        <p className="mb-1">Price: {Number(item.price).toLocaleString('en-US', {
                                            style: "currency",
                                            currency: "USD"
                                        })}</p>
                                        <p className="mb-1">Category: {item.category}</p>

                                        {/* Nút tăng giảm số lượng */}
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => updateQty(item.id, "dec")}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => updateQty(item.id, "inc")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Xóa sản phẩm */}
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FaTrash/>
                                    </button>
                                </div>
                            ))}

                            {/* Clear toàn bộ giỏ hàng */}
                            <button className="btn btn-danger mt-3" onClick={clearCart}>
                                Clear Cart
                            </button>
                        </div>

                        {/* Right side - Order Detail */}
                        <div className="col-md-4">
                            <div className="border rounded p-3">
                                <h6>Order Detail</h6>
                                <p>Total price: {Number(totalPrice).toLocaleString('en-US', {
                                    style: "currency",
                                    currency: "USD"
                                })}</p>
                                <hr/>
                                <p>
                                    <strong>Payable: {Number(totalPrice).toLocaleString('en-US', {
                                        style: "currency",
                                        currency: "USD"
                                    })}</strong>
                                </p>
                                <button
                                    className="btn btn-warning w-100"
                                    onClick={() =>
                                        navigate("/order-confirm", {state: {payable: totalPrice}})}
                                >
                                    Order now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </section>
    );
}
