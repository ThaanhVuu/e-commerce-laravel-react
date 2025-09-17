import { HomeHeader } from "../../components/home/HomeHeader";
import { CiShoppingCart } from "react-icons/ci";

export function OrderConfirm() {
  return (
    <section>
      <HomeHeader />
      <hr />
      <h4 className="text-center">
        <CiShoppingCart size={40} /> Confirm
      </h4>
      <hr />

      <div className="container my-4">
        <div className="row">
          {/* Form nhập thông tin */}
          <div className="col-md-8">
            <div className="border rounded p-3">
              <h6>Customer Information</h6>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Phone number" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Address" />
                </div>
              </form>
            </div>
          </div>

          {/* Payment */}
          <div className="col-md-4">
            <div className="border rounded p-3">
              <h6>Payment</h6>
              <p>Cash on Delivery</p>
              <p>Total price: 199.000đ</p>
              <p>Discount: 199.000đ</p>
              <hr />
              <p>
                <strong>Payable: 199.000đ</strong>
              </p>
              <button className="btn btn-warning w-100">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
