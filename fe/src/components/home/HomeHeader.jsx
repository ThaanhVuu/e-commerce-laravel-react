import {MaverickLogo} from "../../assets/MaverickLogo";
import {IoBagOutline} from "react-icons/io5";
import {CiSearch} from "react-icons/ci";
import {useContext, useEffect, useState} from "react";
import {UserMenu} from "../../components2/UserMenu";
import {AuthContext} from "../../contexts/AuthContext";
import "./HomeHeader.css";

export function HomeHeader(
    {home="#home", category = "#category", gallery = "#gallery", aboutus = "#footer"}
) {
    const [cartCount, setCartCount] = useState();

    const {profile, setProfile} = useContext(AuthContext);

    useEffect(() => {
        const updateCartCount = () => {
            const cartData = JSON.parse(localStorage.getItem("cart")) || [];
            const total = cartData.reduce((sum, item) => sum + (item.quantity || 0), 0);
            setCartCount(total);
        };

        updateCartCount();

        // Lắng nghe cả storage (khác tab) và cartUpdated (cùng tab)
        window.addEventListener("storage", updateCartCount);
        window.addEventListener("cartUpdated", updateCartCount);

        // check xem user có profile chưa, nếu chưa thì bị đẩy qua trang tạo profile
        if (profile && !profile.profile) {
            window.location.href = "/profile-create";
        }

        return () => {
            window.removeEventListener("storage", updateCartCount);
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, [profile]);

    return (
        <header
            className="d-flex gap-4 sticky-top justify-content-center align-items-center"
            style={{height: "44px", backgroundColor: "#feffec", width: "100%"}}
        >
            <nav className="d-flex gap-4 justify-content-center flex-grow-1 fw-bold">
                {/* Logo */}
                <a className="hoover" href={home}>
                    <MaverickLogo height={24} width={107} accent={"#D62828"} primary={"#000000"}/>
                </a>

                {/* Menu items */}
                <a href={home} className="hoover m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Home</a>

                <a href={category} className="hoover m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Category</a>

                <a href="/product" className="hoover m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Product</a>

                <a href={gallery} className="hoover m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Gallery</a>

                <a href={aboutus} className="hoover m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>About us</a>

                {/* Search dropdown */}
                <div className="dropdown">
                    <button
                        className="btn btn-link m-0 text-dark text-decoration-none p-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <CiSearch size={18}/>
                    </button>

                    <div className="dropdown-menu p-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            autoFocus
                        />
                    </div>
                </div>

                {/* Cart */}
                <a href="/cart" className="hoover m-0 text-dark text-decoration-none position-relative">
                    <IoBagOutline size={18}/>
                    {cartCount > 0 && (
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{fontSize: "10px"}}
                        >
                            {cartCount}
                        </span>
                    )}
                </a>

                {/* User menu */}
                <UserMenu profile={profile} setProfile={setProfile}/>
            </nav>
        </header>
    )
}
