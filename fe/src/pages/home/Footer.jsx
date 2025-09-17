import './Footer.css'
import {BsTelephone} from "react-icons/bs";
import {FaLocationDot} from "react-icons/fa6";
import {Geolocation} from "../../components/Geolocation";
import {MdOutlineEmail} from "react-icons/md";
import {FaEye, FaFacebook} from "react-icons/fa";
import {Ticker} from "../../services/Ticker";
import {useEffect, useState} from "react";
import {VisitorCount} from "../../services/VisitorCount";

export function Footer() {
    const [visitor, setVisitor] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await VisitorCount();
            setVisitor(data)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openEmail = () => {
        window.open(
            "https://mail.google.com/mail/u/1/#inbox?compose=DmwnWstzVNltTbzmQdtGPnWghncbmDkQtvwTVVWqlHdMzKBcpKrXGzJBhLXSjqSNCSdZGCjmtsSq",
            "_blank",
            "noopener,noreferrer"
        )
        ;
    }

    const openFacebook = () => {
        window.open(
            "https://facebook.com/htvu.76",
            "_blank",
            "noopener,noreferrer"
        )
    }

    return (
        <footer id={"footer"} className={"d-flex flex-column pt-5 align-items-center"}>
            <div className="row w-100">
                <div className="col-md-3 border-end">
                    <h4>Welcome to Maverick 💖</h4>
                    <span>
                      We always value and continue to collect all feedback from customers,
                      constantly striving to improve and enhance service experience as well as product quality.
                    </span>
                </div>

                <div className="col-md-3 border-end">
                    <h4><BsTelephone size={28}/> Order</h4>
                    <h6>0888888888</h6>
                    <hr/>
                    <h4><BsTelephone size={28}/> Give feedback</h4>
                    <h6>0888888888</h6>
                </div>

                <div className="col-md-3 border-end">
                    <h4>Address</h4>
                    <ul className="list-unstyled">
                        <li><FaLocationDot /> <strong>Head Office:</strong> 200 Quang Trung, Ha Dong, Ha Noi</li>
                        <li><FaLocationDot /> Branch 1: 123 Nguyen Trai, Thanh Xuan, Ha Noi</li>
                        <li><FaLocationDot /> Branch 2: 456 Le Loi, District 1, Ho Chi Minh City</li>
                        <li><FaLocationDot /> Branch 3: 789 Dien Bien Phu, Binh Thanh District, Ho Chi Minh City</li>
                    </ul>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Email</label>
                    <input className="form-control"/>
                    <label className="form-label">Feedback</label>
                    <textarea className="form-control"></textarea>
                    <button className="btn btn-warning mt-3">Send</button>
                </div>
            </div>
            <div className={"w-100"}>
                <hr/>
            </div>
            <div className={"row w-100"}>
                <div className={"d-flex gap-3 col-6 border-end"}>
                    <Geolocation zoom={16}/>
                    <h6><FaLocationDot /> <strong>Head Office:<br/></strong> 200 Quang Trung, Ha Dong, Ha Noi</h6>
                </div>

                <div className={"col-3 border-end"}>
                    <ul className={"list-unstyled"}>
                        <li>
                            <h5 className={"footer-hover"} onClick={openEmail}><MdOutlineEmail/> Email</h5>
                            <h6 className={"footer-hover"} onClick={openEmail}>thanhvu7623@gmail.com</h6>
                        </li>
                        <li>
                            <h5><BsTelephone/> Contact us</h5>
                            <h6>0879592258</h6>
                        </li>
                        <li>
                            <h5 className={"footer-hover"} onClick={openFacebook}><FaFacebook /> Facebook</h5>
                            <h6 className={"footer-hover"} onClick={openEmail}>Thanh Vu</h6>
                        </li>
                    </ul>
                </div>
                <div className={"col-3"}>
                    <Ticker/>
                {/*    visitor count*/}
                    <h6><FaEye/> Visitor: {visitor ? visitor.total : "Loading..."}</h6>
                </div>
            </div>
        </footer>
    )
}