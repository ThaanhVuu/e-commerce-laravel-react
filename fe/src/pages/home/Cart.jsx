import { HomeHeader } from "../../components/home/HomeHeader";
import { CiShoppingCart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product name", price: 199000, category: "Category", qty: 1 },
    { id: 2, name: "Product name", price: 199000, category: "Category", qty: 1 },
    { id: 3, name: "Product name", price: 199000, category: "Category", qty: 1 },
  ]);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = 199000; // demo
  const payable = totalPrice - discount;

  // tăng giảm số lượng
  const updateQty = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1) }
          : item
      )
    );
  };

  // xóa sản phẩm
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section>
      <HomeHeader />
      <hr />

      {/* Title */}
      <h4 className="text-center">
        <CiShoppingCart size={40} /> Cart
      </h4>
      <hr />

      <div className="container my-4">
        {cartItems.length === 0 ? (
          // Khi giỏ hàng trống
          <div className="text-center border rounded p-5">
            <p className="mb-3">Cart is empty! Let’s shopping!</p>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/")}
            >
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
                  <img
                    src="https://via.placeholder.com/100"
                    alt={item.name}
                    className="rounded"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1 px-3">
                    <h6>{item.name}</h6>
                    <p className="mb-1">Price: {item.price.toLocaleString()}đ</p>
                    <p className="mb-1">Category: {item.category}</p>

                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQty(item.id, "dec")}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQty(item.id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Right side - Order Detail */}
            <div className="col-md-4">
              <div className="border rounded p-3">
                <h6>Order Detail</h6>
                <p>Total price: {totalPrice.toLocaleString()}đ</p>
                <p>Discount: {discount.toLocaleString()}đ</p>
                <hr />
                <p>
                  <strong>Payable: {payable.toLocaleString()}đ</strong>
                </p>
                <button
                  className="btn btn-warning w-100"
                  onClick={() => navigate("/order-confirm")}
                >
                  Order now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
