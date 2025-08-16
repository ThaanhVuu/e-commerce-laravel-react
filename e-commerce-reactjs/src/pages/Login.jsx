import React, {useState} from "react";
import "./Login.css";
import leaf1 from '../assets/leaf_01.png';
import leaf2 from '../assets/leaf_02.png';
import leaf3 from '../assets/leaf_03.png';
import leaf4 from '../assets/leaf_04.png';
import girl from '../assets/girl.png';
import bg from '../assets/bg.jpg';
import trees from '../assets/trees.png'
import {signIn} from "../services/LoginApi";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        signIn(user.username, user.password)
            .then(response => {
                console.log(response.data);
            })
            .catch(reportError => {
                alert("Đăng nhập thất bại");
                console.log(reportError);
            })
    }

    return (
        <section>
            <div className="leaves">
                <div className="set">
                    <div><img src={leaf1} alt="leaf 1"/></div>
                    <div><img src={leaf2} alt="leaf 2"/></div>
                    <div><img src={leaf3} alt="leaf 3"/></div>
                    <div><img src={leaf4} alt="leaf 4"/></div>
                    <div><img src={leaf1} alt="leaf 1"/></div>
                    <div><img src={leaf2} alt="leaf 2"/></div>
                    <div><img src={leaf3} alt="leaf 3"/></div>
                    <div><img src={leaf4} alt="leaf 4"/></div>
                </div>
            </div>

            <img src={bg} className="bg" alt="background"/>
            <img src={girl} className="girl" alt="girl"/>
            <img src={trees} className="trees" alt="trees"/>

            <div className="login">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input type="text" placeholder="Username"
                               onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>

                    <div className="inputBox">
                        <input type="password" placeholder="Password"
                               onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>

                    <div className="inputBox">
                        <input type="submit" value="Sign In" id="btn"/>
                    </div>

                    <div className="group">
                        <a href="#">Forget Password</a>
                        <a href="#">Signup</a>
                    </div>
                </form>
            </div>
        </section>
    );
}
