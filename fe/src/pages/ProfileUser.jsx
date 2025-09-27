import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { HomeHeader } from "../components/home/HomeHeader";

export function ProfileUser() {
    const { profile } = useContext(AuthContext);

    if (!profile) {
        return <p className="text-center mt-5">You are not sign in.</p>;
    }

    const user = profile;
    const info = profile.profile; // object profile bên trong

    return (
        <div>
            <HomeHeader />

            <div className="container p-5 mx-5 gap-3 row">
                <div className={"col-6 border rounded"}>
                    <h3 className={"text-center py-3"}>Profile</h3>
                    <hr/>
                    <table className={"table"}>
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
                            <td>{info.created_at}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className={'col-6 border rounded'}>

                </div>
            </div>
        </div>
    );
}
