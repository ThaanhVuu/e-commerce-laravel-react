import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import {ProfileService} from "../services/AllService"; // bạn cần tạo service này gọi API BE

export function CreateProfile() {
    const {profile, setProfile} = useContext(AuthContext); // để cập nhật vào context
    const navigate = useNavigate();

    // 🔹 State form
    const [formData, setFormData] = useState({
        user_id: profile.id,
        full_name: "",
        phone: "",
        address: "",
        gender: "",
        dob: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔹 handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // 🔹 handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(profile, formData)
        setLoading(true);
        setError(null);

        try {
            const response = await ProfileService.create(formData);
            console.log(response);
            setProfile({
                ...profile,           // dữ liệu user đang có
                profile: formData     // nhét formData vào key "profile"
            });
            window.location.href = "/";
        } catch (err) {
            console.error("Create profile failed:", err);
            setError("Create profile failed, try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create your profile</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                {/* Full name */}
                <div className="mb-3">
                    <label className="form-label">Full name</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className="form-label">Phone number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Address */}
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>

                {/* Date of Birth */}
                <div className="mb-3">
                    <label className="form-label">Date of birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save profile"}
                </button>
            </form>
        </div>
    );
}
