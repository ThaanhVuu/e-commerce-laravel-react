import { HomeHeader } from "../../components/home/HomeHeader";
import { CiShoppingCart } from "react-icons/ci";
import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import { OrderService, ProfileService } from "../../services/AllService";
import {Footer} from "./Footer";

export function OrderConfirm() {
    const navigate = useNavigate();
    const location = useLocation();
    const payable = location.state?.payable || 0;

    const saved = localStorage.getItem("cart");
    const cartItems = saved ? JSON.parse(saved) : [];

    const [profile, setProfile] = useState({
        id: "",
        full_name: "",
        phone: "",
        address: "",
        gender: "",
        dob: ""
    });

    // State lưu lỗi validate
    const [errors, setErrors] = useState({});

    function validateForm() {
        let newErrors = {};

        if (!profile.full_name.trim()) {
            newErrors.full_name = "Full name is required";
        }
        if (!profile.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{9,11}$/.test(profile.phone)) {
            newErrors.phone = "Phone must be 9–11 digits";
        }
        if (!profile.address.trim()) {
            newErrors.address = "Address is required";
        }
        // if (!profile.gender) {
        //     newErrors.gender = "Gender is required";
        // }
        // if (!profile.dob) {
        //     newErrors.dob = "Date of birth is required";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true nếu không có lỗi
    }

    async function handleConfirmBtn() {
        if (!validateForm()) {
            return; // dừng nếu form không hợp lệ
        }

        try {
            const resProfile = await ProfileService.create(profile);
            const newProfileId = resProfile.data.id;
            await createOrder(newProfileId);
            alert("Order confirmed successfully!");
            localStorage.removeItem("cart");
            navigate("/");
        } catch (err) {
            alert("Something went wrong!");
            console.log(err);
        }
    }

    async function createOrder(profileId) {
        const mappedItems = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }));

        const orderPayload = {
            profile_id: profileId,
            items: mappedItems
        };

        try {
            const res = await OrderService.create(orderPayload);
            console.log("Order response:", res.data);
        } catch (err) {
            alert("Order creation failed!");
            console.log(err);
        }
    }

    return (
        <section>
            <HomeHeader home={"/"} gallery={"/#gallery"} category={"/#category"} aboutus={"/#footer"} cart={"/cart"}/>
            <hr />
            <h4 className="text-center">
                <CiShoppingCart size={40} /> Confirm
            </h4>
            <hr />

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
                                        onChange={(e) =>
                                            setProfile({ ...profile, full_name: e.target.value })
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
                                        placeholder="Phone number"
                                        onChange={(e) =>
                                            setProfile({ ...profile, phone: e.target.value })
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
                                        onChange={(e) =>
                                            setProfile({ ...profile, address: e.target.value })
                                        }
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
                                            checked={profile.gender === "MALE"}
                                            onChange={(e) =>
                                                setProfile({ ...profile, gender: e.target.value })
                                            }
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
                                            checked={profile.gender === "FEMALE"}
                                            onChange={(e) =>
                                                setProfile({ ...profile, gender: e.target.value })
                                            }
                                        />
                                        <label className="form-check-label" htmlFor="genderFemale">Female</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            id="genderOther"
                                            name="gender"
                                            value="OTHER"
                                            checked={profile.gender === "OTHER"}
                                            onChange={(e) =>
                                                setProfile({ ...profile, gender: e.target.value })
                                            }
                                        />
                                        <label className="form-check-label" htmlFor="genderOther">Other</label>
                                    </div>
                                    {errors.gender && <div className="text-danger small">{errors.gender}</div>}
                                </div>

                                {/* Date of birth */}
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="dob">Date of Birth</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                                        id="dob"
                                        value={profile.dob || ""}
                                        onChange={(e) =>
                                            setProfile({ ...profile, dob: e.target.value })
                                        }
                                    />
                                    {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Hóa đơn + thanh toán */}
                    <div className="col-md-4">
                        <div className="border rounded p-3">
                            <h5>Invoice</h5>
                            <hr />
                            <p>Cash on Delivery</p>
                            <hr />
                            <table className="w-100">
                                <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.id}>
                                        <td className="text-start">{item.name}</td>
                                        <td className="text-end">{Number(item.price).toLocaleString()}$</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <hr />
                            <p>
                                <strong>Payable: {payable.toLocaleString()}$</strong>
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
