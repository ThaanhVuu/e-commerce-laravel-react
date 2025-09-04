import {Logo} from "../../assets/Logo";
import {ProfileDropDown} from "../ProfileDropDown";

export function AdminHeader() {

    const user = {
        name: "abc"
    }

    return (
        <>
            <header className={'d-flex justify-content-between py-3 align-items-center px-4'}>
                <Logo/>
                <ProfileDropDown profile={user}/>
            </header>
        </>
    );
}