import {MaverickLogo} from "../../assets/MaverickLogo";
import {IoBagOutline} from "react-icons/io5";
import {CiSearch} from "react-icons/ci";
import {LuCircleUser} from "react-icons/lu";
import {useNavigate} from "react-router-dom";


export function HomeHeader() {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/signin');
    }

    return (
        <header
            className="d-flex gap-4 sticky-top justify-content-center align-items-center"
            style={{height: "44px", backgroundColor: "#feffec", width: "100%"}}
        >
            <nav className="d-flex gap-4 justify-content-center flex-grow-1 fw-bold">
                <a href={"#home"}><MaverickLogo height={24} width={107} accent={"#D62828"} primary={"#000000"}/></a>
                <a href={"#home"} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Home</a>
                <a href={"#category"} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Category</a>
                <a href={"#product"} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Product</a>
                <a href={"#gallery"} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>Gallery</a>
                <a href={"#footer"} className="m-0 text-dark text-decoration-none" style={{fontSize: "14px"}}>About us</a>
                <a href={'#search'} className="m-0 text-dark text-decoration-none"><CiSearch size={18} /></a>
                <a href={"/cart"} className="m-0 text-dark text-decoration-none"><IoBagOutline size={16}/></a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={handleUserClick} className="m-0 text-dark text-decoration-none" style={{cursor: "pointer"}}><LuCircleUser size={16}/></a>
            </nav>
        </header>
    )
}
