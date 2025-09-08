import {ProfileDropDown} from "../ProfileDropDown";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {MaverickLogo} from "../../assets/MaverickLogo";

export function AdminHeader() {

    const { profile } = useContext(AuthContext);


    return (
        <>
            <header className={'d-flex justify-content-between py-3 align-items-center px-4'} style={{height: "64px", backgroundColor: "#161617"}}>
                {/*<Logo/>*/}
                <MaverickLogo/>
                <ProfileDropDown profile={profile}/>
            </header>
        </>
    );
}