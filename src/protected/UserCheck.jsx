import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";
import API_URL from "../common/config";

function UserCheck() {
    const { token } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const config = {
        'method': 'get',
        'url': `${API_URL}/scope-example/protecteduser`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios(config).then((response) => {
            console.log("Enviaste un token bueno y estás logueado!!!");
            console.log(response);
            setMessage("Enviaste un token bueno y estás logueado!!!");
        }).catch((error) => {
            console.log("Hubo un error, no estás logueado / el token expiró");
            console.log(error);
            setMessage("Hubo un error, no estás logueado / el token expiró");
        });
    }, [token]); // Depende del token para volver a ejecutarse

    return (
        <h2>{message}</h2>
    );
}

export default UserCheck;