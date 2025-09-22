import {MaverickLogo} from "../../assets/MaverickLogo";
import {IoBagOutline} from "react-icons/io5";
import {CiSearch} from "react-icons/ci";
import {LuCircleUser} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


export function HomeHeader(
    {home="#home", category = "#category", product = "#product", gallery = "#gallery", aboutus = "#footer", cart= "#cart"}
) {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState()

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

        return () => {
            window.removeEventListener("storage", updateCartCount);
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);
    
    const handleUserClick = () => {
        navigate('/signin');
    }

    return (
        <header
            className="d-flex gap-4 sticky-top justify-content-center align-items-center"
            style={{height: "44px", backgroundColor: "#feffec", width: "100%"}}
        >
            <nav className="d-flex gap-4 justify-content-center flex-grow-1 fw-bold">
                <a href={home}><MaverickLogo height={24} width={107} accent={"#D62828"} primary={"#000000"}/></a>

                <a href={home} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Home</a>

                <a href={category} className="m-0 text-dark text-decoration-none"
                   style={{fontSize: "14px"}}>Category</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="m-0 text-dark text-decoration-none"
                    style={{fontSize: "14px", cursor: "pointer"}}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/product")
                    }}
                >Product</a>

                <a href={gallery} className="m-0 text-dark text-decoration-none"
                   style={{fontSize: "14px"}}>Gallery</a>

                <a href={aboutus} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>About
                    us</a>

                <a href={'#search'} className="m-0 text-dark text-decoration-none"><CiSearch size={18}/></a>

                {/* Giỏ hàng + badge */}
                <a href={"/cart"} className="m-0 text-dark text-decoration-none position-relative">
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

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={handleUserClick} className="m-0 text-dark text-decoration-none" style={{cursor: "pointer"}}><LuCircleUser size={16}/></a>
            </nav>
        </header>
    )
}
