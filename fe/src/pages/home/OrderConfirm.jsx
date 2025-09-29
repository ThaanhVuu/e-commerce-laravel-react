import {HomeHeader} from "../../components/home/HomeHeader";
import {CiShoppingCart} from "react-icons/ci";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {OrderService, ProfileService} from "../../services/AllService";
import {Footer} from "./Footer";
import {toast} from "react-toastify";
import {AuthContext} from "../../contexts/AuthContext";

export function OrderConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const payable = location.state?.payable || 0;
    const {profile} = useContext(AuthContext);

    const saved = localStorage.getItem("cart");
    const cartItems = saved ? JSON.parse(saved) : [];

    const [profileFromForm, setProfileFromForm] = useState({
        id: "",
        full_name: "",
        phone: "",
        address: profile?.profile?.address || "",
        gender: "",
        dob: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    // State lưu lỗi validate
    const [errors, setErrors] = useState({});

    function validateForm() {
        let newErrors = {};

        if (!profileFromForm.full_name.trim()) {
            newErrors.full_name = "Full name is required";
        }
        if (!profileFromForm.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{9,11}$/.test(profileFromForm.phone)) {
            newErrors.phone = "Phone must be 9–11 digits";
        }
        if (!profileFromForm.address.trim()) {
            newErrors.address = "Address is required";
        }
        // if (!profileFromForm.gender) {
        //     newErrors.gender = "Gender is required";
        // }
        // if (!profileFromForm.dob) {
        //     newErrors.dob = "Date of birth is required";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true nếu không có lỗi
    }

    async function handleConfirmBtn() {
        // Nếu user chưa có profile (profile = null) thì phải validate form nhập liệu
        if (!profile && !validateForm()) {
            return; // Nếu form không hợp lệ thì dừng luôn
        }

        // Nếu giỏ hàng rỗng thì báo lỗi và dừng
        if (cartItems.length === 0) {
            toast.error("Cart is empty!");
            return;
        }

        try {
            let profileId = 0;

            // Nếu user đã có profile (đăng nhập và có profile trong DB) thì dùng ID đó
            if (profile) {
                profileId = profile.profile.id;
            } else {
                // Nếu user chưa có profile thì gọi API để tạo mới profile từ form
                const resProfile = await ProfileService.create(profileFromForm);
                profileId = resProfile.data.id; // lấy ID profile mới tạo
            }

            // Gọi API tạo order với profileId và giỏ hàng
            await createOrder(profileId);

            // Sau khi order thành công thì clear giỏ hàng trong localStorage
            localStorage.removeItem("cart");

            // Hiển thị thông báo thành công, sau khi đóng toast sẽ redirect về trang Home
            toast.success("Order confirmed successfully!", {
                onClose: () => navigate("/")
            });
        } catch (err) {
            // Nếu có lỗi trong bất kỳ bước nào (tạo profile, tạo order, call API) thì báo lỗi
            toast.error("Something went wrong!");
            console.log(err);
        }
    }

    async function createOrder(id) {
        const mappedItems = cartItems.map(item => ({
            product_id: String(item.id),
            quantity: item.quantity
        }));

        const orderPayload = {
            profile_id: `${id}`,
            shipping_address: `${profileFromForm.address}`,
            items: mappedItems,
            payment_method: `${paymentMethod}`
        };

        try {
            await OrderService.create(orderPayload);
        } catch (err) {
            toast.error("Order creation failed!");
            console.log(err);
        }
    }

    return (
        <section>
            <HomeHeader home={"/"} gallery={"/#gallery"} category={"/#category"} aboutus={"/#footer"} cart={"/cart"}/>
            <hr/>
            <h4 className="text-center">
                <CiShoppingCart size={40}/> Confirm
            </h4>
            <hr/>

            <div className="container my-4">
                <div className="row">
                    {/* Form nhập thông tin khách hàng */}
                    <div className="col-md-8">
                        <div className="border rounded p-3">
                            <h5>Customer Information</h5>
                            <hr/>
                            <form>
                                {/* Full name */}
                                <div className="mb-3">
                                    <label className="form-label">Full name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.full_name ? "is-invalid" : ""}`}
                                        placeholder="Full Name"
                                        disabled={profile}
                                        value={profile ? profile.profile.full_name : profileFromForm.full_name}
                                        onChange={(e) =>
                                            setProfileFromForm({...profileFromForm, full_name: e.target.value})
                                        }
                                    />
                                    {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                                </div>

                                {/* Phone */}
                                <div className="mb-3">
                                    <label className="form-label">Phone number</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                        disabled={profile}
                                        placeholder="Phone number"
                                        value={profile ? profile.profile.phone : profileFromForm.phone}
                                        onChange={(e) =>
                                            setProfileFromForm({...profileFromForm, phone: e.target.value})
                                        }
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                </div>

                                {/* Address */}
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                        placeholder="Address"
                                        value={profileFromForm.address}
                                        onChange={(e) =>{
                                            setProfileFromForm({...profileFromForm, address: e.target.value})
                                        }}
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>

                                {/* Gender */}
                                <div className="mb-3">
                                    <label className="form-label d-block">Gender</label>

                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="genderMale"
                                            name="gender"
                                            value="MALE"
                                            checked={profile ? profile.profile.gender === "MALE" : profileFromForm.gender === "MALE"}
                                            onChange={(e) =>
                                                setProfileFromForm({...profileFromForm, gender: e.target.value})
                                            }
                                            disabled={!!profile}
                                        />
                                        <label className="form-check-label" htmlFor="genderMale">Male</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="genderFemale"
                                            name="gender"
                                            value="FEMALE"
                                            checked={profile ? profile.profile.gender === "FEMALE" : profileFromForm.gender === "FEMALE"}
                                            onChange={(e) =>
                                                setProfileFromForm({...profileFromForm, gender: e.target.value})
                                            }
                                            disabled={!!profile}
                                        />
                                        <label className="form-check-label" htmlFor="genderFemale">Female</label>
                                    </div>
                                </div>

                                {/* Date of birth */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="dob">Date of Birth</label>
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        id="dob"
                                        disabled={profile}
                                        value={profile ? profile.profile.dob : profileFromForm.dob}
                                        onChange={(e) =>
                                            setProfileFromForm({...profileFromForm, dob: e.target.value})
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Hóa đơn + thanh toán */}
                    <div className="col-md-4">
                        <div className="border rounded p-3">
                            <h5>Invoice</h5>
                            <hr/>
                            <h6><strong>Payment Method</strong></h6>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="paymentCOD"
                                    name="paymentMethod"
                                    value="Cash On Delivery"
                                    checked={paymentMethod === "Cash On Delivery"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="paymentTransfer">
                                    Cash on Delivery
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="paymentTransfer"
                                    name="paymentMethod"
                                    value="Transfer"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="paymentTransfer">
                                    Bank Transfer
                                </label>
                            </div>
                            <hr/>
                            <h6><strong>Products</strong></h6>
                            <table className="w-100">
                                <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="text-start">{item.name}</td>
                                        <td className={"text-center"}>{item.quantity}</td>
                                        <td className="text-end">{Number(item.price).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD"
                                        })}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {paymentMethod === "Transfer" && (
                                <>
                                    <hr/>
                                    <div className="text-center">
                                        <img
                                            alt="QR"
                                            src="https://i.postimg.cc/sg3SPv8J/z7059617032690-6320a6f86f57804ff86ec9d6588c72ba.jpg"
                                            className="img-fluid rounded"
                                            style={{width: "300px", height: "300px"}}
                                        />
                                    </div>
                                </>
                            )}
                            <hr/>
                            <p>
                                <strong>Payable: {Number(payable).toLocaleString('en-US', {style: "currency", currency: "USD"})}</strong>
                            </p>
                            <button
                                type="button"
                                className="btn btn-warning w-100"
                                onClick={handleConfirmBtn}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    );
}
