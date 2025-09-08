import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext";

export default function Dashboard() {
    const { profile } = useContext(AuthContext);
    
    return(
        <>
            <h1>Admin Panel</h1>
            {profile && <p>Xin chào {profile.username}</p>}
        </>
    )
}
