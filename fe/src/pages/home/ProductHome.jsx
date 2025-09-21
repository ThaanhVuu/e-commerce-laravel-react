import {HomeHeader} from "../../components/home/HomeHeader";
import "./ProductHome.css";

export function ProductHome() {


    return (
        <section>
            <HomeHeader/>
            <div id={"product-home"}>
                <hr/>
                <h3>Product</h3>
                <hr/>
                <select className={"form-select"}>
                    <option>Default</option>
                </select>
                <hr></hr>
            </div>
        </section>
    );
}