// noinspection JSDeprecatedSymbols

import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {HomeHeader} from "../components/home/HomeHeader";
import {OrderService} from "../services/AllService";
import {FormatDate} from "../utils/FormatDate";

export function ProfileUser() {
    const [orders, setOrders] = useState([])
    const {profile} = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            let res = await OrderService.getMyOrders();
            console.log(res)
            setOrders(res.data) //res.data là 1 order, trong đó chứa order details
        })();
    }, []);

    if (!profile) {
        return (
            <div>
                <p className="text-center h3 mt-5">You are not sign in. Go back to <a href={"/"}>Home</a></p>
            </div>
        );
    }


    const info = profile.profile; // object profile bên trong

    return (
        <div>
            <HomeHeader home={"/"} gallery={"/#gallery"} category={"/#category"} aboutus={"/#footer"} cart={"/cart"}/>

            <div className="container p-5 mx-auto">
                <div
                    className={`d-flex ${orders.length !== 0 ? "justify-content-between" : "justify-content-center"} gap-4`}>

                    {/* Profile */}
                    <div className="border rounded flex-fill" style={{maxWidth: "48%"}}>
                        <h3 className="text-center py-3 mb-0">Profile</h3>
                        <hr className={"m-0"}/>
                        <div className={"px-5 py-2"}>
                            <table className="table table-borderless">
                                <tbody>
                                <tr>
                                    <td>Full Name:</td>
                                    <td>{info.full_name}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{info.phone}</td>
                                </tr>
                                <tr>
                                    <td>Address:</td>
                                    <td>{info.address}</td>
                                </tr>
                                <tr>
                                    <td>Gender:</td>
                                    <td>{info.gender}</td>
                                </tr>
                                <tr>
                                    <td>Date Of Birth:</td>
                                    <td>{info.dob}</td>
                                </tr>
                                <tr>
                                    <td>Sign up at:</td>
                                    <td>{FormatDate(info.created_at)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Orders */}
                    <div className={"flex-fill"}>
                        {orders.length !== 0 && (
                            <div className="border rounded">
                                <h3 className={"m-0 py-3 text-center"}>Orders</h3>
                                <hr className={"m-0"}/>
                                <div style={{overflowY: "auto", maxHeight: "500px"}}>
                                    {orders.map(order => (
                                        <div className={"border rounded m-3 p-2"}
                                             key={order.id}
                                        >
                                            <p className={"text-start ms-2 mb-1"}>Payment Method: {order.payment_method}</p>
                                            <p className={"text-start ms-2 mb-1"}>Time: {FormatDate(order.created_at)}</p>
                                            <p className={"text-start ms-2 mb-1"}>Address: {order.shipping_address}</p>
                                            <p className={"text-start ms-2 mb-1"}>Status: {order.status}</p>

                                            <hr className={"m-0"}/>
                                            <table className={"table table-borderless m-0"}>
                                                <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Category</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.order_details.map(detail => (
                                                    <tr key={detail.id}>
                                                        <td>{detail.product.name}</td>
                                                        <td>{detail.product.category.name}</td>
                                                        <td className={"text-center"}>{detail.quantity}</td>
                                                        <td>{Number(detail.product.price).toLocaleString('en-US', {
                                                            style: "currency",
                                                            currency: "USD"
                                                        })}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            <hr className={"mt-0"}/>
                                            <h6><strong>Total price: {Number(order.total_price).toLocaleString('en-US', {
                                                style: "currency",
                                                currency: "USD"
                                            })}</strong></h6>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
