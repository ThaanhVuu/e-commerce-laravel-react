import React, {useState} from "react";
import "./LoginLayout.css";
import leaf1 from '../../assets/leaf_01.png';
import leaf2 from '../../assets/leaf_02.png';
import leaf3 from '../../assets/leaf_03.png';
import leaf4 from '../../assets/leaf_04.png';
import girl from '../../assets/girl.png';
import bg from '../../assets/bg.jpg';
import trees from '../../assets/trees.png'

export function LoginLayout(
    {title, submitText, linkHref, label, handleOnSubmit, linkHref2, label2, placeholder, loading, error}
) {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        handleOnSubmit(user); // gửi user cho SignIn hoặc SignUp
    }

    return (
        <section id={"login-layout"}>
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
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>
                    {error !== "" && (
                        <div className={"alert alert-danger"} role={"alert"}>
                            {error}
                        </div>
                    )}

                    <div className="inputBox">
                            <input type="text" placeholder={"Email"}
                                   onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </div>

                        <div className="inputBox">
                            <input type="password" placeholder={placeholder || "Password"}
                                   onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>

                    <div className="inputBox">
                        <input type="submit" disabled={loading} value={submitText} id="btn"/>
                    </div>

                    <div className="group">
                        <a href={linkHref2}>{label2}</a>
                        <a href={linkHref}>{label}</a>
                    </div>
                </form>
            </div>
        </section>
    );
}
