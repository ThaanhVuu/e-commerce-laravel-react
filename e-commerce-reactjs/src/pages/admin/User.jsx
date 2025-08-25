import {useEffect, useState} from "react";
import {UserService} from "../../services/UserService";
import AddButton from "../../components/AddButton";

export default function User() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            (async () => {
                const response = await UserService.get()
                setUsers(response)
                console.log(users)
            })();
        } catch (err) {
            console.log('Error while check cookie sign in: ', (err.response) ? err.response.data : err);
        }
    }, []);

    return (
        <>
            <div className={"container d-flex flex-column"}>
                <AddButton/>
            </div>
        </>
    )
}